<template>
  <div class="result my-wrap my-pd">
    <div class="apply-column">
      <div class="result-box">
        <i class="el-icon-success"></i>
        <h4>{{ $t("mySystem.Result.5ivnlj0l28g0") }}</h4>
        <p>
          {{ $t("mySystem.Result.5ivnlj0l2wc0") }}
          <a class="link" @click="goView">{{
            $t("mySystem.Result.5ivnlj0l31o0")
          }}</a>
          {{ $t("mySystem.Result.5ivnlj0l3500") }}
        </p>
        <p>
          <span class="link">{{ leaveTime }}s</span>
          {{ $t("mySystem.Result.5ivnlj0l3840") }}
        </p>
        <div class="tc" style="margin-top: 60px">
          <el-button type="primary" size="big" @click="goView">{{
            $t("mySystem.Result.5ivnlj0l3c00")
          }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Result",
  data() {
    return {
      leaveTime: 5,
    };
  },
  methods: {
    goView() {
      try {
        window.clearInterval(this.clock);
      } catch (e) {}
      this.$router.push("/mySystem");
    },
  },
  created() {
    this.clock = window.setInterval(() => {
      this.leaveTime = this.leaveTime - 1;
      if (this.leaveTime <= 0) {
        try {
          window.clearInterval(this.clock);
        } catch (e) {}
        this.goView();
      }
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.result-box {
  padding: 90px 0 0;
  text-align: center;
  i.el-icon-success {
    margin-bottom: 30px;
    font-size: 100px;
    color: #26a872;
  }
  h4 {
    margin-bottom: 10px;
    line-height: 33px;
    font-size: 24px;
    color: rgba(51, 51, 51, 1);
  }
  p {
    margin-bottom: 8px;
    line-height: 22px;
    font-size: 14px;
    color: rgba(51, 51, 51, 1);
  }
}
</style>
