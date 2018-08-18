import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  provider: {},
  users: [],
  contract: {}
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

Vue.use(store)

export default store
