import buildTypes from '../../src/builders/buildTypes'

describe('buildTypes', () => {
  const state = {
    foo: null
  }

  const stateKeys = Object.keys(state)

  test('generate object', () => {
    const expected = {
      foo: 'foo'
    }

    const actual = buildTypes(stateKeys)

    expect(actual.foo).toEqual(expected.foo)
  })

  test('throw Error when trying to access property that does not exist', () => {
    const expectedErrorMessage = `Unrecognised commit type 'propertyDoesNotExist'. Check the type being committed is one of the following [${JSON.stringify(stateKeys, null, 2)}]`

    expect(() => {
      const actual = buildTypes(stateKeys)
      // eslint-disable-next-line no-unused-vars
      const _ = actual['propertyDoesNotExist']
    }).toThrow(expectedErrorMessage)
  })
})
