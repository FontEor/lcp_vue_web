<template>
  <div
    :class="{
      'message-menu': true,
      'is-empty': isEmpty,
      'message-menu-preview': isRoutePath,
    }"
    :data-content="$t('asideMenu.messageMenu.5iwbtrsqcgg0')"
  >
    <el-menu
      class="message-menu__menu"
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
          v-for="messageItem in submenuItem.messageList"
          :key="messageItem.id"
          :index="messageItem.id.toString()"
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
                  {{ messageItem.name }}
                </p>
                <p class="menu-item__name">
                  {{ messageItem.chineseName }}
                </p>
              </template>

              <div class="item__text-wrapper">
                <p class="menu-item__code">
                  {{ messageItem.name }}
                </p>
                <p class="menu-item__name">
                  {{ messageItem.chineseName }}
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
import lcp from "@/api/extranet/lcp/index";
import { SappModule } from "@/store/common/modules/app";

export default {
  name: "MessageMenu",
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
      let query = this.isRoutePath
        ? {
            approvalNumber: SappModule.approvalNumber,
          }
        : null;
      this.$router
        .replace({
          name: this.isRoutePath
            ? "MessageDocDetailPreview"
            : "MessageDocDetail",
          params: { docId: index },
          query,
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
    // 获取左侧菜单
    async getMenuList() {
      let response = await this.getBizUnitMessageByCategory();
      if (this.isRoutePath) {
        response = await this.getBizUnitMessagePreByCategory();
      }
      if (response && response.data) {
        this.menuList = response.data;
      }
      SappModule.SET_Message_Doc_List_Len(this.menuList.length);
      if (this.menuList.length > 0) {
        if (this.$route.name === "MessageDoc") {
          this.$router.replace({
            name: "MessageDocDetail",
            params: {
              docId:
                this.menuList[0].messageList &&
                this.menuList[0].messageList.length > 0
                  ? this.menuList[0].messageList[0].id
                  : null,
            },
          });
        }
        if (this.$route.name === "MessageDocPreview") {
          this.$router.replace({
            name: "MessageDocDetailPreview",
            params: {
              docId:
                this.menuList[0].messageList &&
                this.menuList[0].messageList.length > 0
                  ? this.menuList[0].messageList[0].id
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
    //对接方案消息文档list
    async getBizUnitMessageByCategory() {
      const params = { unitId: Number(this.unitId) };
      return await lcp.bizmsg
        .getBizUnitMessageByCategory(params)
        .catch((error) => {
          throw new Error("getBizUnitMessageByCategory" + error);
        });
    },
    //对接方案审批预览消息文档list
    async getBizUnitMessagePreByCategory() {
      const params = {
        id: Number(this.unitId),
        approvalNumber: SappModule.approvalNumber,
      };
      return await lcp.bizview
        .getBizUnitMessagePreByCategory(params)
        .catch((error) => {
          console.log("getBizUnitMessagePreByCategory" + error);
        });
    },
  },
  created() {
    //获取api文档列表
    this.unitId = this.$route.params.unitId;
    this.getMenuList();
  },
  destroyed() {
    document.querySelector(".aside-container").style.width = "290px";
  },
};
</script>

<style lang="scss" scoped>
.message-menu {
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
      content: attr(data-content);
      transform: translateX(-50%);
    }
  }

  .message-menu__menu {
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
.message-menu-preview {
  top: 60px;
}
</style>