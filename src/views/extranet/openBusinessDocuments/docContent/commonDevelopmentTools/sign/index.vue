<template>
  <div class="sign" :style="{ maxWidth: computeSignMaxWidth }">
    <div class="sign-info">
      <i class="el-icon-info" />
      <span
        >方便开发者快速验证签名的正确性。使用说明请<a
          target="_blank"
          class="sign-usage-link"
          :href="config.signToolUsageLink"
          >点此查看</a
        ></span
      >
    </div>
    <div class="sign-tabs">
      <el-tabs>
        <el-tab-pane label="输入字段">
          <input-field-sign-tool
            :initial-domain="domain"
            :initial-method="method"
            :access-token-link="config.signToolAccessTokenLink"
          />
        </el-tab-pane>
        <el-tab-pane label="输入URL">
          <input-url-sign-tool />
        </el-tab-pane>
      </el-tabs>
    </div>
    <BlackFooter />
  </div>
</template>

<script>
import InputFieldSignTool from "./InputFieldSignTool";
import InputUrlSignTool from "./InputUrlSignTool";
import BlackFooter from "@/components/extranet/Footer/blackFooter.vue";
import { getSignToolConfig } from "@/config/signTool";
import openBusineseDocCenter from "@/api/extranet/openBusineseDocCenter/index.js";

export default {
  name: "Sign",
  components: { InputUrlSignTool, InputFieldSignTool, BlackFooter },
  props: {
    method: String,
  },
  data() {
    return {
      domain: "",
      config: {
        signToolUsageLink: "",
        signToolAccessTokenLink: "",
      },
    };
  },
  computed: {
    computeSignMaxWidth() {
      const asideContainerWidth =
        (document.querySelector(".aside-container") &&
          document.querySelector(".aside-container").style &&
          document.querySelector(".aside-container").style.width) ||
        150;
      return `calc(100vw - ${asideContainerWidth}px - 16px)`;
    },
  },
  methods: {
    // 查询当前开放业务名称
    async getBizUnit() {
      const id = parseInt(this.$route.params.unitId);
      const params = { id };
      return await openBusineseDocCenter.getBizUnit(params).catch(() => {
        throw new Error("getBizUnit");
      });
    },
  },
  created() {
    getSignToolConfig
      .then((response) => response.data)
      .then((config) => (this.config = config));

    this.getBizUnit().then((response) => {
      const { data } = response;
      const { code } = data;
      this.domain = code || "";
    });
  },
};
</script>

<style lang="scss" scoped>
.sign {
  padding-top: 8px;
  min-width: 910px;
  background: #fff;

  .sign-info {
    margin: 0 16px 16px 16px;
    padding-left: 8px;
    line-height: 32px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 400;
    color: #999999;
    background-color: #f5f5f5;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", Arial, sans-serif;
    .sign-usage-link {
      color: #3c6ef0;
    }
  }
  .sign-tabs {
    padding: 8px 16px;
    min-height: calc(100vh - 248px);
    background-color: white;
  }

  .black-footer {
    position: relative;
    margin: 0 -12px;

    ::v-deep .black-footer-license-content {
      width: 890px;
    }
  }
}
</style>