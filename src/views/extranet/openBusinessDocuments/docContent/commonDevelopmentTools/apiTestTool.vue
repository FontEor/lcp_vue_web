<template>
  <div class="api-test">
    <div class="api-test__content">
      <div class="content__api-list">
        <h5 class="api-list__title">API列表</h5>
        <el-divider class="api-list__divider" />
        <el-input
          v-model="queryLike"
          :clearable="true"
          placeholder="请输入接口名称或URI"
          style="width: 100%; margin-bottom: 0.1rem"
          suffix-icon="el-icon-search"
          @change="handleGetBizUnitApiScrollPage"
        >
        </el-input>
        <div
          :class="{
            'api-list__option-list': true,
            'is-empty': menuList.length === 0,
          }"
        >
          <p v-if="menuList.length === 0" class="option-list__empty-text">
            暂未匹配到相关API信息
          </p>
          <div
            :class="{
              'api-menu': true,
              'is-empty': isEmpty,
            }"
            :date-content="$t('asideMenu.apiMenu.5iwca6y3x940')"
          >
            <el-menu class="api-menu__menu" :default-active="defaultActive">
              <el-submenu
                v-for="submenuItem in menuList"
                :key="submenuItem.code"
                :index="submenuItem.code"
                class="menu__submenu"
              >
                <template slot="title">
                  <span slot="title" class="submenu__title">{{
                    submenuItem.name
                  }}</span>
                </template>
                <el-menu-item
                  v-for="apiItem in submenuItem.apiList"
                  :key="apiItem.id"
                  :index="formatNumber(apiItem.id)"
                  class="submenu__menu-item"
                  @click="handleOnClickApiListOptionItem(apiItem.id)"
                >
                  <div>
                    <el-tooltip
                      placement="top"
                      :disabled="disableTooltip"
                      popper-class="option-item-popper"
                    >
                      <template #content>
                        <p class="menu-item__code">
                          {{ apiItem.apiUrl }}
                        </p>
                        <p class="menu-item__name">
                          {{ apiItem.apiName }}
                        </p>
                      </template>
                      <div class="item__text-wrapper">
                        <p class="menu-item__code">
                          {{ apiItem.apiUrl }}
                        </p>
                        <p class="menu-item__name">
                          {{ apiItem.apiName }}
                        </p>
                      </div>
                    </el-tooltip>
                  </div>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </div>
      </div>

      <div class="content__api-info">
        <div class="api-info__tip">
          <div class="tip__title">
            <p class="title__name">
              {{ basicFormData.interfaceName | formatInterfaceName(menuList) }}
              {{ basicFormData.interfaceName | formatInterfaceUri(menuList) }}
            </p>
            <router-link
              v-if="basicFormData.interfaceName"
              class="title__doc"
              target="_blank"
              :to="{
                name: 'ApiDocDetail',
                params: {
                  unitId: $route.params.unitId,
                  docId: basicFormData.interfaceName,
                },
              }"
              :clstag="clstag('', 'api_test_1657092725196|1')"
            >
              查看API文档
            </router-link>
          </div>
          <a
            class="tip__explanation"
            href="//cloud.jdl.com/#/devSupport/74"
            target="_blank"
          >
            <i class="el-icon-help" style="margin-right: 4px" />
            <span>API工具使用说明</span>
          </a>
        </div>
        <div class="api-info__info-wrapper">
          <!-- 左侧内容区域 -->
          <div class="info-wrapper__left">
            <!-- 基础表单 -->
            <el-form
              class="left__basic-form"
              label-position="left"
              label-width="114px"
              ref="basicForm"
              :model="basicFormData"
            >
              <template v-for="item in basicFormList">
                <!-- 数据环境 -->
                <el-form-item
                  v-if="item.prop === 'runtimeEnv'"
                  :key="item.prop"
                  :label="item.label"
                  :prop="item.prop"
                >
                  <el-select v-model="runtimeEnv" style="width: 100%">
                    <el-option
                      v-for="item in runtimeOptionList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                  <p v-if="env === 'uat' || env === 'prod'" class="left-tip">
                    {{ prodEnvHasSandboxTipHashMap[runtimeEnv] }}
                  </p>
                </el-form-item>
                <!-- 应用来源 -->
                <el-form-item
                  v-else-if="item.prop === 'appSource'"
                  :key="item.prop"
                  :label="item.label"
                  :prop="item.prop"
                >
                  <el-radio-group
                    v-model="basicFormData.appSource"
                    style="width: 100%"
                    @change="handleChangeAppSource"
                  >
                    <el-radio :label="1">物流开放平台应用</el-radio>
                    <el-radio :label="2">宙斯应用</el-radio>
                  </el-radio-group>
                </el-form-item>
                <!-- 应用类别 -->
                <el-form-item
                  v-else-if="
                    item.prop === 'appType' && basicFormData.appSource === 1
                  "
                  :key="item.prop"
                  :prop="item.prop"
                >
                  <template slot="label">
                    <p>
                      {{ item.label }}
                      <el-tooltip
                        content="请到【控制台-开发管理-应用管理】的应用列表查看应用类别"
                        placement="top-start"
                      >
                        <i class="el-icon-help-solid" />
                      </el-tooltip>
                    </p>
                  </template>
                  <el-radio-group
                    v-model="basicFormData.appType"
                    style="width: 100%"
                    @change="handleChangeAppType"
                  >
                    <el-radio :label="2">ISV/自研商家应用</el-radio>
                    <el-radio :label="4">合作伙伴应用</el-radio>
                  </el-radio-group>
                </el-form-item>
                <!-- AppKey、AppSecret -->
                <el-form-item
                  v-else-if="['appKey', 'appSecret'].includes(item.prop)"
                  :key="item.prop"
                  :label="item.label"
                  :prop="item.prop"
                >
                  <el-input
                    v-model.trim="basicFormData[item.prop]"
                    placeholder="请到【控制台-应用管理-概述】查看"
                    style="width: 100%"
                  ></el-input>
                </el-form-item>
                <!-- accessToken -->
                <el-form-item
                  v-else-if="
                    item.prop === 'accessToken' &&
                    basicFormData.appSource === 1 &&
                    basicFormData.appType === 2
                  "
                  :key="item.prop"
                  :prop="item.prop"
                  class="access-token-form-item"
                >
                  <template slot="label">
                    <p>
                      {{ item.label }}
                      <a
                        href="https://cloud.jdl.com/#/devSupport/74"
                        target="_blank"
                        ><i class="el-icon-help-solid"
                      /></a>
                    </p>
                  </template>
                  <div class="token-wrapper">
                    <el-input
                      v-model.trim="basicFormData.accessToken"
                      placeholder="用户授权"
                      style="width: 100%"
                    ></el-input>
                    <div class="token-wrapper__tip">
                      <el-button type="text" @click="goToGetAccessToken"
                        >获取AccessToken
                      </el-button>
                    </div>
                  </div>
                </el-form-item>
                <!-- accessToken -->
                <el-form-item
                  v-else-if="
                    item.prop === 'accessToken' && basicFormData.appSource === 2
                  "
                  :key="item.prop"
                  :label="item.label"
                  :prop="item.prop"
                  class="access-token-form-item"
                >
                  <div class="token-wrapper">
                    <el-input
                      v-model.trim="basicFormData.accessToken"
                      placeholder="用户授权"
                      style="width: 100%"
                    ></el-input>
                  </div>
                </el-form-item>
                <!-- 算法 -->
                <el-form-item
                  v-else-if="
                    item.prop === 'algorithm' &&
                    basicFormData.appSource === 1 &&
                    (basicFormData.appType === 4 || basicFormData.appType === 2)
                  "
                  :key="item.prop"
                  :label="item.label"
                  :prop="item.prop"
                >
                  <el-select
                    v-model="basicFormData.algorithm"
                    placeholder="请选择算法"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="algorithmItem in algorithmOptionList"
                      :key="algorithmItem"
                      :label="algorithmItem"
                      :value="algorithmItem"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
              <el-form-item key="content-type" label="content-type">
                <el-select v-model="basicFormData.contentType">
                  <el-option
                    key="json"
                    label="application/json;charset=utf-8"
                    value="application/json;charset=utf-8"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-divider />
            <div class="left__params-table">
              <p class="table__header">请求参数</p>
              <el-radio-group v-model="requestType">
                <el-radio-button
                  label="form"
                  :clstag="clstag('', 'api_test_1657092725196|3')"
                  >表单编辑</el-radio-button
                >
                <el-radio-button
                  label="json"
                  :clstag="clstag('', 'api_test_1657092725196|4')"
                  >JSON编辑</el-radio-button
                >
              </el-radio-group>
            </div>
            <!-- 表单编辑 -->
            <el-table
              v-if="requestType === 'form'"
              :data="paramsTableData"
              class="params-table"
              row-key="id"
              default-expand-all
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              size="mini"
            >
              <el-table-column prop="name" label="参数名称" min-width="90%">
                <template slot-scope="scope">
                  <em v-if="scope.row.required === '1'" class="required">*</em>
                  {{ scope.row.name }}
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
              <el-table-column
                prop="objectType"
                label="参数"
                min-width="36%"
                class-name="object-type-params"
              >
                <template slot="header">
                  <p class="table__header__params">
                    参数
                    <span class="table__header-icon" @click="handleCommand(-1)">
                      <i class="el-icon-edit"></i><span>填写示例值</span>
                    </span>
                  </p>
                </template>
                <template slot-scope="scope">
                  <el-input
                    v-if="scope.row.type == 'Single'"
                    :placeholder="scope.row.webShowType"
                    v-model.trim="scope.row.value"
                  >
                    <template v-if="scope.row.canDelete === 0" slot="append">
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
                        !scope.row.objectType.startsWith(
                          'java.util.ArrayList'
                        )) ||
                      scope.row.type == 'MapKeyValuePair'
                    "
                    :placeholder="scope.row.webShowType"
                    disabled
                  >
                    <template v-if="scope.row.canDelete === 0" slot="append">
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
                      scope.row.objectType.startsWith('java.util.ArrayList')
                    "
                    :placeholder="scope.row.webShowType"
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
                    :placeholder="scope.row.webShowType"
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
            <!-- JSON编辑 -->
            <div v-else>
              <div style="text-align: right; color: #3c6ef0">
                <el-dropdown trigger="click">
                  <span class="table__header-icon el-dropdown-link">
                    <i class="el-icon-edit"></i><span>填写示例报文</span>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      @click.native="handleCommand(index)"
                      v-for="(item, index) in requestDemo"
                      :key="index"
                      :disabled="index === exampleIndex"
                      >{{ item.tag }}</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div>
                <codemirror
                  v-model="requestParamJson"
                  :options="requestParamOptions"
                />
              </div>
            </div>

            <div class="left__button-wrapper">
              <el-button
                :loading="submitTestLoading"
                type="primary"
                @click="handleSubmitTest"
              >
                {{ submitTestLoading ? "测试中" : "发起测试" }}
              </el-button>
            </div>
          </div>
          <!-- 右侧内容区域 -->
          <div class="info-wrapper__right" v-loading="submitTestLoading">
            <el-tabs v-model="activeName">
              <el-tab-pane label="测试结果" name="testResult">
                <div
                  v-if="!requestJson && !responseJson"
                  class="code-demo__is-empty"
                >
                  <div class="is-empty__img"></div>
                  <p class="is-empty__title">暂无测试结果</p>
                  <p class="is-empty__desc">
                    发起测试后，你可以获取当前接口的请求URL、请求参数、返回值信息
                  </p>
                </div>
                <div v-else>
                  <div class="right-box">
                    <h4 class="sub-title">
                      <span class="title-style"></span>
                      请求URL
                    </h4>
                    <div>
                      <span>{{ testResult.url }}</span>
                      <i
                        v-if="testResult.url"
                        v-clipboard:copy="testResult.url"
                        class="el-icon-document-copy"
                      />
                    </div>
                  </div>
                  <div class="right-box">
                    <h4 class="sub-title" v-if="requestJson != null">
                      <span class="title-style"></span>
                      请求参数<span style="font-size: 12px; color: dodgerblue">
                        (操作提示：点击'['，']'，'{'，'}'符号标记可进行折叠/展开操作)</span
                      >
                    </h4>
                    <h4 class="sub-title" v-else>
                      <span class="title-style"></span>
                      请求参数
                    </h4>
                    <div v-if="requestJson != null" class="json-codemirror">
                      <codemirror
                        :value.sync="requestJson"
                        :options="cmOptions"
                      />
                    </div>
                    <div
                      v-else
                      style="
                        border: solid 1px;
                        border-color: #d9d9d9;
                        height: 230px;
                      "
                    ></div>
                  </div>
                  <div class="right-box">
                    <h4 class="sub-title" v-if="responseJson != null">
                      <span class="title-style"></span>
                      返回值<span style="font-size: 12px; color: dodgerblue">
                        (操作提示：点击'['，']'，'{'，'}'符号标记可进行折叠/展开操作)</span
                      >
                    </h4>
                    <h4 class="sub-title" v-else>
                      <span class="title-style"></span>
                      返回值
                    </h4>
                    <div v-if="responseJson != null" class="json-codemirror">
                      <codemirror
                        v-if="responseJson"
                        :value.sync="responseJson"
                        :options="cmOptions"
                      />
                    </div>
                    <div
                      v-else
                      style="
                        border: solid 1px;
                        border-color: #d9d9d9;
                        height: 230px;
                      "
                    ></div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="代码示例" name="codeDemo">
                <div
                  v-if="codeDemoList.length === 0"
                  class="code-demo__is-empty"
                >
                  <div class="is-empty__img"></div>
                  <p class="is-empty__title">暂无代码示例</p>
                  <p class="is-empty__desc">
                    发起测试后，即可生成各类语言的代码示例，你可以将其复制到本地代码中运行
                  </p>
                </div>
                <div v-else>
                  <TagTip class="tag-tip" :closable="false">
                    当前展示非SDK调用的各类语言代码示例，可复制到本地代码中运行，提升开发效率。
                  </TagTip>
                  <el-row class="code-demo-button">
                    <div
                      v-for="(item, index) in codeList"
                      :key="index"
                      :class="{
                        right__button__active: tabIdx === index,
                        right__button: true,
                      }"
                      @click="handleClickButton(index)"
                    >
                      {{ item }}
                    </div>
                  </el-row>
                  <el-tooltip
                    v-if="codeDemo"
                    class="item"
                    effect="dark"
                    content="点击即可复制代码"
                    placement="top"
                  >
                    <i
                      v-if="codeDemo"
                      :clstag="clstag('', 'api_test_1657092725196|5')"
                      v-clipboard:copy="codeDemo"
                      class="el-icon-document-copy"
                    />
                  </el-tooltip>
                  <div class="code-demo-box">
                    <codemirror
                      v-if="codeDemo"
                      :value.sync="codeDemo"
                      :options="cmOptions"
                    />
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="提醒" :visible.sync="showReplaceSample" width="400px">
      <div>是否要用{{ exampleValue }}覆盖已经填入的{{ exampleText }}值？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showReplaceSample = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmReplaceSample"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <BlackFooter />
  </div>
