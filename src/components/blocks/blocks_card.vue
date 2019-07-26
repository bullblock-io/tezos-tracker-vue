<template>
  <div class="card ml-2">
    <div class="card-header">
      <div class="title">
        <h3>
          <span class="text">Blocks list</span>
          <div class="counter">
            <span class="line"></span>
            <span class="counter-text">{{head.level}}</span>
          </div>
        </h3>
      </div>
      <div class="table-filters">
        <div class="dropdown float-left">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="thisYear"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >This year</button>
          <div class="dropdown-menu" aria-labelledby="thisYear">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </div>
        <router-link :to="{name: 'blocks'}">
          <button class="btn green float-right">View All</button>
        </router-link>
      </div>
    </div>

    <div class="card-body">
      <b-table
        show-empty
        stacked="md"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="0"
        class="table table-borderless table-responsive-sm"
      >
        <template slot="timestamp" slot-scope="row">
          <span>{{ row.item.timestamp }}</span>
        </template>

        <template slot="level" slot-scope="row">
          <b-link :to="{ name: 'block', params: { level: row.item.level }}">
            <span>{{ row.item.level }}</span>
          </b-link>
        </template>

        <template slot="baker" slot-scope="row">
          <b-link :to="{ name: 'baker', params: { baker: row.item.baker }}">
            <span>{{ row.item.baker | longhash(42) }}</span>
          </b-link>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="right"
        first-text
        prev-text="Prev"
        next-text="Next"
        last-text
      ></b-pagination>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { ACTIONS } from "../../store";
export default {
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: "timestamp", label: "Time", sortable: true },
        {
          key: "level",
          label: "Block ID",
          sortable: true,
          sortDirection: "desc"
        },
        { key: "baker", label: "Baker" }
      ]
    };
  },
  name: "Blocks_short",
  props: {},
  computed: {
    ...mapState({
      blocks: state => state.blocks,
      transactions: state => state.txs,
      head: state => state.headBlock
    }),
    rows() {
      return this.head.level;
    },
    items() {
      return this.blocks;
    }
  },
  watch: {
    currentPage: {
      async handler(value) {
        await this.$store.dispatch(ACTIONS.BLOCKS_GET, {
          page: value,
          perPage: this.perPage
        });
      }
    }
  },
  async created() {
    await Promise.all([
      this.$store.dispatch(ACTIONS.BLOCKS_GET, {
        page: this.currentPage,
        perPage: this.perPage
      }),
      this.$store.dispatch(ACTIONS.BLOCK_GET_HEAD)
    ]);
  }
};
</script>
<style  />
