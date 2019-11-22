<template>
  <table>
    <thead>
      <th></th>
    </thead>
    <tbody>
      <tr>
        <td>here's single baking right {{ hash }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "BakingRight",
  props: {
    hash: String
  }
};
</script>

<style scoped></style>
