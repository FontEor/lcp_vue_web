<template>
  <el-container :class="`${(docType === 'ApiDoc' || docType === 'ApiDocDetail' || docType === 'ExtensionDoc' || docType === 'ExtensionDocDetail') && 'special-docment-wrap'} document-wrap`">
    <el-aside :class="`${(docType === 'ApiDoc' || docType === 'ApiDocDetail' || docType === 'ExtensionDoc' || docType === 'ExtensionDocDetail') && 'special-aside-container'} aside-container`">
      <ApiMenu v-if="docType === 'ApiDoc' || docType === 'ApiDocDetail'" />
      <DevGuideMenu
        v-else-if="docType === 'DevGuide' || docType === 'DevGuideDetail'"
      />
      <ManaulMenu
        v-else-if="docType === 'Manaul' || docType === 'ManaulDetail'"
      />
      <ExtensionMenu
        v-else-if="
          docType === 'ExtensionDoc' || docType === 'ExtensionDocDetail'
        "
      />
    </el-aside>
    <el-main>
      <router-view :key="key" />
    </el-main>
  </el-container>
</template>
<script>
import ApiMenu from "@/components/common/AsideMenu/apiMenu.vue";
import DevGuideMenu from "@/components/common/AsideMenu/devGuideMenu.vue";
import ManaulMenu from "@/components/common/AsideMenu/manaulMenu.vue";
import ExtensionMenu from "@/components/common/AsideMenu/extensionMenu.vue";

export default {
  name: "DocMain",
  components: {
    ApiMenu,
    DevGuideMenu,
    ManaulMenu,
    ExtensionMenu,
  },
  data() {
    return {
      docType: this.$route.name,
    };
  },
  computed: {
    key() {
      return this.$route.fullPath;
    },
  },
  watch: {
    "$route.name": {
      handler(newValue) {
        this.docType = newValue;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.document-wrap {
  display: flex;
  background: #ffffff;
  min-height: 600px;
  margin: 30px auto 20px;
  width: 98vw;
}
.special-docment-wrap {
  width: 1200px;
}
.aside-container {
  position: sticky;
  top: 128px;
  border-right: solid 1px #eaeaea;
  height: calc(100vh - 108px);
}
.special-aside-container {
   position: relative;
   top: 0;
}
</style>