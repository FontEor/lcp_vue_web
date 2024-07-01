<template>
  <div class="search-result">
    <ResultForm :keyword.sync="keyword" :fetchData="fetchData" />
    <el-tabs v-model="activeName" class="result-tabs" @tab-click="handleClick">
      <el-tab-pane :label="$t('searchResult.index.5ivhx2x7deg0')" name="first">
        <div class="tab-cont">
          <div class="list-wrap">
            <ResultList
              v-if="items.length > 0"
              :items="items"
              :handleCurrentChange="handleCurrentChangeAll"
              :currentPage.sync="currentPage"
              :page-size="size"
              :total="total"
            />
          </div>
        </div>
        <div class="tab-null" v-show="this.items.length == 0">
          <div class="null-background"></div>
          <p class="null-tip">{{ $t("searchResult.index.5ivhx2x7e400") }}</p>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('searchResult.index.5ivhx2x7e401')" name="second">
        <div class="tab-cont">
          <div class="list-wrap">
            <ResultList
              v-if="items.length > 0"
              :items="items"
              :handleCurrentChange="handleCurrentChangeApi"
              :currentPage.sync="currentPage"
              :page-size="size"
              :total="total"
            />
          </div>
        </div>
        <div class="tab-null" v-show="this.items.length == 0">
          <div class="null-background"></div>
          <p class="null-tip">{{ $t("searchResult.index.5ivhx2x7e400") }}</p>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('searchResult.index.5ivhx2x7e900')" name="third">
        <div class="tab-cont">
          <div class="sub-select">
            <el-select
              v-model="value"
              value-key="name"
              :placeholder="$t('searchResult.index.5ivhx2x7ecw0')"
              @change="selectChange"
            >
              <el-option
                v-show="!showoutside"
                v-for="item in options"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              ></el-option>
              <el-option
                v-show="showoutside"
                v-for="item in optionsOut"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="list-wrap">
            <ResultList
              v-if="items.length > 0"
              :items="items"
              :handleCurrentChange="handleCurrentChangeDoc"
              :currentPage.sync="currentPage"
              :page-size="size"
              :total="total"
            />
          </div>
        </div>
        <div class="tab-null" v-show="this.items.length == 0">
          <div class="null-background"></div>
          <p class="null-tip">{{ $t("searchResult.index.5ivhx2x7e400") }}</p>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="this.showoutside" label="消息文档" name="messageDoc">
        <div class="tab-cont">
          <div class="list-wrap">
            <ResultList
              v-if="items.length > 0"
              :items="items"
              :handleCurrentChange="handleCurrentChangeApi"
              :currentPage.sync="currentPage"
              :page-size="size"
              :total="total"
            />
          </div>
        </div>
        <div class="tab-null" v-show="this.items.length == 0">
          <div class="null-background"></div>
          <p class="null-tip">{{ $t("searchResult.index.5ivhx2x7e400") }}</p>
        </div>
      </el-tab-pane>
      <el-tab-pane
        v-if="this.showoutside"
        :label="$t('searchResult.index.5ivhx2x7egg0')"
        name="fourth"
      >
        <div class="tab-cont">
          <div class="list-wrap">
            <ResultList
              v-if="items.length > 0"
              :items="items"
              :handleCurrentChange="handleCurrentChangeBiz"
              :currentPage.sync="currentPage"
              :page-size="size"
              :total="total"
            />
          </div>
        </div>
        <div class="tab-null" v-show="this.items.length == 0">
          <div class="null-background"></div>
          <p class="null-tip">{{ $t("searchResult.index.5ivhx2x7e400") }}</p>
        </div>
      </el-tab-pane>
      <el-tab-pane
        v-if="!this.showoutside"
        :label="$t('searchResult.index.5ivhx2x7eks0')"
        name="fifth"
      >
        <div class="tab-cont">
          <div class="list-wrap">
            <ResultList
              v-if="items.length > 0"
              :items="items"
              :handleCurrentChange="handleCurrentChangeBiz"
              :currentPage.sync="currentPage"
              :page-size="size"
              :total="total"
            />
          </div>
        </div>
        <div class="tab-null" v-show="this.items.length == 0">
          <div class="null-background"></div>
          <p class="null-tip">{{ $t("searchResult.index.5ivhx2x7e400") }}</p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ResultList from "@/views/searchResult/resultList.vue";
