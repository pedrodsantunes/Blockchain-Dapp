import Vue from 'vue'
import Router from 'vue-router'
import MainView from '@/components/MainView'
import ProviderView from '@/components/ProviderView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'MainView',
      component: MainView
    },
    {
      path: '/provider',
      name: 'ProviderView',
      component: ProviderView
    }
  ]
})
