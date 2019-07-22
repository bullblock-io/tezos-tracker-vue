<template>
  <div>
    <p class="hero">NOT IMPLEMENTED</p>
    <table class="table">
      <thead>
        <th>Baker</th>
        <th>Blocks</th>
        <th>Staked assets</th>
        <th>Fee</th>
        <th>Endorsement</th>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { ACTIONS } from "../../store";

export default {
  name: "Bakers",
  props: {},
  computed: mapState({
    bakers: state => state.bakers
  }),
  async mounted() {
    // await this.$store.dispatch(ACTIONS.BAKERS_GET);
  }
};
</script>

<style scoped >
</style>
