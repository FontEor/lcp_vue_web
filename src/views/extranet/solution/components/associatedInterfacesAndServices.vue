<template>
  <div class="associated-interfaces-and-services">
    <div class="carousel-content">
      <h2 class="content-title">关联接口及服务</h2>
      <div class="content-flow">
        <div
          class="flow-img"
          :style="{
            'background-image': `url(${computeChangeBackgroudImg})`,
          }"
        ></div>
        <el-carousel
          indicator-position="none"
          arrow="always"
          @change="handleChangeCarousel"
        >
          <el-carousel-item
            class="carousel-item"
            v-for="(carouselItem, index) in carouselList"
            :key="index"
          >
            <div class="flow-list">
              <h2 class="list-title">{{ carouselItem.carouselTitle }}</h2>
              <div class="list-tabs">
                <el-tabs
                  v-if="carouselItem.activeName"
                  v-model="carouselItem.activeName"
                >
                  <el-tab-pane
                    v-for="(tabItem, index) in carouselItem.tabList"
                    :key="index"
                    :label="tabItem.activeName"
                    :name="tabItem.activeName"
                    ><ul class="tabs-content">
                      <li
                        class="content-item"
                        v-for="(item, index) in tabItem.carouselData"
                        :key="index"
                      >
                        <router-link
                          :to="{
                            name: item.routerName,
                            params: {
                              unitId: item.unitId,
                              docId: item.docId,
                            },
                          }"
                          tag="a"
                          target="_blank"
                          >{{ item.name }}</router-link
                        >
                      </li>
                    </ul>
                  </el-tab-pane>
                </el-tabs>
                <!-- 关联接口及服务不需要tabs的样式 -->
                <div
                  v-else
                  v-for="(tabItem, index) in carouselItem.tabList"
                  :key="index"
                  :label="tabItem.activeName"
                  :name="tabItem.activeName"
                >
                  <el-divider></el-divider>
                  <ul class="tabs-content">
                    <li
                      class="content-item"
                      v-for="(item, index) in tabItem.carouselData"
                      :key="index"
                    >
                      <router-link
                        :to="{
                          name: item.routerName,
                          params: {
                            unitId: item.unitId,
                            docId: item.docId,
                          },
                        }"
                        tag="a"
                        target="_blank"
                        >{{ item.name }}</router-link
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AssociatedInterfacesAndServices",
  props: {
    carouselList: {
      type: Array,
      required: true,
    },
    changeCarouselImages: {
      type: Array,
      required: true,
    },
  },
  computed: {
    computeChangeBackgroudImg() {
      return this.changeCarouselImages[this.index];
    },
  },
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    // 幻灯片切换事件
    handleChangeCarousel(index) {
      this.index = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.associated-interfaces-and-services {
  height: 625px;
  background: #f6f7fa;
  .carousel-content {
    width: 1200px;
    margin: 0 auto;
    .content-title {
      font-size: 34px;
      font-family: JDLANGZHENGTI--GB1;
      text-align: center;
      padding-top: 70px;
      margin: 70px auto 48px;
    }
    .content-flow {
      width: 1100px;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      .flow-img {
        width: 615px;
        height: 399px;
        border-radius: 4px;
        box-shadow: inset 0 1px 3px 0 rgba(205, 209, 223, 0.6);
        background-size: cover;
      }
      ::v-deep .el-carousel__arrow {
        width: 37px;
        height: 37px;
        font-size: 20px;
        background-color: #ffffff;
        color: #999999;
      }
      ::v-deep .el-carousel .el-carousel__container {
        height: 399px;
        width: 417px;
      }
      .carousel-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 417px;
        .flow-list {
          width: 417px;
          height: 399px;
          background: linear-gradient(
            90deg,
            rgba(249, 251, 255, 1) 0%,
            rgba(255, 255, 255, 1) 100%
          );
          border-radius: 4px;
          .list-title {
            text-align: center;
            margin-top: 22px;
            font-size: 24px;
            font-weight: 500;
          }
          .list-tabs {
            margin-top: 20px;
            ::v-deep .el-tabs__nav-scroll {
              display: flex;
              justify-content: center;
            }
            ::v-deep .el-tabs__item {
              font-size: 16px;
              font-weight: 500;
            }
            .tabs-content {
              text-align: center;
              .content-item {
                height: 32px;
                width: 129px;
                font-weight: 500;
                line-height: 32px;
                margin: 10px auto;
                &:hover {
                  width: 129px;
                  height: 32px;
                  line-height: 32px;
                  cursor: pointer;
                  font-weight: 500;
                  color: rgba(60, 110, 240, 1);
                  background: rgba(255, 255, 255, 1);
                  border-radius: 4px;
                  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.09);
                  transition: height 0.3s, width 0.3s;
                }
              }
            }
            ::v-deep .el-divider {
              background-color: #e4e7ed;
            }
          }
        }
      }
    }
  }
}
</style>