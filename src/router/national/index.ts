import Vue from "vue";
import Router, { RouteConfig, Route, NavigationGuardNext } from "vue-router";
import { UserModule } from "@/store/common/modules/user";
import isIntranet from "@/utils/isIntranet";
import intranetRoutes from "@/router/national/intranetRoutes";
import extranetRoutes from "@/router/national/extranetRoutes";
import apiExtranet from "@/api/extranet/index";
// import MessageBoxImportantNotice from "@/utils/MessageBoxImportantNotice.js";

Vue.use(Router);

const baseRoutes: Array<RouteConfig> = [
  { path: "/404", component: () => import("@/views/404.vue") },
  { path: "*", redirect: "/404" },
];

// 根据内外网环境加载不同路由表
const routes: RouteConfig[] = isIntranet()
  ? baseRoutes.concat(intranetRoutes)
  : baseRoutes.concat(extranetRoutes);

const router = new Router({
  mode: "hash", // 推荐使用 history 便于埋点统计且地址栏路径较直观
  routes,
  // base: window.__MICRO_APP_BASE_ROUTE__ || '/',
});

router.beforeEach(async (to: Route, from: Route, next: NavigationGuardNext) => {
  document.documentElement.scrollTop = 0;
  const { path } = to;
  if (isIntranet()) {
    const needLoginPathList: Array<string> = [
      "/apiTestMainPage",
      "/apply",
      "/mySystem",
    ];

    if (needLoginPathList.includes(path)) {
      await UserModule.intranetCheckLogin();
    } else if (
      location.hash.indexOf("code=") > -1 &&
      location.hash.indexOf("state=") > -1
    ) {
      // } else if (location.hash.indexOf("ticket") > -1) {
      await UserModule.intranetCheckLogin();
    }
    const { routerBeforeEachNextParams } = UserModule;
    if (routerBeforeEachNextParams) {
      UserModule.SET_ROUTER_BEFORE_EACH_NEXT_PARAMS(null);
      next(routerBeforeEachNextParams);
    } else {
      next();
    }
  } else {
    const needLoginPathList: Array<string> = ["/apply", "/mySystem"];
    // 域名下线提示弹窗
    // MessageBoxImportantNotice();

    if (needLoginPathList.includes(path)) {
      await UserModule.extranetCheckLogin();
    } else {
      await apiExtranet.lcp.hrInfo
        .getUserInfo()
        .then(async () => {
          await UserModule.extranetCheckLogin();
        })
        .catch(({ data: { code = null, message = "" } }) => {
          if (code !== "999999") {
            throw new Error(`router beforeEach, ${message}`);
          }
        });
    }
    next();
  }
});

export default router;
