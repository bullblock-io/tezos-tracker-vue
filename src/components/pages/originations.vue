<template>
  <div class="main-content">
    <section class="breadcrumbs">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="page-title ml-2">
              <h2>
                Tezos (XTZ) Blockchain Explorer -
                <span>Originations page</span>
              </h2>
            </div>

            <ol class="breadcrumb ml-2">
              <li class="breadcrumb-item">
                <router-link :to="{ name: 'index' }">Home</router-link>
              </li>
              <li class="breadcrumb-item active">Originations page</li>
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
                    <span class="text">Originations list</span>
                    <div class="counter">
                      <span class="line"></span>
                      <span class="counter-text">{{ count.originations | bignum }}</span>
                    </div>
                  </h3>
                </div>
              </div>

              <div class="card-body">
                <OriginationsList />
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
import OriginationsList from "../originations/list.vue";
export default {
  name: "Originations",
  components: {
    OriginationsList
  },
  computed: {
    ...mapState({
      count: state => state.counts
    })
  }
};
</script>

<style />
