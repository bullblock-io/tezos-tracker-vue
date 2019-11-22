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




    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      align="right"
      limit= 10
      first-text
      prev-text="Prev"
      next-text="Next"
      last-text
    ></b-pagination>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { ACTIONS, api } from "../../store";
import _ from "lodash";
let i = 0;
export default {
  name: "FutureBakingRights",
  props: ["block"],
  data() {
    return {
      perPage: 11,
      currentPage: 1,
      pageOptions: [10, 15, 20, 25, 30],
      future_baking_rights: [],
      count: 0,
      items: [],
      fields: [
        { key: "priority", label: "Priority" },
        { key: "delegate", label: "Block level x" },
        { key: "endorser", label: "Block level x+1" },
        { key: "timestamp", label: "Block level x+2" },
        { key: "timestamp1", label: "Block level x+3" },
        { key: "timestamp2", label: "Block level x+4" },
        { key: "timestamp3", label: "Block level x+5" }
      ]
    };
  },
  computed: {
    rows() {
      return this.count;
    },
    items() {
      return this.future_baking_rights;
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
    parseResponse (data) {
        return [];
    },
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
      const data = await api.getFutureBakingRights(props);
      this.future_baking_rights = data.data;
      console.log(this.future_baking_rights);
      this.count = data.count;
      this.$store.commit(ACTIONS.SET_FUTUREBAKINGRIGHTS_COUNT, this.count);
      this.items = this.parseResponse(data);
    }
  }
};
</script>
