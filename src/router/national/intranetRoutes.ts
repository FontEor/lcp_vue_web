import Layout from "@/components/common/index.vue";
import LayoutFooter from "@/components/common/indexFooter.vue";
import BasicLayout from "@/components/common/basicLayout.vue";

const intranetRoutes = [
  // 公共路由
  {
    path: "/",
    component: Layout,
    redirect: "home",
    children: [
      // {
      //   path: '/upgrade*',
      //   name: "upgrade",
      //   component:() => import("@/views/upgrade/index.vue")
      // },
      // 首页
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/intranet/home/index.vue"),
      },
      // 文档-开发支持
      {
        path: "devSupport/:docId",
        name: "DevSupport",
        component: () => import("@/views/intranet/devSupport/index.vue"),
      },
      // 文档-常见问题
      {
        path: "question/:channelId",
        name: "Question",
        component: () => import("@/views/docSupport/Question.vue"),
      },
      // 文档-常见问题
      {
        path: "qs/:channelId/:questionId",
        name: "Qs",
        component: () => import("@/views/docSupport/Qs.vue"),
      },
      // 产品
      {
        path: "product",
        name: "Product",
        component: () => import("@/views/product/intranetIndex.vue"),
      },
      // 产品-详情
      {
        path: "productDetail/:productCode",
        name: "ProductDetail",
        component: () => import("@/views/product/intranetDetail.vue"),
      },
      // 解决方案-更多详情
      {
        path: "solveDetail/:productCode",
        name: "SolveDetail",
        component: () => import("@/views/solve/Detail.vue"),
      },
      // 全站搜素
      {
        path: "searchResult",
        name: "SearchResult",
        component: () => import("@/views/searchResult/index.vue"),
      },
      // 隐私协议
      {
        path: "protocol",
        name: "Protocol",
        component: () => import("@/views/protocol/index.vue"),
      },
      // 文档-新手指南
      {
        path: "/newHand/:docId",
        name: "NewHand",
        component: () => import("@/views/intranet/newHand/index.vue"),
      },
      // 热门产品文档
      {
        path: "/helpDocument",
        name: "HelpDocument",
        component: () => import("@/views/helpDocument/index.vue"),
      },
      // 文档-热门产品文档-查看详情-帮助文档-详情 文档-详情
      {
        path: "/docSoftwareSystem/:id/:docId",
        name: "DocSoftwareSystem",
        component: () => import("@/views/docDetail/SoftwareSystem.vue"),
      },
    ],
  },

  //文档中心
  {
    path: "/",
    component: BasicLayout,
    children: [
      // 开发指南文档
      {
        path: "/develop-guide/:productCode",
        name: "DevGuide",
        component: () => import("@/components/common/docMain/index.vue"),
        children: [
          {
            path: ":docId",
            name: "DevGuideDetail",
            component: () => import("@/views/docCenter/devGuide.vue"),
          },
        ],
      },
      //使用手册文档
      {
        path: "/manaul/:productCode",
        name: "Manaul",
        component: () => import("@/components/common/docMain/index.vue"),
        children: [
          {
            path: ":docId",
            name: "ManaulDetail",
            component: () => import("@/views/docCenter/manaul.vue"),
          },
        ],
      },
      //API文档
      {
        path: "/apidoc/:productCode",
        name: "ApiDoc",
        component: () => import("@/components/common/docMain/index.vue"),
        children: [
          {
            path: ":docId",
            name: "ApiDocDetail",
            component: () => import("@/views/docCenter/apiDoc.vue"),
          },
        ],
      },
      //扩展点文档
      {
        path: "/extensiondoc/:productCode",
        name: "ExtensionDoc",
        component: () => import("@/components/common/docMain/index.vue"),
        children: [
          {
            path: ":docId",
            name: "ExtensionDocDetail",
            component: () => import("@/views/docCenter/extensionDoc.vue"),
          },
        ],
      },
    ],
  },

  // 内网路由
  // 内网-选择团队
  {
    path: "/chooseSupplier",
    component: LayoutFooter,
    children: [
      {
        path: "",
        name: "ChooseSupplier",
        component: () => import("@/views/login/chooseSupplier/index.vue"),
      },
    ],
  },
  {
    path: "/intranet",
    component: Layout,
    children: [
      // 内网-文档-API使用指南
      {
        path: "/apiNewHand/:docId",
        name: "ApiNewHand",
        component: () => import("@/views/intranet/apiNewHand/index.vue"),
      },
      // 内网-联系我们
      {
        path: "/aboutUs",
        name: "AboutUs",
        component: () => import("@/views/aboutUs/index.vue"),
      },
      // 内网-API仓库
      {
        path: "/apiStore",
        name: "ApiStore",
        component: () => import("@/views/intranet/apiStore/index.vue"),
      },
      // 内网-API仓库-API详情
      {
        path: "/apiMethodList",
        name: "ApiMethodList",
        component: () => import("@/views/api/ApiMethodList.vue"),
      },
      {
        path: "/httpApiDetail",
        name: "HttpApiDetail",
        component: () =>
          import("@/views/intranet/apiStore/detail/httpTitle.vue"),
      },
      // 内网-api仓库-api详情-方法详情-api测试
      {
        path: "/apiTestMainPage",
        name: "ApiTestMainPage",
        component: () => import("@/views/api/apiTest/ApiTest.vue"),
      },
      // 内网-产品-申请使用
      {
        path: "/apply/:productCode",
        name: "Apply",
        component: () => import("@/views/mySystem/intranet/Apply.vue"),
      },
      // 内网-产品-申请成功
      {
        path: "/apply/result/:productCode",
        name: "Result",
        component: () => import("@/views/mySystem/intranet/Result.vue"),
      },
      // 内网-我的系统
      {
        path: "/mySystem",
        name: "MySystem",
        component: () => import("@/views/mySystem/intranet/Index.vue"),
      },
    ],
  },
];

export default intranetRoutes;
