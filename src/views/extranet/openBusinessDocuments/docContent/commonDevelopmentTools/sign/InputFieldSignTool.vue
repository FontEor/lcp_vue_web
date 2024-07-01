<template>
  <div>
    <el-row>
      <el-col :span="12" class="split-pane-left">
        <div class="input-field-row">
          <span class="input-field-row-gist">请输入下列签名要素的字段值</span>
        </div>
        <el-form
          label-width="120px"
          label-position="left"
          :model="form"
          :rules="formRules"
          ref="inputFieldForm"
        >
          <el-form-item label="access_token" prop="accessToken">
            <el-input v-model="form.accessToken" placeholder="用户授权码">
              <template slot="suffix">
                <a
                  target="_blank"
                  style="color: #3c6ef0"
                  :href="accessTokenLink"
                  >如何获取？</a
                >
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="app_key" prop="appKey">
            <el-input
              v-model="form.appKey"
              placeholder="请到【控制台-应用管理-应用详情-概览】查看"
            />
          </el-form-item>
          <el-form-item label="app_secret" prop="appSecret">
            <el-input
              v-model="form.appSecret"
              placeholder="请到【控制台-应用管理-应用详情-概览】查看"
            />
          </el-form-item>
          <el-form-item label="method" prop="method">
            <el-input
              v-model="form.method"
              placeholder="调用路径，请到【接口文档-请求地址】查看"
            />
          </el-form-item>
          <el-form-item label="timestamp" prop="timestamp">
            <el-input
              v-model="form.timestamp"
              placeholder="时区为GMT+8，格式示例：2020-01-01 12:00:00"
            />
          </el-form-item>
          <el-form-item label="v" prop="version">
            <el-input v-model="form.version" disabled />
          </el-form-item>
          <el-form-item prop="requestBody">
            <template slot="label">
              <span>
                param_json
                <el-tooltip
                  content="为保证右侧签名计算过程正确，请勿输入空格。不使用签名工具无此限制"
                  placement="top-start"
                >
                  <i class="el-icon-help-solid" />
                </el-tooltip>
              </span>
            </template>
            <el-input
              v-model="form.requestBody"
              placeholder="业务参数，请到【接口文档-请求报文示例】查看"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showSteps">计算签名</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" class="split-pane-right">
        <sign-process
          v-if="signProcessModel.stepVisible"
          :access-token="signProcessModel.accessToken"
          :app-key="signProcessModel.appKey"
          :app-secret="signProcessModel.appSecret"
          :method="signProcessModel.method"
          :request-body="signProcessModel.requestBody"
          :timestamp="signProcessModel.timestamp"
          :version="signProcessModel.version"
          :base-url="signProcessModel.baseUrl"
          :steps-visible="signProcessModel.stepVisible"
          :domain="initialDomain"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SignProcess from "./SignProcess";

export default {
  name: "InputFieldSignTool",
  components: { SignProcess },
  props: {
    accessTokenLink: String,
    initialMethod: String,
    initialDomain: String,
  },
  data() {
    return {
      form: {
        accessToken: "",
        appKey: "",
        appSecret: "",
        method: this.initialMethod,
        timestamp: "",
        version: "2.0",
        requestBody: "",
      },
      formRules: {
        accessToken: [
          { required: true, message: "请输入access_token", trigger: "blur" },
        ],
        appKey: [{ required: true, message: "请输入app_key", trigger: "blur" }],
        appSecret: [
          { required: true, message: "请输入app_secret", trigger: "blur" },
        ],
        method: [{ required: true, message: "请输入method", trigger: "blur" }],
        timestamp: [
          { required: true, message: "请输入timestamp", trigger: "blur" },
        ],
        requestBody: [
          { required: true, message: "请输入param_json", trigger: "blur" },
          {
            pattern: /^\S*$/,
            message: "为保证右侧签名计算过程正确，请勿输入空格",
          },
        ],
      },
      signProcessModel: {
        baseUrl: "",
        accessToken: "",
        appKey: "",
        appSecret: "",
        method: "",
        timestamp: "",
        version: "2.0",
        requestBody: "",
        stepVisible: false,
      },
    };
  },
  computed: {
    baseUrl() {
      return "https://api.jdl.com";
    },
  },
  methods: {
    showSteps() {
      this.$refs["inputFieldForm"].validate((valid) => {
        if (valid) {
          this.signProcessModel.baseUrl = this.baseUrl;
          this.signProcessModel.accessToken = this.form.accessToken;
          this.signProcessModel.appKey = this.form.appKey;
          this.signProcessModel.appSecret = this.form.appSecret;
          this.signProcessModel.method = this.form.method;
          this.signProcessModel.timestamp = this.form.timestamp;
          this.signProcessModel.version = this.form.version;
          this.signProcessModel.requestBody = this.form.requestBody;
          this.signProcessModel.stepVisible = true;
        }
      });
    },
  },
};
</script>

<style scoped>
.input-field-row {
  margin: 4px 0;
  display: flex;
  line-height: 22px;
  font-size: 14px;
  font-weight: 400;
  align-items: center;
}

.input-field-row-gist {
  font-family: "Arial Normal", "Arial", sans-serif;
}

.split-pane-left {
  height: 100%;
  padding: 0 8px 0 0;
}

.split-pane-right {
  height: 100%;
  padding: 0 0 0 8px;
  border-left: solid 1px #ebeef5;
}
</style>
