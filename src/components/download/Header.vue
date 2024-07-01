<template>
  <el-header class="header">
    <nav class="header__blue-navbar-wrapper">
      <ul class="blue-navbar-wrapper__blue-navbar">
        <a
          class="blue-navbar__logo-anchor"
          href="https://cloud.jdl.com"
          target="__blank"
        >
          <li class="logo-anchor__image">
            <h1 class="image__h1">京东物流开放平台</h1>
          </li>
        </a>
      </ul>
    </nav>

    <nav class="header__white-navbar-wrapper">
      <div class="white-navbar-wrapper__white-navbar">
        <p>文档 · {{ title }}</p>
        <el-menu mode="horizontal" :router="true" :default-active="$route.path">
          <el-menu-item index="/access-guide">接入指南</el-menu-item>
          <el-menu-item index="/api-doc">API文档</el-menu-item>
          <el-menu-item index="/message-doc">消息文档</el-menu-item>
        </el-menu>
      </div>
    </nav>
  </el-header>
</template>

<script>
export default {
  name: "Header",
  data() {
    const { title } = window.scheme.header;
    return { title };
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  padding: 0;
  z-index: 1;

  .header__blue-navbar-wrapper {
    display: flex;
    align-items: center;
    height: 60px;
    background: #3c6ef0;

    .blue-navbar-wrapper__blue-navbar {
      margin: 0 auto;
      width: 1200px;

      .blue-navbar__logo-anchor {
        .logo-anchor__image {
          width: 400px;
          height: 32px;
          background-image: url("~@/assets/download/images/logo.png");
          background-size: contain;
          background-repeat: no-repeat;

          .image__h1 {
            visibility: hidden;
          }
        }
      }
    }
  }

  .header__white-navbar-wrapper {
    height: 60px;
    background: #fff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 2, 0.12);

    .white-navbar-wrapper__white-navbar {
      display: flex;
      align-items: center;
      margin: 0 auto;
      width: 1200px;
    }

    .white-navbar__title {
      color: #666;
    }
  }
}
</style>