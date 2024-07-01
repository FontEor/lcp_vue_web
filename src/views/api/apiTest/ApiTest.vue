<template>
  <div class="my-wrap my-pd">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="my-breadcrumb mb2"
    >
      <el-breadcrumb-item :to="{ path: '/apiStore' }"
        >API仓库</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="apiMethodListUrl">API详情</el-breadcrumb-item>
      <el-breadcrumb-item>API测试</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="my-column">
      <h3 class="my-column-title">
        API测试
        <span class="apiTest-online-alert" v-if="uatOrProd"
          >(当前处理的是线上接口，请谨慎操作！)</span
        >
      </h3>

      <el-row :gutter="30">
        <el-col :span="12">
          <h4 class="document-sub-title">公共参数</h4>
          <el-row class="mb2">
            <el-form
              ref="normalParams"
              :model="normalParams"
              label-width="70px"
            >
              <el-form-item label="API名称">
                <el-input
                  v-model="normalParams.qualifiedName"
                  readonly
                ></el-input>
              </el-form-item>
              <el-form-item label="方法">
                <el-select
                  v-model="normalParams.methodName"
                  placeholder="请选择方法"
                  @change="methodSelectChange"
                >
                  <el-option
                    v-for="item in callMethods"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="App">
                <el-select
                  v-model="normalParams.applyId"
                  placeholder="请选择App"
                  @change="appSelectChange"
                >
                  <el-option
                    v-for="item in callMethodApps"
                    :key="item.id"
                    :label="item.appName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Alias">
                <el-select
                  v-model="normalParams.alias"
                  placeholder="请选择别名"
                >
                  <el-option
                    v-for="item in callMethodAlias"
                    :key="item.alias"
                    :label="item.alias"
                    :value="item.alias"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-row>

          <h4 class="document-sub-title">
            请求参数
            <span>
              <div style="float: right">
                <el-button
                  type="text"
                  v-if="requestJsonEdit === true"
                  v-on:click="onJsonEditChange(false)"
                >
                  配置模式
                  <i class="el-icon-setting el-icon--right" />
                </el-button>
              </div>
            </span>
          </h4>
          <el-row class="mb2">
            <div id="requestJsonCodeDiv" style="display: none">
              <el-input
                id="requestJsonCodeText"
                type="textarea"
                :rows="10"
                resize="none"
                placeholder="请输入请求体JSON字符串信息"
                style="border: solid 1px; border-color: #d9d9d9"
              />
            </div>
            <el-table
              :data="tableData2"
              class="my-table my-table2 my-table-expand"
              style="margin-bottom: 25px"
              row-key="id"
              default-expand-all
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              id="requestObjectTable"
            >
              <el-table-column
                prop="name"
                label="参数名称"
                min-width="40%"
                :show-tooltip-when-overflow="true"
              >
                <template slot-scope="scope">
                  <em v-if="scope.row.required === '1'" class="required">*</em
                  >{{ scope.row.name }}
                  <span style="color: #3c6ef0"
                    ><el-tooltip
                      class="item"
                      effect="dark"
                      :content="scope.row.remark"
                      placement="top"
                      ><i class="el-icon-warning-outline"></i></el-tooltip
                  ></span>
                </template>
              </el-table-column>
              <el-table-column prop="obj_type" label="参数" min-width="60%">
                <template slot-scope="scope">
                  <el-input
                    v-if="scope.row.type == 'Single'"
                    :placeholder="scope.row.web_show_type"
                    v-model.trim="scope.row.value"
                  >
                    <template v-if="scope.row.canDelete == '0'" slot="append">
                      <el-button
                        type="primary"
                        icon="el-icon-delete"
                        style="color: red"
                        @click="deleteListRow(scope.row.id)"
                        >删除
                      </el-button>
                    </template>
                  </el-input>

                  <el-input
                    v-if="
                      scope.row.type == 'Obj' ||
                      scope.row.type == 'MapKeyValuePair'
                    "
                    :placeholder="scope.row.web_show_type"
                    disabled
                  >
                    <template v-if="scope.row.canDelete == '0'" slot="append">
                      <el-button
                        type="primary"
                        icon="el-icon-delete"
                        style="color: red"
                        @click="deleteListRow(scope.row.id)"
                        >删除
                      </el-button>
                    </template>
                  </el-input>

                  <el-input
                    v-if="
                      scope.row.type == 'List' ||
                      scope.row.type == 'Set' ||
                      scope.row.type == 'Array'
                    "
                    :placeholder="scope.row.web_show_type"
                    disabled
                  >
                    <template slot="append">
                      <el-button
                        type="primary"
                        icon="el-icon-plus"
                        style="color: #409eff"
                        @click="addListRow(scope.row)"
                        >添加
                      </el-button>
                    </template>
                  </el-input>

                  <el-input
                    v-if="scope.row.type == 'Map'"
                    :placeholder="scope.row.web_show_type"
                    disabled
                  >
                    <template slot="append">
                      <el-button
                        type="primary"
                        icon="el-icon-plus"
                        style="color: #409eff"
                        @click="addListRow(scope.row)"
                        >添加
                      </el-button>
                    </template>
                  </el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row class="mb2">
            <el-button
              type="primary"
              :clstag="clstag('apiTest_1597821330663|1', '')"
              :loading="debugging"
              @click="submitTest"
              >{{ debugging ? "测试中" : "提交测试" }}
            </el-button>
          </el-row>
        </el-col>
        <el-col :span="11">
          <h4 class="document-sub-title" v-if="requestJson != null">
            请求参数<span style="font-size: 12px; color: dodgerblue">
              (操作提示：点击'['，']'，'{'，'}'符号标记可进行折叠/展开操作)</span
            >
          </h4>
          <h4 class="document-sub-title" v-else>请求参数</h4>
          <el-row class="mb2" style="margin-bottom: 25px">
            <div
              v-if="requestJson != null"
              style="border: solid 1px; border-color: #d9d9d9"
            >
              <codemirror
                v-if="requestJson"
                :value.sync="requestJson"
                :options="cmOptions"
              />
            </div>
            <div
              v-else
              style="border: solid 1px; border-color: #d9d9d9; height: 230px"
            ></div>
          </el-row>
          <h4 class="document-sub-title" v-if="responseJson != null">
            返回值<span style="font-size: 12px; color: dodgerblue">
              (操作提示：点击'['，']'，'{'，'}'符号标记可进行折叠/展开操作)</span
            >
          </h4>
          <h4 class="document-sub-title" v-else>返回值</h4>
          <el-row class="mb2">
            <div
              v-if="responseJson != null"
              style="border: solid 1px; border-color: #d9d9d9"
            >
              <codemirror
                v-if="responseJson"
                :value.sync="responseJson"
                :options="cmOptions"
              />
            </div>
            <div
              v-else
              style="border: solid 1px; border-color: #d9d9d9; height: 230px"
            ></div>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script>
