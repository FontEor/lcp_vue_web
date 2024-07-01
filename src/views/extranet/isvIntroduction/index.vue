<template>
  <div class="isv-introduction">
    <Header :alway-white-header="false" />
    <main class="isv-introduction__main">
      <div class="main__banner">
        <section class="banner__ability">
          <h2 class="ability__h2">
            {{ $t("isvIntroduction.index.5iw9at14foc0") }}
            <br />
            {{ $t("isvIntroduction.index.5iw9at14g5g0") }}
          </h2>

          <div class="ability__card-wrapper">
            <div
              class="ability__card"
              v-for="item in abilityCardList"
              :key="item.h3"
            >
              <div
                class="card__image"
                :style="{ backgroundImage: `url(${item.backgroundImage})` }"
              ></div>
              <div class="card__text">
                <h3 class="text__h3">{{ item.h3 }}</h3>
                <p class="text__content">
                  {{ item.content }}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="main__process">
        <section class="process__step">
          <h2 class="step__h2">
            {{ $t("isvIntroduction.index.5iw9at14g9o0") }}
          </h2>
          <!-- 立即入驻 -->
          <a
            class="step__link"
            :clstag="clstag('', 'isvIntroduction_1645518271187|1')"
            @click="toBeDevelop"
            :date-content="$t('isvIntroduction.index.5iw9at14i383')"
          />
          <div class="step__bar">
            <div class="bar__card" v-for="item in barCardList" :key="item.h3">
              <p class="card__index">{{ item.index }}</p>
              <h3 class="card__h3">{{ item.h3 }}</h3>
              <p class="card__content">{{ item.content }}</p>
            </div>
          </div>
        </section>
      </div>

      <div class="main__promotion">
        <section class="promotion__ability">
          <div class="ability__text">
            <h2 class="text__h2">
              {{ $t("isvIntroduction.index.5iw9at14gck0") }}
              <br />
              {{ $t("isvIntroduction.index.5iw9at14gf80") }}
            </h2>
            <p class="text__content">
              {{ $t("isvIntroduction.index.5iw9at14i381") }}
            </p>
            <a
              class="text__link"
              :date-content="$t('isvIntroduction.index.5iw9at14i384')"
              :href="textLink"
              target="__blank"
            />

            <div class="text__card-wrapper">
              <div
                class="text__card"
                v-for="item in textCardList"
                :key="item.h3"
              >
                <h3 class="card__h3">{{ item.h3 }}</h3>
                <p class="card__content">{{ item.content }}</p>
                <p class="card__tag">
                  <span class="tag__content">{{ item.tag }}</span>
                </p>
                <router-link
                  class="card__link"
                  :to="{ name: 'AccessGuide', params: { unitId: item.id } }"
                  tag="a"
                  target="_blank"
                >
                  {{ $t("isvIntroduction.index.5iw9at14i382") }}</router-link
                >
              </div>
            </div>
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
import point from "@/mixins/point";
import operationProcess from "@/mixins/operationProcess";
import isvIntroductionDevelopment from "@/assets/extranet/images/isvIntroductionDevelopment.png";
import isvIntroductionTechnology from "@/assets/extranet/images/isvIntroductionTechnology.png";
import isvIntroductionService from "@/assets/extranet/images/isvIntroductionService.png";

export default {
  name: "IsvIntroduction",
  components: { Header, Footer },
  mixins: [point, operationProcess],
  data() {
    return {
      abilityCardList: [
        {
          h3: this.$t("isvIntroduction.index.5iw9at14gi80"),
          content: this.$t("isvIntroduction.index.5iw9at14gkw0"),
          backgroundImage: isvIntroductionDevelopment,
        },
        {
          h3: this.$t("isvIntroduction.index.5iw9at14gnc0"),
          content: this.$t("isvIntroduction.index.5iw9at14gq80"),
          backgroundImage: isvIntroductionTechnology,
        },
        {
          h3: this.$t("isvIntroduction.index.5iw9at14gsg0"),
          content: this.$t("isvIntroduction.index.5iw9at14gus0"),
          backgroundImage: isvIntroductionService,
        },
      ],
      barCardList: [
        {
          index: "01",
          h3: this.$t("isvIntroduction.index.5iw9at14gx80"),
          content: this.$t("isvIntroduction.index.5iw9at14gzk0"),
        },
        {
          index: "02",
          h3: this.$t("isvIntroduction.index.5iw9at14h240"),
          content: this.$t("isvIntroduction.index.5iw9at14h4k0"),
        },
        {
          index: "03",
          h3: this.$t("isvIntroduction.index.5iw9at14h700"),
          content: this.$t("isvIntroduction.index.5iw9at14h9k0"),
        },
        {
          index: "04",
          h3: this.$t("isvIntroduction.index.5iw9at14hc00"),
          content: this.$t("isvIntroduction.index.5iw9at14he80"),
        },
        {
          index: "05",
          h3: this.$t("isvIntroduction.index.5iw9at14hgs0"),
          content: this.$t("isvIntroduction.index.5iw9at14hkg0"),
        },
      ],
      textLink: `//${window.location.host}/#/competence-center`,
      textCardList: [
        {
          h3: this.$t("isvIntroduction.index.5iw9at14hmk0"),
          content: this.$t("isvIntroduction.index.5iw9at14hp40"),
          tag: this.$t("isvIntroduction.index.5iw9at14hr40"),
          id: 157,
        },
        {
          h3: this.$t("isvIntroduction.index.5iw9at14ht80"),
          content: this.$t("isvIntroduction.index.5iw9at14hv80"),
          tag: this.$t("isvIntroduction.index.5iw9at14hx80"),
          id: 158,
        },
        {
          h3: this.$t("isvIntroduction.index.5iw9at14hz80"),
          content: this.$t("isvIntroduction.index.5iw9at14i180"),
          tag: this.$t("isvIntroduction.index.5iw9at14i380"),
          id: 242,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped src="@/views/extranet/isvIntroduction/index.scss" >
</style>
