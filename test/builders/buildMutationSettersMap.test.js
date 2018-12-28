import buildMutationSettersMap from '../../src/builders/buildMutationSettersMap'

describe('buildMutationSettersMap', () => {
  const stateKeys = ['foo']
  const expected = {
    setFoo: 'foo'
  }

  test(`expect mapping object where each key is prefixed with 'set'`, () => {
    const actual = buildMutationSettersMap(stateKeys)

    expect(actual).toEqual(expected)
  })

  test('expect mapping object to not be extensible', () => {
    const actual = buildMutationSettersMap(stateKeys)

    expect(() => {
      actual.anotherProperty = 'test'
    }).toThrow('Cannot add property anotherProperty, object is not extensible')
  })
})
