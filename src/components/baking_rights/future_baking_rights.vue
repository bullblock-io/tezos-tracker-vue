<template>
  <div>
    <b-table-simple
      show-empty
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="0"
      class="table table-borderless table-responsive-md"
    >
    </b-table-simple>

    <td v-for="field in fields">
        <th>{{field.label}}</th>
        <tr v-for="item in items">
          <td>
                <span>{{item[field.key]}}</span>
            </td>
        </tr>
    </td>

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
import { ACTIONS } from "../../store";
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
      fields: [],
      items: []
    };
  },
  computed: {
    rows() {
      return this.count;
    },
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
      const data = await this.$store.getFutureBakingRights(props);
      const parseResponse  = this.parseResponse(data.data);
      this.fields = parseResponse.fields;
      this.items = parseResponse.items;
      this.count = data.count;
      this.$store.commit(ACTIONS.SET_FUTUREBAKINGRIGHTS_COUNT, this.count);
    },
    parseResponse (data) {
        let items = [];
        let fields = [{key: "priority", label: "Priority"}];
        for(let k = 0; k < 11; k++){
          items.push({'priority': k});
        }
        for(let i = 0; i < data.length; i++){
           let key = "block_level_"+data[i].level;
           let label = "Block level "+data[i].level;
           fields.push({key: key, label: label})
           for(let j = 0; j < data[i].rights.length; j++){
              let value = data[i].rights[j].delegate;
              items[j][key] = value;
           }
        }
        return {fields: fields, items: items};
    }
  }
};
</script>
