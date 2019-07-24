<template>
  <div class="col">
    <div class="row">
      <div class="col">
        <p>Transactions list</p>
      </div>
    </div>
    <div class="row">
      <b-table
        show-empty
        stacked="md"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
      >
        <template slot="txhash" slot-scope="row">
          <b-link
            :to="{name: 'tx', params: { txhash: row.item.operationGroupHash }}"><span>{{ row.item.operationGroupHash | longhash }}</span>
          </b-link>
        </template>

        <template slot="level" slot-scope="row">
          <b-link
            :to="{ name: 'block', params: { level: row.item.blockLevel }}"><span>{{ row.item.blockLevel }}</span>
          </b-link>
        </template>

        <template slot="timestamp" slot-scope="row">
          <span>{{ row.item.timestamp | tsfromnow }}</span>
        </template>

        <template slot="from" slot-scope="row">
          <b-link
            :to="{name: 'account', params: { account: row.item.source }}"><span>{{ row.item.source }}</span>
          </b-link>
        </template>

        <template slot="to" slot-scope="row">
          <b-link
            :to="{name: 'account', params: { account: row.item.destination }}"><span>{{ row.item.destination }}</span>
          </b-link>
        </template>
        <template slot="amount" slot-scope="row">
          <span>{{ row.item.amount | tezos }}</span>
        </template>
        <template slot="fee" slot-scope="row">
          <span>{{ row.item.fee | tezos }}</span>
        </template>
      </b-table>
    </div>
    <b-row>
      <b-col md="2" class="my-1">
        <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
          <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
        </b-form-group>
      </b-col>
      <b-col class="my-1 col-md-10">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          align="right"
          first-text="First"
          prev-text="Prev"
          next-text="Next"
          last-text="Last"
        ></b-pagination>
      </b-col>
    </b-row>
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
      pageOptions: [10, 15, 20, 25, 30],
      fields: [
        { key: 'txhash', label: 'Hash', sortable: true, sortDirection: 'desc' },
        { key: 'level', label: 'Block ID', sortable: true },
        { key: 'timestamp', label: 'Time' },
        { key: 'from', label: 'From' },
        { key: 'to', label: 'To' },
        { key: 'amount', label: 'Amount' },
        { key: 'fee', label: 'Fees' }
      ]
    }
  },
  name: "Transactions",
  props: {
    blockHash: String
  },

  computed: {
    ...mapState({
      transactions: state => state.txs
    }),

    rows() {
      return this.transactions.length
    },

    items() {
      return this.transactions
    }
  },

  async mounted() {
    await this.$store.dispatch(ACTIONS.TRANSACTIONS_GET);
  }
};
</script>

<style scoped >
td {
  text-align: left;
}
</style>
