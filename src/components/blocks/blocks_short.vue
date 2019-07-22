<template>
  <div class="col">
    <div class="row">
      <div class="col">
        <p>Blocks list</p>
        <p>
          <router-link :to="{name: 'blocks'}">View All</router-link>
        </p>
      </div>
    </div>
    <div class="row">
      <table class="table">
        <thead>
          <th>Time</th>
          <th>Block ID</th>
          <th>Baker</th>
        </thead>
        <tbody>
          <tr v-for="block in blocks" v-bind:key="block.level">
            <td>{{block.timestamp | tsfromnow }}</td>
            <td>
              <router-link :to="{name: 'block', params: {level: block.level}}">{{block.level}}</router-link>
            </td>
            <td>
              <router-link :to="{name: 'baker', params: {baker: block.baker}}">{{block.baker}}</router-link>
            </td>
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
  name: "Blocks_short",
  props: {},
  computed: mapState({
    blocks: state => state.blocks
  }),
  async created() {
    await this.$store.dispatch(ACTIONS.BLOCKS_GET);
  }
};
</script>
<style  />
