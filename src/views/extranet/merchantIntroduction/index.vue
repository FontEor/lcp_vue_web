<template>
  <div class="merchant-introduction">
    <Header :alway-white-header="false" />
    <main class="merchant-introduction__main">
      <div class="main__banner">
        <section class="banner__ability">
          <h2 class="ability__h2">
            {{ $t("merchantIntroduction.index.5iw9g1a47vg0") }}
            <br />
            {{ $t("merchantIntroduction.index.5iw9g1a48hc0") }}
          </h2>

          <div class="ability__step">
            <h2 class="step__h2">{{
              $t("merchantIntroduction.index.5iw9g1a48lg0")
            }}</h2>
            <!-- 立即入驻 -->
            <a
              class="step__link"
              :clstag="clstag('', 'merchantIntroduction_1645517779457|1')"
              @click="toBeDevelop"
              :date-content="$t('merchantIntroduction.index.5iw9g1a4adc4')"
            />
            <div class="step__bar">
              <div class="bar__card" v-for="item in barCardList" :key="item.h3">
                <p class="card__index">{{ item.index }}</p>
                <h3 class="card__h3">{{ item.h3 }}</h3>
                <p class="card__content">{{ item.content }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="main__carousel">
        <section class="carousel__block">
          <Swiper
            class="block__outer-swiper"
            ref="blockOuterSwiper"
            :options="outerSwiperOptions"
          >
            <SwiperSlide
              v-for="(outerItem, outerIndex) in outerSwiperSlideList"
              :key="outerItem.h2"
              class="outer-swiper__slide"
            >
              <h2 class="slide__h2" v-html="outerItem.h2"></h2>

              <Swiper
                class="slide__inner-swiper"
                ref="slideInnerSwiper"
                :options="innerSwiperOptionsList[outerIndex]"
              >
                <SwiperSlide
                  v-for="innerItem in innerSwiperSlideList[outerIndex]"
                  :key="innerItem.title"
                  :style="{
                    'background-image': `url(${innerItem.backgroundImage})`,
                  }"
                  class="inner-swiper__slide"
                >
                  <p class="slide__content">{{ innerItem.content }}</p>
                </SwiperSlide>
                <div
                  class="inner-swiper__pagination swiper-pagination"
                  slot="pagination"
                ></div>
              </Swiper>
            </SwiperSlide>
            <div
              class="outer-swiper__pagination swiper-pagination"
              slot="pagination"
            ></div>
          </Swiper>
        </section>
      </div>

      <div class="main__support">
        <section class="support__tool">
          <div class="tool__card-wrapper">
            <div class="tool__card" v-for="item in toolCardList" :key="item.h3">
              <h3 class="card__h3">{{ item.h3 }}</h3>
              <p class="card__content">{{ item.content }}</p>
            </div>
          </div>

          <div class="tool__text">
            <h2 class="text__h2">{{
              $t("merchantIntroduction.index.5iw9g1a48oc0")
            }}</h2>
          </div>
        </section>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/extranet/Header/index.vue";
