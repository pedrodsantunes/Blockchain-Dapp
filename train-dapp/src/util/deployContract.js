const abiArray = [
  {
    'constant': false,
    'inputs': [],
    'name': 'pay',
    'outputs': [ { 'name': '', 'type': 'bool' } ],
    'payable': true,
    'stateMutability': 'payable',
    'type': 'function'
  }, {
    'constant': true,
    'inputs': [],
    'name': 'checkContractBalance',
    'outputs': [ { 'name': '', 'type': 'uint256' } ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  }, {
    'inputs': [],
    'payable': true,
    'stateMutability': 'payable',
    'type': 'constructor'
  }, {
    'anonymous': false,
    'inputs': [],
    'name': 'Paid',
    'type': 'event'
  }, {
    'anonymous': false,
    'inputs': [],
    'name': 'Aborted',
    'type': 'event' }]

const data = '0x' + '6080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610199806100536000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631b9265b81461005157806350312c9e14610073575b600080fd5b61005961009e565b604051808215151515815260200191505060405180910390f35b34801561007f57600080fd5b5061008861014e565b6040518082815260200191505060405180910390f35b60008034141515610146576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f19350505050158015610110573d6000803e3d6000fd5b507f34ec5380860d4fd12cd95d4d2f001afc87d48bfc50847bec134b0c315c8e2d7760405160405180910390a16001905061014b565b600090505b90565b60003073ffffffffffffffffffffffffffffffffffffffff16319050905600a165627a7a7230582019fea37a7fecec90cb92ae03e9e0abbca0e5b65d4c611b4de7cc6d4236843c580029'
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

export async function deployContract (provider) {
  return new Promise((resolve, reject) => {
    var myContract = provider.eth.contract(abiArray)
    // instantiate by address

    // Unlock the coinbase account to make transactions out of it
    console.log('Unlocking coinbase account')
    var password = ''
    try {
      provider.personal.unlockAccount(provider.eth.coinbase, password)
    } catch (e) {
      console.log(e)
      return
    }

    // var contractInstance = myContract.at(provider.eth.coinbase)
    var contractInstance = myContract.new({
      from: provider.eth.coinbase,
      gas: 1000000,
      data})
    console.log('Contract: ' + contractInstance)
    console.log('Your contract is being deployed in transaction: ' + contractInstance.transactionHash)
    waitBlock(provider, contractInstance)
    // deploy new contract
    resolve({myContract, contractInstance})
  })
}
