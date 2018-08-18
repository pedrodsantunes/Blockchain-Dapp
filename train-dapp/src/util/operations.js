function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// We need to wait until any miner has included the transaction
// in a block to get the address of the contract
async function waitBlock (provider, contract) {
  while (true) {
    let receipt = provider.eth.getTransactionReceipt(contract.transactionHash)
    if (receipt && receipt.contractAddress) {
      console.log('Your contract has been deployed, address' + receipt.contractAddress)
      console.log('Note that it might take 30 - 90 sceonds for the block to propagate')
      break
    }
    console.log('Waiting a mined block to include your contract... currently in block' + provider.eth.blockNumber)
    await sleep(4000)
  }
}

export async function getUsers (provider) {
  return new Promise((resolve, reject) => {
    let users = []
    const accounts = provider.eth.accounts
    console.log(accounts)
    accounts.forEach(function (account) {
      const balanceBN = provider.eth.getBalance(account)
      const balance = provider.fromWei(balanceBN.toString(10), 'ether')
      users.push({ account, balance })
    })
    resolve(users)
  })
}

export async function userPayment (contract, provider, data) {
  return new Promise((resolve, reject) => {
    const result = contract.pay(data)
    waitBlock(provider, contract)
    resolve({result})
  })
}

export async function terminate (contract, provider) {
  return new Promise((resolve, reject) => {
    resolve({})
  })
}
