<template>
  <!-- 登录 -->
  <div class="login-index">
    <header class="login-head">
      <div class="cbox head-con">
        <h1 class="logo ti">JDL京东物流</h1>
      </div>
    </header>
    <div class="con-box">
      <div class="con-left"></div>

      <div class="logo-form">
        <p class="warning-info cbox" v-if="this.showtips">
          <i class="el-icon-warning"></i>
          <span class="info flex1">{{ tips }}</span>
          <i @click="closeWarnning" class="el-icon-close"></i>
        </p>
        <h3 class="title">选择登录团队</h3>
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item prop="info">
            <el-select
              v-model="form.info"
              value-key="id"
              placeholder="团队名称"
              size="big"
            >
              <el-option
                v-for="item in teamList"
                :key="item.id"
                :label="item.name"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="create">
            <el-button type="text" @click="showTeamBox">创建团队</el-button>
            <!-- <el-button type="text" @click="createTeam">创建我的团队</el-button> -->
          </div>
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
        </el-form>
      </div>

      <!-- 创建团队 -->
      <div class="logo-form team-form" v-if="isShowTeamForm">
        <h3 class="title">创建团队</h3>
        <el-form :model="teamForm" ref="teamForm" :rules="teamRules">
          <el-form-item prop="name">
            <el-input v-model="teamForm.name" placeholder="请输入团队名称" size="big"></el-input>
          </el-form-item>
          <div class="btn-box">
            <el-button type="primary" @click="createTeam('teamForm')">创建</el-button>
            <el-button @click="prevTeamForm">上一步</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { UserModule } from "@/store/common/modules/user";
import Cookies from "js-cookie";
import lcp from "@/api/intranet/lcp/index";

