import * as types from './mutation-types'

export default {
  [types.REGISTER_WEB3] (state, payload) {
    console.log('registerWeb3instance Mutation being executed', payload)
    state.provider = payload
  },
  [types.FETCH_USERS] (state) {
    state.users = []
  },
  [types.RECEIVE_USERS] (state, users) {
    state.users = users
  },
  [types.FETCH_CONTRACT] (state, contract) {
    state.contract = contract
  }
}
