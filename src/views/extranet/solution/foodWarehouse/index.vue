<template>
  <div class="food-warehouse">
    <Header />
    <Banner
      :bannerTitle="bannerTitle"
      :bannerContent="bannerContent"
      :bannerLink="bannerLink"
      :bannerImage="bannerImage"
    />
    <!-- 解决痛点 -->
    <PainPoint :painPointContent="painPointContent" />
    <!-- 关联接口及服务 -->
    <AssociatedInterfacesAndServices
      :carouselList="carouselList"
      :changeCarouselImages="changeCarouselImages"
      :solutionType="solutionType"
    />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/extranet/Header/index.vue";
import Footer from "@/components/extranet/Footer/index.vue";
import Banner from "@/views/extranet/solution/components/banner.vue";
import PainPoint from "@/views/extranet/solution/components/painPoint.vue";
import AssociatedInterfacesAndServices from "@/views/extranet/solution/components/associatedInterfacesAndServices.vue";
import foodBanner from "@/assets/extranet/images/foodWarehouse/banner.png";
import foodCompleteVehicle from "@/assets/extranet/images/foodWarehouse/complete-vehicle.png";
import foodWarehouseManagement from "@/assets/extranet/images/foodWarehouse/warehouse-management.png";
import foodStoreAllocation from "@/assets/extranet/images/foodWarehouse/store-allocation.png";
import foodExpress from "@/assets/extranet/images/foodWarehouse/express.png";