export default {
  name: "ChooseSupplier",
  data() {
    return {
      teamList: [],
      showtips: false,
      tips: "",
      form: {
        info: "",
      },
      rules: {
        info: [{ required: true, message: "请选择登录团队" }],
      },
      teamForm:{
        name: '',
      },
      teamRules:{
        name: [{ required: true, message: "请输入新的团队名称", trigger: "blur"},{ min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }],
      },
      isShowTeamForm: false,
    };
  },
  computed: {
    user_develop() {
      return UserModule.user_develop;
    },
    supplierId() {
      return Number(Cookies.get("supplierId"));
    },
  },

  methods: {
    // 内网用户自动化入驻
    async saveDeveloper() {
      await lcp.user.saveDeveloper().catch((error) => {
        throw new Error(`saveDeveloper, ${error}`);
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("表单数据", this.form);
          this.chooseSupplier(this.form.info);
          //this.updateUserInfo()
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async chooseSupplier(info) {
      const { id, code } = info;
      try {
        await request({
          url: "/user/chooseSupplier",
          method: "get",
          params: { supplierId: id },
        });
        //2021/1/28将supplierId值存入cookie，在同一浏览器各Tab中共享supplierId值
        Cookies.set("supplierId", id);
        Cookies.set("groupCode", code);
        await this.updateUserInfo();
        this.gotoNewLink();
      } catch (error) {
        console.log(error);
      }
    },
    async handleGetTeamListInfo() {
      await request({
        url: "/user/getTeamListInfo",
        method: "post",
      })
        .then((rsp) => {
          this.teamList = rsp.data;
          this.form.info = this.teamList[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //获取用户信息设置vuex里的值
    async updateUserInfo() {
      console.log("进入userinfo");
      await request("/hrInfo/getUserInfo")
        .then((res) => {
          Cookies.set("supplierId", res.data.supplierId);
          UserModule.SET_USER_DEVELOP(res.data.develop);
          console.log("vuex里的user_develop:", UserModule.user_develop);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    gotoNewLink() {
      //--根据当前用户的重定向地址进行跳转
      const redirectUrl = UserModule.redirectUrl || "";
      const redirectNextLink = sessionStorage.getItem("redirectNextLink");
      const index = redirectUrl.indexOf("home");
      //需要先判断要跳向的地址是否存在，再来判断跳转前的redirectUrl是否存在
      //用户进入控制台之后一定是登陆态，不再需要回调地址
      if (redirectNextLink) {
        window.location.href = redirectNextLink;
      } else if (redirectUrl && index == -1) {
        // 如果重定向的目标页面是 chooseSupplier
        // 并且当前页面的路由也是 chooseSupplier
        if (
          redirectUrl.indexOf("/#/chooseSupplier") !== -1 &&
          location.href.indexOf("/#/chooseSupplier") !== -1
        ) {
          // 那么回到首页
          this.$router.push("/home");
        } else {
          // 否则正常跳转
          window.location.href = redirectUrl;
        }
      } else {
        this.$router.push("/home");
      }
    },
    closeWarnning() {
      this.showtips = false;
    },

    // 创建团队
    showTeamBox() {
      this.isShowTeamForm = true;
    },

    // 上一步创建团队
    prevTeamForm(){
      this.isShowTeamForm = false;
      this.teamForm.name = '';
    },

    // 创建团队
    async createTeam(teamForm) {
      this.$refs[teamForm].validate(async (valid) => {
        if (valid) {
          try {
              await request({
                url: "/supplier/createCustomizeTeam",
                method: "post",
                params: { name: this.teamForm.name },
              });
              this.$message.success("创建成功！");
              this.isShowTeamForm = false;
              this.handleGetTeamListInfo();
            } catch (error) {
              console.log(error);
            }
          } else {
            console.log("error submit!!");
            return false;
          }
      })
    }
  },
  async created() {
    await this.saveDeveloper();
    await this.handleGetTeamListInfo();
  },
};
</script>

<style lang="scss" scoped>
.login-index {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: #3c6ef0 url("~@/assets/img/logo/bg.jpg") no-repeat center 80%;
  background-size: cover;

  .con-box {
    flex: 1;
    position: relative;
    margin: 0 auto 136px;
    width: 1200px;
  }

  .login-head {
    position: relative;
    z-index: 10;
    height: 80px;
    background-color: #3c6ef0;

    .head-con {
      margin: auto;
      width: 1200px;
      height: 100%;
    }

    .logo {
      width: 333px;
      height: 100%;
      background: url("~@/assets/img/logo/header-logo.png") no-repeat left
        center;
      background-size: 333px 30px;
    }
  }

  .con-left {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-60%);
    width: 570px;
    height: 440px;
    background: url("~@/assets/img/logo/con-left-bg.png") no-repeat;
    background-size: contain;
  }

  .logo-form {
    position: absolute;
    right: 0;
    top: 50%;
    padding: 35px 35px 50px;
    width: 460px;
    margin-top: -180px;
    min-height: 300px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.09);
    z-index: 999;

    .warning-info {
      position: absolute;
      top: -56px;
      left: 0;
      width: 100%;
      padding-left: 10px;
      height: 54px;
      line-height: 24px;
      font-size: 14px;
      color: #f4821f;
      background: rgba(253, 242, 232, 1);
      border: 1px solid rgba(251, 219, 191, 1);
      border-radius: 4px;
      z-index: 999;

      .el-icon-warning {
        margin-right: 10px;
        color: #f4821f;
        font-size: 18px;
      }

      .el-icon-close {
        color: #9c9c9c;
        cursor: pointer;
        width: 32px;
        height: 32px;
        text-align: center;
        line-height: 32px;
      }
    }

    .title {
      padding-bottom: 30px;
      font-size: 22px;
      color: #323232;
    }

    .create {
      padding-top: 28px;
      margin-bottom: 0;
      text-align: left;
    }

    .el-button--primary {
      margin-left: 0;
      width: 100%;
      padding: 12px 16px;
      font-size: 16px;
      color: #fff;
      background: linear-gradient(
        45deg,
        rgba(60, 110, 240, 1) 0%,
        rgba(65, 138, 255, 1) 100%
      );
      border-radius: 2px;

      &:hover {
        background: linear-gradient(
          45deg,
          rgba(65, 138, 255, 1) 0%,
          rgba(60, 110, 240, 1) 100%
        );
      }
    }
    
  }

  .team-form{
    z-index: 1000;
  }
  .btn-box{
    display: flex;
    margin-top: 80px;
    button{
      flex: 1;
      border-radius:2px;
      font-size: 16px;
    }
  }

}
</style>
