<template>
  <header class="main-header">
    <div class="logo">
      <router-link :to="{name: 'index'}">TZTracker</router-link>
    </div>
    <div class="header-middle">
      <nav class="main-nav">
        <ul>
          <li v-bind:class="{active: isActive('index')}">
            <router-link :to="{name: 'index'}">TZTracker</router-link>
          </li>
          <li v-bind:class="{active: isActive('blocks')}">
            <router-link :to="{name: 'blocks'}">Blocks</router-link>
          </li>
          <li>
            <a
              class="dropdown-toggle"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >Operations</a>
            <div class="dropdown-menu">
              <router-link class="dropdown-item" :to="{name: 'txs'}">Transactions</router-link>
              <router-link class="dropdown-item" :to="{name: 'endorsements'}">Endorsements</router-link>
              <router-link class="dropdown-item" :to="{name: 'delegations'}">Delegations</router-link>
            </div>
          </li>
          <li v-bind:class="{active: isActive('bakers')}">
            <router-link :to="{name: 'bakers'}">Bakers</router-link>
          </li>
          <li v-bind:class="{active: isActive('accounts')}">
            <router-link :to="{name: 'accounts'}">Accounts</router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="search">
      <form action id="search-form">
        <input type="text" class="search-query" placeholder="Search for block, txn or address" />
        <button type="submit" class="button-search">
          <font-awesome-icon icon="search" />
        </button>
      </form>
    </div>
  </header>
</template>
<script>
export default {
  name: "TopMenu",
  props: {},
  methods: {
    isActive(...args) {
      return args.includes(this.$route.name);
    }
  }
};
</script>

<style scoped>
</style>