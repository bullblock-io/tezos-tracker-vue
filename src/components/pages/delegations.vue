<template>
  <div class="col">
    <div class="row">
      <DelegationList />
    </div>
  </div>
</template>

<script>
import DelegationList from "../delegations/list.vue";
export default {
  name: "Delegations",
  components: {
    DelegationList
  }
};
</script>

<style />

