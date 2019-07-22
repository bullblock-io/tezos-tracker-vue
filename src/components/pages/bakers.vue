<template>
  <div class="col">
    <div class="row">bakers page</div>
    <BakersList />
  </div>
</template>

<script>
import BakersList from "../bakers/list";
export default {
  name: "Bakers",
  components: {
    BakersList
  }
};
</script>

<style />

