<template>
  <div>
    <b-table
      show-empty
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="0"
      class="table table-borderless table-responsive-sm"
    >
      <template slot="level" slot-scope="row">
        <b-link :to="{ name: 'block', params: { level: row.item.level } }">
          <span>{{ row.item.level }}</span>
        </b-link>
      </template>

      <template slot="timestamp" slot-scope="row">
        <span>{{ row.item.timestamp | timeformat("HH:mm:ss DD.MM.YY") }}</span>
      </template>

      <template slot="baker" slot-scope="row">
        <b-link :to="{ name: 'baker', params: { baker: row.item.baker } }">
          <span>{{ row.item.baker | longhash(42) }}</span>
        </b-link>
      </template>

      <template slot="volume" slot-scope="row">
        <span>{{ row.item.volume | tezos }}</span>
      </template>

      <template slot="fees" slot-scope="row">
        <span>{{ row.item.fees | tezos }}</span>
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
        { key: "timestamp", label: "Timestamp" },
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
      count: state => state.counts
    }),
    rows() {
      return Number(this.count.blocks);
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
          limit: this.perPage
        });
      }
    }
  },
  async created() {
    await this.$store.dispatch(ACTIONS.BLOCKS_GET, {
      page: this.currentPage,
      limit: this.perPage
    });
  }
};
</script>
