import buildModule from '../../src/builders/buildModule'
import builtModules from '../../src/builders/builtModules'

jest.mock('../../src/builders/builtModules')

describe('buildModule', () => {
  let state, fooModule, mockIsModuleDuplicated, mockAddModule

  describe('module integration test', () => {
    beforeEach(() => {
      mockIsModuleDuplicated = builtModules.isModuleDuplicated.mockReturnValue(false)
      mockAddModule = builtModules.addModule.mockImplementation((n) => {
      })
    })

    afterEach(() => {
      mockIsModuleDuplicated.mockClear()
      mockAddModule.mockClear()
    })

    describe('validation', () => {
      test('expect error when namespace is not a string', () => {
        state = {
          foo: null
        }

        const namespace = 1

        expect(() => {
          fooModule = buildModule(namespace, state)
        }).toThrow('namespace must be a string')
      })

      test('expect error when namespace is an empty string', () => {
        state = {
          foo: null
        }

        const namespace = ''

        expect(() => {
          fooModule = buildModule(namespace, state)
        }).toThrow('namespace cannot be an empty string')
      })

      test('expect call to check if namespace is already in use', () => {
        state = {
          foo: null
        }

        const namespace = 'foo'

        fooModule = buildModule(namespace, state)

        expect(mockIsModuleDuplicated.mock.calls.length).toEqual(1)
      })
    })

    describe('result tests', () => {
      beforeEach(() => {
        state = {
          foo: null
        }

        fooModule = buildModule('foo', state)
      })
      test('expect foo.state to equal state arg', () => {
        expect(fooModule.state).toEqual(state)
      })

      test('expect foo.namespace to equal the namespace arg', () => {
        expect(fooModule.namespace).toEqual('foo')
      })
    })
  })
})
