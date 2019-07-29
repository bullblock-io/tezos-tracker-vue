<template>
  <table v-if="tx">
    <thead>
      <th></th>
    </thead>
    <tbody>
      <tr>
        <td>here's single tx id: {{ tx.id }} named: {{ tx.name }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Transaction",
  props: {},
  computed: mapState({
    tx: function(store) {
      return store.getters.getTransactionById(this.$route.params.txID);
    }
  })
};
</script>

<style scoped>
table {
  border: 1px solid black;
}
</style>
