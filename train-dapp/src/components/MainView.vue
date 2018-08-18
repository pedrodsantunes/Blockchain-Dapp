<template>
  <div class="main">
    <h1>Welcome to Blockchain Train demo App</h1>
    <img src="../assets/train.jpg" height="100" width="150">
    <div class="row">
      <div class="column" style="background-color:#aaa;">
        <h2>Passengers</h2>
        <div v-for="(passenger, index) in users.slice(2)" :key="passenger.id">
          <p>
            <strong>Id:</strong>{{index +1 }}
            <strong>Money:</strong>{{passenger.balance}}
            <button @click="pay(passenger)">Pay</button>
          </p>
        </div>
      </div>
      <div class="column" style="background-color:#bbb;">
        <h2>Operator</h2>
        <p>Addres: {{ users[0].account }}</p>
        <p>Money: {{users[0].balance}}</p>
        <p>Trip cost: {{tripCost}}</p>
        <p>
          <input v-model="tripCost" type="number" min="1">
          <button @click="publishContract()">Publish Contract</button>
          <button @click="endContract()">Terminate Contract</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MainView',
  data () {
    return {
      operator: {},
      tripCost: 0,
      clients: []
    }
  },
  computed: {
    ...mapGetters([
      'provider',
      'users'
    ])
  },
  methods: {
    ...mapActions([
      'registerWeb3',
      'fetchUsers',
      'submitContract',
      'terminateContract',
      'payment'
    ]),
    publishContract: function () {
      this.submitContract()
    },
    endContract: function () {
      console.log('Not implemented')
      // this.terminateContract()
    },
    pay: function (passenger) {
      this.payment({from: passenger.account, value: this.tripCost})
    }
  },
  async mounted () {
    await this.registerWeb3()
    await this.fetchUsers()
    this.operator = this.users[0]
  }
}
</script>
