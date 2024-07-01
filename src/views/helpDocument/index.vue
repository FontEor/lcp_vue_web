<template>
  <div class="help-document">
    <div class="banner-view">
      <div class="com-wrapper">
        <h2 class="tit">{{ $t("helpDocument.index.5ivk7jgul740") }}</h2>
        <p class="tip">{{ $t("helpDocument.index.5ivk7jgulzo0") }}</p>
      </div>
    </div>
    <div class="com-subnav">
      <div
        class="com-subnav-tabs"
        :class="{ is_fixed: isFixed }"
        ref="menuWrapper"
      >
        <a
          v-for="(item, index) in list"
          :key="index"
          class="tab"
          :class="{ active: curIdx == index }"
          :clstag="clstag(item.clstag[0] || '', item.clstag[1] || '')"
          @click.stop.prevent="selectMenu(index)"
        >
          {{ item.classifyName }}
        </a>
      </div>
    </div>
    <div ref="viewsWrapper" class="viewsWrapper">
      <div class="com-wrapper">
        <div v-for="(item, index) in list" :key="index" class="view-item">
          <h2 class="tit">{{ item.classifyName }}</h2>
          <template>
            <el-row :gutter="16" v-if="item.rows && item.rows.length > 0">
              <el-col
                :span="8"
                v-for="(subItem, rowIndex) in item.rows"
                :key="rowIndex"
              >
                <router-link
                  v-on:click.native="
                    queryDocSoftwareSystem(subItem, rowIndex, item, index)
                  "
                  to=""
                  class="doc-link"
                >
                  <div class="con" :clstag="clstag(subItem.clstag || '', '')">
                    <h3 class="tit3">{{ subItem.name }}</h3>
                    <p class="txt te2">{{ subItem.description }}</p>
                    <div class="detail-button-wrapper">
                      <el-button type="text"
                        >{{ $t("helpDocument.index.5ivk7jgum4s0") }}
                        <i class="el-icon-right"></i>
                      </el-button>
                    </div>
                  </div>
                </router-link>
              </el-col>
            </el-row>
            <div v-else class="no-data">
              {{ $t("helpDocument.index.5ivk7jgum8k0") }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SappModule } from "@/store/common/modules/app";
import request from "@/utils/request";
import isIntranet from "@/utils/isIntranet";
import pageClick from "@/utils/pageClick";

