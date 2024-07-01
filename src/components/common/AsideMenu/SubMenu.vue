<template>
  <div>
    <template v-for="menu in this.menuList">
      <el-submenu
        :key="menu.id.toString()"
        :index="menu.id.toString()"
        v-if="menu.children"
      >
        <template slot="title">
          <span slot="title">{{ menu.title }}</span>
        </template>
        <SubMenu :menuList="menu.children"></SubMenu>
      </el-submenu>
      <el-menu-item
        :key="menu.id.toString()"
        :index="menu.id.toString()"
        v-else
      >
        <span slot="title">{{ menu.title }}</span>
      </el-menu-item>
    </template>
  </div>
</template>
 
<script>
export default {
  name: "SubMenu",
  props: {
    menuList: {
      type: Array,
      require: true,
    },
  },
  created() {},
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