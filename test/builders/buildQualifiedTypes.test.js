import buildQualifiedTypes from '../../src/builders/buildQualifiedTypes'

describe('buildQualifiedTypes', () => {
  test('check qualified property is set correctly', () => {
    const state = {
      foo: ''
    }

    const namespace = 'foo'

    const actual = buildQualifiedTypes(Object.keys(state), namespace)
    expect(actual['foo/foo']).toEqual('foo/foo')
  })

  test('expect Error if attempt if made to access property that is not available', () => {
    const state = {
      foo: ''
    }

    const namespace = 'foo'

    const actual = buildQualifiedTypes(Object.keys(state), namespace)

    expect(() => {
      // eslint-disable-next-line
      const _ = actual['poop/foo']
    }).toThrow(`Unrecognised commit type 'poop/foo'`)
  })
})
