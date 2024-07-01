<template>
  <el-submenu class="inner-submenu" :index="innerSubmenuIndex">
    <template #title>{{ innerSubmenuTitle }}</template>
    <template
      v-for="{ menuItemTitle, menuItemIndex, children } in innerMenuItemList"
    >
      <InnerSubmenu
        v-if="children instanceof Array && children.length > 0"
        :key="menuItemIndex"
        :innerSubmenuIndex="menuItemIndex"
        :innerSubmenuTitle="menuItemTitle"
        :innerMenuItemList="children"
      />
      <el-menu-item v-else :key="menuItemIndex" :index="menuItemIndex">
        <template #title>
          <span>{{ menuItemTitle }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-submenu>
</template>

<script>
import InnerSubmenu from "./InnerSubmenu.vue";

export default {
  name: "InnerSubmenu",
  components: { InnerSubmenu },
  props: {
    innerSubmenuIndex: { type: String, required: true },
    innerSubmenuTitle: { type: String, default: "" },
    innerMenuItemList: { type: Array, default: () => [] },
  },
};
</script>

<style lang="scss" scoped>
</style>