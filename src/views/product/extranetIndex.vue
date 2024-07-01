<template>
  <div>
    <div class="banner-view">
      <div class="com-wrapper">
        <h2 class="tit">{{ $t("product.extranetIndex.5iw5c1y30vw0") }}</h2>
        <p class="tip">{{ $t("product.extranetIndex.5iw5c1y31i00") }}</p>
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
      <div class="wms-view view-item">
        <div class="com-wrapper">
          <h2 class="com-view-tit">WMS</h2>
          <ul class="ul-wms">
            <router-link
              target="_blank"
              :to="{ name: 'ProductDetail', params: { productCode: 'WMS' } }"
              class="con"
            >
              <li>
                <dl>
                  <dt><i class="i-wms1"></i></dt>
                  <dd>
                    <h5>{{ $t("product.extranetIndex.5iw5c1y31m80") }}</h5>
                    <p>
                      {{ $t("product.extranetIndex.5iw5c1y31p00") }}
                    </p>
                  </dd>
                </dl>
              </li>
            </router-link>
            <router-link
              target="_blank"
              :to="{ name: 'ProductDetail', params: { productCode: 'WMS' } }"
              class="con"
            >
              <li>
                <dl>
                  <dt><i class="i-wms2"></i></dt>
                  <dd>
                    <h5>{{ $t("product.extranetIndex.5iw5c1y31ro0") }}</h5>
                    <p>
                      {{ $t("product.extranetIndex.5iw5c1y31uw0") }}
                    </p>
                  </dd>
                </dl>
              </li>
            </router-link>
          </ul>
          <el-row class="tc">
            <!--            <span class="btn-view-more">-->
            <div class="btn-wrap">
              <el-button type="primary" class="btn">
                <router-link
                  target="_blank"
                  :to="{
                    name: 'ProductDetail',
                    params: { productCode: 'WMS' },
                  }"
                  class="mask"
                  >{{ $t("product.extranetIndex.5iw5c1y31xk0") }}</router-link
                >
              </el-button>
            </div>
            <!--            </span>-->
          </el-row>
        </div>
      </div>
      <div class="line-view view-item">
        <div class="tab-box com-wrapper">
          <h2 class="tit">{{ $t("product.extranetIndex.5iw5c1y32080") }}</h2>
          <el-row :gutter="10">
            <el-col :span="5">
              <router-link
                target="_blank"
                :to="{
                  name: 'ProductDetail',
                  params: { productCode: 'DisplayBoard' },
                }"
                class="con"
              >
                <img src="~@/assets/img/product/icon-1@2x.png" class="ico" />
                <h3 class="mini-tit">
                  {{ $t("product.extranetIndex.5iw5c1y32340") }}
                </h3>
                <p class="tip">
                  {{ $t("product.extranetIndex.5iw5c1y325o0") }}
                </p>
                <el-button type="primary" class="btn">{{
                  $t("product.extranetIndex.5iw5c1y32840")
                }}</el-button>
              </router-link>
            </el-col>
            <el-col :span="5">
              <router-link
                target="_blank"
                :to="{
                  name: 'ProductDetail',
                  params: { productCode: 'Commoditylayout' },
                }"
                class="con"
              >
                <img src="~@/assets/img/product/icon-2@2x.png" class="ico" />
                <h3 class="mini-tit">
                  {{ $t("product.extranetIndex.5iw5c1y32as0") }}
                </h3>
                <p class="tip">
                  {{ $t("product.extranetIndex.5iw5c1y32dg0") }}
                </p>
                <el-button type="primary" class="btn">{{
                  $t("product.extranetIndex.5iw5c1y32840")
                }}</el-button>
              </router-link>
            </el-col>
            <el-col :span="5">
              <router-link
                target="_blank"
                :to="{
                  name: 'ProductDetail',
                  params: { productCode: 'Inventorysimulation' },
                }"
                class="con"
              >
                <img src="~@/assets/img/product/icon-3.png" class="ico" />
                <h3 class="mini-tit">
                  {{ $t("product.extranetIndex.5iw5c1y32g80") }}
                </h3>
                <p class="tip">
                  {{ $t("product.extranetIndex.5iw5c1y32j00") }}
                </p>
                <el-button type="primary" class="btn">{{
                  $t("product.extranetIndex.5iw5c1y32840")
                }}</el-button>
              </router-link>
            </el-col>
            <el-col :span="5">
              <router-link
                target="_blank"
                :to="{
                  name: 'ProductDetail',
                  params: { productCode: 'Salesforecast' },
                }"
                class="con"
              >
                <img src="~@/assets/img/product/icon-4@2x.png" class="ico" />
                <h3 class="mini-tit">
                  {{ $t("product.extranetIndex.5iw5c1y32lg0") }}
                </h3>
                <p class="tip">
                  {{ $t("product.extranetIndex.5iw5c1y32o40") }}
                </p>
                <el-button type="primary" class="btn">{{
                  $t("product.extranetIndex.5iw5c1y32840")
                }}</el-button>
              </router-link>
            </el-col>
            <el-col :span="5">
              <router-link
                target="_blank"
                :to="{
                  name: 'ProductDetail',
                  params: { productCode: 'Intelligentsupplementaryadjustment' },
                }"
                class="con"
              >
                <img src="~@/assets/img/product/icon-5@2x.png" class="ico" />
                <h3 class="mini-tit">
                  {{ $t("product.extranetIndex.5iw5c1y32qk0") }}
                </h3>
                <p class="tip">
                  {{ $t("product.extranetIndex.5iw5c1y32t00") }}
                </p>
                <el-button type="primary" class="btn">{{
                  $t("product.extranetIndex.5iw5c1y32840")
                }}</el-button>
              </router-link>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="goodness-view view-item">
        <div class="com-wrapper">
          <h2 class="com-view-tit">
            {{ $t("product.extranetIndex.5iw5c1y32vw0") }}
          </h2>
          <div class="com-view-tabs">
            <a
              v-for="(item, i) in tabList1"
              :key="i"
              @click="handleTab(i, 1)"
              class="tab"
              :class="{ active: tabIdx1 === i }"
            >
              {{ item }}
            </a>
          </div>
          <div class="tab-box">
            <div v-if="tabIdx1 === 0" class="tab-con cf">
              <img src="~@/assets/img/product/banner-b1@1x.jpg" class="bg" />
              <div class="cont">
                <p class="para14">
                  {{ $t("product.extranetIndex.5iw5c1y32zg0") }}
                </p>
                <a href="javascript:;" class="btn">
                  <el-button type="text">
                    <router-link
                      target="_blank"
                      :to="{
                        name: 'ProductDetail',
                        params: { productCode: 'Intelligentlocation' },
                      }"
                      class="mask"
                      >{{
                        $t("product.extranetIndex.5iw5c1y31xk0")
                      }}</router-link
                    >
                    <i class="el-icon-right el-icon--right"></i
                  ></el-button>
                </a>
              </div>
            </div>
            <div v-if="tabIdx1 === 1" class="tab-con cf">
              <img src="~@/assets/img/product/banner-b2@1x.jpg" class="bg" />
              <div class="cont">
                <p class="para14">
                  {{ $t("product.extranetIndex.5iw5c1y331s0") }}
                </p>
                <a href="javascript:;" class="btn">
                  <el-button type="text">
                    <router-link
                      target="_blank"
                      :to="{
                        name: 'ProductDetail',
                        params: { productCode: 'Intelligentscheduling' },
                      }"
                      class="mask"
                    >
                      {{ $t("product.extranetIndex.5iw5c1y31xk0") }}
                    </router-link>
                    <i class="el-icon-right el-icon--right"></i
                  ></el-button>
                </a>
              </div>
            </div>
            <div v-if="tabIdx1 === 2" class="tab-con cf">
              <img src="~@/assets/img/product/banner-b3@1x.jpg" class="bg" />
              <div class="cont">
                <p class="para14">
                  {{ $t("product.extranetIndex.5iw5c1y334k0") }}
                </p>
                <a href="javascript:;" class="btn">
                  <el-button type="text">
                    <router-link
                      target="_blank"
                      :to="{
                        name: 'ProductDetail',
                        params: { productCode: 'Networksimulation' },
                      }"
                      class="mask"
                      >{{
                        $t("product.extranetIndex.5iw5c1y31xk0")
                      }}</router-link
                    >
                    <i class="el-icon-right el-icon--right"></i
                  ></el-button>
                </a>
              </div>
            </div>
            <div v-if="tabIdx1 === 3" class="tab-con cf">
              <img src="~@/assets/img/product/banner-b4@1x.jpg" class="bg" />
              <div class="cont">
                <p class="para14">
                  {{ $t("product.extranetIndex.5iw5c1y33700") }}
                </p>
                <a href="javascript:;" class="btn">
                  <el-button type="text">
                    <router-link
                      target="_blank"
                      :to="{
                        name: 'ProductDetail',
                        params: { productCode: 'Sitesimulation' },
                      }"
                      class="mask"
                      >{{
                        $t("product.extranetIndex.5iw5c1y31xk0")
                      }}</router-link
                    >
                    <i class="el-icon-right el-icon--right"></i
                  ></el-button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="block-chain-view view-item">
        <div class="com-wrapper">
          <h2 class="com-view-tit">
            {{ $t("product.extranetIndex.5iw5c1y33980") }}
          </h2>
          <el-row :gutter="20" class="con-wrap">
            <el-col :span="12">
              <router-link
                target="_blank"
                :to="{
                  name: 'ProductDetail',
                  params: { productCode: 'Jingyuanchain' },
                }"
                class="mask"
              >
                <div class="con">
                  <h3 class="tit">
                    {{ $t("product.extranetIndex.5iw5c1y33b80") }}
                  </h3>
                  <p class="para">
                    {{ $t("product.extranetIndex.5iw5c1y33dg0") }}
                  </p>
                </div>
              </router-link>
            </el-col>
            <el-col :span="12">
              <router-link
                target="_blank"
                :to="{
                  name: 'ProductDetail',
                  params: { productCode: 'Signatureonthechain' },
                }"
                class="mask"
              >
                <div class="con">
                  <h3 class="tit">
                    {{ $t("product.extranetIndex.5iw5c1y33gs0") }}
                  </h3>
                  <p class="para">
                    {{ $t("product.extranetIndex.5iw5c1y33iw0") }}
                  </p>
                </div>
              </router-link>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="gis-view view-item">
        <div class="com-wrapper">
          <div class="com-view-tit">
            <h2>{{ $t("product.extranetIndex.5iw5c1y33lc0") }}</h2>
            <p class="tip">
              {{ $t("product.extranetIndex.5iw5c1y33nc0") }}
              <br />
              {{ $t("product.extranetIndex.5iw5c1y33pg0") }}
            </p>
          </div>
          <el-row class="con-wrap">
            <el-col :span="8">
              <a href="javascript:;" class="con">
                <img src="~@/assets/img/common/icon1@2x.png" class="ico" />
                <h3 class="tit">
                  {{ $t("product.extranetIndex.5iw5c1y33rs0") }}
                </h3>
                <p class="para14 te2">
                  {{ $t("product.extranetIndex.5iw5c1y33ts0") }}
                </p>
                <div class="dep"></div>
              </a>
            </el-col>
            <el-col :span="8">
              <a href="javascript:;" class="con">
                <img src="~@/assets/img/common/icon2@2x.png" class="ico" />
                <h3 class="tit">
                  {{ $t("product.extranetIndex.5iw5c1y33vw0") }}
                </h3>
                <p class="para14 te2">
                  {{ $t("product.extranetIndex.5iw5c1y33y40") }}
                </p>
                <div class="dep"></div>
              </a>
            </el-col>
            <el-col :span="8">
              <a href="javascript:;" class="con">
                <img src="~@/assets/img/common/icon3@2x.png" class="ico" />
                <h3 class="tit">
                  {{ $t("product.extranetIndex.5iw5c1y340k0") }}
                </h3>
                <p class="para14 te2">
                  {{ $t("product.extranetIndex.5iw5c1y342o0") }}
                </p>
              </a>
            </el-col>
          </el-row>
          <div class="btn-wrap">
            <el-button type="primary" class="btn">
              <router-link
                target="_blank"
                :to="{ name: 'ProductDetail', params: { productCode: 'GIS' } }"
                class="mask"
                >{{ $t("product.extranetIndex.5iw5c1y344o0") }}</router-link
              >
            </el-button>
          </div>
        </div>
      </div>
      <div class="vision-view view-item">
        <div class="com-wrapper">
          <div class="com-view-tit white">
            <h2>{{ $t("product.extranetIndex.5iw5c1y346o0") }}</h2>
            <p class="tip">{{ $t("product.extranetIndex.5iw5c1y348s0") }}</p>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <router-link
                target="_blank"
                :to="{
                  name: 'ProductDetail',
                  params: { productCode: 'Monitoringvideonetworking' },
                }"
                class="con cf"
              >
                <img src="~@/assets/img/common/ico3.png" class="ico" />
                <div class="cont">
                  <h3 class="tit">
                    {{ $t("product.extranetIndex.5iw5c1y34b00") }}
                  </h3>
                  <p class="para">
                    {{ $t("product.extranetIndex.5iw5c1y34d40") }}
                  </p>
                </div>
              </router-link>
            </el-col>
            <el-col :span="12">
              <router-link
                target="_blank"
                :to="{
                  name: 'ProductDetail',
                  params: { productCode: 'Intelligentvideoanalysis' },
                }"
                class="con cf"
              >
                <img src="~@/assets/img/common/ico2.png" class="ico" />
                <div class="cont">
                  <h3 class="tit">
                    {{ $t("product.extranetIndex.5iw5c1y34f80") }}
                  </h3>
                  <p class="para">
                    {{ $t("product.extranetIndex.5iw5c1y34hw0") }}
                  </p>
                </div>
              </router-link>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="unmanned-view view-item">
        <div class="com-wrapper">
          <div class="com-view-tit">
            <h2>{{ $t("product.extranetIndex.5iw5c1y34k00") }}</h2>
            <p class="tip">
              {{ $t("product.extranetIndex.5iw5c1y34m40") }}
            </p>
          </div>
          <div class="com-view-tabs">
            <a
              v-for="(item, i) in tabList2"
              :key="i"
              @click="handleTab(i, 2)"
              class="tab"
              :class="{ active: tabIdx2 == i }"
            >
              {{ item }}
            </a>
          </div>
          <div class="tab-box">
            <el-row v-if="tabIdx2 === 0" :gutter="20" class="tab-con">
              <el-col :span="8">
                <a href="javascript:;" class="con">
                  <img src="~@/assets/img/product/tab11.jpg" class="bg" />
                  <div class="bm-mask">
                    {{ $t("product.extranetIndex.5iw5c1y34o80") }}
                  </div>
                  <div class="mask vcbox">
                    <h3 class="tit">
                      {{ $t("product.extranetIndex.5iw5c1y34o80") }}
                    </h3>
                    <p class="tip">
                      {{ $t("product.extranetIndex.5iw5c1y34qc0") }}
                    </p>
                    <!-- <div class="btn">了解详情<i class="el-icon-right"></i></div> -->
                  </div>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="javascript:;" class="con">
                  <img src="~@/assets/img/product/tab12.jpg" class="bg" />
                  <div class="bm-mask">
                    {{ $t("product.extranetIndex.5iw5c1y34so0") }}
                  </div>
                  <div class="mask vcbox">
                    <h3 class="tit">
                      {{ $t("product.extranetIndex.5iw5c1y34so0") }}
                    </h3>
                    <p class="tip">
                      {{ $t("product.extranetIndex.5iw5c1y34uo0") }}
                    </p>
                    <!-- <div class="btn">了解详情<i class="el-icon-right"></i></div> -->
                  </div>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="javascript:;" class="con">
                  <img src="~@/assets/img/product/tab13.jpg" class="bg" />
                  <div class="bm-mask">
                    {{ $t("product.extranetIndex.5iw5c1y34ws0") }}
                  </div>
                  <div class="mask vcbox">
                    <h3 class="tit">
                      {{ $t("product.extranetIndex.5iw5c1y34ws0") }}
                    </h3>
                    <p class="tip">
                      {{ $t("product.extranetIndex.5iw5c1y34z40") }}
                    </p>
                    <!-- <div class="btn">了解详情<i class="el-icon-right"></i></div> -->
                  </div>
                </a>
              </el-col>
            </el-row>
            <el-row v-if="tabIdx2 === 1" :gutter="20" class="tab-con">
              <el-col :span="8">
                <a href="javascript:;" class="con">
                  <img src="~@/assets/img/product/tab21.png" class="bg" />
                  <div class="bm-mask">
                    {{ $t("product.extranetIndex.5iw5c1y35180") }}
                  </div>
                  <div class="mask vcbox">
                    <h3 class="tit">
                      {{ $t("product.extranetIndex.5iw5c1y35180") }}
                    </h3>
                    <p class="tip">
                      {{ $t("product.extranetIndex.5iw5c1y353g0") }}
                    </p>
                    <!-- <div class="btn">了解详情<i class="el-icon-right"></i></div> -->
                  </div>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="javascript:;" class="con">
                  <img src="~@/assets/img/product/tab22.png" class="bg" />
                  <div class="bm-mask">
                    {{ $t("product.extranetIndex.5iw5c1y355c0") }}
                  </div>
                  <div class="mask vcbox">
                    <h3 class="tit">
                      {{ $t("product.extranetIndex.5iw5c1y355c0") }}
                    </h3>
                    <p class="tip">
                      {{ $t("product.extranetIndex.5iw5c1y357g0") }}
                    </p>
                    <!-- <div class="btn">了解详情<i class="el-icon-right"></i></div> -->
                  </div>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="javascript:;" class="con">
                  <img src="~@/assets/img/product/tab23-1.jpg" class="bg" />
                  <div class="bm-mask">
                    {{ $t("product.extranetIndex.5iw5c1y359g0") }}
                  </div>
                  <div class="mask vcbox">
                    <h3 class="tit">
                      {{ $t("product.extranetIndex.5iw5c1y359g0") }}
                    </h3>
                    <p class="tip">
                      {{ $t("product.extranetIndex.5iw5c1y35bg0") }}
                    </p>
                    <!-- <div class="btn">了解详情<i class="el-icon-right"></i></div> -->
                  </div>
                </a>
              </el-col>
            </el-row>
            <el-row v-if="tabIdx2 === 2" :gutter="20" class="tab-con">
              <el-col :span="8">
                <a href="javascript:;" class="con">
                  <img src="~@/assets/img/product/tab31.png" class="bg" />
                  <div class="bm-mask">
                    {{ $t("product.extranetIndex.5iw5c1y35dc0") }}
                  </div>
                  <div class="mask vcbox">
                    <h3 class="tit">
                      {{ $t("product.extranetIndex.5iw5c1y35dc0") }}
                    </h3>
                    <p class="tip">
                      {{ $t("product.extranetIndex.5iw5c1y35fg0") }}
                    </p>
                    <!-- <div class="btn">了解详情<i class="el-icon-right"></i></div> -->
                  </div>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="javascript:;" class="con">
                  <img src="~@/assets/img/product/tab32.png" class="bg" />
                  <div class="bm-mask">
                    {{ $t("product.extranetIndex.5iw5c1y35ho0") }}
                  </div>
                  <div class="mask vcbox">
                    <h3 class="tit">
                      {{ $t("product.extranetIndex.5iw5c1y35ho0") }}
                    </h3>
                    <p class="tip">
                      {{ $t("product.extranetIndex.5iw5c1y35jo0") }}
                    </p>
                    <!-- <div class="btn">了解详情<i class="el-icon-right"></i></div> -->
                  </div>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="javascript:;" class="con">
                  <img src="~@/assets/img/product/tab33.png" class="bg" />
                  <div class="bm-mask">
                    {{ $t("product.extranetIndex.5iw5c1y35lw0") }}
                  </div>
                  <div class="mask vcbox">
                    <h3 class="tit">
                      {{ $t("product.extranetIndex.5iw5c1y35o80") }}
                    </h3>
                    <p class="tip">
                      {{ $t("product.extranetIndex.5iw5c1y35q80") }}
                    </p>
                    <!-- <div class="btn">了解详情<i class="el-icon-right"></i></div> -->
                  </div>
                </a>
              </el-col>
            </el-row>
            <el-row v-if="tabIdx2 === 3" :gutter="20" class="tab-con">
              <el-col :span="8">
                <a href="javascript:;" class="con">
                  <img src="~@/assets/img/product/tab41.png" class="bg" />
                  <div class="bm-mask">
                    {{ $t("product.extranetIndex.5iw5c1y35sc0") }}
                  </div>
                  <div class="mask vcbox">
                    <h3 class="tit">
                      {{ $t("product.extranetIndex.5iw5c1y35o80") }}
                    </h3>
                    <p class="tip">
                      {{ $t("product.extranetIndex.5iw5c1y35uk0") }}
                    </p>
                    <!-- <div class="btn">了解详情<i class="el-icon-right"></i></div> -->
                  </div>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="javascript:;" class="con">
                  <img src="~@/assets/img/product/tab42.png" class="bg" />
                  <div class="bm-mask">
                    {{ $t("product.extranetIndex.5iw5c1y35wk0") }}
                  </div>
                  <div class="mask vcbox">
                    <h3 class="tit">
                      {{ $t("product.extranetIndex.5iw5c1y35wk0") }}
                    </h3>
                    <p class="tip">
                      {{ $t("product.extranetIndex.5iw5c1y35ys0") }}
                      {{ $t("product.extranetIndex.5iw5c1y360s0") }}
                    </p>
                    <!-- <div class="btn">了解详情<i class="el-icon-right"></i></div> -->
                  </div>
                </a>
              </el-col>
            </el-row>
            <el-row v-if="tabIdx2 === 4" :gutter="20" class="tab-con">
              <el-col :span="8">
                <a href="javascript:;" class="con">
                  <img src="~@/assets/img/product/tab51.png" class="bg" />
                  <div class="bm-mask">
                    {{ $t("product.extranetIndex.5iw5c1y362s0") }}
                  </div>
                  <div class="mask vcbox">
                    <h3 class="tit">
                      {{ $t("product.extranetIndex.5iw5c1y362s0") }}
                    </h3>
                    <p class="tip">
                      {{ $t("product.extranetIndex.5iw5c1y364w0") }}
                    </p>
                    <!-- <div class="btn">了解详情<i class="el-icon-right"></i></div> -->
                  </div>
                </a>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <BlueFooter />
  </div>
