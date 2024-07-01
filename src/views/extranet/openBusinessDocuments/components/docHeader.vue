<template>
  <div :class="[isRoutePath ? 'navbar-wrap-preview' : 'navbar-wrap']">
    <div class="navbar" :class="[classObj]">
      <div class="nav-header">
        <div class="nav-wrapper">
          <div class="el-menu-switch" v-if="!isRoutePath">
            <el-dropdown @command="handleCommand">
              <h2 class="el-dropdown-link">
                <span>{{
                  $t("components.docHeader.5iwc0f5n3k81") + openBizName
                }}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </h2>
              <el-dropdown-menu
                style="max-height: 60vh; overflow-y: auto"
                slot="dropdown"
              >
                <div v-for="(item, key) in unitList" :key="key">
                  <el-dropdown-item :command="item">{{
                    item.name
                  }}</el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-else class="el-menu-switch">
            <h2 class="el-dropdown-link">
              <span>{{
                $t("components.docHeader.5iwc0f5n3k81") + openBizName
              }}</span>
            </h2>
          </div>

          <el-menu
            :default-active="defaultActive"
            text-color="#000000"
            active-text-color="#3c6ef0"
            class="navbar-menu"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="access-guide">
              <h3>{{ $t("components.docHeader.5iwc0f5n2mw0") }}</h3>
            </el-menu-item>
            <el-menu-item index="api-doc">
              <h3>{{ $t("components.docHeader.5iwc0f5n3k82") }}</h3>
            </el-menu-item>
            <el-menu-item index="message-doc">
              <h3>{{ $t("components.docHeader.5iwc0f5n3fs0") }}</h3>
            </el-menu-item>
            <el-menu-item v-if="!isRoutePath" index="sdk-doc">
              <h3>SDK</h3>
            </el-menu-item>
            <el-menu-item v-if="!isRoutePath" index="common-development-tools">
              <h3>{{ $t("components.docHeader.5iwc0f5n3k83") }}</h3>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SappModule } from "@/store/common/modules/app";
import bizDocCenter from "@/api/extranet/openBusineseDocCenter";

export default {
  computed: {
    isFixed() {
      return SappModule.isNavbarFixed;
    },
    classObj() {
      return {
        isFixed: SappModule.isNavbarFixed,
      };
    },
    unitId() {
      return this.$route.params.unitId;
    },
    defaultActive() {
      const index = this.$route.path.split("/");
      return index[2];
    },
    isRoutePath() {
      return this.$route.path.split("/")[1] === "preview-docking-plan";
    },
  },
  data() {
    return {
      openBizName: "",
      unitList: [],
    };
  },
  methods: {
    handleSelect(index, keyPath) {
      let commonPath = "open-business-document";
      let query = null;
      if (index === this.defaultActive) {
        return;
      } else {
        let path = `/${commonPath}/${index}/${this.unitId}`;
        if (this.isRoutePath) {
          commonPath = "preview-docking-plan";
          path = `/${commonPath}/${index}/${this.unitId}`;
          query = {
            approvalNumber: SappModule.approvalNumber,
          };
        }
        this.$router
          .push({
            path,
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
      }
    },
    //获取当前开放业务业务名称
    async getBizUnit() {
      const params = { id: this.unitId };
      return await bizDocCenter.getBizUnit(params).catch((error) => {
        console.log(error);
      });
    },
    //获取审批预览的开放业务业务名称
    async getBizView() {
      const params = {
        id: this.unitId,
        approvalNumber: this.$route.query.approvalNumber,
      };
      return await bizDocCenter.getBizView(params).catch((error) => {
        console.log(error);
      });
    },
    async getOpenBizName() {
      let response;
      if (this.isRoutePath) {
        response = await this.getBizView();
      } else {
        response = await this.getBizUnit();
      }
      if (response && response.data) {
        this.openBizName = response.data.name;
      }
    },
    //获取所有开放业务
    async findClassifiedBizUnitList() {
      if (!this.isRoutePath) {
        const response = await bizDocCenter
          .findClassifiedBizUnitList()
          .catch((error) => {
            if (error.response.data.error_response.zh_desc) {
              this.$message.error(this.$t("components.docHeader.5iwc0f5n3k80"));
            }
          });
        let bizUnitsList = [];
        response.data.forEach((element) => {
          element.bizUnits.forEach((item) => {
            bizUnitsList.push(item);
          });
        });
        this.unitList = bizUnitsList;
      }
    },
    handleCommand(command) {
      this.openBizName = command.name;
      this.$router.push({
        name: "AccessGuide",
        params: { unitId: command.id },
        query: { flag: true },
      });
    },
  },
  created() {
    SappModule.SET_Approval_Number(this.$route.query.approvalNumber);
    this.getOpenBizName();
    this.findClassifiedBizUnitList();
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/variables.scss";

.navbar-wrap-preview {
  position: sticky;
  top: 0px;
  z-index: 20;
}

.navbar-wrap {
  position: sticky;
  top: 60px;
  z-index: 20;
}

.navbar {
  transition: width 0.28s;
  height: 60px;
  background: #fff;
  // box-shadow: 0 2px 4px 0 rgba(60, 110, 240, 0.15);
}

.nav-header {
  height: 60px;
  background: #ffffff;
  box-shadow: 0 2px 4px 0 #e7e7e7;

  .nav-wrapper {
    display: flex;
    min-width: 1200px;
    height: 60px;
    margin: 0 auto;
    padding-left: 24px;

    .el-menu.el-menu--horizontal {
      border-bottom-color: solid 1px #eaeaea;
    }

    .el-menu-switch {
      // margin: 0 50px;
      margin-right: 48px;

      .el-dropdown-link {
        cursor: pointer;
        line-height: 60px;
        font-size: 16px;
        font-weight: 450;
      }

      .el-icon-arrow-down {
        font-size: 14px;
      }
    }

    .el-menu-item {
      width: 120px;
      text-align: center;
    }
  }
}

.body-mask {
  position: fixed;
  top: $navHeight;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 130;
  background: rgba(0, 0, 0, 0.3);
}
</style>
