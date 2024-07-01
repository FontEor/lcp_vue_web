<template>
  <div class="aboutus-page">
    <div class="mini-banner-view">
      <div class="com-wrapper">
        <h2 class="tit">与我们联系</h2>
      </div>
    </div>
    <div class="form-view">
      <el-form
        ref="aboutUsForm"
        :model="form"
        :rules="rules"
        label-width="100px"
        class="my-form"
      >
        <el-form-item label="联系人姓名" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入联系人姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="company">
          <el-input v-model="form.company" placeholder="公司名称"></el-input>
        </el-form-item>
        <el-form-item label="咨询产品" prop="product">
          <el-input v-model="form.product" placeholder="咨询产品"></el-input>
        </el-form-item>
        <el-form-item label="具体问题" prop="answer">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            v-model="form.answer"
            placeholder="具体问题"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="onSubmit('aboutUsForm')"
            >提 交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="bm-bg"></div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "AboutUs",
  data() {
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      const reg = /^1[3456789]\d{9}$/;
      console.log(reg.test(value));
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error("手机格式有误"));
      }
    };
    return {
      form: {
        name: "",
        phone: "",
        company: "",
        product: "",
        answer: "",
        type: -1,
      },
      rules: {
        name: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" },
        ],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        company: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
        ],
        product: [
          { required: true, message: "请输入要咨询的产品", trigger: "blur" },
        ],
        answer: [
          { required: true, message: "请填写您的问题", trigger: "blur" },
          {
            min: 1,
            max: 1024,
            message: "长度在 1 到 1024 个字符",
            trigger: "blur",
          },
        ],
      },
      feedbackform: {
        type: "",
        content: "",
      },
    };
  },
  methods: {
    onSubmit(formName) {
      const currForm = this.$refs[formName];
      currForm.validate((valid) => {
        if (valid) {
          this.feedbackform.content =
            this.form.name +
            "|" +
            this.form.phone +
            "|" +
            this.form.company +
            "|" +
            this.form.product +
            "|" +
            this.form.answer;
          request({
            url: "feedback/saveFeedback",
            method: "post",
            params: this.feedbackform,
          })
            .then((rsp) => {
              this.$message("问题相关已经提交");
              currForm.resetFields();
              this.$router.go(-1);
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          return false;
        }
      });
    },
  },
  created() {
    this.feedbackform.type = `8`;
  },
};
</script>

<style lang="scss" scoped>
.aboutus-page {
  min-height: calc(100vh - 60px - 136px);
  background: #fff url("~@/assets/img/aboutUs/bg1@2x.png") bottom center
    no-repeat;
  background-size: auto 460px;
}

.mini-banner-view {
  background: url("~@/assets/img/aboutUs/banner.jpg") top center no-repeat;
  background-size: auto 100%;
}

.form-view {
  padding: 60px 0;
  width: 100%;
  color: #fff;

  .my-form {
    width: 540px;
    margin: 0 auto;
  }
}
</style>
