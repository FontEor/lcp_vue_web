<template>
  <div
    :class="{
      'api-menu': true,
      'is-empty': isEmpty,
      'api-menu-preview': isRoutePath,
    }"
    :date-content="$t('asideMenu.apiMenu.5iwca6y3x940')"
  >
    <el-menu
      class="api-menu__menu"
      :default-active="defaultActive"
      @select="selectMenu"
    >
      <el-submenu
        v-for="submenuItem in menuList"
        :key="submenuItem.code"
        :index="submenuItem.code"
        class="menu__submenu"
      >
        <template slot="title">
          <span slot="title" class="submenu__title">{{
            submenuItem.name
          }}</span>
        </template>
        <el-menu-item
          v-for="apiItem in submenuItem.apiList"
          :key="apiItem.id"
          :index="apiItem.id.toString()"
          class="submenu__menu-item"
        >
          <div @mouseenter="handleMouseEnter($event)">
            <el-tooltip
              placement="top"
              :disabled="disableTooltip"
              popper-class="option-item-popper"
            >
              <template #content>
                <p class="menu-item__code">
                  {{ apiItem.apiUrl }}
                </p>
                <p class="menu-item__name">
                  {{ apiItem.apiName }}
                </p>
              </template>
              <div class="item__text-wrapper">
                <p class="menu-item__code">
                  {{ apiItem.apiUrl }}
                </p>
                <p class="menu-item__name">
                  {{ apiItem.apiName }}
                </p>
              </div>
            </el-tooltip>
          </div>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import request from "@/utils/request";
import { SappModule } from "@/store/common/modules/app";

export default {
  name: "ApiMenu",
  data() {
    return {
      isEmpty: false,
      menuList: [],
      cnName: "",
      unitId: 0,
      disableTooltip: true,
    };
  },
  computed: {
    defaultActive() {
      if (this.$route.params.docId) {
        return this.$route.params.docId.toString();
      }
    },
    isRoutePath() {
      return this.$route.path.split("/")[1] === "preview-docking-plan";
    },
  },
  methods: {
    handleMouseEnter(e) {
      const codeEl = e.target.querySelector(".menu-item__code");
      const nameEl = e.target.querySelector(".menu-item__name");
      if (
        codeEl.scrollWidth > codeEl.offsetWidth ||
        nameEl.scrollWidth > nameEl.offsetWidth
      ) {
        this.disableTooltip = false;
      } else {
        this.disableTooltip = true;
      }
    },
    selectMenu(index) {
      let query=this.isRoutePath ? {
              approvalNumber: SappModule.approvalNumber,
            }: null
      this.$router
        .replace({
          name: this.isRoutePath ? "ApiDocDetailPreview" : "ApiDocDetail", // "ApiDocDetail",
          params: { docId: index },
          query
        })
        .catch((error) => {
          const { name, message } = error;
          if (
            name !== "NavigationDuplicated" &&
            !message.includes(
              "Avoided redundant navigation to current location"
            )
          ) {
            throw new Error(error);
          }
        });
    },
    async getMenuListData() {
      const { unitId } = this;
      let params = {
        unitId,
      };
      let url = "/bizapinterface/getApiDocListByCategory";
      if (this.isRoutePath) {
        url = "/bizview/getApiListByCategory";
        params = {
          id: unitId,
          approvalNumber: SappModule.approvalNumber,
        };
      }
      return await request({
        url,
        method: "get",
        params,
      }).catch((error)=>{
        console.log(error)
      });
    },
    async handleMenuListData() {
      const { data } = await this.getMenuListData()||{};
      let filterList =  data || [];
      this.menuList = filterList.filter(item => {
        item.apiList = item.apiList.filter(item1 => {
          return item1.apiCode !== '/zp/tracking/push';
        })
        return item.apiList.length > 0
      });
      // this.menuList = data || [];
      SappModule.SET_Api_Doc_List_Len(this.menuList.length);
      if (this.menuList.length > 0) {
        if (this.$route.name === "ApiDoc") {
          this.$router.replace({
            name: "ApiDocDetail",
            params: {
              docId:
                this.menuList[0].apiList && this.menuList[0].apiList.length > 0
                  ? this.menuList[0].apiList[0].id
                  : null,
            },
          });
        }
        if (this.$route.name === "ApiDocPreview") {
          this.$router.replace({
            name: "ApiDocDetailPreview",
            params: {
              docId:
                this.menuList[0].apiList && this.menuList[0].apiList.length > 0
                  ? this.menuList[0].apiList[0].id
                  : null,
            },
            query: {
              approvalNumber: SappModule.approvalNumber,
            },
          });
        }
      } else {
        document.querySelector(".aside-container").style.width = "100vw";
        this.isEmpty = true;
      }
    },
  },
  created() {
    //获取api文档列表
    this.unitId = this.$route.params.unitId;
    this.handleMenuListData();
  },
  destroyed() {
    document.querySelector(".aside-container").style.width = "290px";
  },
};
</script>

<style lang="scss" scoped>
.api-menu {
  position: sticky;
  top: 120px;
  height: calc(100vh - 120px);
  overflow: auto;

  &.is-empty {
    background-image: url("~@/assets/common/images/empty/empty1.png");
    background-position: 50% 32px;
    background-repeat: no-repeat;

    &::after {
      position: absolute;
      top: 360px;
      left: 50%;
      display: block;
      content: attr(date-content);
      transform: translateX(-50%);
    }
  }

  .api-menu__menu {
    border-right: none;

    ::v-deep .menu__submenu {
      .el-submenu__title {
        background-color: #f6f7fc;
        border-bottom: 1px solid #e7e7e7;

        .submenu__title {
          font-weight: 600;
        }
      }

      .submenu__menu-item {
        height: 60px;
        background-color: #f6f7fc;

        .menu-item__code {
          overflow: hidden;
          line-height: 28px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .menu-item__name {
          overflow: hidden;
          line-height: 24px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
.api-menu-preview {
  top: 60px;
}
</style>