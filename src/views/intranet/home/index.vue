<template>
  <div class="home">
    <div class="top-banner-view">
      <div class="com-wrapper">
        <h2>京东物流开放平台</h2>
        <p>助力物流新基建，打造智慧供应链</p>
        <template>
          <el-button
            v-if="user_develop === 'no'"
            type="primary"
            class="btn"
            :clstag="clstag('index_1618992416097|13', 'index_1618993059625|12')"
            @click="toBeDevelop"
          >
            成为开发者
          </el-button>
          <el-button
            type="primary"
            class="btn"
            :clstag="clstag('index_1618992416097|14', '')"
            @click="toPublishApi"
          >
            发布API
          </el-button>
        </template>
      </div>
    </div>
    <div class="platform-view">
      <div class="com-wrapper">
        <el-row :gutter="20">
          <el-col :span="6">
            <div
              :class="computeAdvertisementClass"
              :clstag="
                clstag('index_1618992416097|15', 'index_1618993059625|14')
              "
              @click="goToRoute"
            >
              <img :src="computeAdvertisementImageSource" class="ico" />
              <dl class="cont">
                <dt class="tit">{{ computeAdvertisementTitle }}</dt>
                <dd class="tip">{{ computeAdvertisementContent }}</dd>
              </dl>
            </div>
          </el-col>
          <el-col :span="6">
            <div
              class="con"
              :clstag="
                clstag('index_1618992416097|16', 'index_1618993059625|15')
              "
            >
              <img src="~@/assets/img/home/icon2.png" class="ico" />
              <dl class="cont">
                <dt class="tit">价值供应链</dt>
                <dd class="tip">为企业提供端到端的数字化供应链咨询和产品</dd>
              </dl>
            </div>
          </el-col>
          <el-col :span="6">
            <div
              class="con"
              :clstag="
                clstag('index_1618992416097|17', 'index_1618993059625|16')
              "
            >
              <img src="~@/assets/img/home/icon3.png" class="ico" />
              <dl class="cont">
                <dt class="tit">物流视觉</dt>
                <dd class="tip">从连接到智能，为您提供智慧供应链解决方案</dd>
              </dl>
            </div>
          </el-col>
          <el-col :span="6">
            <div
              class="con"
              :clstag="
                clstag('index_1618992416097|18', 'index_1618993059625|17')
              "
            >
              <img src="~@/assets/img/home/icon4.png" class="ico" />
              <dl class="cont">
                <dt class="tit">物流新基建</dt>
                <dd class="tip">打造物流领域PaaS组件，助力供应链管理升级</dd>
              </dl>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="open-view">
      <div class="com-wrapper">
        <h2 class="com-view-tit">物流能力 现全面开放</h2>
        <el-row :gutter="0">
          <el-col :span="6" class="aside-wrap">
            <div class="box">
              <h3 class="tit">热销产品</h3>
              <ul class="list">
                <li class="item">
                  <p
                    class="link"
                    :clstag="
                      clstag('index_1618992416097|19', 'index_1618993059625|18')
                    "
                  >
                    区块链
                  </p>
                  <div class="cont">
                    <router-link
                      :to="{
                        name: 'ProductDetail',
                        params: { productCode: 'Signatureonthechain' },
                      }"
                      target="_blank"
                      class="con"
                      :clstag="
                        clstag(
                          'index_1618992416097|20',
                          'index_1618993059625|19'
                        )
                      "
                      >链上签
                    </router-link>
                    <span class="dep">|</span>
                    <router-link
                      :to="{
                        name: 'ProductDetail',
                        params: { productCode: 'Jingyuanchain' },
                      }"
                      target="_blank"
                      class="con"
                      :clstag="
                        clstag(
                          'index_1618992416097|21',
                          'index_1618993059625|20'
                        )
                      "
                      >京源链
                    </router-link>
                  </div>
                </li>
                <li class="item">
                  <p
                    class="link"
                    :clstag="
                      clstag('index_1618992416097|22', 'index_1618993059625|21')
                    "
                  >
                    物流视觉
                  </p>
                  <div class="cont">
                    <router-link
                      :to="{
                        name: 'ProductDetail',
                        params: { productCode: 'Monitoringvideonetworking' },
                      }"
                      target="_blank"
                      class="con"
                      :clstag="
                        clstag(
                          'index_1618992416097|23',
                          'index_1618993059625|22'
                        )
                      "
                      >视频联网
                    </router-link>
                    <span class="dep">|</span>
                    <router-link
                      :to="{
                        name: 'ProductDetail',
                        params: { productCode: 'Intelligentvideoanalysis' },
                      }"
                      target="_blank"
                      class="con"
                      :clstag="
                        clstag(
                          'index_1618992416097|24',
                          'index_1618993059625|23'
                        )
                      "
                      >视频分析
                    </router-link>
                  </div>
                </li>
                <li class="item">
                  <p
                    class="link"
                    :clstag="
                      clstag('index_1618992416097|25', 'index_1618993059625|24')
                    "
                  >
                    价值供应链
                  </p>
                  <div class="cont">
                    <router-link
                      :to="{
                        name: 'ProductDetail',
                        params: { productCode: 'Commoditylayout' },
                      }"
                      target="_blank"
                      class="con"
                      :clstag="
                        clstag(
                          'index_1618992416097|26',
                          'index_1618993059625|25'
                        )
                      "
                      >商品布局
                    </router-link>
                    <span class="dep">|</span>
                    <router-link
                      :to="{
                        name: 'ProductDetail',
                        params: {
                          productCode: 'Intelligentsupplementaryadjustment',
                        },
                      }"
                      target="_blank"
                      class="con"
                      :clstag="
                        clstag(
                          'index_1618992416097|27',
                          'index_1618993059625|26'
                        )
                      "
                      >智能补调
                    </router-link>
                  </div>
                </li>
                <li class="item">
                  <p
                    class="link"
                    :clstag="
                      clstag('index_1618992416097|28', 'index_1618993059625|27')
                    "
                  >
                    运筹优化
                  </p>
                  <div class="cont">
                    <router-link
                      :to="{
                        name: 'ProductDetail',
                        params: { productCode: 'Intelligentlocation' },
                      }"
                      target="_blank"
                      class="con"
                      :clstag="
                        clstag(
                          'index_1618992416097|29',
                          'index_1618993059625|28'
                        )
                      "
                      >智能选址
                    </router-link>
                    <span class="dep">|</span>
                    <router-link
                      :to="{
                        name: 'ProductDetail',
                        params: { productCode: 'Sitesimulation' },
                      }"
                      target="_blank"
                      class="con"
                      :clstag="
                        clstag(
                          'index_1618992416097|30',
                          'index_1618993059625|29'
                        )
                      "
                      >场地仿真
                    </router-link>
                  </div>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="18" class="main-wrap">
            <el-row :gutter="20">
              <el-col :span="8">
                <router-link
                  :to="{
                    name: 'SolveDetail',
                    params: { productCode: 'digitalfleet' },
                  }"
                  target="_blank"
                  class="con"
                >
                  <img src="~@/assets/img/home/icon-2-1.png" class="ico" />
                  <div
                    class="cont"
                    :clstag="
                      clstag('index_1618992416097|31', 'index_1618993059625|30')
                    "
                  >
                    <h3 class="tit">商用数字车队</h3>
                    <p class="para14 te4">
                      结合AIOT、智能硬件和边缘计算能力，提供软件硬件一体化的商用车车联网综合SaaS应用和行业细分制定化解决方案。
                    </p>
                  </div>
                  <el-button
                    type="primary"
                    class="btn"
                    :clstag="
                      clstag('index_1618992416097|32', 'index_1618993059625|31')
                    "
                    >了解更多</el-button
                  >
                </router-link>
              </el-col>
              <el-col :span="8">
                <router-link
                  :to="{
                    name: 'ProductDetail',
                    params: { productCode: 'Intelligentlocation' },
                  }"
                  target="_blank"
                  class="con"
                >
                  <img src="~@/assets/img/home/icon-2-2.png" class="ico" />
                  <div
                    class="cont"
                    :clstag="
                      clstag('index_1618992416097|33', 'index_1618993059625|32')
                    "
                  >
                    <h3 class="tit">智能选址</h3>
                    <p class="para14 te4">
                      基于个性化的供给和需求分布、结合算法对建筑设施的地理位置、功能定位做出最优化的方案推荐。
                    </p>
                  </div>
                  <el-button
                    type="primary"
                    class="btn"
                    :clstag="
                      clstag('index_1618992416097|34', 'index_1618993059625|33')
                    "
                    >了解更多</el-button
                  >
                </router-link>
              </el-col>
              <el-col :span="8">
                <router-link
                  :to="{
                    name: 'SolveDetail',
                    params: { productCode: 'Smartfarm' },
                  }"
                  target="_blank"
                  class="con"
                >
                  <img src="~@/assets/img/home/icon-2-3.png" class="ico" />
                  <div
                    class="cont"
                    :clstag="
                      clstag('index_1618992416097|35', 'index_1618993059625|34')
                    "
                  >
                    <h3 class="tit">数字农场</h3>
                    <p class="para14 te4">
                      种植、加工、存储、运输、销售全流程追溯，结合京东大数据，低成本助力农事分析、决策、农产品/农资销售。
                    </p>
                  </div>
                  <el-button
                    type="primary"
                    class="btn"
                    :clstag="
                      clstag('index_1618992416097|36', 'index_1618993059625|35')
                    "
                    >了解更多</el-button
                  >
                </router-link>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 20px">
              <el-col :span="8">
                <router-link
                  :to="{
                    name: 'ProductDetail',
                    params: { productCode: 'Salesforecast' },
                  }"
                  target="_blank"
                  class="con"
                >
                  <img src="~@/assets/img/home/icon-2-4.png" class="ico" />
                  <div
                    class="cont"
                    :clstag="
                      clstag('index_1618992416097|37', 'index_1618993059625|36')
                    "
                  >
                    <h3 class="tit">销量预测</h3>
                    <p class="para14 te4">
                      以业务系统数据为基础，利用多维分析和大数据挖掘技术，帮助与京东合作商家，厂商，行业合作伙伴等群体监控物流周转情况、对物流的全环节进行识别和管理、对物流活动进行预测及预警，从而达到降本增效，精准物流管理。
                    </p>
                  </div>
                  <el-button
                    type="primary"
                    class="btn"
                    :clstag="
                      clstag('index_1618992416097|38', 'index_1618993059625|37')
                    "
                    >了解更多</el-button
                  >
                </router-link>
              </el-col>
              <el-col :span="8">
                <router-link
                  :to="{
                    name: 'ProductDetail',
                    params: { productCode: 'GIS' },
                  }"
                  target="_blank"
                  class="con"
                >
                  <img src="~@/assets/img/home/icon-2-5.png" class="ico" />
                  <div
                    class="cont"
                    :clstag="
                      clstag('index_1618992416097|39', 'index_1618993059625|38')
                    "
                  >
                    <h3 class="tit">物流GIS</h3>
                    <p class="para14 te4">
                      基于京东多年沉淀的海量地址库、实时轨迹数据，集合GIS大数据机器学习技术，打造权威、精准、智能的物流GIS服务平台。
                    </p>
                  </div>
                  <el-button
                    type="primary"
                    class="btn"
                    :clstag="
                      clstag('index_1618992416097|40', 'index_1618993059625|39')
                    "
                    >了解更多</el-button
                  >
                </router-link>
              </el-col>
              <el-col :span="8">
                <router-link
                  :to="{
                    name: 'ProductDetail',
                    params: { productCode: 'Intelligentscheduling' },
                  }"
                  target="_blank"
                  class="con"
                >
                  <img src="~@/assets/img/home/icon-2-6.png" class="ico" />
                  <div
                    class="cont"
                    :clstag="
                      clstag('index_1618992416097|41', 'index_1618993059625|40')
                    "
                  >
                    <h3 class="tit">智能调度</h3>
                    <p class="para14 te4">
                      支持多种优化目标要求下，对揽配的车辆资源安排、线路组织、拜访顺序进行快速调度组织。
                    </p>
                  </div>
                  <el-button
                    type="primary"
                    class="btn"
                    :clstag="
                      clstag('index_1618992416097|42', 'index_1618993059625|41')
                    "
                    >了解更多</el-button
                  >
                </router-link>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="aboutUs-view">
      <div class="com-wrapper">
        <h2 class="com-view-tit white">关于我们</h2>
        <el-row :gutter="20">
          <el-col :span="5">
            <div class="con">
              <img src="~@/assets/img/home/icon-3-1@2x.png" class="ico" />
              <h3 class="tit">物流新基建</h3>
              <p class="para14">
                为供应链上下游提供基础技术服务，包括基础组件、管理系统、智能优化等组件
              </p>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="con">
              <img src="~@/assets/img/home/icon-3-2@2x.png" class="ico" />
              <h3 class="tit">业务云化</h3>
              <p class="para14">传统业务云化改造，一体化交付</p>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="con">
              <img src="~@/assets/img/home/icon-3-3@2x.png" class="ico" />
              <h3 class="tit">大数据&AI应用</h3>
              <p class="para14">智能硬、软件，智慧供应链</p>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="con">
              <img src="~@/assets/img/home/icon-3-4@2x.png" class="ico" />
              <h3 class="tit">行业云场景</h3>
              <p class="para14">政府物资物流监控调度，安全合规</p>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="con">
              <img src="~@/assets/img/home/icon-3-5@2x.png" class="ico" />
              <h3 class="tit">最佳实践</h3>
              <p class="para14">电商、服务、汽后等多行业经验沉淀</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="goodness-view">
      <div class="com-wrapper">
        <h2 class="com-view-tit">应用场景</h2>
        <div class="com-view-tabs">
          <a
            v-for="(item, i) in tabList"
            :key="i"
            class="tab"
            :class="{ active: tabIdx == i }"
            :clstag="
              clstag(
                tabClstagTable[item][0] || '',
                tabClstagTable[item][1] || ''
              )
            "
            @click="handleTab(i)"
          >
            {{ item }}
          </a>
        </div>
        <div class="tab-box">
          <div v-if="tabIdx === 0" class="tab-con cf">
            <img src="~@/assets/img/home/banner-2@2x.jpg" class="bg" />
            <div class="cont">
              <h3 class="tit">安利</h3>
              <p class="para14">
                京东物流与安利（中国）日用品有限公司战略合作。京东物流成为安利（中国）最大的物流供应链服务商，提供端到端供应链一体化解决方案和仓配服务，为安利在中国的业务发展提供强有力的支撑。
              </p>
            </div>
          </div>
          <div v-if="tabIdx === 1" class="tab-con cf">
            <img src="~@/assets/img/home/banner-3@2x.jpg" class="bg" />
            <div class="cont">
              <h3 class="tit">奔驰</h3>
              <p class="para14">
                京东物流与奔驰(中国)汽车销售有限公司达成合作，京东物流为奔驰提供定制化供应链解决方案。双方合作首先在上海18家4S店展开，配送商品为轮胎，B2B订单配送，分极速配送和普通单两大类。
              </p>
            </div>
          </div>
          <div v-if="tabIdx === 2" class="tab-con cf">
            <img src="~@/assets/img/home/banner-4@2x.jpg" class="bg" />
            <div class="cont">
              <h3 class="tit">青岛啤酒</h3>
              <p class="para14">
                京东物流与青岛啤酒继仓配业务之后进一步深化合作，通过综合考虑青岛啤酒的生产运输成本仓储等成本参数，同时加入工厂产能限制、要货限制等业务限制条件，为青岛啤酒提供啤酒从工厂生产到运输的流向流量等一系列的综合供应链优化的解决方案，为指导青岛啤酒的供应链网络发展提供战略方向。是京东物流价值供应链与LLamasoft双方通过资源共享、技术创新、协同合作，发挥各自优势，共同推动中国供应链转型升级的最佳实践。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BlueFooter />
    <el-dialog
      title="升级公告"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="800px"
      class="dialog"
    >
      <div class="title"><span>尊敬的京东物流客户您好：</span></div>
      <div class="content">
        <span
          >为更好的服务于广大客户，即日起，物流技术开放平台正式升级为物流开放平台，平台主要优化了以下内容：</span
        >
      </div>
      <div class="content"><span>1、网站界面升级</span></div>
      <div class="content"><span>2、更流畅的操作体验</span></div>
      <div class="content"><span>3、更丰富可用的API</span></div>
      <div class="content"><span>4、更安全稳定的运行模式</span></div>
      <div class="content">
        <span class="focus-content"
          >如果您之前注册过物流技术开放平台，为了不影响使用，请务必进行如下操作：</span
        >
      </div>
      <div class="content">
        <span
          >1、点击<el-button type="text" @click="jumpToIdassChangePassword"
            >忘记密码</el-button
          >，进行密码重置；</span
        >
      </div>
      <div class="content">
        <span
          >2、登录成功后进入【控制台-个人中心-用户管理】，点击添加用户，邀请您团队的成员重新加入物流开放平台。</span
        >
      </div>
      <div class="content">
        <span>若无法找回密码，请联系官方客服：133-6632-0890。</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          class="button"
          @click="jumpToIdassChangePassword"
          >忘记密码</el-button
        >
        <el-button class="button" @click="dialogVisible = false"
          >知道了</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { UserModule } from "@/store/common/modules/user";
