import {
  buildModule,
  compose,
  composeActions,
  composeGetters,
  composeMutations
} from '../../../../src'
import customersApi from './customersApi'

const state = {
  customers: [],
  fetching: false,
  error: null
}

const { types, resetState, ...customersModule } = buildModule('customers', state)

const getters = {
  hasCustomers (state) {
    return state.customers.length
  },

  hasError (state) {
    return !!state.error
  }
}

const customMutations = {
  clearLastError (state) {
    state.error = null
  },

  removeCustomer (state, id) {
    state.customers = state.customers.filter(customer => customer.id + '' !== id + '')
  }
}

const actions = {
  cleanUp ({ commit }) {
    resetState(commit)
  },

  async getCustomers ({ commit }) {
    try {
      commit(types.fetching, true)
      commit(types.customers, [])
      commit(types.error, null)

      const customers = await customersApi.getCustomers()

      commit(types.customers, customers)
    } catch (err) {
      commit(types.error, err)
      console.error(err)
    } finally {
      commit(types.fetching, false)
    }
  }
}

export default compose(
  composeActions(actions),
  composeGetters(getters),
  composeMutations(customMutations)
)(customersModule)
