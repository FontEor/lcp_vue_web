<template>
  <!-- 内网首页顶栏 -->
  <div class="navbar-wrap">
    <div class="navbar" :class="[classObj]">
      <div class="navbar-top">
        <div class="navbar-top-inner jcbox">
          <div class="logo-wrap">
            <router-link
              class="navbar-logo"
              to="/"
              :clstag="clstag('index_1618992416097|1', 'index_1618993059625|1')"
            ></router-link>
          </div>
          <div class="right-menu">
            <div class="search-bar">
              <el-input
                clearable
                v-model="state"
                placeholder="输入关键字搜索"
                suffix-icon="el-icon-search"
                :clstag="
                  clstag('index_1618992416097|2', 'index_1618993059625|2')
                "
                @keyup.enter.native="search"
              ></el-input>
            </div>

            <template v-if="hasLogIn">
              <a
                :clstag="clstag('', 'index_1618993059625|4')"
                href="#/mySystem"
                class="router-link"
                >我的系统</a
              >
              <el-button
                plain
                class="btn"
                :clstag="clstag('index_1618992416097|7', '')"
                @click="gotoDashBord"
                >控制台</el-button
              >
              <el-dropdown
                v-if="headImg"
                class="avatar-container"
                trigger="click"
              >
                <div class="avatar-wrapper">
                  <img :src="headImg" class="user-avatar" />
                  <span class="user-name">{{ name }}</span>
                  <i class="el-icon-arrow-down" />
                </div>
                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                  <el-dropdown-item @click.native="changeTeam">切换团队</el-dropdown-item>
                  <el-dropdown-item @click.native="thisLogout"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <template v-else>
              <a
                :clstag="clstag('', 'index_1618993059625|4')"
                class="router-link"
                @click="onClickMySystemButton"
                >我的系统</a
              >
              <a
                :clstag="clstag('index_1618992416097|6', '')"
                class="router-link"
                @click="onClickLogInButton"
                >登录</a
              >
              <el-button
                plain
                class="btn"
                :clstag="clstag('index_1618992416097|7', '')"
                @click="onClickConsoleButton"
                >控制台</el-button
              >
            </template>
          </div>
        </div>
      </div>
      <div class="navbar-bm">
        <el-menu
          :default-active="activeIndex"
          class="navbar-menu"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="/">
            <router-link
              to="/"
              class="router-link"
              :clstag="clstag('index_1618992416097|8', 'index_1618993059625|7')"
              >首页</router-link
            >
          </el-menu-item>
          <el-menu-item index="/product">
            <router-link
              to="/product"
              class="router-link"
              :clstag="
                clstag('index_1618992416097|11', 'index_1618993059625|10')
              "
              >产品</router-link
            >
          </el-menu-item>
          <el-menu-item index="/apiStore">
            <router-link
              to="/apiStore"
              class="router-link"
              :clstag="clstag('index_1618992416097|3', '')"
              >API仓库</router-link
            >
          </el-menu-item>
          <el-menu-item index="/helpDocument">
            <router-link
              to="/helpDocument"
              class="router-link"
              :clstag="clstag('index_1618992416097|4', 'index_1618993059625|3')"
              >文档中心</router-link
            >
          </el-menu-item>
        </el-menu>
      </div>
    </div>

    <el-dialog
      title="选择团队"
      :visible="teamDialogVisible"
      width="460px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <div class="team-select">
        <el-select
          v-model="teamInfo"
          value-key="id"
          placeholder="团队名称"
          size="big"
          style="width:100%"
        >
          <el-option
            v-for="item in teamList"
            :key="item.id"
            :label="item.name"
            :value="item"
          ></el-option>
        </el-select>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="chooseSupplier"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { SappModule } from "@/store/common/modules/app";
