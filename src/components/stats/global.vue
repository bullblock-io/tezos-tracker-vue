<template>
  <div class="col">
    <div class="row">
      <div class="col">
        <p>Price</p>
        <p>${{info.price}}</p>
        <p>{{info.price_24h_change}}%</p>
      </div>
      <div class="col">
        <p>Height</p>
        <p>{{head.level}}</p>
      </div>
      <div class="col">
        <p>Cycle</p>
        <p>{{head.metaCycle}}</p>
      </div>
      <div class="col">
        <p>Staking ratio</p>
        <p>TODO</p>
      </div>
      <div class="col">
        <p>Annual Yield</p>
        <p>TODO</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { ACTIONS } from "../../store";
export default {
  name: "GlobalStats",
  props: {},
  computed: mapState({
    info: state => state.priceInfo,
    head: state => state.headBlock
  }),
  async created() {
    await Promise.all([
      await this.$store.dispatch(ACTIONS.INFO_GET),
      await this.$store.dispatch(ACTIONS.BLOCK_GET_HEAD)
    ]);
  }
};
</script>

<style scoped >
</style>