export default {
  name: "FoodWarehouse",
  components: {
    Header,
    Footer,
    Banner,
    PainPoint,
    AssociatedInterfacesAndServices,
  },
  data() {
    return {
      // banner
      bannerTitle: this.$t('foodWarehouse.index.5ivnvsey9xs0'),
      bannerContent:
        this.$t('foodWarehouse.index.5ivnvseyau00'),
      bannerLink:
        "https://cloud.jdl.com/#/open-business-document/access-guide/269/53386",
      bannerImage: foodBanner,
      // 解决痛点
      painPointContent: [
        this.$t('foodWarehouse.index.5ivnvseyb0g0'),
        this.$t('foodWarehouse.index.5ivnvseyb480'),
        this.$t('foodWarehouse.index.5ivnvseyba80'),
      ],
      //关联接口及服务
      carouselList: [
        {
          carouselTitle: this.$t('foodWarehouse.index.5ivnvseybe00'),
          activeName: this.$t('foodWarehouse.index.5ivnvseybhc0'),
          tabList: [
            // 入库单
            {
              activeName: this.$t('foodWarehouse.index.5ivnvseybhc0'),
              carouselData: [
                {
                  name: this.$t('foodWarehouse.index.5ivnvseybkc0'),
                  routerName: "ApiDocDetail",
                  unitId: "269",
                  docId: "864",
                },
                {
                  name: this.$t('foodWarehouse.index.5ivnvseybns0'),
                  routerName: "ApiDocDetail",
                  unitId: "269",
                  docId: "865",
                },
                {
                  name: this.$t('foodWarehouse.index.5ivnvseybtg0'),
                  routerName: "ApiDocDetail",
                  unitId: "269",
                  docId: "866",
                },
              ],
            },
            // 快运
            {
              activeName: this.$t('foodWarehouse.index.5ivnvseybws0'),
              carouselData: [
                {
                  name: this.$t('foodWarehouse.index.5ivnvseyc040'),
                  routerName: "ApiDocDetail",
                  unitId: "177",
                  docId: "268",
                },
                {
                  name: this.$t('foodWarehouse.index.5ivnvseyc340'),
                  routerName: "ApiDocDetail",
                  unitId: "177",
                  docId: "269",
                },
                {
                  name: this.$t('foodWarehouse.index.5ivnvseyc680'),
                  routerName: "ApiDocDetail",
                  unitId: "177",
                  docId: "271",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: this.$t('foodWarehouse.index.5ivnvseycb80'),
          activeName: this.$t('foodWarehouse.index.5ivnvseyces0'),
          tabList: [
            // 在库调整
            {
              activeName: this.$t('foodWarehouse.index.5ivnvseyces0'),
              carouselData: [
                {
                  name: this.$t('foodWarehouse.index.5ivnvseyci80'),
                  routerName: "ApiDocDetail",
                  unitId: "269",
                  docId: "882",
                },
                {
                  name: this.$t('foodWarehouse.index.5ivnvseyclg0'),
                  routerName: "ApiDocDetail",
                  unitId: "269",
                  docId: "884",
                },
                {
                  name: this.$t('foodWarehouse.index.5ivnvseycoc0'),
                  routerName: "ApiDocDetail",
                  unitId: "269",
                  docId: "883",
                },
              ],
            },
            // 库存查询
            {
              activeName: this.$t('foodWarehouse.index.5ivnvseycrk0'),
              carouselData: [
                {
                  name: this.$t('foodWarehouse.index.5ivnvseycyc0'),
                  routerName: "ApiDocDetail",
                  unitId: "269",
                  docId: "877",
                },
                {
                  name: this.$t('foodWarehouse.index.5ivnvseyd180'),
                  routerName: "ApiDocDetail",
                  unitId: "269",
                  docId: "878",
                },
                {
                  name: this.$t('foodWarehouse.index.5ivnvseyd440'),
                  routerName: "ApiDocDetail",
                  unitId: "269",
                  docId: "879",
                },
              ],
            },
            // 盘点查询
            {
              activeName: this.$t('foodWarehouse.index.5ivnvseyd6g0'),
              carouselData: [
                {
                  name: this.$t('foodWarehouse.index.5ivnvseyd940'),
                  routerName: "ApiDocDetail",
                  unitId: "269",
                  docId: "880",
                },
                {
                  name: this.$t('foodWarehouse.index.5ivnvseydbk0'),
                  routerName: "ApiDocDetail",
                  unitId: "269",
                  docId: "881",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: this.$t('foodWarehouse.index.5ivnvseydg40'),
          activeName: this.$t('foodWarehouse.index.5ivnvseydiw0'),
          tabList: [
            // 出库单
            {
              activeName: this.$t('foodWarehouse.index.5ivnvseydiw0'),
              carouselData: [
                {
                  name: this.$t('foodWarehouse.index.5ivnvseydlo0'),
                  routerName: "ApiDocDetail",
                  unitId: "269",
                  docId: "867",
                },
                {
                  name: this.$t('foodWarehouse.index.5ivnvseydo40'),
                  routerName: "ApiDocDetail",
                  unitId: "269",
                  docId: "869",
                },
                {
                  name: this.$t('foodWarehouse.index.5ivnvseydqk0'),
                  routerName: "ApiDocDetail",
                  unitId: "269",
                  docId: "868",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: this.$t('foodWarehouse.index.5ivnvseydt00'),
          activeName: this.$t('foodWarehouse.index.5ivnvseydiw0'),
          tabList: [
            // 出库单
            {
              activeName: this.$t('foodWarehouse.index.5ivnvseydiw0'),
              carouselData: [
                {
                  name: this.$t('foodWarehouse.index.5ivnvseydlo0'),
                  routerName: "ApiDocDetail",
                  unitId: "269",
                  docId: "867",
                },
                {
                  name: this.$t('foodWarehouse.index.5ivnvseydo40'),
                  routerName: "ApiDocDetail",
                  unitId: "269",
                  docId: "869",
                },
                {
                  name: this.$t('foodWarehouse.index.5ivnvseydqk0'),
                  routerName: "ApiDocDetail",
                  unitId: "269",
                  docId: "868",
                },
              ],
            },
          ],
        },
      ],
      changeCarouselImages: [
        foodCompleteVehicle,
        foodWarehouseManagement,
        foodStoreAllocation,
        foodExpress,
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.food-warehouse {
  min-width: 1200px;
}
</style>