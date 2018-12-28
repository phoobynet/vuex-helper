import buildStateResetter from '../../src/builders/buildStateResetter'

describe('buildStateResetter', () => {
  test(`when stateKeys arg not array expect error 'Expected stateKeys argument to be an array of strings'`, () => {
    // not array
    const stateKeys = {}
    expect(() => {
      buildStateResetter({ stateKeys, defaultState: {} })
    }).toThrow('Expected stateKeys argument to be an array of strings')
  })

  test(`when defaultState is no Object like expect error 'Expected defaultState argument to be a object'`, () => {
    const stateKeys = ['foo']
    const defaultState = 1

    expect(() => {
      buildStateResetter({ stateKeys, defaultState })
    }).toThrow('Expected defaultState argument to be a object')
  })

  test('expect commit to be called with matching key and defaultState', () => {
    const stateKeys = ['foo']
    const defaultState = { foo: 'bar' }

    const mockCommit = jest.fn((type, value, options) => {
    })

    const resetState = buildStateResetter({ stateKeys, defaultState })

    resetState(mockCommit)

    // single stateKey, so expected number of calls should be 1
    expect(mockCommit.mock.calls.length).toBe(1)

    // first and only call
    const firstCall = mockCommit.mock.calls[0]

    // check type === stateKey
    const typeArg = firstCall[0]
    expect(typeArg).toBe('foo')

    // check second argument default value of foo was committed
    const valueArg = firstCall[1]
    expect(valueArg).toBe(defaultState.foo)

    // check options arg is defaulting
    const optionsArg = firstCall[2]
    expect(optionsArg).toEqual({})
  })
})