import _ from "lodash";
import { Message } from "@lui/lui-ui";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
require("script-loader!jsonlint");
import gwApiRequest from "@/utils/gwApiRequest.js";
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
import point from "@/mixins/point";

export default {
  name: "ApiTest",
  components: {
    codemirror,
  },
  mixins: [point],
  data() {
    return {
      cmOptions: {
        mode: {
          name: "javascript",
          json: true,
        },
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
      env: "",
      callMethodApps: [],
      callMethodAlias: [
        {
          name: "name12",
        },
        {
          name: "name13",
        },
      ],
      callMethods: [],
      formLabelPosition: "left",
      normalParams: {
        qualifiedName: this.$route.query.qualifiedName,
        methodName: this.$route.query.methodName,
        applyId: "",
        alias: "",
      },
      from: this.$route.query.from,
      apiMethodListUrl:
        "/apiMethodList?qualifiedName=" + this.$route.query.qualifiedName,
      f1: "",
      f2: "",
      maxId: 100,
      uatOrProd: window.env.baseEnv === "uat" || window.env.baseEnv === "prod",
      backTo:
        "/apiMethodDocument?id=" +
        this.$route.query.methodId +
        "&methodName=" +
        this.$route.query.methodName +
        "&qualifiedName=" +
        this.$route.query.qualifiedName,
      tableData2: [],
      methodParamTypeList: [],
      responseJson: null,
      requestJson: null,
      requestJsonEdit: false,
      jsonEditor: null,
      requestJsonCode: null,
      //--加载状态指示器
      debugging: false,
      // owner
      owner: false,
    };
  },
  methods: {
    async queryApiMethodRelease() {
      const url = "/ApiDepotService/queryApiMethodRelease";
      const { qualifiedName } = this.$route.query;
      const data = [{ qualifiedName }];
      return await gwApiRequest.post(url, JSON.stringify(data));
    },
    async findMethodDetailsForWeb() {
      const url = "/ApiTestToolService/findMethodDetailsForWeb";
      const { qualifiedName } = this.$route.query;
      const { methodName } = this.normalParams;
      const { from } = this;
      const data = [{ qualifiedName, methodName, from }];
      return await gwApiRequest.post(url, JSON.stringify(data));
    },
    async queryAppCanCallAlias(applyId) {
      const url = "/ApiTestToolService/queryAppCanCallAlias";
      const { qualifiedName } = this.$route.query;
      const data = [{ qualifiedName, applyId }];
      return await gwApiRequest.post(url, JSON.stringify(data));
    },
    async queryCanCallApp() {
      const url = "/ApiTestToolService/queryCanCallApp";
      const { qualifiedName } = this.$route.query;
      const data = [{ qualifiedName }];
      return await gwApiRequest.post(url, JSON.stringify(data));
    },
    async doApiTest() {
      const url = "/ApiTestToolService/doApiTest";
      const params = this.f1;
      const interfaceName = this.normalParams.qualifiedName;
      const { methodName } = this.normalParams;
      const { methodParamTypeList, from } = this;
      const baseInfo = JSON.stringify(this.normalParams);
      const data = [
        {
          params,
          interfaceName,
          methodName,
          methodParamTypeList,
          from,
          baseInfo,
        },
      ];
      return await gwApiRequest.post(url, JSON.stringify(data));
    },
    async findJsfApiTestFormatData() {
      const url = "/ApiTestToolService/findJsfApiTestFormatData";
      const params = this.tableData2;
      const data = [{ params }];
      return await gwApiRequest.post(url, JSON.stringify(data));
    },

    checkInterfaceBelong2User(interfaceName) {
      gwApiRequest({
        url: "/ApiManagerService/checkInterface2User",
        method: "post",
        data: JSON.stringify([
          {
            qualifiedName: interfaceName,
          },
        ]),
      }).then((response) => {
        if (response.data !== true) {
          Message.error(
            "您不是当前JSF服务的负责人, 请到jsf.jd.com维护接口负责人"
          );
          this.owner = false;
        } else {
          this.owner = true;
        }
      });
    },
    async appSelectChange(value) {
      const response = await this.queryAppCanCallAlias(value).catch(() => {
        throw new Error("appSelectChange queryAppCanCallAlias");
      });
      const { data } = response;
      this.callMethodAlias = data || [];
      !data.length &&
        this.$message.error(
          "您已申请使用该接口，但是供应商还没有给您分配别名，请联系开发商"
        );
    },
    methodSelectChange(value) {
      this.getTablesData();
      this.resetInput();
    },
    resetInput() {
      this.f1 = "";
      this.f2 = "";
    },
    getMethodParams: _.debounce(function (key, val) {
      this.maxId = 100;
      this.tableData2 = [];
      this.methodParamTypeList = [];
      if (key.length > 3 && val.length > 3) {
        this.getTablesData(key, val);
      }
    }, 1000),
    async getTablesData() {
      this.tableData2 = [];
      const response = await this.findMethodDetailsForWeb().catch(() => {
        throw new Error("getTablesData findMethodDetailsForWeb");
      });
      const { data } = response;
      this.maxId = data.maxId;
      this.tableData2 = data.data || [];
      this.methodParamTypeList = data.methodParamTypeList;
    },
    async getMethodList() {
      if (this.from === "manager") {
        gwApiRequest({
          url: "/ApiManagerService/queryApiMethodByCondition",
          method: "post",
          data: JSON.stringify([
            {
              qualifiedName: this.$route.query.qualifiedName,
            },
          ]),
        }).then((rsp) => {
          this.callMethods = rsp.data;
        });
      } else {
        const response = await this.queryApiMethodRelease().catch(() => {
          throw new Error("getMethodList queryApiMethodRelease");
        });
        const { data } = response;
        this.callMethods = data;
      }
    },
    async getCanCallApps() {
      const response = await this.queryCanCallApp().catch(() => {
        this.callMethodApps = [];
        this.callMethodAlias = [];
        this.normalParams.app = "";
        this.normalParams.alias = "";
        throw new Error("getCanCallApps queryCanCallApp");
      });
      const { data } = response;
      this.callMethodApps = data || [];
      !data.length &&
        this.$message.error("您所在开发商没有权限测试该接口，请先去申请使用");
    },
    async viewData() {
      const response = await this.findJsfApiTestFormatData().catch(() => {
        throw new Error("viewData findJsfApiTestFormatData");
      });
      const { data } = response;
      this.f1 = data;
    },
    async submitTest() {
      this.debugging = true;
      if (
        null == this.normalParams.qualifiedName ||
        "" === this.normalParams.qualifiedName
      ) {
        this.debugging = false;
        Message.error("请先确认接口名");
        return;
      }
      if (
        null == this.normalParams.methodName ||
        "" === this.normalParams.methodName
      ) {
        this.debugging = false;
        Message.error("请先确认方法名");
        return;
      }
      if (
        null == this.normalParams.applyId ||
        "" === this.normalParams.applyId
      ) {
        this.debugging = false;
        Message.error("请先确认App");
        return;
      }
      if (null == this.normalParams.alias || "" === this.normalParams.alias) {
        this.debugging = false;
        Message.error("请先确认别名");
        return;
      }
      //--新增文本模式进行测试提交
      if (this.requestJsonEdit == true) {
        const value = this.jsonEditor.getValue();
        if (this.validateJson(value) === true) {
          this.requestJson = JSON.stringify(JSON.parse(value), null, " ");
          this.submitTestStep2();
        } else {
          this.debugging = false;
          Message.error("请求参数JSON数据格式有误，请重新编写。");
        }
      } else {
        const response = await this.findJsfApiTestFormatData().catch(() => {
          throw new Error("submitTest findJsfApiTestFormatData");
        });
        const { data } = response;
        this.f1 = data;
        this.requestJson = JSON.stringify(JSON.parse(data), null, " ");
        this.submitTestStep2();
      }
    },

    validateJson(jsonStr) {
      try {
        if (typeof JSON.parse(jsonStr) == "object") {
          return true;
        }
      } catch (e) {
        return false;
      }
      return false;
    },

    async submitTestStep2() {
      console.log(window.env.baseEnv, "window.env.baseEnv");
      if (window.env.baseEnv === "uat" || window.env.baseEnv === "prod") {
        if (!this.owner) {
          Message.error(
            "您不是当前JSF服务的负责人, 请到jsf.jd.com维护接口负责人"
          );
          return false;
        }
      }
      const response = await this.doApiTest().catch(() => {
        this.debugging = false;
        throw new Error("submitTestStep2 doApiTest");
      });
      const { data } = response;
      this.debugging = false;
      this.$message.success("测试成功");
      this.f2 = data;
      this.responseJson = JSON.stringify(JSON.parse(data), null, " ");
    },
    addListRow(obj) {
      let needAdd = JSON.parse(JSON.stringify(obj.children[0]));
      this.changeSubId(needAdd);
      needAdd["canDelete"] = "0";
      obj.children.push(needAdd);
    },
    deleteListRow(id) {
      let temp_row = {};
      temp_row.children = this.tableData2;
      temp_row.id = -100;
      this.deleteRowDetail(temp_row, id);
    },
    deleteRowDetail(row, id) {
      if (row.children) {
        for (let i = 0; i < row.children.length; i++) {
          if (row.children[i].id === id) {
            row.children.splice(i, 1);
            return;
          } else {
            this.deleteRowDetail(row.children[i], id);
          }
        }
      }
    },
    changeSubId(obj) {
      if (obj.id) {
        obj.id = this.maxId;
        this.maxId = this.maxId + 1;
        if (obj.children) {
          for (let subObj of obj.children) {
            this.changeSubId(subObj);
          }
        }
      }
    },
    onJsonEditChange(mode) {
      this.requestJsonEdit = mode;
      if (mode === true) {
        document.getElementById("requestJsonCodeDiv").style.display = "";
        document.getElementById("requestObjectTable").style.display = "none";
        if (this.requestJsonCode) {
          const jsonObjs = JSON.parse(this.requestJsonCode);
          this.jsonEditor.setValue(JSON.stringify(jsonObjs, null, 2));
        }
      } else {
        document.getElementById("requestJsonCodeDiv").style.display = "none";
        document.getElementById("requestObjectTable").style.display = "";
      }
    },
  },
  mounted() {
    this.env = window.env.baseEnv;
    if (this.env === "prod" || this.env === "uat") {
      this.checkInterfaceBelong2User(this.$route.query.qualifiedName);
    }
    this.getMethodList();
    this.getTablesData();
    this.getCanCallApps();
    this.jsonEditor = CodeMirror.fromTextArea(
      document.getElementById("requestJsonCodeText"),
      {
        lineNumbers: false,
        lineWrapping: true,
        mode: "application/json",
        lint: false,
      }
    );
  },
};
</script>

<style lang="scss" scoped>
.apiTest-online-alert {
  font-size: 18px;
  font-weight: bold;
  color: red;
}

.my-table-expand {
  &.el-table [class*="el-table__row--level"] .el-table__expand-icon {
    float: right;
  }
}

.vjs-tree {
  font-family: inherit;
  font-size: 14px;
}

.CodeMirror {
  font-family: inherit;
  min-height: 210px;
  max-height: 400px;
}
</style>

