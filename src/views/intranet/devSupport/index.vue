<template>
  <div class="devSupport-page">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="com-breadcrumb-unit"
    >
      <el-breadcrumb-item :to="{ name: 'HelpDocument' }"
        >文档</el-breadcrumb-item
      >
      <el-breadcrumb-item>开发支持</el-breadcrumb-item>
    </el-breadcrumb>

    <el-container
      :style="
        navContent.length > 0
          ? 'min-height:600px;border-right:1px solid #d9d9d9;'
          : 'min-height:600px;background-color:white;'
      "
    >
      <el-aside class="aside-view" style="background-color: white">
        <div class="router-list">
          <el-menu :default-openeds="opends">
            <el-submenu index="1">
              <template slot="title">
                <span>新手指南</span>
              </template>
              <template v-for="item in items">
                <router-link
                  v-if="item.type == 1"
                  :to="{
                    name: 'DevSupport',
                    params: { docId: item.id },
                    query: queryId,
                  }"
                  :key="item.id"
                  class="link"
                  :clstag="clstag('', item.clstag)"
                >
                  <el-menu-item :index="'menu-' + item.id">{{
                    item.title
                  }}</el-menu-item>
                </router-link>
              </template>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <span>开发支持</span>
              </template>
              <template v-for="item in items">
                <router-link
                  v-if="item.type == 2"
                  :to="{
                    name: 'DevSupport',
                    params: { docId: item.id },
                    query: queryId,
                  }"
                  :key="item.id"
                  class="link"
                  :clstag="clstag('', item.clstag)"
                >
                  <el-menu-item :index="'menu-' + item.id">{{
                    item.title
                  }}</el-menu-item>
                </router-link>
              </template>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>
      <el-main class="main-view" style="background-color: white; width: 760px">
        <div v-if="this.$route.params.docId && findItem">
          <MarkdownPreview
            v-if="docContent"
            v-model="docContent"
            :after="fetchDoc"
            class="markdown-preview"
          />
        </div>
      </el-main>
      <aside class="aside-view-right">
        <ul v-if="navContent.length > 0" class="aside-view-right__navList">
          <li
            v-for="(item, index) in navContent"
            :key="index"
            class="aside-view-right__navItem"
            @click="selectNavItem(index)"
          >
            <div
              v-html="item.text"
              style="
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              "
            ></div>
          </li>
        </ul>
      </aside>
    </el-container>
  </div>
</template>

<script>
import request from "@/utils/request";
import MarkdownPreview from "@/components/MarkdownPreview/index.vue";
import pageClick from "@/utils/pageClick";

