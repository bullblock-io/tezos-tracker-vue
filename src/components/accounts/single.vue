<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card ml-2 mr-2">
        <div class="card-header">
          <div class="title">
            <h3>
              <span class="text">{{hash}}</span>
            </h3>
            <span class="subtitle">Account Information</span>
          </div>
        </div>

        <div class="card-divider"></div>

        <div class="card-body">
          <div class="item-info row ml-1 mr-1">
            <div class="col-lg-2">
              <span class="label">Balance</span>
            </div>
            <div class="col-lg-10">
              <span class="value">
                {{account.balance | tezos }}
                (TODO: $5 537,029)
              </span>
            </div>
          </div>
          <div class="item-info row ml-1 mr-1" v-if="baker">
            <div class="col-lg-4">
              <span class="value">Current Deposits</span>
            </div>
            <div class="col-lg-8">
              <span class="value">Pending Rewards</span>
            </div>
          </div>
          <div class="item-info row ml-1 mr-1" v-if="baker">
            <div class="col-lg-4">
              <div class="row">
                <div class="col-lg-6">
                  <span class="label">Baking</span>
                </div>
                <div class="col-lg-6">
                  <span class="value">{{bakerInfo.bakingDeposits | tezos}}</span>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="row">
                <div class="col-lg-3">
                  <span class="label">Baking</span>
                </div>
                <div class="col-lg-9">
                  <span class="value">{{bakerInfo.bakingRewards | tezos}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="item-info row ml-1 mr-1" v-if="baker">
            <div class="col-lg-4">
              <div class="row">
                <div class="col-lg-6">
                  <span class="label">Endorsement</span>
                </div>
                <div class="col-lg-6">
                  <span class="value">{{bakerInfo.endorsementDeposits | tezos}}</span>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="row">
                <div class="col-lg-3">
                  <span class="label">Endorsement</span>
                </div>
                <div class="col-lg-9">
                  <span class="value">{{bakerInfo.endorsementRewards | tezos}}</span>
                </div>
              </div>
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
  name: "Account",
  props: ["hash"],
  data() {
    return {
      baker: false,
      bakerInfo: {},
      account: {}
    };
  },
  computed: {},
  watch: {
    hash: {
      async handler(value) {
        await this.reload(value);
      }
    }
  },
  async mounted() {
    await this.reload(this.hash);
  },
  methods: {
    async reload(acc) {
      const result = await api.getAccount({ account: acc });
      this.account = result.data;
      if (result.data.bakerInfo) {
        this.bakerInfo = result.data.bakerInfo;
        this.baker = true;
      } else {
        this.baker = false;
      }
    }
  }
};
</script>