</template>

<script>
import { SappModule } from "@/store/common/modules/app";
import BlueFooter from "@/components/views/BlueFooter.vue";

export default {
  name: "Product",
  components: { BlueFooter },
  data() {
    return {
      isFixed: false,
      scrollY: 0,
      offsetTop: 0,
      listHeight: [],
      tabIdx1: 0,
      tabIdx2: 0,
      subnavTabList: [
        this.$t("product.extranetIndex.5iw5c1y32080"),
        this.$t("product.extranetIndex.5iw5c1y32vw0"),
        this.$t("product.extranetIndex.5iw5c1y33980"),
        this.$t("product.extranetIndex.5iw5c1y33lc0"),
        this.$t("product.extranetIndex.5iw5c1y346o0"),
        this.$t("product.extranetIndex.5iw5c1y34k00"),
      ],
      tabList1: [
        this.$t("product.extranetIndex.5iw5c1y36700"),
        this.$t("product.extranetIndex.5iw5c1y36940"),
        this.$t("product.extranetIndex.5iw5c1y36b40"),
        this.$t("product.extranetIndex.5iw5c1y36d40"),
      ],
      tabList2: [
        this.$t("product.extranetIndex.5iw5c1y36fc0"),
        this.$t("product.extranetIndex.5iw5c1y36hg0"),
        this.$t("product.extranetIndex.5iw5c1y36jc0"),
        this.$t("product.extranetIndex.5iw5c1y36lg0"),
        this.$t("product.extranetIndex.5iw5c1y362s0"),
      ],
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
  created() {
    this.subnavTabList = [
      "WMS",
      this.$t("product.extranetIndex.5iw5c1y32080"),
      this.$t("product.extranetIndex.5iw5c1y32vw0"),
      this.$t("product.extranetIndex.5iw5c1y33980"),
      this.$t("product.extranetIndex.5iw5c1y33lc0"),
      this.$t("product.extranetIndex.5iw5c1y346o0"),
      this.$t("product.extranetIndex.5iw5c1y34k00"),
    ];
  },
  methods: {
    toMoreDetails() {
      this.$router.push("/wmsDetail");
    },
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
.com-subnav-tabs {
  &.product {
    .tab {
      padding: 0 55px;
    }
  }
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

        i {
          display: inline-block;
          width: 24px;
          height: 24px;
          vertical-align: middle;

          &.i-wms1 {
            background: url("~@/assets/img/product/i-wms1.png") no-repeat;
            background-size: 100%;
          }

          &.i-wms2 {
            background: url("~@/assets/img/product/i-wms2.png") no-repeat;
            background-size: 100%;
          }
        }
      }

      dd {
        margin-left: 80px;

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
        }
      }
    }
  }

  .btn-view-more {
    display: inline-block;
    padding: 9px 20px;
    background: rgba(60, 110, 240, 1);
    line-height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }
}

