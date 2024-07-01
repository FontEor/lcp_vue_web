<template>
  <div class="devSupport-page">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="com-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'HelpDocument' }"
        >文档</el-breadcrumb-item
      >
      <el-breadcrumb-item>API使用指南</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container class="container">
      <el-aside class="aside-view" width="316px">
        <div class="router-list">
          <router-link
            v-for="item in this.items"
            :to="{ name: 'ApiNewHand', params: { docId: item.id } }"
            :key="item.id"
            class="link"
          >
            {{ item.title }}
          </router-link>
        </div>
      </el-aside>
      <el-main class="main-view">
        <div v-if="this.$route.params.docId && findItem">
          <MarkdownPreview
            v-if="docContent"
            v-model="docContent"
            :after="fetchDoc"
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
import request from "@/utils/request";
import MarkdownPreview from "@/components/MarkdownPreview/index.vue";

export default {
  name: "ApiNewHand",
  components: { MarkdownPreview },
  data() {
    return {
      idx: 0,
      items: [],
      docContent: "",
      apiDocType: -1,
      navContent: [],
      isClickNav: false,
      title: "",
    };
  },
  computed: {
    findItem() {
      const list = this.items;
      const id = this.$route.params.docId;
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (item.id == id) {
          this.title = item.title;
          this.fetchDoc();
          return item;
        }
      }
    },
  },
  methods: {
    fetchDocList() {
      const url = "doc/getReleaseDocList";
      request({
        url: url,
        method: "get",
        params: { type: this.apiDocType },
      })
        .then((resp) => {
          this.items = resp.data.list;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    fetchDoc() {
      const url = "doc/getReleaseDoc";
      request({
        url: url,
        method: "get",
        params: { type: this.apiDocType, title: this.title },
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
    this.apiDocType = `7`;
    this.fetchDocList();
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