import ResultForm from "@/views/searchResult/resultForm.vue";
import request from "@/utils/request";
import isIntranet from "@/utils/isIntranet";

export default {
  name: "SearchResult",
  components: {
    ResultList,
    ResultForm,
  },
  data() {
    return {
      apiQuickPath: "",
      activeName: "first",
      keyword: "",
      value: "",
      showoutside: false,
      type: "",
      options: [
        {
          value: {
            name: this.$t("searchResult.index.5ivhx2x7deg0"),
            business_type: "_all",
          },
          label: this.$t("searchResult.index.5ivhx2x7deg0"),
        },
        {
          value: {
            name: this.$t("searchResult.index.5ivhx2x7eo00"),
            business_type: "doc",
            type: "5",
          },
          label: this.$t("searchResult.index.5ivhx2x7eo00"),
        },
        {
          value: {
            name: this.$t("searchResult.index.5ivhx2x7erc0"),
            business_type: "doc",
            type: "6",
          },
          label: this.$t("searchResult.index.5ivhx2x7erc0"),
        },
        {
          value: {
            name: this.$t("searchResult.index.5ivhx2x7erc1"),
            business_type: "doc",
            type: "7",
          },
          label: this.$t("searchResult.index.5ivhx2x7erc1"),
        },
        {
          value: {
            name: this.$t("searchResult.index.5ivhx2x7eus0"),
            business_type: "question",
          },
          label: this.$t("searchResult.index.5ivhx2x7eus0"),
        },
      ],
      optionsOut: [
        {
          value: {
            name: this.$t("searchResult.index.5ivhx2x7deg0"),
            business_type: "doc",
            type: "0",
          },
          label: this.$t("searchResult.index.5ivhx2x7deg0"),
        },
        {
          value: {
            name: this.$t("searchResult.index.5ivhx2x7eo00"),
            business_type: "doc",
            type: "1",
          },
          label: this.$t("searchResult.index.5ivhx2x7eo00"),
        },
        {
          value: {
            name: this.$t("searchResult.index.5ivhx2x7erc0"),
            business_type: "doc",
            type: "2",
          },
          label: this.$t("searchResult.index.5ivhx2x7erc0"),
        },
        {
          value: {
            name: this.$t("searchResult.index.5ivhx2x7erc2"),
            business_type: "doc",
            type: "3",
          },
          label: this.$t("searchResult.index.5ivhx2x7erc2"),
        },
        {
          value: {
            name: this.$t("searchResult.index.5ivhx2x7eus0"),
            business_type: "question",
          },
          label: this.$t("searchResult.index.5ivhx2x7eus0"),
        },
      ],
      items: [],
      from: 0,
      size: 20,
      total: 100,
      currentPage: 1,
      productId: 0,
    };
  },
  methods: {
    url(type) {
      const hashMap = {
        allExtranet: "/search",
        allIntranet: "/search/inner",
        apiExtranet: "/search/api",
        apiIntranet: "/search/api/inner",
        docExtranet: "/search/doc",
        docIntranet: "/search/doc/inner",
        bizExtranet: "/search/biz_unit",
        bizIntranet: "/search/biz_unit",
        productIntranet: "/search/product/inner",
        messageDocExtranet: "/search/message",
      };
      return hashMap[type];
    },
    handleClick(tab, event) {
      if (tab.name == "first") {
        this.tabsSwitching("all");
      } else if (tab.name == "second") {
        this.tabsSwitching("api");
      } else if (tab.name == "third") {
        this.tabsSwitching("doc");
      } else if (tab.name == "fourth") {
        this.tabsSwitching("biz");
      } else if (tab.name == "fifth") {
        this.tabsSwitching("product");
      } else if (tab.name === "messageDoc") {
        this.tabsSwitching("messageDoc");
      }
    },
    // tabs切换
    tabsSwitching(type) {
      this.currentPage = 0;
      type = this.showoutside
        ? type.concat("Extranet")
        : type.concat("Intranet");
      request({
        url: this.url(type),
        method: "get",
        params: {
          q: this.keyword,
          from: Math.floor(this.currentPage * this.size),
          size: this.size,
          total: this.total,
        },
      })
        .then((resp) => {
          this.items = resp.data.rows;
          this.from = resp.data.from;
          this.size = resp.data.size;
          this.total = resp.data.total;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 文档-选择类型切换
    selectTypeSwitching(event) {
      const type = this.showoutside ? "extranet" : "intranet";
      const hashMap = {
        extranet: "/search/doc",
        intranet: "/search/doc/inner",
      };
      request({
        url: hashMap[type],
        method: "get",
        params: {
          q: this.keyword,
          from: this.from,
          size: this.size,
          total: this.total,
          business_type: event.business_type,
          type: event.type,
        },
      })
        .then((resp) => {
          this.items = resp.data.rows;
          this.from = resp.data.from;
          this.size = resp.data.size;
          this.total = resp.data.total;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 发送请求根据select的type不同返回不同的数据
    selectChange(event) {
      this.selectTypeSwitching(event);
    },
    handleCurrentChange(val, type) {
      type = this.showoutside
        ? type.concat("Extranet")
        : type.concat("Intranet");
      request({
        url: this.url(type),
        method: "get",
        params: {
          q: this.keyword,
          from: Math.floor((val - 1) * this.size),
          size: this.size,
          total: this.total,
        },
      })
        .then((resp) => {
          this.items = resp.data.rows;
          this.from = resp.data.from;
          this.size = resp.data.size;
          this.total = resp.data.total;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handleCurrentChangeAll(val) {
      this.handleCurrentChange(val, "all");
    },
    handleCurrentChangeApi(val) {
      this.handleCurrentChange(val, "api");
    },
    handleCurrentChangeDoc(val) {
      this.handleCurrentChange(val, "doc");
    },
    handleCurrentChangeBiz(val) {
      this.handleCurrentChange(val, "biz");
    },
    handleCurrentChangeProduct(val) {
      this.handleCurrentChange(val, "product");
    },
    fetchData() {
      const newQ = JSON.parse(JSON.stringify(this.$route.query));
      newQ.q = this.keyword;
      delete newQ.productId;
      delete newQ.activeName;
      this.$router.replace({ query: newQ });
      this.currentPage = 0;
      this.tabsSwitching("all", this.currentPage);
    },
    initSearchData() {
      this.keyword = this.$route.query.q;
      if (this.$route.query.activeName) {
        this.activeName = this.$route.query.activeName;
      }
      if (this.$route.query.productId) {
        this.productId = this.$route.query.productId;
      }
      // --外网passport
      this.showoutside = !isIntranet();
      this.fetchData();
    },
  },
  watch: {
    $route(to, from) {
      if (to.query.q !== from.query.q) {
        this.initSearchData();
      }
    },
  },
  created() {
    this.apiQuickPath = `${window.env.apiQuickPath}`;
  },
  mounted() {
    this.initSearchData();
  },
};
</script>

<style lang="scss" scoped>
em {
  color: red;
}
.search-result {
  width: 1200px;
  margin: 20px auto;
  background: #fff;
  padding: 20px 150px;
  ::v-deep .result-form {
    .result-input {
      width: 680px;
    }

    .el-input__inner {
      border-radius: 0;
    }
    .el-button {
      width: 60px;
      font-size: 18px;
      margin-left: -11px;
      padding: 10px 16px;
      border-radius: 0;
    }
  }
}
.sub-select {
  width: 200px;
}
.tab-null {
  padding: 100px 0;
  text-align: center;
  .null-background {
    display: inline-block;
    width: 112px;
    height: 114px;
    background: url(~@/assets/img/null-data-bg2.png) top center no-repeat;
    background-size: 100% 100%;
  }
  .null-tip {
    margin-top: 20px;
  }
}
</style>