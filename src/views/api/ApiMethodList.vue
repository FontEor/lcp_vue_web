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
      <span class="fr" style="margin-top: 12px" v-if="apiInstanceInfo.serviceType !== 'jsf'">
        <el-button type="primary" @click="showApplyDialog">申请使用</el-button>
      </span>
      <h3>{{ this.apiInfo.qualifiedName }}（{{ this.apiInfo.cnName }}）</h3>
      <p class="remark-content">{{ this.apiInfo.remark }}</p>
    </div>
    <div class="my-column" style="margin-top: 20px">
      <el-row class="fl-list mb1">
        <el-col :span="5"
          >所属分类：<span>{{ apiInstanceInfo.businessType }}</span></el-col
        >
        <el-col :span="5"
          >服务类型：<span>{{ apiInstanceInfo.serviceType }}</span></el-col
        >
        <el-col :span="5"
          >产品负责人：<span>{{ apiInstanceInfo.mainProd }}</span
          >&nbsp;<span
            style="cursor: pointer"
            title="联系咚咚"
            @click="openProdDongDong"
            ><img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABoUlEQVR42mL02/qCAQr0gPgXELMDcTAQewOxClTuEhC3AfEtIJYD4ttA/AQkARBALFAFIMWeQGwOxMpALMiAAA+hBkQDsQVUHmRYNUgSIIBgBvhCsTgQMyNp3gfEJ6ByukjidkDMBcTfAAKICWoIyNlSSJr/A/FKIL4IxNlomkHABoibQXoBAghkgBEQByJJ/gHiaUD8FaqZnwE7SANiY4AAAtkegaToNxDPh3olhAE/4AHiSIAAArnAEcnZG6GGEdIMA44AAQQyQAbKOQDEr4A4iIF4oAAQQExQp9wF4iNAHAfErCQYwAgQQKAwuA7Eh6ABycNAGjgPEEAgFzQBsTAQ6yBJgFLkayIM6AEIIJABV4HYCUnwPzSKQEl7Jx7NNUC8GSCAQAbIQxMRMgClPlAm2Q/EP9EMByWueGhyZgAIIBZoBmmHJk9rUMAA8RpohvkCxIVQdZ+A+CUQv0H2HkAAMSLlRl4gbgDidCDmRrIVpGEvVPM/IL4MxFugUc4AEEAsSAo/A3ExEK+GxogtEKtBo1UX6pXlQLwHmtzBACDAACc7Ss/mC7yUAAAAAElFTkSuQmCC"
          /></span>
        </el-col>
        <el-col :span="5"
          >研发负责人：<span>{{ apiInstanceInfo.mainDev }}</span
          >&nbsp;<span
            style="cursor: pointer"
            title="联系咚咚"
            @click="openDevDongDong"
            ><img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABoUlEQVR42mL02/qCAQr0gPgXELMDcTAQewOxClTuEhC3AfEtIJYD4ttA/AQkARBALFAFIMWeQGwOxMpALMiAAA+hBkQDsQVUHmRYNUgSIIBgBvhCsTgQMyNp3gfEJ6ByukjidkDMBcTfAAKICWoIyNlSSJr/A/FKIL4IxNlomkHABoibQXoBAghkgBEQByJJ/gHiaUD8FaqZnwE7SANiY4AAAtkegaToNxDPh3olhAE/4AHiSIAAArnAEcnZG6GGEdIMA44AAQQyQAbKOQDEr4A4iIF4oAAQQExQp9wF4iNAHAfErCQYwAgQQKAwuA7Eh6ABycNAGjgPEEAgFzQBsTAQ6yBJgFLkayIM6AEIIJABV4HYCUnwPzSKQEl7Jx7NNUC8GSCAQAbIQxMRMgClPlAm2Q/EP9EMByWueGhyZgAIIBZoBmmHJk9rUMAA8RpohvkCxIVQdZ+A+CUQv0H2HkAAMSLlRl4gbgDidCDmRrIVpGEvVPM/IL4MxFugUc4AEEAsSAo/A3ExEK+GxogtEKtBo1UX6pXlQLwHmtzBACDAACc7Ss/mC7yUAAAAAElFTkSuQmCC"
          /></span>
        </el-col>
        <el-col :span="4" v-if="apiInstanceInfo.serviceType !== 'jsf'"
          >状态：<span>{{ apiInstanceInfo.status }}</span></el-col
        >
      </el-row>
      <ApiMethodDocument
        v-if="tableData && tableData.length > 0"
        :initial-method-id="methodInfo.id"
        :initial-method-name="methodInfo.methodName"
        :initial-qualified-name="methodInfo.qualifiedName"
      ></ApiMethodDocument>
    </div>
    <el-dialog
      :visible="applyInstanceDialogShow"
      title="API申请"
      width="500px"
      @close="applyInstanceDialogShow = false"
    >
      <el-form
        ref="applyInstanceModel"
        :model="applyInstanceInfos"
        :rules="applyInstanceRules"
        label-width="120px"
      >
        <el-form-item label="API名称" prop="qualifiedName">
          <el-select
            v-model="applyInstanceInfos.instanceId"
            disabled
            placeholder="请选择实现"
          >
            <el-option
              v-for="ins in apiInstances"
              :key="ins.id"
              :label="ins.qualifiedName"
              :value="ins.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="中文名称" prop="cnName">
          <el-input
            v-model="applyInstanceInfos.cnName"
            disabled
            placeholder="中文名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="应用" prop="appId">
          <el-select
            v-model="applyInstanceInfos.appId"
            placeholder="请选择应用"
          >
            <el-option
              v-for="app in applierApps"
              :key="app.id"
              :label="app.name"
              :value="app.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="申请调用量" prop="tps">
          <el-input
            v-model.number="applyInstanceInfos.tps"
            placeholder="申请调用量"
          >
            <template slot="append">TPS</template>
          </el-input>
        </el-form-item>
        <el-form-item label="使用场景" prop="businessCase">
          <el-input
            v-model="applyInstanceInfos.businessCase"
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
        <el-button @click="applyInstanceDialogShow = false">取 消</el-button>
        <el-button :disabled="disabled" type="primary" @click="applyUseInstance"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 申请api使用成功弹框提示 -->
    <el-dialog
      :visible="showApplySuccessDialog"
      title="提示"
      width="500px"
      @close="showApplySuccessDialog = false"
    >
      <div class="text">申请成功，请等候审批结果通知</div>
      <p>
        审批通过后，请到
        <a class="link" @click="gotoApiList()">控制台-应用管理-调用的API列表</a>
        中查看申请的API
      </p>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showApplySuccessDialog = false"
          >关闭</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import { mapGetters } from "vuex";
