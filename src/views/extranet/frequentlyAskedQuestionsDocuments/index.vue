<template>
  <div class="frequently-asked-questions-documents">
    <el-container class="frequently-asked-questions-documents-container">
      <el-aside class="container-aside">
        <AsideMenu @queryMenuList="queryMenuList" />
      </el-aside>
      <el-main class="container-main">
        <div class="main-breadcrumb">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
              v-for="item in breadcrumbList"
              :key="item.code"
              :to="computeRouterLink(item)"
              >{{ item.typeName }}</el-breadcrumb-item
            >
            <el-breadcrumb-item v-if="$route.params.docCode"
              >问题详情</el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AsideMenu from "./components/AsideMenu/index.vue";
export default {
  name: "FrequentlyAskedQuestionsDocuments",
  components: { AsideMenu },
  data() {
    return {
      menuList: [],
      breadcrumbList: [],
    };
  },
  watch: {
    "$route.params.workOrderTypeCode": {
      handler() {
        this.initDefaultBreadcrumbList(this.menuList);
      },
    },
  },
  mounted() {
    const elOverflow = document.querySelector(".wly-main-container");
    elOverflow.setAttribute("style", "overflow-x: visible");
  },
  destroyed() {
    const elOverflow = document.querySelector(".wly-main-container");
    elOverflow.setAttribute("style", "overflow-x: hidden");
  },
  methods: {
    queryMenuList(menuList) {
      this.menuList = menuList;
      this.initDefaultBreadcrumbList(this.menuList);
    },
    // 递归遍历找出面包屑层级
    initDefaultBreadcrumbList(currentMenuList) {
      let breadcrumbList = [];
      currentMenuList.forEach((currentMenuItem) => {
        const { children, code } = currentMenuItem;
        if (code === this.$route.params.workOrderTypeCode) {
          breadcrumbList.push(currentMenuItem);
        } else if (children && children.length > 0) {
          let deepArray = this.initDefaultBreadcrumbList(children);
          if (deepArray.length) {
            breadcrumbList = [currentMenuItem, ...deepArray];
          }
        }
      });
      this.breadcrumbList = breadcrumbList;
      return breadcrumbList;
    },
    computeRouterLink(item) {
      if (item.code === this.$route.params.workOrderTypeCode) {
        return { name: "QuestionDocsList", params: item.code };
      } else {
        return null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.frequently-asked-questions-documents {
  .frequently-asked-questions-documents-container {
    height: 100%;
    .container-aside {
      border-right: solid 1px #eaeaea;
      padding-left: 8px;
      position: sticky;
      top: 60px;
      height: calc(100vh - 60px);
      overflow: auto;
    }
    .container-main {
      background: #fff;
      .main-breadcrumb {
        max-width: 66vw;
        padding-bottom: 28px;
        border-bottom: 1px solid rgb(230, 231, 235);
        .el-breadcrumb {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>