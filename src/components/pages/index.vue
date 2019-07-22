<template>
  <div class="col">
    <div class="row">
      <div class="col">
        <GlobalStats />
      </div>
    </div>
    <div class="row">
      <BlocksShort />
    </div>
  </div>
</template>

<script>
import BlocksShort from "../blocks/blocks_short.vue";
import GlobalStats from "../stats/global.vue";

export default {
  name: "index",
  components: {
    BlocksShort,
    GlobalStats
  }
};
</script>

<style />

