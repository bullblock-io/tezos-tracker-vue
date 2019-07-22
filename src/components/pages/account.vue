<template>
  <div class="col">
    <div class="row">single account {{hash}}</div>
  </div>
</template>

<script>
export default {
  name: "Account",
  computed: {
    hash() {
      return this.$route.params.account;
    }
  },
  components: {}
};
</script>

<style />
