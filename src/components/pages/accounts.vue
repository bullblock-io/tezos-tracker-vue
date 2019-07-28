<template>
  <div class="main-content">
    <section class="breadcrumbs">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="page-title ml-2">
              <h2>
                Tezos (XTZ) Blockchain Explorer -
                <span>Accounts page</span>
              </h2>
            </div>

            <ol class="breadcrumb ml-2">
              <li class="breadcrumb-item">
                <router-link :to="{name: 'index'}">Home</router-link>
              </li>
              <li class="breadcrumb-item active">Accounts page</li>
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
                    <span class="text">Accounts list</span>
                    <div class="counter">
                      <span class="line"></span>
                      <span class="counter-text">{{count.accounts | bignum}}</span>
                    </div>
                  </h3>
                </div>
                <div class="table-filters">
                  <div class="dropdown float-left">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="thisYear"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >This year</button>
                    <div class="dropdown-menu" aria-labelledby="thisYear">
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-body">
                <AccountsList />
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
import AccountsList from "../accounts/list";

export default {
  name: "Accounts",
  components: {
    AccountsList
  },
  computed: {
    ...mapState({
      count: state => state.counts
    })
  }
};
</script>

<style />

