<template>
  <div v-show="visible" class="contact-inner-box">
    <div class="contact-inner-box-content">
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
            <img
                class="dongdong-icon"
                src="~@/assets/img/aboutUs/dongdong.png"
                alt="#"
            />咚咚运维支持群号
            <a class="contact-dongdong" href="javascript: void 0;" title="咚咚运维支持群号">82490630&ensp;&ensp;&ensp;&ensp;&ensp;</a>
          </div>
          <div class="text">
            <p>
                <img
                class="advisory"
                src="~@/assets/img/aboutUs/phone-icon.png"
                alt="#"
                />免费咨询电话
            </p>
            <a href="tel: 13366320890" class="contact-phone">133-6632-0890</a>
            <p>
                <img
                class="advisory"
                src="~@/assets/img/aboutUs/email-icon.png"
                alt="#"
                />免费咨询邮箱
            </p>
            <a href="mailto:jdlcloud@jd.com" class="contact-email">jdlcloud@jd.com</a>
            <p class="desc">周一至周五 9:00-18:00</p>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "InnerConnectUsDialog",
  props: ["visible"]
};
</script>
<style lang="scss" scoped>
.contact-inner-box {
  position: absolute;
  right: 60px;
  top: 0;
  width: 240px;
  height: 260px;
  background-color: transparent;
}
.contact-inner-box-content {
  position: absolute;
  left: 0;
  top: 0;
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
    .dongdong,
    .text {
      text-align: center;
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
        text-indent: -20px;
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
</style>

