<template>
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <div class="row">
        <div class="col">
          <input
            type="text"
            class="form-control form-control-lg"
            placeholder="block hash/block level/tx hash"
          />
        </div>
        <div class="col">
          <img class="img-fluid" src="/img/robot.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SearchBar",
  props: {}
};
</script>

<style scoped>
.jumbotron {
  background-color: #daebe9;
}
</style>