<template>
  <div class="card mr-2">
    <div class="card-header">
      <div class="title">
        <h3>
          <span class="text">Transaction list</span>
          <div class="counter">
            <span class="line"></span>
            <span class="counter-text">{{count}}</span>
          </div>
        </h3>
      </div>
      <div class="table-filters">
        <div class="dropdown float-left">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="thisYear2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >This year</button>
          <div class="dropdown-menu" aria-labelledby="thisYear2">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </div>
        <router-link :to="{name: 'txs'}">
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
          <span>{{ row.item.timestamp | timeformat("hh:mm:ss DD.MM.YY") }}</span>
        </template>

        <template slot="level" slot-scope="row">
          <b-link :to="{ name: 'block', params: { level: row.item.blockLevel }}">
            <span>{{ row.item.blockLevel }}</span>
          </b-link>
        </template>

        <template slot="baker" slot-scope="row">
          <b-link :to="{ name: 'tx', params: { txhash: row.item.operationGroupHash }}">
            <span>{{ row.item.operationGroupHash | longhash(35) }}</span>
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
  name: "Transactions",
  props: {},
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
        { key: "baker", label: "Transaction hash" }
      ]
    };
  },
  computed: {
    ...mapState({
      transactions: state => state.txs,
      count: state => state.counts.txs
    }),
    rows() {
      return Number(this.count);
      console.log(this.count);
      return this.count;
    },
    items() {
      return this.transactions;
    }
  },
  watch: {
    currentPage: {
      async handler(value) {
        await this.$store.dispatch(ACTIONS.TRANSACTIONS_GET, {
          page: value,
          perPage: this.perPage
        });
      }
    }
  },
  async created() {
    await this.$store.dispatch(ACTIONS.TRANSACTIONS_GET, {
      page: this.currentPage,
      perPage: this.perPage
    });
  }
};
</script>

<style scoped>
</style>