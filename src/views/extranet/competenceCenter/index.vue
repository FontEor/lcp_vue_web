<template>
  <div class="competence-center">
    <Header />
    <div class="competence-center-banner">
      <div class="banner-bg">
        <h1 class="bg-title">
          {{ $t("competenceCenter.index.5ivn7ae1q7k0") }}
          {{ $t("competenceCenter.index.5ivn7ae1r000") }}
        </h1>
      </div>
    </div>
    <div class="competence-center-guide">
      <div class="guide-container">
        <!-- 接入调试 -->
        <div class="guide-introduction">
          <h2 class="introduction-title">
            {{ $t("competenceCenter.index.5ivn7ae1r540") }}
          </h2>
          <a
            href="https://cloud.jdl.com/#/devSupport/53209"
            :clstag="clstag('', 'competenceCenter_1645517713492|1')"
            class="introduction-link"
            target="_blank"
            >{{ $t("competenceCenter.index.5ivn7ae1r541") }}</a
          >
          <a
            href="https://cloud.jdl.com/#/devSupport/53215"
            :clstag="clstag('', 'competenceCenter_1645517713492|2')"
            class="introduction-link"
            target="_blank"
            >{{ $t("competenceCenter.index.5ivn7ae1r8g0") }}</a
          >
        </div>
        <!-- 自助诊断 -->
        <div class="guide-introduction">
          <h2 class="introduction-title">
            {{ $t("competenceCenter.index.5ivn7ae1rbg0") }}
          </h2>
          <a
            href="https://cloud.jdl.com/#/devSupport/74"
            :clstag="clstag('', 'competenceCenter_1645517713492|3')"
            class="introduction-link"
            target="_blank"
            >{{ $t("competenceCenter.index.5ivn7ae1rbg1") }}</a
          >
          <a
            href="https://cloud.jdl.com/#/devSupport/53098"
            :clstag="clstag('', 'competenceCenter_1645517713492|4')"
            class="introduction-link"
            target="_blank"
            >{{ $t("competenceCenter.index.5ivn7ae1rf40") }}</a
          >
        </div>
        <!-- 咨询提问 -->
        <div class="guide-introduction">
          <h2 class="introduction-title">
            {{ $t("competenceCenter.index.5ivn7ae1ri80") }}
          </h2>
          <a
            href="https://cloud.jdl.com/#/question/1"
            :clstag="clstag('', 'competenceCenter_1645517713492|5')"
            class="introduction-link"
            target="_blank"
          >
            {{ $t("competenceCenter.index.5ivn7ae1ri81") }}</a
          >
        </div>
      </div>
    </div>
    <div class="competence-center-label">
      <!-- 左侧tabs导航 -->
      <div class="label-tabs">
        <div class="tabs-wrapper">
          <el-tabs
            tab-position="left"
            v-model="activeName"
            @tab-click="handleTabClick"
          >
            <el-tab-pane
              v-for="item in labelList"
              :key="item.id"
              :label="item.classifyName"
              :name="item.classifyName"
            ></el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <!-- 标签列表 -->
      <div class="label-wrapper">
        <div class="wrapper-list" v-for="item in labelList" :key="item.id">
          <h2 class="list-title">{{ item.classifyName }}</h2>
          <el-row :gutter="16" v-if="item.bizUnits && item.bizUnits.length > 0">
            <el-col
              :span="8"
              v-for="subItem in item.bizUnits"
              :key="subItem.id"
            >
              <div class="list-item" @click="handleClickListItem(subItem)">
                <h3 class="item-title">{{ subItem.name }}</h3>
                <p class="item-desc">
                  {{ subItem.remark }}
                </p>
                <div class="item-btn">
                  {{ $t("competenceCenter.index.5ivn7ae1rlw0") }}
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import competenceCenter from "@/api/extranet/competenceCenter/index.ts";
import Header from "@/components/extranet/Header/index.vue";
import Footer from "@/components/extranet/Footer/index.vue";
import pageClick from "@/utils/pageClick";

