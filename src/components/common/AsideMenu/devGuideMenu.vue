<template>
  <div>
    <el-menu
      v-for="(item, key) in menuList"
      :key="key"
      @select="selectMenu"
      :default-active="defaultActive"
    >
      <el-menu-item :index="item.id.toString()"> {{ item.title }}</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import docCenter from "@/api/intranet/docCenter/index.js";
export default {
  name: "DevGuideMenu",
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
    async getReleaseDocList() {
      //开发指南type
      const type = 9;
      const data = { type };
      const response = await docCenter.getReleaseDocList(data);
      this.menuList = response.data.list;
      if (this.$route.name === "DevGuide") {
        this.$router.push({
          name: "DevGuideDetail",
          params: { docId: this.menuList[0].id },
        });
      }
    },
    selectMenu(index) {
      this.$router.push({
        name: "DevGuideDetail",
        params: { docId: index },
      });
    },
  },
  created() {
    this.getReleaseDocList();
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