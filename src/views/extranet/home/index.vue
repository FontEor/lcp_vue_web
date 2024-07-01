<template>
  <div class="home index-container">
    <div class="page-index">
      <Header :alway-white-header="false" />
      <div class="bg-white p-r offset-header">
        <div class="page-index-banner-bg"></div>
        <div class="page-index-banner-container">
          <h1 class="page-index-title">
            <!-- {{ $t("home.index.5iwe1bskmos0") }} -->
          </h1>
          <p class="page-index-describe">
            <!-- {{ $t("home.index.5iwe1bskng00") }} -->
          </p>
          <div class="page-index-business-container">
            <div class="page-index-business page-index-business-1">
              <a href="/#/merchant-introduction" target="_blank">
                <div class="page-index-business-icon"></div>
                <h2>{{ $t("home.index.5iwe1bskntg0") }}</h2>
                <p>{{ $t("home.index.5iwe1bsknxc0") }}</p>
              </a>
            </div>
            <div class="page-index-business page-index-business-2">
              <a href="/#/isv-introduction" target="_blank">
                <div class="page-index-business-icon"></div>
                <h2>ISV</h2>
                <p>
                  {{ $t("home.index.5iwe1bsknlc0") }}<br />{{
                    $t("home.index.5iwe1bsknps0")
                  }}
                </p>
              </a>
            </div>
            <div class="page-index-business page-index-business-3">
              <a href="/#/partner" target="_blank">
                <div class="page-index-business-icon"></div>
                <h2>{{ $t("home.index.5iwe1bsko0o0") }}</h2>
                <p>
                  {{ $t("home.index.5iwe1bsko400") }}<br />{{
                    $t("home.index.5iwe1bsko7k0")
                  }}
                </p>
              </a>
            </div>
          </div>
        </div>
        <div class="page-index-api-container">
          <h2 class="page-index-api-title page-index-general-title">
            {{ $t("home.index.5iwe1bskoak0") }}
            {{ $t("home.index.5iwe1bskodw0") }}
          </h2>
          <div class="page-index-api-describe-conatiner">
            <div>
              <h4 class="page-index-api-describe-bg1">
                {{ $t("home.index.5iwe1bskoh80") }}
              </h4>
              <p>
                {{ $t("home.index.5iwe1bskokg0") }}
              </p>
            </div>
            <div>
              <h4 class="page-index-api-describe-bg2">
                {{ $t("home.index.5iwe1bskons0") }}
              </h4>
              <p>
                {{ $t("home.index.5iwe1bskor40") }}
              </p>
            </div>
            <div>
              <h4 class="page-index-api-describe-bg3">
                {{ $t("home.index.5iwe1bskouc0") }}
              </h4>
              <p>{{ $t("home.index.5iwe1bskoxs0") }}</p>
            </div>
          </div>
          <div class="page-index-api-project-conatiner">
            <Swiper ref="swiper" :options="swiperOptions">
              <SwiperSlide
                v-for="{
                  unitId,
                  docId,
                  h3,
                  remark,
                  tag,
                  buttonText,
                } in apiProjectSwiperSlideList"
                :key="unitId"
              >
                <router-link
                  :to="{
                    name: 'AccessGuideDetail',
                    params: {
                      unitId: unitId,
                      docId: docId
                    },
                  }"
                  tag="a"
                  target="_blank"
                  class="page-index-api-project"
                >
                  <h3>{{ h3 }}</h3>
                  <p>
                    {{ remark }}
                  </p>
                  <div class="page-index-badge-container">
                    <span>{{ tag }}</span>
                  </div>
                  <div class="page-index-api-project__link">
                    {{ buttonText }}
                  </div>
                </router-link>
              </SwiperSlide>
              <div
                class="page-index-api-swiper-pagination-container"
                slot="pagination"
              ></div>
            </Swiper>
          </div>
          <a
            :clstag="clstag('', 'homeNew_1645519202450|1')"
            class="page-index-api-more"
            href="/#/competence-center"
            target="_blank"
            >{{ $t("home.index.5iwe1bskp802") }}
            <i class="el-icon-arrow-right"></i>
          </a>
        </div>
      </div>
      <!-- 解决方案 -->
      <div class="page-index-solution__carousel">
        <Swiper
          class="carousel-swiper"
          ref="blockOuterSwiper"
          :options="solutionSwiperOptions"
        >
          <SwiperSlide
            v-for="slideItem in solutionSwiperSlideList"
            :key="slideItem.title"
            class="swiper__slide"
          >
            <h2 class="slide__h2">
              {{ $t("home.index.5iwe1bskpyo0") }}
              {{ $t("home.index.5iwe1bskpyo1") }}
            </h2>
            <div class="slide-block">
              <div class="block-content">
                <h3 class="content-title" v-html="slideItem.title"></h3>
                <ul class="content-list">
                  <li
                    v-for="item in slideItem.contentList"
                    :key="item.icon"
                    class="list-item"
                  >
                    <i :class="item.icon"></i>
                    {{ item.content }}
                  </li>
                </ul>
                <a
                  :clstag="slideItem.clstag()"
                  class="content-btn"
                  :href="slideItem.link"
                  target="_blank"
                  >{{ $t("home.index.5iwe1bskq180")
                  }}<i class="el-icon-arrow-right"></i
                ></a>
              </div>
              <div
                class="block-image"
                :style="{
                  'background-image': `url(${slideItem.backgroundImage})`,
                }"
              ></div>
            </div>
          </SwiperSlide>
          <div
            class="swiper__pagination swiper-pagination"
            slot="pagination"
          ></div>
        </Swiper>
      </div>
      <!-- 服务 -->
      <div class="bg-white">
        <div class="page-index-service">
          <h2 class="page-index-service-title page-index-general-title">
            {{ $t("home.index.5iwe1bskq400") }}
          </h2>
          <div class="page-index-service-container">
            <div class="page-index-service-instance">
              <div class="page-index-service-icon-1"></div>
              <h3>{{ $t("home.index.5iwe1bskq6g0") }}</h3>
              <ul>
                <li>{{ $t("home.index.5iwe1bskq8s0") }}</li>
              </ul>
            </div>
            <div class="page-index-service-instance">
              <div class="page-index-service-icon-2"></div>
              <h3>{{ $t("home.index.5iwe1bskqb40") }}</h3>
              <ul>
                <li>{{ $t("home.index.5iwe1bskp803") }}</li>
              </ul>
            </div>
            <div class="page-index-service-instance">
              <div class="page-index-service-icon-3"></div>
              <h3>{{ $t("home.index.5iwe1bskqdk0") }}</h3>
              <ul>
                <li>
                  {{ $t("home.index.5iwe1bskqfs0") }}
                </li>
              </ul>
            </div>
            <div class="page-index-service-instance">
              <div class="page-index-service-icon-4"></div>
              <h3>{{ $t("home.index.5iwe1bskqik0") }}</h3>
              <ul>
                <li>{{ $t("home.index.5iwe1bskql00") }}</li>
              </ul>
            </div>
            <div class="page-index-service-instance">
              <div class="page-index-service-icon-5"></div>
              <h3>{{ $t("home.index.5iwe1bskqnk0") }}</h3>
              <ul>
                <li>
                  {{ $t("home.index.5iwe1bskqq00") }}
                </li>
              </ul>
            </div>
            <div class="page-index-service-instance">
              <div class="page-index-service-icon-6"></div>
              <h3>{{ $t("home.index.5iwe1bskqsk0") }}</h3>
              <ul>
                <li>{{ $t("home.index.5iwe1bskp804") }}</li>
              </ul>
            </div>
            <div class="page-index-service-instance">
              <div class="page-index-service-icon-7"></div>
              <h3>{{ $t("home.index.5iwe1bskqv00") }}</h3>
              <ul>
                <li>
                  {{ $t("home.index.5iwe1bskqxc0") }}
                </li>
              </ul>
            </div>
            <div class="page-index-service-instance">
              <div class="page-index-service-icon-8"></div>
              <h3>{{ $t("home.index.5iwe1bskqzs0") }}</h3>
              <ul>
                <li>{{ $t("home.index.5iwe1bskr2w0") }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 页脚 -->
      <OpenFooter />
    </div>
  </div>
</template>

<script>
import pointMixins from "@/mixins/point";
/**
 * swiper文档
 * https://swiperjs.com/migration-guide
 * https://www.swiper.com.cn/api/carousel/27.html
 */
import SwiperS, { Navigation, Pagination, Autoplay, Mousewheel } from "swiper";
SwiperS.use([Navigation, Pagination, Autoplay, Mousewheel]);
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";

import Header from "@/components/extranet/Header/index.vue";
import OpenFooter from "@/components/extranet/Footer/index.vue";
import outerSlideBackgroundImage1 from "@/assets/img/home2022/i_wine.png";
import outerSlideBackgroundImage2 from "@/assets/img/home2022/i_food.png";
import outerSlideBackgroundImage3 from "@/assets/img/home2022/i_makeup.png";

export default {
  name: "Home",
  components: {
    Swiper,
    SwiperSlide,
    Header,
    OpenFooter,
  },
  mixins: [pointMixins],
  data() {
    return {
      swiperOptions: {
        modules: [Navigation, Pagination],
        width: 813,
        height: 289,
        pagination: {
          el: ".page-index-api-swiper-pagination-container",
          clickable: true,
          renderBullet: function (index, className) {
            return (
              '<span class="page-index-api-swiper-pagination ' +
              className +
              '"></span>'
            );
          },
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        slidesPerView: 3,
        // slidesPerGroup: 3,
        spaceBetween: 36,
        loop: true,
        // effect: "cube",
        grabCursor: false,
        allowTouchMove: false,
        touchRatio: 1.2,
      },
      apiProjectSwiperSlideList: [
        {
          unitId: "267",
          docId: "53375",
          h3: this.$t("home.index.5iwe1bskp100"),
          remark: this.$t("home.index.5iwe1bskp4g0"),
          tag: this.$t("home.index.5iwe1bskp800"),
          buttonText: this.$t("home.index.5iwe1bskp801"),
        },
        {
          unitId: "367",
          docId: "55049",
          h3: this.$t("home.index.5iwe1bskpck0"),
          remark: this.$t("home.index.5iwe1bskpg00"),
          tag: this.$t("home.index.5iwe1bskpio0"),
          buttonText: this.$t("home.index.5iwe1bskp801"),
        },
        {
          unitId: "157",
          docId: "100",
          h3: this.$t("home.index.5iwe1bskplc0"),
          remark: this.$t("home.index.5iwe1bskpo80"),
          tag: this.$t("home.index.5iwe1bskpr40"),
          buttonText: this.$t("home.index.5iwe1bskp801"),
        },
      ],
      solutionSwiperOptions: {
        direction: "vertical",
        slidesPerView: 1,
        spaceBetween: 10,
        mousewheel: {
          releaseOnEdges: true,
        },
        pagination: {
          el: ".swiper__pagination.swiper-pagination",
          clickable: true,
        },
      },
      solutionSwiperSlideList: [
        {
          title: this.$t("home.index.5iwe1bskro81"),
          backgroundImage: outerSlideBackgroundImage1,
          contentList: [
            {
              icon: "page-index-warehouse-transport-icon",
              content: this.$t("home.index.5iwe1bskr5c0"),
            },
            {
              icon: "page-index-polymerization-icon",
              content: this.$t("home.index.5iwe1bskr800"),
            },
            {
              icon: "page-index-loop-icon",
              content: this.$t("home.index.5iwe1bskrak0"),
            },
          ],
          link: `//${window.location.host}/#/solution/wine-warehouse`,
          clstag: () => this.clstag("", "homeNew_1645519202450|2"),
        },
        {
          title: this.$t("home.index.5iwe1bskro82"),
          backgroundImage: outerSlideBackgroundImage2,
          contentList: [
            {
              icon: "page-index-warehouse-transport-icon",
              content: this.$t("home.index.5iwe1bskrd80"),
            },
            {
              icon: "page-index-polymerization-icon",
              content: this.$t("home.index.5iwe1bskrg40"),
            },
            {
              icon: "page-index-loop-icon",
              content: this.$t("home.index.5iwe1bskrik0"),
            },
          ],
          link: `//${window.location.host}/#/solution/food-warehouse`,
          clstag: () => this.clstag("", "homeNew_1645519202450|2"),
        },
        {
          title: this.$t("home.index.5iwe1bskro83"),
          backgroundImage: outerSlideBackgroundImage3,
          contentList: [
            {
              icon: "page-index-warehouse-transport-icon",
              content: this.$t("home.index.5iwe1bskr5c0"),
            },
            {
              icon: "page-index-polymerization-icon",
              content: this.$t("home.index.5iwe1bskrl80"),
            },
            {
              icon: "page-index-loop-icon",
              content: this.$t("home.index.5iwe1bskro80"),
            },
          ],
          link: `//${window.location.host}/#/solution/makeup-warehouse`,
          clstag: () => this.clstag("", "homeNew_1645519202450|2"),
        },
      ],
    };
  },
  computed: {
    swiper() {
      return this.$refs.swiper.$swiper;
    },
  },
  mounted() {
    console.log("Current Swiper instance object", this.swiper);
    this.swiper.slideTo(3, 1000, false);
  },
};
</script>

<style lang="scss" scoped src="./index.scss">
</style>
