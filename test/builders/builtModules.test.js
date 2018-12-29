import builtModules from '../../src/builders/builtModules'

describe('builtModules', () => {
  afterEach(() => {
    builtModules.clear()
  })

  test('expect module namespace to be added', () => {
    builtModules.add('foo')

    expect(builtModules.count()).toBe(1)
    expect(builtModules.has('foo')).toBeTruthy()
  })

  test('expect zero count when clear() is called', () => {
    builtModules.add('foo')

    builtModules.clear()

    expect(builtModules.count()).toBe(0)
    expect(builtModules.has('foo')).toBeFalsy()
  })

  test('expect adding the same namespace more than once does not affect the count', () => {
    builtModules.add('foo')
    builtModules.add('foo')

    expect(builtModules.count()).toBe(1)
  })

  test('remove namespace', () => {
    builtModules.add('foo')
    builtModules.add('bar')

    expect(builtModules.has('bar')).toBeTruthy()

    builtModules.remove('bar')

    expect(builtModules.has('bar')).toBeFalsy()
  })

  test('expect error when adding two namespace but differently cased', () => {
    builtModules.add('foo')

    expect(() => {
      builtModules.add('FOO')
    }).toThrow('Case-insensitive namespace error. FOO has already been added, but with a different case')
  })
})
