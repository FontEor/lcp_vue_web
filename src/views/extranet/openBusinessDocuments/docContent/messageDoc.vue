<template>
  <div class="messageQuick">
    <el-container class="message-container">
      <el-main
        v-if="menuList.length > 0 || messageDocListLen > 0"
        class="main-view"
      >
        <TagTip class="tag-tip" :closable="false">
          {{ $t("docContent.messageDoc.5ivhevpfvk40")
          }}<a class="linked-doc" :href="computeAccessGuideDoc">{{
            $t("docContent.messageDoc.5ivhevpfwaw0")
          }}</a
          >{{ $t("docContent.messageDoc.5ivthyede9w0") }}
        </TagTip>
        <el-button
          @click="downBasicSdk()"
          style="position: absolute; top: 0; right: 0"
          type="primary"
          plain
          >{{ $t("docContent.5ivhevpfxdo1") }}</el-button
        >
        <div style="padding: 16px">
          <h2 class="tit">{{ messageName }} ({{ messageChineseName }})</h2>
          <p class="tip" style="white-space: pre-line">{{ messageDesc }}</p>
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
          <div class="action-con">
            <h3 class="action-tit">
              {{ $t("docContent.messageDoc.5ivhevpfwgs0") }}
            </h3>
            <el-table
              :data="inParamsTableData"
              row-key="id"
              :tree-props="{ children: 'children' }"
            >
              <el-table-column
                prop="name"
                :label="$t('docContent.messageDoc.5ivhevpfwko0')"
                min-width="22%"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="type"
                :label="$t('docContent.messageDoc.5ivhevpfwp00')"
                min-width="20%"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="{ row }">
                  {{ formatSpecialChar(row.type) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="required"
                :label="$t('docContent.messageDoc.5ivhevpfwsw0')"
                min-width="15%"
              >
                <template slot-scope="scope">
                  <span>{{
                    scope.row.required === 1
                      ? $t("docContent.messageDoc.5ivhevpfwwo0")
                      : ""
                  }}</span>
                  <span>{{
                    scope.row.required === 0
                      ? $t("docContent.messageDoc.5ivhevpfx080")
                      : ""
                  }}</span>
                  <span>{{
                    scope.row.required === "" || null || undefined ? "" : ""
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="exampleValue"
                :label="$t('docContent.messageDoc.5ivhevpfx3k0')"
                min-width="15%"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="descr"
                :label="$t('docContent.messageDoc.5ivhevpfx700')"
                min-width="28%"
              >
                <template #default="{ row, column: { property } }">
                  <div style="white-space: pre-line">{{ row[property] }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="action-con">
            <h3 class="action-tit">
              {{ $t("docContent.messageDoc.5ivhevpfxa80") }}
            </h3>
            <el-tabs v-model="messageActiveName">
              <el-tab-pane label="JSON" name="first">
                <div class="demo response-demo">
                  <pre>{{ messageDemo }}</pre>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <el-divider />
          <ScreenshotEvaluation
            :objId="docId"
            :docTypeMain="docTypeMain"
            :bizUnitId="unitId"
            :helpful.sync="helpful"
            :buttonLoading.sync="buttonLoading"
            :evaluationButtonDisabled.sync="evaluationButtonDisabled"
          />
        </div>
      </el-main>
      <aside
        class="aside-view-right"
        :class="{ 'aside-view-right-preview': isRoutePath }"
      >
        <ul class="aside-view-right__navList">
          <li
            v-for="(item, index) in navList"
            :key="index"
            class="aside-view-right__navItem"
            @click="selectNavItem(index)"
          >
            {{ item }}
          </li>
        </ul>
      </aside>
    </el-container>
    <BlackFooter v-if="!isRoutePath" />
  </div>
</template>

<script>
import TagTip from "@/components/common/TagTip.vue";
import BlackFooter from "@/components/extranet/Footer/blackFooter.vue";
import ScreenshotEvaluation from "@/components/extranet/screenshot-evaluation/index.vue";
import request from "@/utils/request";
import { getBizUnitMessages } from "@/api/business/message/biz-message.ts";
import { SappModule } from "@/store/common/modules/app";
import { downloadBaseSdk } from "@/api/business/sdk/baseSdk";

export default {
  components: { TagTip, BlackFooter, ScreenshotEvaluation },
  data() {
    return {
      loginDialogVisible: false,
      docClassification: this.$t("docContent.messageDoc.5ivhevpfxdo0"),
      showDocClassification: false,
      showMessage: true,
      unMatchDocId: 0,
      bizApis: [],
      bizMessages: [],
      unitId: parseInt(this.$route.params.unitId),
      docId: parseInt(this.$route.params.docId),
      docTypeMain: 2,
      updateTime: "",
      helpful: undefined,
      buttonLoading: false,
      evaluationButtonDisabled: false,

      activeName: "first",
      messageActiveName: "first",
      messagesWithUnits: [],
      messagesWithUnit: "",
      inParamsTableData: [],
      messageDemo: "",
      messageName: "",
      messageChineseName: "",
      messageDesc: "",
      messageId: 0,
      isClickNav: false,
      timerId: null,
      navList: [
        this.$t("docContent.messageDoc.5ivhevpfwgs0"),
        this.$t("docContent.messageDoc.5ivhevpfxa80"),
      ],
      menuList: [],
      messageFileName: "",
      docName: "",
      jssKey: "",
    };
  },
  computed: {
    isRoutePath() {
      return this.$route.path.split("/")[1] === "preview-docking-plan";
    },
    computeAccessGuideDoc() {
      const { unitId } = this.$route.params;
      let url = `${window.location.origin}/#/open-business-document/access-guide/${unitId}`;
      if (this.isRoutePath) {
        url = `${window.location.origin}/#/preview-docking-plan/access-guide/${unitId}`;
      }
      return url;
    },
    messageDocListLen() {
      return SappModule.messageDocListLen;
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
    async genMessageHtml() {
      let url = "/downDoc/genMessageHtml";
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
      // await this.genMessageHtml();
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
    // 替换消息报文中的转义字符用于表格数据展示
    formatSpecialChar(value) {
      const specialCharTable = {
        "&quot;": `"`,
        "&amp;": `&`,
        "&lt;": `<`,
        "&gt;": `>`,
        "&nbsp;": ` `,
      };
      const keyList = Object.keys(specialCharTable);
      const valueList = Object.values(specialCharTable);
      for (let i = 0; i < keyList.length; i++) {
        value = value.replaceAll(keyList[i], valueList[i]);
      }
      return value;
    },

    /**
     * 获取文档信息
     * fetchDocData  获取对接方案中消息详情信息
     */
    async fetchDocData() {
      let url = "/bizmsg/getMessageDetails";
      let method = "post";
      const { unitId, docId } = this.$route.params;
      const id = docId;
      const data = { unitId, id };
      if (this.isRoutePath) {
        url = "/bizview/getMessagePreDetails";
        method = "get";
        let params = {
          id: docId,
          approvalNumber: SappModule.approvalNumber,
        };
        return await request({
          url,
          method,
          params,
        });
      }
      return await request({
        url,
        method,
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    async handleDocData() {
      await this.fetchDocData()
        .then((response) => {
          if (response.data) {
            this.inParamsTableData = response.data.messagePropList
              ? response.data.messagePropList
              : [];
            this.messageDemo = response.data.messageDemo
              ? response.data.messageDemo
              : "";
            this.messageName = response.data.name ? response.data.name : "";
            this.messageChineseName = response.data.chineseName
              ? response.data.chineseName
              : "";
            this.updateTime = response.data.updateTime;
            this.messageDesc = response.data.descr ? response.data.descr : "";
            this.messageId = response.data.messageId ? response.data.id : 0;
            const elNavItemList = document.querySelectorAll(
              ".aside-view-right__navItem"
            );
            elNavItemList.forEach((item) => {
              item.classList.remove("active");
            });
            elNavItemList[0].classList.add("active");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getMenuList() {
      getBizUnitMessages(Number(this.unitId))
        .then((bizMessages) => {
          this.menuList = bizMessages;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //处理网关请求异常
    handleGatewayError(error) {
      console.log(error);
      this.$message.error(error.response.data.error_response.zh_desc);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToLightNavItem);
    this.scrollToLightNavItem();
    this.getMenuList();
    this.handleDocData();
    this.genMessageHtml();
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToLightNavItem);
  },
};
</script>

<style lang="scss" scoped>
.message-container {
  .main-view {
    margin-right: 12px;
    position: relative;
    background: #fff;
    width: calc(98vw - 218px - 290px);
    min-width: 692px;
    padding: 0;
    .tag-tip {
      display: flex;
      align-items: center;
      height: 44px;
      ::v-deep.tagTip__tag {
        margin-bottom: 0;
        border-radius: 0;
      }
      .linked-doc {
        color: #3c6ef0;
      }
    }

    .tit {
      font-size: 20px;
      color: #333;
      line-height: 30px;
    }

    .tip {
      padding-top: 5px;
      color: #666;
      font-size: 14px;
      line-height: 24px;
    }

    .update-time-evaluation {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .help-divider {
      margin: 8px 0;
    }

    .action-con {
      .action-tit {
        font-size: 16px;
        padding: 20px 12px;
        position: relative;

        &:before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          margin-top: -2px;
          width: 4px;
          height: 4px;
          background: #3c6ef0;
          border-radius: 50%;
        }
      }

      ::v-deep .el-tabs {
        margin-top: -10px;
      }

      .demo {
        border: 1px solid #eaeaea;
        border-radius: 4px;
        padding: 16px;
        height: 400px;
        overflow: scroll;

        &.response-demo {
          height: 280px;
        }
      }
    }
  }
  .aside-view-right {
    box-sizing: border-box;
    height: 0;
    position: -webkit-sticky;
    position: sticky;
    top: 120px;
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

.messageQuick {
  .message-container {
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
