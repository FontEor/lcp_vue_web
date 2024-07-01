<template>
  <div class="app-inner">
    <div class="wly-body-wrapper">
      <div class="wly-body-inner" :style="{ padding: computeIsExtranet }">
        <Header />
        <div class="wly-main-container">
          <Content />
        </div>
      </div>
    </div>
    <BlackFooter v-if="computeBlackFooterVisible" />
  </div>
</template>

<script>
import Header from "@/components/extranet/Header/index.vue";
import Content from "@/components/common/Content/index.vue";
import Footer from "@/components/common/Footer/index.vue";
import BlackFooter from "@/components/extranet/Footer/blackFooter.vue";
import isIntranet from "@/utils/isIntranet";

export default {
  name: "Layout",
  components: {
    Header,
    Content,
    Footer,
    BlackFooter,
  },
  computed: {
    computeIsExtranet() {
      return isIntranet() ? "0 0 136px" : "0";
    },
    computeBlackFooterVisible() {
      const { name } = this.$route;
      const routeNameList = [
        "NewHand",
        "DevSupport",
        "QuestionDocs",
        "QuestionDocsList",
        "QuestionDocsDetail",
      ];
      return !routeNameList.includes(name);
    },
  },
};
</script>

<style lang="scss" scoped>
html,
body,
#app,
.app-inner {
  height: 100%;
}
.wly-body-wrapper {
  min-height: 100%;
  height: auto;
}
.wly-body-inner {
  padding: 0 0 136px;
}
</style>
