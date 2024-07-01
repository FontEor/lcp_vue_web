<template>
  <div>
    <el-menu
      v-for="(item, key) in menuList"
      :key="key"
      @select="selectMenu"
      :default-active="defaultActive"
    >
      <SubMenu :menuList="menuList" />
    </el-menu>
  </div>
</template>
<script>
import docCenter from "@/api/intranet/docCenter/index.js";
import SubMenu from "@/components/common/AsideMenu/SubMenu.vue";
export default {
  name: "ManaulMenu",
  components: {
    SubMenu,
  },
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
    //查询分类
    async getReleasedProductDocTree() {
      const productCode = this.$route.params.productCode;
      const params = { productCode };
      const { data } = await docCenter.getReleasedProductDocTree(params);
      this.menuList = data;
      if (this.$route.name === "Manaul") {
        this.queryFirstDocId(this.menuList[0].children[0]);
      }
    },
    selectMenu(index) {
      this.$router.push({
        name: "ManaulDetail",
        params: { docId: index },
      });
    },
    queryFirstDocId(menu) {
      //递归查找文档展示的第一个id
      if (!menu.children) {
        this.$router.push({
          name: "ManaulDetail",
          params: { docId: menu.id },
        });
      }
      if (menu.children && menu.children.length > 0) {
        this.queryFirstDocId(menu.children[0]);
      }
    },
  },
  created() {
    this.getReleasedProductDocTree();
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