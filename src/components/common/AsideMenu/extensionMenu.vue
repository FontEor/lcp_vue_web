<template>
  <div>
    <template v-if="!showDetail">
      <el-menu
        v-for="(item, key) in menuList"
        :key="key"
        @select="selectMenu"
        :default-active="defaultActive"
      >
        <el-menu-item :index="item.id.toString()">
          {{ item.cnName }}</el-menu-item
        >
      </el-menu>
    </template>
    <template v-else>
      <!-- 面包屑 -->
      <div v-for="(item, key) in menuDetailList" :key="key">
        <!-- <div class="breadcrumb-container">
          <el-breadcrumb
            separator-class="el-icon-arrow-right"
            class="breadcrumb-inner"
          >
            <el-breadcrumb-item
              :to="{
                name: 'ExtensionDocDetail',
                params: { docId: $route.params.docId },
              }"
              >{{ item.productSysGroupCnName }}</el-breadcrumb-item
            >
            <el-breadcrumb-item>{{ cnName }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div> -->
        <el-menu
          @select="selectDetailMenu"
          :default-active="defaultDetailActive"
        >
          <el-menu-item style="height: 60px" :index="item.id.toString()">
            <template>
              <p style="line-height: 28px">{{ item.cnName }}</p>
              <p style="line-height: 24px">{{ item.methodName }}</p>
            </template>
          </el-menu-item>
        </el-menu>
      </div>
    </template>
  </div>
</template>
<script>
import docCenter from "@/api/intranet/docCenter/index.js";
export default {
  name: "ExtensionMenu",
  data() {
    return {
      menuList: [],
      menuDetailList: [],
      showDetail: false,
      cnName: "",
    };
  },
  computed: {
    defaultActive() {
      if (this.$route.params.docId) {
        return this.$route.params.docId.toString();
      }
    },
    defaultDetailActive() {
      if (this.$route.query.spiId) {
        return this.$route.query.spiId.toString();
      }
    },
  },
  methods: {
    async queryProductSysgroupList() {
      const productCode = this.$route.params.productCode;
      const type = 3;
      const data = { productCode, type };
      const response = await docCenter.queryProductSysgroupList(data);
      this.menuList = response.data;
      if (this.$route.name === "ExtensionDoc") {
        this.$router.push({
          name: "ExtensionDocDetail",
          params: { docId: this.menuList.length && this.menuList[0].id },
        });
      }
    },
    async querySpiDocList() {
      const productCode = this.$route.params.productCode;
      const productSysGroupId = this.$route.params.docId;
      const pageNumb = 1;
      const pageSize = 1000;
      const data = { productCode, productSysGroupId, pageNumb, pageSize };
      const response = await docCenter.querySpiDocList(data);
      this.menuDetailList = response.data;
    },
    selectMenu(index) {
      this.$router.push({
        name: "ExtensionDocDetail",
        params: { docId: index },
      });
    },
    selectDetailMenu(index) {
      this.$router.push({
        name: "ExtensionDocDetail",
        params: { docId: this.$route.params.docId },
        query: { spiId: index },
      });
    },
    async querySpiReleaseDoc() {
      const id = this.$route.query.spiId;
      const data = { id };
      const response = await docCenter.querySpiReleaseDoc(data);
      this.cnName = response.data.cnName;
    },
  },
  created() {
    if (this.$route.query.spiId) {
      this.showDetail = true;
      this.querySpiDocList();
      this.querySpiReleaseDoc();
    } else {
      this.showDetail = false;
      this.queryProductSysgroupList();
    }
  },
  watch: {
    "$route.query": {
      handler(newValue) {
        if (newValue.spiId) {
          this.showDetail = true;
          this.querySpiDocList();
          this.querySpiReleaseDoc();
        } else {
          this.showDetail = false;
          this.queryProductSysgroupList();
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb-container {
  position: absolute;
  top: 112px;
  .breadcrumb-inner {
    padding: 16px 0 0 0;
  }
}
.el-menu {
  border-right: transparent;
}
.el-menu-item {
  border-left: 4px solid transparent;
}
.el-menu-item.is-active {
  color: #3c6ef0;
  background: rgba(60, 110, 240, 0.1);
  border-left-color: #3c6ef0;
}
</style>