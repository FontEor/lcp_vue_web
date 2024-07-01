<template>
  <div class="open-business-page">
    <div class="banner-view">
      <div class="com-wrapper">
        <h2 class="tit">开放业务</h2>
        <p class="tip">物流能力，现全面开放。一键打通物流系统，与世界连接。</p>
        <div class="step">
          <span class="step__text">入驻平台</span>
          <span class="step__text">资质认证</span>
          <span class="step__text">创建应用</span>
          <span class="step__text">订阅开放业务</span>
        </div>
      </div>
    </div>
    <div class="com-subnav">
      <div
        class="com-subnav-tabs"
        :class="{ is_fixed: isFixed }"
        ref="menuWrapper"
      >
        <a
          v-for="(item, index) in list"
          :key="index"
          class="tab"
          :class="{ active: curIdx == index }"
          :clstag="clstag('', item.clstag || '')"
          @click.stop.prevent="selectMenu(index)"
        >
          {{ item.classifyName }}
        </a>
      </div>
    </div>
    <div ref="viewsWrapper" class="viewsWrapper">
      <div class="com-wrapper">
        <div v-for="(item, i) in list" :key="i" class="view-item">
          <h2 class="tit">{{ item.classifyName }}</h2>
          <template>
            <el-row
              :gutter="16"
              v-if="item.bizUnits && item.bizUnits.length > 0"
            >
              <el-col
                :span="8"
                v-for="(subItem, j) in item.bizUnits"
                :key="i + j"
              >
                <router-link
                  :to="{ path: 'quick', query: { id: subItem.id } }"
                  class="doc-link"
                >
                  <div class="con">
                    <h3 class="tit3">{{ subItem.name }}</h3>
                    <p class="txt te2">{{ subItem.remark }}</p>
                    <div class="detail-button-wrapper">
                      <el-button type="text"
                        >查看详情 <i class="el-icon-right"></i>
                      </el-button>
                    </div>
                  </div>
                </router-link>
              </el-col>
            </el-row>
            <div v-else class="no-data">暂无数据</div>
          </template>
        </div>
      </div>
    </div>
    <blue-footer />
    <el-dialog
      :visible.sync="authorityDialogVisible"
      width="400px"
      custom-class="login-dialog"
    >
      <div><i class="el-icon-warning"></i></div>
      <div class="login-text">您没有权限查看该开放业务的相关文档信息。</div>
      <!-- <div>如有疑问，请联系官方客服：133-6632-0890</div> -->
    </el-dialog>
  </div>
</template>

<script>
import { SappModule } from "@/store/common/modules/app";
import BlueFooter from "@/components/views/BlueFooter";
import pageClick from "@/utils/pageClick";
import request from "@/utils/request";
export default {
  components: { BlueFooter },
  data() {
    return {
      curIdx: "",
      isFixed: false,
      scrollY: 0,
      offsetTop: 0,
      listHeight: [],
      tabIdx: 0,
      list: [],
      authorityDialogVisible: false,
    };
  },
  computed: {
    currentIndex() {
      if (!this.isFixed) {
        return 0;
      }
      for (let i = 0, len = this.listHeight.length; i < len; i++) {
        const height1 = this.listHeight[i];
        const height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
  },
  methods: {
    // 点击事件埋点
    clstag(intranetId, extranetId) {
      return pageClick(intranetId, extranetId);
    },
    // --获取开放业务列表
    fetchOpenBiz() {
      request({
        url: "/bizunit/findClassifiedBizUnitList",
        method: "post",
      })
        .then((resp) => {
          this.list = resp.data;
          this.list = this.list.map((item) => {
            const clstagTable = {
              快递: "openBusiness_1618993131722|2",
              快运: "openBusiness_1618993131722|3",
              "服务+": "openBusiness_1618993131722|4",
              KA: "openBusiness_1618993131722|5",
              国际快递: "openBusiness_1618993131722|6",
              运输运力: "openBusiness_1618998980330|1",
            };
            const clstag = clstagTable[item.classifyName] || "";
            return { ...item, clstag };
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },

    handleTab(idx) {
      this.tabIdx = idx;
    },
    calculateHeight() {
      const viewList =
        this.$refs.viewsWrapper.getElementsByClassName("view-item");
      let height = 600;
      this.listHeight.push(height);
      for (let i = 0, len = viewList.length; i < len; i++) {
        const item = viewList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index) {
      this.curIdx = index;
      const viewList =
        this.$refs.viewsWrapper.getElementsByClassName("view-item");
      const el = viewList[index];
      if (window.scrollTo) {
        window.scrollTo({ behavior: "smooth", top: el.offsetTop - 60 });
      }
    },
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollY = Math.abs(Math.round(scrollTop));
      this.isFixed = scrollTop >= this.offsetTop;
      if (scrollTop >= this.offsetTop) {
        SappModule.SET_NAVBAR_FIXED(false);
      } else {
        SappModule.SET_NAVBAR_FIXED(true);
      }
    },
  },
  mounted() {
    if (this.$route.params.fromUrl === "noAuthority") {
      this.authorityDialogVisible = true;
    }
    window.addEventListener("scroll", this.handleScroll);
    this.$nextTick(() => {
      this.offsetTop = this.$refs.menuWrapper.offsetTop;
      this.calculateHeight();
    });
    setTimeout(() => {
      this.fetchOpenBiz();
    }, 300);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    SappModule.SET_NAVBAR_FIXED(true);
  },
};
</script>

<style lang="scss" scoped>
.login-text {
  margin: 20px auto 0px;
}
.el-icon-warning {
  color: #ffb600;
  font-size: 48px;
  margin-top: 10px;
}
::v-deep .login-dialog {
  text-align: center;
  border-radius: 4px;
  border: 1px solid #eaeaea;
  .el-dialog__header {
    border-bottom: none;
    height: 0px;
    padding: 0px;
  }
}

.open-business-page {
  background: #f6f7fc url("~@/assets/img/openBusiness/bg.png") top 320px center
    no-repeat;
  background-size: 100% auto;
}

.banner-view {
  background: #f6f7fc
    url("~@/assets/img/openBusiness/banner_step_no_letters.png") top center
    no-repeat;
  background-size: auto 100%;
  ::v-deep .el-button {
    margin-top: 50px;
    border-radius: 0;
  }
  .step {
    margin-top: 80px;
    color: #3c6ef0;
    user-select: none;
    .step__text {
      &:nth-child(1) {
        margin-right: 124px;
      }
      &:nth-child(2) {
        margin-right: 128px;
      }
      &:nth-child(3) {
        margin-right: 120px;
      }
    }
  }
}
.com-subnav-tabs {
  background: #f6f7fc;
  border-bottom: 1px solid #cbcbcb;
}

.viewsWrapper {
  padding: 20px 0 120px;

  .view-item {
    padding-top: 30px;

    .tit {
      font-size: 20px;
      font-weight: 600;
      color: #333;
    }

    .con {
      margin: 8px auto;
      padding: 24px 32px;
      font-size: 14px;
      line-height: 1.5;
      background: #fff;
      &:hover {
        box-shadow: 0 2px 8px 0 rgba(0, 0, 2, 0.12);
      }

      .tit3 {
        font-size: 16px;
        color: #333;
      }

      .txt {
        margin-top: 5px;
        color: #999;
        height: 63px;
        word-break: break-all;
        -webkit-line-clamp: 3;
      }
      .detail-button-wrapper {
        display: flex;
        justify-content: flex-end;
      }
    }

    .no-data {
      color: #999;
      text-align: center;
      font-size: 20px;
      padding-top: 20px;
    }
  }
}
</style>
