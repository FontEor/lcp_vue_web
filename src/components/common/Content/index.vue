<template>
  <transition name="fade-transform" mode="out-in">
    <router-view :key="key" />
  </transition>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      // 常见问题文档左侧菜单不刷新
      if (this.$route.path.includes("question-docs")) {
        return "question-docs";
      }
      return this.$route.path;
    },
  },
};
</script>
