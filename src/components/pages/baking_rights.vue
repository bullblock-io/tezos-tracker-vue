<template>
  <div class="main-content">
    <section class="breadcrumbs">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="page-title ml-2">
              <h2>
                Tezos (XTZ) Blockchain Explorer -
                <span>Baking Rights</span>
              </h2>
            </div>

            <ol class="breadcrumb ml-2">
              <li class="breadcrumb-item">
                <router-link :to="{ name: 'index' }">Home</router-link>
              </li>
              <li class="breadcrumb-item active">Baking Rights</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="card ml-2 mr-2">
              <div class="card-header">
                <div class="title">
                  <h3>
                    <span class="text">Future Baking Rights</span>
                    <div class="counter">
                      <span class="line"></span>
                      <span class="counter-text">
                        {{
                        count.future_baking_rights | bignum
                        }}
                      </span>
                    </div>
                  </h3>
                </div>
              </div>

              <div class="card-body">
                <FutureBakingRightsList />
              </div>
            </div>
            <div class="card ml-2 mr-2">
              <div class="card-header">
                <div class="title">
                  <h3>
                    <span class="text">Past Baking Rights</span>
                    <div class="counter">
                      <span class="line"></span>
                      <span class="counter-text">
                        {{
                        count.baking_rights | bignum
                        }}
                      </span>
                    </div>
                  </h3>
                </div>
              </div>

              <div class="card-body">
                <BakingRightsList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BakingRightsList from "../baking_rights/baking_rights";
import FutureBakingRightsList from "../baking_rights/future_baking_rights";
export default {
  name: "BakingRights",
  components: {
    BakingRightsList,
    FutureBakingRightsList
  },
  computed: {
    ...mapState({
      count: state => state.counts
    })
  }
};
</script>

<style />
