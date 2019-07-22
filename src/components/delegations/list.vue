<template>
  <table class="table">
    <thead>
      <th>Hash</th>
      <th>From</th>
      <th>To</th>
      <th>Block</th>
      <th>Time</th>
      <th>Amount</th>
      <th>Fee</th>
    </thead>
    <tbody>
      <tr v-for="del in delegations" v-bind:key="del.operationGroupHash">
        <td>
          <router-link
            :to="{name: 'delegation', params: {txID: del.operationGroupHash}}"
          >{{del.operationGroupHash | longhash}}</router-link>
        </td>
        <td>
          <router-link :to="{name: 'account', params: {account: del.source}}">{{del.source}}</router-link>
        </td>

        <td v-if="del.delegate">
          <router-link :to="{name: 'account', params: {account: del.delegate}}">{{del.delegate}}</router-link>
        </td>
        <td v-else>None</td>

        <td>
          <router-link :to="{name: 'block', params: {level: del.blockLevel}}">{{del.blockLevel}}</router-link>
        </td>
        <td>{{del.timestamp | tsfromnow}}</td>
        <td>TODO</td>
        <td>{{del.fee}}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapState } from "vuex";
import { ACTIONS } from "../../store";
export default {
  name: "Delegations",
  props: {
    blockHash: String
  },
  computed: mapState({
    delegations: state => state.delegations
  }),
  async mounted() {
    await this.$store.dispatch(ACTIONS.DELEGATIONS_GET);
  }
};
</script>

<style scoped >
td {
  text-align: left;
}
</style>
