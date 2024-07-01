<template>
  <div class="page-partner">
    <Header :alway-white-header="false" />
    <div class="bg-white p-r">
      <div class="page-partner-banner-bg"></div>
      <div class="page-partner-banner-container">
        <div class="page-partner-title">
          <h1>{{ $t("partner.index.5iwb8ta8qdc0") }}</h1>
          <p>{{ $t("partner.index.5iwb8ta93040") }}</p>
        </div>
        <div class="page-partner-identity-container">
          <div class="page-partner-identity">
            <div class="page-partner-identity-1"></div>
            <h2>{{ $t("partner.index.5iwb8ta93041") }}</h2>
            <p>
              {{ $t("partner.index.5iwb8ta93do0") }}
            </p>
          </div>
          <div class="page-partner-identity">
            <div class="page-partner-identity-2"></div>
            <h2>{{ $t("partner.index.5iwb8ta93do1") }}</h2>
            <p>
              {{ $t("partner.index.5iwb8ta93ic0") }}
            </p>
          </div>
          <div class="page-partner-identity">
            <div class="page-partner-identity-3"></div>
            <h2>{{ $t("partner.index.5iwb8ta93uo0") }}</h2>
            <p>
              {{ $t("partner.index.5iwb8ta93yk0") }}
            </p>
          </div>
        </div>
      </div>
      <div class="page-partner-apply-container">
        <div class="page-partner-apply-title">
          {{ $t("partner.index.5iwb8ta94200") }}
        </div>
        <div class="page-partner-join">
          <a
            @click="toBeDevelop"
            :clstag="clstag('', 'homeNew_1645519202450|2')"
            href="javascript: void 0;"
            >{{ $t("partner.index.5iwb8ta945g0") }}</a
          >
        </div>
        <div class="page-partner-apply-content">
          <div class="page-partner-apply-content-first">
            <h6>01</h6>
            <p>{{ $t("partner.index.5iwb8ta948s0") }}</p>
          </div>
          <div class="page-partner-apply-content-second">
            <h6>02</h6>
            <p>{{ $t("partner.index.5iwb8ta94io0") }}</p>
          </div>
          <div class="page-partner-apply-content-third">
            <h6>03</h6>
            <p>{{ $t("partner.index.5iwb8ta94mk0") }}</p>
          </div>
          <div class="page-partner-apply-content-fourth">
            <h6>04</h6>
            <p>{{ $t("partner.index.5iwb8ta94r40") }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray">
      <div class="page-partner-plan-container">
        <div>
          <h3>{{ $t("partner.index.5iwb8ta94uc0") }}</h3>
          <h4 @mouseenter="changeState(1)" @mouseleave="changeState()">
            {{ $t("partner.index.5iwb8ta95bo0") }}
          </h4>
          <h4 @mouseenter="changeState(2)" @mouseleave="changeState()">
            {{ $t("partner.index.5iwb8ta95fc0") }}
          </h4>
          <h4 @mouseenter="changeState(3)" @mouseleave="changeState()">
            {{ $t("partner.index.5iwb8ta95ik0") }}
          </h4>
          <h4 @mouseenter="changeState(4)" @mouseleave="changeState()">
            {{ $t("partner.index.5iwb8ta95pc0") }}
          </h4>
        </div>
        <div class="page-partner-plan-content">
          <div
            :style="state && state !== 1 ? 'opacity: 0.6' : ''"
            class="page-partner-plan"
          >
            <div class="page-partner-plan-cover-1"></div>
            <p class="page-partner-plan-describe">
              {{ $t("partner.index.5iwb8ta95so0") }}
            </p>
          </div>
          <div
            :style="state && state !== 2 ? 'opacity: 0.6' : ''"
            class="page-partner-plan"
          >
            <div class="page-partner-plan-cover-2"></div>
            <p class="page-partner-plan-describe">
              {{ $t("partner.index.5iwb8ta95w00") }}
            </p>
          </div>
          <div
            :style="state && state !== 3 ? 'opacity: 0.6' : ''"
            class="page-partner-plan"
          >
            <div class="page-partner-plan-cover-3"></div>
            <p class="page-partner-plan-describe">
              {{ $t("partner.index.5iwb8ta95zg0") }}
            </p>
          </div>
          <div
            :style="state && state !== 4 ? 'opacity: 0.6' : ''"
            class="page-partner-plan"
          >
            <div class="page-partner-plan-cover-4"></div>
            <p class="page-partner-plan-describe">
              {{ $t("partner.index.5iwb8ta963w0") }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <OpenFooter />
  </div>
</template>

<script>
import Header from "@/components/extranet/Header/index.vue";
import OpenFooter from "@/components/extranet/Footer/index.vue";
import pointMixins from "@/mixins/point";
import operationProcessMixins from "@/mixins/operationProcess";

export default {
  name: "Partner",
  mixins: [pointMixins, operationProcessMixins],
  components: {
    Header,
    OpenFooter,
  },
  data() {
    return {
      state: undefined,
    };
  },
  methods: {
    changeState(state) {
      this.state = state;
    },
  },
};
</script>
<style lang="scss">
@import "./index.scss";
</style>
