<template>
  <div>
    <div class="mini-banner-view">
      <div class="com-wrapper">
        <h2 class="tit">{{ jsonObj.title }}</h2>
        <p class="tip">{{ jsonObj.content }}</p>
        <!-- 2020.12.24 WMS详情页新增两个按钮，其他详情页不显示 -->
        <p v-if="canApply">
          <span class="btn-white mr20" @click="onApply">
            <!--              <router-link :to="{name:'apply'}">-->
            {{ $t("product.extranetDetail.5iw5kkd17uw0") }}
            <!--              </router-link>-->
          </span>
        </p>
      </div>
    </div>
    <div class="com-subnav">
      <div
        class="com-subnav-tabs"
        :class="{ is_fixed: isFixed }"
        ref="menuWrapper"
      >
        <a
          v-for="(item, index) in subnavTabList"
          :key="index"
          class="tab"
          :class="{ active: currentIndex == index }"
          @click.stop.prevent="selectMenu(index)"
        >
          {{ item }}
        </a>
      </div>
    </div>
    <div ref="viewsWrapper" class="viewsWrapper">
      <div class="line-view view-item">
        <div class="tab-box com-wrapper">
          <h2 class="tab-tit">{{ jsonObj.productAdvantages.title }}</h2>
          <el-row :gutter="100" class="list">
            <el-col
              :span="12"
              v-for="productAdvantages in jsonObj.productAdvantages.content"
              :key="productAdvantages.id"
            >
              <!-- <a href="javascript:;" class="con cf"> -->
              <div class="con cf">
                <img
                  :src="
                    require(`@/assets/img/productDetail/` +
                      productAdvantages.src)
                  "
                  class="ico"
                />
                <div class="cont">
                  <h3 class="tit">{{ productAdvantages.title }}</h3>
                  <p class="para">{{ productAdvantages.content }}</p>
                </div>
              </div>
              <!-- </a> -->
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="apply-view view-item">
        <div class="com-wrapper">
          <h2 class="com-view-tit">{{ jsonObj.applicationscenario.title }}</h2>
          <div class="com-view-tabs">
            <a
              v-for="(item, i) in tabList"
              :key="i"
              @click="handleTab(i)"
              class="tab"
              :class="{ active: tabIdx == i }"
            >
              {{ item }}
            </a>
          </div>
          <div class="tab-box">
            <div
              v-for="applicationscenario in jsonObj.applicationscenario.content"
              :key="applicationscenario.id"
              class="tab-con cf"
            >
              <div v-if="tabIdx == applicationscenario.id">
                <img
                  :src="
                    require(`@/assets/img/productDetail/` +
                      applicationscenario.src)
                  "
                  class="bg"
                />
                <div class="cont">
                  <p class="para14">{{ applicationscenario.content }}</p>
                  <!-- <a href="javascript:;" class="btn">
                    <el-button type="text"><a :href="applicationscenario.url" target="_blank">{{$t('product.extranetDetail.5iw5kkd18n80')}}</a><i class="el-icon-right el-icon&#45;&#45;right"></i></el-button>
                  </a> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="framework-view view-item" v-if="jsonObj.productArchitecture">
        <div class="com-wrapper">
          <h2 class="com-view-tit white">
            {{ jsonObj.productArchitecture.title }}
          </h2>
          <img
            :src="
              require(`@/assets/img/productDetail/` +
                jsonObj.productArchitecture.src)
            "
            class="cont"
          />
          <!-- <div class="cont"></div> -->
        </div>
      </div>
      <div class="product-view view-item">
        <div class="com-view-tit">
          <h2>{{ jsonObj.productFunction.title }}</h2>
          <p class="tip">{{ jsonObj.productFunction.tip }}</p>
        </div>
        <div class="com-wrapper">
          <el-row :gutter="20">
            <el-col
              v-for="content in jsonObj.productFunction.content"
              :key="content.id"
              :span="spanSize"
            >
              <div class="con">
                <h3 class="tit">{{ content.title }}</h3>
                <p class="para14 te4">{{ content.content }}</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <BlueFooter />
    <el-dialog
      :title="$t('product.extranetDetail.5iw5kkd18qc0')"
      :visible.sync="dialogVisible"
      width="560px"
    >
      <div class="agreement-cont">
        <p>{{ $t("product.extranetDetail.5iw5kkd18to0") }}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" type="primary">{{
          $t("product.extranetDetail.5iw5kkd18xo0")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { SappModule } from "@/store/common/modules/app";
import BlueFooter from "@/components/views/BlueFooter.vue";
import request from "@/utils/request";
import { UserModule } from "@/store/common/modules/user";

