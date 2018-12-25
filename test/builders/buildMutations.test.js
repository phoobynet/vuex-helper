import buildMutations from '../../src/builders/buildMutations'

describe('buildMutations', () => {
  const args = {
    stateKeys: ['foo'],
    defaultState: {
      foo: null
    }
  }

  const state = {
    foo: null
  }

  test('expect function matching each stateKey', () => {
    const actual = buildMutations(args)

    expect(actual.foo).toBeInstanceOf(Function)
  })

  describe('reference type tests', () => {
    test('expect mutator to copy array into state', () => {
      state.foo = []
      const newFoo = ['foo']

      const actual = buildMutations(args)
      actual.foo(state, newFoo)

      // Test for meaningful equality
      expect(state.foo).toEqual(['foo'])

      // Ensure reference inequality to guarantee the array has been copied
      expect(state.foo !== newFoo).toBeTruthy()
    })

    test('expect mutator to copy object into state', () => {
      state.foo = {}
      const newFoo = { foo: 'bar' }

      const actual = buildMutations(args)
      actual.foo(state, newFoo)

      // Test for meaningful equality
      expect(state.foo).toEqual({
        foo: 'bar'
      })

      // Ensure reference inequality to guarantee the array has been copied
      expect(state.foo !== newFoo).toBeTruthy()
    })
  })

  describe('scalar type tests', () => {
    test('expect mutator to assign scalar', () => {
      state.foo = ''
      const newFoo = 'bar'

      const actual = buildMutations(args)
      actual.foo(state, newFoo)

      expect(state.foo).toEqual('bar')
      expect(state.foo === newFoo).toBeTruthy()
    })
  })
})