export default {
  name: "CompetenceCenter",
  components: { Header, Footer },
  data() {
    return {
      labelList: [],
      activeName: "",
      isClickEvent: false,
    };
  },
  async created() {
    await this.findClassifiedBizUnitList();
    if (
      this.$route.query.entrance &&
      this.$route.query.entrance === "materialControl"
    ) {
      this.initEntrance();
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScrollToActiveTabs);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScrollToActiveTabs);
  },
  methods: {
    // 点击事件埋点
    clstag(intranetId, extranetId) {
      return pageClick(intranetId, extranetId);
    },

    initEntrance() {
      this.isClickEvent = true;
      const listTitle = document.querySelectorAll(".list-title");
      let scrollIndex = 0;
      listTitle.forEach((item, index) => {
        if (item.innerText === this.$t("competenceCenter.index.5ivn7ae1row0")) {
          scrollIndex = index;
        }
      });
      const top = listTitle[scrollIndex].offsetTop - 80;
      const behavior = "instant";
      window.scrollTo({ top, behavior });
      this.activeName = this.$t("competenceCenter.index.5ivn7ae1row0");
      setTimeout(() => {
        this.isClickEvent = false;
      }, 700);
    },

    async findClassifiedBizUnitList() {
      const response = await competenceCenter.findClassifiedBizUnitList();
      this.labelList = response.data;
      this.activeName = this.labelList[0].classifyName;
    },

    handleClickListItem(subItem) {
      this.$router.push({
        name: "AccessGuide",
        params: { unitId:  subItem.id},
      });
    },

    // el-tabs点击事件，右侧标签列表滚动至对应标题
    handleTabClick(tab) {
      this.isClickEvent = true;
      const listTitle = document.querySelectorAll(".list-title");
      const top = listTitle[tab.index].offsetTop - 80;
      const behavior = "smooth";
      window.scrollTo({ top, behavior });
      setTimeout(() => {
        this.isClickEvent = false;
      }, 700);
    },

    // 监听右侧标签列表滚动，激活左侧对应el-tabs选中标题
    handleScrollToActiveTabs() {
      // 执行点击事件时，滚动监听事件不执行
      if (this.isClickEvent) return;
      const listTitle = document.querySelectorAll(".list-title");
      if (listTitle && listTitle.length > 0) {
        listTitle.forEach((item, index) => {
          if (item.offsetTop - 80 <= document.documentElement.scrollTop) {
            this.activeName = item.innerText;
          }
        });
      }
      const srollTop = window.pageYOffset;
      if (srollTop < 300) {
        this.activeName = this.labelList[0].classifyName;
      }
    },


  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
.competence-center {
  min-width: 1200px;
  background: #ffffff;
  .competence-center-banner {
    background: #fcfbff;
    height: 255px;
    .banner-bg {
      position: relative;
      width: 1200px;
      margin: 0 auto;
      height: 255px;
      background: #fcfcff url("~@/assets/img/product/banner.jpg") top center
        no-repeat;
      background-size: auto 100%;
      .bg-title {
        @include font-family-jd;
        position: absolute;
        top: 78px;
        left: 140px;
        font-size: 36px;
        font-family: JDLANGZHENGTI--GB1;
      }
    }
  }
  .competence-center-guide {
    position: relative;
    width: 1200px;
    margin: 0 auto;
    .guide-container {
      position: absolute;
      display: flex;
      width: 920px;
      height: 204px;
      justify-content: space-between;
      align-items: center;
      left: 180px;
      top: -88px;
      .guide-introduction {
        height: 148px;
        width: 273px;
        background: url("~@/assets/img/competenceCenter/guide-small.png") top
          center no-repeat;
        background-size: auto 100%;
        border-radius: 8px;
        transition: height 0.3s;
        &:hover {
          width: 273px;
          height: 204px;
          background: url("~@/assets/img/competenceCenter/guide-hover.png") top
            center no-repeat;
          .introduction-title {
            margin-top: 48px;
          }
        }
        .introduction-title {
          font-size: 20px;
          font-weight: 500;
          margin: 20px;
        }
        .introduction-link {
          margin: 20px;
          &:hover {
            color: #3c6ef0;
          }
        }
      }
    }
  }
  .competence-center-label {
    display: flex;
    width: 1200px;
    margin: 0 auto;
    padding-top: 158px;
    .label-tabs {
      position: -webkit-sticky;
      position: sticky;
      height: 0;
      top: 80px;
    }
    .label-wrapper {
      padding: 0 70px;
      .list-title {
        font-size: 26px;
        font-weight: 500;
        margin-bottom: 30px;
      }
      .list-item {
        width: 247px;
        height: 214px;
        position: relative;
        padding: 20px;
        margin-bottom: 62px;
        background: rgba(246, 247, 250, 1);
        border-radius: 8px;
        @include transition-color;
        &:hover {
          cursor: pointer;
          background: rgba(60, 110, 240, 1);
          color: #ffffff;
          > .item-btn {
            color: #3c6ef0;
            background: rgba(255, 255, 255, 1);
          }
        }
        .item-title {
          overflow: hidden;
          font-size: 20px;
          font-weight: 500;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .item-desc {
          margin-top: 11px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          word-break: break-all;
        }
        .item-btn {
          width: 96px;
          height: 35px;
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          bottom: 30px;
          background: rgba(228, 232, 241, 1);
          border-radius: 4px;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
        }
      }
    }
  }
}
</style>