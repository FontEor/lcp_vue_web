<template>
  <AccessGuideMenu
    v-if="
      docType === 'AccessGuide' ||
      docType === 'AccessGuideDetail' ||
      docType === 'AccessGuidePreview' ||
      docType === 'AccessGuideDetailPreview'
    "
  />
  <ApiMenu
    v-else-if="
      docType === 'ApiDoc' ||
      docType === 'ApiDocDetail' ||
      docType === 'ApiDocPreview' ||
      docType === 'ApiDocDetailPreview'
    "
  />
  <MessageMenu
    v-else-if="
      docType === 'MessageDoc' ||
      docType === 'MessageDocDetail' ||
      docType === 'MessageDocPreview' ||
      docType === 'MessageDocDetailPreview'
    "
  />
  <CommonDevelopmentToolsMenu
    v-else-if="
      docType === 'CommonDevelopmentTools' ||
      docType === 'CommonDevelopmentToolsDetail'
    "
    :isShrink="isShrink"
  />
</template>

<script>
import AccessGuideMenu from "@/views/extranet/openBusinessDocuments/asideMenu/accessGuideMenu.vue";
import ApiMenu from "@/views/extranet/openBusinessDocuments/asideMenu/apiMenu.vue";
import MessageMenu from "@/views/extranet/openBusinessDocuments/asideMenu/messageMenu.vue";
import CommonDevelopmentToolsMenu from "@/views/extranet/openBusinessDocuments/asideMenu/commonDevelopmentToolsMenu.vue";

export default {
  name: "AsideMenu",
  components: {
    AccessGuideMenu,
    ApiMenu,
    MessageMenu,
    CommonDevelopmentToolsMenu,
  },
  props: {
    isShrink: { type: Boolean },
  },
  data() {
    return {
      docType: this.$route.name,
    };
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