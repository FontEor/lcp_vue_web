<template>
  <div class="navbar-logo-container">
    <router-link class="navbar-logo" to="/">
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NavbarLogo',
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables.scss";
.navbar-logo-container{
  float:left;
  height:100%;
  line-height:$navHeight;
  margin:0 160px 0 20px;
  .navbar-logo{
    display: block;
    width: $logoWidth;
    height: $logoHeight;
    background:url('~@/assets/img/logo2.png') center center no-repeat;
    background-size:$logoWidth $logoHeight;
  }
}
</style>
