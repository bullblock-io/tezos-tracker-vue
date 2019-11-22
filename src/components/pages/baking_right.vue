<template>
  <div class="col">
    <BakingRight :hash="hash" />
  </div>
</template>

<script>
import BakingRight from "../baking_rights/single";

export default {
  name: "BakingRightPage",
  computed: {
    hash() {
      return this.$route.params.txID;
    }
  },
  components: {
    BakingRight
  }
};
</script>

<style />
