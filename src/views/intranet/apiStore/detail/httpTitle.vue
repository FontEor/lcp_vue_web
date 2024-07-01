<template>
  <div class="my-wrap my-pd">
    <el-breadcrumb
      class="my-breadcrumb mb2"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item :to="{ path: '/apiStore' }"
        >API仓库</el-breadcrumb-item
      >
      <el-breadcrumb-item>API详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="my-column2 mb2">
      <el-row>
        <el-col :span="21"
          ><h3>{{ this.apiInfo.url }}（{{ this.apiInfo.name }}）</h3></el-col
        >
        <el-col :span="3">
          <span class="fr" style="margin-top: 12px">
            <el-button type="primary" @click="applyApi">申请使用</el-button>
          </span>
        </el-col>
      </el-row>
      <p class="remark-content">{{ this.apiInfo.remark }}</p>
    </div>
    <HttpDocument
      v-if="isShow"
      :url="apiInfo.url"
      :domainId="apiInfo.domainId"
      :domainCode="apiInfo.domainCode"
      :inParamList="inParamList"
      :outParamList="outParamList"
      :errorCodeList="errorCodeList"
    ></HttpDocument>
    <el-dialog
      :visible="applyApiDialogShow"
      title="API申请"
      width="500px"
      @close="applyApiDialogShow = false"
    >
      <el-form
        ref="applyApiForm"
        :model="applyApiForm"
        :rules="rules"
        label-width="120px"
        :hide-required-asterisk="false"
      >
        <el-form-item label="API名称" prop="url">
          <el-input v-model="apiInfo.url" disabled placeholder="请选择实现" />
        </el-form-item>
        <el-form-item label="中文名称" prop="name">
          <el-input
            v-model="apiInfo.name"
            disabled
            placeholder="中文名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="应用" prop="selectApp">
          <el-select
            v-model="applyApiForm.selectApp"
            placeholder="请选择应用"
            value-key="id"
          >
            <el-option
              v-for="app in appList"
              :key="app.id"
              :label="app.name"
              :value="app"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="申请调用量" prop="tps">
          <el-input v-model.number="applyApiForm.tps" placeholder="申请调用量">
            <template slot="append">TPS</template>
          </el-input>
        </el-form-item>
        <el-form-item label="使用场景" prop="businessCase">
          <el-input
            v-model="applyApiForm.businessCase"
            :rows="3"
            maxlength="200"
            placeholder="请输入使用场景"
            resize="none"
            show-word-limit
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="applyApiDialogShow = false">取 消</el-button>
        <el-button :disabled="disabled" type="primary" @click="submit"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 申请api使用成功弹框提示 -->
    <el-dialog
      :visible="applySuccessDialog"
      title="提示"
      width="500px"
      @close="applySuccessDialog = false"
    >
      <div class="text">申请成功，请等候审批结果通知</div>
      <p>
        审批通过后，请到
        <a class="link" @click="gotoApiList()">控制台-应用管理-调用的API列表</a>
        中查看申请的API
      </p>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="applySuccessDialog = false"
          >关闭</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import apiStore from "@/api/intranet/apiStore/index";
import HttpDocument from "./httpDocument.vue";
import { Loading, Message } from "@lui/lui-ui";
import { UserModule } from "@/store/common/modules/user";
import gwApiRequest from "@/utils/gwApiRequest";
import Cookies from "js-cookie";

