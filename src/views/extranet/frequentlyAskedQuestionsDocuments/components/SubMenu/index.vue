<template>
  <div class="submenu">
    <template v-for="menu in this.menuList">
      <el-submenu
        v-if="menu.children"
        :key="menu.code"
        :index="menu.code"
        class="submenu__inner-submenu"
      >
        <template slot="title">
          <span slot="title" class="inner-submenu__title">{{
            menu.typeName
          }}</span>
        </template>
        <SubMenu :menuList="menu.children"></SubMenu>
      </el-submenu>
      <el-menu-item
        v-else
        :key="menu.code"
        :index="menu.code"
        class="submenu__inner-menu-item"
      >
        <span slot="title" class="inner-menu-item__title">{{
          menu.typeName
        }}</span>
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
};
</script>

<style lang="scss" scoped>
.submenu {
  ::v-deep .submenu__inner-submenu {
    .el-submenu__title {
      background-color: transparent;

      .inner-submenu__title {
        font-size: 14px;
      }
    }

    &.is-active {
      > .el-submenu__title {
        color: #3c6ef0;
      }
    }
  }

  .submenu__inner-menu-item {
    background-color: #f6f7fc;

    .inner-menu-item__title {
      font-size: 14px;
    }
  }
}
</style>