import BlueFooter from "@/components/views/BlueFooter.vue";
import request from "@/utils/request";
import pageClick from "@/utils/pageClick";
import icon1 from "@/assets/img/home/icon1.png";

export default {
  name: "Home",
  components: { BlueFooter },
  data() {
    return {
      tabIdx: 0,
      tabList: ["安利", "奔驰", "青岛啤酒"],
      tabClstagTable: {
        安利: ["index_1618992416097|43", "index_1618992416097|42"],
        奔驰: ["index_1618992416097|44", "index_1618992416097|43"],
        青岛啤酒: ["index_1618992416097|45", "index_1618992416097|44"],
      },
      dialogVisible: false,
    };
  },
  computed: {
    computeAdvertisementClass() {
      return "con clickable";
    },
    computeAdvertisementImageSource() {
      return icon1;
    },
    computeAdvertisementTitle() {
      return "移动端扫一扫组件";
    },
    computeAdvertisementContent() {
      return "为移动端APP提供高效、稳定的条形码识别功能";
    },
    headImg() {
      return UserModule.headImg;
    },
    name() {
      return UserModule.name;
    },
    user_develop() {
      return UserModule.user_develop;
    },
  },
  methods: {
    // 点击事件埋点
    clstag(intranetId, extranetId) {
      return pageClick(intranetId, extranetId);
    },
    goToRoute() {
      window.open("//lcp.jdl.com/#/docSoftwareSystem/47/52892", "_blank");
    },
    handleTab(idx) {
      this.tabIdx = idx;
    },
    toBeDevelop() {
      const isDevelop = UserModule.user_develop;
      if (isDevelop === "yes") {
        UserModule.gotoAdmin();
      } else {
        if (UserModule.loginState === false) {
          let redirectNextLink = `http://${window.location.host}/admin/#/apiManager/registerApi`;
          const index = redirectNextLink.indexOf("sso_service_ticket=");
          if (index > -1) {
            redirectNextLink = redirectNextLink.substring(0, index - 1);
          }
          sessionStorage.setItem("redirectNextLink", redirectNextLink);
          UserModule.intranetCheckLogin();
        }
      }
    },
    toPublishApi() {
      request({
        url: "/user/getSelectedSupplierId",
        method: "get",
      }).then((rsp) => {
        if (rsp.data === -2) {
          //跳转拦截
          window.location.href = `${window.location.origin}/#/chooseSupplier`;
        } else {
          location.href = `${location.origin}/admin/#/apiManager/registerApi`;
        }
      });
    },
    //跳转到Idass修改密码页面
    jumpToIdassChangePassword() {
      window.location.href =
        `${window.env.idaasChangePassword}` + window.location.href;
    },
  },
  mounted() {
    console.log("当前URL", window.location.href);
    //下面是当从open.jdl.com中重定向过来的，则URL中会带host=open.jdl.com，这样就加提示框
    let url = window.location.href;
    if (url.indexOf("host=open.jdl.com") !== -1) {
      let newUrl = url.replace("?host=open.jdl.com", "");
      window.history.pushState({}, 0, newUrl);
      this.dialogVisible = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.home {
  .top-banner-view {
    margin-top: 14px;

    .com-wrapper {
      padding: 70px;
      height: 320px;
      background: url("~@/assets/img/home/banner.png") top center no-repeat;
      background-size: auto 100%;

      h2 {
        font-size: 32px;
        margin-bottom: 6px;
      }

      .tip {
        font-size: 16px;
      }

      .btn {
        margin-top: 50px;
        border-radius: 0px;
      }
    }
  }

  .platform-view {
    margin-top: 20px;

    .con {
      overflow: hidden;
      height: 100px;
      padding: 12px 20px 12px 10px;
      background: #fff;
      &.clickable {
        cursor: pointer;
        &:hover {
          box-shadow: 0 2px 8px 0 rgba(0, 0, 2, 0.12);
        }
      }

      .ico {
        width: 76px;
        height: 76px;
        float: left;
      }

      .cont {
        margin: 10px 0 0 86px;

        .tit {
          font-weight: 600;
        }

        .tip {
          margin-top: 5px;
          font-size: 12px;
          line-height: 20px;
          color: #999;
        }
        .cont__learn-more {
          display: inline;
          float: right;
          padding: 0 8px;
          border: 1px solid #3c6ef0;
          border-radius: 4px;
          font-size: 8px;
          color: #3c6ef0;
        }
      }
    }
  }

  .open-view {
    padding: 60px 0;

    .aside-wrap {
      padding-right: 20px;
      .box {
        height: 380px;
        color: #fff;
        padding: 20px 30px;
        background: #3c6ef0 url("~@/assets/img/home/bg-2@2x.png") bottom center
          no-repeat;
        background-size: auto 140px;
      }

      .tit {
        font-size: 24px;
      }

      ol,
      ul {
        color: #fff;
        line-height: 1.5;
      }

      .list {
        .item {
          margin-top: 20px;

          .link {
            display: inline-block;
            font-size: 16px;
            color: #fff;
          }

          .cont {
            margin-top: 10px;

            .dep {
              padding: 0 10px;
            }
          }
        }
      }
    }

    .main-wrap {
      .con {
        display: block;
        background: #fff;
        height: 180px;
        overflow: hidden;
        padding: 16px 24px 42px;
        position: relative;

        .ico {
          float: left;
          width: 38px;
          height: 38px;
        }

        .cont {
          margin-left: 58px;

          .tit {
            font-size: 18px;
          }

          .para14 {
            margin-top: 5px;
            line-height: 22px;
          }
        }

        .btn {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          display: block;
          width: 100%;
          height: 0;
          padding: 0;
          border: 0;
          border-radius: 0;
          translate: all 0.28s;
        }

        &:hover .btn {
          height: 32px;
          line-height: 32px;
        }
      }
    }
  }

  .aboutUs-view {
    height: 470px;
    padding: 60px 0;
    background: url("~@/assets/img/productDetail/bg-1.jpg") top center no-repeat;
    background-size: 100% 100%;

    .con {
      height: 260px;
      background: #fff;
      padding: 30px 20px;

      .ico {
        width: 80px;
        height: 80px;
        display: block;
        margin: 0 auto;
      }

      .tit {
        margin: 16px 0 10px;
        font-size: 18px;
        text-align: center;
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
  .dialog {
    font-weight: bold;
    .title {
      margin-bottom: 15px;
      font-weight: bold;
    }
    .content {
      margin-bottom: 10px;
      padding: 0;
      font-weight: normal;
    }
    .focus-content {
      color: red;
    }
    ::v-deep .el-dialog {
      margin-top: 15vh;
      width: 800px;
      --maxHeight: auto;
      border-radius: 31px 31px 0 0;
      .el-dialog__header {
        line-height: 1;
        background-color: #3c6ef0;
        border-radius: 29px 29px 0 0;
        .el-dialog__title {
          line-height: 16px;
          font-size: 16px;
          color: white;
        }
      }
      .el-dialog__footer {
        padding: 10px 20px;
        text-align: center;
        box-sizing: border-box;
        border-top: 0px solid;
      }
    }
  }
}
</style>
