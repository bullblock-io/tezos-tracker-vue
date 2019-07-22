<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <TopMenu />
    </div>
    <div class="row">
      <div class="col">
        <SearchBar />
      </div>
    </div>
    <div class="row align-items-center">
      <div class="col offset-md-1">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TopMenu from "./components/menu/top.vue";
import SearchBar from "./components/search/main.vue";

export default {
  name: "app",
  components: {
    TopMenu,
    SearchBar
  }
};
</script>

<style>
#app {
  font-family: "Montserrat Alternates", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
.bg-red {
  background-color: red;
}
.bg-blue {
  background-color: aqua;
}
</style>
