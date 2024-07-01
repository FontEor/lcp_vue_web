<template>
  <el-container class="message-doc">
    <el-aside>侧边导航</el-aside>
    <el-container>
      <el-main class="message-doc__main">
        消息文档
        <Footer />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Footer from "@/components/download/Footer.vue";

export default {
  name: "MessageDoc",
  components: { Footer },
};
</script>

<style lang="scss" scoped>
.message-doc {
  .message-doc__main {
    padding: 0;
  }
}
</style>