export default {
  components: {
    HttpDocument,
  },
  data() {
    return {
      apiInfo: {
        url: "",
        name: "",
        domainId: "",
        domainCode: "",
        remark: "",
      },
      inParamList: [],
      outParamList: [],
      errorCodeList: [],
      isShow: false,
      applyApiDialogShow: false,
      applyApiForm: {
        instanceId: "",
        tps: 0,
        businessCase: "",
        selectApp: null,
      },
      appList: [],
      rules: {
        url: [{ required: true, message: "请选择接口" }],
        name: [{ required: true, message: "请填入实现中文名" }],
        selectApp: [{ required: true, message: "请选择App" }],
        tps: [
          { required: true, message: "请输入调用量" },
          {
            type: "number",
            message: "请输入调用量。10-1000000",
            min: 10,
            max: 1000000,
          },
        ],
        businessCase: [
          {
            required: true,
            message: "请输入至少十个字的使用场景描述",
            min: 10,
            max: 200,
          },
        ],
      },
      applyLoading: "",
      disabled: false,
      applySuccessDialog: false,
      hasLogIn: UserModule.loginState,
    };
  },
  methods: {
    async getHttpAPIDetail() {
      const id = this.$route.query.id;

      const gwParams = [{ id }];
      const response = await apiStore
        .getHttpDocumentDetail(gwParams)
        .catch((error) => {
          const { message } = error.data;
          this.$message.error(`${message}`);
        });
      if (response) {
        const { data } = response;
        console.log("response.data", response.data);
        this.applyApiForm.instanceId = data.id;
        this.apiInfo.url = data.url;
        this.apiInfo.name = data.name;
        this.apiInfo.domainId = data.domainId;
        this.apiInfo.domainCode = data.domainCode;
        this.apiInfo.remark = data.remark;
        this.inParamList = data.inParamList;
        this.outParamList = data.outParamList;
        this.errorCodeList = data.errorCodeList;
        this.isShow = true;
      }
    },
    async applyApi() {
      console.log(11111111);
      const currForm = this.$refs["applyApiForm"];
      if (!this.hasLogIn) {
        //--20210111处理在未登录状况下,拉起登录页
        await UserModule.intranetCheckLogin();
      } else {
        //--202010112处理如果当前用户无团队信息需要选择团队
        if (Number(Cookies.get("supplierId")) === -1) {
          // 未选择过登陆团队
          await UserModule.handleGetTeamListInfo();
        } else {
          console.log("已选择过登陆团队...");
          // 获取该用户下面的所有app，如果获取到app为空，则提示请先入驻成为开发者或者去供应商下面创建应用
          request("/app/findAppInfoListNoPage").then((rsp) => {
            this.appList = rsp.data;
            this.applyApiDialogShow = true;
            this.applyApiForm.url = this.apiInfo.url;
            this.applyApiForm.name = this.apiInfo.name;
            this.applyApiForm.appId = "";
            this.applyApiForm.tps = "";
            this.applyApiForm.businessCase = "";
            if (currForm) {
              currForm.resetFields();
            }
          });
        }
      }
    },
    submit() {
      this.$refs.applyApiForm.validate((valid) => {
        if (valid) {
          const data = {
            instanceId: this.applyApiForm.instanceId,
            appKey: this.applyApiForm.selectApp.code,
            appName: this.applyApiForm.selectApp.name,
            tps: this.applyApiForm.tps,
            businessCase: this.applyApiForm.businessCase,
          };
          this.applyLoading = Loading.service({
            lock: true,
            text: "正在提交任务，请稍等",
            spinner: "el-icon-loading",
          });
          this.disabled = true;
          console.log("data", data);
          gwApiRequest
            .post("/HttpApiService/submitApiApply", [data])
            .then((rsp) => {
              if (rsp.code === 20000) {
                this.applyApiDialogShow = false;
                this.disabled = false;
                this.applyLoading.close();
                this.applySuccessDialog = true;
              } else {
                Message.error(rsp.message);
              }
            })
            .catch((e) => {
              this.disabled = false;
              try {
                this.applyLoading.close();
              } catch (e) {}
            });
          return false;
        }
        console.info("error");
        return false;
      });
    },
    /**
     * 跳转【控制台-应用管理-调用的API列表】
     * 前台跳控制台
     */
    gotoApiList() {
      window.location.href = `${window.location.origin}/admin/#/appManager/appTabs/${this.applyApiForm.selectApp.id}?tabName=304`;
      console.log(window.location.href, "window.location.href");
    },
  },
  mounted() {
    this.getHttpAPIDetail();
  },
};
</script>

<style lang="scss" scoped>
.mvn {
  word-break: normal;
  width: auto;
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
}

.text {
  text-align: center;
  font-size: 17px;
  margin: 8px auto;
}

.link {
  color: #3c6ef0;
  text-align: center;
}
.remark-content {
  white-space: pre-wrap;
  word-break: break-all
}
</style>