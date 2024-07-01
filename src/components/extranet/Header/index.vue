<template>
  <div
    class="header scroll-header"
    :class="{
      'box-shadow-none': alwayWhiteHeader,
      white: alwayWhiteHeader,
    }"
  >
    <div class="header-inner jcbox">
      <div class="left-menu">
        <div class="menu-logo">
          <h1 style="display: none">京东物流开放平台</h1>
          <router-link class="inner-logo" :to="{ name: 'Home' }"></router-link>
        </div>
        <div class="center-menu">
          <!-- 能力中心下拉框 -->
          <div
            class="menu-solution power-center"
            @mouseenter="hoverPower('up')"
            @mouseleave="hoverPower('down')"
          >
            <div>
              <router-link
                class="solution-font"
                :to="{ name: 'CompetenceCenter' }"
                tag="a"
                target="_blank"
                >{{ $t("Header.index.5iwc0c4bkww0") }}</router-link
              >
              <i class="el-icon-arrow-down" />
            </div>
          </div>
          <!-- 解决方案下拉框 -->
          <div
            @mouseenter="changeDirection('up')"
            @mouseleave="changeDirection('down')"
            :clstag="clstag('', 'homeNew_1645519202450|3')"
            class="menu-solution header-solution"
          >
            <div>
              <span class="solution-font">{{
                $t("Header.index.5iwc0c4blk00")
              }}</span>
              <i class="el-icon-arrow-down" />
            </div>
          </div>
          <!-- 文档下拉框 -->
          <div
            @mouseenter="fileVisible = true"
            @mouseleave="fileVisible = false"
            class="menu-file"
          >
            <span class="file-font">{{ $t("Header.index.5iwc0c4blo00") }}</span>
            <i class="el-icon-arrow-down" />
            <div class="file-underline" v-if="fileVisible"></div>
            <div class="file-dropdown" v-if="fileVisible">
              <router-link
                :to="{ name: 'DevSupport', params: { docId: noviceGuideId } }"
                tag="a"
                target="_blank"
                class="file-link"
                >{{ $t("Header.index.5iwc0c4blqs0") }}</router-link
              >
              <router-link
                :to="{
                  name: 'DevSupport',
                  params: { docId: developmentDocumentationId },
                }"
                tag="a"
                target="_blank"
                class="file-link"
                >{{ $t("Header.index.5iwc0c4bltk0") }}</router-link
              >
              <router-link
                :to="{
                  name: 'DevSupport',
                  params: { docId: nounInterpretationId },
                }"
                tag="a"
                target="_blank"
                class="file-link"
                >{{ $t("Header.index.5iwc0c4blwk0") }}</router-link
              >
            </div>
          </div>
        </div>
      </div>

      <div class="right-menu">
        <div class="search-bar">
          <el-input
            clearable
            v-model="state"
            :placeholder="$t('Header.index.5iwc0c4blz00')"
            @keyup.enter.native="search"
            :clstag="clstag('', 'homeNew_1645519202450|4')"
          >
            <i slot="prefix" class="el-icon-search"></i>
          </el-input>
        </div>
        <el-button
          v-if="hasLogIn === false"
          @click="gotoOutConsole"
          type="text"
          class="notlogin-btn"
          >{{ $t("Header.index.5iwc0c4bm2g0") }}</el-button
        >
        <!--已登录状态 -->
        <el-button
          v-if="hasLogIn === true"
          @click="gotoDashBord"
          type="text"
          class="login-btn"
          >{{ $t("Header.index.5iwc0c4bm2g0") }}</el-button
        >
        <el-button
          v-if="hasLogIn === false"
          @click="goToIdaasLogin"
          type="text"
          class="notlogin-btn"
          >{{ $t("Header.index.5iwc0c4bm580") }}</el-button
        >
        <!--已登陆状态 begin-->
        <el-dropdown
          v-if="headImg && hasLogIn == true"
          class="avatar-container"
          trigger="click"
          placement="bottom"
        >
          <div class="avatar-wrapper">
            <img src="~@/assets/img/user-head.png" class="user-avatar" />
            <div class="user-name">
              <div class="name-content">{{ name }}</div>
              <div class="name-icon">
                <i class="el-icon-arrow-down" />
              </div>
            </div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="thisLogout">{{
              $t("Header.index.5iwc0c4bm7o0")
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--已登陆状态 end-->
      </div>
    </div>
    <!-- 解决方案下拉选 -->
    <div
      class="solution-dropdown"
      @mouseenter="changeDirection('up')"
      @mouseleave="changeDirection('down')"
    >
      <div class="dropdown-main">
        <el-tabs tab-position="left" class="dropdown-tabs">
          <el-tab-pane class="dropdown-sidebar">
            <span slot="label"
              >{{ $t("Header.index.5iwc0c4bma80")
              }}<i class="el-icon-arrow-right"></i
            ></span>
            <div>
              <span>{{ $t("Header.index.5iwc0c4bmcw0") }}</span>
              <div class="industry-scheme-div">
                <router-link
                  :to="{ name: 'WineWarehouse' }"
                  tag="a"
                  target="_blank"
                  class="consumer-goods"
                  >{{ $t("Header.index.5iwc0c4bmfg0") }}</router-link
                >
                <router-link
                  :to="{ name: 'FoodWarehouse' }"
                  tag="a"
                  target="_blank"
                  class="consumer-goods"
                  >{{ $t("Header.index.5iwc0c4bmi40") }}</router-link
                >
                <router-link
                  :to="{ name: 'MakeupWarehouse' }"
                  tag="a"
                  target="_blank"
                  class="consumer-goods"
                  >{{ $t("Header.index.5iwc0c4bmko0") }}</router-link
                >
                <router-link
                  :to="{ name: 'MaternalAndInfantWarehouse' }"
                  tag="a"
                  target="_blank"
                  class="consumer-goods"
                  >{{ $t("Header.index.5iwc0c4bmpk0") }}</router-link
                >
              </div>
            </div>
            <div>
              <span>{{ $t("Header.index.5iwc0c4bn001") }}</span>
              <div class="industry-scheme-div">
                <router-link
                  :to="{
                    name: '3CWarehouse',
                  }"
                  tag="a"
                  target="_blank"
                  class="consumer-goods"
                  >{{ $t("Header.index.5iwc0c4bn002") }}</router-link
                >
              </div>
            </div>
            <div>
              <span>{{ $t("Header.index.5iwc0c4bmsg0") }}</span>
              <div class="industry-scheme-div">
                <router-link
                  :to="{
                    name: 'ClothingWarehouse',
                  }"
                  tag="a"
                  target="_blank"
                  class="consumer-goods"
                  >{{ $t("Header.index.5iwc0c4bmuw0") }}</router-link
                >
              </div>
            </div>
            <div>
              <span>医药行业</span>
              <div class="industry-scheme-div">
                <router-link
                  :to="{
                    name: 'HospitalConvenienceExpress',
                  }"
                  tag="a"
                  target="_blank"
                  class="consumer-goods"
                  >医院便民快递解决方案</router-link
                >
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane class="dropdown-sidebar">
            <span slot="label"
              >{{ $t("Header.index.5iwc0c4bmxc0")
              }}<i class="el-icon-arrow-right"></i
            ></span>
            <div class="scenario-scheme-div">
              <router-link
                :to="{
                  name: 'ApiDocDetail',
                  params: { unitId: ScenarioUnitId, docId: ScenarioId },
                }"
                tag="a"
                target="_blank"
                class="consumer-goods"
                >{{ $t("Header.index.5iwc0c4bn000") }}</router-link
              >
            </div>
            <div class="scenario-scheme-div">
              <router-link
                :to="{
                  name: 'ApiDocDetail',
                  params: { unitId: 385, docId: 1687 },
                }"
                tag="a"
                target="_blank"
                class="consumer-goods"
                >企业寄件一体化解决方案</router-link
              >
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="dropdown-line"></div>
        <!-- <div class="solution-underline"></div> -->
      </div>
    </div>
    <!-- 能力中心浮层 -->
    <div
      class="header-power-center"
      @mouseenter="hoverPower('up')"
      @mouseleave="hoverPower('down')"
    >
      <div class="header-power-content" id="powerCenter">
        <div
          v-for="power in powerList"
          :key="power.id"
          class="header-power-item"
        >
          <h3>{{ power.classifyName }}<span class="my-tag" v-if="power.classifyCode === 'xiangmu'">仅我可见</span></h3>
          <hr />
          <template v-if="power.bizUnits && power.bizUnits.length">
            <p v-for="item in power.bizUnits" :key="item.id">
              <router-link
                :to="{ name: 'AccessGuide', params: { unitId: item.id } }"
                tag="a"
                target="_blank"
                class="consumer-goods"
                >{{ item.name }}</router-link
              >
            </p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserModule } from "@/store/common/modules/user";
