<template>
  <div class="col">
    <div class="row">accounts page</div>
    <AccountsList />
  </div>
</template>

<script>
import AccountsList from "../accounts/list";
export default {
  name: "Accounts",
  components: {
    AccountsList
  }
};
</script>

<style />

