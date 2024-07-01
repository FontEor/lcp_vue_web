<template>
  <div class="document-page">
    <div class="markdown-wrap">
      <h2 class="title">
        {{ docTitle }}
        <el-button main class="com-radius0 fr" @click="downloadDocPdf">
          下载文档
        </el-button>
        <div class="fr" style="width: 200px; margin-right: 5px">
          <el-input
            clearable
            v-model="prodDockeywords"
            placeholder="搜索本产品下的文档"
            suffix-icon="el-icon-search"
            @keyup.enter.native="searchProdDoc()"
          ></el-input>
        </div>
      </h2>
      <MarkdownPreview
        v-if="docContent"
        v-model="docContent"
        :after="afterPreview"
        class="markdown-preview"
      />
    </div>
    <ul v-if="navContent.length > 0" class="aside-view-right__navList">
      <li
        v-for="(item, index) in navContent"
        :key="index"
        class="aside-view-right__navItem"
        @click="selectNavItem(index)"
      >
        <div
          v-html="item.text"
          style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap"
        ></div>
      </li>
    </ul>
  </div>
</template>

<script>
import MarkdownPreview from "@/components/MarkdownPreview/index.vue";
import docCenter from "@/api/intranet/docCenter/index.js";
import productApi from "@/api/intranet/product/index";
export default {
  components: { MarkdownPreview },
  data() {
    return {
      docContent: "",
      docTitle: "",
      prodDockeywords: "",
      productId: null,
      defaultOpen: "preview",
      previewBackground: "#ffffff",
      navContent: [],
      isClickNav: false,
      timerId: null,
    };
  },
  methods: {
    async findReleaseDocById() {
      const id = this.$route.params.docId;
      const params = { id };
      const { data } = await docCenter.findReleaseDocById(params);
      this.docContent = data.content;
      // this.docContent = content;
      this.docTitle = data.title;
    },
    afterPreview() {
      const markDownDom = document.querySelector(".markdown-preview");
      this.navContent = [];
      for (let i = 1; i < 10; i++) {
        let selectorTitle = markDownDom.querySelectorAll("h" + i);
        if (selectorTitle.length > 0) {
          for (let j = 0; j < selectorTitle.length; j++) {
            if (selectorTitle[j].classList.value == "") {
              selectorTitle[j].classList.add("action-tit");
              if (
                !this.navContent.find(
                  (item) => item.text === selectorTitle[j].innerText
                )
              ) {
                let obj = {};
                obj.text = selectorTitle[j].innerText;
                obj.level = i;
                this.navContent.push(obj);
              }
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
    searchProdDoc() {
      if (!this.prodDockeywords) {
        return;
      }
      const q = this.prodDockeywords;
      this.$router.push({
        path: "/searchResult",
        query: {
          q: q,
          productId: this.productId,
          activeName: "fifth",
        },
      });
      this.prodDockeywords = "";
    },

    async downloadDocPdf() {
      const productCode = this.$route.params.productCode;
      const params = { productCode };
      const { data } = await docCenter.downloadDocPdf(params);
      const link = document.createElement("a");
      link.href = data;
      link.setAttribute("target", "_blank");
      link.click();
      document.body.removeChild(link);
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
            if (elNavItemList[index]) {
              // 其中120是顶部header的高度像素值
              if (item.offsetTop - 120 <= document.documentElement.scrollTop) {
                elNavItemList.forEach((item) => {
                  item.classList.remove("active");
                });
                elNavItemList[index].classList.add("active");
              }
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
            elNavItemList[0] && elNavItemList[0].classList.add("active");
          }
        }
        this.timerId = null;
      }, 300);
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
  },
  async created() {
    this.findReleaseDocById();
    const productCode = this.$route.params.productCode;
    const params = productCode;
    const { data } = await productApi.findMiniProductInfo(params);
    this.productId = data.id;
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToLightNavItem);
    const elOverflow = document.querySelector(".el-main");
    elOverflow && elOverflow.setAttribute("style", "overflow: visible");
  },
  destroyed() {
    const elOverflow = document.querySelector(".el-main");
    elOverflow && elOverflow.setAttribute("style", "overflow: auto");
    window.removeEventListener("scroll", this.scrollToLightNavItem);
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin: 0 25px 20px 0;
  font-size: 20px;
  font-weight: 600;
}
.document-page {
  display: flex;
}
.markdown-wrap {
  width: calc(98vw - 558px);
}
.aside-view-right__navList {
  width: 218px;
  flex-shrink: 0;
  position: sticky;
  top: 122px;
  margin-top: -20px;
  overflow: auto;
  max-height: calc(100vh - 256px);
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