.banner-view {
  background: #fcfcff url("~@/assets/img/product/banner.jpg") top center
    no-repeat;
  background-size: auto 100%;
}

.line-view {
  background: #fff;

  .tab-box {
    padding: 60px 0 20px;

    .tit {
      text-align: center;
      font-size: 24px;
    }

    .con {
      display: block;
      text-align: center;
      height: 255px;
      margin-top: 40px;
      padding: 20px 15px 50px;
      position: relative;
      translate: all 0.2s;

      .ico {
        display: block;
        width: 48px;
        height: 48px;
        margin: 0 auto;
      }

      .mini-tit {
        margin-top: 15px;
        font-size: 18px;
        line-height: 28px;
      }

      .tip {
        margin-top: 10px;
        color: #979797;
        font-size: 15px;
        line-height: 24px;
        text-align: left;
      }

      .btn {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 0;
        display: none;
        width: 100%;
      }

      &:hover {
        background: #fff;
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);

        .btn {
          display: block;
        }
      }
    }
  }
}

.goodness-view {
  background: #f4f5fa;
  padding: 60px 0;

  .com-view-tit {
    margin-bottom: 20px;
  }

  .tab-box {
    margin-top: 20px;
    height: 400px;
    background: #fff url("~@/assets/img/common/decorate.jpg") left 20px bottom
      20px no-repeat;
    background-size: 171px 132px;
    padding: 40px;

    .tit {
      font-size: 16px;
    }

    .para14 {
      margin: 10px 0;
    }

    .bg {
      float: right;
      width: 517px;
      height: 320px;
      margin-left: 40px;
    }

    .btn {
      display: block;
      margin-top: 20px;
    }
  }
}

