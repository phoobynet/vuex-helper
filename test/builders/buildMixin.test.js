import buildMixin from '../../src/builders/buildMixin'

describe('buildMixin', () => {
  const buildMixinArg = {
    namespace: 'foo',
    stateKeys: ['foo'],
    mutationSettersMap: {
      setFoo: 'foo'
    }
  }

  test('foo', () => {
    const actual = buildMixin(buildMixinArg)
    console.log(actual.computed.foo)
    expect(actual.computed.foo).toBeInstanceOf(Function)
    expect(actual.methods.setFoo).toBeInstanceOf(Function)
  })
})
