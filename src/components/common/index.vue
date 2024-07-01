<template>
  <div class="app-inner">
    <div class="wly-body-wrapper">
      <div class="wly-body-inner">
        <Navbar />
        <div class="wly-main-container">
          <AppMain />
        </div>
      </div>
    </div>
    <Footbar />
  </div>
</template>

<script>
import { Navbar, AppMain, Footbar } from "@/components/common";

export default {
  name: "Layout",
  components: {
    Navbar,
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
