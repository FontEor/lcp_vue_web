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
import product3CBanner from "@/assets/extranet/images/3cWarehouse/3C-banner.png";
import product3CCompleteVehicle from "@/assets/extranet/images/3cWarehouse/3c-complete-vehicle.png";
import product3CStore from "@/assets/extranet/images/3cWarehouse/3c-store.png";
import product3CTransfer from "@/assets/extranet/images/3cWarehouse/3c-transfer.png";
import product3CExpress from "@/assets/extranet/images/3cWarehouse/3c-express.png";
import product3CStoreDistribution from "@/assets/extranet/images/3cWarehouse/3c-store-distribution.png";

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
      bannerTitle: "3C仓配门店解决方案",
      bannerContent: this.$t("3CWarehouse.index.5iw5q9gjku80"),
      bannerLink:
        "https://cloud.jdl.com/#/open-business-document/access-guide/273/53402",
      bannerImage: product3CBanner,
      // 解决痛点
      painPointContent: [
        this.$t("3CWarehouse.index.5iw5q9gjlns0"),
        this.$t("3CWarehouse.index.5iw5q9gjlso0"),
        this.$t("3CWarehouse.index.5iw5q9gjlwc0"),
      ],
      // 关联接口及服务
      carouselList: [
        {
          carouselTitle: this.$t("3CWarehouse.index.5iw5q9gjlzc0"),
          activeName: this.$t("3CWarehouse.index.5iw5q9gjm340"),
          tabList: [
            // 入库单
            {
              activeName: this.$t("3CWarehouse.index.5iw5q9gjm340"),
              carouselData: [
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjm680"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "983",
                },
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjm9c0"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "984",
                },
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjmco0"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "985",
                },
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjmfs0"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "999",
                },
              ],
            },
            // 快运
            {
              activeName: this.$t("3CWarehouse.index.5iw5q9gjmiw0"),
              carouselData: [
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjmm80"),
                  routerName: "ApiDocDetail",
                  unitId: "177",
                  docId: "268",
                },
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjmp40"),
                  routerName: "ApiDocDetail",
                  unitId: "177",
                  docId: "269",
                },
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjmsc0"),
                  routerName: "ApiDocDetail",
                  unitId: "177",
                  docId: "271",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: this.$t("3CWarehouse.index.5iw5q9gjmvg0"),
          activeName: this.$t("3CWarehouse.index.5iw5q9gjmyo0"),
          tabList: [
            // 出库单
            {
              activeName: this.$t("3CWarehouse.index.5iw5q9gjmyo0"),
              carouselData: [
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjn200"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "986",
                },
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjn540"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "988",
                },
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjn7w0"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "987",
                },
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjnb80"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "999",
                },
              ],
            },
            // 入库单
            {
              activeName: this.$t("3CWarehouse.index.5iw5q9gjm340"),
              carouselData: [
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjm680"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "983",
                },
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjm9c0"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "984",
                },
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjmco0"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "985",
                },
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjmfs0"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "999",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: this.$t("3CWarehouse.index.5iw5q9gjnfo0"),
          activeName: this.$t("3CWarehouse.index.5iw5q9gjnig0"),
          tabList: [
            // 在库调整
            {
              activeName: this.$t("3CWarehouse.index.5iw5q9gjnig0"),
              carouselData: [
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjnls0"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "1002",
                },
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjnoc0"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "1004",
                },
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjnr00"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "1003",
                },
              ],
            },
            // 库存查询
            {
              activeName: this.$t("3CWarehouse.index.5iw5q9gjntg0"),
              carouselData: [
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjnw40"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "997",
                },
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjnyo0"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "998",
                },
              ],
            },
            {
              activeName: this.$t("3CWarehouse.index.5iw5q9gjo1c0"),
              // 盘点查询
              carouselData: [
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjo3s0"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "1001",
                },
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjo640"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "1000",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: this.$t("3CWarehouse.index.5iw5q9gjo940"),
          activeName: this.$t("3CWarehouse.index.5iw5q9gjmyo0"),
          tabList: [
            // 出库单
            {
              activeName: this.$t("3CWarehouse.index.5iw5q9gjmyo0"),
              carouselData: [
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjn200"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "986",
                },
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjn540"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "988",
                },
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjn7w0"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "987",
                },
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjnb80"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "999",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: this.$t("3CWarehouse.index.5iw5q9gjobs0"),
          activeName: this.$t("3CWarehouse.index.5iw5q9gjmyo0"),
          tabList: [
            // 出库单
            {
              activeName: this.$t("3CWarehouse.index.5iw5q9gjmyo0"),
              carouselData: [
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjn200"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "986",
                },
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjn540"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "988",
                },
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjn7w0"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "987",
                },
                {
                  name: this.$t("3CWarehouse.index.5iw5q9gjnb80"),
                  routerName: "ApiDocDetail",
                  unitId: "273",
                  docId: "999",
                },
              ],
            },
          ],
        },
      ],
      changeCarouselImages: [
        product3CCompleteVehicle,
        product3CTransfer,
        product3CStore,
        product3CStoreDistribution,
        product3CExpress,
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.clothing-warehouse {
  min-width: 1200px;
}
</style>