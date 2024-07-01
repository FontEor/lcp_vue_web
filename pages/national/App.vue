<template>
  <div id="app">
    <router-view />
    <ToTop v-if="isIntranet && computeToTopVisible" />
    <!-- 对外网使用 -->
    <ToTopNew v-else-if="!isIntranet && !isRoutePath" :isIntranet="false" />
    <!-- <Like v-if="computeIsShow" /> -->
  </div>
</template>

<script>
import ToTop from "@/components/ToTop.vue";
import ToTopFaq from "@/components/ToTopFaq.vue";
import ToTopNew from "@/components/toTop/index.vue";
// import Like from "@/components/Like.vue";
import isIntranet from "@/utils/isIntranet.ts";

export default {
  name: "App",
  // components: { ToTop, ToTopFaq, ToTopNew, Like },
  components: { ToTop, ToTopFaq, ToTopNew },
  data() {
    return {
      isIntranet: isIntranet(),
    };
  },
  computed: {
    computeToTopVisible() {
      const path = `/${this.$route.path.split("/")[1]}`;
      const routerTable = ["/chooseSupplier"];
      return !routerTable.includes(path);
    },
    computeIsShow() {
      const { name, path } = this.$route;
      if (path.split("/")[1] === "preview-docking-plan") {
        return false;
      }
      const routerTable = [
        "NewHand",
        "ApiNewHand",
        "Qs",
        "DocSoftwareSystem",
        "DevSupport",
        "DocDetail",
        "AccessGuideDetail",
        "ApiDocDetail",
        "MessageDocDetail",
      ];
      return routerTable.includes(name);
    },
    isRoutePath() {
      return this.$route.path.split("/")[1] === "preview-docking-plan";
    },
  },
  created() {
    // 语言环境设置
    this.$i18n.locale = "zh-cn";
    // 以下是子午线埋点代码
    const jdpts = {};
    window.jdpts = jdpts;
    jdpts._st = new Date().getTime();

    const jaq = [];
    window.jaq = jaq || [];
    var account = window.env.baseStreamAccount;
    if (!isIntranet()) {
      account = window.env.baseStreamCloudAccount;
    }
    jaq.push(["domain", "jdl.com"]);
    jaq.push(["account", account]);
    jaq.push(["anchorpvflag", "true"]);
    jaq.push(["anchorToUri", 1]);

    (function () {
      const ja = document.createElement("script");
      ja.type = "text/javascript";
      ja.async = true;
      ja.src = "//wl.jd.com/joya.js";
      const s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(ja, s);
    })();
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/index.scss";
@import "~@/assets/api_sub/main.scss";
html,
body,
#app {
  height: 100%;
}
</style>
