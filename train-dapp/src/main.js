// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import web3Plugin from './web3Plugin'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(store)
Vue.use(web3Plugin)
// export const Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
