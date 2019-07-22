<template>
  <table class="table">
    <thead>
      <th>Hash</th>
      <th>Block ID</th>
      <th>Time</th>
      <th>From</th>
      <th>To</th>
      <th>Amount</th>
      <th>Fees</th>
    </thead>
    <tbody>
      <tr v-for="tx in transactions" v-bind:key="tx.hash">
        <td>
          <router-link
            :to="{name: 'tx', params: { txhash: tx.operationGroupHash}}"
          >{{tx.operationGroupHash | longhash }}</router-link>
        </td>
        <td>
          <router-link :to="{name: 'block', params: {level: tx.blockLevel}}">{{tx.blockLevel}}</router-link>
        </td>
        <td>{{tx.timestamp | tsfromnow}}</td>

        <td>
          <router-link :to="{name: 'account', params: {account: tx.source}}">{{tx.source}}</router-link>
        </td>
        <td>
          <router-link :to="{name: 'account', params: {account: tx.destination}}">{{tx.destination}}</router-link>
        </td>
        <td>{{tx.amount | tezos}}</td>
        <td>{{tx.fee | tezos}}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapState } from "vuex";
import { ACTIONS } from "../../store";

export default {
  name: "Transactions",
  props: {
    blockHash: String
  },
  computed: mapState({
    transactions: state => state.txs
  }),
  async mounted() {
    await this.$store.dispatch(ACTIONS.TRANSACTIONS_GET);
  }
};
</script>

<style scoped >
td {
  text-align: left;
}
</style>
