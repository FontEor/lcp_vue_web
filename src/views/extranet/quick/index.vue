<template>
  <div class="express-quick-page">
    <div class="banner-view" :clstag="clstag('', 'quick_1618993292181|1')">
      <div class="com-wrapper">
        <h2 class="tit">{{ bizUnit.name }}</h2>
        <p class="tip">{{ bizUnit.remark }}</p>
        <div class="btn-wrap">
          <a href="javascript:;" class="btn-link" @click="routeToHow2Order">
            <el-button
              type="primary"
              class="com-br"
              :clstag="clstag('', 'quick_1618993292181|2')"
            >
              {{ $t("express.Quick.5ivh9xqcen80") }}</el-button
            >
          </a>
          <a
            href="javascript:;"
            class="btn-link"
            @click="routeToDoc($t('express.Quick.5ivghup4rzo0'))"
          >
            <el-button
              plain
              class="com-br"
              :clstag="clstag('', 'quick_1618993292181|3')"
            >
              {{ $t("express.Quick.5ivh9xqcfe80") }}</el-button
            >
          </a>
        </div>
      </div>
    </div>

    <div class="table-view">
      <div class="com-wrapper">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane :label="$t('express.Quick.5ivh9xqcfhs0')" name="api">
            <div class="list">
              <el-table
                :data="bizApis"
                height="528"
                style="width: 960px"
                class="my-table mb2"
              >
                <el-table-column
                  :label="$t('express.Quick.5ivh9xqcfl80')"
                  width="300"
                  :show-tooltip-when-overflow="true"
                >
                  <template slot-scope="scope">
                    <a
                      v-if="scope.row.type === 1"
                      href="javascript:;"
                      @click="routeToApiQuick(scope.row.id)"
                      class="api-link"
                    >
                      {{ scope.row.interfaceMethod }}
                    </a>
                    <a
                      v-if="scope.row.type === 2"
                      href="javascript:;"
                      @click="routeToApiQuick(scope.row.id)"
                      class="api-link"
                    >
                      {{ scope.row.apiName }}
                    </a>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('express.Quick.5ivh9xqcfoo0')"
                  :show-tooltip-when-overflow="true"
                >
                  <template slot-scope="scope">
                    <a
                      href="javascript:;"
                      @click="routeToApiQuick(scope.row.id)"
                    >
                      <p class="te">{{ scope.row.apiName }}</p>
                    </a>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('express.Quick.5ivh9xqcfrk0')"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">
                    <a
                      href="javascript:;"
                      @click="routeToApiQuick(scope.row.id)"
                    >
                      <p class="te">{{ scope.row.apiRemark }}</p>
                    </a>
                  </template>
                </el-table-column>
              </el-table>
              <div class="tc">
                <a
                  href="javascript:;"
                  class="com-btn-link"
                  @click="routeToApiQuick(bizApis[0].id)"
                >
                  <el-button plain>{{
                    $t("express.Quick.5ivh9xqcfuo0")
                  }}</el-button>
                </a>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('express.Quick.5ivh9xqcgzg4')" name="sdk">
            <div class="list downloadButtonsWrapper">
              <div class="tagWrapper">
                <el-tag
                  v-for="(tag, index) in tagList"
                  :key="index"
                  :disable-transitions="true"
                  type="info"
                  class="tagTip"
                >
                  <p>
                    <i class="el-icon-info"></i>
                    {{ $t("express.Quick.5ivh9xqcfxo0") }}
                    <a
                      href="javascript:;"
                      class="anchor"
                      @click="goToExplain"
                      >{{ $t("express.Quick.5ivh9xqcgzg2") }}</a
                    >
                  </p>
                </el-tag>
              </div>
              <el-table :data="tableBasicSdk" style="width: 100%">
                <el-table-column
                  :label="$t('express.Quick.5ivh9xqcg0g0')"
                  width="200"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column
                  :label="$t('express.Quick.5ivh9xqcg3c0')"
                  width="100"
                >
                  <template slot-scope="scope">{{
                    scope.row.version
                  }}</template>
                </el-table-column>
                <el-table-column
                  :label="$t('express.Quick.5ivh9xqcg6c0')"
                  width="100"
                >
                  <template slot-scope="scope">
                    <div v-if="scope.row.language === 1">JAVA</div>
                    <div v-else-if="scope.row.language === 2">.NET</div>
                    <div v-else-if="scope.row.language === 3">PHP</div>
                    <div v-else>UNKNOWN</div>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('express.Quick.5ivh9xqcgzg3')"
                  width="380"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">
                    <p class="te">{{ scope.row.description }}</p>
                  </template>
                </el-table-column>
                <el-table-column align="right">
                  <template slot-scope="scope">
                    <el-button
                      @click="
                        downloadBasicSdk(scope.row.jssKey, scope.row.fileName)
                      "
                      type="text"
                      size="mini"
                      >{{ $t("express.Quick.5ivh9xqcg980") }}</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-table :data="bizSdks" height="528" style="width: 100%">
                <el-table-column
                  :label="$t('express.Quick.5ivh9xqcgcg0')"
                  width="200"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column
                  :label="$t('express.Quick.5ivh9xqcg3c0')"
                  width="100"
                >
                  <template slot-scope="scope">{{
                    scope.row.version
                  }}</template>
                </el-table-column>
                <el-table-column
                  :label="$t('express.Quick.5ivh9xqcg6c0')"
                  width="100"
                >
                  <template slot-scope="scope">
                    <div v-if="scope.row.language === 1">JAVA</div>
                    <div v-else-if="scope.row.language === 2">.NET</div>
                    <div v-else-if="scope.row.language === 3">PHP</div>
                    <div v-else>UNKNOWN</div>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('express.Quick.5ivh9xqcgzg3')"
                  width="380"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">
                    <p class="te">{{ scope.row.remark }}</p>
                  </template>
                </el-table-column>
                <el-table-column align="right">
                  <template slot-scope="scope">
                    <el-tooltip
                      :content="$t('express.Quick.5ivh9xqcgfo0')"
                      placement="right"
                    >
                      <el-button
                        @click="downloadSdk(scope.row.jssKey)"
                        type="text"
                        size="mini"
                      >
                        {{ $t("express.Quick.5ivh9xqcg980") }}</el-button
                      >
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane
            v-if="bizMessages && bizMessages.length > 0"
            :label="$t('express.Quick.5ivh9xqcgik0')"
            name="message"
          >
            <div class="list">
              <el-table
                :data="bizMessages"
                height="528"
                style="width: 960px"
                class="my-table mb2"
              >
                <el-table-column
                  :label="$t('express.Quick.5ivh9xqcglo0')"
                  width="300"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">
                    <a
                      href="javascript:;"
                      @click="routeToMessageQuick(scope.row.id)"
                      class="api-link"
                    >
                      {{ scope.row.name }}
                    </a>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('express.Quick.5ivh9xqcfrk0')"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">
                    <a
                      href="javascript:;"
                      @click="routeToMessageQuick(scope.row.id)"
                    >
                      <p class="te">{{ scope.row.descr }}</p>
                    </a>
                  </template>
                </el-table-column>
              </el-table>
              <div class="tc">
                <a
                  href="javascript:;"
                  class="com-btn-link"
                  @click="routeToMessageQuick(bizMessages[0].id)"
                >
                  <el-button plain>{{
                    $t("express.Quick.5ivh9xqcgos0")
                  }}</el-button>
                </a>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div class="flow-view">
      <div class="flow-style">{{ $t("express.Quick.5ivh9xqcgrk0") }}</div>
      <div class="com-wrapper">
        <el-row :gutter="40" class="flow">
          <el-col v-for="(flow, index) in bizFlows" :key="flow.id" :span="5">
            <div class="con">
              <i class="order">{{ flow.serialNumber }}</i>
              <p class="tip">{{ flow.title }}</p>
              <img v-if="flow.image" :src="flow.image" class="ico" />
              <i
                class="el-icon-d-arrow-right ico-arrow"
                v-if="index < bizFlows.length - 1"
              ></i>
              <br />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog
      :visible.sync="loginDialogVisible"
      width="400px"
      custom-class="login-dialog"
    >
      <div><i class="el-icon-warning"></i></div>
      <div class="login-text">
        {{ $t("express.Quick.5ivh9xqcguw0")
        }}<a class="loginColor" @click="gotoLogin">{{
          $t("express.Quick.5ivh9xqcgzg0")
        }}</a
        >！
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from "@/utils/request";
import { getBizUnit } from "@/api/business/unit/biz-unit";
import { getBizUnitFlows } from "@/api/business/flow/biz-flow";
import { getBizUnitApis } from "@/api/business/api/biz-api";
import { getBizUnitMessages } from "@/api/business/message/biz-message.ts";
import { downloadBizSdk, getBizUnitSdks } from "@/api/business/sdk/biz-sdk";
import { downloadBaseSdk, getBaseSdkList } from "@/api/business/sdk/baseSdk";
import api from "@/api/index";
import pageClick from "@/utils/pageClick";
import { UserModule } from "@/store/common/modules/user";

