<template>
  <!-- 接入指南左侧菜单 -->
  <div
    class="access-guide-menu"
    :class="{ 'access-guide-menu-preview': isRoutePath }"
  >
    <el-menu
      v-for="(item, index) in menuList"
      :key="index"
      :default-active="defaultActive"
      class="access-guide-menu__menu"
      @select="selectMenu"
    >
      <el-submenu
        v-if="item.children"
        :key="item.id.toString()"
        :index="item.id.toString()"
        class="menu__outer-submenu"
      >
        <template slot="title">
          <span slot="title" class="outer-submenu__title">{{
            item.title
          }}</span>
        </template>
        <SubMenu :menuList="item.children" />
      </el-submenu>
      <el-menu-item
        v-else
        :key="item.id.toString()"
        :index="item.id.toString()"
        class="menu__outer-menu-item"
      >
        <span slot="title" class="outer-menu-item__title">{{
          item.title
        }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import SubMenu from "@/views/extranet/openBusinessDocuments/components/SubMenu.vue";
import request from "@/utils/request";
import { SappModule } from "@/store/common/modules/app";

export default {
  name: "AccessGuideMenu",
  components: {
    SubMenu,
  },
  data() {
    return {
      menuList: [],
      docId: "",
    };
  },
  computed: {
    defaultActive() {
      if (this.$route.params.docId) {
        return this.$route.params.docId.toString();
      }
    },
    isRoutePath() {
      return this.$route.path.split("/")[1] === "preview-docking-plan";
    },
    unitId() {
      return this.$route.params.unitId;
    },
    approvalNumber() {
      return SappModule.approvalNumber;
    },
  },
  methods: {
    /**
     * 选择菜单路由
     */
    selectMenu(index) {
      let replacePath = "AccessGuideDetail";
      let query = {};
      if (this.isRoutePath) {
        replacePath = "AccessGuideDetailPreview";
        query = {
          approvalNumber: SappModule.approvalNumber,
        };
      }
      this.$router
        .replace({
          name: replacePath, //"AccessGuideDetail",
          params: { docId: index },
          query,
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
        const { id, children } = currentMenuItem;
        if (children && children.length > 0) {
          return this.initDefaultActiveMenuItem(children);
        } else {
          this.docId = id.toString();
          return true;
        }
      });
    },
    /**
     * 获取菜单list信息
     */
    async getMenuList(url) {
      let params = {
        objId: this.unitId,
      };
      if (this.isRoutePath) {
        params = {
          id: this.unitId,
          approvalNumber: this.approvalNumber,
        };
      }
      return await request({
        url,
        method: "get",
        params,
      }).catch((e) => {
        console.log(e);
      });
    },
    handleMenuData() {
      let url = "/doc/getDocByGroupByTree";
      if (this.isRoutePath) {
        url = "/bizview/getDocPreByGroupByTree";
      }
      this.getMenuList(url).then(({data}) => {
        this.menuList = data || [];
        this.initDefaultActiveMenuItem(this.menuList);
        const { docId } = this;
        if (this.$route.name === "AccessGuide") {
          this.$router.replace({
            name: "AccessGuideDetail",
            params: { docId },
          });
        }
        if (this.$route.name === "AccessGuidePreview") {
          this.$router.replace({
            name: "AccessGuideDetailPreview",
            params: { docId },
            query: {
              approvalNumber: SappModule.approvalNumber,
            },
          });
        }
      }).catch((error)=>{
        console.log(error)
      });
    },
  },
  created() {
    this.handleMenuData();
  },
};
</script>

<style lang="scss" scoped>
.access-guide-menu {
  position: sticky;
  top: 120px;
  height: calc(100vh - 120px);
  overflow: auto;

  .access-guide-menu__menu {
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
.access-guide-menu-preview {
  top: 60px;
}
</style>