<template>
  <div>
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
  </div>
</template>
<script>
import docCenter from "@/api/intranet/docCenter/index.js";
export default {
  name: "ApiMenu",
  data() {
    return {
      menuList: [],
    };
  },
  computed: {
    defaultActive() {
      if (this.$route.params.docId) {
        return this.$route.params.docId.toString();
      }
    },
  },
  methods: {
    async queryProductSysgroupList() {
      const productCode = this.$route.params.productCode;
      const type = 2;
      const data = { productCode, type };
      const response = await docCenter.queryProductSysgroupList(data);
      this.menuList = response.data;
      if (this.$route.name === "ApiDoc") {
        this.$router.push({
          name: "ApiDocDetail",
          params: { docId: this.menuList.length && this.menuList[0].id },
        });
      }
    },
    selectMenu(index) {
      this.$router.push({
        name: "ApiDocDetail",
        params: { docId: index },
      });
    },
  },
  created() {
    this.queryProductSysgroupList();
  },
};
</script>

<style lang="scss" scoped>
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