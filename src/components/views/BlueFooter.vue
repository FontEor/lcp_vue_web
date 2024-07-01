<template>
  <div class="com-blue-footer">
    <div class="com-wrapper">
      <el-row :gutter="70">
        <el-col :span="12">
          <p class="big-tip">{{ $t("views.BlueFooter.5iwcptg52fg0") }}</p>
        </el-col>
        <template v-if="isIntranet">
          <el-col :span="6">
            <p class="tip">{{ $t("views.BlueFooter.5iwcptg53bk0") }}</p>
            <p class="mini-tip">
              {{ $t("views.BlueFooter.5iwcptg53eg0") }} 9:00 - 18:00
            </p>
          </el-col>
          <el-col :span="6">
            <p class="tip">{{ $t("views.BlueFooter.5iwcptg53ho0") }}</p>
            <p class="mini-tip">
              {{ $t("views.BlueFooter.5iwcptg53eg0") }} 9:00 - 18:00
            </p>
          </el-col>
        </template>
      </el-row>
    </div>
  </div>
</template>

<script>
import isIntranet from "@/utils/isIntranet";

export default {
  data() {
    return {
      isIntranet: isIntranet(),
    };
  },
};
</script>

<style lang="scss" scoped>
.com-blue-footer {
  padding: 30px 0;
  height: 140px;
  color: #fff;
  background: #3c6ef0 url("~@/assets/img/footer-blue-bg.jpg") top right
    no-repeat;
  background-size: 750px auto;

  .big-tip {
    font-size: 24px;
  }

  .tip {
    font-size: 16px;
    margin-bottom: 8px;
  }
}
</style>