import { UserModule } from "@/store/common/modules/user";
import request from "@/utils/request";
import pageClick from "@/utils/pageClick";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      isShowInp: true,
      activeIndex: "/",
      searchResult: [],
      state: "",
      teamDialogVisible: false,
      teamInfo: undefined,
      teamList: []
    };
  },
  computed: {
    computeIsShow() {
      const path = `/${this.$route.path.split("/")[1]}`;
      const routerTable = [
        "/newHand",
        "/apiNewHand",
        "/qs",
        "/docSoftwareSystem",
        "/devSupport",
      ];
      return routerTable.includes(path);
    },
    isFixed() {
      return SappModule.isNavbarFixed;
    },
    classObj() {
      return {
        isFixed: SappModule.isNavbarFixed,
      };
    },

    hasLogIn() {
      return UserModule.loginState;
    },

    headImg() {
      return UserModule.headImg;
    },
    name() {
      return UserModule.name;
    },
    user_develop() {
      return UserModule.user_develop;
    },
    routePath() {
      console.log(`computed:${this.$route.path}`);
      // if (this.$route.path === '/searchResult') {
      //   this.isShowInp = false
      // } else {
      //   this.isShowInp = true
      // }
      if (this.$route.path === "/home") {
        this.activeIndex = "/";
      } else if (
        this.$route.path.indexOf("/apiMethodList") !== -1 ||
        this.$route.path.indexOf("/apiMethodDocument") !== -1 ||
        this.$route.path.indexOf("/apiTestMainPage") !== -1 ||
        this.$route.path.indexOf("/apiStore") !== -1
      ) {
        this.activeIndex = "/apiStore";
      } else if (
        this.$route.path.indexOf("/newHand") !== -1 ||
        this.$route.path.indexOf("/devSupport") !== -1 ||
        this.$route.path.indexOf("/question") !== -1 ||
        this.$route.path.indexOf("/apiNewHand") !== -1 ||
        this.$route.path.indexOf("/docSoftwareSystem") !== -1
      ) {
        this.activeIndex = "/helpDocument";
      } else if (
        this.$route.path.indexOf("/productDetail") !== -1 ||
        this.$route.path.indexOf("/apply") !== -1 ||
        this.$route.path.indexOf("/product") !== -1
      ) {
        this.activeIndex = "/product";
      } else {
        this.activeIndex = this.$route.path;
      }
    },
  },
  watch: {
    routePath(newValue, oldValue) {
      // if (this.$route.path === '/searchResult') {
      //   this.isShowInp = false
      // } else {
      //   this.isShowInp = true
      // }
      if (this.$route.path === "/home") {
        this.activeIndex = "/";
      } else if (
        this.$route.path.indexOf("/apiMethodList") !== -1 ||
        this.$route.path.indexOf("/apiMethodDocument") !== -1 ||
        this.$route.path.indexOf("/apiTestMainPage") !== -1 ||
        this.$route.path.indexOf("/apiStore") !== -1
      ) {
        this.activeIndex = "/apiStore";
      } else if (
        this.$route.path.indexOf("/newHand") !== -1 ||
        this.$route.path.indexOf("/devSupport") !== -1 ||
        this.$route.path.indexOf("/question") !== -1 ||
        this.$route.path.indexOf("/apiNewHand") !== -1 ||
        this.$route.path.indexOf("/docSoftwareSystem") !== -1
      ) {
        this.activeIndex = "/helpDocument";
      } else if (
        this.$route.path.indexOf("/productDetail") !== -1 ||
        this.$route.path.indexOf("/apply") !== -1 ||
        this.$route.path.indexOf("/product") !== -1
      ) {
        this.activeIndex = "/product";
      } else {
        this.activeIndex = this.$route.path;
      }
    },
  },
  methods: {
    // 点击事件埋点
    clstag(intranetId, extranetId) {
      return pageClick(intranetId, extranetId);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    thisLogout() {
      UserModule.intranetLogout();
    },
    async onClickLogInButton() {
      await UserModule.intranetCheckLogin().catch((error) => {
        throw new Error(`onClickLogInButton, ${error}`);
      });
    },
    async onClickConsoleButton() {
      let redirectNextLink = `http://${window.location.host}/admin/`;
      const index = redirectNextLink.indexOf("sso_service_ticket=");
      if (index > -1) {
        redirectNextLink = redirectNextLink.substring(0, index - 1);
      }
      sessionStorage.setItem("redirectNextLink", redirectNextLink);
      await UserModule.intranetCheckLogin().catch((error) => {
        throw new Error(`onClickConsoleButton, ${error}`);
      });
    },
    async onClickMySystemButton() {
      let redirectNextLink = `http://${window.location.host}/#/mySystem`;
      const index = redirectNextLink.indexOf("sso_service_ticket=");
      if (index > -1) {
        redirectNextLink = redirectNextLink.substring(0, index - 1);
      }
      sessionStorage.setItem("redirectNextLink", redirectNextLink);
      await UserModule.intranetCheckLogin().catch((error) => {
        throw new Error(`onClickMySystemButton, ${error}`);
      });
    },

    gotoDashBord() {
      const isDevelop = UserModule.user_develop;
      console.log(UserModule.headImg);
      console.log(`用户Pin: ${UserModule.user_pin}`);
      console.log(`用户名: ${UserModule.name}`);
      console.log(`用户类型: erp`);
      console.log(`开发者身份: ${isDevelop}`);
      // isDevelop='no'
      if (isDevelop === "yes") {
        UserModule.gotoAdmin();
      } else {
        // --如果不是开发者,判断用户类型
        // 2020/12/18 feat:选择了团队才能绑定开发者身份信息，内网develop==='no',判断是否有团队信息，
        console.log("develop===no");
        this.handleGetTeamListInfo();
      }
    },

    handleGetTeamListInfo() {
      request({
        url: "/user/getTeamListInfo",
        method: "post",
      })
        .then((rsp) => {
          if (rsp.data.length !== 0) {
            // 有团队信息，->选择团队
            console.log("有团队信息，->选择团队");
            window.location.href = `${window.location.origin}/#/chooseSupplier`;
          } else {
            // 无团队信息->回到首页
            console.log("无团队信息->回到首页");
            window.location.href = `${window.location.origin}/#/home`;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    search(event) {
      console.log("search");
      if (!this.state) {
        return;
      }
      const q = this.state;
      this.$router.push({ path: "/searchResult", query: { q } });
      this.state = "";
      event.target.blur();
    },


    changeTeam(){
      this.teamDialogVisible = true;
      this.getTeamListInfo();
    },

    async getTeamListInfo() { 
      try { 
        const res =await request({url: "/user/getTeamListInfo", method: "post",})
        this.teamList = res.data; 
        const supplierId = Cookies.get('supplierId');
        this.teamInfo = this.teamList.find(team => team.id == supplierId);
      } 
      catch (error) { 
        console.log(error); 
      } 
    },

    handleClose() {
      this.teamDialogVisible = false;
    },

    chooseSupplier() {
      Cookies.set("supplierId", this.teamInfo.id);
      Cookies.set("groupCode", this.teamInfo.code);
      this.$message({
            type: "success",
            message: "切换团队成功!",
          });
      
      this.teamDialogVisible = false;
      this.$router.go(0)
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables.scss";

.navbar-wrap {
  height: $navHeight;
}

.navbar {
  transition: width 0.28s;
  height: $navHeight;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(60, 110, 240, 0.15);

  &.isFixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
}

.navbar-top {
  height: 60px;
  background: #3c6ef0;
  .navbar-top-inner {
    width: 1200px;
    margin: 0 auto;
    height: 100%;
  }
  .logo-wrap {
    height: 100%;
    padding-right: 50px;

    .navbar-logo {
      display: block;
      padding: 16px 0;
      width: 333px;
      height: 100%;
      padding: 16px 0;
      background: url("~@/assets/img/logo/header-logo.png") top 18px center
        no-repeat;
      background-size: 333px 30px;
    }
  }

  .right-menu {
    ::v-deep .search-bar {
      position: relative;
      display: inline-block;
      margin: 0 12px;

      .el-input__inner {
        width: 220px;
        border-radius: 0;
        color: #fff;
        border: 0;
        background: #3360d5;
        &::-moz-placeholder {
          color: rgba(255, 255, 255, 0.3);
          opacity: 1;
        }

        &:-ms-input-placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        &::-webkit-input-placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
      }
      .el-input__icon {
        color: #fff;
      }

      .search-btn {
        position: absolute;
        top: 0;
        right: 0;
        width: 32px;
        height: 32px;
      }
    }

    .router-link {
      display: inline-block;
      line-height: 60px;
      padding: 0 12px;
      color: #fff;
      .el-icon-arrow-down {
        margin-left: 2px;
      }
    }

    .btn {
      margin-left: 12px;
      padding-left: 20px;
      padding-right: 20px;
      border-radius: 0;
      color: #3c6ef0;
    }
  }

  .avatar-container {
    padding: 0 12px;

    .avatar-wrapper {
      cursor: pointer;

      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 100px;
        vertical-align: middle;
      }

      .user-name {
        display: inline-block;
        padding: 0 8px;
        color: #f0f0f0;
      }

      .el-icon-arrow-down {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        font-size: 12px;
        color: #f0f0f0;
      }
    }
  }
}

.navbar-bm {
  width: 1200px;
  margin: 0 auto;
  ::v-deep .navbar-menu {
    border-bottom: none;

    .el-menu-item {
      padding: 0;

      .router-link {
        display: block;
        padding: 0 16px;
        color: #333;
        font-size: 16px;
        cursor: pointer;

        &.is-active,
        &:hover {
          .router-link {
            color: #3c6ef0;
          }
        }
      }
    }
  }
}

.body-mask {
  position: fixed;
  top: $navHeight;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 130;
  background: rgba(0, 0, 0, 0.3);
}
.team-select{
  padding: 20px 0;
}
</style>