.block-chain-view {
  padding: 60px 0 40px;
  height: 330px;
  background: #fff url("~@/assets/img/product/bg-1.jpg") center center no-repeat;

  .con-wrap {
    .con {
      padding: 20px 40px;
      color: #fff;
      background: url("~@/assets/img/product/bg-01.jpg") top center no-repeat;

      .tit {
        font-size: 16px;
        font-weight: 600;
      }

      .para {
        margin-top: 20px;
        font-size: 14px;
        line-height: 24px;
        color: #fff;
      }
    }
  }
}

.gis-view {
  padding: 60px 0;
  background: url("~@/assets/img/product/dark-bg.png") bottom center no-repeat;
  background-size: auto 327px;

  .con-wrap {
    height: 295px;
    background: #fff;

    .con {
      display: block;
      border-radius: 4px;
      padding: 35px 50px;
      position: relative;

      .ico {
        width: 120px;
        height: 120px;
        display: block;
        margin: 0 auto;
      }

      .tit {
        font-size: 18px;
        margin-top: 20px;
        text-align: center;
      }

      .para14 {
        margin-top: 8px;
        height: 48px;
      }

      .dep {
        position: absolute;
        top: 40px;
        right: 0;
        bottom: 40px;
        width: 1px;
        background: #d9d9d9;
      }
    }
  }

  .btn-wrap {
    margin-top: 30px;
    text-align: center;

    .btn {
      border-radius: 0px;
    }
  }
}

