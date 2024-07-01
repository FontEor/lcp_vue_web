<template>
  <div class="apply my-wrap my-pd">
    <div class="apply-column">
      <h3 class="title">
        <span>{{ $t("mySystem.Apply.5ivl2a9cko00") }}</span>
      </h3>
      <div class="apply-content">
        <ul class="tabs-trade">
          <li
            :class="form.current == index ? 'active' : ''"
            v-for="(item, index) in form.listTrade"
            :key="index"
            @click="toggleTab(index)"
          >
            {{ item }}
          </li>
        </ul>
        <div class="row-item">
          <p>
            {{ $t("mySystem.Apply.5ivl2a9cldk0") }}
            <el-input-number
              v-model.number="form.num"
              @change="handleChange"
              :precision="0"
              :min="1"
              :max="100"
            ></el-input-number>
            {{ $t("mySystem.Apply.5ivl2a9cldk1") }}
          </p>
          <p>
            <el-checkbox v-model="form.xieyiChecked" class="my-checkbox">{{
              $t("mySystem.Apply.5ivl2a9clic0")
            }}</el-checkbox>
            <span>
              <router-link
                target="_blank"
                :to="{ path: this.licensePath }"
                style="color: #3c6ef0"
                >{{ $t("mySystem.Apply.5ivl2a9clic1") }}</router-link
              >
            </span>
          </p>
        </div>
        <div class="tc">
          <el-button class="apply-btn" @click="goDetail">{{
            $t("mySystem.Apply.5ivl2a9clm40")
          }}</el-button>
          <el-button
            type="primary"
            class="apply-btn"
            @click="goSubmit('toApplyform')"
            :disabled="!this.form.xieyiChecked"
            :loading="applying"
            >{{ $t("mySystem.Apply.5ivl2a9clpk0") }}</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Apply",
  data() {
    return {
      form: {
        listTrade: [
          this.$t("mySystem.Apply.5ivl2a9cltk0"),
          this.$t("mySystem.Apply.5ivl2a9clww0"),
        ],
        current: 0,
        num: 1,
        xieyiChecked: false,
        applyUnit: 1,
        systemName: this.$t("mySystem.Apply.5ivl2a9cm0c0"),
      },
      dialogVisible: false,
      applying: false,
    };
  },
  methods: {
    handleChange(currentValue, oldValue) {
      if (!/[0-9]+/.test(currentValue)) {
        currentValue = oldValue;
      }
      currentValue = Math.floor(currentValue);
      this.form.num = currentValue;
    },

    toggleTab(index) {
      this.form.current = index;
    },

    goDetail() {
      this.$router.push("/productDetail/WMS");
    },

    goSubmit(formName) {
      if ((this.form.xieyiChecked = true)) {
        this.applying = true;
        const url = "/wms/apply";
        request({
          url: url,
          method: "post",
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({
            systemName: this.form.systemName,
            schemeType: this.form.current,
            limitNum: this.form.num,
            limitType: this.form.applyUnit,
          }),
        })
          .then((rsp) => {
            this.$router.push("/apply/result");
          })
          .catch((e) => {
            this.applying = false;
            console.log(e);
          });
      }
    },
    goLicense() {
      this.$router.push(path);
    },

    //限制只能输入整数
    limitInteger(e) {
      console.log(e.target);
      let isNumber = /^\d*$/.test(e.target.value);
      // 过滤非数字
      e.target.value = e.target.value.replace(/\D/g, "");
      if (!isNumber || e.target.value < 0 || e.target.value > 100) {
        return;
      }
      e.target.value =
        (e.target.value >= 0 &&
          e.target.value <= 100 &&
          e.target.value.match(/^\d*/g)[0]) ||
        null;
    },
  },
  created() {
    this.licensePath = `${window.env.softwareLicense}`;
  },
};
</script>

<style lang="scss" scoped>
.apply {
  .apply-btn {
    &.el-button {
      border-radius: 0;
    }
  }

  .apply-column {
    .title {
      height: 68px;
      border-bottom: 2px solid #eaeaea;
      text-align: center;

      span {
        display: inline-block;
        padding: 19px;
        border-bottom: 2px solid #3c6ef0;
        line-height: 28px;
        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: rgba(51, 51, 51, 1);
      }
    }

    .apply-content {
      padding-top: 60px;
      text-align: center;

      p {
        padding-bottom: 16px;
      }
    }

    .tabs-trade {
      padding-bottom: 40px;
      text-align: center;
      overflow: hidden;

      li {
        display: inline-block;
        position: relative;
        margin: 0 12px;
        width: 230px;
        padding: 36px 0;
        text-align: center;
        border: 1px solid rgba(217, 217, 217, 1);
        border-radius: 8px;
        line-height: 28px;
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
        cursor: pointer;

        &.active {
          padding: 35px 0;
          border: 2px solid #3c6ef0;
          color: #3c6ef0;

          &::after {
            position: absolute;
            top: -1px;
            right: -1px;
            display: inline-block;
            width: 44px;
            height: 44px;
            background: url("~@/assets/img/apply/checked.png") no-repeat;
            background-size: 100%;
            content: "";
          }
        }
      }
    }
  }
}
</style>
