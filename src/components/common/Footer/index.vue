<template>
  <div class="footer cbox">
    <div class="footer-main">
      <div class="link-wrap vbox">
        <a class="link" href="//www.jdl.com" target="_blank">京东物流</a>|
        <a class="link" href="//www.jdcloud.com" target="_blank">京东云</a>|
        <a class="link" href="//www.jddglobal.com" target="_blank">京东科技</a>|
        <a
          v-if="computeIsIntranet"
          class="link"
          href="//star.jdwl.com/star"
          target="_blank"
          >京东物流前端生态平台</a
        ><span v-if="computeIsIntranet">|</span>
        <router-link tag="a" target="_blank" to="/protocol" class="link"
          >隐私协议</router-link
        >
      </div>
      <p class="tip">
        <span>©2004 - 2023</span>
        <span>京东物流</span>
        <span>版权所有</span>
        <span
          >增值电信业务经营许可证：京ICP备20010510号-7 京公网安备
          11011502005548 号</span
        >
      </p>
    </div>
  </div>
</template>

<script>
import isIntranet from "@/utils/isIntranet";
export default {
  computed: {
    computeIsIntranet() {
      return isIntranet();
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  height: 136px;
  margin-top: -136px;
  font-size: 14px;
  background: #333;
  .footer-main {
    width: 1200px;
    margin: 0 auto;
    color: #e8e8e8;
    .link-wrap {
      color: #999;
      .link {
        margin: 0 25px;
        color: #e8e8e8;
        &:hover {
          color: #3c6ef0;
        }
      }
    }
    .tip {
      padding-top: 20px;
      color: #999;
      text-align: center;
      span {
        padding: 0 5px;
      }
    }
  }
}
</style>
