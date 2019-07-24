<template>
  <b-card-group deck>
    <b-card no-body>
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
          <b-table
            show-empty
            stacked="md"
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
          >
            <template slot="timestamp" slot-scope="row">
              <span>{{ row.item.timestamp | tsfromnow }}</span>
            </template>

            <template slot="level" slot-scope="row">
              <b-link
                :to="{ name: 'block', params: { level: row.item.level }}"><span>{{ row.item.level }}</span>
              </b-link>
            </template>

            <template slot="baker" slot-scope="row">
              <b-link
                :to="{ name: 'baker', params: { baker: row.item.baker }}"><span>{{ row.item.baker }}</span>
              </b-link>
            </template>
          </b-table>
        </div>
        <b-row>
          <b-col class="my-1 col-md-12">
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
    </b-card>
    <b-card no-body>
      <div class="col">
        <div class="row">
          <div class="col">
            <p>Transaction list</p>
            <p>
              <router-link :to="{name: 'txs'}">View All</router-link>
            </p>
          </div>
        </div>
        <div class="row">
          <b-table
            show-empty
            stacked="md"
            :items="tsx_items"
            :fields="tsx_fields"
            :current-page="tsx_currentPage"
            :per-page="tsx_perPage"
          >
            <template slot="timestamp" slot-scope="row">
              <span>{{ row.item.timestamp | tsfromnow }}</span>
            </template>

            <template slot="level" slot-scope="row">
              <b-link
                :to="{ name: 'block', params: { level: row.item.blockLevel }}"><span>{{ row.item.blockLevel }}</span>
              </b-link>
            </template>

            <template slot="txhash" slot-scope="row">
              <b-link
                :to="{name: 'tx', params: { txhash: row.item.operationGroupHash }}"><span>{{ row.item.operationGroupHash }}</span>
              </b-link>
            </template>
          </b-table>
        </div>
        <b-row>
          <b-col class="my-1 col-md-12">
            <b-pagination
              v-model="tsx_currentPage"
              :total-rows="tsx_rows"
              :per-page="tsx_perPage"
              align="right"
              first-text="First"
              prev-text="Prev"
              next-text="Next"
              last-text="Last"
            ></b-pagination>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </b-card-group>
</template>
<script>
import { mapState } from "vuex";
import { ACTIONS } from "../../store";
export default {
  data() {
    return {
      perPage: 10,
      tsx_perPage: 10,
      currentPage: 1,
      tsx_currentPage: 1,
      fields: [
        { key: 'timestamp', label: 'Time', sortable: true },
        { key: 'level', label: 'Block ID', sortable: true, sortDirection: 'desc' },
        { key: 'baker', label: 'Baker' }
      ],
      tsx_fields: [
        { key: 'timestamp', label: 'Time', sortable: true },
        { key: 'level', label: 'Block ID', sortable: true, sortDirection: 'desc' },
        { key: 'txhash', label: 'Transaction hash', sortable: true, sortDirection: 'desc' }
      ]
    }
  },
  name: "Blocks_short",
  props: {},
  computed: {
    ...mapState({
      blocks: state => state.blocks,
      transactions: state => state.txs
    }),

    rows() {
      return this.blocks.length
    },

    items() {
      return this.blocks
    },

    tsx_rows() {
      return this.transactions.length
    },

    tsx_items() {
      console.log(this.transactions)
      return this.transactions
    }
  },

  async created() {
    await this.$store.dispatch(ACTIONS.BLOCKS_GET);
    await this.$store.dispatch(ACTIONS.TRANSACTIONS_GET);
  }
};
</script>
<style  />
