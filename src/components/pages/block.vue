<template>
  <div class="col">
    <div class="row">
      <BlockInfo :level="level" />
    </div>
    <div class="row">
      <Endorsements :level="level" />
    </div>
  </div>
</template>

<script>
import BlockInfo from "../blocks/block";
import Endorsements from "../endorsements/list";

export default {
  name: "Block",
  components: {
    BlockInfo,
    Endorsements
  },
  computed: {
    level() {
      return parseInt(this.$route.params.level, 0);
    }
  }
};
</script>

<style />

