<template>
  <div class="col">
    <div class="row">
      <TxsList />
    </div>
  </div>
</template>

<script>
import TxsList from "../transactions/transactions.vue";
export default {
  name: "Txs",
  components: {
    TxsList
  }
};
</script>

<style />

