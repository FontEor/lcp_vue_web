<template>
  <div class="banner">
    <div
      class="banner-bg"
      :style="{
        'background-image': `url(${bannerImage})`,
      }"
    >
      <h2 class="bg-title">{{ bannerTitle }}</h2>
      <p class="bg-content">
        {{ bannerContent }}
      </p>
      <div class="bg-btn">
        <!-- 立即入驻按钮 -->
        <a
          class="btn--primary"
          :clstag="clstag(0)"
          :href="bannerLink"
          target="_blank"
        ></a>
        <!-- 查看文档按钮 -->
        <a
          class="btn--plain"
          :clstag="clstag(1)"
          :href="bannerLink"
          target="_blank"
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
import pageClick from "@/utils/pageClick";

export default {
  name: "Banner",
  props: {
    bannerTitle: {
      type: String,
      required: true,
    },
    bannerContent: {
      type: String,
      required: true,
    },
    bannerLink: {
      type: String,
      required: true,
    },
    bannerImage: {
      type: String,
      required: true,
    },
    bannerClstag: {
      type: Array,
      default: () => ["", ""],
    },
  },
  methods: {
    // 点击事件埋点
    clstag(type) {
      return pageClick("", this.bannerClstag[type] || "");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";

.banner {
  background: rgba(0, 9, 56, 1);
  .banner-bg {
    position: relative;
    width: 1200px;
    height: 255px;
    margin: 0 auto;
    color: #ffffff;
    background-size: auto 100%;
    .bg-title {
      @include font-family-jd;
      position: absolute;
      top: 71px;
      left: 80px;
      font-size: 40px;
      font-family: JDLANGZHENGTI--GB1;
    }
    .bg-content {
      @include font-family-jd;
      position: absolute;
      top: 135px;
      left: 81px;
      font-size: 20px;
      width: 674px;
      font-family: JDLANGZHENGTI--GB1;
    }
    .bg-btn {
      position: absolute;
      display: flex;
      flex-direction: row;
      top: 227px;
      left: 81px;
      .btn--primary {
        position: relative;
        display: block;
        width: 224px;
        height: 58px;
        margin-right: 40px;
        font-size: 20px;
        font-weight: 500;
        color: #ffffff;
        background-image: linear-gradient(
          90deg,
          rgba(211, 225, 255, 1) 0%,
          rgba(175, 200, 250, 1) 24.01660839160839%,
          rgba(92, 151, 249, 1) 47.284746503496514%,
          rgba(168, 201, 255, 1) 100%
        );
        border-radius: 8px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.09);
        &::before {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
          width: 220px;
          height: 54px;
          content: "立即接入";
          background: linear-gradient(
            90deg,
            rgba(135, 184, 255, 1) 0%,
            rgba(60, 110, 240, 1) 100%
          );
          border-radius: 8px;
        }

        &::after {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
          width: 220px;
          height: 54px;
          content: "立即接入";
          background: linear-gradient(
            90deg,
            rgba(7, 94, 222, 1) 0%,
            rgba(0, 56, 202, 1) 100%
          );
          border-radius: 8px;
          opacity: 0;
          transition: opacity 0.3s;
        }

        &:hover::after {
          opacity: 1;
        }
      }
      .btn--plain {
        position: relative;
        display: block;
        width: 224px;
        height: 58px;
        color: #333333;
        margin-right: 40px;
        font-size: 20px;
        font-weight: 500;
        background-image: linear-gradient(
            90deg,
            rgba(245, 249, 255, 1) 0%,
            rgba(255, 255, 255, 1) 100%
          )
          2 2;
        border-radius: 8px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.09);
        &::before {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
          width: 220px;
          height: 54px;
          content: "查看文档";
          background: linear-gradient(
            180deg,
            rgba(246, 249, 251, 1) 0%,
            rgba(235, 240, 244, 1) 100%
          );
          border-radius: 8px;
        }

        &::after {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
          width: 220px;
          height: 54px;
          content: "查看文档";
          background: linear-gradient(
            180deg,
            rgba(218, 229, 240, 1) 0%,
            rgba(235, 240, 244, 1) 100%
          );
          border-radius: 8px;
          opacity: 0;
          transition: opacity 0.3s;
        }

        &:hover::after {
          opacity: 1;
        }
      }
    }
  }
}
</style>