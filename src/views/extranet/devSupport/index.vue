<template>
  <div class="dev-support devSupport-page">
    <el-container
      class="dev-support__container"
      :style="{ backgroundColor: 'white' }"
    >
      <el-aside class="container__aside" width="290px">
        <el-menu
          class="aside__menu"
          :default-openeds="openedList"
          :default-active="defaultActive"
        >
          <el-submenu class="menu__submenu" index="1">
            <template slot="title">
              <span class="submenu__title">{{
                $t("devSupport.extranetIndex.5ivj9qy964w0")
              }}</span>
            </template>
            <template v-for="item in items">
              <router-link
                v-if="item.type == 1"
                :key="item.id"
                :to="{
                  name: 'DevSupport',
                  params: { docId: item.id },
                  query: queryId,
                }"
                :clstag="clstag('', item.clstag)"
                class="link"
              >
                <el-menu-item
                  class="submenu__menu-item"
                  :index="`${item.id}`"
                  >{{ item.title }}</el-menu-item
                >
              </router-link>
            </template>
          </el-submenu>
          <el-submenu class="menu__submenu" index="2">
            <template slot="title">
              <span class="submenu__title">{{
                $t("devSupport.extranetIndex.5ivj9qy96080")
              }}</span>
            </template>
            <template v-for="item in items">
              <router-link
                v-if="item.type == 2"
                :key="item.id"
                :to="{
                  name: 'DevSupport',
                  params: { docId: item.id },
                  query: queryId,
                }"
                :clstag="clstag('', item.clstag)"
                class="link"
              >
                <el-menu-item
                  class="submenu__menu-item"
                  :index="`${item.id}`"
                  >{{ item.title }}</el-menu-item
                >
              </router-link>
            </template>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main
        v-if="docId && findItem"
        class="main-view"
        style="background-color: white; min-width: 666px; overflow: visible"
      >
        <el-container>
          <el-main class="markdown-preview-wrapper">
            <h2 class="title">
              {{ docTitle }}
            </h2>
            <div class="update-time-evaluation">
              <p>{{ formatUpdateTimeText }}</p>
              <ScreenshotEvaluation
                :objId="docId"
                :docTypeMain="docTypeMain"
                :helpful.sync="helpful"
                :buttonLoading.sync="buttonLoading"
                :evaluationButtonDisabled.sync="evaluationButtonDisabled"
                inline
              />
            </div>
            <el-divider class="help-divider" />
            <MarkdownPreview
              v-if="docContent"
              v-model="docContent"
              :after="fetchDoc"
              class="markdown-preview"
            />
            <el-divider />
            <ScreenshotEvaluation
              :objId="docId"
              :docTypeMain="docTypeMain"
              :helpful.sync="helpful"
              :buttonLoading.sync="buttonLoading"
              :evaluationButtonDisabled.sync="evaluationButtonDisabled"
            />
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
        <BlackFooter />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MarkdownPreview from "@/components/MarkdownPreview/index.vue";
import BlackFooter from "@/components/extranet/Footer/blackFooter.vue";
import ScreenshotEvaluation from "@/components/extranet/screenshot-evaluation/index.vue";
import request from "@/utils/request";
import pageClick from "@/utils/pageClick";

