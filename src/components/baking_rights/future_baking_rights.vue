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
export default {
  name: "FutureBakingRights",
  props: ["block"],
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      blocks_in_row: 7,
      future_baking_rights: [],
      render: [],
      startIdx: 0,
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
      return 1000;
      return this.$data.perPage;
    },
    items() {
      return this.$data.render;
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
      this.$data.future_baking_rights = data;
      console.log(data);
    },
    renderTable(startIdx) {
      const idx = startIdx === 0 ? startIdx : startIdx - 1;
      const stopIdx = parseInt(idx + this.$data.blocks_in_row - 1);
      const fbr = this.$data.future_baking_rights;

      const data = [];
      const fields = [
        {
          key: "priority",
          label: "Priority"
        }
      ];
      let renderIdx = 0;
      for (let i = idx; i < stopIdx; i++) {
        const block = fbr[i];
        fields.push({
          key: `block_${renderIdx++}`,
          label: `Block ${block.level}`
        });
      }
      console.log(`from ${idx} to ${stopIdx}`);
      const data = [];

      for (let i = 0; i < fbr.length; i++) {
        const d = { priority: fbr[i].priority };
        let ii = 0;
        for (let key in fbr[i]) {
          console.log(fbr[i][key].level);

          if (key === "priority") {
            continue;
          }
          const k = parseInt(key);
          if (k < idx || k > stopIdx) {
            console.log(`block id ${k}, skipping`);
            continue;
          }
          d[`block_${ii++}`] = fbr[i][key];
        }
        data.push(d);
      }
      console.log(data);
      const row = data[0];
      if (!row) {
        return;
      }

      for (const key in row) {
        if (key === "priority") {
          continue;
        }
        this.$data.fields.push({
          key,
          label: `Block ${row[key].level}`
        });
      }
      this.$data.render = data;
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
      const data = await this.$store.getters.API.getFutureBakingRights(props);
      const parsedData = this.parseResponse(data.data);
      this.$data.future_baking_rights = parsedData;
      this.renderTable((page - 1) * this.$data.blocks_in_row);
    }
  }
};
</script>
