import * as types from './mutation-types'
import store from './index'
import web3Registration from '../util/getWeb3'
import { deployContract } from '../util/deployContract'
import { getUsers, userPayment, terminate } from '../util/operations'

export const registerWeb3 = ({commit}) => {
  console.log('registerWeb3 Action being executed')
  web3Registration.then(result => {
    console.log('committing result to provider')
    commit(types.REGISTER_WEB3, result)
  }).catch(e => {
    console.log('error in action registerWeb3', e)
  })
}

export const fetchUsers = ({ commit }) => {
  commit(types.FETCH_USERS)
  getUsers(store.state.provider.web3()).then(users => {
    commit(types.RECEIVE_USERS, users)
  }).catch(err => {
    console.log(err)
  })
}

export const submitContract = ({ commit }) => {
  console.log('Provider')
  deployContract(store.state.provider.web3()).then(result => {
    console.log(result)
    commit(types.FETCH_CONTRACT, result.contractInstance)
  }).catch(err => {
    console.log(err)
  })
}

export const payment = ({ commit }, data) => {
  userPayment(store.state.contract, store.state.provider.web3(), data).then(result => {
    console.log(result)
    getUsers(store.state.provider.web3()).then(users => {
      commit(types.RECEIVE_USERS, users)
    }).catch(err => {
      console.log(err)
    })
  }).catch(err => {
    console.log(err)
  })
}

export const terminateContract = ({ commit }) => {
  terminate(store.state.provider.web3()).then(result => {
    console.log(result)
  }).catch(err => {
    console.log(err)
  })
}