export default {
  name: "HelpDocument",
  data() {
    return {
      curIdx: 0,
      isFixed: false,
      scrollY: 0,
      offsetTop: 0,
      listHeight: [],
      tabIdx: 0,
      list: [],
      scope: "",
      selectDefault: [],
      selectRoot: [],
      initListIntranet: {
        classify: "lcpmanual",
        classifyName: this.$t("helpDocument.index.5ivk7jgumc00"),
        rows: [
          {
            id: null,
            name: this.$t("helpDocument.index.5ivk7jgumfw0"),
            description: this.$t("helpDocument.index.5ivk7jgumjc0"),
            clstag: "helpDocument_1618992600988|3",
          },
          {
            id: null,
            name: this.$t("helpDocument.index.5ivk7jgumjc1"),
            description: this.$t("helpDocument.index.5ivk7jgummk0"),
            clstag: "helpDocument_1618992600988|4",
          },
          {
            id: null,
            name: this.$t("helpDocument.index.5ivk7jgumps0"),
            description: this.$t("helpDocument.index.5ivk7jgumt00"),
            clstag: "helpDocument_1618992600988|5",
          },
        ],
      },
      initListExtranet: {
        classify: "lcpmanual",
        classifyName: this.$t("helpDocument.index.5ivk7jgumc00"),
        rows: [
          {
            id: null,
            name: this.$t("helpDocument.index.5ivk7jgumfw0"),
            description: this.$t("helpDocument.index.5ivk7jgumjc0"),
          },
          {
            id: null,
            name: this.$t("helpDocument.index.5ivk7jgumwg0"),
            description: this.$t("helpDocument.index.5ivk7jgun0s0"),
          },
          // {
          //   id: null,
          //   name: this.$t("helpDocument.index.5ivk7jgumps0"),
          //   description: this.$t("helpDocument.index.5ivk7jgumt00"),
          // },
          {
            id: 147,
            name: this.$t("helpDocument.index.5ivk7jgun3w0"),
            description: this.$t("helpDocument.index.5ivk7jgun780"),
          },
          {
            id: 170,
            name: this.$t("helpDocument.index.5ivk7jgunag0"),
            description: this.$t("helpDocument.index.5ivk7jgundg0"),
          },
        ],
      },
    };
  },
  computed: {
    currentIndex() {
      if (!this.isFixed) {
        return 0;
      }
      for (let i = 0, len = this.listHeight.length; i < len; i++) {
        const height1 = this.listHeight[i];
        const height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
  },
  methods: {
    // 点击事件埋点
    clstag(intranetId, extranetId) {
      return pageClick(intranetId, extranetId);
    },
    // 获取内外网软件系统分类列表
    async fetchSoftWareSystem() {
      const url = isIntranet()
        ? "product/release/classifiedProducts"
        : "outer/product/classifiedProducts";
      const method = "get";
      const response = await request({ url, method }).catch((error) => {
        throw error;
      });
      this.list = response.data;
      // 干掉lcpmanual这是后端冗余数据
      this.list = this.list.reduce((acc, item) => {
        const { classify, classifyName } = item;
        return acc.concat(
          classify === "lcpmanual" &&
            classifyName === this.$t("helpDocument.index.5ivk7jgunh40")
            ? []
            : [item]
        );
      }, []);
      // 替换返回的第一条数据
      this.list.splice(
        0,
        0,
        isIntranet() ? this.initListIntranet : this.initListExtranet
      );
     
      this.list = this.list.map((item) => {
        const intranetClstagTable = {
          [this.$t("helpDocument.index.5ivk7jgunn41")]:
            "helpDocument_1618992600988|1",
          [this.$t("helpDocument.index.5ivk7jgunn42")]:
            "helpDocument_1618992600988|2",
        };
        const extranetClstagTable = {
          [this.$t("helpDocument.index.5ivk7jgunn41")]:
            "helpDocument_1618993202645|1",
          [this.$t("helpDocument.index.5ivk7jgunn43")]:
            "helpDocument_1618993202645|2",
          [this.$t("helpDocument.index.5ivk7jgunn42")]:
            "helpDocument_1618993202645|3",
        };
        const clstag = [
          intranetClstagTable[item.classifyName] || "",
          extranetClstagTable[item.classifyName] || "",
        ];
        return { ...item, clstag };
      });
    },
    // 获取内外网新手指南、内网API使用指南、外网开发支持
    async fetchDocList(docType) {
      const docTypeTable = {
        NewHand: () => (isIntranet() ? "5" : "1"),
        ApiNewHand: () => (isIntranet() ? "7" : null),
        DevSupport: () => (isIntranet() ? null : "2"),
      };
      const url = "doc/getReleaseDocList";
      const method = "get";
      const type = docTypeTable[docType]();
      const params = { type };
      const response = await request({ url, method, params }).catch((error) => {
        throw error;
      });
      return response.data.list && response.data.list.length > 0
        ? response.data.list[0].id
        : null;
    },
    // 获取内外网常见问题
    async fetchQuestion() {
      const url = "question/getQuestionType";
      const method = "get";
      const netType = isIntranet() ? "2" : "1";
      const params = { netType };
      const response = await request({
        url,
        method,
        params,
      }).catch((error) => {
        throw error;
      });
      return response.data && response.data.length > 0
        ? response.data[0].value
        : null;
    },
    // 点击文档后查询信息
    async queryDocSoftwareSystem(subItem, rowIndex, item, index) {
      if (item.classifyName === this.$t("helpDocument.index.5ivk7jgumc00")) {
        const lcpMenuTable = {
          [this.$t("helpDocument.index.5ivk7jgumfw0")]: "NewHand",
          [this.$t("helpDocument.index.5ivk7jgumjc1")]: "ApiNewHand",
          [this.$t("helpDocument.index.5ivk7jgumwg0")]: "DevSupport",
        };
        if (subItem.name === this.$t("helpDocument.index.5ivk7jgumps0")) {
          const channelId = await this.fetchQuestion().catch((error) => {
            throw error;
          });
          channelId
            ? this.$router.push(`/question/${channelId}`)
            : this.$confirm(this.$t("helpDocument.index.5ivk7jgunkc0"), {
                type: "warning",
                center: true,
              });
        } else if (
          subItem.name.indexOf(this.$t("helpDocument.index.5ivk7jgunn40")) > -1
        ) {
          const id = subItem.id;
          window.env.baseEnv === "uat" || window.env.baseEnv === "prod"
            ? this.$router.push({ path: "/quick", query: { id } })
            : this.$confirm(this.$t("helpDocument.index.5ivk7jgunkc0"), {
                type: "warning",
                center: true,
              });
        } else {
          const docId = await this.fetchDocList(
            lcpMenuTable[subItem.name]
          ).catch((error) => {
            throw error;
          });
          docId
            ? this.$router.push({
                name: lcpMenuTable[subItem.name],
                params: { docId },
              })
            : this.$confirm(this.$t("helpDocument.index.5ivk7jgunkc0"), {
                type: "warning",
                center: true,
              });
        }
      } else {
        this.fetchDocTree(subItem.id);
      }
    },

    // --组织内外网文档树型基本信息
    async fetchDocTree(val) {
      const url = isIntranet()
        ? "/doc/getReleasedProductDocTree"
        : "/outer/doc/getReleasedProductDocTree";
      const method = "get";
      const productId = val;
      const params = { productId };
      const response = await request({ url, method, params }).catch((error) => {
        throw error;
      });
      this.data = response.data[0].children;
      // --搜索第一个选中文档id
      if (this.data !== null) {
        // --递归寻找文档ID
        this.fetchDefaultDocId(this.data[0]);
        // --守护缺省信息
        if (this.selectDefault.length === 0) {
          this.selectRoot.push(response.data[0].id);
        }
      }
      if (this.selectDefault.length == 0) {
        this.$router.push({
          name: "DocSoftwareSystem",
          params: { id: val },
        });
      } else {
        this.$router.push({
          name: "DocSoftwareSystem",
          params: { id: val, docId: this.selectDefault[0] },
        });
      }
    },

    // --迭代获取缺省选中文档id
    fetchDefaultDocId(val) {
      if (this.selectDefault.length === 0) {
        if (val.docType === 2) {
          this.selectDefault.push(val.id);
        } else {
          const { children } = val;
          if (children) {
            for (let i = 0; i < children.length; i++) {
              this.fetchDefaultDocId(children[i]);
            }
          }
        }
      }
    },
    calculateHeight() {
      const viewList =
        this.$refs.viewsWrapper.getElementsByClassName("view-item");
      let height = 300;
      this.listHeight.push(height);
      for (let i = 0, len = viewList.length; i < len; i++) {
        const item = viewList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index) {
      this.curIdx = index;

      const viewList =
        this.$refs.viewsWrapper.getElementsByClassName("view-item");
      const el = viewList[index];
      if (window.scrollTo) {
        window.scrollTo({ behavior: "smooth", top: el.offsetTop - 60 });
      }
    },
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollY = Math.abs(Math.round(scrollTop));
      this.isFixed = scrollTop >= this.offsetTop;
      if (scrollTop >= this.offsetTop) {
        SappModule.SET_NAVBAR_FIXED(false);
      } else {
        SappModule.SET_NAVBAR_FIXED(true);
      }
    },
  },
  async mounted() {
    // 内外网获取数据
    await this.fetchSoftWareSystem();
    // await this.fetchDocList();
    window.addEventListener("scroll", this.handleScroll);
    this.$nextTick(() => {
      this.offsetTop = this.$refs.menuWrapper.offsetTop;
      this.calculateHeight();
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    SappModule.SET_NAVBAR_FIXED(true);
  },
};
</script>

<style lang="scss" scoped>
.help-document {
  background: #f6f7fc url("~@/assets/img/softwareSystem/bg.png") top 320px
    center no-repeat;
  background-size: 100% auto;
}
.banner-view {
  background: #f6f7fc url("~@/assets/img/softwareSystem/banner.png") top center
    no-repeat;
  background-size: auto 100%;
}
.com-subnav-tabs {
  background: #f6f7fc;
  border-bottom: 1px solid #cbcbcb;
}
.viewsWrapper {
  padding: 20px 0 120px;
  .view-item {
    padding-top: 30px;
    .tit {
      font-size: 20px;
      font-weight: 600;
      color: #333;
    }

    .con {
      margin: 8px auto;
      padding: 24px 32px;
      font-size: 14px;
      line-height: 1.5;
      background: #fff;
      &:hover {
        box-shadow: 0 2px 8px 0 rgba(0, 0, 2, 0.12);
      }

      .tit3 {
        font-size: 16px;
        color: #333;
      }

      .txt {
        margin-top: 5px;
        color: #999;
        height: 63px;
        word-break: break-all;
        -webkit-line-clamp: 3;
      }
      .detail-button-wrapper {
        display: flex;
        justify-content: flex-end;
      }
    }

    .no-data {
      color: #999;
      text-align: center;
      font-size: 20px;
      padding-top: 20px;
    }
  }
}
</style>
