<template>
  <div class="access-guide-doc">
    <el-container class="access-guide-container">
      <el-main v-if="!showNoResult" class="main-view">
        <h2 class="title">
          {{ docTitle }}
        </h2>
        <div class="update-time-evaluation">
          <p>{{ formatUpdateTimeText }}</p>
          <ScreenshotEvaluation
            :objId="docId"
            :docTypeMain="docTypeMain"
            :bizUnitId="unitId"
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
          :after="getMarkdownHeader"
          class="markdown-preview"
        />
        <el-divider />
        <ScreenshotEvaluation
          :objId="docId"
          :docTypeMain="docTypeMain"
          :bizUnitId="unitId"
          :helpful.sync="helpful"
          :buttonLoading.sync="buttonLoading"
          :evaluationButtonDisabled.sync="evaluationButtonDisabled"
        />
        <el-button
          @click="downBasicSdk()"
          style="position: absolute; top: 24px; right: 20px"
          type="primary"
          plain
          >{{ $t("docContent.5ivhevpfxdo1") }}</el-button
        >
      </el-main>
      <aside
        class="aside-view-right"
        :class="{ 'aside-view-right-preview': isRoutePath }"
      >
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
    <BlackFooter v-if="!isRoutePath" />
  </div>
</template>

<script>
import MarkdownPreview from "@/components/MarkdownPreview/index.vue";
import BlackFooter from "@/components/extranet/Footer/blackFooter.vue";
import ScreenshotEvaluation from "@/components/extranet/screenshot-evaluation/index.vue";
import bizDocCenter from "@/api/extranet/openBusineseDocCenter";
import { SappModule } from "@/store/common/modules/app";
import { downloadBaseSdk } from "@/api/business/sdk/baseSdk";
import request from "@/utils/request";

export default {
  components: { MarkdownPreview, BlackFooter, ScreenshotEvaluation },
  data() {
    return {
      docContent: "",
      docTitle: "",
      showNoResult: false,
      navContent: [],
      isClickNav: false,
      docName: "",
      jssKey: "",
      docTypeMain: 3,
      helpful: undefined,
      buttonLoading: false,
      evaluationButtonDisabled: false,
      updateTime: "",
    };
  },
  computed: {
    isRoutePath() {
      return this.$route.path.split("/")[1] === "preview-docking-plan";
    },
    unitId() {
      return parseInt(this.$route.params.unitId);
    },
    docId() {
      return parseInt(this.$route.params.docId);
    },
    approvalNumber() {
      return SappModule.approvalNumber;
    },
    formatUpdateTimeText() {
      const { updateTime } = this;
      return updateTime
        ? `更新时间：${this.$dayjs(updateTime).format("YYYY-MM-DD HH:mm:ss")}`
        : "";
    },
  },
  methods: {
    //获取下载的文件名称
    async genReleaseDocPdf() {
      let url = "/downDoc/genReleaseDocPdf";
      let method = "get";
      const { unitId, docId } = this.$route.params;
      let params = {
        id: docId,
        unitId: unitId,
      };
      await request({
        url,
        method,
        params,
      })
        .then((res) => {
          this.docName = res.data.fileName;
          this.jssKey = res.data.jssKey;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    downBasicSdk() {
      if (
        (this.jssKey === null ||
          this.jssKey === undefined ||
          this.jssKey === "") &&
        this.docName
      ) {
        this.$message.error("文件不存在!");
      } else {
        downloadBaseSdk(this.jssKey, this.docName);
      }
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
    // 获取MD标题构建侧边导航栏数据
    getMarkdownHeader() {
      let headerList = document
        .querySelector(".markdown-preview")
        .querySelectorAll("h1,h2,h3,h4,h5,h6");
      let minLevel = 7;
      headerList.forEach((item) => {
        const localName = parseInt(item.localName.replace("h", ""));
        minLevel = localName < minLevel ? localName : minLevel;
      });
      // 至多显示两级导航
      headerList = [...headerList].forEach((item) => {
        const localName = parseInt(item.localName.replace("h", ""));
        if (localName < minLevel + 2) {
          item.classList.add("action-tit");
          const level = localName;
          const text =
            localName === minLevel
              ? item.textContent
              : `&nbsp;&nbsp;&nbsp;&nbsp;${item.textContent}`;
          this.navContent.push({ level, text });

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
        }
      });
    },
    async findReleaseDocById() {
      let params = null;
      let response = null;
      const id = this.$route.params.docId;
      params = { id };

      if (this.isRoutePath) {
        params = {
          id,
          approvalNumber: this.approvalNumber,
        };
        response = await bizDocCenter.findDocGroupById(params);
      } else {
        response = await bizDocCenter.findReleaseDocGroupById(params);
      }
      const { data } = response;
      if (data && data.content) {
        this.showNoResult = false;
        this.docContent = data.content;
        this.docTitle = data.title;
        this.updateTime = data.updateTime;
        console.log(this.updateTime);
      } else {
        this.showNoResult = true;
      }
    },
  },
  async created() {
    this.findReleaseDocById();
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToLightNavItem);
    this.genReleaseDocPdf();
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToLightNavItem);
  },
};
</script>

<style lang="scss" scoped>
.access-guide-container {
  width: calc(98vw - 290px);
  .main-view {
    position: relative;
    min-width: 692px;

    .update-time-evaluation {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .help-divider {
      margin: 8px 0;
    }
  }
  .title {
    font-size: 2em;
    font-weight: 600;
  }
  .aside-view-right {
    box-sizing: border-box;
    height: 0;
    top: 120px;
    position: -webkit-sticky;
    position: sticky;
    .aside-view-right__navList {
      margin: 0 auto;
      width: 218px;
      overflow: auto;
      max-height: calc(100vh - 200px);
      .aside-view-right__navItem {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        padding: 4px 30px 4px 20px;
        overflow: hidden;
        font-size: 12px;
        text-overflow: ellipsis;
        border-left: 1px solid #d9d9d9;
        cursor: pointer;

        &.active {
          border-left: 2px solid #3c6ef0;
          font-weight: 600;
        }
      }
    }
  }
  .aside-view-right-preview {
    top: 60px;
  }
}
.no-result {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // margin-top: 150px;
  height: 600px;
  .no-result-desc {
    margin-top: -20px;
  }
}

.access-guide-doc {
  .access-guide-container {
    min-height: calc(100vh - 200px);
  }

  .black-footer {
    position: relative;

    ::v-deep .black-footer-license-content {
      width: 890px;
    }
  }
}
</style>
