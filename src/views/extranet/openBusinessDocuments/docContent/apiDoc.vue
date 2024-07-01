<template>
  <div class="api-quick-page">
    <section class="api-container">
      <main v-if="menuList.length > 0 || apiDocListLen > 0" class="main-view">
        <TagTip class="tag-tip" :closable="false">
          {{ $t("docContent.apiDoc.5ivgk3mu2480") }}
          <a class="linked-doc" :href="computeAccessGuideDoc">{{
            $t("docContent.apiDoc.5ivgk3mu2s00")
          }}</a>
          {{ $t("docContent.apiDoc.5ivgk3mu2w77") }}
        </TagTip>
        <el-button
          @click="downBasicSdk()"
          style="position: absolute; top: 0; right: 0"
          type="primary"
          plain
          >{{ $t("docContent.5ivhevpfxdo1") }}</el-button
        >
        <div class="main-view__content">
          <h2 class="tit">{{ methodCnTitle }} ({{ methodTitle }})</h2>
          <p class="tip">{{ methodDesc }}</p>
          <div
            v-if="!isRoutePath && callDirection === 1"
            class="debugging-tools"
          >
            <p>调试工具：</p>
            <el-button main size="mini" @click="onClickApiTestToolButton"
              >API测试工具</el-button
            >
          </div>
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
              {{ $t("docContent.apiDoc.5ivgk3mu2x00") }}
            </h3>
            <p v-if="callDirection === 2">
              {{ $t("docContent.apiDoc.5ivgk3mu30g0") }} →
              {{ $t("docContent.apiDoc.5ivgk3mu34w0") }}
            </p>
            <p v-else-if="callDirection === 1">
              {{ $t("docContent.apiDoc.5ivgk3mu34w0") }} →
              {{ $t("docContent.apiDoc.5ivgk3mu30g0") }}
            </p>
          </div>
          <div class="action-con">
            <h3 class="action-tit">
              {{ $t("docContent.apiDoc.5ivgk3mu38g0") }}
            </h3>
            <el-table :data="requestTableData" :hide-empty-img="true">
              <el-table-column
                prop="envName"
                :label="$t('docContent.apiDoc.5ivgk3mu3bo0')"
              ></el-table-column>
              <!-- <el-table-column prop="lopDn">
                <template slot="header">
                  <span>LOP-DN</span>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="对接方案编码，用于路由查找到目标API"
                    placement="top"
                  >
                    <i style="margin-left: 4px" class="el-icon-help-solid"></i>
                  </el-tooltip>
                </template>
              </el-table-column> -->
              <el-table-column
                prop="serverUrl"
                :label="$t('docContent.apiDoc.5ivgk3mu3f40')"
              >
                <template slot-scope="scope">
                  {{ formatServerUrl(scope.row.serverUrl) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="path"
                :label="$t('docContent.apiDoc.5ivgk3mu3ig0')"
              >
                <template slot-scope="scope">
                  {{ formatPathUrl(scope.row.path) }}
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="开发者可在【控制台-应用管理-对接方案-配置-回传接口列表】自定义接口的回调地址"
                    placement="top"
                  >
                    <i
                      v-if="callDirection === 2"
                      style="color: #999"
                      class="el-icon-info"
                    ></i>
                  </el-tooltip> </template
              ></el-table-column>
            </el-table>
          </div>
          <div class="action-con">
            <!-- 请求参数 -->
            <div class="action-wrap">
              <h3 class="action-tit">
                {{ $t("docContent.apiDoc.5ivgk3mu3lw0") }}
              </h3>
              <p>
                <el-link
                  class="action-open"
                  type="primary"
                  :underline="false"
                  v-show="rowExpansionBtnInfo.inParamsTableData === false"
                  @click="
                    handleRowExpansion(
                      'requestTable',
                      'inParamsTableData',
                      true
                    )
                  "
                  >全部展开</el-link
                >
                <el-link
                  type="primary"
                  :underline="false"
                  v-show="rowExpansionBtnInfo.inParamsTableData === true"
                  @click="
                    handleRowExpansion(
                      'requestTable',
                      'inParamsTableData',
                      false
                    )
                  "
                  >全部收起</el-link
                >
              </p>
            </div>
            <el-table
              :data="inParamsTableData"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              row-key="id"
              ref="requestTable"
            >
              <el-table-column
                prop="name"
                :label="$t('docContent.apiDoc.5ivgk3mu3p00')"
                min-width="22%"
                :show-tooltip-when-overflow="true"
              >
              </el-table-column>
              <el-table-column
                prop="logogramType"
                :label="$t('docContent.apiDoc.5ivgk3mu3sg0')"
                min-width="20%"
                :show-tooltip-when-overflow="true"
              >
              </el-table-column>
              <el-table-column
                prop="required"
                :label="$t('docContent.apiDoc.5ivgk3mu3vg0')"
                min-width="15%"
              >
                <template slot-scope="scope">
                  <span class="mark-red">{{
                    scope.row.required === "1"
                      ? $t("docContent.apiDoc.5ivgk3mu3yk0")
                      : ""
                  }}</span>
                  <span>{{
                    scope.row.required === "0"
                      ? $t("docContent.apiDoc.5ivgk3mu41s0")
                      : ""
                  }}</span>
                  <span>{{
                    scope.row.required === "2"
                      ? $t("docContent.apiDoc.5ivgk3mu41s1")
                      : ""
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="exampleValue"
                :label="$t('docContent.apiDoc.5ivgk3mu4500')"
                min-width="15%"
                :show-tooltip-when-overflow="true"
              >
              </el-table-column>
              <el-table-column
                prop="remark"
                :label="$t('docContent.apiDoc.5ivgk3mu4880')"
                min-width="28%"
              >
                <template #default="{ row, column: { property } }">
                  <div
                    v-html="formatTableColumnRemarkInnerHtml(row[property])"
                    class="cell__remark-wrapper"
                  ></div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="action-con">
            <div class="action-wrap">
              <h3 class="action-tit">
                <!-- 响应参数 -->
                {{ $t("docContent.apiDoc.5ivgk3mu4bo0") }}
              </h3>
              <p>
                <el-link
                  class="action-open"
                  type="primary"
                  :underline="false"
                  v-show="rowExpansionBtnInfo.outParamsTableData === false"
                  @click="
                    handleRowExpansion(
                      'responseTable',
                      'outParamsTableData',
                      true
                    )
                  "
                  >全部展开</el-link
                >
                <el-link
                  type="primary"
                  :underline="false"
                  v-show="rowExpansionBtnInfo.outParamsTableData === true"
                  @click="
                    handleRowExpansion(
                      'responseTable',
                      'outParamsTableData',
                      false
                    )
                  "
                  >全部收起</el-link
                >
              </p>
            </div>
            <el-table
              :data="outParamsTableData"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              row-key="id"
              ref="responseTable"
            >
              <el-table-column
                prop="name"
                :label="$t('docContent.apiDoc.5ivgk3mu3p00')"
                min-width="22%"
                :show-tooltip-when-overflow="true"
              >
              </el-table-column>
              <el-table-column
                prop="logogramType"
                :label="$t('docContent.apiDoc.5ivgk3mu3sg0')"
                min-width="20%"
                :show-tooltip-when-overflow="true"
              >
              </el-table-column>
              <el-table-column
                prop="exampleValue"
                :label="$t('docContent.apiDoc.5ivgk3mu4500')"
                min-width="15%"
                :show-tooltip-when-overflow="true"
              >
              </el-table-column>
              <el-table-column
                :label="$t('docContent.apiDoc.5ivgk3mu4880')"
                prop="remark"
                min-width="28%"
              >
                <template #default="{ row, column: { property } }">
                  <div
                    v-html="formatTableColumnRemarkInnerHtml(row[property])"
                    class="cell__remark-wrapper"
                  ></div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="action-con">
            <h3 class="action-tit">
              <!-- 请求报文示例 -->
              {{ $t("docContent.apiDoc.5ivgk3mu4ew0") }}
            </h3>
            <RadioTags
              :dynTabList.sync="useRequestTableList"
              :currentTabName.sync="activeRequestTagName"
            ></RadioTags>
            <div class="code-wrapper">
              <codemirror
                class="codemirror__request"
                :value="requestDemo"
                :options="cmOptions"
                @changes="changeCode($event.doc.size, 'codemirror__request')"
              />
              <el-button
                class="copy-button"
                type="text"
                @click="doCopy(requestDemo)"
                >{{ $t("docContent.apiDoc.5ivgk3mu4i80") }}</el-button
              >
            </div>
          </div>
          <div class="action-con">
            <h3 class="action-tit">
              <!-- 响应报文示例 -->
              {{ $t("docContent.apiDoc.5ivgk3mu4mo0") }}
            </h3>
            <RadioTags
              :dynTabList.sync="useResponseTabList"
              :currentTabName.sync="activeResponseTagName"
            ></RadioTags>
            <div class="code-wrapper">
              <codemirror
                class="codemirror__response"
                :value="responseDemo"
                :options="cmOptions"
                @changes="changeCode($event.doc.size, 'codemirror__response')"
              />
              <el-button
                class="copy-button"
                type="text"
                @click="doCopy(responseDemo)"
                >{{ $t("docContent.apiDoc.5ivgk3mu4i80") }}</el-button
              >
            </div>
          </div>
          <div
            class="action-con"
            v-if="exceptionDemo != '' && exceptionDemo != null"
          >
            <h3 class="action-tit">
              {{ $t("docContent.apiDoc.5ivgk3mu4mo1") }}
            </h3>
            <div class="code-wrapper">
              <codemirror
                class="codemirror__response"
                :value.sync="exceptionDemo"
                :options="cmOptions"
                @changes="changeCode($event.doc.size, 'codemirror__response')"
              />
              <el-button
                class="copy-button"
                type="text"
                @click="doCopy(exceptionDemo)"
                >{{ $t("docContent.apiDoc.5ivgk3mu4i80") }}</el-button
              >
            </div>
          </div>
          <div class="action-con">
            <h3 class="action-tit">
              {{ $t("docContent.apiDoc.5ivgk3mu4pg0") }}
            </h3>
            <el-table
              :data="errorCodeTableData"
              row-key="id"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              :hide-empty-img="true"
            >
              <el-table-column
                prop="errorCode"
                :label="$t('docContent.apiDoc.5ivgk3mu4ss0')"
                width="150"
              >
              </el-table-column>
              <el-table-column
                prop="errorMsg"
                :label="$t('docContent.apiDoc.5ivgk3mu4vg0')"
                :show-tooltip-when-overflow="true"
              >
              </el-table-column>
              <el-table-column
                prop="prescription"
                :label="$t('docContent.apiDoc.5ivgk3mu4vg1')"
              >
              </el-table-column>
            </el-table>
            <p class="document-tip">
              {{ $t("docContent.apiDoc.5ivgk3mu4y80")
              }}<a
                class="document-tip__achor"
                :href="`//cloud.jdl.com/#/devSupport/53215`"
                target="_blank"
                >{{ $t("docContent.apiDoc.5ivgk3mu50w0") }}</a
              >
            </p>
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
      </main>
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
            <span v-if="!(isRoutePath && item === '调试工具')">
              {{ item }}
            </span>
          </li>
        </ul>
      </aside>
    </section>
    <BlackFooter v-if="!isRoutePath" />
  </div>
</template>

<script>
import TagTip from "@/components/common/TagTip.vue";
import BlackFooter from "@/components/extranet/Footer/blackFooter.vue";
import ScreenshotEvaluation from "@/components/extranet/screenshot-evaluation/index.vue";
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
// language
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/php/php.js";
import "codemirror/mode/shell/shell.js";
// theme css
import "codemirror/theme/ttcn.css";
// require active-line.js
import "codemirror/addon/selection/active-line.js";
// closebrackets
import "codemirror/addon/edit/closebrackets.js";
// foldGutter
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/xml-fold.js";

import request from "@/utils/request";

import { downloadBizSdk } from "@/api/business/sdk/biz-sdk.ts";
import { getBizUnitApis } from "@/api/business/api/biz-api";
import { getBaseSdkList } from "@/api/business/sdk/baseSdk";
import { downloadBaseSdk } from "@/api/business/sdk/baseSdk";

import RadioTags from "@/views/extranet/openBusinessDocuments/components/RadioTags.vue";

import { SappModule } from "@/store/common/modules/app";

export default {
  name: "ApiDoc",
  components: {
    TagTip,
    BlackFooter,
    codemirror,
    RadioTags,
    ScreenshotEvaluation,
  },
  data() {
    return {
      navList: [
        this.$t("docContent.apiDoc.5ivgk3mu2x00"),
        this.$t("docContent.apiDoc.5ivgk3mu38g0"),
        // "URL参数",
        this.$t("docContent.apiDoc.5ivgk3mu3lw0"),
        this.$t("docContent.apiDoc.5ivgk3mu4bo0"),
        this.$t("docContent.apiDoc.5ivgk3mu4ew0"),
        this.$t("docContent.apiDoc.5ivgk3mu4mo0"),
        // "请求示例",
        this.$t("docContent.apiDoc.5ivgk3mu4pg0"),
        // this.$t("docContent.apiDoc.5ivgk3mu4pg1"),
      ],
      cmOptions: {
        mode: "text/javascript",
        readOnly: true,
        autoCloseBrackets: true,
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        theme: "ttcn",
        lineWrapping: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      },
      docClassification: this.$t("docContent.apiDoc.5ivgk3mu53o0"),
      showDocClassification: false,
      showMessage: true,
      unMatchDocId: 0,
      bizApis: [],
      bizMessages: [],
      unitId: parseInt(this.$route.params.unitId),
      docId: parseInt(this.$route.params.docId),
      docTypeMain: 1,
      updateTime: "",
      helpful: undefined,
      buttonLoading: false,
      evaluationButtonDisabled: false,

      activeName: "first",
      methodsWithUnits: [],
      methodsWithUnit: "",
      apiLopDN: "",
      bizUnitType: "",
      publicParamsTableData: [
        {
          name: "LOP-DN",
          type: "String",
          required: this.$t("docContent.apiDoc.5ivgk3mu3yk0"),
          remark: this.apiLopDN,
        },
        {
          name: "access_token",
          type: "String",
          required: this.$t("docContent.apiDoc.5ivgk3mu3yk0"),
          remark: this.$t("docContent.apiDoc.5ivgk3mu5680"),
        },
        {
          name: "app_key",
          type: "String",
          required: this.$t("docContent.apiDoc.5ivgk3mu3yk0"),
          remark: this.$t("docContent.apiDoc.5ivgk3mu58o0"),
        },
        {
          name: "sign",
          type: "String",
          required: this.$t("docContent.apiDoc.5ivgk3mu3yk0"),
          remark: this.$t("docContent.apiDoc.5ivgk3mu5bc0"),
        },
        {
          name: "timestamp",
          type: "String",
          required: this.$t("docContent.apiDoc.5ivgk3mu3yk0"),
          remark: this.$t("docContent.apiDoc.5ivgk3zx8h42"),
        },
        {
          name: "v",
          type: "String",
          required: this.$t("docContent.apiDoc.5ivgk3mu3yk0"),
          remark: this.$t("docContent.apiDoc.5ivgk12kl902"),
        },
        {
          name: "algorithm",
          type: "String",
          required: this.$t("docContent.apiDoc.5ivgk3mu3yk0"),
          remark: this.$t("docContent.apiDoc.5ivgk3mu5e00"),
        },
      ],
      paramsTableMaxHeight: 400,
      inParamsTableData: [],
      outParamsTableData: [],
      errorCodeTableData: [],
      requestTableData: [],
      invokeDemoData: [],
      // requestDemo: "",
      requestTabList: [
        // {
        //   tag: '可调用示例',
        //   content: ""
        // },
        // {
        //   tag: '全结构示例',
        //   content: ""
        // }
      ],
      activeRequestTagName: "",
      // responseDemo: "",
      responseTabList: [
        // {
        //   tag: '可调用示例',
        // },
        // {
        //   tag: '全结构示例',
        //   tooltipInfo: {
        //     content: '用于展示报文的全量结构，请勿当做API调用示例使用'
        //   }
        // }
      ],
      activeResponseTagName: "",
      exceptionDemo: "",
      methodTitle: "",
      methodCnTitle: "",
      methodDesc: "",
      interfaceName: "",
      interfaceMethod: "",
      methodId: 0,
      apiUrl: "",
      isClickNav: false,
      timerId: null,
      bizSdkJavaJssKey: "",
      bizSdkNetJssKey: "",
      bizSdkPhpJssKey: "",
      loginDialogVisible: false,
      menuList: [],
      callDirection: null,
      rowExpansionBtnInfo: {
        inParamsTableData: true,
        outParamsTableData: true,
      },
      jssKey: "",
      docName: "",
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
    formatUpdateTimeText() {
      const { updateTime } = this;
      return updateTime
        ? `更新时间：${this.$dayjs(updateTime).format("YYYY-MM-DD HH:mm:ss")}`
        : "";
    },
    requestDemo() {
      if (+this.callDirection === 1) {
        // 外调内
        return (this.requestTabList.find(
          (item) => item.tag === this.activeRequestTagName
        ) || { content: "" })["content"];
      } else {
        // 内调外
        const requestDemoFirst = (this.requestTabList || [])[0] || {};
        return requestDemoFirst["content"] || "";
      }
    },
    responseDemo() {
      if (+this.callDirection === 1) {
        return (this.responseTabList.find(
          (item) => item.tag === this.activeResponseTagName
        ) || { content: "" })["content"];
      } else {
        const responseDemoFirst = (this.responseTabList || [])[0] || {};
        return responseDemoFirst["content"] || "";
      }
    },
    useRequestTableList: {
      get() {
        if (+this.callDirection === 1) {
          const [firstRequestTag] = this.requestTabList || [];
          const length = this.requestTabList.length;
          if (
            length === 1 &&
            firstRequestTag &&
            firstRequestTag.tag === "模板示例"
          ) {
            return [];
          } else {
            return this.requestTabList;
          }
        }
        return [];
        // return (+this.callDirection === 1 && this.requestTabList) || [];
      },
      set(newList) {
        this.requestTabList = newList;
      },
    },
    useResponseTabList: {
      get() {
        if (+this.callDirection === 1) {
          const [firstResponseTag] = this.responseTabList || [];
          const length = this.responseTabList.length;
          if (
            length === 1 &&
            firstResponseTag &&
            firstResponseTag.tag === "模板示例"
          ) {
            return [];
          } else {
            return this.responseTabList;
          }
        }
        return [];
        // return (+this.callDirection === 1 && this.responseTabList) || []
      },
      set(newList) {
        this.responseTabList = newList;
      },
    },
    apiDocListLen() {
      return SappModule.apiDocListLen;
    },
  },
  methods: {
    //获取下载的文件名称
    async genApiHtml() {
      let url = "/downDoc/genApiHtml";
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
      // await this.genApiHtml();
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
    handleRowExpansion(dom, listName, flag) {
      this.rowExpansionBtnInfo[listName] = flag;
      this.toggleRowExpansionAll(dom, this[listName], flag);
    },
    toggleRowExpansionAll(dom, dataList, flag) {
      const domRef = this.$refs[dom];
      (dataList || []).forEach((item) => {
        domRef.toggleRowExpansion(item, flag);
        if (Array.isArray(item.children)) {
          this.toggleRowExpansionAll(dom, item.children || [], flag);
        }
      });
    },

    formatTableColumnRemarkInnerHtml(value) {
      value = value
        .split("\n")
        .map((item) =>
          item
            ? `<div>${item
                .replace(/\s/g, "&nbsp;")
                .replace(
                  /<a&nbsp;data-selection/g,
                  `<a class="remark-anchor" target='__blank' href`
                )}</div>`
            : "<div><br></div>"
        )
        .join("");
      return value;
    },
    onClickApiTestToolButton() {
      const { unitId } = this.$route.params;
      const { methodTitle: apiCode, docId: docId } = this;
      const toolName = "api-test";
      document.querySelector(".aside-container").style.width = "150px";
      sessionStorage.setItem(`/${unitId}/api-test?api-code`, apiCode || "");
      this.$router.push({
        name: "CommonDevelopmentToolsDetail",
        params: { unitId, toolName ,docId},
      });
    },
    formatServerUrl(serverUrl) {
      const serverUrlMap = [
        "",
        serverUrl,
        this.$t("docContent.apiDoc.5ivgk3mu5gk0"),
      ];
      return serverUrlMap[this.callDirection];
    },
    formatPathUrl(path) {
      const serverPathMap = [
        "",
        path,
        this.$t("docContent.apiDoc.5ivgk3mu5gk0"),
      ];
      return serverPathMap[this.callDirection];
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
    async getBaseSdkList() {
      const data = await getBaseSdkList().catch((error) => {
        throw new Error("getBaseSdkList");
      });
      data.forEach((item) => {
        if (item.language === 1) {
          downloadBaseSdk(item.jssKey, item.fileName);
        }
      });
    },
    async basicDownloadSDK() {
      await this.getBaseSdkList();
    },
    async downloadSDK(languageOrJssKey) {
      const languageToJssKeyTable = {
        java: "lop-opensdk-support.jar",
        php: "lop-opensdk-php.zip",
      };
      const jssKey = Object.keys(languageToJssKeyTable).includes(
        languageOrJssKey
      )
        ? languageToJssKeyTable[languageOrJssKey]
        : languageOrJssKey;
      jssKey ? downloadBizSdk(jssKey) : this.$message.warning("SDK不存在！");
    },
    doCopy(data) {
      this.$copyText(data).then(
        () => {
          this.$message.success(this.$t("docContent.apiDoc.5ivgk3mu5j00"));
        },
        () => {
          this.$message.warning(this.$t("docContent.apiDoc.5ivgk3mu5lg0"));
        }
      );
    },
    // 实现CodeMirror代码块max-height为400px
    changeCode(size, parentClass) {
      const elCodeMirror = document.querySelector(
        `.${parentClass} .CodeMirror`
      );
      size > 18
        ? elCodeMirror.setAttribute("style", "height: 400px;")
        : elCodeMirror.setAttribute("style", "height: auto;");
    },
    // --获取文档信息
    async getBizUnitApiDetails() {
      let url = "/bizapinterface/getBizUnitApiDetails";
      let params = {
        id: this.$route.params.docId,
      };
      if (this.isRoutePath) {
        url = "/bizview/getBizUnitApiDetails";
        params = {
          id: this.$route.params.docId,
          approvalNumber: SappModule.approvalNumber,
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
    async fetchDoc() {
      await this.getBizUnitApiDetails()
        .then((resp) => {
          if (resp && resp.data) {
            this.callDirection = resp.data.callDirection;
            if (resp.data.bizSdkList && resp.data.bizSdkList.length > 0) {
              resp.data.bizSdkList.forEach((item) => {
                if (item.language === 1) {
                  this.bizSdkJavaJssKey = item.jssKey;
                } else if (item.language === 2) {
                  this.bizSdkNetJssKey = item.jssKey;
                } else if (item.language === 3) {
                  this.bizSdkPhpJssKey = item.jssKey;
                }
              });
            }
            this.inParamsTableData = resp.data.inParams
              ? resp.data.inParams
              : [];

            this.outParamsTableData = resp.data.outParams
              ? resp.data.outParams
              : [];
            this.errorCodeTableData = resp.data.errorCodes
              ? resp.data.errorCodes
              : [];
            this.invokeDemoData = resp.data.invokeDemoList
              ? resp.data.invokeDemoList
              : [];

            // this.requestDemo = resp.data.requestDemo
            //   ? resp.data.requestDemo
            //   : "";
            // this.responseDemo = resp.data.reponseDemo
            //   ? resp.data.reponseDemo
            //   : "";
            // this.exceptionDemo = resp.data.exceptionDemo
            //   ? resp.data.exceptionDemo
            //   : "";

            this.requestTabList = (resp.data.requestDemo || []).map((item) => {
              if (item.tag === "模板示例") {
                item.tooltipInfo = {
                  content: "用于展示报文的全量结构，请勿当做API调用示例使用。",
                };
              }
              return item;
            });
            this.activeRequestTagName = (this.requestTabList[0] || { tag: "" })[
              "tag"
            ];
            this.responseTabList = (resp.data.reponseDemo || []).map((item) => {
              if (item.tag === "模板示例") {
                item.tooltipInfo = {
                  content: "用于展示报文的全量结构，请勿当做API调用示例使用。",
                };
              }
              return item;
            });
            this.activeResponseTagName = (this.responseTabList[0] || {
              tag: "",
            })["tag"];
            this.exceptionDemo = ((resp.data.exceptionDemo || [])[0] || {
              content: "",
            })["content"];

            this.methodTitle = resp.data.apiCode ? resp.data.apiCode : "";
            this.methodCnTitle = resp.data.apiName ? resp.data.apiName : "";
            this.methodDesc = resp.data.apiRemark ? resp.data.apiRemark : "";
            this.interfaceName = resp.data.interfaceName
              ? resp.data.interfaceName
              : "";
            this.interfaceMethod = resp.data.interfaceMethod
              ? resp.data.interfaceMethod
              : "";
            this.methodId = resp.data.methodId ? resp.data.methodId : 0;
            this.apiLopDN = resp.data.apiLopDN ? resp.data.apiLopDN : "";
            this.bizUnitType = resp.data.bizUnitType;
            this.updateTime = resp.data.updateTime;
            this.$nextTick(() => {
              this.handleRowExpansion(
                "requestTable",
                "inParamsTableData",
                true
              );
              this.handleRowExpansion(
                "responseTable",
                "outParamsTableData",
                true
              );
            });

            if (this.apiLopDN) {
              this.publicParamsTableData[0].remark = this.apiLopDN;
            }
            this.requestTableData = [];
            if (
              resp.data.gateWayUrlDtoList &&
              resp.data.gateWayUrlDtoList.length > 0
            ) {
              this.requestTableData = resp.data.gateWayUrlDtoList.map(
                (item) => {
                  const { envName, url, lopDn } = item;
                  const serverUrl = [url.split("/")[0], url.split("/")[2]].join(
                    "//"
                  );
                  const path = url.split(serverUrl)[1];
                  return { envName, serverUrl, path, lopDn };
                }
              );
            }
            this.apiUrl = resp.data.apiUrl ? resp.data.apiUrl : "";
            if (this.bizUnitType === 4) {
              //合作伙伴类型不显示access_token行
              this.publicParamsTableData.splice(1, 1);
              const timestampData = {
                name: "timestamp",
                type: "String",
                required: this.$t("docContent.apiDoc.5ivgk3mu3yk0"),
                remark:
                  "调用时的系统时间（注意：一定要用GMT的时间，例如：Tue, 16 Jan 2018 08:56:59 GMT）",
              };
              this.publicParamsTableData.splice(3, 1, timestampData);
            } else {
              //不是合作伙伴类型不显示algorithm行
              this.publicParamsTableData.splice(6, 1);
            }
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

    //处理网关请求异常
    handleGatewayError(error) {
      console.log(error);
      this.$message.error(error.response.data.error_response.zh_desc);
    },
    async getMenuList() {
      if (!this.isRoutePath) {
        await getBizUnitApis(Number(this.unitId))
          .then((bizApis) => {
            this.menuList = bizApis;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  // created() {
  //   const diffHeight = parseInt((document.body.offsetHeight - 120) * 0.9);
  //   this.paramsTableMaxHeight = diffHeight < 400 ? 400 : diffHeight;
  // },
  created() {},
  mounted() {
    window.addEventListener("scroll", this.scrollToLightNavItem);
    this.scrollToLightNavItem();
    this.getMenuList();
    this.fetchDoc();
    this.genApiHtml();
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToLightNavItem);
  },
};
</script>

<style lang="scss" scoped>
.api-quick-page {
  .api-container {
    display: flex;
    justify-content: space-between;
    min-height: calc(100vh - 200px);

    .main-view {
      position: relative;
      box-sizing: border-box;
      width: calc(98vw - 218px - 290px);
      min-width: 692px;
      background: #fff;

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
      .main-view__content {
        padding: 16px;
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
          white-space: pre-wrap;
        }

        .debugging-tools {
          margin-top: 16px;
          display: flex;
          align-items: center;
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
          .cell__remark-wrapper {
            white-space: pre-line;

            ::v-deep .remark-anchor {
              color: #3c6ef0;
            }
          }

          .mark-red {
            color: red;
          }
          .code-wrapper {
            border: 1px solid #eee;
            border-radius: 4px;
            padding: 24px 8px 8px 8px;
            position: relative;
            &.demo {
              padding: 8px;
            }
            .codemirror__request,
            .codemirror__response {
              ::v-deep .CodeMirror {
                height: auto;
              }
            }
            .codemirror__request-demo {
              ::v-deep .CodeMirror {
                height: 400px;
              }
            }
            .copy-button {
              position: absolute;
              top: -4px;
              right: 8px;
            }
          }

          .document-tip {
            margin: 20px auto;
            padding: 8px 16px;
            border-radius: 4px;
            background: #ecf1fe;
            color: #666;
            .document-tip__achor {
              color: #3c6ef0;
            }
          }
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
        }
      }
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

  .black-footer {
    position: relative;

    ::v-deep .black-footer-license-content {
      width: 890px;
    }
  }
}
.action-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  // .action-open {
  //   border-right: 1px solid rgb(219, 223, 226);
  //   padding-right: 6px;
  //   margin-right: 6px;
  // }
}
</style>
