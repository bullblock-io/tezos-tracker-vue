<template>
  <div class="main-content">
    <div class="card-body">
      <BlockInfo :level="level" />
    </div>
    <div class="card-body">
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
      return this.$route.params.level;
    }
  }
};
</script>

<style />
