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
      <template slot="priority" slot-scope="row">

      </template>
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
  name: "BakingRights",
  props: ["block"],
  data() {
    return {
      perPage: 11,
      currentPage: 1,
      pageOptions: [10, 15, 20, 25, 30],
      baking_rights: [],
      count: 0,
      fields: [
        { key: "priority", label: "Priority" },
        { key: "block", label: "Endorsed Block" },
        { key: "endorser", label: "Endorser" },
        { key: "timestamp", label: "Timestamp" },
        { key: "timestamp1", label: "Timestamp" },
        { key: "timestamp2", label: "Timestamp" },
        { key: "timestamp3", label: "Timestamp" }
      ]
    };
  },
  computed: {
    rows() {
      return this.count;
    },
    items() {
      return this.baking_rights;
    },
  },
  watch: {
    currentPage: {
      async handler(value) {
        await this.reload({ page: value, block: this.level });
      }
    },
    level: {
      async handler(value) {
        await this.reload({ block: value });
      }
    }
  },
  methods: {
    async reload( page = 1) {
      const props = {
        page,
        limit: this.perPage
      };
      const data = await api.getBakingRights(props);
      this.baking_rights = data.data;
      this.count = data.count;
      this.$store.commit(ACTIONS.SET_BAKINGRIGHTS_COUNT, this.count);
    }
  }
};
</script>
