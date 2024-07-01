<template>
  <div class="maternal-and-infant-warehouse">
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
import maternalAndInfantBanner from "@/assets/extranet/images/maternalAndInfantWarehouse/banner.png";
import maternalAndInfantCompleteVehicle from "@/assets/extranet/images/maternalAndInfantWarehouse/complete-vehicle.png";
import maternalAndInfantWarehouseTransfers from "@/assets/extranet/images/maternalAndInfantWarehouse/warehouse-transfers.png";
import maternalAndInfantWarehouseManagement from "@/assets/extranet/images/maternalAndInfantWarehouse/warehouse-management.png";
import maternalAndInfantStoreAllocation from "@/assets/extranet/images/maternalAndInfantWarehouse/store-allocation.png";
import maternalAndInfantExpress from "@/assets/extranet/images/maternalAndInfantWarehouse/express.png";

export default {
  name: "MaternalAndInfantWarehouse",
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
      bannerTitle: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2tx40'),
      bannerContent:
        this.$t('maternalAndInfantWarehouse.index.5iw5hmk2uos0'),
      bannerLink:
        "https://cloud.jdl.com/#/open-business-document/access-guide/271/53396",
      bannerImage: maternalAndInfantBanner,
      // 解决痛点
      painPointContent: [
        this.$t('maternalAndInfantWarehouse.index.5iw5hmk2ut80'),
        this.$t('maternalAndInfantWarehouse.index.5iw5hmk2uww0'),
        this.$t('maternalAndInfantWarehouse.index.5iw5hmk2v0g0'),
      ],
      // 关联接口及服务
      carouselList: [
        {
          carouselTitle: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2v3w0'),
          activeName: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2v7c0'),
          tabList: [
            // 入库单
            {
              activeName: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2v7c0'),
              carouselData: [
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2va80'),
                  routerName: "ApiDocDetail",
                  unitId: "271",
                  docId: "924",
                },
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2vd80'),
                  routerName: "ApiDocDetail",
                  unitId: "271",
                  docId: "925",
                },
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2vg00'),
                  routerName: "ApiDocDetail",
                  unitId: "271",
                  docId: "926",
                },
              ],
            },
            // 快运
            {
              activeName: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2vj80'),
              carouselData: [
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2vmg0'),
                  routerName: "ApiDocDetail",
                  unitId: "177",
                  docId: "268",
                },
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2vpk0'),
                  routerName: "ApiDocDetail",
                  unitId: "177",
                  docId: "269",
                },
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2vsg0'),
                  routerName: "ApiDocDetail",
                  unitId: "177",
                  docId: "271",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2vvo0'),
          activeName: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2vyk0'),
          tabList: [
            // 出库单
            {
              activeName: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2vyk0'),
              carouselData: [
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2w1g0'),
                  routerName: "ApiDocDetail",
                  unitId: "271",
                  docId: "927",
                },
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2w4s0'),
                  routerName: "ApiDocDetail",
                  unitId: "271",
                  docId: "929",
                },
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2w7o0'),
                  routerName: "ApiDocDetail",
                  unitId: "271",
                  docId: "930",
                },
              ],
            },
            // 入库单
            {
              activeName: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2v7c0'),
              carouselData: [
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2va80'),
                  routerName: "ApiDocDetail",
                  unitId: "271",
                  docId: "924",
                },
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2vd80'),
                  routerName: "ApiDocDetail",
                  unitId: "271",
                  docId: "925",
                },
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2vg00'),
                  routerName: "ApiDocDetail",
                  unitId: "271",
                  docId: "926",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2was0'),
          activeName: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2wfk0'),
          tabList: [
            // 在库调整
            {
              activeName: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2wfk0'),
              carouselData: [
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2wi80'),
                  routerName: "ApiDocDetail",
                  unitId: "271",
                  docId: "942",
                },
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2wl80'),
                  routerName: "ApiDocDetail",
                  unitId: "271",
                  docId: "944",
                },
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2wnk0'),
                  routerName: "ApiDocDetail",
                  unitId: "271",
                  docId: "943",
                },
              ],
            },
            // 库存查询
            {
              activeName: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2wq40'),
              carouselData: [
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2wsc0'),
                  routerName: "ApiDocDetail",
                  unitId: "271",
                  docId: "937",
                },
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2wuo0'),
                  routerName: "ApiDocDetail",
                  unitId: "271",
                  docId: "938",
                },
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2wx00'),
                  routerName: "ApiDocDetail",
                  unitId: "271",
                  docId: "939",
                },
              ],
            },
            // 盘点查询
            {
              activeName: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2wzg0'),
              carouselData: [
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2x200'),
                  routerName: "ApiDocDetail",
                  unitId: "271",
                  docId: "941",
                },
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2x4g0'),
                  routerName: "ApiDocDetail",
                  unitId: "271",
                  docId: "940",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2x6w0'),
          activeName: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2vyk0'),
          tabList: [
            // 出库单
            {
              activeName: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2vyk0'),
              carouselData: [],
            },
          ],
        },
        {
          carouselTitle: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2x980'),
          activeName: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2vyk0'),
          tabList: [
            // 出库单
            {
              activeName: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2vyk0'),
              carouselData: [
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2w1g0'),
                  routerName: "ApiDocDetail",
                  unitId: "271",
                  docId: "927",
                },
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2w4s0'),
                  routerName: "ApiDocDetail",
                  unitId: "271",
                  docId: "929",
                },
                {
                  name: this.$t('maternalAndInfantWarehouse.index.5iw5hmk2w7o0'),
                  routerName: "ApiDocDetail",
                  unitId: "271",
                  docId: "930",
                },
              ],
            },
          ],
        },
      ],
      changeCarouselImages: [
        maternalAndInfantCompleteVehicle,
        maternalAndInfantWarehouseTransfers,
        maternalAndInfantWarehouseManagement,
        maternalAndInfantStoreAllocation,
        maternalAndInfantExpress,
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.maternal-and-infant-warehouse {
  min-width: 1200px;
}
</style>