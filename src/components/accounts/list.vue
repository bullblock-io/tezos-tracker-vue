<template>
  <div>
    <p class="hero">NOT IMPLEMENTED</p>
    <table class="table">
      <thead>
        <th>Account</th>
        <th>Amount</th>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { ACTIONS } from "../../store";

export default {
  name: "Accounts",
  props: {},
  computed: mapState({
    accounts: state => state.accounts
  }),
  async mounted() {
    // await this.$store.dispatch(ACTIONS.ACCOUNTS_GET);
  }
};
</script>

<style scoped >
</style>
