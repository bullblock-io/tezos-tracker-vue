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
    <ICOMetaCount v-bind:percent="getPercentage" />

    <section>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="card ml-2 mr-2">
              <div class="card-header">
                <div class="title">
                  <h3 class="row">
                    <span class="text col">Activations list</span>
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
import ICOMetaCount from "../cycle/ico_count.vue";
export default {
  name: "Activations",
  components: {
    ActivationsList,
    ICOMetaCount
  },
  computed: {
    ...mapState({
      count: state => state.counts,
      head: state => state.head
    }),
    getPercentage() {
      const num = this.count.activations;
      const allAddresses = 30317;
      const result = parseFloat(((num * 100) / allAddresses).toFixed(2));
      return result;
    }
  }
};
</script>

<style />
