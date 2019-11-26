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
        <b-link :to="{ name: 'tx', params: { txhash: row.item.operationGroupHash } }">
          <span>{{ row.item.operationGroupHash | longhash(35) }}</span>
        </b-link>
      </template>

      <template slot="level" slot-scope="row">
        <b-link :to="{ name: 'block', params: { level: row.item.blockLevel } }">
          <span>{{ row.item.blockLevel }}</span>
        </b-link>
      </template>

      <template slot="age" slot-scope="row">
        <span>{{ row.item.timestamp | getAge }}</span>
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
  name: "DoubleBaking",
  props: ["account"],
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      pageOptions: [10, 15, 20, 25, 30],
      double_baking: [],
      count: 0,
      fields: [
        { key: "txhash", label: "Origination Hash" },
        { key: "level", label: "Block ID" },
        { key: "age", label: "Age" },
        { key: "baker", label: "Baker" },
        { key: "baker_rewards", label: "Baker Rewards" },
        { key: "offender", label: "Offender" },
        { key: "denounced_level", label: "Denounced Level" },
        { key: "lost_deposits", label: "Lost Deposits" },
        { key: "lost_rewards", label: "Lost Rewards" },
        { key: "lost_fees", label: "Lost Fees" }
      ]
    };
  },
  computed: {
    rows() {
      return this.count;
    },
    items() {
      return this.double_baking;
    }
  },
  watch: {
    currentPage: {
      async handler(value) {
        await this.reload(value);
      }
    }
  },
  async mounted() {
    await this.reload();
  },
  methods: {
    async reload(page = 1) {
      const props = {
        page,
        limit: this.perPage
      };
      if (this.$props.block) {
        props.block_id = this.$props.block.hash;
      }
      if (this.$props.account) {
        props.account_id = this.$props.account;
      }
      const data = await this.$store.getters.API.getDoubleBaking(props);
      this.double_baking = data.data;
      this.count = data.count;
      this.$store.commit(ACTIONS.SET_DOUBLEBAKING_COUNT, this.count);
    }
  }
};
</script>
