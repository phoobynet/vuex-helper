import buildMutationName from '../../src/builders/buildMutationName'

describe('buildMutationName', () => {
  test(`expect stateKey to be prefixed with 'set'`, () => {
    const stateKey = 'fooBar'
    const expected = 'setFooBar'

    const actual = buildMutationName(stateKey)

    expect(expected).toEqual(actual)
  })

  describe('validation', () => {
    test(`throw Error when stateKey arg is not a string`, () => {
      const stateKey = 1

      const wrapper = () => {
        buildMutationName(stateKey)
      }

      expect(wrapper).toThrow('stateKey argument must be a string')
    })

    test(`throw Error when stateKey arg is empty`, () => {
      const stateKey = ''

      expect(() => {
        buildMutationName(stateKey)
      }).toThrow('stateKey argument was an empty string')
    })

    test(`throw Error when stateKey arg is undefined`, () => {
      const stateKey = undefined

      expect(() => {
        buildMutationName(stateKey)
      }).toThrow('stateKey argument must be a string')
    })
  })
})
