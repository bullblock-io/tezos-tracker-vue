<template>
  <div class="main-content">
    <section class="breadcrumbs">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="page-title ml-2">
              <h2>
                Tezos (XTZ) Blockchain Explorer -
                <span>Activations page</span>
              </h2>
            </div>

            <ol class="breadcrumb ml-2">
              <li class="breadcrumb-item">
                <router-link :to="{ name: 'index' }">Home</router-link>
              </li>
              <li class="breadcrumb-item active">Activations page</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section class="addresses-counter cycle-counter">
      <div class="row">
        <div class="col-12">
          <div class="card ml-2 mr-2">
            <div class="card-header">
              <div class="title text-center"><span>Total activated addresses</span></div>
            </div>
            <div class="card-body">

              <div class="row">
                <div class="col-12">
                  <div class="progress-labels">
                    <div class="cycle-label float-left">
                      Cycle - <span>160</span>
                    </div>
                    <div class="tezos-label float-right">
                      Tezos Mainnet
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <b-progress :value="69" :max="100" class="mb-2"></b-progress>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <div class="progress-labels">
                    <div class="percentage float-left">
                      <span>69%</span>
                    </div>
                    <div class="timer float-right">
                      <span>21h 43m</span> - Until cycle end
                    </div>
                  </div>
                </div>
              </div>

            </div>                
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
                  <h3 class="row">
                    <span class="text col">Activations list</span>
                    <div class="counter">
                      <span class="text">Percentage of ICO addresses activated:</span>
                      <span class="counter-text float-right">{{ count.activations | getPercentageICOActiveAddresses }}</span>
                    </div>
                  </h3>
                </div>
              </div>

              <div class="card-body">
                <ActivationsList />
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
import ActivationsList from "../activations/list.vue";
export default {
  name: "Activations",
  components: {
    ActivationsList
  },
  computed: {
    ...mapState({
      count: state => state.counts
    })
  }
};
</script>

<style />