import pageClick from "@/utils/pageClick";
import Cookies from "js-cookie";

import competenceCenter from "@/api/extranet/competenceCenter/index.ts";
// import { lockScroll } from "@/utils/lock";

let $header = null;

export default {
  props: {
    alwayWhiteHeader: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      state: "",
      fileVisible: false,
      noviceGuideId: "53220",
      developmentDocumentationId:
        window.env.developmentDocumentationId || 53209,
      nounInterpretationId: "53367",
      to3CUnitId: "273",
      to3CId: "53402",
      ScenarioUnitId: "210",
      ScenarioId: "718",
      clothesUnitId: "270",
      clothesId: "53389",
      powerList: [],
    };
  },
  computed: {
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
  },
  methods: {
    //点击事件埋点
    clstag(intranetId, extranetId) {
      return pageClick(intranetId, extranetId);
    },
    // 退出登录
    thisLogout() {
      UserModule.extranetLogout();
    },
    // 登录
    goToIdaasLogin() {
      UserModule.extranetCheckLogin();
    },
    // 未登录进入控制台
    gotoOutConsole() {
      let gotoUrl = `${window.location.origin}/admin/#/appManager`;
      UserModule.extranetCheckLogin(gotoUrl);
    },
    // 已登录进入控制台
    gotoDashBord() {
      const isDevelop = UserModule.user_develop;
      if (isDevelop === "yes") {
        UserModule.gotoAdmin();
      } else {
        if (Number(Cookies.get("supplierId")) === -1) {
          UserModule.saveOutDeveloper().then(() => {
            location.href = `${location.origin}/admin/#/appManager`;
          });
        } else {
          location.href = `${location.origin}/admin/#/appManager`;
        }
      }
    },
    search(event) {
      if (!this.state) {
        return;
      }
      const q = this.state;
      this.$router.push({ path: "/searchResult", query: { q } });
      this.state = "";
      event.target.blur();
    },
    changeDirection(style) {
      const headerSolution = document.querySelector(".header-solution");
      const solutionDropdown = document.querySelector(".solution-dropdown");
      if (style === "up") {
        solutionDropdown.classList.add("active");
        headerSolution.classList.add("active");
      } else if (style === "down") {
        solutionDropdown.classList.remove("active");
        headerSolution.classList.remove("active");
      }
    },
    hoverPower(style) {
      let menu = document.querySelector(".power-center");
      const solutionDropdown = document.querySelector(".header-power-center");
      const content = document.querySelector("#powerCenter");
      if (style === "up") {
        // 先不锁定了 页面滚动容器不统一 获取不过来
        // lockScroll.lock()
        solutionDropdown.classList.add("active");
        menu.classList.add("active");
      } else if (style === "down") {
        // lockScroll.unlock()
        try {
          content.scrollTo(0, 0);
        } catch (error) {}
        solutionDropdown.classList.remove("active");
        menu.classList.remove("active");
      }
    },
    // 能力中心数据获取
    async findClassifiedBizUnitList() {
      const response = await competenceCenter.findClassifiedBizUnitList();
      this.powerList = response.data;
    },
    // 滚动变色逻辑
    handleScroll() {
      if (!$header) {
        $header = document.querySelector(".scroll-header");
      }
      const top = document.documentElement.scrollTop || document.body.scrollTop;
      if (top) {
        $header.classList.add("active");
      } else {
        $header.classList.remove("active");
      }
    },
  },
  created() {
    this.findClassifiedBizUnitList();
  },
  mounted() {
    // 如果一直是白色导航条那么不绑定
    if (!this.alwayWhiteHeader) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables.scss";
@import "~@/assets/styles/mixin.scss";

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 60px;
  // background: #ecf0f3;
  background: transparent;
  transition: background-color 0.2s;
  border-bottom: 1px solid #e4e5e9;

  &:hover,
  &.active,
  &.white {
    .header-inner .right-menu .search-bar {
      ::v-deep.el-input__inner {
        background-color: #f5f5f5;
      }
    }
  }
  &:hover {
    background-color: white;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  }
  &.active {
    background-color: white;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  }
  // 其他的改成渐变背景了
  &.white {
    background: linear-gradient(
      90deg,
      rgba(247, 248, 249, 1) 0%,
      rgba(255, 255, 255, 1) 100%
    ) !important;
  }
  .header-inner {
    min-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    height: 100%;
    .left-menu {
      height: 100%;
      display: flex;
      .menu-logo {
        height: 100%;
        // margin-right: 15px;
        .inner-logo {
          display: block;
          width: 284.57px;
          height: 100%;
          background: url("~@/assets/img/logo/header-logo-blue.png") 24px center
            no-repeat;
          background-size: 227px 22px;
        }
      }
      .center-menu {
        width: 330px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: #000;
        .menu-capability-center {
          width: 110px;
          height: 60px;
          line-height: 60px;
          text-align: center;
        }
        .menu-solution {
          position: relative;
          width: 110px;
          height: 60px;
          line-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover {
            cursor: pointer;
            .el-icon-arrow-down {
              transform: rotate(0.5turn);
            }
          }
        }
        .menu-file {
          position: relative;
          width: 110px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            line-height: 60px;
          }
          .file-underline {
            position: absolute;
            height: 4px;
            width: 50px;
            top: 53px;
            background: #3c6ef0;
            border-radius: 10px;
          }
          &:hover {
            .el-icon-arrow-down {
              transform: rotate(0.5turn);
            }
          }
          .file-dropdown {
            background: #fff;
            padding: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            width: 110px;
            height: 150px;
            position: absolute;
            top: 60px;
            color: #333;
            box-shadow: 0 2px 4px 0 rgba(60, 110, 240, 0.15);
            .file-link:hover {
              color: #3c6ef0;
            }
          }
        }
        .solution-font,
        .file-font {
          padding-right: 8px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .right-menu {
      @include font-family;
      width: 508px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .search-bar {
        margin-right: 11px;
        width: 390px;
        ::v-deep.el-input__inner {
          width: 309px;
          height: 38px;
          padding-left: 41px;
          border-radius: 4px;
          border: 0;
          color: #23252b;
          background-color: #fff;
          &::-webkit-input-placeholder {
            color: rgba(82, 87, 101, 0.6);
          }
        }
        ::v-deep .el-input__prefix {
          left: 0;
          // line-height: 32px;
          color: #525765;
          font-size: 21px;
          margin: 0 11px;
        }
      }
      .notlogin-btn {
        padding: 0;
        margin: 0;
        border: 0;
        width: 73px;
        font-size: 16px;
        color: #23252b;
        line-height: 60px;
        text-align: center;
      }
      .login-btn {
        color: #23252b;
        width: 60px;
        height: 60px;
        font-size: 16px;
        text-align: center;
        margin-right: 12px;
      }
      .avatar-container {
        margin-right: 24px;
        .avatar-wrapper {
          width: 117px;
          height: 32px;
          margin: 0 9px;
          cursor: pointer;
          display: flex;
          align-items: center;
          .user-avatar {
            cursor: pointer;
            width: 32px;
            border-radius: 100px;
            vertical-align: middle;
          }
          .user-name {
            width: 87px;
            margin-left: 8px;
            display: flex;
            align-items: center;
            .name-content {
              max-width: 70px;
              color: #23252b;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 16px;
            }
            .name-icon {
              font-size: 14px;
              color: #23252b;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
  .solution-dropdown {
    position: absolute;
    height: 212px;
    width: 100%;
    top: 60px;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(60, 110, 240, 0.15);
    visibility: hidden;
    &.active {
      visibility: visible;
    }
    .dropdown-main {
      width: 1200px;
      height: 212px;
      margin: 0 auto;
      position: relative;
      .dropdown-tabs {
        .dropdown-sidebar {
          color: #3c6ef0;
          display: flex;
          flex: auto;
          font-size: 16px;
          .industry-scheme-div {
            display: flex;
            flex-wrap: wrap;
            height: 150px;
            width: 200px;
            padding: 20px 0;
            color: #666;
            font-size: 14px;
          }
          .consumer-goods:hover {
            color: #3c6ef0;
            cursor: pointer;
          }
          .scenario-scheme-div {
            font-size: 14px;
            color: #666;
          }
          .scenario-scheme-div > span:hover {
            color: #3c6ef0;
            cursor: pointer;
          }
        }
        .dropdown-sidebar > div {
          padding: 30px 10px;
          width: 300px;
        }
        ::v-deep .el-tabs__item {
          height: auto;
          line-height: 1.6;
          padding: 30px;
          font-size: 16px;
        }
        ::v-deep .el-tabs__nav-wrap::after {
          background: #fff;
        }
        ::v-deep .el-tabs__active-bar {
          background: #fff;
        }
        ::v-deep[class*=" el-icon-"],
        [class^="el-icon-"] {
          font-size: 14px;
          padding-left: 10px;
        }
      }
      .dropdown-line {
        position: absolute;
        top: 34px;
        left: 140px;
        width: 2px;
        height: 148px;
        background: #ececec;
      }
      .solution-underline {
        position: absolute;
        height: 4px;
        width: 80px;
        top: -7px;
        left: 425px;
        background: #3c6ef0;
        border-radius: 10px;
      }
    }
  }
  .header-solution {
    > div {
      position: relative;
      &::after {
        display: none;
        content: " ";
        position: absolute;
        height: 4px;
        width: 42px;
        bottom: -16px;
        // left: 14px;
        left: 15px;
        background: #3c6ef0;
        border-radius: 10px;
      }
    }
    &.active,
    &:hover {
      > div {
        &::after {
          display: block;
        }
      }
      .el-icon-arrow-down {
        transform: rotate(0.5turn);
      }
    }
  }
  .power-center {
    &.active {
      // > div {
      //   &::after {
      //     display: block;
      //   }
      // }
      .el-icon-arrow-down {
        transform: rotate(0.5turn);
      }
    }
    .el-icon-arrow-down {
      transform: rotate();
    }
    > div {
      position: relative;
      &::after {
        display: none;
        content: " ";
        position: absolute;
        height: 4px;
        width: 42px;
        bottom: -16px;
        // left: 14px;
        left: 15px;
        background: #3c6ef0;
        border-radius: 10px;
      }
    }
  }
  .header-power-center {
    display: none;
    width: 100%;
    max-height: 500px;
    overflow: hidden;
    background-image: url("~@/assets/img/power-center-hover.png"),
      linear-gradient(
        145.88deg,
        rgba(246, 251, 255, 1) 0%,
        rgba(255, 255, 255, 1) 100%
      );
    background-repeat: no-repeat;
    background-position: 98% 100%;
    background-size: 320px 240px, auto;
    box-shadow: 1px 4px 4px 1px rgba(142, 140, 147, 0.13);
    &.active {
      display: block;
    }
    .header-power-content {
      padding: 0 7px 30px 87px;
      display: flex;
      width: 100%;
      max-height: 500px;
      overflow-y: auto;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: flex-start;
    }
    .header-power-item {
      margin-top: 30px;
      margin-right: 30px;
      width: 210px;
      h3 {
        width: 100%;
        height: 22px;
        line-height: 22px;
        font-size: 16px;
        font-weight: 500;
        color: #3c6ef0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .my-tag{
          display:inline-block;
          font-size: 12px;
          height: 16px;
          line-height: 16px;
          padding: 0 4px;
          color:#fff;
          background: #e1251b;
          border-radius: 4px;
          margin-left: 6px;
        }
      }
      hr {
        margin: 10px 0;
        border-bottom: 1px solid #ececec;
      }
      p {
        line-height: 20px;
        font-size: 14px;
        color: #333333;
        margin-bottom: 8px;
        a {
          display: inline-block;
          width: 100%;
          height: 100%;
          &:hover {
            color: #3c6ef0;
          }
        }
      }
    }
  }
  .right-menu .search-bar {
    ::v-deep .el-input {
      .el-input__inner {
        padding-left: 41px !important;
      }
    }
  }
}
</style>
