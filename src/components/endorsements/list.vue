<template>
  <div>
    <b-table
      show-empty
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="0"
      class="table table-borderless table-responsive-md"
    >
      <template slot="txhash" slot-scope="row">
        <b-link
          :to="{ name: 'tx', params: { txhash: row.item.operationGroupHash } }"
        >
          <span>{{ row.item.operationGroupHash | longhash(35) }}</span>
        </b-link>
      </template>

      <template slot="block" slot-scope="row">
        <b-link :to="{ name: 'block', params: { level: row.item.level } }">
          <span>{{ row.item.blockHash | longhash(25) }}</span>
        </b-link>
      </template>

      <template slot="endorser" slot-scope="row">
        <b-link
          :to="{ name: 'account', params: { account: row.item.delegate } }"
        >
          <span>{{ row.item.delegate | longhash(42) }}</span>
        </b-link>
      </template>

      <template slot="timestamp" slot-scope="row">
        <span>{{ row.item.timestamp | timeformat("hh:mm:ss DD.MM.YY") }}</span>
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
  name: "Endorsements",
  props: ["level"],
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      pageOptions: [10, 15, 20, 25, 30],
      fields: [
        { key: "txhash", label: "Endorsements Hash" },
        { key: "block", label: "Endorsed Block" },
        { key: "endorser", label: "Endorser" },
        { key: "timestamp", label: "Timestamp" }
      ]
    };
  },
  computed: {
    ...mapState({
      endorsements: state => state.endorsements,
      count: state => state.counts
    }),
    rows() {
      return this.count.endorsements;
    },
    items() {
      return this.endorsements;
    }
  },
  watch: {
    currentPage: {
      async handler(value) {
        await this.$store.dispatch(ACTIONS.ENDORSEMENTS_GET, {
          page: value,
          limit: this.perPage,
          block: this.$props.level
        });
      }
    },
    level: {
      async handler(value) {
        await this.$store.dispatch(ACTIONS.ENDORSEMENTS_GET, {
          limit: this.perPage,
          block: value
        });
      }
    }
  },
  async mounted() {
    await this.$store.dispatch(ACTIONS.ENDORSEMENTS_GET, {
      limit: this.perPage,
      block: this.$props.level
    });
  }
};
</script>

<style scoped></style>
