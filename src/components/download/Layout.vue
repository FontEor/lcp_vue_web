<template>
  <el-container class="layout">
    <Header />
    <router-view class="layout__content"></router-view>
  </el-container>
</template>

<script>
import Header from "@/components/download/Header.vue";

export default {
  name: "Layout",
  components: { Header },
};
</script>

<style lang="scss" scoped>
.layout {
  min-width: 1200px;
  flex-direction: column;

  .layout__content {
    padding-top: 60px;
  }
}
</style>