export default {
  data() {
    return {
      id: "",
      bizUnit: {
        id: null,
        name: null,
        remark: null,
      },
      tagList: ["tag"],
      bizFlows: [],
      activeName: "api",
      bizApis: [],
      tableBasicSdk: [],
      bizSdks: [],
      bizMessages: [],
      how2OrderPath: "",
      javaSdkFileName: "",
      phpSdkFileName: "",
      loginDialogVisible: false,
      updateVersionUrl: window.env.sdkUpdateVersion,
      docId: null,
    };
  },
  methods: {
    //跳转登录
    gotoLogin() {
      UserModule.extranetCheckLogin();
    },
    // 点击事件埋点
    clstag(intranetId, extranetId) {
      return pageClick(intranetId, extranetId);
    },
    // 由于el-tabs中的tabs__item不能直接设置自定义属性，因此模拟点击事件
    tabClick(tab) {
      const tabNameTable = {
        api: "quick_1618993292181|4",
        sdk: "quick_1618993292181|5",
        message: "quick_1618993292181|6",
      };
      const div = document.createElement("div");
      div.setAttribute("clstag", this.clstag("", tabNameTable[tab.name] || ""));
      document.body.appendChild(div);
      div.click();
      div.remove();
    },
    goToExplain() {
      window.open(
        `//${window.location.host}/#/${window.env.docSdk}?id=${this.id}`,
        "_blank"
      );
    },
    routeToApiQuick(docId) {
      this.$router.push({
        name: "ApiDocDetail",
        params: {
          unitId: this.id,
          docId,
        },
      });
    },
    routeToMessageQuick(docId) {
      this.$router.push({
        name: "MessageDocDetail",
        params: {
          unitId: this.id,
          docId,
        },
      });
    },
    // 跳转到如何订阅
    routeToHow2Order() {
      // this.$router.push({ path: this.how2OrderPath, query: { id: this.id } });
      this.getMenuList();
    },
    /**
     * 获取菜单list信息
     */
    getMenuList() {
      request({
        url: "/doc/getDocByGroupByTree",
        method: "get",
        params: {
          objId: this.id,
        },
      })
        .then((rsp) => {
          this.menuList = rsp.data;
          if (this.menuList[1].children[0].children) {
            this.docId = this.menuList[1].children[0].children[0].id;
          } else {
            this.docId = this.menuList[1].children[0].id;
          }
          this.$router.push({
            name: "AccessGuideDetail",
            params: {
              unitId: this.id,
              docId: this.docId,
            },
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 跳转到文档
    routeToDoc(title) {
      this.$router.push({
        name: "AccessGuide",
        params: { unitId: this.id },
      });
    },
    foundDoc(unitDocList, unitId, title) {
      for (const unit of unitDocList) {
        if (Number(unit.objId) === Number(unitId)) {
          for (const doc of unit.docList) {
            if (doc.title === title) {
              return doc;
            }
          }
        }
      }
      return null;
    },
    downloadSdk(jssKey) {
      if (jssKey === null || jssKey === undefined || jssKey === "") {
        this.$message.error(this.$t("express.Quick.5ivh9xqcgzg5"));
        console.log(this.$t("express.Quick.5ivh9xqcgzg6"));
      } else {
        downloadBizSdk(jssKey);
      }
    },
    downloadBasicSdk(jssKey, fileName) {
      downloadBaseSdk(jssKey, fileName);
    },
    handleGatewayError(error) {
      console.log(error);
      this.$message.error(error.response.data.error_response.zh_desc);
    },

    getBizUnitData() {
      getBizUnitApis(Number(this.id))
        .then((bizApis) => (this.bizApis = bizApis))
        .catch((error) => this.handleGatewayError(error));
      getBizUnitMessages(Number(this.id))
        .then((bizMessages) => {
          this.activeName =
            this.activeName === "message" &&
            !(bizMessages && bizMessages.length > 0)
              ? "api"
              : this.activeName;
          return (this.bizMessages = bizMessages);
        })
        .catch((error) => this.handleGatewayError(error));
      getBizUnitFlows(Number(this.id)).then(
        (bizFlows) => (this.bizFlows = bizFlows)
      );
      getBizUnitSdks(Number(this.id), 0, 0x7fffffff).then(
        (bizSdks) => (this.bizSdks = bizSdks)
      );
    },
  },
  created() {
    this.id = this.$route.query.id;
    this.how2OrderPath = `${window.env.docHow2Order}`;
    this.javaSdkFileName = "lop-opensdk-support.jar";
    this.phpSdkFileName = "lop-opensdk-php.zip";
  },
  mounted() {
    // 用于控制台业务单元接口、SDK、消息的隐藏、取消隐藏后的跳转显示
    this.activeName = this.$route.query.tab || "api";
    getBaseSdkList().then((baseSdkList) => (this.tableBasicSdk = baseSdkList));
    getBizUnit(Number(this.id))
      .then((bizUnit) => {
        if (bizUnit) {
          console.log(bizUnit.publishRange, "bizUnit.publishRange ");
          if (bizUnit.publishRange === 1) {
            //业务单元范围为私有
            //校验是否登陆：是->是否拥有查看私有业务单元权限，否->打开登录提示弹框
            setTimeout(() => {
              const { loginState } = UserModule;
              if (loginState) {
                //校验是否有查看私有业务单元权限：是->展示内容，否->跳转开放业务列表页，并弹窗提示
                const unitId = this.id;
                api.bizSupplier
                  .checkBizUnitVisibleSupplier(unitId)
                  .then((res) => {
                    if (!res.data) {
                      //无权限
                      this.$router.push({
                        name: "OpenBusiness",
                        params: {
                          fromUrl: "noAuthority",
                        },
                      });
                    } else {
                      //有权限
                      this.bizUnit = bizUnit;
                      this.getBizUnitData();
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                this.loginDialogVisible = true;
              }
            }, 200);
          } else {
            //业务单元范围为公有，展示内容
            this.bizUnit = bizUnit;
            this.getBizUnitData();
          }
        } else {
          //获取到的数据为空则表示业务单元id不存在，跳转404页面
          this.$router.push("/404");
        }
      })
      .catch((error) => this.handleGatewayError(error));
  },
};
</script>

<style lang="scss" scoped>
.loginColor {
  color: #3c6ef0;
}
.login-text {
  margin: 20px auto;
}
.el-icon-warning {
  color: #ffb600;
  font-size: 48px;
  margin-top: 10px;
}
::v-deep .login-dialog {
  text-align: center;
  border-radius: 4px;
  border: 1px solid #eaeaea;
  .el-dialog__header {
    border-bottom: none;
    height: 0px;
    padding: 0px;
  }
}
.api-link {
  overflow-x: hidden;
  color: #3c6ef0;
  text-overflow: ellipsis;
}
.express-quick-page {
  background: #f6f7fc;
  margin-bottom: 60px;
  .com-tit {
    padding: 40px 0 20px;
    font-size: 24px;
    color: #333333;
    text-align: center;
  }
  .com-wrapper {
    width: 1000px;
    margin: 0 auto;
  }
  .com-br {
    border-radius: 0;
  }
  .com-btn-link {
    display: inline-block;
  }
  .banner-view {
    padding-top: 85px;
    width: 100%;
    height: 320px;
    color: #333;
    background: url("~@/assets/img/quick/banner.png") top center no-repeat;
    background-size: auto 100%;
    h2 {
      font-size: 34px;
    }
    .tip {
      width: 400px;
      padding: 10px 0 25px;
      font-size: 14px;
    }
    .btn-link {
      display: inline-block;
      margin-right: 10px;
    }
  }
  .flow-view {
    text-align: center;
    padding-bottom: 40px;
    .flow-style {
      font-size: 24px;
      margin: 50px auto;
    }
    .flow {
      margin: 45px 0 25px;
      display: -ms-flexbox;
      display: flex;
      ::v-deep .el-col-5 {
        width: 20%;
        -ms-flex: 1;
        flex: 1;
      }
      .con {
        padding: 45px 0 16px;
        background: #e7ecfb;
        position: relative;
        border-radius: 6px;
        height: 80%;
        .ico-arrow {
          position: absolute;
          top: 50%;
          left: 100%;
          font-size: 16px;
          color: #3c6ef0;
          margin-left: 12px;
          transform: translateY(-50%);
        }
        .order {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 50px;
          font-size: 40px;
          color: #3c6ef0;
          background: #e7ecfb;
          border-radius: 50%;
        }
        .tip {
          font-size: 16px;
          color: #333333;
          line-height: 24px;
        }
        .ico {
          display: block;
          width: 32px;
          height: 32px;
          margin: 16px auto 0;
        }
      }
    }
  }
  .cont-view {
    padding-top: 40px;
    width: 100%;
    height: 576px;
    background: url("~@/assets/img/quick/bg3-wrap.png") top center no-repeat;
    background-size: 100% 100%;
    .tit-white {
      font-size: 24px;
      color: #fff;
      padding-bottom: 20px;
      text-align: center;
      font-family: PingFangSC-Regular;
    }
    .banner {
      padding: 70px;
      width: 100%;
      height: 320px;
      background: url("~@/assets/img/quick/bg3.png") top center no-repeat;
      background-size: 100% 100%;
      h2 {
        font-size: 32px;
        margin-bottom: 6px;
      }
      .com-btn {
        margin-top: 50px;
        border-radius: 0;
      }
    }
    .con {
      height: 100px;
      margin-top: 20px;
      background: #fff;
      padding: 12px 20px 12px 8px;
      .ico {
        width: 76px;
        height: 76px;
      }
      dl {
        padding: 0 0 0 10px;
        dt {
          font-size: 14px;
          line-height: 20px;
          color: #666;
        }
        dd {
          font-size: 20px;
          line-height: 28px;
          color: #333;
          padding-top: 10px;
        }
      }
    }
  }
  .table-view {
    padding-top: 20px;
    ::v-deep .el-tabs {
      .el-tabs__header {
        margin-bottom: 0;
      }
      .el-tabs__nav-scroll {
        text-align: center;
      }
      .el-tabs__nav {
        display: inline-block;
        float: none;
      }
      .el-tabs__item {
        font-size: 24px;
        height: 60px;
        line-height: 60px;
      }
    }
    .list {
      padding-bottom: 40px;
      background: #fff;
      padding: 20px 20px 30px;
      &.downloadButtonsWrapper {
        position: relative;
        background: #fff;
        .tagTip {
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          font-size: 16px;
          border-color: #f5f5f5;
          .el-icon-info {
            color: #b5b5b5;
          }
          .anchor {
            color: #3c6ef0;
          }
        }
        .downloadButtons {
          position: absolute;
          top: 28px;
          right: 40px;
          ::v-deep .el-button {
            color: #fff;
          }
        }
      }
      ::v-deep .el-table {
        thead {
          th {
            background: #3c6ef0;
            color: #fff;
          }
        }
        .cell {
          padding-right: 0;
          padding-left: 20px;
        }
        tr th:last-child,
        tr td:last-child {
          .cell {
            padding-right: 20px;
          }
        }
      }
      .el-table--border td:first-child .cell,
      .el-table--border th:first-child .cell {
        padding-left: 20px;
      }
      .com-btn-link {
        margin-top: 25px;
      }
    }
  }
}
</style>
