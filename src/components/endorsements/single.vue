<template>
  <table>
    <thead>
      <th></th>
    </thead>
    <tbody>
      <tr>
        <td>here's single endorsement {{hash}}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Endorsement",
  props: {
    hash: String
  }
};
</script>

<style scoped>
</style>