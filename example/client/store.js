import Vue from 'vue'
import Vuex from 'vuex'
import customers from './components/customers/customersModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  modules: {
    customers
  }
})

export default store
