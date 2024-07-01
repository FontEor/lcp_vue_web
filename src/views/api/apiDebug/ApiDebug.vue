<template>
  <div class="my-wrap my-pd">
    <p class="title">API测试工具</p>
    <TagTip :closable="false">
      API工具使用说明请<a
        class="document-tip__achor"
        href="//cloud.jdl.com/#/devSupport/74"
        target="_blank"
        >点击查看</a
      >
    </TagTip>
    <div class="debug-content">
      <div class="left">
        <div class="basicinfo">
          <el-table
            :row-style="{ height: '48px' }"
            height="430px"
            :show-header="false"
            :data="commonParams"
            :header-cell-style="{ padding: '5px 0' }"
            :cell-style="{ padding: '5px 10px' }"
            :class="bizUnitType == 4 ? 'biz-app-type' : 'biz-algorithm-type'"
          >
            <el-table-column
              prop="name"
              label="参数名称"
              align="left"
              width="180"
              class-name="mark"
            ></el-table-column>
            <el-table-column prop="value" label="参数值" align="left">
              <template slot-scope="scope">
                <div class="input-wrapper" v-if="scope.row.type === 'input'">
                  <el-input
                    v-model="scope.row.value"
                    :placeholder="scope.row.placeholder"
                  ></el-input>
                </div>
                <div
                  class="input-wrapper"
                  v-else-if="scope.row.type === 'selector'"
                >
                  <el-select v-model="scope.row.value">
                    <el-option
                      v-for="opt in scope.row.options"
                      :key="opt.value"
                      :label="opt.label"
                      :value="opt.value"
                    />
                  </el-select>
                </div>
                <div v-else-if="scope.row.type === 'refreshToken'">
                  <el-input
                    v-model.trim="scope.row.value"
                    :placeholder="scope.row.placeholder"
                  ></el-input>
                  <div class="text-wrapper">
                    <a
                      href="https://cloud.jdl.com/#/devSupport/70"
                      target="_blank"
                      style="color: #aaaaaa"
                      >点此查看使用说明</a
                    >
                    <el-button
                      type="text"
                      style="padding-left: 10px"
                      v-on:click="gotoGetToken"
                      >获取refreshToken
                    </el-button>
                  </div>
                </div>
                <div
                  class="input-wrapper"
                  v-else-if="scope.row.type === 'radio'"
                >
                  <el-radio-group v-model="scope.row.value">
                    <el-radio :label="1">物流开放平台应用</el-radio>
                    <el-radio :label="2">宙斯应用</el-radio>
                  </el-radio-group>
                </div>
                <span v-else>{{ scope.row.value }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-row class="mb2">
          <el-table
            :data="paramsTableData"
            class="my-table my-table2 my-table-expand"
            style="margin-bottom: 25px"
            row-key="id"
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column prop="name" label="参数名称" min-width="40%">
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
                    (scope.row.type == 'Obj' &&
                      !scope.row.obj_type.startsWith('java.util.ArrayList')) ||
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
                    scope.row.type == 'Array' ||
                    scope.row.obj_type.startsWith('java.util.ArrayList')
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
        <el-button
          type="primary"
          style="margin-bottom: 20px"
          @click="submitTest"
          :loading="debugging"
        >
          {{ debugging ? "测试中" : "提交测试" }}
        </el-button>
      </div>
      <div class="right">
        <div class="right-box">
          <h4 class="sub-title" v-if="requestJson != null">
            请求参数<span style="font-size: 12px; color: dodgerblue">
              (操作提示：点击'['，']'，'{'，'}'符号标记可进行折叠/展开操作)</span
            >
          </h4>
          <h4 class="sub-title" v-else>请求参数</h4>
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
        </div>
        <div class="right-box">
          <h4 class="sub-title" v-if="responseJson != null">
            返回值<span style="font-size: 12px; color: dodgerblue">
              (操作提示：点击'['，']'，'{'，'}'符号标记可进行折叠/展开操作)</span
            >
          </h4>
          <h4 class="sub-title" v-else>返回值</h4>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { getBizUnit } from "@/api/business/unit/biz-unit";
import { getBizUnitApiDetail } from "@/api/business/api/biz-api";
import TagTip from "@/components/common/TagTip.vue";
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

export default {
  name: "apiDebug",
  components: {
    codemirror,
    TagTip,
  },
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
      apiQualifiedName: this.$route.query.qualifiedName,
      methodName: this.$route.query.methodName,
      apiId: this.$route.query.apiId,
      apiName: "",
      // 1 jsf. 2 http
      apiType: 1,
      methodId: null,
      from: this.$route.query.from,
      unitId: this.$route.query.unitId,
      bizUnit: {
        id: 0,
        name: "",
        remark: "",
      },
      // TODO should use key filter but not array index to visit value
      commonParams: [
        {
          name: "接口名称",
          type: "text",
          value: "", // bizUnit.name
          key: "apiName",
        },
        {
          name: "调用路径",
          type: "text",
          value: this.$route.query.apiUrl,
        },
        {
          name: "接口所属开放业务",
          type: "text",
          value: "", // bizUnit.name
          key: "bizUnitName",
        },
        {
          name: "应用类别",
          type: "radio",
          value: 1,
        },
        {
          name: "AppKey",
          type: "input",
          value: "", // c4dafa54d23f429092b4f6f557ff2bb8
          placeholder: "请到【控制台-应用管理-概述】查看",
        },
        {
          name: "AppSecret",
          type: "input",
          value: "", // 6c792b588b014f19b9fc36d8602c5935
          placeholder: "请到【控制台-应用管理-概述】查看",
        },
        {
          name: "refreshToken",
          type: "refreshToken",
          value: "", // 725264b5f23b46f484c9f700bdee7be0
          placeholder: "用户授权",
          urlPrefix: "#/oauth/confirmAuth?client_id=",
          urlSuffix:
            "&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&response_type=code",
        },
        {
          name: "算法",
          type: "selector",
          value: "",
          options: [],
        },
        {
          name: "环境",
          type: "selector",
          value: "", // 725264b5f23b46f484c9f700bdee7be0
          options: [],
        },
      ],
      paramsTableData: [],
      testResult: {
        requestUrl: "",
        responseUrl: "",
      },
      textareaRows: 12,
      maxId: 100,
      debugParamHasErr: false,
      testOptions: [
        {
          value: "test",
          label: "测试环境",
        },
      ],
      prodOptions: [
        {
          value: "uat",
          label: "预发环境",
        },
        // {
        //   value: 'prod',
        //   label: '生产环境'
        // }
      ],
      algorithmOptions: [
        {
          value: "HMacSHA1",
          label: "HMacSHA1",
        },
        {
          value: "HMacMD5",
          label: "HMacMD5",
        },
        {
          value: "HMacSHA256",
          label: "HMacSHA256",
        },
        {
          value: "HMacSHA512",
          label: "HMacSHA512",
        },
        {
          value: "sm3-salt",
          label: "sm3-salt",
        },
        {
          value: "md5-salt",
          label: "md5-salt",
        },
      ],
      // --加载状态指示器
      debugging: false,
      // --返回值
      responseJson: null,
      // --入参值
      requestJson: null,
      bizUnitType: 0,
      paramsVisibleMap: {},
    };
  },
  watch: {
    commonParams: {
      handler(newVal, oldVal) {
        if (newVal[3].value == 1) {
          this.commonParams[6].name = "refreshToken";
        } else if (newVal[3].value == 2) {
          this.commonParams[6].name = "accessToken";
        }
      },
      deep: true,
    },
  },
  methods: {
    async findMethodDetailsForWeb() {
      const url = "/ApiTestToolService/findMethodDetailsForWeb";
      const { qualifiedName, methodName } = this.$route.query;
      const { from, methodId } = this;
      const data = [{ qualifiedName, methodName, from, methodId }];
      return await gwApiRequest.post(url, JSON.stringify(data));
    },

    filterAndClearParamsValue(children, visibleMap) {
      if (children) {
        return children
          .filter((child) => visibleMap[String(child.paramId)] !== 0)
          .map((child) => {
            const newObject = Object.assign({}, child);
            newObject.value = "";
            newObject.children = this.filterAndClearParamsValue(
              newObject.children,
              visibleMap
            );
            return newObject;
          });
      }
      return [];
    },
    async getApiDebugParams() {
      await this.getBizApiMethodParamsVisibleMap();
      const response = await this.findMethodDetailsForWeb().catch(() => {
        throw new Error("getApiDebugParams findMethodDetailsForWeb");
      });
      const { data } = response;
      this.maxId = data.maxId;
      this.paramsTableData = this.filterAndClearParamsValue(
        data.data,
        this.paramsVisibleMap
      );
      const env = window.env.baseEnv;
      if (
        env === "lEnv" ||
        env === "devtest" ||
        env === "development" ||
        env === "ls" ||
        env === "test"
      ) {
        this.commonParams[8].value = "test";
        this.commonParams[8].options = this.testOptions;
      } else if (env === "uat" || env === "prod") {
        this.commonParams[8].value = "uat";
        this.commonParams[8].options = this.prodOptions;
      }
      //合作伙伴类型不展示应用类别行以及新增算法下拉框
      if (this.$route.query.bizUnitType == 4) {
        this.commonParams[7].value = "HMacSHA1";
        this.commonParams[7].options = this.algorithmOptions;
      }
    },

    getBizApiMethodParamsVisibleMap() {
      return request({
        url: "/bizapinterface/getBizApiMethodParamsVisibleMap",
        method: "POST",
        data: [Number(this.apiId)],
      }).then((response) => (this.paramsVisibleMap = response.data));
    },

    // 获取表格调试参数
    async getApiDebugAppParams() {
      // const res = await apis.getApiDebugAppParams().catch(() => {})
      // if (res.body != null) {
      //   this.commonParams[3].value = res.body.accessToken
      //   this.commonParams[4].value = res.body.appKey
      //   this.commonParams[5].value = res.body.appSecret
      // }
    },
    deleteListRow(id) {
      const temp_row = {};
      temp_row.children = this.paramsTableData;
      temp_row.id = -100;
      this.deleteRowDetail(temp_row, id);
    },
    deleteRowDetail(row, id) {
      if (row.children) {
        for (let i = 0; i < row.children.length; i++) {
          if (row.children[i].id === id) {
            row.children.splice(i, 1);
            return;
          }
          this.deleteRowDetail(row.children[i], id);
        }
      }
    },
    addListRow(obj) {
      const needAdd = JSON.parse(JSON.stringify(obj.children[0]));
      this.changeSubId(needAdd);
      needAdd.canDelete = "0";
      obj.children.push(needAdd);
    },
    changeSubId(obj) {
      if (obj.id) {
        obj.id = this.maxId;
        this.maxId = this.maxId + 1;
        if (obj.children) {
          for (const subObj of obj.children) {
            this.changeSubId(subObj);
          }
        }
      }
    },
    submitTest() {
      this.debugging = true;
      const { commonParams } = this;

      if (!commonParams[4].value) {
        this.debugging = false;
        return this.showMsg("appKey不能为空", "error");
      }
      if (!commonParams[5].value) {
        this.debugging = false;
        return this.showMsg("appSecret不能为空", "error");
      }
      if (!commonParams[6].value) {
        this.debugging = false;
        if (commonParams[3].value === 1 && this.bizUnitType != 4) {
          return this.showMsg("refreshToken不能为空", "error");
        }
        if (commonParams[3].value === 2) {
          return this.showMsg("accessToken不能为空", "error");
        }
      }
      if (!commonParams[8].value) {
        this.debugging = false;
        return this.showMsg("请选择调用环境", "error");
      }

      const params = {
        // method: commonParams[1].value,
        // v: commonParams[2].value,
        apiId: Number(this.apiId),
        appKey: commonParams[4].value,
        appSecret: commonParams[5].value,
        // refreshToken: commonParams[4].value,
        env: commonParams[8].value,
        paramJson: [],
        appType: commonParams[3].value,
        algorithm: commonParams[7].value,
      };
      if (commonParams[3].value === 1) {
        params.refreshToken = commonParams[6].value;
      } else if (commonParams[3].value === 2) {
        params.accessToken = commonParams[6].value;
      }
      // 先获取参数 再进行调用
      request({
        url: "/apiTest/getFormatDataForGateway",
        method: "post",
        data: {
          params: this.paramsTableData,
        },
      })
        .then((res) => {
          params.paramJson = res.data;
          this.doTest(params);
        })
        .catch((e) => {
          this.debugging = false;
          console.log(e);
          this.$message.error("参数拼接错误");
        });
    },

    // // params.paramJson = this.$refs.treeTable.getParamsData()
    // const paramJson = []
    // this.makeParamJson(paramJson, this.paramsTableData)
    // params.paramJson = paramJson
    //
    // // 参数拼接有报错，不发送调试请求
    // if (this.debugParamHasErr) {
    //   this.debugging = false
    //   this.debugParamHasErr = false
    //   return ''
    // }
    // params.paramJson = JSON.stringify(params.paramJson)
    doTest(params) {
      const url = "/testUnitApi";
      let paramJsonObj = JSON.stringify(
        JSON.parse(params.paramJson),
        null,
        " "
      );
      if (2 === this.apiType && Array.isArray(paramJsonObj)) {
        // HTTP 接口，直接为参数
        this.requestJson = paramJsonObj[0];
      } else {
        // JSF接口,参数外层包含[]
        this.requestJson = paramJsonObj;
      }
      request({
        url,
        method: "post",
        data: params,
      })
        .then((resp) => {
          this.debugging = false;
          if (resp.data) {
            this.testResult = resp.data;
            if (this.testResult.response)
              this.responseJson = JSON.stringify(
                JSON.parse(this.testResult.response),
                null,
                " "
              );
          } else {
            this.showMsg("测试调用出错", "error");
          }
        })
        .catch((e) => {
          this.debugging = false;
        });

      // const res = await apis.doApiDebugInvoke(params).catch(() => {})
      // this.testResult = res.body
      return "";
    },
    showMsg(message, type) {
      this.$message({ message, type, duration: 3000 });
    },
    makeParamJson(paramJson, data) {
      const jsonIsArray = paramJson instanceof Array; // 目标json是否为数组
      for (let i = 0, len = data.length; i < len; ++i) {
        const item = data[i];
        // if (item.checked) {
        if (!item.children) {
          if (item.required === "1" && item.value === "") {
            this.showMsg(`${item.name}为必填项，不允许为空`, "error");
            this.debugParamHasErr = true;
            break;
          }
          jsonIsArray
            ? paramJson.push(item.value)
            : (paramJson[item.name] = item.value);
        } else {
          // 有子节点
          const tempData = {};
          if (item.type == "Map") {
            this.makeParamJsonOfMap(tempData, item.children);
          } else {
            const tempData =
              item.type == "List" || item.type == "Set" || item.type == "Array"
                ? []
                : {};
            this.makeParamJson(tempData, item.children);
          }
          // if (item.type == 'Obj') {
          //   tempData['@type'] = item.obj_type
          // }
          jsonIsArray
            ? paramJson.push(tempData)
            : (paramJson[item.name] = tempData);
        }
        // }
      }
    },
    makeParamJsonOfMap(paramJson, data) {
      console.log(JSON.stringify(data));
      for (let i = 0, len = data.length; i < len; ++i) {
        // const pair = {}
        const item = data[i].children;
        let key = "";
        if (item[0].type == "Single") {
          key = item[0].value;
        } else {
          const tempKeyData = {};
          this.makeParamJson(tempKeyData, item[0].children);
          key = tempKeyData;
        }
        console.log(`key:${JSON.stringify(key)}`);
        let value = "";
        if (item[1].type == "Single") {
          value = item[1].value;
        } else {
          const tempValueData = {};
          this.makeParamJson(tempValueData, item[1].children);
          value = tempValueData;
        }
        console.log(`value:${JSON.stringify(value)}`);
        paramJson[key] = value;
        // paramJson.push(pair)
      }
    },
    gotoGetToken() {
      if (!this.commonParams[4].value) {
        return this.showMsg("请先填写APPKey", "error");
      }
      // --2020-12-11网关需要拉起原始passport登录页面以便获取thor键的值信息，用于后续授权
      if (this.commonParams[3].value === 1) {
        //跳转网关授权页面
        window.open(
          `${window.env.gatewayAuthorization}/oauth/authorize?client_id=${this.commonParams[4].value}&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code`
        );
        // window.location.href = `//passport.jd.com/uc/login?ReturnUrl=${encodeURIComponent(authorUrl)}` || ''
        // window.open(window.location.origin + this.commonParams[3].urlPrefix + this.commonParams[1].value + this.commonParams[3].urlSuffix)
      } else {
        // 宙斯的页面跳转到宙斯授权
      }
    },
    filterVisibleParams(value, row, column) {
      console.log(value, row, column);
      return true;
    },
  },
  created() {
    this.bizUnitType = this.$route.query.bizUnitType;
    getBizUnit(Number(this.$route.query.unitId)).then((bizUnit) => {
      this.bizUnit = bizUnit;
      this.commonParams
        .filter((o) => o.key === "bizUnitName")
        .forEach((o) => (o.value = bizUnit.name));
    });
    getBizUnitApiDetail(Number(this.$route.query.apiId)).then((bizApi) => {
      this.apiName = bizApi.apiName;
      this.methodId = bizApi.methodId;
      this.apiType = bizApi.type;
      this.commonParams
        .filter((o) => o.key === "apiName")
        .forEach((o) => (o.value = bizApi.apiName));

      this.getApiDebugParams();
    });
    this.getApiDebugAppParams();
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/debug-variables.scss";

::v-deep .vjs-tree {
  font-size: 14px;
  font-family: inherit;
}

.biz-app-type {
  // ::v-deep .el-table__row:first-child {
  //   display: none;
  // }

  ::v-deep .el-table__row:nth-child(4) {
    display: none;
  }
  ::v-deep .el-table__row:nth-child(7) {
    display: none;
  }
}

.biz-algorithm-type ::v-deep .el-table__row:nth-child(8) {
  display: none;
}

.api-debugger {
  width: 1210px;
  margin: 0 auto;
}
.title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;
}
.document-tip__achor {
  color: #409eff;
}
.debug-content {
  margin-top: 14px;
  display: flex;

  .left {
    width: 45%;
    flex-shrink: 0;

    .basicinfo {
      background-color: #ffffff;
      margin-bottom: 20px;
    }
    // 去掉表格的横线，但实际应使用form表单而不是table组件，待重构
    ::v-deep .el-table__row > td {
      border: none;
    }
    //去掉表格hover高亮当前行效果
    ::v-deep .el-table tbody tr:hover > td {
      background-color: #ffffff;
    }
    .el-table {
      ::v-deep tr:nth-child(7) {
        .mark {
          vertical-align: top;
        }
      }
    }
    .text-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .input-wrapper {
      display: flex;
      align-items: center;

      .red-hint {
        margin-right: 5px;
        color: #f00;
      }
    }
  }

  .right {
    flex: 1;
    margin-left: 20px;
    background: #ffffff;
    .sub-title {
      font-size: 18px;
    }
    .right-box {
      margin-bottom: 20px;
      padding: 30px;

      .title {
        font-size: 12px;
        margin-bottom: 5px;
      }

      .textarea {
        border: 2px dotted #c2e9f5;
        font-size: 12px;
        line-height: 1.2;
      }
    }
  }
}
</style>
