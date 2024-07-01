<template>
  <div class="my-wrap my-pd">
    <div class="apply-column">
      <div class="result-box">
        <i class="el-icon-success"></i>
        <h4>恭喜你，完成使用系统申请！</h4>
        <p>系统创建使用需要一定的审核时间，您可在顶部导航 <a class="link" @click="goView">我的系统</a> 中查看最新进展</p>
        <p><span class="link">{{leaveTime}}s</span> 后进入我的系统</p>
        <div class="tc" style="margin-top: 60px">
          <el-button type="primary" size="big" @click="goView">立即查看</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leaveTime: 5,
    }
  },
  created() {
    this.clock = window.setInterval(() => {
      this.leaveTime = this.leaveTime - 1
      if (this.leaveTime <= 0) {
        try {
          window.clearInterval(this.clock)
        } catch (e) {}
        this.goView()
      }
    }, 1000)
  },

  methods: {
    goView() {
      try {
        window.clearInterval(this.clock)
      } catch (e) {}
      this.$router.push('/mySystem')
    }
  }
}
</script>

<style lang="scss" scoped>
.result-box{
  padding: 90px 0 0;
  text-align: center;
  i.el-icon-success{
    margin-bottom: 30px;
    font-size: 100px;
    color:#26A872;
  }
  h4{
    margin-bottom: 10px;
    line-height: 33px;
    font-size: 24px;
    color: rgba(51,51,51,1);
  }
  p{
    margin-bottom: 8px;
    line-height: 22px;
    font-size: 14px;
    color: rgba(51,51,51,1);
  }
}
</style>
