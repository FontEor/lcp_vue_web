<template>
  <div class="black-footer">
    <div class="black-footer-license">
      <div class="black-footer-license-content">
        ©2004 - 2023 {{ $t("Footer.blackFooter.5ivk2dpmo0k0") }}
        {{ $t("Footer.blackFooter.5ivk2dpmopg0") }}
        {{ $t("Footer.blackFooter.5ivk2dpmou80") }}
        {{ $t("Footer.blackFooter.5ivk2dpmoxo0") }} 11011502005548
        {{ $t("Footer.blackFooter.5ivk2dpmp100") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlackFooter",
};
</script>


<style lang="scss">
@import "~@/assets/styles/top-font.scss";
@import "~@/assets/styles/mixin.scss";

.black-footer {
  //   height: 80px;
  background: #f6f7fa;
  .black-footer-license {
    background-color: #373f5e;
    .black-footer-license-content {
      width: 1200px;
      margin: 0 auto;
      height: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 14px;
      font-weight: normal;
      color: #999999;
    }
  }
}
</style>
