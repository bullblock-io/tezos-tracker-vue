<template>
  <div class="col">
    <div class="row">
      <div class="col">
        <p>Blocks list</p>
      </div>
    </div>
    <div class="row">
      <table class="table">
        <thead>
          <th>Block ID</th>
          <th>Time</th>
          <th>Baker</th>
          <th>Volume</th>
          <th>Fees</th>
        </thead>
        <tbody>
          <tr v-for="block in blocks" v-bind:key="block.level">
            <td>
              <router-link :to="{name: 'block', params: {level: block.level}}">{{block.level}}</router-link>
            </td>
            <td>{{block.timestamp | tsfromnow }}</td>
            <td>
              <router-link :to="{name: 'baker', params: {baker: block.baker}}">{{block.baker}}</router-link>
            </td>
            <td>{{block.volume | tezos }}</td>
            <td>{{block.fees | tezos }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { ACTIONS } from "../../store";

export default {
  name: "Blocks_full",
  computed: mapState({
    blocks: state => state.blocks
  }),
  async created() {
    await this.$store.dispatch(ACTIONS.BLOCKS_GET);
  }
};
</script>

<style  />
