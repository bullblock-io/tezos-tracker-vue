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
import _ from "lodash";
import { ACTIONS } from "../../store";

export default {
  name: "FutureBakingRights",
  props: ["block"],
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      blocks_in_row: 7,
      future_baking_rights: [],
      block_levels: [],
      blocks: [],
      count: 0,
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
      return this.$data.future_baking_rights;
    }
  },
  watch: {
    currentPage: {
      async handler(value) {
        await this.render(value);
      }
    }
  },
  async mounted() {
    await this.reload();
  },
  methods: {
    parseResponse(data) {
      const result = [];
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].rights.length; j++) {
          result.push({
            level: data[i].level,
            baker: data[i].baker,
            block_hash: data[i].block_hash,
            priority: data[i].rights[j].priority,
            delegate: data[i].rights[j].delegate
          });
        }
      }
      const levels = _.uniq(result.map(el => el.level));
      this.$data.blocks = result;
      this.$data.levels = levels;
      const cnt = Math.floor(levels.length / this.$data.blocks_in_row) * 10;
      this.$data.count = cnt + (levels.length % this.$data.perPage);
      this.$store.commit(ACTIONS.SET_FUTUREBAKINGRIGHTS_COUNT, levels.length);
    },
    render(page = 1) {
      const p = page - 1;
      const rowLength = this.$data.blocks_in_row;
      const startIdx = p === 0 ? p : p + rowLength - 1;
      const blocks = this.$data.levels.slice(startIdx, startIdx + rowLength);
      const allBlocks = this.$data.blocks;
      const fields = [
        {
          key: "priority",
          label: "Priority"
        }
      ];
      const data = [];
      for (let j = 0; j < 10; j++) {
        const row = {
          priority: j
        };
        for (let i = 0; i < rowLength; i++) {
          if (!blocks[i]) {
            fields.push({
              key: `block_${i}`,
              label: ""
            });
            row[`block_${i}`] = {};
            continue;
          }
          fields.push({
            key: `block_${i}`,
            label: `Block ${blocks[i]}`
          });
          const blockId = blocks[i];
          const block = allBlocks.find(
            el => el.level === blockId && el.priority === j
          );
          row[`block_${i}`] = {};
          if (block) {
            row[`block_${i}`] = { ...block };
          }
        }
        data.push(row);
      }
      this.$data.fields = fields;
      this.$data.future_baking_rights = data;
    },

    async reload(page = 1) {
      const props = {
        page,
        limit: this.perPage
      };
      const data = await this.$store.getters.API.getFutureBakingRights(props);
      this.parseResponse(data.data);
      this.render(page);
    }
  }
};
</script>
