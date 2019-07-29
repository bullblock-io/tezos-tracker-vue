<template>
  <div>
    <b-table
      show-empty
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="0"
      class="transactions-table table table-borderless table-responsive-md"
    >
      <template slot="txhash" slot-scope="row">
        <b-link
          :to="{ name: 'tx', params: { txhash: row.item.operationGroupHash } }"
        >
          <span>{{ row.item.operationGroupHash | longhash(35) }}</span>
        </b-link>
      </template>

      <template slot="from" slot-scope="row">
        <b-link :to="{ name: 'account', params: { account: row.item.source } }">
          <span>{{ row.item.source | longhash(20) }}</span>
        </b-link>
      </template>

      <template slot="to" slot-scope="row">
        <b-link
          :to="{ name: 'account', params: { account: row.item.destination } }"
        >
          <span>{{ row.item.delegate | longhash(20) }}</span>
        </b-link>
      </template>

      <template slot="level" slot-scope="row">
        <b-link :to="{ name: 'block', params: { level: row.item.blockLevel } }">
          <span>{{ row.item.blockLevel }}</span>
        </b-link>
      </template>

      <template slot="timestamp" slot-scope="row">
        <span>{{ row.item.timestamp | timeformat("hh:mm:ss DD.MM.YY") }}</span>
      </template>

      <template slot="amount" slot-scope="row">
        <span>TODO {{ row.item.fee }}</span>
      </template>
      <template slot="fee" slot-scope="row">
        <span>{{ row.item.fee | tezos }}</span>
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
</template>
<script>
import { mapState } from "vuex";
import { ACTIONS } from "../../store";
export default {
  name: "Delegations",
  props: {},
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      pageOptions: [10, 15, 20, 25, 30],
      fields: [
        { key: "txhash", label: "Delegations Hash" },
        { key: "from", label: "From" },
        { key: "to", label: "To" },
        { key: "level", label: "Block ID" },
        { key: "timestamp", label: "Timestamp" },
        { key: "amount", label: "Amount" },
        { key: "fee", label: "Fees" }
      ]
    };
  },
  computed: {
    ...mapState({
      delegations: state => state.delegations,
      count: state => state.counts
    }),
    rows() {
      return this.count.delegations;
    },
    items() {
      return this.delegations;
    }
  },
  watch: {
    currentPage: {
      async handler(value) {
        await this.$store.dispatch(ACTIONS.DELEGATIONS_GET, {
          page: value,
          limit: this.perPage
        });
      }
    }
  },
  async mounted() {
    await this.$store.dispatch(ACTIONS.DELEGATIONS_GET);
  }
};
</script>

<style scoped></style>
