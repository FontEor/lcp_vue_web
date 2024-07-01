<template>
  <div class="common-development-tools">
    <ApiTestTool v-if="computeToolName === 'api-test'" />
    <Sign v-else-if="computeToolName === 'sign'" />
    <TokenSearch v-else-if="computeToolName === 'token-search'" />
  </div>
</template>

<script>
import ApiTestTool from "@/views/extranet/openBusinessDocuments/docContent/commonDevelopmentTools/apiTestTool.vue";
import Sign from "@/views/extranet/openBusinessDocuments/docContent/commonDevelopmentTools/sign/index.vue";
import TokenSearch from "@/views/extranet/openBusinessDocuments/docContent/commonDevelopmentTools/tokenSearch.vue";

export default {
  name: "CommonDevelopmentTools",
  components: {
    ApiTestTool,
    Sign,
    TokenSearch
  },
  computed: {
    computeToolName() {
      return this.$route.params.toolName;
    },
  },
};
</script>

<style lang="scss" scoped>
.common-development-tools {
  padding: 16px 12px 0;
  background-color: #f6f7fc;
}
</style>