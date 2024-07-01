<template>
  <div class="app-inner">
    <div class="wly-body-wrapper">
      <div class="wly-body-inner">
        <!-- 外网开放业务文档中心 -->
        <Header v-if="!isRoutePath" />
        <DocHeader />
        <div class="doc-container">
          <DocContainer />
        </div>
      </div>
    </div>

    <!-- 查看当前内容需要登录 -->
    <el-dialog
      :visible.sync="loginDialogVisible"
      width="400px"
      custom-class="login-dialog"
    >
      <div><i class="el-icon-warning"></i></div>
      <div class="login-text">
        {{ $t("components.docLayout.5iwcgvlhz080")
        }}<a class="loginColor" @click="gotoLogin">{{
          $t("components.docLayout.5iwcgvlhzmk0")
        }}</a
        >！
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Footbar } from "@/components/common";
import DocContainer from "@/components/common/DocContainer/index.vue";
import Header from "@/components/extranet/Header/index.vue";
import DocHeader from "@/views/extranet/openBusinessDocuments/components/docHeader.vue";
import bizDocCenter from "@/api/extranet/openBusineseDocCenter";
import api from "@/api/index";
import { UserModule } from "@/store/common/modules/user";

export default {
  name: "BasicLayout",
  components: {
    DocHeader,
    DocContainer,
    Footbar,
    Header,
  },
  data() {
    return {
      unitId: null,
      loginDialogVisible: false,
      routeName: "",
    };
  },
  computed: {
    computeAccessGuideDoc() {
      const { unitId } = this.$route.params;
      const url = `${window.location.origin}/#/open-business-document/access-guide/${unitId}`;
      return url;
    },
    isRoutePath() {
      return this.$route.path.split("/")[1] === "preview-docking-plan";
    },
  },
  watch: {
    $route(val) {
      this.routeName = val.name;
    },
  },
  created() {
    this.routeName = this.$route.name;
    this.unitId = this.$route.params.unitId;
    this.checkAuthority();
  },
  methods: {
    //跳转登录
    gotoLogin() {
      UserModule.extranetCheckLogin();
    },
    //获取业务单元发布范围
    async getBizUnit() {
      if (!this.isRoutePath) {
        const params = { id: this.unitId };
        const response = await bizDocCenter
          .getBizUnit(params)
          .catch((error) => {
            console.log(error);
          });
        if (response && response.data) {
          return response.data.publishRange;
        }
      }
    },
    //校验开发商可见业务单元
    async checkBizUnitVisibleSupplier() {
      const params = this.unitId;
      const response = await api.bizSupplier
        .checkBizUnitVisibleSupplier(params)
        .catch((error) => {});
      return response;
    },
    //查看业务单元私有/公有权限
    async checkAuthority() {
      const publishRange = await this.getBizUnit();
      if (publishRange === 1) {
        //业务单元范围为私有
        //校验是否登陆：是->是否拥有查看私有业务单元权限，否->打开登录提示弹框
        const { loginState } = UserModule;
        if (loginState) {
          //校验是否有查看私有业务单元权限：是->展示内容，否->跳转开放业务列表页，并弹窗提示
          const response = await this.checkBizUnitVisibleSupplier();
          if (!response.data) {
            //无权限
            this.$router.push({
              name: "OpenBusiness",
              params: {
                fromUrl: "noAuthority",
              },
            });
          }
        } else {
          this.loginDialogVisible = true;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
html,
body,
#app,
.app-inner {
  min-width: 1200px;
  height: 100%;
}

.wly-body-wrapper {
  min-height: 100%;
  height: auto;
}

// .wly-body-inner {
//   // padding: 0 0 136px;
// }

.doc-container {
  background: #f6f7fc;
  margin: 0 auto;
}

.loginColor {
  color: #3c6ef0;
}

.login-text {
  margin: 20px auto;
}

.el-icon-warning {
  color: #ffb600;
  font-size: 48px;
  margin-top: 10px;
}

::v-deep .login-dialog {
  text-align: center;
  border-radius: 4px;
  border: 1px solid #eaeaea;

  .el-dialog__header {
    border-bottom: none;
    height: 0px;
    padding: 0px;
  }
}
</style>
