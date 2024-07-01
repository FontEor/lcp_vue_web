<template>
  <div>
    <div class="fixed-box" ref="fixed">
      <div class="aside-fixed">
        <div class="aside-fixed-box">
          <a
            href="/#/question-docs"
            target="_blank"
            :clstag="clstag('', 'floatingButton_1692008940315|1')"
          >
            <div class="aside-fixed-box-icon">
              <span class="top-icon-t_question"></span>
            </div>
            <h5>{{ $t("toTop.index.5iwdv6ex8000") }}</h5>
          </a>
        </div>
        <hr />
        <div class="aside-fixed-box">
          <a
            href="/admin/#/upgrade/work-order"
            target="_blank"
            :clstag="clstag('', 'floatingButton_1692008940315|2')"
          >
            <div class="aside-fixed-box-icon">
              <el-badge :value="newMessageNumber">
                <i class="el-icon-document-empty"></i>
              </el-badge>
            </div>
            <h5>工单支持</h5>
          </a>
        </div>
        <hr />
        <!-- 智能助手部分 -->
        <div class="aside-fixed-box">
          <div
            class="aside-fixed-box-icon"
            @click="handleSmartRobot"
            :clstag="clstag('', 'floatingButton_1692008940315|3')"
          >
            <img src="../../assets/img/smartassistant.png" class="robotImg" />
            <h5>{{ $t("toTop.index.5iwdv6ex8pc1") }}</h5>
          </div>
        </div>
        <hr />
        <div class="aside-fixed-box">
          <a
            href="//get.jd.com/#/survey/index?id=5935782253981409"
            target="_blank"
            :clstag="clstag('', 'floatingButton_1692008940315|4')"
          >
            <div class="aside-fixed-box-icon">
              <span class="top-icon-t_editor"></span>
            </div>
            <h5>{{ $t("toTop.index.5iwdv6ex8pc0") }}</h5>
          </a>
        </div>
      </div>
      <div
        v-show="toTopShow"
        class="el-icon-arrow-up to-top"
        @click="scrollToTop"
      ></div>
    </div>
    <SmartRobotVue
      v-if="isShowRobot"
      :isZoom="isZoom"
      @closeRobot="closeRobot"
      @handleZoom="handleZoom"
      :chatHistory="chatHistory"
    ></SmartRobotVue>
  </div>
</template>

<script>
import InnerConnectUsDialog from "./components/InnerConnectDialog.vue";
import OuterConnectUsDialog from "./components/OuterConnectDiloag.vue";
import lcp from "@/api/extranet/lcp";
import { UserModule } from "@/store/common/modules/user";
import SmartRobotVue from "./components/SmartRobot.vue";
import request from "@/utils/request";
import pageClick from "@/utils/pageClick";

