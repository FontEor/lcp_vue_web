<template>
  <el-menu
    :default-active="defaultActive"
    :collapse-transition="false"
    class="aside-menu"
    @select="onSelectMenuItem"
  >
    <el-submenu
      v-for="{ subtitle, subindex, menuItemList } in submenuList"
      :key="subindex"
      :index="subindex"
      class="aside-menu__outer-submenu"
    >
      <template #title>
        <span class="outer-submenu__title">{{ subtitle }}</span>
      </template>
      <template v-if="menuItemList instanceof Array && menuItemList.length > 0">
        <template
          v-for="{ menuItemTitle, menuItemIndex, children } in menuItemList"
        >
          <InnerSubmenu
            v-if="children instanceof Array && children.length > 0"
            :key="menuItemIndex"
            :innerSubmenuIndex="menuItemIndex"
            :innerSubmenuTitle="menuItemTitle"
            :innerMenuItemList="children"
          />
          <el-menu-item v-else :key="menuItemIndex" :index="menuItemIndex">
            <template #title> {{ menuItemTitle }} </template>
          </el-menu-item>
        </template>
      </template>
    </el-submenu>
  </el-menu>
</template>

<script>
import InnerSubmenu from "@/views/download/components/AsideMenu/InnerSubmenu.vue";

export default {
  name: "AsideMenu",
  components: { InnerSubmenu },
  props: {
    defaultActive: { type: String, default: "" },
    submenuList: { type: Array, default: () => [] },
  },
  methods: {
    onSelectMenuItem(index) {
      this.$emit("select", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.aside-menu {
  border-right: none;

  ::v-deep .aside-menu__outer-submenu {
    .el-submenu__title {
      background-color: transparent;

      .outer-submenu__title {
        font-weight: 600;
      }
    }

    .el-menu-item {
      background-color: transparent;
    }

    &.is-active {
      > .el-submenu__title {
        color: #3c6ef0;
      }
    }
  }
}
</style>