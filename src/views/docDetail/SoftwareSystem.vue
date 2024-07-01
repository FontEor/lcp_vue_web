<template>
  <div class="softwareSystem-page">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="com-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'HelpDocument' }">{{
        $t("docDetail.SoftwareSystem.5ivktslc3og0")
      }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ prodName }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container class="container">
      <el-aside class="aside-view" width="316px">
        <div class="aside-view-top">
          <h2 class="tit">{{ prodName }}</h2>
        </div>
        <el-tree
          :data="data"
          :props="defaultProps"
          :highlight-current="true"
          v-on:node-click="fetchDocWithRouter"
          :expand-on-click-node="true"
          :default-expand-all="false"
          :current-node-key="selectDefaultKey"
          :default-expanded-keys="selectDefault"
          class="view-tree"
          node-key="id"
          :indent="30"
          ref="docTree"
        >
        </el-tree>
      </el-aside>
      <el-main class="main-view">
        <div v-if="this.docContent != null">
          <h2 class="tit2 cf">
            {{ docTitle }}
            <el-button main class="com-radius0 fr" @click="downloadPdf">
              {{ $t("docDetail.SoftwareSystem.5ivktslc4es0") }}
            </el-button>
            <div
              class="search-bar"
              style="width: 200px; float: right; margin-right: 5px"
            >
              <el-input
                clearable
                v-model="prodDockeywords"
                :placeholder="$t('docDetail.SoftwareSystem.5ivktslc4js0')"
                suffix-icon="el-icon-search"
                @keyup.enter.native="searchProdDoc()"
              ></el-input>
            </div>
          </h2>
          <p class="tip">
            {{ $t("docDetail.SoftwareSystem.5ivktslc4js1") }}{{ docUpdateTime }}
          </p>
          <MarkdownPreview
            v-if="docContent"
            v-model="docContent"
            :after="initAsideNav"
            class="markdown-preview"
          />
        </div>
      </el-main>
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
    </el-container>
  </div>
</template>

<script>
import MarkdownPreview from "@/components/MarkdownPreview/index.vue";
import request from "@/utils/request";
import { parseTime } from "@/utils";
import isIntranet from "@/utils/isIntranet";

export default {
  name: "SoftwareSystem",
  components: { MarkdownPreview },
  data() {
    return {
      id: this.$route.params.id,
      docId: this.$route.params.docId,
      data: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
      selectDefault: [],
      selectDefaultKey: "",
      docTitle: "",
      docContent: "",
      docUpdateTime: "",
      prodName: "",
      docType: "",
      selectRoot: [],
      prodDockeywords: "",
      navContent: [],
      isClickNav: false,
    };
  },
  watch: {
    // --缺省选择对应节点
    selectDefault(newVal, oldVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.selectDefaultKey = newVal[0];
          this.$refs.docTree.setCurrentKey(this.selectDefaultKey);
        });
      }
    },
  },
  methods: {
    // --抽取外网产品信息
    fetchOuterProdSummary() {
      const url = "/outer/product";
      request({
        url,
        method: "get",
        params: { id: this.$route.params.id },
      })
        .then((rsp) => {
          this.prodName = rsp.data.name;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // --抽取内网产品信息
    fetchInnerProdSummary() {
      const url = "/product/release";
      request({
        url,
        method: "get",
        params: { id: this.$route.params.id },
      })
        .then((rsp) => {
          this.prodName = rsp.data.name;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // --组织外网文档树型基本信息
    fetchOuterDocTree() {
      const url = "/outer/doc/getReleasedProductDocTree";
      request({
        url,
        method: "get",
        params: { productId: this.id },
      })
        .then((resp) => {
          this.data = resp.data[0].children;
          // --2020.08.17不再主动搜索文档id,直接通过文档id参数完成文档内容索引
          if (this.docId) {
            this.fetchDocWithId(this.docId);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // --组织内网文档树型基本信息
    fetchInnerDocTree() {
      const url = "/doc/getReleasedProductDocTree";
      request({
        url,
        method: "get",
        params: { productId: this.id },
      })
        .then((resp) => {
          this.data = resp.data[0].children;
          // --2020.08.17不再主动搜索文档id,直接通过文档id参数完成文档内容索引
          if (this.docId) {
            this.fetchDocWithId(this.docId);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // --获取文档信息
    fetchDocWithId(id) {
      const url = isIntranet()
        ? "/doc/findReleaseDocById"
        : "/outer/doc/getReleaseDocById";
      request({
        url,
        method: "get",
        params: { id },
      })
        .then((resp) => {
          this.docContent = resp.data.content;
          this.docTitle = resp.data.title;
          this.docType = resp.data.docType;
          if (resp.data.updateTime) {
            this.docUpdateTime = parseTime(
              resp.data.updateTime,
              "{y}-{m}-{d} {h}:{i}"
            );
          }
          if (this.docId) {
            this.selectDefault.push(this.docId);
          }
          this.initAsideNav();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    initAsideNav() {
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
    },

    // --2020.08.17重新构建触发动作
    fetchDocWithRouter(data) {
      this.docType = data.docType;
      if (this.docType === 2) {
        this.$router.push({
          name: "DocSoftwareSystem",
          params: { id: this.id, docId: data.id },
        });
      }
    },

    downloadPdf() {
      request({
        url: "/outer/doc/pdf",
        method: "get",
        params: { productId: this.id },
      })
        .then((resp) => {
          console.log(resp);
          const link = document.createElement("a");
          link.href = resp.data;
          link.setAttribute("target", "_blank");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchProdDoc() {
      if (!this.prodDockeywords) {
        return;
      }
      const q = this.prodDockeywords;
      this.$router.push({
        path: "/searchResult",
        query: {
          q: q,
          productId: this.id,
          activeName: "fifth",
        },
      });
      this.prodDockeywords = "";
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
  },
  created() {
    if (isIntranet()) {
      // --获取内网产品名称
      this.fetchInnerProdSummary();
      // --获取外网产品文档树
      this.fetchInnerDocTree();
    } else {
      // --获取外网产品名称
      this.fetchOuterProdSummary();
      // --获取外网产品文档树
      this.fetchOuterDocTree();
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToLightNavItem);
    const elOverflow = document.querySelector(".wly-main-container");
    elOverflow.setAttribute("style", "overflow-x: visible");
  },
  destroyed() {
    const elOverflow = document.querySelector(".wly-main-container");
    elOverflow.setAttribute("style", "overflow-x: hidden");
    window.removeEventListener("scroll", this.scrollToLightNavItem);
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/doc.scss";
.aside-view {
  position: sticky;
  top: 128px;
  height: calc(100vh - 108px);
}
.aside-view-right__navList {
  width: 218px;
  flex-shrink: 0;
  position: sticky;
  top: 128px;
  overflow: auto;
  max-height: calc(100vh - 256px);
}
.main-view {
  min-width: 500px;
}
.aside-view-right__navItem {
  cursor: pointer;
  border-left: 1px solid #d9d9d9;
  padding: 4px 30px 4px 20px;
  font-size: 12px;
}
.active {
  border-left: 2px solid #3c6ef0;
  font-weight: 600;
}
</style>
