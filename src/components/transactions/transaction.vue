<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card ml-2 mr-2">
        <div class="card-header">
          <div class="title">
            <h3>
              <span class="text">ooowU8rXyF8Bq8gY2DucEmaJQ3nTjEvt1EEcphTojtaxDd5Nr3n</span>
            </h3>
            <span class="subtitle">Transaction Information</span>
          </div>
        </div>

        <div class="card-divider"></div>

        <div class="card-body">
          <div class="item-info row ml-1 mr-1">
            <div class="col-lg-3">
              <span class="label">Included in Block</span>
            </div>
            <div class="col-lg-9">
              <span class="value">BLfYKMGUzogJgHNphCePW5bNx1CvrabhcYYmkGSJEqkVJsNujwy</span>
            </div>
          </div>
          <div class="item-info row ml-1 mr-1">
            <div class="col-lg-3">
              <span class="label">Timestamp</span>
            </div>
            <div class="col-lg-9">
              <span class="value">10:11:03 09.07.2019</span>
            </div>
          </div>
          <div class="item-info row ml-1 mr-1">
            <div class="col-lg-3">
              <span class="label">Operation Hash</span>
            </div>
            <div class="col-lg-9">
              <span class="value">oorzbkAuDddUebFTNTxJEeREzfabx8zsnzC1ZD4D3ChuETvrVDb</span>
            </div>
          </div>
          <div class="item-info row ml-1 mr-1">
            <div class="col-lg-3">
              <span class="label">Block id</span>
            </div>
            <div class="col-lg-9">
              <span class="value">523054</span>
            </div>
          </div>
          <div class="item-info row ml-1 mr-1">
            <div class="col-lg-3">
              <span class="label">Fee</span>
            </div>
            <div class="col-lg-9">
              <span class="value">
                1,61 m
                <sub>ꜩ</sub> ($0,002)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { api } from "../../store";

export default {
  name: "Transaction",
  props: ["txhash"],
  data() {
    return {
      tx: {}
    };
  },
  computed: {},
  async created() {},
  methods: {
    async load(level) {
      const result = await api.getBlock({ block: level });
      this.$data.block = result.data.block;
    }
  }
};
</script>
