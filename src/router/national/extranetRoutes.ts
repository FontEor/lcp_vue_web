import OldLayout from "@/components/extranet/OldLayout/index.vue";
import DocLayout from "@/views/extranet/openBusinessDocuments/components/docLayout.vue";

const extranetRoutes = [
  // 公共路由
  {
    path: "/",
    component: OldLayout,
    redirect: "home",
    children: [
      // 开放业务-接口列表
      {
        path: "quick",
        name: "Quick",
        component: () => import("@/views/extranet/quick/index.vue"),
      },
      // 开放业务 开发者-开放业务
      {
        path: "openBusiness",
        name: "OpenBusiness",
        component: () => import("@/views/openBusiness/index.vue"),
      },
      // 文档-开发支持
      {
        path: "devSupport/:docId",
        name: "DevSupport",
        component: () => import("@/views/extranet/devSupport/index.vue"),
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
      // 文档-常见问题（新）
      {
        path: "question-docs",
        name: "QuestionDocs",
        component: () =>
          import(
            "@/views/extranet/frequentlyAskedQuestionsDocuments/index.vue"
          ),
        children: [
          {
            path: ":workOrderTypeCode",
            name: "QuestionDocsList",
            component: () =>
              import(
                "@/views/extranet/frequentlyAskedQuestionsDocuments/QuestionList/index.vue"
              ),
            children: [
              {
                path: ":docCode",
                name: "QuestionDocsDetail",
                component: () =>
                  import(
                    "@/views/extranet/frequentlyAskedQuestionsDocuments/QuestionDocs/index.vue"
                  ),
              },
            ],
          },
        ],
      },
      // 产品
      {
        path: "product",
        name: "Product",
        component: () => import("@/views/product/extranetIndex.vue"),
      },
      // 产品-详情
      {
        path: "productDetail/:productCode",
        name: "ProductDetail",
        component: () => import("@/views/product/extranetDetail.vue"),
      },
      // 全站搜素
      {
        path: "searchResult",
        name: "SearchResult",
        component: () => import("@/views/searchResult/index.vue"),
      },

      // 文档-新手指南
      {
        path: "/newHand/:docId",
        name: "NewHand",
        component: () => import("@/views/extranet/newHand/index.vue"),
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
  // 外网路由
  {
    path: "/extranet",
    component: OldLayout,
    redirect: "home",
    children: [
      // 外网-产品-WMS-申请使用
      {
        path: "/apply",
        name: "Apply",
        component: () => import("@/views/mySystem/Apply.vue"),
      },
      // 外网-产品-WMS-申请成功
      // 需要重构
      {
        path: "/apply/result",
        name: "Result",
        component: () => import("@/views/mySystem/Result.vue"),
      },
      // 外网-我的系统
      {
        path: "/mySystem",
        name: "MySystem",
        component: () => import("@/views/mySystem/index.vue"),
      },
    ],
  },
  //开放业务文档中心
  {
    path: "/open-business-document",
    component: DocLayout,
    redirect: "home",
    children: [
      // 接入指南文档
      {
        path: "access-guide/:unitId",
        name: "AccessGuide",
        component: () =>
          import(
            "@/views/extranet/openBusinessDocuments/components/docMain.vue"
          ),
        children: [
          {
            path: ":docId",
            name: "AccessGuideDetail",
            component: () =>
              import(
                "@/views/extranet/openBusinessDocuments/docContent/accessGuideDoc.vue"
              ),
          },
        ],
      },
      // API文档
      {
        path: "api-doc/:unitId",
        name: "ApiDoc",
        component: () =>
          import(
            "@/views/extranet/openBusinessDocuments/components/docMain.vue"
          ),
        children: [
          {
            path: ":docId",
            name: "ApiDocDetail",
            component: () =>
              import(
                "@/views/extranet/openBusinessDocuments/docContent/apiDoc.vue"
              ),
          },
        ],
      },
      // 消息文档
      {
        path: "message-doc/:unitId",
        name: "MessageDoc",
        component: () =>
          import(
            "@/views/extranet/openBusinessDocuments/components/docMain.vue"
          ),
        children: [
          {
            path: ":docId",
            name: "MessageDocDetail",
            component: () =>
              import(
                "@/views/extranet/openBusinessDocuments/docContent/messageDoc.vue"
              ),
          },
        ],
      },
      // SDK
      {
        path: "sdk-doc/:unitId",
        name: "SdkDoc",
        component: () =>
          import(
            "@/views/extranet/openBusinessDocuments/docContent/sdkDoc.vue"
          ),
      },
      // 常用开发工具
      {
        path: "common-development-tools/:unitId",
        name: "CommonDevelopmentTools",
        component: () =>
          import(
            "@/views/extranet/openBusinessDocuments/components/docMain.vue"
          ),
        children: [
          {
            path: ":toolName",
            name: "CommonDevelopmentToolsDetail",
            component: () =>
              import(
                "@/views/extranet/openBusinessDocuments/docContent/commonDevelopmentTools/index.vue"
              ),
          },
        ],
      },
    ],
  },
  //审批预览对接方案发布内容
  {
    path: "/preview-docking-plan",
    component: DocLayout,
    redirect: "home",
    children: [
      // 接入指南文档
      {
        path: "access-guide/:unitId",
        name: "AccessGuidePreview",
        component: () =>
          import(
            "@/views/extranet/openBusinessDocuments/components/docMain.vue"
          ),
        children: [
          {
            path: ":docId",
            name: "AccessGuideDetailPreview",
            component: () =>
              import(
                "@/views/extranet/openBusinessDocuments/docContent/accessGuideDoc.vue"
              ),
          },
        ],
      },
      // API文档
      {
        path: "api-doc/:unitId",
        name: "ApiDocPreview",
        component: () =>
          import(
            "@/views/extranet/openBusinessDocuments/components/docMain.vue"
          ),
        children: [
          {
            path: ":docId",
            name: "ApiDocDetailPreview",
            component: () =>
              import(
                "@/views/extranet/openBusinessDocuments/docContent/apiDoc.vue"
              ),
          },
        ],
      },
      // 消息文档
      {
        path: "message-doc/:unitId",
        name: "MessageDocPreview",
        component: () =>
          import(
            "@/views/extranet/openBusinessDocuments/components/docMain.vue"
          ),
        children: [
          {
            path: ":docId",
            name: "MessageDocDetailPreview",
            component: () =>
              import(
                "@/views/extranet/openBusinessDocuments/docContent/messageDoc.vue"
              ),
          },
        ],
      },
    ],
  },

  // 外网重塑新页面
  // 首页-ISV对接
  {
    path: "/isv-introduction",
    name: "IsvIntroduction",
    component: () => import("@/views/extranet/isvIntroduction/index.vue"),
  },
  // 首页-商家对接
  {
    path: "/merchant-introduction",
    name: "MerchantIntroduction",
    component: () => import("@/views/extranet/merchantIntroduction/index.vue"),
  },
  // 首页-能力中心
  {
    path: "/competence-center",
    name: "CompetenceCenter",
    component: () => import("@/views/extranet/competenceCenter/index.vue"),
  },
  // 首页-酒水行业解决方案
  {
    path: "/solution/wine-warehouse",
    name: "WineWarehouse",
    component: () =>
      import("@/views/extranet/solution/wineWarehouse/index.vue"),
  },
  // 食品仓配一体解决方案
  {
    path: "/solution/food-warehouse",
    name: "FoodWarehouse",
    component: () =>
      import("@/views/extranet/solution/foodWarehouse/index.vue"),
  },
  // 美妆仓配一体解决方案
  {
    path: "/solution/makeup-warehouse",
    name: "MakeupWarehouse",
    component: () =>
      import("@/views/extranet/solution/makeupWarehouse/index.vue"),
  },
  // 母婴仓配一体解决方案
  {
    path: "/solution/maternalAndInfant-warehouse",
    name: "MaternalAndInfantWarehouse",
    component: () =>
      import("@/views/extranet/solution/maternalAndInfantWarehouse/index.vue"),
  },
  // 服饰仓配一体解决方案
  {
    path: "/solution/clothing-warehouse",
    name: "ClothingWarehouse",
    component: () =>
      import("@/views/extranet/solution/clothingWarehouse/index.vue"),
  },
  // 3C仓配一体解决方案
  {
    path: "/solution/3C-warehouse",
    name: "3CWarehouse",
    component: () => import("@/views/extranet/solution/3CWarehouse/index.vue"),
  },
  // 医院便民快递解决方案
  {
    path: "/solution/hospital-convenience-express",
    name: "HospitalConvenienceExpress",
    component: () =>
      import("@/views/extranet/solution/hospitalConvenienceExpress/index.vue"),
  },
  // 新首页
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/extranet/home/index.vue"),
  },
  {
    path: "/partner",
    name: "Partner",
    component: () => import("@/views/extranet/partner/index.vue"),
  },
];
export default extranetRoutes;
