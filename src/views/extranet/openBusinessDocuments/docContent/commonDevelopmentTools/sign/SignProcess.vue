<template>
  <!-- 此页面需要注意展示param_json的地方不能格式化代码，否则生成签名展示会出现空格，导致用户自行复制生成的签名和平台生成签名不一致 -->
  <div>
    <div class="process-title">签名计算过程:</div>
    <div v-if="stepsVisible">
      <div class="process-step">
        <div class="process-step-title">
          <span>步骤一: 解析参与签名的要素</span>
        </div>
        <div class="process-step-content">
          <div>
            <span>access_token={{ accessToken }}</span>
          </div>
          <div>
            <span>app_key={{ appKey }}</span>
          </div>
          <div>
            <span>method={{ method }}</span>
          </div>
          <div>
            <span
              >param_json=<pre style="display: inline; font-family: inherit;">{{requestBody}}</pre>
            </span>
          </div>
          <div>
            <span>timestamp={{ timestamp }}</span>
          </div>
          <div>
            <span>v={{ version }}</span>
          </div>
        </div>
      </div>
      <div class="process-step">
        <div class="process-step-title"><span>步骤二: 参数排序</span></div>
        <div class="process-step-content">
          <span>access_token, app_key, method, param_json, timestamp, v</span>
        </div>
      </div>
      <div class="process-step">
        <div class="process-step-title">
          <span>步骤三: 拼接参数值（首尾还需拼接app_secret）</span>
        </div>
        <div class="process-step-content">
          <span class="app_secret">{{ appSecret }}</span
          ><span
            >access_token{{ accessToken }}app_key{{ appKey }}method{{
              method
            }}param_json<pre style="display: inline;font-family: inherit;">{{ requestBody }}</pre>timestamp{{ timestamp }}v{{ version }}</span
          ><span class="app_secret">{{ appSecret }}</span>
        </div>
      </div>
      <div class="process-step">
        <div class="process-step-title">
          <span>步骤四: 对拼接后的字符串进行md5加密，生成签名</span>
        </div>
        <div class="process-step-content">
          {{ signature }}
        </div>
      </div>
      <div class="process-step">
        <div class="process-step-title">
          <span>步骤五: 生成HTTP请求的URL</span>
        </div>
        <div class="process-step-content">
          <div class="process-step-url-block">
            <div><span>URL:</span></div>
            <div>
              <el-input
                type="textarea"
                v-model="displayUrl"
                readonly
                rows="8"
              />
            </div>
          </div>
          <div class="process-step-url-block">
            <div>请求body:</div>
            <div class="block-box">
              <pre style="font-family: inherit;">{{ requestBody }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const CryptoJS = require("crypto-js");

export default {
  name: "SignProcess",
  props: {
    accessToken: String,
    appKey: String,
    appSecret: String,
    method: String,
    timestamp: String,
    version: String,
    requestBody: String,
    baseUrl: String,
    domain: String,
    stepsVisible: Boolean,
  },
  computed: {
    displayUrl() {
      const url = new URL(this.baseUrl);
      url.pathname = this.method;
      url.searchParams.append("access_token", this.accessToken);
      url.searchParams.append("app_key", this.appKey);
      url.searchParams.append("timestamp", this.timestamp);
      url.searchParams.append("v", this.version);
      url.searchParams.append("sign", this.signature);

      if (this.domain) {
        url.searchParams.append("LOP-DN", this.domain);
      }

      return url.toString();
    },
    signature() {
      const appSecret = this.appSecret;
      const accessToken = this.accessToken;
      const appKey = this.appKey;
      const method = this.method;
      const paramJson = this.requestBody;
      const timestamp = this.timestamp;
      const version = this.version;
      const str = `${appSecret}access_token${accessToken}app_key${appKey}method${method}param_json${paramJson}timestamp${timestamp}v${version}${appSecret}`;
      if (navigator.userAgent.indexOf("Win") > -1) {
        return CryptoJS.MD5(str.replace(/(\n|\r)/g, "\r\n")).toString();
      } else {
        return CryptoJS.MD5(str).toString();
      }
    },
  },
  methods:{
    copySuccess() {
      this.$message({
        message: '复制成功',
        type: "success",
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.process-title {
  margin: 4px 0;
  line-height: 22px;
  font-size: 14px;
  font-weight: 400;
}

.process-step {
  margin: 4px 0;
  line-height: 22px;
  font-size: 14px;
  font-weight: 400;
}

.process-step-title {
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-weight: 400;
  background-color: #f2f2f2;
  font-family: "PingFang SC ", "PingFang SC", sans-serif;
  padding: 8px 8px 8px 16px;
  margin: 10px 0;
}

.process-step-content {
  padding: 0 0 0 16px;
}

.process-step-url-block {
  margin: 16px 0;
  .block-box {
    overflow: auto;
    height: 200px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    padding: 5px 10px;
  }
}

.app_secret {
  color: red;
}
</style>
