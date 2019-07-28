<template>
  <div>
    <div>
      <h2>Block information {{block.level}}</h2>
      <table class="table-borderless text-left table border">
        <tr>
          <td>Hash</td>
          <td>{{block.hash}}</td>
        </tr>
        <tr>
          <td>Timestamp</td>
          <td>{{block.timestamp}}</td>
        </tr>
        <tr>
          <td>Volume</td>
          <td>{{block.volume | tezos}}</td>
        </tr>
        <tr>
          <td>Cycle</td>
          <td>{{block.metaCycle}}</td>
        </tr>
        <tr>
          <td>Baker</td>
          <td>
            <router-link :to="{name: 'baker', params: {baker: block.baker}}">{{block.baker}}</router-link>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { ACTIONS } from "../../store";
import _ from "lodash";

export default {
  name: "Block",
  props: {
    level: ""
  },
  components: {},
  computed: {
    ...mapState({
      block: state => state.viewBlock
    }),
    action() {
      return _.isFinite(parseInt(this.$props.level))
        ? ACTIONS.BLOCK_GET_BY_ID
        : ACTIONS.BLOCK_GET_BY_HASH;
    }
  },
  watch: {
    level: {
      async handler(value) {
        await this.$store.dispatch(this.action, value);
      }
    }
  },
  async created() {
    await this.$store.dispatch(this.action, this.$props.level);
  }
};
</script>

<style scoped>
</style>