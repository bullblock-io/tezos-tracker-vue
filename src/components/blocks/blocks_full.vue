<template>
  <div class="col">
    <div class="row">
      <div class="col">
        <p>Blocks list</p>
      </div>
    </div>
    <div class="row">
      <b-table
        show-empty
        stacked="md"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="0"
      >
        <template slot="level" slot-scope="row">
          <b-link :to="{ name: 'block', params: { level: row.item.level }}">
            <span>{{ row.item.level }}</span>
          </b-link>
        </template>

        <template slot="timestamp" slot-scope="row">
          <span>{{ row.item.timestamp | tsfromnow }}</span>
        </template>

        <template slot="baker" slot-scope="row">
          <b-link :to="{ name: 'baker', params: { baker: row.item.baker }}">
            <span>{{ row.item.baker }}</span>
          </b-link>
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
        {
          key: "level",
          label: "Block ID",
          sortable: true,
          sortDirection: "desc"
        },
        { key: "timestamp", label: "Time", sortable: true },
        { key: "baker", label: "Baker" },
        { key: "volume", label: "Volume" },
        { key: "fees", label: "Fees" }
      ]
    };
  },
  name: "Blocks_full",
  computed: {
    ...mapState({
      blocks: state => state.blocks,
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
