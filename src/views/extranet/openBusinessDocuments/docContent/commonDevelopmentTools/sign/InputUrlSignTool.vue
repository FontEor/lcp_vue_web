<template>
  <div>
    <el-row>
      <el-col :span="12" class="split-pane-left">
        <el-form
          label-width="120px"
          label-position="left"
          :model="form"
          :rules="formRules"
          ref="inputUrlForm"
        >
          <el-form-item label="请求URL" prop="url">
            <el-input
              type="textarea"
              v-model="form.url"
              placeholder="请输入发送的HTTP请求URL"
            />
          </el-form-item>
          <el-form-item prop="requestBody">
            <template slot="label">
              <span>
                请求body
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
              placeholder="请输入HTTP请求的body"
            />
          </el-form-item>
          <el-form-item label="app_secret" prop="appSecret">
            <el-input
              type="textarea"
              v-model="form.appSecret"
              placeholder="请到【控制台-应用管理-应用详情-概览】查看"
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
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SignProcess from "./SignProcess";

export default {
  name: "InputUrlSignTool",
  components: { SignProcess },
  data() {
    return {
      form: {
        url: "",
        requestBody: "",
        appSecret: "",
      },
      formRules: {
        url: [{ required: true, message: "请输入url", trigger: "blur" }],
        requestBody: [
          { required: true, message: "请输入请求body", trigger: "blur" },
          {
            pattern: /^\S*$/,
            message: "为保证右侧签名计算过程正确，请勿输入空格",
          },
        ],
        appSecret: [
          { required: true, message: "请输入app_secret", trigger: "blur" },
        ],
      },
      signProcessModel: {
        baseUrl: "",
        domain: "",
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
  methods: {
    showSteps() {
      this.$refs["inputUrlForm"].validate((valid) => {
        if (valid) {
          const url = new URL(this.form.url);

          this.signProcessModel.baseUrl = url.origin;
          this.signProcessModel.domain = url.searchParams.get("LOP-DN");
          this.signProcessModel.accessToken =
            url.searchParams.get("access_token");
          this.signProcessModel.appKey = url.searchParams.get("app_key");
          this.signProcessModel.appSecret = this.form.appSecret;
          this.signProcessModel.method = url.pathname;
          this.signProcessModel.timestamp = url.searchParams.get("timestamp");
          this.signProcessModel.version = url.searchParams.get("v");
          this.signProcessModel.requestBody = this.form.requestBody;
          this.signProcessModel.stepVisible = true;
        }
      });
    },
  },
};
</script>

<style scoped>
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