</template>

<script>
import BlackFooter from "@/components/extranet/Footer/blackFooter.vue";
import lcp from "@/api/extranet/lcp/index";
import { codemirror } from "vue-codemirror";
import TagTip from "@/components/common/TagTip.vue";
import point from "@/mixins/point";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/php/php.js";
import "codemirror/mode/shell/shell.js";
import "codemirror/theme/ttcn.css";
import "codemirror/addon/selection/active-line.js";
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/xml-fold.js";
import "codemirror/addon/display/autorefresh.js";

export default {
  name: "ApiTestTool",
  components: {
    codemirror,
    BlackFooter,
    TagTip,
  },
  mixins: [point],
  data() {
    const self = this;
    return {
      env: window.env.buildEnv,
      interfaceKeyword: "",
      requestParamOptions: {
        mode: {
          name: "javascript",
          json: true,
        },
        scrollbarStyle: null,
        readOnly: false,
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
      cmOptions: {
        mode: {
          name: "javascript",
          json: true,
        },
        autoRefresh: true,
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
      // 生产环境API是否具有预发提示文案
      prodEnvHasSandboxTipHashMap: {
        prod: "生产环境，请谨慎操作！！！",
      },
      unitId: parseInt(this.$route.params.unitId),
      docId: parseInt(this.$route.params.docId),
      basicFormData: {
        interfaceName: null,
        invocationPath: "",
        subordinateOpenBiz: "",
        appSource: 1,
        appType: 2,
        appKey: "",
        appSecret: "",
        accessToken: "",
        algorithm: null,
        contentType: "application/json;charset=utf-8",
      },
      basicFormList: [
        { label: "接口名称", prop: "interfaceName" },
        { label: "调用路径", prop: "invocationPath" },
        { label: "接口所属开放业务", prop: "subordinateOpenBiz" },
        { label: "应用来源", prop: "appSource" },
        { label: "应用类别", prop: "appType" },
        { label: "数据环境", prop: "runtimeEnv" },
        { label: "AppKey", prop: "appKey" },
        { label: "AppSecret", prop: "appSecret" },
        { label: "AccessToken", prop: "accessToken" },
        { label: "算法", prop: "algorithm" },
      ],
      interfaceNameOptionList: [],
      methodId: null,
      apiType: 1, // API类型 1:JSF 2:HTTP
      qualifiedName: "",
      methodName: "",
      paramsTableData: [],
      algorithmOptionList: [
        "md5-salt",
        "HMacSHA1",
        "HMacMD5",
        "HMacSHA256",
        "HMacSHA512",
      ],
      requestType: "form",
      from: "web",
      testResult: {
        url: "",
        body: "",
      },
      idArray: [],
      maxId: 0,
      debugParamHasErr: false,
      // --加载状态指示器
      submitTestLoading: false,
      // --返回值
      responseJson: null,
      // --入参值
      requestJson: null,
      runtimeEnv: "",
      runtimeOptionList: [],
      requestParamJson: JSON.stringify(JSON.parse("[{}]"), null, " "),
      activeName: "testResult",
      codeList: ["Java", "Python", "Go", "PHP", "C#"],
      tabIdx: 0,
      unitCode: null,
      codeDemoList: [],
      languageHashMap: ["java8", "python3", "go", "php", "dotnet_standard_2_0"],
      codeDemo: null,
      showReplaceSample: false,
      requestDemo: [],
      exampleValue: "示例值",
      exampleText: "参数",
      exampleIndex: -1,
      isEmpty: false,
      menuList: [],
      queryLike: "",
      defaultActive: "0",
      disableTooltip: false,
    };
  },
  filters: {
    formatInterfaceName(interfaceId, menuList) {
      for (let i = 0; i < menuList.length; i++) {
        for (let j = 0; j < menuList[i]["apiList"].length; j++) {
          if (menuList[i]["apiList"][j]["id"] === interfaceId) {
            return menuList[i]["apiList"][j]["apiName"];
          }
        }
      }
    },
    formatInterfaceUri(interfaceId, menuList) {
      for (let i = 0; i < menuList.length; i++) {
        for (let j = 0; j < menuList[i]["apiList"].length; j++) {
          if (menuList[i]["apiList"][j]["id"] === interfaceId) {
            return `(${menuList[i]["apiList"][j]["apiUrl"]})`;
          }
        }
      }
    },
  },
  computed: {
    computeFilteredInterfaceList() {
      const { interfaceKeyword = "", interfaceNameOptionList = [] } = this;
      return interfaceNameOptionList.filter(
        ({ apiUrl, apiName }) =>
          apiUrl.toLowerCase().indexOf(interfaceKeyword.toLowerCase()) > -1 ||
          apiName.toLowerCase().indexOf(interfaceKeyword.toLowerCase()) > -1
      );
    },
  },
  async created() {
    await this.loadOpenBizInfoData().catch(() => {
      throw new Error("created loadOpenBizInfoData");
    });
    await this.handleGetBizUnitApiScrollPage().catch(() => {
      throw new Error("created handleGetBizUnitApiScrollPage");
    });
    // await this.loadInterfaceInfoData().catch(() => {
    //   throw new Error("created loadInterfaceInfoData");
    // });
    // await this.getApiDebugParams().catch(() => {
    //   throw new Error("created getApiDebugParams");
    // });
  },
  methods: {
    // 根据接口名称或url搜索列表
    async handleSearchEvent() {
      const res = await this.selectBizApiList().catch(() => {
        throw new Error("selectBizApiList");
      });
      this.menuList = res.data || [];
    },
    // 将number类型数据转换为字符串类型数据
    formatNumber(value) {
      return value.toString();
    },
    // JSON编辑的示例值
    handleCommand(index) {
      if (index < 0) {
        this.exampleValue = "示例值";
        this.exampleText = "参数";
      } else {
        this.exampleValue =
          "【" + this.requestDemo[index]["tag"] + "】示例报文";
        this.exampleText = "示例";
      }
      this.exampleIndex = index;
      this.showReplaceSample = true;
    },
    handleClickButton(index) {
      this.tabIdx = index;
      this.codeDemoList.length > 0 &&
        this.codeDemoList.forEach((item) => {
          if (item.name === this.languageHashMap[index]) {
            this.codeDemo = item.code;
          }
        });
    },
    // 查询业务单元下的api列表，支持滚动分页
    async getBizUnitApiScrollPage() {
      const unitId = parseInt(this.unitId);
      const params = { unitId, lastId: 0, size: 1000 };
      return await lcp.bizapinterface.getBizUnitApiScrollPage(params);
    },
    async selectBizApiList() {
      const unitId = parseInt(this.unitId);
      const queryLike = this.queryLike;
      const params = { unitId, queryLike };
      return await lcp.bizapinterface.selectBizApiList(params);
    },
    // 根据API的ID查询API文档信息
    async getBizUnitApiDetails(id = 0) {
      const { interfaceName } = this.basicFormData;
      id = id || interfaceName;
      const params = { id };
      return await lcp.bizapinterface.getBizUnitApiDetails(params);
    },
    // 获取API方法下所有参数可见映射
    async getBizApiMethodParamsVisibleMap() {
      const id = this.basicFormData.interfaceName;
      const data = [id];
      return await lcp.bizapinterface.getBizApiMethodParamsVisibleMap(data);
    },
    // 根据ID查询开放业务详情
    async getBizUnitById() {
      const id = parseInt(this.unitId);
      const params = { id };
      return await lcp.bizunit.getBizUnitById(params);
    },
    async getMethodDetailsForApiTestUtil(params) {
      return await lcp.bizapinterface.getMethodDetailsForApiTestUtil(params);
    },
    // 从网关获取格式化数据
    async getFormatDataForGateway() {
      const params = this.paramsTableData;
      const data = { params };
      return await lcp.apiTest.getFormatDataForGateway(data);
    },
    // 测试工具发起测试
    async testUnitApi(data) {
      return await lcp.bizapinterface.testUnitApi(data);
    },
    async codegen(data) {
      return await lcp.bizapinterface.codegen(data);
    },
    judgeTooltipDisabled(index) {
      const optionListItemApiUrlRefList = this.$refs["optionListItemApiUrl"];
      const optionListItemApiNameRefList = this.$refs["optionListItemApiName"];
      if (
        optionListItemApiUrlRefList &&
        optionListItemApiNameRefList &&
        optionListItemApiUrlRefList[index] &&
        optionListItemApiNameRefList[index]
      ) {
        return optionListItemApiUrlRefList[index].clientWidth > 154
          ? false
          : optionListItemApiNameRefList[index].clientWidth > 154
          ? false
          : true;
      } else {
        return true;
      }
    },
    handleOnClickApiListOptionItem(id) {
      // 切换url的时候请求接口
      this.basicFormData.interfaceName = id;
      this.handleChangeInterfaceName(id);
      // 清除测试结果及代码示例数据及JSON编辑数据
      this.requestJson = null;
      this.responseJson = null;
      this.codeDemoList = [];
      this.codeDemo = null;
      this.requestParamJson = JSON.stringify(JSON.parse("[{}]"), null, " ");
      this.exampleIndex = -1;
    },
    // onClickApiListOptionItem(index) {
    //   // 修改选中的样式
    //   this.$refs["optionListItem"].forEach((item) => {
    //     item.classList.remove("is-active");
    //   });
    //   this.$refs["optionListItem"][index].classList.add("is-active");
    //   this.basicFormData.interfaceName =
    //     this.computeFilteredInterfaceList[index].id;
    //   // 切换url的时候请求接口
    //   this.handleChangeInterfaceName(this.basicFormData.interfaceName);
    //   // 清除测试结果及代码示例数据及JSON编辑数据
    //   this.requestJson = null;
    //   this.responseJson = null;
    //   this.codeDemoList = [];
    //   this.codeDemo = null;
    //   this.requestParamJson = JSON.stringify(JSON.parse("[{}]"), null, " ");
    //   this.exampleIndex = -1;
    // },
    // 加载接口名称选项列表，并选择第一项
    async handleGetBizUnitApiScrollPage() {
      const res = await this.selectBizApiList().catch(() => {
        throw new Error("handleGetBizUnitApiScrollPage selectBizApiList");
      });
      this.menuList = res.data || [];
      if (this.menuList[0] && this.menuList[0]["apiList"].length > 0) {
        this.$nextTick(() => {
          const { unitId, docId } = this;
          const sessionStorageItemKey = `/${unitId}/api-test?api-code`;
          const apiCode = sessionStorage.getItem(sessionStorageItemKey) || "";
          const item = this.menuList[0]["apiList"].find(
            (item) => item.apiCode === apiCode
          );
          sessionStorage.removeItem(sessionStorageItemKey);
          if (item) {
            this.basicFormData.interfaceName = `${item.apiName}(${item.apiUrl})`;
            this.handleOnClickApiListOptionItem(item.id);
            if(docId){
              this.defaultActive = docId.toString();
            }
          } else {
            let apiItem = {};
            if (docId) {
              const foundObj = this.menuList.find((menu) =>
                menu.apiList.find((api) => api.id === docId)
              );
              apiItem = foundObj.apiList.find((api) => api.id === docId);
              this.defaultActive = docId.toString();
            } else {
              apiItem = this.menuList[0]["apiList"][0];
              this.defaultActive =
                this.menuList[0]["apiList"][0]["id"].toString();
            }
            this.basicFormData.interfaceName = `${apiItem.apiName}(${apiItem.apiUrl})`;
            this.handleOnClickApiListOptionItem(apiItem.id);
          }
        });
      }
      // const { data } = await this.getBizUnitApiScrollPage().catch(() => {
      //   throw new Error(
      //     "handleGetBizUnitApiScrollPage getBizUnitApiScrollPage"
      //   );
      // });
      // this.interfaceNameOptionList = data || [];
      // if (this.interfaceNameOptionList.length > 0) {
      //   this.$nextTick(() => {
      //     const { unitId } = this;
      //     const sessionStorageItemKey = `/${unitId}/api-test?api-code`;
      //     const apiCode = sessionStorage.getItem(sessionStorageItemKey) || "";
      //     const index = this.interfaceNameOptionList.findIndex(
      //       (item) => item.apiCode === apiCode
      //     );
      //     sessionStorage.removeItem(sessionStorageItemKey);
      //     this.onClickApiListOptionItem(index > -1 ? index : 0);
      //   });
      // }
    },
    // 加载接口信息数据
    async loadInterfaceInfoData(id = 0) {
      const { data } = await this.getBizUnitApiDetails(id).catch(() => {
        throw new Error("loadInterfaceInfoData getBizUnitApiDetails");
      });
      const {
        apiUrl,
        methodId,
        type,
        interfaceName,
        interfaceMethod,
        requestDemo,
      } = data;
      this.basicFormData.invocationPath = apiUrl;
      this.methodId = methodId;
      this.apiType = type;
      this.qualifiedName = interfaceName;
      this.methodName = interfaceMethod;
      this.requestDemo = requestDemo;
    },
    // 改变接口名称操作时
    async handleChangeInterfaceName(value) {
      await this.loadInterfaceInfoData(value).catch(() => {
        throw new Error("handleChangeInterfaceName loadInterfaceInfoData");
      });
      await this.getApiDebugParams().catch(() => {
        throw new Error("handleChangeInterfaceName getApiDebugParams");
      });
    },
    // 过滤不可见参数
    filterAndClearParamsValue(children, visibleMap, isReplace) {
      return children && children.length > 0
        ? children
            .filter((child) => visibleMap[String(child.paramId)] !== 0)
            .map((child) => {
              const newObject = Object.assign({}, child);
              !isReplace && (newObject.value = "");
              newObject.children = this.filterAndClearParamsValue(
                newObject.children,
                visibleMap,
                isReplace
              );
              return newObject;
            })
        : [];
    },
    // 获取API方法下所有参数可见映射，过滤不可见参数
    async getApiDebugParams(isReplace) {
      const response = await this.getBizApiMethodParamsVisibleMap().catch(
        () => {
          throw new Error("getApiDebugParams getBizApiMethodParamsVisibleMap");
        }
      );
      const paramsVisibleMap = response.data || {};
      const params = { apiId: Number(this.basicFormData.interfaceName) };
      const { data } = await this.getMethodDetailsForApiTestUtil(params).catch(
        () => {
          throw new Error("getApiDebugParams getMethodDetailsForApiTestUtil");
        }
      );
      const paramsChildren = data || [];
      this.paramsTableData = this.filterAndClearParamsValue(
        paramsChildren,
        paramsVisibleMap,
        isReplace
      );
      this.getMaxId(data);
    },
    // 遍历参数树形数据得到所有id值，取最大值
    getMaxId(data) {
      if (!data || !data.length) {
        return;
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].id) {
          this.idArray.push(data[i].id);
        }
        if (data[i].children && data[i].children.length > 0) {
          this.getMaxId(data[i].children);
        }
      }
      this.maxId = Math.max(...this.idArray) + 1;
    },
    // 加载开放业务信息数据
    async loadOpenBizInfoData() {
      const { data } = await this.getBizUnitById().catch(() => {
        throw new Error("loadOpenBizInfoData getBizUnitById");
      });
      const { hasUat, name, code } = data;
      this.unitCode = code;
      // hasUat为0则无预发环境，为1则有预发环境
      if (this.env === "uat" || this.env === "prod") {
        if (hasUat === 1) {
          this.runtimeEnv = "prod";
          this.runtimeOptionList = [
            { value: "prod", label: "生产环境" },
            { value: "uat", label: "预发环境" },
          ];
        } else {
          this.runtimeEnv = "prod";
          this.runtimeOptionList = [{ value: "prod", label: "生产环境" }];
        }
      } else {
        this.runtimeEnv = "test";
        this.runtimeOptionList = [{ value: "test", label: "测试环境" }];
      }
      this.basicFormData.subordinateOpenBiz = name;
    },
    // 重置配置信息AppKey,AppSecret,AccessToken,algorithm表单数据
    // algorithm字段后端会放行null，但是不放行空字符串""
    resetForm() {
      this.basicFormData.appKey = "";
      this.basicFormData.appSecret = "";
      this.basicFormData.accessToken = "";
      this.basicFormData.algorithm =
        this.basicFormData.appSource === 2 ? null : "md5-salt";
    },
    // 改变应用来源操作，重置表单数据
    handleChangeAppSource() {
      this.resetForm();
    },
    // 改变应用类别操作时，重置表单数据，变更算法选项list
    handleChangeAppType(value) {
      if (value === 4) {
        this.algorithmOptionList = [
          "md5-salt",
          "HMacSHA1",
          "HMacMD5",
          "HMacSHA256",
          "HMacSHA512",
          "sm3-salt",
        ];
      } else {
        this.algorithmOptionList = [
          "md5-salt",
          "HMacSHA1",
          "HMacMD5",
          "HMacSHA256",
          "HMacSHA512",
        ];
      }
      this.resetForm();
    },
    // 跳转页面获取accessToken
    goToGetAccessToken() {
      const { appSource, appKey } = this.basicFormData;
      if (!appKey) {
        return this.$message.error("请先填写APPKey");
      }
      // --2020-12-11网关需要拉起原始passport登录页面以便获取thor键的值信息，用于后续授权
      if (appSource === 1) {
        //物流开放平台应用
        //跳转网关授权页面，如果当前是生产环境域名且选择的运行环境为生产环境则跳转网关生产授权页
        if (this.runtimeEnv === "prod") {
          window.open(
            `https://oauth.jdl.com/oauth/authorize?client_id=${appKey}&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code`
          );
        } else {
          window.open(
            `${window.env.gatewayAuthorization}/oauth/authorize?client_id=${appKey}&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code`
          );
        }
      }
    },
    // 提交测试操作
    async handleSubmitTest() {
      this.submitTestLoading = true;
      const { appSource, appType, appKey, appSecret, accessToken, algorithm } =
        this.basicFormData;
      if (!appKey) {
        this.submitTestLoading = false;
        return this.$message.error("appKey不能为空");
      }
      if (!appSecret) {
        this.submitTestLoading = false;
        return this.$message.error("appSecret不能为空");
      }
      if (appSource === 1 && appType !== 4) {
        if (!accessToken) {
          this.submitTestLoading = false;
          return this.$message.error("accessToken不能为空");
        } else if (appSource === 1 && appType === 4) {
          if (!algorithm) {
            this.submitTestLoading = false;
            return this.$message.error("algorithm不能为空");
          }
        }
      }
      if (appSource === 2 && !accessToken) {
        this.submitTestLoading = false;
        return this.$message.error("accessToken不能为空");
      }
      let paramJson = null;
      // 先获取参数 再进行调用
      if (this.requestType === "form") {
        const { data } = await this.getFormatDataForGateway().catch(() => {
          this.submitTestLoading = false;
          // 清除测试结果及代码示例数据
          this.requestJson = null;
          this.responseJson = null;
          this.codeDemoList = [];
          throw new Error("handleSubmitTest getFormatDataForGateway");
        });
        paramJson = JSON.stringify(JSON.parse(data || ""), null, " ");
      } else {
        const jsonString = this.requestParamJson;
        paramJson = jsonString || "";
        try {
          JSON.parse(paramJson);
        } catch (error) {
          this.$message.error("JSON解析失败");
          this.submitTestLoading = false;
          // 清除测试结果及代码示例数据
          this.requestJson = null;
          this.responseJson = null;
          this.codeDemoList = [];
        }
      }
      const apiId = Number(this.basicFormData.interfaceName);
      const env = this.runtimeEnv;
      const params = {
        apiId,
        appKey,
        appSecret,
        env,
        paramJson,
        appType: appSource,
        accessToken,
        algorithm,
        headers: {
          "content-type": this.basicFormData.contentType,
        },
      };
      this.doTest(params);
    },
    // 替换示例值
    async handleConfirmReplaceSample() {
      if (this.exampleIndex === -1) {
        await this.getApiDebugParams("isReplace").catch((error) => {
          throw new Error("handleConfirmReplaceSample getApiDebugParams");
        });
      } else {
        this.requestParamJson = this.requestDemo[this.exampleIndex]["content"];
      }
      this.showReplaceSample = false;
    },
    // 发起测试
    async doTest(params) {
      // const paramJson = JSON.stringify(JSON.parse(params.paramJson), null, " ");
      const paramJson = params.paramJson;
      if (this.apiType === 2 && Array.isArray(paramJson)) {
        // HTTP 接口，直接为参数
        this.requestJson = paramJson[0];
      } else {
        // JSF接口,参数外层包含[]
        this.requestJson = paramJson;
      }
      const { data } = await this.testUnitApi(params).catch(() => {
        this.submitTestLoading = false;
        // 清除测试结果及代码示例数据
        this.responseJson = null;
        this.codeDemoList = [];
        throw new Error("doTest testUnitApi");
      });
      this.submitTestLoading = false;
      if (data) {
        this.testResult = data;
        if (this.testResult.body) {
          this.responseJson = JSON.stringify(
            JSON.parse(this.testResult.body),
            null,
            " "
          );
        } else {
          this.responseJson = null;
        }
        // 获取代码示例值
        this.queryCodeDemo(params);
      } else {
        this.$message.error("测试调用出错");
      }
    },
    async queryCodeDemo(params) {
      const { appKey, appSecret, accessToken, algorithm } = this.basicFormData;
      const method = "POST";
      const apiUri = this.basicFormData.invocationPath;
      const unitCode = this.unitCode;
      const useJos = this.basicFormData.appSource === 2 ? true : false;
      const paramJson = params.paramJson;
      const languages = this.languageHashMap;
      const data = {
        appKey,
        appSecret,
        accessToken,
        algorithm,
        method,
        apiUri,
        unitCode,
        useJos,
        paramJson,
        languages,
        headers: {
          "content-type": this.basicFormData.contentType,
        },
      };
      const response = await this.codegen(data).catch((error) => {
        // 清除代码示例数据
        this.codeDemoList = [];
        throw new Error("queryCodeDemo codegen " + error);
      });
      this.codeDemoList = response.data;
      this.codeDemoList.length > 0 &&
        this.codeDemoList.forEach((item) => {
          if (item.name === this.languageHashMap[this.tabIdx]) {
            this.codeDemo = item.code;
          }
        });
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
      needAdd.canDelete = 0;
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
    makeParamJson(paramJson, data) {
      const jsonIsArray = paramJson instanceof Array; // 目标json是否为数组
      for (let i = 0, len = data.length; i < len; ++i) {
        const item = data[i];
        if (!item.children) {
          if (item.required === "1" && item.value === "") {
            this.$message.error(`${item.name}为必填项，不允许为空`);
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
          jsonIsArray
            ? paramJson.push(tempData)
            : (paramJson[item.name] = tempData);
        }
      }
    },
    makeParamJsonOfMap(paramJson, data) {
      for (let i = 0, len = data.length; i < len; ++i) {
        const item = data[i].children;
        let key = "";
        if (item[0].type == "Single") {
          key = item[0].value;
        } else {
          const tempKeyData = {};
          this.makeParamJson(tempKeyData, item[0].children);
          key = tempKeyData;
        }
        let value = "";
        if (item[1].type == "Single") {
          value = item[1].value;
        } else {
          const tempValueData = {};
          this.makeParamJson(tempValueData, item[1].children);
          value = tempValueData;
        }
        paramJson[key] = value;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/debug-variables.scss";

.api-test {
  border-radius: 4px;

  .api-test__content {
    display: flex;
    justify-content: space-between;

    .content__api-list {
      margin-right: 12px;
      padding: 16px;
      width: 240px;
      border-radius: 4px 4px 0 0;
      background: #fff;

      .api-list__title {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 600;
      }

      .api-list__divider {
        margin: 12px 0;
      }

      .api-list__option-list {
        position: relative;
        // margin-top: 0px;
        //margin-right: -16px;
        max-height: calc(100vh - 342px);
        min-height: calc(100vh - 260px);
        overflow-y: auto;
        overflow-x: hidden;
        // overflow: hidden;
        &.is-empty {
          background-image: url("~@/assets/common/images/empty/empty.svg");
          background-size: 180px;
          background-repeat: no-repeat;
          background-position: 0 80px;
        }

        .option-list__empty-text {
          position: absolute;
          top: 200px;
          left: 50%;
          font-size: 16px;
          color: #707784;
          white-space: nowrap;
          transform: translateX(-55%);
        }

        .option-list__item {
          padding: 10px 12px;
          max-width: 180px;
          border: 1px solid #e4e9f0;
          border-top: 1px solid transparent;
          color: #666;
          cursor: pointer;

          &:nth-child(1) {
            border-top: 1px solid #e4e9f0;
            border-radius: 4px 4px 0 0;
          }

          &:nth-last-child(1) {
            border-radius: 0 0 4px 4px;
          }

          &:nth-child(2n) {
            background-color: #fafafa;
          }

          &:hover,
          &.is-active {
            color: #3c6ef0;
            background-color: rgba(60, 110, 240, 0.1);
            border: 1px solid #3c6ef0;
            border-radius: 4px;
          }

          .text-wrapper__text {
            width: 154px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .text-wrapper__hidden-text {
            position: absolute;
            z-index: -1;
            display: inline-block;
            overflow: hidden;
            max-width: 156px;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }

    .content__api-info {
      padding: 12px;
      padding-bottom: 0;
      flex-grow: 1;
      // flex布局右侧内容过长超出父元素容器设置width:0
      width: 0;
      background-color: #fff;
      border-radius: 4px;

      .api-info__tip {
        margin-bottom: 8px;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        font-weight: 500;
        vertical-align: middle;

        .tip__title {
          display: flex;
          justify-content: flex-start;

          .title__name {
            display: inline-block;
            max-width: 400px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .title__doc {
            font-weight: normal;
            color: #3c6ef0;
            white-space: nowrap;
          }
        }

        .tip__explanation {
          color: #999;
        }
      }

      .api-info__info-wrapper {
        display: flex;
        background-color: #fff;
        border-top: 1px solid #e4e9f0;

        .info-wrapper__left {
          padding-top: 8px;
          padding-right: 8px;
          border-right: 1px solid #e4e9f0;
          max-width: 520px;
          min-width: 520px;
          max-height: calc(100vh - 274px);
          min-height: calc(100vh - 180px);
          overflow: auto;
          background: #fff;

          .left__basic-form {
            .left-tip {
              color: red;
              font-size: 12px;
              line-height: 1;
              padding-top: 4px;
              position: absolute;
              top: 100%;
              left: 0;
            }
            .el-icon-help-solid {
              cursor: pointer;
            }
            .token-wrapper {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;

              .token-wrapper__tip {
                width: 100%;
                display: flex;
                justify-content: flex-end;
                align-items: center;
              }
            }
          }
          .left__params-table {
            height: 64px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .table__header {
              font-weight: 500;
            }
            ::v-deep
              .el-radio-button__orig-radio:checked
              + .el-radio-button__inner {
              color: #3c6ef0;
            }
            ::v-deep .el-radio-button__inner {
              width: 76px;
              height: 32px;
              padding: 8px 6px;
              background: #ffffff;
            }
          }
          .params-table {
            font-size: 12px;
            .table__header-icon {
              color: #3c6ef0;
              // margin-left: 60px;
              cursor: pointer;
            }
            .el-icon-edit {
              margin-right: 2px;
              cursor: pointer;
            }
            ::v-deep {
              .el-input {
                font-size: 12px;
                ::placeholder {
                  font-size: 12px;
                }
              }
              .el-input__inner {
                height: 26px;
                line-height: 26px;
              }
            }
          }
          // 去掉表格的横线，但实际应使用form表单而不是table组件，待重构
          ::v-deep .el-table__row > td {
            border: none;
            padding: 4px 0;
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

          .left__button-wrapper {
            position: sticky;
            bottom: 0;
            z-index: 7;
            margin: 0 -8px;
            padding: 12px;
            display: flex;
            justify-content: flex-end;
            box-shadow: 0 -6px 12px 0 rgba(0, 0, 0, 0.08);
            background: #fff;
          }
        }
        .info-wrapper__right {
          padding: 8px 0 0 16px;
          flex-grow: 1;
          max-height: calc(100vh - 274px);
          min-height: calc(100vh - 180px);
          overflow: auto;
          background: #fff;
          .tag-tip {
            min-width: 410px;
            ::v-deep.tagTip__tag {
              height: 40px;
            }
            ::v-deep.tagTip__content {
              line-height: 18px;
              white-space: normal;
            }
          }
          .code-demo-button {
            display: flex;
            .right__button {
              text-align: center;
              width: 62px;
              height: 28px;
              line-height: 28px;
              background: #ebf0fd;
              border-radius: 4px;
              margin: 0 5px;
              cursor: pointer;
            }
            .right__button__active {
              text-align: center;
              width: 62px;
              height: 28px;
              line-height: 28px;
              background: #3c6ef0;
              border-radius: 4px;
              margin: 0 5px;
              cursor: pointer;
              color: #fff;
            }
          }
          .el-icon-document-copy {
            position: absolute;
            right: 20px;
            top: 110px;
            margin: 8px;
            cursor: pointer;
            z-index: 3;
          }
          .code-demo-box {
            margin-top: 8px;
            height: calc(100vh - 342px);
            border: 1px solid #d9d9d9;
            overflow: auto;
            ::v-deep .CodeMirror {
              height: auto;
            }
          }
          .code-demo__is-empty {
            .is-empty__img {
              height: 152px;
              width: 238px;
              margin: 120px auto 0;
              background-image: url("~@/assets/common/images/empty/empty.svg");
            }
            .is-empty__title {
              text-align: center;
              margin-bottom: 10px;
              font-size: 16px;
              color: #707784;
            }
            .is-empty__desc {
              text-align: center;
              font-size: 12px;
              color: #707784;
            }
          }

          .title-style {
            display: inline-block;
            width: 3px;
            height: 16px;
            background: rgba(60, 110, 240, 1);
            border-radius: 2px;
            margin-right: 9px;
            vertical-align: middle;
          }
          .right-box {
            .el-icon-document-copy {
              position: relative;
              right: 0;
              top: 0;
              margin-left: 8px;
              color: #3c6ef0;
              cursor: pointer;
            }
            .sub-title {
              font-weight: 600;
              margin-bottom: 12px;
            }
            margin-bottom: 20px;
            .title {
              font-size: 12px;
              margin-bottom: 5px;
            }
            .json-codemirror {
              border: solid 1px;
              border-color: #d9d9d9;
              ::v-deep .CodeMirror {
                height: 240px;
              }
            }
            .textarea {
              border: 2px dotted #c2e9f5;
              font-size: 12px;
              line-height: 1.2;
            }
          }
        }
      }
    }
  }

  .black-footer {
    position: relative;
    margin: 0 -12px;

    ::v-deep .black-footer-license-content {
      width: 890px;
    }
  }
}

::v-deep .vjs-tree {
  font-size: 14px;
  font-family: inherit;
}
.access-token-form-item {
  margin-bottom: 0;
}
.table__header__params {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;
  color: #3c6ef0;
  font-size: 12px;
}

.api-menu {
  position: absolute;
  top: 0px;
  width: 100%;
  height: calc(100vh - 260px);

  &.is-empty {
    background-image: url("~@/assets/common/images/empty/empty1.png");
    background-position: 50% 32px;
    background-repeat: no-repeat;

    &::after {
      position: absolute;
      top: 360px;
      left: 50%;
      display: block;
      content: attr(date-content);
      transform: translateX(-50%);
    }
  }

  .api-menu__menu {
    border-right: none;

    ::v-deep .menu__submenu {
      .el-submenu__title {
        background-color: #f6f7fc;
        border-bottom: 1px solid #e7e7e7;
        height: 30px;
        line-height: 30px;

        .submenu__title {
          font-weight: 600;
        }
      }

      .submenu__menu-item {
        height: 48px;
        background-color: #f6f7fc;

        .menu-item__code {
          overflow: hidden;
          line-height: 24px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .menu-item__name {
          overflow: hidden;
          line-height: 24px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
.api-menu-preview {
  top: 60px;
}

::v-deep .el-input--suffix .el-input__inner {
  padding-right: 10px;
}

::v-deep .el-menu-item.is-active {
  color: #3c6ef0;
  background-color: rgba(60, 110, 240, 0.1) !important;
  border: 1px solid #3c6ef0;
  border-radius: 4px;
}
</style>

<style lang="scss">
.option-item-popper {
  padding: 4px 16px;
}
.object-type-params {
  .cell {
    padding-left: 0 !important;
  }
}
</style>
