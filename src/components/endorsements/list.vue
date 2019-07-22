<template>
  <div>
    Endorsements for level {{level}}
    <table class="table">
      <thead>
        <th>Hash</th>
        <th>Endorsed Block</th>
        <th>Endorser</th>
        <th>Endorsed ID</th>
        <th>Time</th>
      </thead>
      <tbody>
        <tr v-for="end in endorsements" v-bind:key="end.operationGroupHash">
          <td>
            <router-link
              :to="{name: 'endorsement', params: {txID: end.operationGroupHash}}"
            >{{end.operationGroupHash | longhash }}</router-link>
          </td>
          <td>
            <router-link :to="{name: 'block', params: {level: end.level}}">{{end.level}}</router-link>
          </td>
          <td>
            <router-link :to="{name: 'account', params: {account: end.delegate}}">{{end.delegate}}</router-link>
          </td>
          <td>{{end.slots}}</td>
          <td>{{end.timestamp | tsfromnow}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { ACTIONS } from "../../store";

export default {
  name: "Endorsements",
  props: {
    level: Number
  },
  computed: mapState({
    endorsements: state => state.endorsements
  }),
  async mounted() {
    await this.$store.dispatch(ACTIONS.ENDORSEMENTS_GET, this.$props.level);
  }
};
</script>

<style scoped >
</style>
