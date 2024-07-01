<template>
  <div>
    <div class="banner-view">
      <div class="com-wrapper">
        <h2 class="tit">京东物流开放平台产品</h2>
        <p class="tip">完善的产品体系，助力业务的蓬勃发展</p>
      </div>
    </div>
    <div class="com-subnav">
      <div
        class="com-subnav-tabs product"
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
      <div
        class="wms-view view-item"
        v-for="(item, index) in productSystem"
        :key="index"
      >
        <div class="com-wrapper">
          <h2 class="com-view-tit">{{ item.classifyName }}</h2>
          <ul class="ul-wms">
            <router-link
              v-for="(value, index) in item.rows"
              :key="index"
              :to="{
                name: 'ProductDetail',
                params: { productCode: value.code },
              }"
              class="con"
            >
              <li>
                <dl>
                  <dd>
                    <h5>{{ value.name }}</h5>
                    <p>
                      {{ value.description }}
                    </p>
                  </dd>
                </dl>
              </li>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="empty-wrapper" v-if="subnavTabList.length === 0"></div>
    </div>
    <blue-footer />
  </div>
</template>

<script>
import { SappModule } from "@/store/common/modules/app";
import BlueFooter from "@/components/views/BlueFooter";
import productApi from "@/api/intranet/product/index";

export default {
  components: { BlueFooter },
  data() {
    return {
      isFixed: false,
      scrollY: 0,
      offsetTop: 0,
      listHeight: [],
      tabIdx1: 0,
      tabIdx2: 0,
      subnavTabList: [],
      productSystem: [],
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
  async created() {
    const response = await productApi.facadeProductShowList();
    const { data } = response;
    this.productSystem = data.showProductList;
    this.productSystem.forEach((item) => {
      this.subnavTabList.push(item.classifyName);
    });
    this.$nextTick(() => {
      this.calculateHeight();
    });
  },
  methods: {
    handleTab(idx, order) {
      if (order === 1) {
        this.tabIdx1 = idx;
      } else if (order === 2) {
        this.tabIdx2 = idx;
      }
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
.com-subnav-tabs {
  &.product {
    .tab {
      padding: 0 55px;
    }
  }
}
.empty-wrapper {
  padding: 180px 0;
  background: #f4f5fa url("~@/assets/img/product/wms-bg.png") top center
    no-repeat;
  background-size: auto 100%;
}
.wms-view {
  padding: 60px 0;
  background: #f4f5fa url("~@/assets/img/product/wms-bg.png") top center
    no-repeat;
  background-size: auto 100%;

  .com-view-tit {
    margin-bottom: 20px;
  }

  .ul-wms {
    margin: 0 -14px 24px;
    overflow: hidden;

    li {
      float: left;
      width: 612px;
      height: 204px;
      padding: 32px 50px 32px 36px;
      background: url("~@/assets/img/product/c.png") top center no-repeat;

      dt {
        float: left;
        width: 48px;
        height: 48px;
        padding-top: 10px;
        border-radius: 48px;
        background: rgba(60, 110, 240, 1);
        text-align: center;
      }

      dd {
        margin-left: 40px;

        h5 {
          margin-bottom: 12px;
          line-height: 28px;
          font-size: 18px;
          color: rgba(51, 51, 51, 1);
        }

        p {
          line-height: 22px;
          font-size: 14px;
          color: rgba(153, 153, 153, 1);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
    }
  }
}
.banner-view {
  background: #fcfcff url("~@/assets/img/product/banner.jpg") top center
    no-repeat;
  background-size: auto 100%;
}
</style>
