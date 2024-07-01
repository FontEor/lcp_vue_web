<template>
  <div class="clothing-warehouse">
    <Header />
    <div class="clothing-warehouse-wrapper">
      <Banner
        :bannerTitle="bannerTitle"
        :bannerContent="bannerContent"
        :bannerLink="bannerLink"
        :bannerImage="bannerImage"
      />
      <!-- 解决痛点展示 -->
      <PainPoint :iconList="iconList" :painPointContent="painPointContent" />
      <!-- 关联接口及服务 -->
      <AssociatedInterfacesAndServices
        :carouselList="carouselList"
        :changeCarouselImages="changeCarouselImages"
      />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/extranet/Header/index.vue";
import Footer from "@/components/extranet/Footer/index.vue";
import Banner from "@/views/extranet/solution/components/banner.vue";
import PainPoint from "@/views/extranet/solution/components/painPoint.vue";
import AssociatedInterfacesAndServices from "@/views/extranet/solution/components/associatedInterfacesAndServices.vue";
import painpointHand from "@/assets/extranet/images/hospitalConvenienceExpress/painpointHand.svg";
import painpointHeart from "@/assets/extranet/images/hospitalConvenienceExpress/painpointHeart.svg";
import painpointHouse from "@/assets/extranet/images/hospitalConvenienceExpress/painpointHouse.svg";
import hospitalBanner from "@/assets/extranet/images/hospitalConvenienceExpress/hospitalBanner.png";
import ship from "@/assets/extranet/images/hospitalConvenienceExpress/ship.png";
import delivery from "@/assets/extranet/images/hospitalConvenienceExpress/delivery.png";
import receiving from "@/assets/extranet/images/hospitalConvenienceExpress/receiving.png";

export default {
  name: "ClothingWarehouse",
  components: {
    Header,
    Footer,
    Banner,
    PainPoint,
    AssociatedInterfacesAndServices,
  },
  data() {
    return {
      // Banner
      bannerTitle: "医院便民快递解决方案",
      bannerContent:
        "提供就医便民服务，满足患者对于药品、病案、检测报告、体检报告等的寄递需求，支持医院内工作人员的因公月结寄件",
      bannerLink:
        "https://cloud.jdl.com/#/open-business-document/access-guide/324",
      bannerImage: hospitalBanner,
      // 解决痛点
      painPointContent: [
        "协助互联网就医的便民服务落地，患者足不出户就医拿药",
        "快递到家的方式，解决患者的在院等待、往返医院的痛点",
        "关注物流外的附加服务比如金融、商流、渠道拓展",
      ],
      iconList: [painpointHeart, painpointHouse, painpointHand],
      // 关联接口及服务
      carouselList: [
        {
          carouselTitle: "寄件",
          tabList: [
            {
              carouselData: [
                {
                  name: "筛单",
                  routerName: "ApiDocDetail",
                  unitId: "324",
                  docId: "1310",
                },
                {
                  name: "获取单号",
                  routerName: "ApiDocDetail",
                  unitId: "324",
                  docId: "1307",
                },
                {
                  name: "下单",
                  routerName: "ApiDocDetail",
                  unitId: "324",
                  docId: "1308",
                },
                {
                  name: "物流信息订阅",
                  routerName: "ApiDocDetail",
                  unitId: "324",
                  docId: "1313",
                },
                {
                  name: "订单修改",
                  routerName: "ApiDocDetail",
                  unitId: "324",
                  docId: "1312",
                },
                {
                  name: "订单取消",
                  routerName: "ApiDocDetail",
                  unitId: "324",
                  docId: "1311",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: "揽收",
          tabList: [
            {
              carouselData: [
                {
                  name: "运单全程跟踪查询",
                  routerName: "ApiDocDetail",
                  unitId: "324",
                  docId: "1315",
                },
                {
                  name: "费用查询",
                  routerName: "ApiDocDetail",
                  unitId: "324",
                  docId: "1320",
                },
                {
                  name: "物流信息推送",
                  routerName: "ApiDocDetail",
                  unitId: "324",
                  docId: "1324",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: "配送",
          tabList: [
            {
              carouselData: [
                {
                  name: "运单全程跟踪查询",
                  routerName: "ApiDocDetail",
                  unitId: "324",
                  docId: "1315",
                },
                {
                  name: "费用查询",
                  routerName: "ApiDocDetail",
                  unitId: "324",
                  docId: "1320",
                },
                {
                  name: "物流信息推送",
                  routerName: "ApiDocDetail",
                  unitId: "324",
                  docId: "1324",
                },
              ],
            },
          ],
        },
      ],
      changeCarouselImages: [ship, receiving, delivery],
    };
  },
};
</script>

<style lang="scss" scoped>
.clothing-warehouse {
  min-width: 1200px;
}
</style>