import Footer from "@/components/extranet/Footer/index.vue";
import SwiperS, { Navigation, Pagination, Autoplay, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.min.css";
import point from "@/mixins/point";
import operationProcess from "@/mixins/operationProcess";
import innerSlideBackgroundImage1 from "@/assets/img/home2022/i_wine.png";
import innerSlideBackgroundImage2 from "@/assets/img/home2022/i_food.png";
import innerSlideBackgroundImage3 from "@/assets/img/home2022/i_makeup.png";
import innerSlideBackgroundImage4 from "@/assets/img/home2022/i_maternalAndInfant.png";

SwiperS.use([Navigation, Pagination, Autoplay, Mousewheel]);

export default {
  name: "MerchantIntroduction",
  components: { Header, Footer, Swiper, SwiperSlide },
  mixins: [point, operationProcess],
  data() {
    const self = this;
    return {
      barCardList: [
        {
          index: "01",
          h3: this.$t("merchantIntroduction.index.5iw9g1a48r00"),
          content: this.$t("merchantIntroduction.index.5iw9g1a48tw0"),
        },
        {
          index: "02",
          h3: this.$t("merchantIntroduction.index.5iw9g1a48wg0"),
          content: this.$t("merchantIntroduction.index.5iw9g1a48z00"),
        },
        {
          index: "03",
          h3: this.$t("merchantIntroduction.index.5iw9g1a49240"),
          content: this.$t("merchantIntroduction.index.5iw9g1a494s0"),
        },
        {
          index: "04",
          h3: this.$t("merchantIntroduction.index.5iw9g1a49780"),
          content: this.$t("merchantIntroduction.index.5iw9g1a49a00"),
        },
        {
          index: "05",
          h3: this.$t("merchantIntroduction.index.5iw9g1a49cg0"),
          content: this.$t("merchantIntroduction.index.5iw9g1a49f00"),
        },
      ],
      toolCardList: [
        {
          h3: this.$t("merchantIntroduction.index.5iw9g1a49ho0"),
          content: this.$t("merchantIntroduction.index.5iw9g1a49k00"),
        },
        {
          h3: this.$t("merchantIntroduction.index.5iw9g1a4adc3"),
          content: this.$t("merchantIntroduction.index.5iw9g1a49ms0"),
        },
        {
          h3: this.$t("merchantIntroduction.index.5iw9g1a49p80"),
          content: this.$t("merchantIntroduction.index.5iw9g1a49ro0"),
        },
      ],
      // 外部Swiper配置选项
      outerSwiperOptions: {
        direction: "vertical",
        slidesPerView: 1,
        spaceBetween: 10,
        mousewheel: false,
        pagination: {
          el: ".outer-swiper__pagination.swiper-pagination",
          clickable: true,
        },
      },
      // 外部SwiperSlide数据列表
      outerSwiperSlideList: [
        {
          h2: `${this.$t(
            "merchantIntroduction.index.5iw9g1a4adc1"
          )}<br />${this.$t("merchantIntroduction.index.5iw9g1a4adc2")}`,
        },
      ],
      // 内部Swiper配置选项列表
      innerSwiperOptionsList: [
        {
          direction: "vertical",
          slidesPerView: 1,
          spaceBetween: 10,
          pagination: {
            el: ".inner-swiper__pagination.swiper-pagination",
            clickable: false,
            renderBullet(index, className) {
              const innerSlideIndex = 0;
              return `<a class="${className} swiper-pagination-bullet-custom" href="${self.innerSwiperSlideList[innerSlideIndex][index].link}" target="__blank">${self.innerSwiperSlideList[innerSlideIndex][index].title}</a>`;
            },
          },
        },
      ],
      innerSwiperSlideList: [
        [
          {
            backgroundImage: innerSlideBackgroundImage1,
            title: this.$t("merchantIntroduction.index.5iw9g1a49uo0"),
            content: this.$t("merchantIntroduction.index.5iw9g1a49yc0"),
            link: `//${window.location.host}/#/solution/wine-warehouse`,
          },
          {
            backgroundImage: innerSlideBackgroundImage2,
            title: this.$t("merchantIntroduction.index.5iw9g1a4a0s0"),
            content: this.$t("merchantIntroduction.index.5iw9g1a4a380"),
            link: `//${window.location.host}/#/solution/food-warehouse`,
          },
          {
            backgroundImage: innerSlideBackgroundImage3,
            title: this.$t("merchantIntroduction.index.5iw9g1a4a5s0"),
            content: this.$t("merchantIntroduction.index.5iw9g1a4a7o0"),
            link: `//${window.location.host}/#/solution/makeup-warehouse`,
          },
          {
            backgroundImage: innerSlideBackgroundImage4,
            title: this.$t("merchantIntroduction.index.5iw9g1a4a9s0"),
            content: this.$t("merchantIntroduction.index.5iw9g1a4adc0"),
            link: `//${window.location.host}/#/solution/maternalAndInfant-warehouse`,
          },
        ],
      ],
      innerSwiperActiveIndex: 0,
      refOuterSlideList: [],
      elInnerBulletList: [],
    };
  },
  methods: {
    // 初始化Swiper鼠标移入内部Swiper分页器圆点事件监听
    initSwiperMouseenter() {
      this.refOuterSlideList = this.$refs.blockOuterSwiper.$children;
      this.elInnerBulletList = this.refOuterSlideList.map((item) =>
        item.$el.querySelectorAll(
          ".inner-swiper__pagination .swiper-pagination-bullet"
        )
      );
      this.handleInnerBulletMouseoverListener("addEventListener");
    },
    // 添加或移除内部Swiper分页器圆点事件监听操作
    handleInnerBulletMouseoverListener(action = "addEventListener") {
      this.refOuterSlideList.forEach((_, refOuterSlideIndex) => {
        this.elInnerBulletList[refOuterSlideIndex].forEach(
          (elInnerBulletItem, elInnerBulletIndex) => {
            elInnerBulletItem[action]("mouseenter", () => {
              this.$refs.slideInnerSwiper[refOuterSlideIndex].$swiper.slideTo(
                elInnerBulletIndex
              );
            });
          }
        );
      });
    },
  },
  mounted() {
    this.initSwiperMouseenter();
  },
  beforeDestroy() {
    this.handleInnerBulletMouseoverListener("removeEventListener");
  },
};
</script>

<style
  lang="scss"
  scoped
  src="@/views/extranet/merchantIntroduction/index.scss"
></style>
