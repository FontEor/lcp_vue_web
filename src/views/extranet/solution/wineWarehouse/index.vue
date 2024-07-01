<template>
  <div class="wine-warehouse">
    <Header />
    <div class="wine-warehouse-wrapper">
      <Banner
        :bannerTitle="bannerTitle"
        :bannerContent="bannerContent"
        :bannerLink="bannerLink"
        :bannerImage="bannerImage"
        :bannerClstag="bannerClstag"
      />
      <!-- 解决痛点展示 -->
      <PainPoint :painPointContent="painPointContent" />
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
import wineBanner from "@/assets/extranet/images/wineWarehouse/solutionh-banner.png";
import wineCompleteVehicle from "@/assets/extranet/images/wineWarehouse/complete-vehicle.png";
import wineWarehouseManagement from "@/assets/extranet/images/wineWarehouse/warehouse-management.png";
import wineStoreAllocation from "@/assets/extranet/images/wineWarehouse/store-allocation.png";
import wineExpress from "@/assets/extranet/images/wineWarehouse/express.png";

export default {
  name: "WineWarehouse",
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
      bannerTitle: this.$t('wineWarehouse.index.5ivnlvvn33k0'),
      bannerContent:
        this.$t('wineWarehouse.index.5ivnlvvn3vs0'),
      bannerLink:
        "https://cloud.jdl.com/#/open-business-document/access-guide/261/53350",
      bannerImage: wineBanner,
      bannerClstag: [
        "wineWarehouse_1645517635036|1",
        "wineWarehouse_1645517635036|2",
      ],
      // 解决痛点
      painPointContent: [
        this.$t('wineWarehouse.index.5ivnlvvn40o0'),
        this.$t('wineWarehouse.index.5ivnlvvn4440'),
        this.$t('wineWarehouse.index.5ivnlvvn4780'),
      ],
      // 关联接口及服务
      carouselList: [
        {
          carouselTitle: this.$t('wineWarehouse.index.5ivnlvvn4bk0'),
          activeName: this.$t('wineWarehouse.index.5ivnlvvn4eo0'),
          tabList: [
            // 入库单
            {
              activeName: this.$t('wineWarehouse.index.5ivnlvvn4eo0'),
              carouselData: [
                {
                  name: this.$t('wineWarehouse.index.5ivnlvvn4hw0'),
                  routerName: "ApiDocDetail",
                  unitId: "261",
                  docId: "788",
                },
                {
                  name: this.$t('wineWarehouse.index.5ivnlvvn4kw0'),
                  routerName: "ApiDocDetail",
                  unitId: "261",
                  docId: "828",
                },
                {
                  name: this.$t('wineWarehouse.index.5ivnlvvn4nw0'),
                  routerName: "ApiDocDetail",
                  unitId: "261",
                  docId: "827",
                },
              ],
            },
            // 快运
            {
              activeName: this.$t('wineWarehouse.index.5ivnlvvn4r80'),
              carouselData: [
                {
                  name: this.$t('wineWarehouse.index.5ivnlvvn4u80'),
                  routerName: "ApiDocDetail",
                  unitId: "177",
                  docId: "268",
                },
                {
                  name: this.$t('wineWarehouse.index.5ivnlvvn4x40'),
                  routerName: "ApiDocDetail",
                  unitId: "177",
                  docId: "269",
                },
                {
                  name: this.$t('wineWarehouse.index.5ivnlvvn5040'),
                  routerName: "ApiDocDetail",
                  unitId: "177",
                  docId: "271",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: this.$t('wineWarehouse.index.5ivnlvvn53c0'),
          activeName: this.$t('wineWarehouse.index.5ivnlvvn5680'),
          tabList: [
            // 在库调整
            {
              activeName: this.$t('wineWarehouse.index.5ivnlvvn5680'),
              carouselData: [
                {
                  name: this.$t('wineWarehouse.index.5ivnlvvn5900'),
                  routerName: "ApiDocDetail",
                  unitId: "261",
                  docId: "812",
                },
                {
                  name: this.$t('wineWarehouse.index.5ivnlvvn5c00'),
                  routerName: "ApiDocDetail",
                  unitId: "261",
                  docId: "814",
                },
                {
                  name: this.$t('wineWarehouse.index.5ivnlvvn5es0'),
                  routerName: "ApiDocDetail",
                  unitId: "261",
                  docId: "819",
                },
              ],
            },
            // 库存查询
            {
              activeName: this.$t('wineWarehouse.index.5ivnlvvn5ic0'),
              carouselData: [
                {
                  name: this.$t('wineWarehouse.index.5ivnlvvn5mw0'),
                  routerName: "ApiDocDetail",
                  unitId: "261",
                  docId: "795",
                },
                {
                  name: this.$t('wineWarehouse.index.5ivnlvvn5pg0'),
                  routerName: "ApiDocDetail",
                  unitId: "261",
                  docId: "796",
                },
                {
                  name: this.$t('wineWarehouse.index.5ivnlvvn5s80'),
                  routerName: "ApiDocDetail",
                  unitId: "261",
                  docId: "797",
                },
              ],
            },
            {
              activeName: this.$t('wineWarehouse.index.5ivnlvvn5ug0'),
              // 盘点查询
              carouselData: [
                {
                  name: this.$t('wineWarehouse.index.5ivnlvvn5x40'),
                  routerName: "ApiDocDetail",
                  unitId: "261",
                  docId: "799",
                },
                {
                  name: this.$t('wineWarehouse.index.5ivnlvvn5zk0'),
                  routerName: "ApiDocDetail",
                  unitId: "261",
                  docId: "798",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: this.$t('wineWarehouse.index.5ivnlvvn61w0'),
          activeName: this.$t('wineWarehouse.index.5ivnlvvn6480'),
          tabList: [
            // 出库单
            {
              activeName: this.$t('wineWarehouse.index.5ivnlvvn6480'),
              carouselData: [
                {
                  name: this.$t('wineWarehouse.index.5ivnlvvn66k0'),
                  routerName: "ApiDocDetail",
                  unitId: "261",
                  docId: "769",
                },
                {
                  name: this.$t('wineWarehouse.index.5ivnlvvn68w0'),
                  routerName: "ApiDocDetail",
                  unitId: "261",
                  docId: "822",
                },
                {
                  name: this.$t('wineWarehouse.index.5ivnlvvn6b40'),
                  routerName: "ApiDocDetail",
                  unitId: "261",
                  docId: "825",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: this.$t('wineWarehouse.index.5ivnlvvn6dg0'),
          activeName: this.$t('wineWarehouse.index.5ivnlvvn6480'),
          tabList: [
            // 出库单
            {
              activeName: this.$t('wineWarehouse.index.5ivnlvvn6480'),
              carouselData: [
                {
                  name: this.$t('wineWarehouse.index.5ivnlvvn66k0'),
                  routerName: "ApiDocDetail",
                  unitId: "261",
                  docId: "769",
                },
                {
                  name: this.$t('wineWarehouse.index.5ivnlvvn68w0'),
                  routerName: "ApiDocDetail",
                  unitId: "261",
                  docId: "822",
                },
                {
                  name: this.$t('wineWarehouse.index.5ivnlvvn6b40'),
                  routerName: "ApiDocDetail",
                  unitId: "261",
                  docId: "825",
                },
              ],
            },
          ],
        },
      ],
      changeCarouselImages: [
        wineCompleteVehicle,
        wineWarehouseManagement,
        wineStoreAllocation,
        wineExpress,
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.wine-warehouse {
  min-width: 1200px;
}
</style>