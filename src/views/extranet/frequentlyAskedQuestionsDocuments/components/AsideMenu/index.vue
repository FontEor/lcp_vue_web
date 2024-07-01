<template>
  <div class="aside-menu">
    <el-menu
      v-for="(item, index) in menuList"
      :key="index"
      :default-active="$route.params.workOrderTypeCode"
      class="aside-menu__menu"
      @select="selectMenu"
    >
      <el-submenu
        v-if="item.children"
        :key="item.code"
        :index="item.code"
        class="menu__outer-submenu"
      >
        <template slot="title">
          <span slot="title" class="outer-submenu__title">{{
            item.typeName
          }}</span>
        </template>
        <SubMenu :menuList="item.children" />
      </el-submenu>
      <el-menu-item
        v-else
        :key="item.code"
        :index="item.code"
        class="menu__outer-menu-item"
      >
        <span slot="title" class="outer-menu-item__title">{{
          item.typeName
        }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import SubMenu from "@/views/extranet/frequentlyAskedQuestionsDocuments/components/SubMenu/index.vue";
import lcp from "@/api/extranet/lcp";

export default {
  name: "AsideMenu",
  components: {
    SubMenu,
  },
  data() {
    return {
      menuList: [],
      workOrderTypeCode: "",
    };
  },
  created() {
    this.queryMenuList();
  },
  methods: {
    /**
     * 选择菜单路由
     */
    selectMenu(index) {
      let replacePath = "QuestionDocsList";
      this.$router
        .replace({
          name: replacePath,
          params: { workOrderTypeCode: index },
        })
        .catch((error) => {
          const { message } = error;
          if (
            message.indexOf(
              "Avoided redundant navigation to current location"
            ) === -1
          ) {
            throw new Error(error);
          }
        });
    },
    // 初始化默认激活菜单项
    initDefaultActiveMenuItem(currentMenuList) {
      return currentMenuList.some((currentMenuItem) => {
        const { code, children } = currentMenuItem;
        if (children && children.length > 0) {
          return this.initDefaultActiveMenuItem(children);
        } else {
          this.workOrderTypeCode = code;
          return true;
        }
      });
    },
    /**
     * 获取菜单list信息
     */
    async typeList() {
      return await lcp.workOrder.typeList().catch((error) => {
        throw new Error("typeList" + error);
      });
    },
    async queryMenuList() {
      const { data } = await this.typeList().catch((error) => {
        throw new Error(`queryMenuList, ${error}`);
      });
      this.menuList = data || [];
      this.$emit("queryMenuList", this.menuList);
      this.initDefaultActiveMenuItem(this.menuList);
      const { workOrderTypeCode } = this;
      if (!this.$route.params.workOrderTypeCode) {
        this.$router.push({
          name: "QuestionDocsList",
          params: { workOrderTypeCode },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.aside-menu {
  margin-top: 10px;
  .aside-menu__menu {
    border-right: none;

    ::v-deep .menu__outer-submenu {
      .el-submenu__title {
        background-color: #f6f7fc;

        .outer-submenu__title {
          font-weight: 600;
        }
      }

      &.is-active {
        > .el-submenu__title {
          color: #3c6ef0;
        }
      }
    }

    .menu__outer-menu-item {
      background-color: #f6f7fc;

      .outer-menu-item__title {
        font-weight: 600;
      }
    }
  }
}
</style>