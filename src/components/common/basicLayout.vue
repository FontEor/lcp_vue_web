<template>
  <div class="app-inner">
    <div class="wly-body-wrapper">
      <div class="wly-body-inner">
        <!-- 内网产品文档中心 -->
        <BasicHeader />
        <div class="doc-container">
          <DocContainer />
        </div>
      </div>
    </div>
    <Footbar />
  </div>
</template>

<script>
import { Footbar } from "@/components/common";
import DocContainer from "@/components/common/DocContainer/index.vue";
import BasicHeader from "@/components/common/basicHeader/index.vue";

export default {
  name: "BasicLayout",
  components: {
    BasicHeader,
    DocContainer,
    Footbar,
  },
  computed: {},
  methods: {},
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
.doc-container {
  // // overflow-x: hidden;
  // display: flex;
  // background: #ffffff;
  // min-height: 600px;
  // // width: 1200px;
  // margin: 30px auto 20px;
}
</style>
