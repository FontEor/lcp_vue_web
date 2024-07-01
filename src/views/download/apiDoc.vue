<template>
  <el-container class="api-doc">
    <el-aside>侧边导航</el-aside>
    <el-container>
      <el-main class="api-doc__main">
        API文档
        <Footer />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Footer from "@/components/download/Footer.vue";

export default {
  name: "ApiDoc",
  components: { Footer },
};
</script>

<style lang="scss" scoped>
.api-doc {
  .api-doc__main {
    padding: 0;
  }
}
</style>