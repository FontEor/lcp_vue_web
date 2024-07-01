<template>
  <div class="common-development-tools-menu">
    <el-menu
      class="common-development-tools-menu__menu"
      :default-active="defaultActive"
      @select="selectMenu"
    >
      <el-menu-item class="menu__menu-item" index="api-test">
        <div class="menu-item__icon api-test-icon" />
        <h4 v-show="computeMenuItemTextVisible" class="menu-item__title">
          API测试工具
        </h4>
      </el-menu-item>
      <el-menu-item class="menu__menu-item" index="sign">
        <div class="menu-item__icon sign-icon" />
        <h4 v-show="computeMenuItemTextVisible" class="menu-item__title">
          签名生成工具
        </h4>
      </el-menu-item>
      <el-menu-item class="menu__menu-item" index="token-search">
        <div class="menu-item__icon el-icon-link" />
        <h4 v-show="computeMenuItemTextVisible" class="menu-item__title">
          token查询工具
        </h4>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "CommonDevelopmentToolsMenu",
  props: {
    isShrink: { type: Boolean },
  },
  data() {
    return {};
  },
  computed: {
    defaultActive() {
      return this.$route.params.toolName || "api-test";
    },
    computeMenuItemTextVisible() {
      return !this.isShrink;
    },
  },
  methods: {
    // 根据参数跳转路由
    pushNewRoute(toolName) {
      this.$router
        .replace({
          name: "CommonDevelopmentToolsDetail",
          params: { toolName },
        })
        .catch((error) => {
          const { name, message } = error;
          if (
            name !== "NavigationDuplicated" &&
            !message.includes(
              "Avoided redundant navigation to current location"
            )
          ) {
            throw new Error(error);
          }
        });
    },
    // 选择菜单操作，改变路由参数并跳转
    selectMenu(index) {
      this.pushNewRoute(index);
    },
  },
  created() {
    this.pushNewRoute(this.defaultActive);
  },
  mounted() {
    document.querySelector(".aside-container").style.width = "150px";
  },
  destroyed() {
    document.querySelector(".aside-container").style.width = "290px";
  },
};
</script>

<style lang="scss" scoped>
.common-development-tools-menu {
  position: sticky;
  top: 120px;
  padding-top: 10px;
  height: calc(100vh - 120px);
  overflow: auto;
  box-shadow: 2px 0 8px 0 rgba(0, 0, 0, 0.08);

  .common-development-tools-menu__menu {
    border-right: none;

    ::v-deep .menu__menu-item {
      padding-left: 10px !important;
      background-color: #f6f7fc;
      .menu-item__title {
        display: inline;
      }

      .menu-item__icon {
        display: inline-block;
        width: 28px;
        height: 28px;
        background-position: center;
        background-repeat: no-repeat;

        &.api-test-icon {
          background-image: url("~@/assets/extranet/images/commonDevelopmentTools/apiTest.svg");
        }

        &.sign-icon {
          background-image: url("~@/assets/extranet/images/commonDevelopmentTools/sign.svg");
        }

        &.el-icon-link{
          font-size: 16px;
          text-align: center;
          line-height: 28px;
        }
      }

      &.is-active {
        border-right: 2px solid #3c6ef0;

        .menu-item__icon {
          &.api-test-icon {
            background-image: url("~@/assets/extranet/images/commonDevelopmentTools/apiTestActive.svg");
          }

          &.sign-icon {
            background-image: url("~@/assets/extranet/images/commonDevelopmentTools/signActive.svg");
          }
        }
      }
    }
  }
}
</style>
