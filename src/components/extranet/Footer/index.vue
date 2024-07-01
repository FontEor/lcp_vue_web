<template>
  <div class="open-footer">
    <div class="open-footer-content">
      <div class="open-footer-content-list">
        <ul>
          <li>{{ $t("Footer.index.5iwc59zgc0w0") }}</li>
          <li>
            <a
              target="_blank"
              href="https://cloud.jdl.com/#/devSupport/53367"
              >{{ $t("Footer.index.5iwc59zgdo81") }}</a
            >
          </li>
          <li>
            <a
              target="_blank"
              href="https://cloud.jdl.com/#/devSupport/53220"
              >{{ $t("Footer.index.5iwc59zgdo82") }}</a
            >
          </li>
        </ul>
      </div>
      <div class="open-footer-content-list">
        <ul>
          <li>{{ $t("Footer.index.5iwc59zgcog0") }}</li>
          <li
            ><a
              target="_blank"
              href="https://cloud.jdl.com/#/devSupport/53374"
              >{{ $t("Footer.index.5iwc59zgdo83") }}</a
            ></li
          >
          <li
            ><a
              target="_blank"
              href="https://cloud.jdl.com/#/devSupport/53209"
              >{{ $t("Footer.index.5iwc59zgdo84") }}</a
            ></li
          >
        </ul>
      </div>
      <div class="open-footer-content-list">
        <ul>
          <li>{{ $t("Footer.index.5iwc59zgcsg0") }}</li>
          <li
            ><a target="_blank" href="/#/partner">{{
              $t("Footer.index.5iwc59zgcvc0")
            }}</a></li
          >
        </ul>
      </div>
      <div class="open-footer-content-list">
        <ul>
          <li>{{ $t("Footer.index.5iwc59zgcy00") }}</li>
          <li
            ><a target="_blank" href="https://www.jdl.com/">{{
              $t("Footer.index.5iwc59zgdo85")
            }}</a></li
          >
          <li
            ><a target="_blank" href="https://thingtalk.jdl.com/">{{
              $t("Footer.index.5iwc59zgdo86")
            }}</a></li
          >
          <li
            ><a target="_blank" href="https://www.jdcloud.com/">{{
              $t("Footer.index.5iwc59zgdo87")
            }}</a></li
          >
          <li
            ><a target="_blank" href="https://jr.jdl.com/">{{
              $t("Footer.index.5iwc59zgdo88")
            }}</a></li
          >
        </ul>
      </div>
    </div>
    <div class="open-footer-license">
      <div class="open-footer-license-content">
        ©2004 - 2023 {{ $t("Footer.index.5iwc59zgdb80") }}
        {{ $t("Footer.index.5iwc59zgddo0") }}
        {{ $t("Footer.index.5iwc59zgdgg0") }}
        {{ $t("Footer.index.5iwc59zgdj00") }} 11011502005548
        {{ $t("Footer.index.5iwc59zgdlo0") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "open-footer",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/top-font.scss";
@import "~@/assets/styles/mixin.scss";

.open-footer {
  background: #f6f7fa;

  .open-footer-content {
    margin: 0 auto;
    padding: 0 48px;
    width: 1200px;
    display: flex;
    justify-content: space-between;

    .open-footer-content-list {
      ul {
        li {
          margin: 16px 0;
          color: #666666;

          &:first-child {
            font-size: 16px;
            font-weight: 500;
            color: #333333;
          }
        }
      }
    }
  }

  .open-footer-license {
    background-color: #373f5e;

    .open-footer-license-content {
      margin: 0 auto;
      width: 1200px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      color: #999999;

      a {
        color: white;
      }
    }
  }
}
</style>
