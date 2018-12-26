import Vue from 'vue'
import VueRouter from 'vue-router'
import customersRoute from './components/customers/customersRoute'

Vue.use(VueRouter)

const routes = [
  customersRoute
]

const router = new VueRouter({
  routes
})

export default router
