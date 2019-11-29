<template>
  <div class="main-content">
    <b-container class="bv-example-row" fluid>
      <b-row>
        <b-col>
          <b-row>
            <section class="breadcrumbs my-0">
              <div class="page-title ml-2">
                <h2>
                  Future Baking Rights
                </h2>
              </div>
            </section>
          </b-row>
          <b-row>
            <section class="my-0">
              <div class="card ml-2 mr-2">
                <div class="card-header">
                  <div class="title">
                    <h3>
                      <span class="text">Future Baking Rights list</span>
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
            </section>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <section class="breadcrumbs my-0">
              <div class="page-title ml-2">
                <h2>
                  Past Baking Rights
                </h2>
              </div>
            </section>
          </b-row>
          <b-row>
            <section class="my-0">
              <div class="card ml-2 mr-2">
                <div class="card-header">
                  <div class="title">
                    <h3>
                      <span class="text">Past Baking Rights list</span>
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
            </section>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
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