export default {
  name: "DevSupport",
  components: { MarkdownPreview },
  data() {
    return {
      idx: 0,
      items: [],
      docContent: "",
      devSupportType: -1,
      docClassification: "平台使用说明",
      unitId: "",
      showMessage: true,
      unMatchDocId: 0,
      how2OrderPath: "",
      bizApis: [],
      bizMessages: [],
      navContent: [],
      isClickNav: false,
      timerId: null,
      opends: ["1", "2"],
      bizUnit: "",
      title: "",
      type: "",
    };
  },
  computed: {
    queryId() {
      const id = this.$route.query.id;
      return id ? { id } : {};
    },
    findItem() {
      const list = this.items;
      const id = this.$route.params.docId;
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (item.id == id) {
          this.title = item.title;
          this.type = item.type;
          this.fetchDoc();
          return item;
        }
      }
    },
  },
  methods: {
    scrollToLightNavItem() {
      if (this.isClickNav) return;
      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {
        const elNavItemList = document.querySelectorAll(
          ".aside-view-right__navItem"
        );
        const elTitleList = document.querySelectorAll(".action-tit");
        if (elTitleList && elTitleList.length > 0) {
          elTitleList.forEach((item, index) => {
            // 其中120是顶部header的高度像素值
            if (item.offsetTop - 120 <= document.documentElement.scrollTop) {
              elNavItemList.forEach((item) => {
                item.classList.remove("active");
              });
              elNavItemList[index].classList.add("active");
            }
          });
          // 当滚动未达到第一个标题时重制导航栏状态
          if (
            document.documentElement.scrollTop <
            elTitleList[0].offsetTop - 120
          ) {
            elNavItemList.forEach((item) => {
              item.classList.remove("active");
            });
            elNavItemList[0].classList.add("active");
          }
        }
        this.timerId = null;
      }, 300);
    },
    // 点击事件埋点
    clstag(intranetId, extranetId) {
      return pageClick(intranetId, extranetId);
    },
    fetchDocList() {
      const url = "doc/getReleaseDocList";
      request({
        url,
        method: "get",
        params: { type: this.devSupportType },
      })
        .then((resp) => {
          this.items = resp.data.list;

          this.items = this.items.map((item) => {
            const clstagTable = {
              开放业务订购说明: "devSupport_1618993363242|5",
              用户授权介绍: "devSupport_1618993363242|6",
              "物流开放平台授权&JOS平台授权": "devSupport_1618993363242|7",
              API调用方法详解: "devSupport_1618993363242|8",
              API测试工具: "devSupport_1618993363242|9",
              SDK使用说明: "devSupport_1618993363242|10",
              京东物流开放平台网站软件服务条款: "devSupport_1618993363242|11",
              京东物流开放平台开发者协议: "devSupport_1618993363242|12",
            };
            const clstag = clstagTable[item.title] || "";
            return { ...item, clstag };
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    fetchDoc() {
      const url = "doc/getReleaseDoc";
      request({
        url,
        method: "get",
        params: { type: this.type, title: this.title },
      })
        .then((resp) => {
          this.docContent = resp.data.content;
          this.$nextTick(() => {
            for (let i = 1; i < 10; i++) {
              let selectorTitle = document
                .querySelector(".markdown-preview")
                .querySelectorAll("h" + i);
              if (selectorTitle.length > 0) {
                for (let j = 0; j < selectorTitle.length; j++) {
                  if (selectorTitle[j].classList.value == "") {
                    selectorTitle[j].classList.add("action-tit");
                    let obj = {};
                    obj.text = selectorTitle[j].innerText;
                    obj.level = i;
                    this.navContent.push(obj);
                  }
                }
                this.$nextTick(() => {
                  const elNavItemList = document.querySelectorAll(
                    ".aside-view-right__navItem"
                  );
                  if (elNavItemList && elNavItemList.length > 0) {
                    elNavItemList.forEach((item) => {
                      item.classList.remove("active");
                    });
                    elNavItemList[0].classList.add("active");
                  }
                });
                break;
              }
            }
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    selectNavItem(index) {
      this.isClickNav = true;
      const elNavItemList = document.querySelectorAll(
        ".aside-view-right__navItem"
      );
      const elTitleList = document.querySelectorAll(".action-tit");
      elNavItemList.forEach((item) => {
        item.classList.remove("active");
      });
      elNavItemList[index].classList.add("active");
      const top = elTitleList[index].offsetTop - 120;
      const behavior = "smooth";
      window.scrollTo({ top, behavior });
      setTimeout(() => {
        this.isClickNav = false;
      }, 800);
    },
    foundDoc(unitDocList, unitId, title) {
      for (const unit of unitDocList) {
        //unMatchDocId是为了测试环境匹配文章无数据的情况
        this.unMatchDocId = unit.docList[0].id;
        if (Number(unit.objId) === Number(unitId)) {
          for (const doc of unit.docList) {
            if (doc.title === title) {
              return doc;
            }
          }
        }
      }
      return null;
    },

    //处理网关请求异常
    handleGatewayError(error) {
      console.log(error);
      this.$message.error(error.response.data.error_response.zh_desc);
    },
  },
  created() {
    this.devSupportType = `6`;
    this.how2OrderPath = `${window.env.docHow2OrderInner}`;
    this.fetchDocList();
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToLightNavItem);
    const elOverflow = document.querySelector(".wly-main-container");
    elOverflow.setAttribute("style", "overflow-x: visible");
    const elFooter = document.querySelector(".footer");
    elFooter.setAttribute("style", "min-width: 1200px");
    this.unitId = this.$route.query.id;
  },
  destroyed() {
    const elOverflow = document.querySelector(".wly-main-container");
    elOverflow.setAttribute("style", "overflow-x: hidden");
    const elFooter = document.querySelector(".footer");
    elFooter.setAttribute("style", "min-width: auto");
    window.removeEventListener("scroll", this.scrollToLightNavItem);
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/doc.scss";
.markdown-preview {
  padding: 16px 20px;
}
.doc-classification-btn {
  margin: 10px 0 20px 0;
}
.doc-col-4 ::v-deep .el-radio-button--big .el-radio-button__inner {
  padding: 12px 16px;
  font-size: 16px;
  width: 300px;
}
.doc-col-3 ::v-deep .el-radio-button--big .el-radio-button__inner {
  padding: 12px 16px;
  font-size: 16px;
  width: 400px;
}
.com-breadcrumb-unit {
  padding: 18px 0 10px 0;
}

.aside-view-right {
  box-sizing: border-box;
  width: 160px;
  height: 0;
  padding: 0 24px;
  position: -webkit-sticky;
  position: sticky;
  top: 120px;
  .aside-view-right__navList {
    margin: 0 auto;
    overflow: auto;
    max-height: calc(100vh - 256px);
    .aside-view-right__navItem {
      cursor: pointer;
      border-left: 1px solid #d9d9d9;
      padding: 4px 8px;
      font-size: 12px;
      // width: 140px;
      &.active {
        border-left: 2px solid #3c6ef0;
        font-weight: 600;
      }
    }
  }
}
</style>
