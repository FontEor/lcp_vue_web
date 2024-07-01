<template>
  <div class="makeup-warehouse">
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
import makeupBanner from "@/assets/extranet/images/makeupWarehouse/banner.png";
import makeupCompleteVehicle from "@/assets/extranet/images/makeupWarehouse/complete-vehicle.png";
import makeupWarehouseTransfers from "@/assets/extranet/images/makeupWarehouse/warehouse-transfers.png";
import makeupWarehouseManagement from "@/assets/extranet/images/makeupWarehouse/warehouse-management.png";
import makeupStoreAllocation from "@/assets/extranet/images/makeupWarehouse/store-allocation.png";
import makeupExpress from "@/assets/extranet/images/makeupWarehouse/express.png";

export default {
  name: "MakeupWarehouse",
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
      bannerTitle: this.$t('makeupWarehouse.index.5ivo0jno7ks0'),
      bannerContent:
        this.$t('makeupWarehouse.index.5ivo0jno86c0'),
      bannerLink:
        "https://cloud.jdl.com/#/open-business-document/access-guide/272/53399",
      bannerImage: makeupBanner,
      // 解决痛点
      painPointContent: [
        this.$t('makeupWarehouse.index.5ivo0jno8b00'),
        this.$t('makeupWarehouse.index.5ivo0jno8e80'),
        this.$t('makeupWarehouse.index.5ivo0jno8hk0'),
      ],
      // 关联接口及服务
      carouselList: [
        {
          carouselTitle: this.$t('makeupWarehouse.index.5ivo0jno8l40'),
          activeName: this.$t('makeupWarehouse.index.5ivo0jno8oo0'),
          tabList: [
            // 入库单
            {
              activeName: this.$t('makeupWarehouse.index.5ivo0jno8oo0'),
              carouselData: [
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jno8rw0'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "954",
                },
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jno8v80'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "955",
                },
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jno8y80'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "956",
                },
              ],
            },
            // 快运
            {
              activeName: this.$t('makeupWarehouse.index.5ivo0jno91c0'),
              carouselData: [
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jno94k0'),
                  routerName: "ApiDocDetail",
                  unitId: "177",
                  docId: "268",
                },
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jno97g0'),
                  routerName: "ApiDocDetail",
                  unitId: "177",
                  docId: "269",
                },
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jno9ao0'),
                  routerName: "ApiDocDetail",
                  unitId: "177",
                  docId: "271",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: this.$t('makeupWarehouse.index.5ivo0jno9ds0'),
          activeName: this.$t('makeupWarehouse.index.5ivo0jno9gw0'),
          tabList: [
            // 出库单
            {
              activeName: this.$t('makeupWarehouse.index.5ivo0jno9gw0'),
              carouselData: [
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jno9jw0'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "957",
                },
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jno9n00'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "959",
                },
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jno9q00'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "960",
                },
              ],
            },
            // 入库单
            {
              activeName: this.$t('makeupWarehouse.index.5ivo0jno8oo0'),
              carouselData: [
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jno8rw0'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "954",
                },
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jno8v80'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "955",
                },
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jno8y80'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "956",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: this.$t('makeupWarehouse.index.5ivo0jno9tc0'),
          activeName: this.$t('makeupWarehouse.index.5ivo0jno9xs0'),
          tabList: [
            // 在库调整
            {
              activeName: this.$t('makeupWarehouse.index.5ivo0jno9xs0'),
              carouselData: [
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jnoa0w0'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "972",
                },
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jnoa400'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "974",
                },
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jnoa6o0'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "973",
                },
              ],
            },
            // 库存查询
            {
              activeName: this.$t('makeupWarehouse.index.5ivo0jnoa9g0'),
              carouselData: [
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jnoabw0'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "967",
                },
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jnoaec0'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "968",
                },
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jnoago0'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "969",
                },
              ],
            },
            // 盘点查询
            {
              activeName: this.$t('makeupWarehouse.index.5ivo0jnoaj40'),
              carouselData: [
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jnoalg0'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "971",
                },
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jnoano0'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "970",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: this.$t('makeupWarehouse.index.5ivo0jnoaq40'),
          activeName: this.$t('makeupWarehouse.index.5ivo0jno9gw0'),
          tabList: [
            // 出库单
            {
              activeName: this.$t('makeupWarehouse.index.5ivo0jno9gw0'),
              carouselData: [
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jno9jw0'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "957",
                },
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jno9n00'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "959",
                },
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jno9q00'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "960",
                },
              ],
            },
          ],
        },
        {
          carouselTitle: this.$t('makeupWarehouse.index.5ivo0jnoasw0'),
          activeName: this.$t('makeupWarehouse.index.5ivo0jno9gw0'),
          tabList: [
            // 出库单
            {
              activeName: this.$t('makeupWarehouse.index.5ivo0jno9gw0'),
              carouselData: [
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jno9jw0'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "957",
                },
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jno9n00'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "959",
                },
                {
                  name: this.$t('makeupWarehouse.index.5ivo0jno9q00'),
                  routerName: "ApiDocDetail",
                  unitId: "272",
                  docId: "960",
                },
              ],
            },
          ],
        },
      ],
      changeCarouselImages: [
        makeupCompleteVehicle,
        makeupWarehouseTransfers,
        makeupWarehouseManagement,
        makeupStoreAllocation,
        makeupExpress,
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.makeup-warehouse {
  min-width: 1200px;
}
</style>