export default {
  name: "ToTop",
  props: ["isIntranet"],
  components: {
    InnerConnectUsDialog,
    OuterConnectUsDialog,
    SmartRobotVue,
  },
  data() {
    return {
      //控制调查问卷弹框
      newMessageNumber: null,
      isZoom: true,
      isShowRobot: false,
      toTopShow: false,
      timer: null,
      chatHistory: [],
      childComponent: null,
    };
  },
  mounted() {
    this.$nextTick(function () {
      //修改事件监听
      window.addEventListener("scroll", this.handleScroll);
    });
    if (UserModule.loginState) {
      this.fetchNewMessage();
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    // 点击事件埋点
    clstag(intranetId, extranetId) {
      return pageClick(intranetId, extranetId);
    },
    async closeRobot() {
      this.isShowRobot = false;
      this.isZoom = true;
      if (UserModule.name) {
        await this.queryHistoryList();
      }
    },
    handleZoom() {
      this.isZoom = !this.isZoom;
    },
    // 查询聊天历史记录
    async queryHistoryList() {
      await request({
        url: "/smartrobotrecord/queryHistoryList",
        method: "get",
      })
        .then((res) => {
          this.chatHistory = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async handleSmartRobot() {
      //判断是否登录
      if (UserModule.name) {
        await this.queryHistoryList();
      }
      this.isShowRobot = true;
    },
    handleScroll() {
      //首先修改相对滚动位置
      this.scrollTop = this.scrollTop =
        window.pageYOffset || document.body.scrollTop;
      if (this.scrollTop > 300) {
        this.toTopShow = true;
      } else {
        this.toTopShow = false;
      }
    },
    scrollToTop() {
      // 瞬间回到顶部
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    },
    resizeFixed(allowTimer = true) {
      const app = document.querySelector("#app");
      const fixed = this.$refs["fixed"];
      fixed.style.right =
        // 如果大于内容宽度 1200 并且超过本身宽度 64 * 2
        // 因为 margin auto 所以需要 * 2
        // (1280 + 64 * 2) = 1408
        // (app.clientWidth - 1408) / 2 单侧 margin
        // + 20 左侧离内容区域的边距
        app.clientWidth > 1408
          ? `${parseInt((app.clientWidth - 1408) / 2) + 20 + 17}px`
          : "0px";
      // 28px 间距
      if (allowTimer && !this.timer) {
        this.timer = setTimeout(() => {
          this.timer = null;
          this.resizeFixed(false);
        }, 300);
      }
    },
    jumpURL() {
      window.open("https://get.jd.com/#/survey/index?id=60971", "_blank");
    },
    async newMessage() {
      return await lcp.workOrder.newMessage().catch((error) => {
        throw new Error("newMessage" + error);
      });
    },
    async fetchNewMessage() {
      const { data } = await this.newMessage().catch((error) => {
        throw new Error("fetchNewMessage" + error);
      });
      this.newMessageNumber = data === 0 ? null : data;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/top-font.scss";

.fixed-box {
  position: fixed;
  bottom: 100px;
  right: 0px;
  z-index: 6;
  height: 280px;

  .aside-fixed {
    width: 64px;
    height: 232px;
    background-color: #f5f7ff;
    border-radius: 6px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 2, 0.12);
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;
    .aside-fixed-box {
      width: 100%;
      height: 58px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background: linear-gradient(
          180deg,
          rgba(60, 110, 240, 1) 0%,
          rgba(110, 154, 255, 1) 100%
        );
        .aside-fixed-box-icon {
          color: white;
        }
        h5 {
          color: white;
        }
      }
      .aside-fixed-box-icon {
        @include transition-color;
        height: 33px;
        background-size: 18px 18px;
        color: #83a6ff;
        font-size: 18px;
        line-height: 18px;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 5px;
      }
      a {
        width: 100%;
        height: 100%;
        display: block;
      }
      h5 {
        @include transition-color;
        height: 17px;
        font-size: 12px;
        line-height: 17px;
        font-weight: 500;
        text-align: center;
        color: #3c6ef0;
      }
    }
  }
  .to-top {
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -19px;
    width: 38px;
    height: 38px;
    background: linear-gradient(
      90deg,
      rgba(214, 231, 255, 1) 0%,
      rgba(201, 221, 255, 1) 100%
    );
    opacity: 76;
    text-align: center;
    line-height: 38px;
    font-size: 20px;
    color: white;
    transition: all 0.28s;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background: linear-gradient(
        180deg,
        rgba(60, 110, 240, 1) 0%,
        rgba(110, 154, 255, 1) 100%
      );
      opacity: 70;
    }
  }
}

.robotImg {
  width: 0.2rem;
  height: 0.2rem;
}

::-webkit-scrollbar {
  width: 4px;
  height: 2px;
  background-color: rgba(244, 245, 247, 1);
}
/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: rgba(244, 245, 247, 1);
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(244, 245, 247, 1);
  background-color: rgba(244, 245, 247, 1);
}
</style>
