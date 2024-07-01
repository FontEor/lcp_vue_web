<template>
  <div class="my-wrap my-pd">
    <div class="apply-column">
      <h3 class="title">
        <span>申请使用</span>
      </h3>
      <Steps :active="active" :titleList="titleList" />
      <div class="apply-wrapper">
        <p class="apply-title">请仔细填写订阅信息</p>
        <el-form
          ref="productApplyDto"
          :model="productApplyDto"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="客户名称:" prop="costumerName">
            <span>{{ productApplyDto.costumerName }}</span>
          </el-form-item>

          <el-form-item label="您的行业:" prop="industry">
            <el-input
              v-model.number="productApplyDto.industry"
              placeholder="您的行业"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="订购产品:" prop="productCode">
            <span>{{ productName }}</span>
          </el-form-item>
          <el-form-item label="订阅版本:" prop="sysVersion">
            <el-select
              v-model="productApplyDto.sysVersion"
              value-key="id"
              placeholder="请选择版本"
            >
              <el-option
                v-for="sysVersion in sysVersions"
                :key="sysVersion.versionCode"
                :label="sysVersion.versionName"
                :value="{
                  id: sysVersion.id,
                  versionCode: sysVersion.versionCode,
                }"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="使用年限:" prop="timeLength">
            使用年限
            <el-input-number
              v-model.number="productApplyDto.timeLength"
              @change="handleChange"
              :precision="0"
              :min="1"
              :max="10"
            ></el-input-number>
            年
          </el-form-item>
          <el-form-item label="业务介绍:" prop="describe">
            <el-input
              v-model="productApplyDto.describe"
              :rows="3"
              maxlength="200"
              placeholder="业务介绍"
              resize="none"
              show-word-limit
              type="textarea"
            ></el-input>
          </el-form-item>
          <el-form-item prop="protocolChecked">
            <el-checkbox
              v-model="productApplyDto.protocolChecked"
              class="my-checkbox"
              >已阅读并同意</el-checkbox
            >
            <span>
              <router-link
                target="_blank"
                :to="{ path: this.licensePath }"
                style="color: #3c6ef0"
                >《京东物流软件服务许可协议》</router-link
              >
            </span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="apply-footer">
          <el-button @click="goBack">取 消</el-button>
          <el-button
            :loading="submitButtonLoading"
            :disabled="!this.productApplyDto.protocolChecked"
            type="primary"
            @click="onClickSubmitButton('productApplyDto')"
            >下一步</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Steps from "@/components/Steps.vue";
import productApi from "@/api/intranet/product/index";

export default {
  name: "Apply",
  components: {
    Steps,
  },

  data() {
    return {
      sysVersions: [],
      titleList: ["填写订阅信息", "完成"],
      active: 0,
      productName: "",
      productApplyDto: {
        costumerName: "",
        industry: "",
        sysVersion: {},
        supplierCode: "",
        supplierId: "",
        describe: "",
        productCode: "",
        timeLength: "",
        protocolChecked: false,
      },
      rules: {
        costumerName: [{ required: true, message: "请输入客户名称" }],
        industry: [{ required: true, message: "请输入您的行业" }],
        sysVersion: [{ required: true, message: "请至少选择一个订阅版本" }],
        timeLength: [{ required: true, message: "请选择使用年限" }],
        describe: [{ required: true, message: "请填写业务介绍" }],
      },
      submitButtonLoading: false,
      submitButtonDebounceTimer: null,
    };
  },
  async created() {
    this.productApplyDto.productCode = this.$route.params.productCode;
    console.log("传过来的productCode ： ", this.productApplyDto.productCode);
    this.licensePath = `${window.env.softwareLicense}`;
    // 这里面需要根据产品code来查询产品版本列表
    const params = this.productApplyDto.productCode;
    const result = await productApi.applyUse(params);
    this.productName = result.data.productName;
    this.sysVersions = result.data.sysVersionReleases;
    this.productApplyDto.costumerName = result.data.supplierName;
    this.productApplyDto.supplierCode = result.data.supplierCode;
    this.productApplyDto.supplierId = result.data.supplierId;
    console.log("applyUse 的 result ： ", JSON.stringify(result));
  },
  methods: {
    // 使用年限调整
    handleChange(currentValue, oldValue) {
      if (!/[0-9]+/.test(currentValue)) {
        currentValue = oldValue;
      }
      currentValue = Math.floor(currentValue);
      this.productApplyDto.timeLength = currentValue;
    },

    goBack() {
      window.close();
    },

    // 点击下一步,提交表单
    onClickSubmitButton(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          clearTimeout(this.submitButtonDebounceTimer);
          this.submitButtonDebounceTimer = setTimeout(async () => {
            this.submitButtonLoading = true;
            const {
              timeLength,
              costumerName,
              industry,
              sysVersion,
              supplierId,
              supplierCode,
              describe,
            } = this.productApplyDto;
            const productReleaseCode = this.$route.params.productCode;
            const { id, versionCode } = sysVersion;
            const data = {
              productReleaseCode,
              timeLength,
              costumerName,
              industry,
              sysVersionReleaseId: id,
              sysVersionReleaseCode: versionCode,
              supplierId,
              supplierCode,
              describe,
            };
            const result = await productApi.nextStep(data).catch((error) => {
              this.submitButtonLoading = false;
              throw new Error(`onClickSubmitButton, ${error}`);
            });
            if (result) {
              this.$router.push({
                name: "Result",
                params: { productCode: this.$route.params.productCode },
              });
            }
            this.submitButtonLoading = false;
          }, 300);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.apply-wrapper {
  margin: 0 auto;
  width: 480px;
  .apply-title {
    text-align: center;
    margin: 20px;
  }
  .apply-footer {
    text-align: center;
  }
}

.apply-column {
  .title {
    height: 68px;
    border-bottom: 2px solid #eaeaea;
    text-align: center;

    span {
      display: inline-block;
      padding: 19px;
      border-bottom: 2px solid #3c6ef0;
      line-height: 28px;
      font-family: PingFangSC-Medium;
      font-size: 20px;
      color: rgba(51, 51, 51, 1);
    }
  }
}
</style>
