<template>
  <div class="app-inner">
    <AppMain />
    <Footbar />
  </div>
</template>

<script>
import { AppMain, Footbar } from "@/components/common";

export default {
  name: "LayoutFooter",
  components: {
    AppMain,
    Footbar,
  },
};
</script>

<style lang="scss" scoped>
html,
body,
#app,
.app-inner {
  height: 100%;
}

.wly-body-wrapper {
  min-height: 100%;
  height: auto;
}

.wly-body-inner {
  padding: 0 0 136px;
}
</style>
