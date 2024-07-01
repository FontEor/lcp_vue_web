<template>
  <div>
    <div class="mini-banner-view">
      <div class="com-wrapper">
        <h2 class="tit">{{ productInfo.name }}</h2>
        <p class="tip">{{ productInfo.description }}</p>
        <p>
          <span
            class="btn-white mr20"
            @click="onApply"
            v-if="productInfo.id !== 24"
          >
            申请使用</span
          >
          <span class="btn-plain" @click="docDetail"> 查看文档 </span>
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
    <!-- 产品能力 -->
    <div ref="viewsWrapper" class="viewsWrapper">
      <div class="line-view view-item">
        <div class="tab-box com-wrapper">
          <h2 class="tab-tit">产品能力</h2>
          <el-row :gutter="100" class="list">
            <el-col
              :span="12"
              v-for="productAdvantage in productAdvantages"
              :key="productAdvantage.id"
            >
              <div class="con cf">
                <img :src="productAdvantage.imgUrl" class="ico" />
                <div class="cont">
                  <h3 class="tit">{{ productAdvantage.title }}</h3>
                  <p class="para">{{ productAdvantage.describe }}</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 产品架构 -->
      <div class="framework-view view-item">
        <div class="com-wrapper">
          <h2 class="com-view-tit white">产品架构</h2>
          <img :src="productArchitectureImg" class="cont" @load="loadImg" />
        </div>
      </div>
      <!-- 产品版本 -->
      <div class="version-view view-item" v-if="this.productVersion.length > 0">
        <div class="com-view-tit">
          <h2>产品版本</h2>
        </div>
        <div class="com-wrapper">
          <el-row :gutter="20">
            <el-col v-for="item in productVersion" :key="item.id" :span="8">
              <div class="con">
                <h3 class="tit">{{ item.title }}</h3>
                <p class="para14 te4">{{ item.describe }}</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 应用场景 -->
      <div class="apply-view view-item">
        <div class="com-wrapper">
          <h2 class="com-view-tit">应用场景</h2>
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
              v-for="(item, index) in applicationscenario"
              :key="item.id"
              class="tab-con cf"
            >
              <div
                class="click-cont"
                v-if="tabIdx == index"
                @click="linkAddress(item.linkAddress)"
              >
                <img :src="item.imgUrl" class="bg" />
                <div class="cont">
                  <p class="para14">{{ item.describe }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 合作案例 -->
      <div class="product-view view-item">
        <div class="com-view-tit">
          <h2>合作案例</h2>
        </div>
        <div class="com-wrapper">
          <el-row :gutter="20">
            <el-col
              v-for="content in productFunction"
              :key="content.id"
              :span="spanSize"
            >
              <div class="con">
                <h3 class="tit">{{ content.title }}</h3>
                <p class="para14 te4">{{ content.describe }}</p>
                <a
                  v-if="content.linkAddress"
                  :href="formatUrl(content.linkAddress)"
                  target="_blank"
                  class="link"
                  >查看详情
                  <i class="el-icon-right"></i>
                </a>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 提供二次开发服务 -->
      <div class="extended-view view-item">
        <div class="com-view-tit">
          <h2>提供二次开发服务</h2>
        </div>
        <div class="com-wrapper">
          <el-row :gutter="20">
            <el-col
              v-for="content in extendedDevelop"
              :key="content.id"
              :span="8"
            >
              <div class="con">
                <img :src="content.imgUrl" class="img-icon" />
                <h3 class="tit">{{ content.title }}</h3>
                <p class="para14 te4">{{ content.describe }}</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <blue-footer />
    <el-dialog title="提示" :visible.sync="dialogVisible" width="560px">
      <div class="agreement-cont">
        <p>您的账号为非管理员账号，请登录管理员账号申请使用。</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" type="primary"
          >我知道了</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { SappModule } from "@/store/common/modules/app";
import BlueFooter from "@/components/views/BlueFooter";
import { UserModule } from "@/store/common/modules/user";
import productApi from "@/api/intranet/product/index";

export default {
  components: { BlueFooter },
  data() {
    return {
      isFixed: false,
      scrollY: 0,
      offsetTop: 0,
      listHeight: [],
      tabIdx: 0,
      subnavTabList: [
        "产品能力",
        "产品架构",
        "产品版本",
        "应用场景",
        "合作案例",
        "二次开发",
      ],
      tabList: [],
      spanSize: 12,
      dialogVisible: false,
      //产品能力
      productAdvantages: [],
      //产品架构
      productArchitectureImg: "",
      //产品版本
      productVersion: [],
      //应用场景
      applicationscenario: [],
      //合作案例
      productFunction: [],
      //二次开发服务
      extendedDevelop: [],
      productInfo: {},
    };
  },
  async created() {
    this.tabList = new Array();
    //应用场景
    const productCode = this.$route.params.productCode;
    const params = productCode;
    const res = await productApi.findMiniProductInfo(params);
    this.productInfo = res.data;
    const response = await productApi.queryProductDetails(params);
    const { data } = response;
    data.forEach((item) => {
      // const subNavItem = subNavArray[item.productShowType];
      // this.subnavTabList.push(subNavItem);
      // //去重
      // this.subnavTabList = Array.from(new Set(this.subnavTabList));
      if (item.productShowType === "1") {
        this.productAdvantages.push(item);
      } else if (item.productShowType === "2") {
        this.productArchitectureImg = item.imgUrl;
      } else if (item.productShowType === "3") {
        this.applicationscenario.push(item);
      } else if (item.productShowType === "4") {
        this.productFunction.push(item);
      } else if (item.productShowType === "5") {
        this.extendedDevelop.push(item);
      } else if (item.productShowType === "6") {
        this.productVersion.push(item);
      }
    });
    if (this.productVersion.length === 0) {
      this.subnavTabList = [
        "产品能力",
        "产品架构",
        "应用场景",
        "合作案例",
        "二次开发",
      ];
    }
    if (!this.productArchitectureImg) {
      this.$nextTick(() => {
        this.calculateHeight();
      });
    }
    const content = this.applicationscenario;
    if (content) {
      content.forEach((item) => {
        this.tabList.push(item.title);
      });
    }
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
    docDetail() {
      window.open(`/#/develop-guide/${this.$route.params.productCode}`);
    },
    async onApply() {
      UserModule.setSessionStorage();
      if (UserModule.loginState === true) {
        window.open(`/#/apply/${this.$route.params.productCode}`);
      } else {
        await UserModule.intranetCheckLogin();
      }
    },
    loadImg() {
      this.$nextTick(() => {
        this.calculateHeight();
      });
    },
    linkAddress(linkAddress) {
      if (linkAddress) {
        linkAddress = linkAddress.replace(/https:|http:/, "");
        window.open(`//${linkAddress}`);
      }
    },
    formatUrl(url) {
      if (url) {
        url = url.replace(/https:|http:/, "");
        return `//${url}`;
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
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.$nextTick(() => {
      this.offsetTop = this.$refs.menuWrapper.offsetTop;
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
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
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

    .click-cont {
      cursor: pointer;
    }
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
.version-view {
  background: #ffffff;
  padding: 60px 0;
  .con {
    margin-top: 20px;
    padding: 20px 40px;
    height: 140px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .tit {
      font-size: 18px;
      margin-bottom: 6px;
    }
  }
}

.product-view {
  padding: 60px 0;
  .con {
    position: relative;
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
    .link {
      color: #3c6ef0;
      position: absolute;
      bottom: 24px;
    }
  }
}
.extended-view {
  background: #ffffff;
  padding: 60px 0;
  .con {
    margin-top: 20px;
    padding: 20px 30px;
    height: 180px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 14px;
    .img-icon {
      width: 50px;
      height: 50px;
      margin-top: -30px;
    }
    .tit {
      font-size: 18px;
      margin-top: 14px;
      margin-bottom: 6px;
    }
  }
}
</style>
