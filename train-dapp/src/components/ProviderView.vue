<template>
  <div class="provider">
    <h1>Blockchain Provider Info</h1>
    <section>
      <p>Web3: {{ web3.injectedWeb3 }}</p>
      <p>NetworkId: {{ provider.networkId }}</p>
      <p><strong>Accounts</strong></p>
      <table style="width:80%">
        <tr>
          <th>Account</th>
          <th>Balance</th>
        </tr>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.account }}</td>
          <td>{{ user.balance }}</td>
        </tr>
      </table>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProviderView',
  data () {
    return {
      web3: this.$store.state.provider,
      show: false
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
      'fetchUsers'
    ])
  },
  async mounted () {
    // await this.registerWeb3()
    // await this.fetchUsers()
  }
}
</script>
