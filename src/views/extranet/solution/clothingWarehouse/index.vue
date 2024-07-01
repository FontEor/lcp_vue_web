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
import clothingBanner from "@/assets/extranet/images/clothingWarehouse/clothing-banner.png";
import clothingCompleteVehicle from "@/assets/extranet/images/clothingWarehouse/complete-vehicle.png";
import clothingStore from "@/assets/extranet/images/clothingWarehouse/clothing-store.png";
import clothingTransfer from "@/assets/extranet/images/clothingWarehouse/clothing-transfer.png";
import clothingDelivery from "@/assets/extranet/images/clothingWarehouse/clothing-delivery.png";
import clothingExpress from "@/assets/extranet/images/clothingWarehouse/clothing-express.png";

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
      bannerTitle: this.$t("clothingWarehouse.index.5iw5mm3v3ms0"),
      bannerContent: this.$t("clothingWarehouse.index.5iw5mm3v4400"),
      bannerLink:
        "https://cloud.jdl.com/#/open-business-document/access-guide/270/53389",
      bannerImage: clothingBanner,
      // 解决痛点
      painPointContent: [
        this.$t("clothingWarehouse.index.5iw5mm3v48w0"),
        this.$t("clothingWarehouse.index.5iw5mm3v4cc0"),
        this.$t("clothingWarehouse.index.5iw5mm3v4fc0"),
      ],
      // 关联接口及服务
      carouselList: [
        {
          carouselTitle: this.$t("clothingWarehouse.index.5iw5mm3v4j00"),
          activeName: this.$t("clothingWarehouse.index.5iw5mm3v4m40"),
          tabList: [
            // 入库单
            {
              activeName: this.$t("clothingWarehouse.index.5iw5mm3v4m40"),
              carouselData: [
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v4pc0"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "894",
                },
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v4sk0"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "895",
                },
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v4vs0"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "896",
                },
              ],
            },
            // 快运
            {
              activeName: this.$t("clothingWarehouse.index.5iw5mm3v4ys0"),
              carouselData: [
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v51s0"),
                  routerName: "ApiDocDetail",
                  unitId: "177",
                  docId: "268",
                },
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v54w0"),
                  routerName: "ApiDocDetail",
                  unitId: "177",
                  docId: "269",
                },
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v58c0"),
                  routerName: "ApiDocDetail",
                  unitId: "177",
                  docId: "271",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: this.$t("clothingWarehouse.index.5iw5mm3v5bc0"),
          activeName: this.$t("clothingWarehouse.index.5iw5mm3v5e80"),
          tabList: [
            // 出库单
            {
              activeName: this.$t("clothingWarehouse.index.5iw5mm3v5e80"),
              carouselData: [
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v5j00"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "897",
                },
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v5m40"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "899",
                },
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v5p40"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "898",
                },
              ],
            },
            // 入库单
            {
              activeName: this.$t("clothingWarehouse.index.5iw5mm3v4m40"),
              carouselData: [
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v4pc0"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "894",
                },
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v4sk0"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "895",
                },
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v4vs0"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "896",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: this.$t("clothingWarehouse.index.5iw5mm3v5s80"),
          activeName: this.$t("clothingWarehouse.index.5iw5mm3v5xk0"),
          tabList: [
            // 在库调整
            {
              activeName: this.$t("clothingWarehouse.index.5iw5mm3v5xk0"),
              carouselData: [
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v60g0"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "912",
                },
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v6380"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "914",
                },
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v65o0"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "913",
                },
              ],
            },
            // 库存查询
            {
              activeName: this.$t("clothingWarehouse.index.5iw5mm3v6800"),
              carouselData: [
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v6ac0"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "907",
                },
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v6co0"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "908",
                },
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v6ew0"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "909",
                },
              ],
            },
            {
              activeName: this.$t("clothingWarehouse.index.5iw5mm3v6hc0"),
              // 盘点查询
              carouselData: [
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v6js0"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "911",
                },
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v6m00"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "910",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: this.$t("clothingWarehouse.index.5iw5mm3v6o80"),
          activeName: this.$t("clothingWarehouse.index.5iw5mm3v5e80"),
          tabList: [
            // 出库单
            {
              activeName: this.$t("clothingWarehouse.index.5iw5mm3v5e80"),
              carouselData: [
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v5j00"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "897",
                },
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v5m40"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "899",
                },
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v5p40"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "898",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: this.$t("clothingWarehouse.index.5iw5mm3v6qg0"),
          activeName: this.$t("clothingWarehouse.index.5iw5mm3v5e80"),
          tabList: [
            // 出库单
            {
              activeName: this.$t("clothingWarehouse.index.5iw5mm3v5e80"),
              carouselData: [
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v5j00"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "897",
                },
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v5m40"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "899",
                },
                {
                  name: this.$t("clothingWarehouse.index.5iw5mm3v5p40"),
                  routerName: "ApiDocDetail",
                  unitId: "270",
                  docId: "898",
                },
              ],
            },
          ],
        },
      ],
      changeCarouselImages: [
        clothingCompleteVehicle,
        clothingTransfer,
        clothingStore,
        clothingDelivery,
        clothingExpress,
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