.vision-view {
  padding: 60px 0;
  background: #fff url("~@/assets/img/product/bg-2@1x.jpg") center no-repeat;
  background-size: auto auto;

  .con {
    display: block;
    background: #fff;
    padding: 35px 40px;
    height: 160px;

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
        margin: 0 0 8px;
      }
    }
  }
}

.unmanned-view {
  padding: 60px 0 40px;
  background: #fff url("~@/assets/img/product/bg-3@2x.png") top center no-repeat;
  background-size: auto 860px;

  .com-view-tit {
    margin-bottom: 20px;
  }

  .tab-box {
    margin-top: 20px;
    padding: 40px;
    background: #fff;
  }

  .tab-con {
    .con {
      display: block;
      height: 240px;
      text-align: center;
      position: relative;
      color: #fff;

      &:hover {
        .bm-mask {
          height: 0;
        }

        .mask {
          height: 100%;
        }
      }
    }

    .bg {
      display: block;
      height: 100%;
    }

    .bm-mask {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      font-size: 20px;
      line-height: 48px;
      height: 48px;
      background: rgba(0, 0, 0, 0.6);
      transition: all 0.28s;
      overflow: hidden;
    }

    .mask {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 0;
      padding: 0 60px;
      background: rgba(0, 0, 0, 0.6);
      transition: all 0.28s;
      overflow: hidden;

      .tit {
        font-size: 20px;
        line-height: 48px;
        position: relative;

        &:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 3px;
          background: #fff;
        }
      }

      .tip {
        font-size: 14px;
        margin-top: 15px;
      }

      .btn {
        width: 100px;
        margin: 20px auto 0;
        height: 32px;
        font-size: 14px;
        line-height: 32px;
        border: 1px solid #fff;

        i {
          display: inline-block;
          vertical-align: middle;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
