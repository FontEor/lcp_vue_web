<template>
  <transition name="fade-transform" mode="out-in">
    <router-view :key="key" />
  </transition>
</template>

<script>
export default {
  name: "DocContainer",
  computed: {
    key() {
      if (this.$route.query.flag) {
        return this.$route.fullPath;
      }
    },
  },
};
</script>