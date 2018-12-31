import buildModule from '../../src/builders/buildModule'
import builtModules from '../../src/builders/builtModules'
import buildTypes from '../../src/builders/buildTypes'

jest.mock('../../src/builders/builtModules')
jest.mock('../../src/builders/buildTypes')

describe('buildModule suite', () => {
  let state, mockHas, mockAdd, mockBuildTypes
  beforeEach(() => {
    mockBuildTypes = buildTypes.mockImplementationOnce(buildTypes)
  })

  afterEach(() => {
    if (mockHas) {
      mockHas.mockClear()
    }

    mockBuildTypes.mockClear()
    state = {}
  })

  describe('buildModule args', () => {
    describe('namespace type', () => {
      beforeEach(() => {
        mockHas = builtModules.has.mockReturnValue(false)
        state = {
          foo: ''
        }
      })

      test('must be a string', () => {
        expect(() => {
          buildModule(1, state)
        }).toThrow('namespace must be a string')
      })

      test('must not be an empty string', () => {
        expect(() => {
          buildModule('   ', state)
        }).toThrow('namespace cannot be an empty string')
      })
    })

    describe('namespace registration', () => {
      beforeEach(() => {
        mockHas = builtModules.has.mockReturnValue(true)
        state = {
          foo: ''
        }
      })

      test('must not have already been registered', () => {
        expect(() => {
          buildModule('foo', state)
        }).toThrow('Module called foo already exists in this application')
      })
    })

    describe('state arg', () => {
      beforeEach(() => {
        mockHas = builtModules.has.mockReturnValue(false)
        state = 'fail'
      })

      test('must be an object', () => {
        expect(() => {
          buildModule('foo', state)
        }).toThrow('state argument invalid')
      })
    })
  })

  describe('buildModule should add namespace to builtModules', () => {
    beforeEach(() => {
      mockHas = builtModules.has.mockReturnValue(false)
      mockAdd = builtModules.add.mockImplementation()
      state = {
        foo: null
      }
    })

    test('test', () => {
      buildModule('foo', state)
      expect(mockAdd.mock.calls[0][0]).toEqual('foo')
      expect(mockAdd.mock.calls.length).toBe(1)
    })
  })
})
