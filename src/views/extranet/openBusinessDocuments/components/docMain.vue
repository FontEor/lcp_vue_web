<template>
  <el-container class="doc-main">
    <el-aside
      class="doc-main__aside aside-container"
      :class="{
        'doc-main__aside': true,
        'aside-container': true,
        'common-development-tools': computeResizeButtonVisible,
      }"
      :style="{ width: computeAsideWidth + 'px' }"
    >
      <AsideMenu :isShrink="isShrink" />
      <div
        v-if="computeResizeButtonVisible"
        class="aside__resize-button"
        :style="{ left: computeResizeButtonLeft + 'px' }"
        @click="onClickResizeButton"
      >
        <i :class="computeResizeButtonIconClassName" />
      </div>
    </el-aside>
    <el-main>
      <router-view :key="key" />
    </el-main>
  </el-container>
</template>
<script>
import AsideMenu from "@/views/extranet/openBusinessDocuments/asideMenu/index.vue";
export default {
  name: "DocMain",
  components: {
    AsideMenu,
  },
  data() {
    return {
      isShrink: false,
      scrollLeft: 0,
    };
  },
  computed: {
    key() {
      return this.$route.fullPath;
    },
    computeResizeButtonVisible() {
      const { name } = this.$route;
      return name === "CommonDevelopmentToolsDetail";
    },
    computeResizeButtonIconClassName() {
      return this.isShrink ? "el-icon-arrow-right" : "el-icon-arrow-left";
    },
    computeAsideWidth() {
      if (!this.computeResizeButtonVisible) {
        this.isShrink = false;
      }
      return this.computeResizeButtonVisible ? (this.isShrink ? 60 : 150) : 290;
    },
    computeResizeButtonLeft() {
      const { scrollLeft } = this;
      return this.isShrink ? 60 - scrollLeft : 150 - scrollLeft;
    },
  },
  methods: {
    onClickResizeButton() {
      this.isShrink = !this.isShrink;
    },
    scrollToLightNavItem() {
      this.scrollLeft = document.documentElement.scrollLeft;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToLightNavItem);
    this.scrollToLightNavItem();
  },
  destroyed() {
    document.querySelector(".aside-container").style.width = "100vw";
    window.removeEventListener("scroll", this.scrollToLightNavItem);
  },
};
</script>

<style lang="scss" scoped>
.doc-main {
  background: #fff;
  .aside-container {
    border-right: solid 1px #eaeaea;
    overflow: visible;
    padding-left: 8px;
    background-color: #f6f7fc;

    &.common-development-tools {
      border-right: none;
      box-shadow: 2px 0 8px 0 rgba(0, 0, 0, 0.08);
      transition: width 0.05s;
    }

    .aside__resize-button {
      position: fixed;
      top: 55vh;
      left: 150px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 12px;
      height: 42px;
      color: #fff;
      border-radius: 0 12px 12px 0;
      background: #3c6ef0;
      content: "";
      cursor: pointer;
    }
  }
  .el-main {
    padding: 0;
    overflow: visible;
  }
}
</style>
