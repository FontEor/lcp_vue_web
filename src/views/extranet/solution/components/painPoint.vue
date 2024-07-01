<template>
  <div class="pain-point">
    <div class="point-content">
      <h2 class="content-title">解决痛点</h2>
      <div class="content-box">
        <div
          class="box-item"
          v-for="(item, index) in painPointContent"
          :key="index"
        >
          <div
            class="item-icon"
            :style="{
              'background-image': `url(${
                iconList ? iconList[index] : icon[index]
              })`,
            }"
          ></div>
          <p class="item-content">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import painPoint1 from "@/assets/extranet/images/foodWarehouse/pain-point-1.svg";
import painPoint2 from "@/assets/extranet/images/foodWarehouse/pain-point-2.svg";
import painPoint3 from "@/assets/extranet/images/foodWarehouse/pain-point-3.svg";
export default {
  name: "PainPoint",
  props: {
    painPointContent: {
      type: Array,
      required: true,
    },
    iconList: {
      type: Array,
    },
  },
  data() {
    return {
      icon: [painPoint1, painPoint2, painPoint3],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";

.pain-point {
  .point-content {
    width: 1200px;
    margin: 0 auto;
    padding-top: 79px;
    .content-title {
      text-align: center;
      @include font-family-jd;
      font-size: 34px;
      font-family: JDLANGZHENGTI--GB1;
      font-weight: normal;
      color: rgba(51, 51, 51, 1);
    }
    .content-box {
      height: 185px;
      margin-top: 52px;
      padding: 0 34px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: url("~@/assets/extranet/images/foodWarehouse/pain-point-bg.png");
      .box-item {
        width: 290px;
        height: 181px;
        padding-top: 29px;
        .item-icon {
          width: 86px;
          height: 63px;
          background-size: 100% auto;
          margin: 0 auto 27px;
        }
        .item-content {
          font-size: 20px;
          font-weight: normal;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }
}
</style>