export default {
  name: "ProductDetail",
  components: { BlueFooter },
  data() {
    return {
      isFixed: false,
      scrollY: 0,
      offsetTop: 0,
      listHeight: [],
      tabIdx: 0,
      subnavTabList: [
        this.$t("product.extranetDetail.5iw5kkd190w0"),
        this.$t("product.extranetDetail.5iw5kkd19400"),
        this.$t("product.extranetDetail.5iw5kkd19780"),
        this.$t("product.extranetDetail.5iw5kkd19a80"),
      ],
      tabList: [],
      jsonObj: "",
      canApply: false,
      spanSize: 12,
      dialogVisible: false,
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
    async onApply() {
      if (UserModule.loginState === true) {
        const loading = this.$loading({
          lock: true,
          text: this.$t("product.extranetDetail.5iw5kkd19gc0"),
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        request({
          url: "/user/getUserRole",
          method: "get",
        })
          .then((rsp) => {
            loading.close();
            const role = rsp.data;
            if (role === 1) {
              this.$router.push("/apply");
            } else {
              this.dialogVisible = true;
            }
          })
          .catch((e) => {
            loading.close();
          });
      } else {
        await UserModule.extranetCheckLogin();
      }
    },
    handleTab(idx) {
      this.tabIdx = idx;
    },
    calculateHeight() {
      const viewList =
        this.$refs.viewsWrapper.getElementsByClassName("view-item");
      let height = 300;
      this.listHeight.push(height);
      for (let i = 0, len = viewList.length; i < len; i++) {
        const item = viewList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index) {
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
  created() {
    const { productCode } = this.$route.params;
    if (productCode === "WMS") {
      this.subnavTabList = [
        this.$t("product.extranetDetail.5iw5kkd190w0"),
        this.$t("product.extranetDetail.5iw5kkd19400"),
        this.$t("product.extranetDetail.5iw5kkd19a80"),
      ];
      this.subnavTabList[2] = this.$t("product.extranetDetail.5iw5kkd19d80");
      this.canApply = true;
    }
    this.jsonObj = require(`../../data/product/${productCode}.json`);
    this.tabList = new Array();
    const { content } = this.jsonObj.applicationscenario;
    if (content) {
      const _this = this;
      content.forEach((item) => {
        _this.tabList.push(item.title);
      });
    }
    const functionContent = this.jsonObj.productFunction.content;
    if (functionContent.length === 3) {
      this.spanSize = 8;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.$nextTick(() => {
      this.offsetTop = this.$refs.menuWrapper.offsetTop;
      this.calculateHeight();
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    SappModule.SET_NAVBAR_FIXED(true);
  },
};
</script>

<style lang="scss" scoped>
.mini-banner-view {
  padding-top: 50px;
  background: #2738ac url("~@/assets/img/productDetail/banner.jpg") top center
    no-repeat;
  background-size: auto 100%;

  .tip {
    margin-bottom: 18px;
  }

  .btn-white,
  .btn-plain {
    display: inline-block;
    padding: 6px 16px;
    line-height: 20px;
    font-size: 14px;
    cursor: pointer;
  }

  .btn-white {
    border: 1px solid rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.9);
    color: rgba(60, 110, 240, 1);

    &:hover {
      border: 1px solid rgba(255, 255, 255, 1);
      background: rgba(255, 255, 255, 1);
    }
  }

  .btn-plain {
    border: 1px solid rgba(255, 255, 255, 0.85);
    background: transparent;
    color: rgba(255, 255, 255, 0.85);

    &:hover {
      border: 1px solid rgba(255, 255, 255, 1);
      color: rgba(255, 255, 255, 1);
    }
  }
}

.line-view {
  background: #fff;

  .tab-box {
    padding: 60px 0 20px;

    .tab-tit {
      text-align: center;
      font-size: 24px;
      margin-bottom: 50px;
    }

    .con {
      display: block;
      background: #fff;
      padding: 20px 24px;
      height: 200px;

      .ico {
        float: left;
        width: 48px;
        height: 48px;
      }

      .cont {
        margin-left: 64px;

        .tit {
          font-size: 18px;
          line-height: 28px;
          margin-bottom: 4px;
        }
      }
    }
  }
}

.apply-view {
  background: #f4f5fa;
  padding: 60px 0;

  .com-view-tit {
    margin-bottom: 20px;
  }

  .tab-box {
    margin-top: 20px;
    height: 320px;
    background: #fff url("~@/assets/img/common/decorate.jpg") right 20px bottom
      20px no-repeat;
    background-size: 171px 132px;
    padding: 40px;

    .bg {
      float: left;
      width: 388px;
      height: 240px;
      margin-right: 50px;
    }

    .btn {
      display: block;
      margin-top: 20px;
    }
  }
}

.framework-view {
  padding: 60px 0;
  background: #fff url("~@/assets/img/productDetail/bg-1.jpg") top center
    no-repeat;
  background-size: 100% 100%;

  .cont {
    display: block;
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-size: auto 100%;
  }
}

.product-view {
  padding: 60px 0;
  .con {
    margin-top: 20px;
    padding: 40px 70px;
    height: 210px;
    background: #fff url("~@/assets/img/common/doc-right.png") bottom right
      no-repeat;
    background-size: 110px 76px;

    .tit {
      font-size: 18px;
      margin-bottom: 6px;
    }
  }
}
</style>
