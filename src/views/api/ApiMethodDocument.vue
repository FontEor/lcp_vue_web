<template>
  <div class="my-wrap my-pd">
    <div class="my-column">
      <el-tabs
        v-model="activeMethodName"
        :tab-position="tabPosition"
        class="my-tabs2"
        v-on:tab-click="this.onMethodChangeClick"
      >
        <el-tab-pane
          v-for="item in this.methodTabs"
          :key="item.id"
          :label="item.name"
          :name="item.name"
        >
          <div slot="label">
            <p class="doc-title">{{ item.cnName }}</p>
            <el-tooltip :disabled="true" effect="dark" placement="top">
              <p class="doc-title">
                <span>{{ item.name }}</span>
              </p>
            </el-tooltip>
          </div>
          <div>
            <h3 class="document-title">{{ item.name }}（{{ item.cnName }}）</h3>
            <p class="line-feed" style="margin-left: 0px; margin-bottom: 20px">
              {{ item.remark }}
            </p>
            <h4 class="document-sub-title">请求参数</h4>
            <el-table
              :data="inParamsTableData"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              class="my-table mb2"
              row-key="id"
              style="margin-bottom: 25px"
            >
              <el-table-column
                :show-tooltip-when-overflow="true"
                label="名称"
                min-width="22%"
                prop="name"
              >
              </el-table-column>
              <el-table-column
                :show-tooltip-when-overflow="true"
                label="类型"
                min-width="20%"
                prop="type"
              >
              </el-table-column>
              <el-table-column label="是否必选" min-width="15%" prop="required">
                <template slot-scope="scope">
                  <span>{{ scope.row.required === "1" ? "是" : "" }}</span>
                  <span>{{ scope.row.required === "0" ? "否" : "" }}</span>
                  <span>{{ scope.row.required === "2" ? "条件" : "" }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :show-tooltip-when-overflow="true"
                label="示例值"
                min-width="15%"
                prop="exampleValue"
              >
              </el-table-column>
              <el-table-column
                :show-tooltip-when-overflow="true"
                label="描述"
                min-width="28%"
                prop="remark"
              >
                <template slot-scope="scope">
                  <div
                    v-html="
                      formatTableColumnDescriptionInnerHtml(scope.row.remark)
                    "
                    class="wb-doc-title"
                  ></div>
                </template>
              </el-table-column>
            </el-table>
            <h4 class="document-sub-title">响应参数</h4>
            <el-table
              :data="outParamsTableData"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              class="my-table mb2"
              row-key="id"
              style="margin-bottom: 25px"
            >
              <el-table-column
                :show-tooltip-when-overflow="true"
                label="名称"
                min-width="22%"
                prop="name"
              >
              </el-table-column>
              <el-table-column
                :show-tooltip-when-overflow="true"
                label="类型"
                min-width="20%"
                prop="type"
              >
              </el-table-column>
              <!-- <el-table-column
                prop="required"
                label="是否必选"
                min-width="15%">
                <template slot-scope="scope">
                  <span>{{ scope.row.required === '' ? '是': '否' }}</span>
                </template>
              </el-table-column> -->
              <el-table-column
                :show-tooltip-when-overflow="true"
                label="示例值"
                min-width="15%"
                prop="exampleValue"
              >
              </el-table-column>
              <el-table-column
                :show-tooltip-when-overflow="true"
                label="描述"
                min-width="28%"
                prop="remark"
              >
                <template slot-scope="scope">
                  <div
                    v-html="
                      formatTableColumnDescriptionInnerHtml(scope.row.remark)
                    "
                    class="wb-doc-title"
                  ></div>
                  <!-- <p class="line-feed">{{ scope.row.remark }}</p> -->
                </template>
              </el-table-column>
            </el-table>

            <h4 class="document-sub-title">错误码</h4>
            <el-table
              :data="errorCodeTableData"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              class="my-table mb2"
              hideEmptyImg
              row-key="id"
              style="margin-bottom: 25px"
            >
              <el-table-column label="错误码" min-width="20%" prop="errorCode">
              </el-table-column>
              <el-table-column label="错误信息" prop="errorMsg">
                <template slot-scope="scope">
                  <p class="line-feed">{{ scope.row.errorMsg }}</p>
                </template>
              </el-table-column>
            </el-table>
            <h4 class="document-sub-title">API工具</h4>
            <el-row>
              <el-button
                v-if="thisEnv === 'uat' || thisEnv === 'prod'"
                disabled
                type="primary"
                >API测试
              </el-button>
              <el-button v-else type="primary" @click="gotoApiTest"
                >API测试
              </el-button>
              <el-alert
                v-if="thisEnv === 'uat' || thisEnv === 'prod'"
                :closable="false"
                style="margin-bottom: 20px; margin-top: 20px"
                title="生产环境API测试不可用，请移步测试环境（测试环境地址：http://test-lcp.jdl.com）"
                type="error"
              />
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import elDragDialog from "@/directive/el-drag-dialog";
import gwApiRequest from "@/utils/gwApiRequest.js";

export default {
  directives: { elDragDialog },
  props: {
    initialQualifiedName: {
      type: String,
      required: true,
    },
    initialMethodId: {
      type: [String, Number],
      required: true,
    },
    initialMethodName: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      thisEnv: window.env.baseEnv,
      tabPosition: "left",
      editableTabsValue: "2",
      methodTabs: [],
      activeMethodName: this.initialMethodName,
      activeMethodId: this.initialMethodId,
      inParamsTableData: [],
      outParamsTableData: [],
      errorCodeTableData: [],
      qualifiedName: this.initialQualifiedName,
      methodName: this.initialMethodName,
      cnName: this.$route.query.cnName,
      remark: this.$route.query.remark,
      dialogTableVisible: false,
      modal: false,
      apiInfo: {
        qualifiedName: "",
        cnName: "",
        remark: "",
      },
    };
  },
  methods: {
    formatTableColumnDescriptionInnerHtml(value) {
      value = value || "";
      value = value
        .split("\n")
        .map((item) =>
          item
            ? `<div>${item
                .replace(/\s/g, "&nbsp;")
                .replace(
                  /<a&nbsp;data-selection/g,
                  `<a style="color:#3c6ef0;" class="remark-anchor" target='__blank' href`
                )}</div>`
            : "<div><br></div>"
        )
        .join("");
      return value;
    },
    // 查询API文档
    async findApiBaseInfoRelease() {
      const url = "/ApiDepotService/findApiBaseInfoRelease";
      const { qualifiedName } = this.$route.query;
      const data = [{ qualifiedName }];
      return await gwApiRequest.post(url, JSON.stringify(data));
    },
    async queryApiMethodRelease() {
      const url = "/ApiDepotService/queryApiMethodRelease";
      const { qualifiedName } = this;
      const data = [{ qualifiedName }];
      return await gwApiRequest.post(url, JSON.stringify(data));
    },
    async findApiMethodRelease() {
      const url = "/ApiDepotService/findApiMethodRelease";
      const { activeMethodName } = this;
      const methodId =
        this.activeMethodId ||
        this.methodTabs.find((item) => item.name === activeMethodName).id;
      const data = [{ methodId }];
      return await gwApiRequest.post(url, JSON.stringify(data));
    },

    gotoApiTest() {
      let activeMethodName = "";
      for (const methodTab of this.methodTabs) {
        if (Number(methodTab.id) === Number(this.activeMethodId)) {
          activeMethodName = methodTab.name;
        }
      }
      if (activeMethodName) {
        window.open(
          window.location.origin +
            "#/apiTestMainPage?qualifiedName=" +
            this.qualifiedName +
            "&methodName=" +
            activeMethodName +
            "&methodId=" +
            this.activeMethodId +
            "&from=web",
          "_blank"
        );
      } else {
        Message.error("没有找到当前的方法");
      }
    },
    async fetchApiMethods() {
      const response = await this.queryApiMethodRelease().catch(() => {
        throw new Error("fetchApiMethods queryApiMethodRelease");
      });
      const { data } = response;
      this.methodTabs = data;
      this.activeMethodName = this.methodName;
      this.fetchApiMethodElements();
    },
    async getApiInfo() {
      const response = await this.findApiBaseInfoRelease().catch(() => {
        throw new Error("getApiInfo findApiBaseInfoRelease");
      });
      const { data } = response;
      this.apiInfo = data;
    },
    async fetchApiMethodElements() {
      const response = await this.findApiMethodRelease().catch(() => {
        throw new Error("fetchApiMethodElements findApiMethodRelease");
      });
      const { data } = response;
      if (data) {
        this.inParamsTableData =
          null === data.inParamList ? [] : data.inParamList;
        this.outParamsTableData =
          null === data.outParamList ? [] : data.outParamList;
        this.errorCodeTableData =
          null === data.errorCodeList ? [] : data.errorCodeList;
      }
    },

    onMethodChangeClick(object, event) {
      this.activeMethodId = object.$vnode.key;
      this.fetchApiMethodElements();
    },

    handleDrag() {
      this.$refs.select.blur();
    },
  },
  mounted() {
    this.getApiInfo();
    this.fetchApiMethods();
    console.log(this.$route.query);
    console.log(this.activeMethodId, this.activeMethodName);
  },
};
</script>

<style lang="scss" scoped>
.my-wrap {
  width: 1170px;
}
.line-feed {
  white-space: pre-wrap;
  word-break: break-all;
}
.wb-doc-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>>