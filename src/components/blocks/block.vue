<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card ml-2 mr-2">
        <div class="card-header">
          <div class="title">
            <h3>
              <span class="text">{{level}}</span>
            </h3>
            <span class="subtitle">Block Information</span>
          </div>
        </div>

        <div class="card-divider"></div>

        <div class="card-body">
          <div class="item-info row ml-1 mr-1">
            <div class="col-lg-3">
              <span class="label">Hash</span>
            </div>
            <div class="col-lg-9">
              <span class="value">{{block.hash}}</span>
            </div>
          </div>
          <div class="item-info row ml-1 mr-1">
            <div class="col-lg-3">
              <span class="label">Timestamp</span>
            </div>
            <div class="col-lg-9">
              <span class="value">{{block.timestamp | timeformat("HH:mm:ss DD.MM.YY")}}</span>
            </div>
          </div>
          <div class="item-info row ml-1 mr-1">
            <div class="col-lg-3">
              <span class="label">Volume</span>
            </div>
            <div class="col-lg-9">
              <span class="value">{{block.volume | tezos }}</span>
            </div>
          </div>
          <div class="item-info row ml-1 mr-1">
            <div class="col-lg-3">
              <span class="label">Cycle</span>
            </div>
            <div class="col-lg-9">
              <span class="value">{{block.metaCycle}}</span>
            </div>
          </div>
          <div class="item-info row ml-1 mr-1">
            <div class="col-lg-3">
              <span class="label">Baker</span>
            </div>
            <div class="col-lg-9">
              <span class="value">
                <router-link
                  class="baker"
                  :to="{ name: 'baker', params: {baker: block.baker}}"
                >{{block.baker}}</router-link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "../../store";
export default {
  name: "Block",
  components: {},
  data() {
    return {
      block: {}
    };
  },
  computed: {
    level() {
      return this.$route.params.level;
    }
  },
  watch: {
    level: {
      async handler(value) {
        await this.load(value);
      }
    }
  },
  async created() {
    await this.load(this.level);
  },
  methods: {
    async load(level) {
      const result = await this.$store.getters.API.getBlock({ block: level });
      if (result.status !== 200) {
        return this.$router.push({
          name: result.status
        });
      }
      this.$data.block = result.data.block;
    }
  }
};
</script>

<style />