import { Loading } from "@lui/lui-ui";
import { UserModule } from "@/store/common/modules/user";
import Pagination from "@/components/Pagination";
import ApiMethodDocument from "@/views/api/ApiMethodDocument";
import gwApiRequest from "@/utils/gwApiRequest.js";
import request_noMsg from "@/utils/request_noMsg.ts";
import Cookies from "js-cookie";

export default {
  name: "ApiMethodList",
  components: { ApiMethodDocument, Pagination },
  filters: {
    transControl(val) {
      let values = [];
      if (val.netEnvDisplay) {
        values.push("网络环境:" + val.netEnvDisplay);
      }
      if (val.accountSystemDisplay) {
        values.push("账号体系:" + val.accountSystemDisplay);
      }
      if (val.userTerminalDisplay) {
        values.push("使用环境:" + val.userTerminalDisplay);
      }
      //--登录态校验
      const loginCheck = val.loginCheck;
      if (loginCheck) {
        if (loginCheck === 1) {
          values.push("登录态校验:否");
        }
        if (loginCheck === 2) {
          values.push("登录态校验:是");
        }
      }

      const mtpConfig = val.mtpConfig;
      if (mtpConfig) {
        const transferEncrypt = mtpConfig.transferEncrypt;
        if (transferEncrypt) {
          if (transferEncrypt.is_open === 1) {
            values.push("安全加密:是");
          }
          if (transferEncrypt.is_open === 0) {
            values.push("安全加密:否");
          }
        }

        const contextWrite = mtpConfig.contextWrite;
        if (contextWrite) {
          if (contextWrite.is_open === 1) {
            values.push("上下文写入:是");
          }
          if (contextWrite.is_open === 0) {
            values.push("上下文写入:否");
          }
        }

        const actAccount = mtpConfig.actAccount;
        if (actAccount) {
          if (actAccount.is_open === 1) {
            values.push("从物流开放平台接收用户账号:是");
          }
          if (actAccount.is_open === 0) {
            values.push("从物流开放平台接收用户账号:否");
          }
        }
      }

      if (values.length > 0) return values.join(" | ");
      else return "";
    },
  },
  data() {
    return {
      activeName: "first",
      apiName: "",
      hasLogIn: UserModule.loginState,
      apiInstanceInfo: {
        businessType: "",
        serviceType: "",
        mainProd: "",
        mainDev: "",
        mainProdPin: "",
        mainDevPin: "",
        status: "",
        mvn: "",
      },
      disabled: false,
      apiInfo: {
        qualifiedName: "",
        cnName: "",
        remark: "",
      },
      tableData: [],
      applyInstanceDialogShow: false,
      apiInstances: [],
      applierApps: [],
      applyInstanceInfos: {
        instanceId: "",
        qualifiedName: "",
        cnName: "",
        appId: "",
        tps: "",
        businessCase: "",
      },
      applyInstanceRules: {
        qualifiedName: [{ required: true, message: "请选择实现" }],
        cnName: [{ required: true, message: "请填入实现中文名" }],
        appId: [{ required: true, message: "请选择App" }],
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
      listQuery: {
        searchKeyWord: "",
        total: 1,
        pageNumb: 1,
        pageSize: 10,
        pageSizes: [10, 20, 40, 60],
      },
      methodTableData: [],
      howToCallDialogVisible: false,
      howToCallManual: "",
      showApplySuccessDialog: false,
      appId: 1,
    };
  },
  computed: {
    ...mapGetters(["headImg", "name", "develop"]),
    language() {
      return "zh_CN";
    },
    methodInfo() {
      const { qualifiedName, methodName, id = 0 } = this.$route.query;
      const methodObj = { qualifiedName, methodName, id };
      const firstId = this.tableData[0].id;
      const firstName = this.tableData[0].name;
      return methodName
        ? methodObj
        : { qualifiedName, methodName: firstName, id: firstId };
    },
  },
  methods: {
    // 查询API文档
    async findApiBaseInfoRelease() {
      const url = "/ApiDepotService/findApiBaseInfoRelease";
      const qualifiedName = this.apiName;
      const data = [{ qualifiedName }];
      return await gwApiRequest.post(url, JSON.stringify(data));
    },
    async queryApiMethodRelease() {
      const url = "/ApiDepotService/queryApiMethodRelease";
      const qualifiedName = this.apiName;
      const data = [{ qualifiedName }];
      return await gwApiRequest.post(url, JSON.stringify(data));
    },
    async findApiForWeb() {
      const url = "/ApiDepotService/findApiForWeb";
      const qualifiedName = this.apiName;
      const data = [{ qualifiedName }];
      return await gwApiRequest.post(url, JSON.stringify(data));
    },
    async submitApiApply() {
      const response = await this.getApp().catch(() => {
        throw new Error("submitApiApply getApp");
      });
      const appKey = response.data.data.code;
      const url = "/ApiDepotService/submitApiApply";
      const applyInstanceInfos = JSON.parse(
        JSON.stringify(this.applyInstanceInfos)
      );
      delete applyInstanceInfos.instanceId;
      applyInstanceInfos.appKey = appKey;
      const data = [{ ...applyInstanceInfos }];
      return await gwApiRequest.post(url, JSON.stringify(data));
    },
    async getApp() {
      const {
        applyInstanceInfos: { appId },
      } = this;
      const id = appId;
      const params = { id };
      return await request_noMsg
        .get("/app/getApp", { params })
        .catch((error) => {
          const { message } = error.data;
          message && this.$message.error(message);
          throw new Error("getApp");
        });
    },

    rowClassName({ row, rowIndex }) {
      row.number = rowIndex + 1;
    },

    openProdDongDong() {
      window.location.href = `timline://chat/?topin=${this.apiInstanceInfo.mainProdPin}`;
    },
    openDevDongDong() {
      window.location.href = `timline://chat/?topin=${this.apiInstanceInfo.mainDevPin}`;
    },

    async showApplyDialog() {
      const currForm = this.$refs["applyInstanceModel"];
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
            this.applierApps = rsp.data;
            this.applyInstanceDialogShow = true;
            this.applyInstanceInfos.appId = "";
            this.applyInstanceInfos.tps = "";
            this.applyInstanceInfos.businessCase = "";
            if (currForm) {
              currForm.resetFields();
            }
          });
        }
      }
    },

    applyUseInstance() {
      this.$refs.applyInstanceModel.validate(async (valid) => {
        if (valid) {
          this.applyLoading = Loading.service({
            lock: true,
            text: "正在提交任务，请稍等",
            spinner: "el-icon-loading",
          });
          this.disabled = true;
          await this.submitApiApply().catch(() => {
            this.disabled = false;
            this.applyLoading.close();
            throw new Error("applyUseInstance submitApiApply");
          });
          this.applyInstanceDialogShow = false;
          this.disabled = false;
          this.applyLoading.close();
          this.showApplySuccessDialog = true;
        } else {
          return false;
        }
      });
    },
    async getApiInfo() {
      const response = await this.findApiBaseInfoRelease().catch(() => {
        throw new Error("getApiInfo findApiBaseInfoRelease");
      });
      const { data } = response;
      const { cnName } = data;
      this.apiInfo = data;
      this.applyInstanceInfos.cnName = cnName;
    },
    async getApiMethodList() {
      const response = await this.queryApiMethodRelease().catch(() => {
        throw new Error("getApiMethodList queryApiMethodRelease");
      });
      const { data } = response;
      this.tableData = data;
    },
    async getApiInstanceInfo() {
      const response = await this.findApiForWeb().catch(() => {
        throw new Error("getApiInstanceInfo findApiForWeb");
      });
      const { data } = response;
      this.apiInstances = data;
      if (data.length > 0) {
        const [first] = data;
        this.applyInstanceInfos.instanceId = first.id;
        this.apiInstanceInfo.serviceType =
          first.serviceType === 1 ? "jsf" : "http";
        let temp = first.mainDev.split(":");
        this.apiInstanceInfo.mainDev = temp[1];
        this.apiInstanceInfo.mainDevPin = temp[0];
        temp = first.mainProd.split(":");
        this.apiInstanceInfo.mainProd = temp[1];
        this.apiInstanceInfo.mainProdPin = temp[0];
        this.apiInstanceInfo.status = first.status === 1 ? "初始化" : "运行中";
        this.apiInstanceInfo.businessType = first.businessCategoryName;
        this.apiInstanceInfo.mvn = first.mvn;
        this.appId = first.appId;
        console.log(this.appId, "this.appId");
      }
    },
    /**
     * 跳转【控制台-应用管理-调用的API列表】
     * 前台跳控制台
     */

    gotoApiList() {
      window.location.href = `${window.location.origin}/admin/#/appManager/appTabs/${this.applyInstanceInfos.appId}?tabName=304`;
      console.log(window.location.href, "window.location.href");
    },
  },
  created() {
    this.apiName = this.$route.query.qualifiedName;
    this.applyInstanceInfos.qualifiedName = this.$route.query.qualifiedName;
    this.getApiInfo();
    this.getApiMethodList();
    this.getApiInstanceInfo();
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