export default {
  components: { MarkdownPreview, BlackFooter, ScreenshotEvaluation },
  data() {
    return {
      idx: 0,
      items: [],
      docTypeMain: 3,
      helpful: undefined,
      buttonLoading: false,
      evaluationButtonDisabled: false,

      docTitle: "",
      docContent: "",
      updateTime: "",
      devSupportType: -1,
      docClassification: this.$t("devSupport.extranetIndex.5ivj9qy967o0"),
      unitId: "",
      showMessage: true,
      unMatchDocId: 0,
      how2OrderPath: "",
      bizApis: [],
      bizMessages: [],
      navContent: [],
      isClickNav: false,
      timerId: null,
      openedList: ["1", "2"],
      bizUnit: "",
      title: "",
      type: "",
    };
  },
  computed: {
    docId() {
      return parseInt(this.$route.params.docId);
    },
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
    defaultActive() {
      if (this.$route.params.docId) {
        return this.$route.params.docId.toString();
      }
    },
    formatUpdateTimeText() {
      const { updateTime } = this;
      return updateTime
        ? `更新时间：${this.$dayjs(updateTime).format("YYYY-MM-DD HH:mm:ss")}`
        : "";
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
          this.items = resp.data.list instanceof Array ? resp.data.list : [];
          //外网增加新手指南
          request({
            url,
            method: "get",
            params: { type: 1 },
          })
            .then((resp) => {
              if (this.items == null) {
                this.items = [];
              }
              if (resp.data.list != null && resp.data.list.length > 0) {
                for (let i = 0; i < resp.data.list.length; i++) {
                  this.items.push(resp.data.list[i]);
                }
              }
              this.items = this.items.map((item) => {
                const clstagTable = {
                  [this.$t("devSupport.extranetIndex.5ivj9qy96as1")]:
                    "devSupport_1618993363242|5",
                  [this.$t("devSupport.extranetIndex.5ivj9qy96as2")]:
                    "devSupport_1618993363242|6",
                  [this.$t("devSupport.extranetIndex.5ivj9qy96as0")]:
                    "devSupport_1618993363242|7",
                  [this.$t("devSupport.extranetIndex.5ivj9qy96as3")]:
                    "devSupport_1618993363242|8",
                  [this.$t("devSupport.extranetIndex.5ivj9qy96as4")]:
                    "devSupport_1618993363242|9",
                  [this.$t("devSupport.extranetIndex.5ivj9qy96as5")]:
                    "devSupport_1618993363242|10",
                  [this.$t("devSupport.extranetIndex.5ivj9qy96as6")]:
                    "devSupport_1618993363242|11",
                  [this.$t("devSupport.extranetIndex.5ivj9qy96as7")]:
                    "devSupport_1618993363242|12",
                };
                const clstag = clstagTable[item.title] || "";
                return { ...item, clstag };
              });
            })
            .catch((e) => {
              console.error(e);
            });
        })
        .catch((e) => {
          console.error(e);
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
          this.docTitle = resp.data.title;
          this.updateTime = resp.data.updateTime;
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
          console.error(e);
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
      this.$message.error(error.response.data.error_response.zh_desc);
    },
  },
  created() {
    this.devSupportType = `2`;
    this.how2OrderPath = `${window.env.docHow2Order}`;
    this.fetchDocList();
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToLightNavItem);
    const elOverflow = document.querySelector(".wly-main-container");
    elOverflow.setAttribute("style", "overflow-x: visible");
    this.unitId = this.$route.query.id;
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

.dev-support {
  .dev-support__container {
    .container__aside {
      background-color: #f6f7fc;
      position: sticky;
      top: 60px;
      height: calc(100vh - 60px);
      overflow: auto;

      .aside__menu {
        border-right: none;
        background-color: #f6f7fc;

        ::v-deep .menu__submenu {
          .el-submenu__title {
            padding-left: 12px !important;
            background-color: transparent;

            .submenu__title {
              font-weight: 600;
            }
          }

          .submenu__menu-item {
            background-color: #f6f7fc;
          }
        }
      }
    }

    .main-view {
      padding: 0;

      .title {
        font-size: 2em;
        font-weight: 600;
      }

      .update-time-evaluation {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .help-divider {
        margin: 8px 0;
      }

      .markdown-preview-wrapper {
        min-height: calc(100vh - 188px);
        .markdown-preview {
          // padding: 16px 20px;
        }
      }

      .black-footer {
        position: relative;

        ::v-deep .black-footer-license-content {
          width: 890px;
        }
      }
    }
  }
}

.devSupport-page {
  width: 98vw;
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
  height: 0;
  position: -webkit-sticky;
  position: sticky;
  top: 60px;
  .aside-view-right__navList {
    margin: 0 auto;
    overflow: auto;
    max-height: calc(100vh - 140px);
    .aside-view-right__navItem {
      cursor: pointer;
      border-left: 1px solid #d9d9d9;
      padding: 4px 30px 4px 20px;
      font-size: 12px;
      width: 218px;
      &.active {
        border-left: 2px solid #3c6ef0;
        font-weight: 600;
      }
    }
  }
}
</style>
