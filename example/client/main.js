import Vue from 'vue'
import router from './router'
import store from './store'
import App from '@/components/App'

new Vue({
  router,
  store,
  template: `<app></app>`,
  components: {
    App
  }
}).$mount('#app')
