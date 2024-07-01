<template>
  <div class="to-top">
    <div class="aside-fixed" ref="fixed">
      <div
        @mouseenter="contactInnerVisible = true"
        @mouseleave="contactInnerVisible = false"
        class="link-us"
      >
        <!-- 内网展示联系我们浮窗 -->
        <div v-show="contactInnerVisible" class="contact-innerbox">
          <p class="contact-title">物流开放平台技术支持</p>
          <div class="contact-content">
            <!-- <div class="qq-qrcode">
              <img src="~@/assets/img/aboutUs/qq-qrcode.png" alt="#" />
              <p class="qrcode-text">
                <img src="~@/assets/img/aboutUs/qq-icon.png" alt="#" />QQ扫码
              </p>
            </div> -->
            <div class="line"></div>
            <div class="dongdong">
              <!-- <img class="dongdong-icon" src="~@/assets/img/aboutUs/dongdong.png" alt="#" />咚咚运维支持群号
              <el-button type="text">
                <a href="timline://chat/?topin=org.lcp" title="咚咚运维支持群号">82490630</a>
              </el-button> -->
              <img
                class="dongdong-icon"
                src="~@/assets/img/aboutUs/dongdong.png"
                alt="#"
              />咚咚运维支持群号
              <a class="contact-dongdong" href="" title="咚咚运维支持群号"
                >82490630</a
              >
            </div>
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
        </div>
        <!-- 用于鼠标hover事件页面设计 占位透明元素 -->
        <div
          v-show="contactInnerVisible"
          class="transparent-inner-element"
        ></div>
      </div>
      <div
        v-show="toTopShow"
        class="el-icon-arrow-up to-top"
        @click="scrollToTop"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToTop",
  data() {
    return {
      toTopShow: false,
      contactVisible: false,
      contactInnerVisible: false,
      timer: null,
      //控制调查问卷弹框
      questionnaireVisible: false,
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
          : "20px";
      if (!this.timmer) {
        this.timer = setTimeout(() => {
          this.timer = null;
          fixed.style.right =
            app.clientWidth > 1480
              ? `${parseInt((app.clientWidth - 1200) / 2) - 40}px`
              : "20px";
        }, 300);
      }
    },
    jumpURL() {
      window.open("https://get.jd.com/#/survey/index?id=60971", "_blank");
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
        : "20px";
    window.addEventListener("resize", this.resizeFixed);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.resizeFixed);
  },
};
</script>

<style lang="scss" scoped>
.to-top {
  .aside-fixed {
    position: fixed;
    top: 80%;
    bottom: 100px;
    transform: translateY(-50%);
    right: 20px;
    width: 36px;
    z-index: 3;
    .link-us {
      position: relative;
      display: block;
      width: 36px;
      height: 36px;
      text-align: center;
      box-shadow: 0 1px 4px 0 rgba(60, 110, 240, 0.15);
      transition: all 0.28s;
      cursor: pointer;
      color: #3c6ef0;
      background: #fff url("~@/assets/img/home/phone-empty.png") top 10px center
        no-repeat;
      background-size: 16px 16px;
      // 内网浮窗样式
      .contact-innerbox {
        position: absolute;
        right: 40px;
        bottom: 0;
        width: 200px;
        height: 260px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 4px 0px rgba(60, 110, 240, 0.15);
        .contact-title {
          text-align: center;
          line-height: 22px;
          font-size: 16px;
          font-weight: bold;
          color: #333333;
          margin: 12px 0;
        }
        .contact-content {
          .qq-qrcode {
            text-align: center;
            .qrcode-text {
              font-size: 12px;
              color: #000;
            }
          }
          .line {
            text-align: center;
            width: 152px;
            height: 1px;
            background: rgba(217, 217, 217, 1);
            margin: 20px 24px;
          }
          .dongdong {
            color: #000;
            .dongdong-icon {
              width: 16px;
              height: 16px;
              margin: 3px 10px 0px 4px;
            }
            .contact-dongdong {
              color: #3c6ef0;
              display: block;
            }
          }
          .text {
            color: #000;
            .advisory {
              width: 16px;
              height: 16px;
              margin: 3px 10px 0px -24px;
            }
            .contact-email {
              color: #3c6ef0;
              margin: 4px 0px 0px 24px;
            }
            .contact-phone {
              color: #3c6ef0;
              margin: 4px 0px 8px 12px;
            }
            .desc {
              font-size: 12px;
              color: #666666;
              margin-top: 10px;
              text-align: center;
            }
          }
        }
      }
      .transparent-inner-element {
        position: absolute;
        bottom: 0;
        right: 36px;
        height: 403px;
        width: 4px;
        background: transparent;
      }
      // 外网浮窗样式
      .contact-box {
        position: absolute;
        height: 195px;
        width: 464px;
        right: 40px;
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
    .link-survey {
      position: relative;
      display: block;
      width: 36px;
      height: 36px;
      text-align: center;
      box-shadow: 0 1px 4px 0 rgba(60, 110, 240, 0.15);
      transition: all 0.28s;
      cursor: pointer;
      color: #3c6ef0;
      background: #fff center no-repeat;
      background-size: 16px 16px;
      bottom: 12px;
      .contact-box {
        position: absolute;
        height: 40px;
        width: 100px;
        right: 40px;
        bottom: 0;
        background: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        z-index: 100;
        .contact-title {
          text-align: center;
          line-height: 22px;
          font-size: 14px;

          color: #333333;
          margin: 12px 0;
        }
      }
    }
    .to-top {
      margin-top: 10px;
      background: #fff;
      width: 36px;
      height: 36px;
      text-align: center;
      line-height: 36px;
      font-size: 16px;
      color: #3c6ef0;
      box-shadow: 0 1px 4px 0 rgba(60, 110, 240, 0.15);
      transition: all 0.28s;
      cursor: pointer;
      &:hover {
        color: #fff;
        background: #3c6ef0;
      }
    }
  }
}
</style>