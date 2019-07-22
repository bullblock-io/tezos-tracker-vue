<template>
  <div class="col">
    <nav class="navbar navbar-expand-lg fixed-top">
      <router-link class="navbar-brand" :to="{name: 'index'}">TZTracker</router-link>
      <ul class="nav navbar-nav nav-fill nav-pills">
        <router-link
          v-for="(item, route) in menu"
          v-bind:key="item.text"
          tag="li"
          class="nav-item"
          :to="{name: route}"
        >
          <a class="nav-link" v-bind:class="{active: isActive(route)}">{{item.text}}</a>
        </router-link>
      </ul>
    </nav>
  </div>
</template>
<script>
const MENU_ITEMS = {
  index: {
    text: "Dashboard"
  },
  blocks: {
    text: "Blocks"
  },
  txs: {
    text: "Transactions"
  },
  bakers: {
    text: "Bakers"
  },
  accounts: {
    text: "Accounts"
  }
};
export default {
  name: "TopMenu",
  props: {},
  data: () => ({ menu: MENU_ITEMS }),
  methods: {
    isActive(item) {
      return false;
      return this.$route.name === item;
    }
  }
};
</script>

<style scoped>
.navbar-brand {
  color: #3e9283;
  font-weight: bold;
}
.nav-link {
  color: #363636;
  font-weight: bold;
}
</style>