<template>
  <el-footer class="footer" height="80px">
    <p class="footer__copyright">
      ©2004 - 2023 京东物流 版权所有 增值电信业务经营许可证：京ICP备20010510号-7
      京公网安备 11011502005548 号
    </p>
  </el-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #373f5e;

  .footer__copyright {
    color: #999;
  }
}
</style>