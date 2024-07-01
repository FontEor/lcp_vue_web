import Vue from "vue";
import Router, { RouteConfig } from "vue-router";
import Layout from "@/components/download/Layout.vue";

Vue.use(Router);

// 根据内外网环境加载不同路由表
const routes: RouteConfig[] = [
  {
    path: "/",
    redirect: "/access-guide",
    component: Layout,
    children: [
      {
        path: "access-guide",
        name: "AccessGuide",
        component: () => import("@/views/download/accessGuide.vue"),
      },
      {
        path: "api-doc",
        name: "ApiDoc",
        component: () => import("@/views/download/apiDoc.vue"),
      },
      {
        path: "message-doc",
        name: "MessageDoc",
        component: () => import("@/views/download/messageDoc.vue"),
      },
    ],
  },
];

const router = new Router({
  mode: "hash", // 推荐使用 history 便于埋点统计且地址栏路径较直观
  routes,
});

export default router;
