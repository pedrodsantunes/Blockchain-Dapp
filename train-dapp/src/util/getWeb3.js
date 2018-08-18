import Web3 from 'web3'

let web3Registration = new Promise(function (resolve, reject) {
  var web3js = window.web3
  if (typeof web3js !== 'undefined') {
    let web3 = new Web3()
    web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'))
    console.log(web3.eth.mining)
    console.log(web3.eth.hashrate)
    console.log(web3.eth.gasPrice)
    console.log(web3.eth.blockNumber)
    resolve({
      injectedWeb3: web3.isConnected(),
      networkId: web3.version.network,
      coinbase: web3.eth.coinbase,
      accounts: web3.eth.accounts,
      web3 () {
        return web3
      }
    })
  } else {
    reject(new Error('Unable to connect to the network'))
  }
})

export default web3Registration
