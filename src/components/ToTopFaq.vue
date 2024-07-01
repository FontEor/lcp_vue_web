<template>
  <div class="to-top-faq" ref="fixed">
    <!-- 常见问题 -->
    <div class="to-top-faq__item faq" @click="handleOpenURL('faq')">
      <p class="item__icon faq__icon"></p>
      <p class="item__text faq__text">常见问题</p>
    </div>
    <!-- 联系方式 -->
    <!-- <div
      @mouseenter="contactVisible = true"
      @mouseleave="contactVisible = false"
      class="to-top-faq__item contact-information"
    >
      <p class="item__icon contact-information__icon"></p>
      <p class="item__text contact-information__text">联系方式</p> -->
      <!-- 外网展示联系我们浮窗 -->
      <!-- <div v-show="contactVisible" class="contact-box">
        <p class="contact-title">物流开放平台技术支持</p>
        <div class="contact-content">
          <div class="wechat-qrcode">
            <img class src="~@/assets/img/aboutUs/wechat-qrcode.png" alt="#" />
            <p class="qrcode-text">
              <img
                src="~@/assets/img/aboutUs/wechat-icon.png"
                alt="#"
              />微信扫码
            </p>
          </div>
          <div class="qq-qrcode">
            <img src="~@/assets/img/aboutUs/qq-qrcode.png" alt="#" />
            <p class="qrcode-text">
              <img src="~@/assets/img/aboutUs/qq-icon.png" alt="#" />QQ扫码
            </p>
          </div>
          <div class="line"></div>
          <div class="text">
            <p>
              <img
                class="advisory"
                src="~@/assets/img/aboutUs/phone-icon.png"
                alt="#"
              />免费咨询电话
            </p>
            <p class="contact-phone">133-6632-0890</p>
            <p>
              <img
                class="advisory"
                src="~@/assets/img/aboutUs/email-icon.png"
                alt="#"
              />免费咨询邮箱
            </p>
            <p class="contact-email">jdlcloud@jd.com</p>
            <p class="desc">周一至周五 9:00-18:00</p>
          </div>
        </div>
      </div> -->
      <!-- 用于鼠标hover事件页面设计 占位透明元素 -->
      <!-- <div v-show="contactVisible" class="transparent-element"></div>
    </div> -->
    <!-- 用户调研 -->
    <div class="to-top-faq__item research" @click="handleOpenURL('research')">
      <p class="item__icon research__icon"></p>
      <p class="item__text research__text">用户调研</p>
    </div>
    <!-- 回到顶部 -->
    <div
      v-show="toTopShow"
      class="to-top-faq__item back-top"
      @click="scrollToTop"
    >
      <p class="item__icon back-top__icon"></p>
      <p class="item__text back-top__text">返回顶部</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToTopFaq",
  data() {
    return {
      toTopShow: false,
      contactVisible: false,
      contactInnerVisible: false,
      timer: null,
    };
  },
  methods: {
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
      let timer = null,
        _that = this;
      //动画，使用requestAnimationFrame代替setInterval
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (_that.scrollTop > 0) {
          _that.scrollTop -= 100;
          //然后修改这里实现动画滚动效果
          document.body.scrollTop = document.documentElement.scrollTop =
            _that.scrollTop;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
          _that.toTopShow = false;
        }
      });
    },
    resizeFixed() {
      const app = document.querySelector("#app");
      const fixed = this.$refs["fixed"];
      fixed.style.right =
        app.clientWidth > 1480
          ? `${parseInt((app.clientWidth - 1200) / 2) - 40}px`
          : "80px";
      if (!this.timmer) {
        this.timer = setTimeout(() => {
          this.timer = null;
          fixed.style.right =
            app.clientWidth > 1480
              ? `${parseInt((app.clientWidth - 1200) / 2) - 40}px`
              : "80px";
        }, 300);
      }
    },
    handleOpenURL(item) {
      const hashMap = {
        faq: "//cloud.jdl.com/#/question/1",
        //research: "//get.jd.com/#/survey/index?id=4199982330614988",
        research: "//get.jd.com/#/survey/index?id=5935782253981409",
      };
      window.open(hashMap[item] || "", "_blank");
    },
  },
  mounted() {
    this.$nextTick(function () {
      //修改事件监听
      window.addEventListener("scroll", this.handleScroll);
    });
    const app = document.querySelector("#app");
    const fixed = this.$refs["fixed"];
    fixed.style.right =
      app.clientWidth > 1480
        ? `${parseInt((app.clientWidth - 1200) / 2) - 40}px`
        : "80px";
    window.addEventListener("resize", this.resizeFixed);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.resizeFixed);
  },
};
</script>

<style lang="scss" scoped>
.to-top-faq {
  position: fixed;
  top: 80%;
  right: 80px;
  bottom: -40px;
  transform: translateY(-50%);
  width: 36px;
  z-index: 3;
  .to-top-faq__item {
    margin-top: 8px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100px;
    height: 36px;
    text-align: center;
    box-shadow: 0 1px 4px 0 rgba(60, 110, 240, 0.15);
    cursor: pointer;
    color: #333;
    background: #fff;
    .item__icon {
      width: 16px;
      height: 16px;
      &.faq__icon {
        background: url("~@/assets/ToTop/faq.svg") no-repeat center/100%;
      }
      &.contact-information__icon {
        background: url("~@/assets/ToTop/tel.svg") no-repeat center/100%;
      }
      &.research__icon {
        background: url("~@/assets/ToTop/research.svg") no-repeat center/100%;
      }
      &.back-top__icon {
        background: url("~@/assets/ToTop/backTop.svg") no-repeat center/100%;
      }
    }
    // 外网浮窗样式
    .contact-box {
      position: absolute;
      height: 195px;
      width: 464px;
      right: 100px;
      bottom: 0;
      background: #ffffff;
      box-shadow: 0px 1px 4px 0px rgba(60, 110, 240, 0.15);
      z-index: 100;
      .contact-title {
        text-align: center;
        line-height: 22px;
        font-size: 14px;
        font-weight: bold;
        color: #333333;
        margin: 12px 0;
      }
      .contact-content {
        display: flex;
        flex-flow: row;
        .wechat-qrcode {
          margin-left: 38px;
          margin-right: 20px;
          .qrcode-text {
            text-align: center;
            font-size: 12px;
          }
        }
        .qq-qrcode {
          .qrcode-text {
            text-align: center;
            font-size: 12px;
          }
        }
        .line {
          width: 1px;
          height: 118px;
          background: rgba(217, 217, 217, 1);
          margin-left: 22px;
        }
        .text {
          color: #000;
          .advisory {
            width: 16px;
            height: 16px;
            margin: 2px 10px;
          }
          .contact-phone {
            color: #3c6ef0;
            margin: 6px 0px 6px 44px;
          }
          .contact-email {
            color: #3c6ef0;
            margin: 6px 0px 6px 56px;
          }
          .desc {
            font-size: 12px;
            color: #666666;
            margin-left: 20px;
            margin-top: 10px;
          }
        }
      }
    }
    .transparent-element {
      position: absolute;
      bottom: 0;
      right: 36px;
      height: 195px;
      width: 4px;
      background: transparent;
    }
  }
}
</style>