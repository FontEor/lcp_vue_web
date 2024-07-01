<template>
  <div class="workOrder-wrap">
    <micro-app-lcp-vue-web
    name='lcp_vue_web_upgrade'
    :url="url"
    baseroute="/upgrade/"
    ></micro-app-lcp-vue-web>
  </div>
</template>
<script>
import config from "@/config";
import isIntranet from "@/utils/isIntranet";

export default {
    name: "upgrade",
    data () {
        return {}
    },
    computed: {
      url() {
        return `
        ${isIntranet() ? config.lcp_vue_web_upgrade_i : config.lcp_vue_web_upgrade_e}/lcp_vue_web_upgrade/
        `
      }
    },
}
</script>
<style lang="scss" scoped>
.workOrder-wrap {
}
</style>