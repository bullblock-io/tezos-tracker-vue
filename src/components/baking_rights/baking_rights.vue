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
        <span>{{ row.item.priority }}</span>
      </template>

      <template slot="block_0" slot-scope="row">
        <router-link
          class="baker"
          :to="{ name: 'baker', params: {baker: row.item.block_0.delegate}}"
        >{{row.item.block_0.delegate | longhash(19)}}</router-link>
      </template>
      <template slot="block_1" slot-scope="row">
        <router-link
          class="baker"
          :to="{ name: 'baker', params: {baker: row.item.block_1.delegate}}"
        >{{row.item.block_1.delegate | longhash(19)}}</router-link>
      </template>
      <template slot="block_2" slot-scope="row">
        <router-link
          class="baker"
          :to="{ name: 'baker', params: {baker: row.item.block_2.delegate}}"
        >{{row.item.block_2.delegate | longhash(19)}}</router-link>
      </template>
      <template slot="block_3" slot-scope="row">
        <router-link
          class="baker"
          :to="{ name: 'baker', params: {baker: row.item.block_3.delegate}}"
        >{{row.item.block_3.delegate | longhash(19)}}</router-link>
      </template>
      <template slot="block_4" slot-scope="row">
        <router-link
          class="baker"
          :to="{ name: 'baker', params: {baker: row.item.block_4.delegate}}"
        >{{row.item.block_4.delegate | longhash(19)}}</router-link>
      </template>
      <template slot="block_5" slot-scope="row">
        <router-link
          class="baker"
          :to="{ name: 'baker', params: {baker: row.item.block_5.delegate}}"
        >{{row.item.block_5.delegate | longhash(19)}}</router-link>
      </template>
      <template slot="block_6" slot-scope="row">
        <router-link
          class="baker"
          :to="{ name: 'baker', params: {baker: row.item.block_6.delegate}}"
        >{{row.item.block_6.delegate | longhash(19)}}</router-link>
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      align="right"
      limit="10"
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
import _ from "lodash";
export default {
  name: "BakingRights",
  props: [],
  data() {
    return {
      count: 0,
      baking_rights: [],
      blocks_in_row: 7,
      perPage: 10,
      currentPage: 1,
      fields: [
        {
          key: "priority",
          label: "Priority"
        }
      ]
    };
  },
  computed: {
    rows() {
      return this.$data.count;
    },
    items() {
      return this.$data.baking_rights;
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
    parseResponse(data) {
      const p = new Array(10).fill(0);
      return p.map((el, idx) => {
        const result = { priority: idx };
        const values = [];
        for (const value of data) {
          const b = _.find(value.rights, e => e.priority === idx) || {};
          b.level = value.level;
          values.push(b);
        }
        for (let i = 0; i < this.blocks_in_row; i++) {
          result[`block_${i}`] = values[i];
        }
        return result;
      });
    },
    async reload(page = 1) {
      const props = {
        page,
        limit: this.perPage
      };
      const data = await this.$store.getters.API.getBakingRights(props);
      this.$data.count = data.count;
      const parsedData = this.parseResponse(data.data);
      const row = parsedData[0];
      for (const key in row) {
        if (key === "priority") {
          continue;
        }
        this.$data.fields.push({
          key,
          label: `Block ${row[key].level}`
        });
      }
      this.$data.baking_rights = parsedData;
    }
  }
};
</script>
