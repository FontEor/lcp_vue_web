<template>
  <el-container class="access-guide">
    <el-aside class="access-guide__aside">
      <AsideMenu :defaultActive="defaultActive" :submenuList="submenuList" />
    </el-aside>
    <el-container>
      <el-main class="access-guide__main">
        <MarkdownPreview
          v-if="markdown"
          class="markdown-preview"
          v-model="markdown"
        />
        <Footer />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AsideMenu from "@/views/download/components/AsideMenu/index.vue";
import MarkdownPreview from "@/components/MarkdownPreview/index.vue";
import Footer from "@/components/download/Footer.vue";

export default {
  name: "AccessGuide",
  components: { AsideMenu, MarkdownPreview, Footer },
  data() {
    return {
      defaultActive: "157/100",
      submenuList: [
        {
          subtitle: "业务介绍",
          subindex: "157",
          menuItemList: [
            { menuItemTitle: "业务说明", menuItemIndex: "157/100" },
            { menuItemTitle: "自研商家对接手册", menuItemIndex: "157/101" },
            {
              menuItemTitle: "自研商家对接手册1",
              menuItemIndex: "157/102",
              children: [
                {
                  menuItemTitle: "自研商家对接手册1-1",
                  menuItemIndex: "157/102/1",
                },
                {
                  menuItemTitle: "自研商家对接手册1-2",
                  menuItemIndex: "157/102/2",
                  children: [
                    {
                      menuItemTitle: "自研商家对接手册1-2-1",
                      menuItemIndex: "157/102/2/1",
                    },
                    {
                      menuItemTitle: "自研商家对接手册1-2-1",
                      menuItemIndex: "157/102/2/2",
                      children: [
                        {
                          menuItemTitle: "自研商家对接手册1-2-1-1",
                          menuItemIndex: "157/102/2/2/1",
                        },
                        {
                          menuItemTitle: "自研商家对接手册1-2-1-2",
                          menuItemIndex: "157/102/2/2/2",
                          children: [
                            {
                              menuItemTitle: "自研商家对接手册1-2-1-2-1",
                              menuItemIndex: "157/102/2/2/1/1",
                            },
                            {
                              menuItemTitle: "自研商家对接手册1-2-1-2-2",
                              menuItemIndex: "157/102/2/2/1/2",
                              children: [
                                {
                                  menuItemTitle: "自研商家对接手册1-2-1-2-2-1",
                                  menuItemIndex: "157/102/2/2/1/1/1",
                                },
                                {
                                  menuItemTitle: "自研商家对接手册1-2-1-2-2-2",
                                  menuItemIndex: "157/102/2/2/1/1/2",
                                  children: [
                                    {
                                      menuItemTitle:
                                        "自研商家对接手册1-2-1-2-2-2-1",
                                      menuItemIndex: "157/102/2/2/1/1/2/1",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          subtitle: "接入指南",
          subindex: "158",
          menuItemList: [
            { menuItemTitle: "接入指南", menuItemIndex: "158/100" },
          ],
        },
      ],
      markdown: `### 一 、前言：\n随着电子商务平台和物流服务信息化飞速发展，面单号(或称之为运单号)成为物流服务商串联快递单、订单、商家、商品等各种信息的枢纽。相比之下，传统纸质面单价格高、信息录入效率低、信息安全隐患等方面的劣势已愈发凸显，电子面单作为多种信息的载体则逐渐成为行业主流。\n京东物流云打印产品为通用打单工具，提供电商全流程打印（如面单/拣货单/发货单等）所需的解决方案,支持各来源的订单、运单的打印；目前支持京东快递标准模板、其它承运商的标准模板以及商家所需的自定义模板；涵盖了从模板设计、打印内容渲染、多端打印的整个流程，支持自研商家、ISV、KA商家等各类商家接入使用。\n### 二、京东物流云打印产品简介：\n下图为从商家下单到打印面单各组件交互全流程：\n![新建 Microsoft Visio 绘图 10.jpg](http://img30.360buyimg.com/document/jfs/t1/143370/2/23710/96004/61bc7e65E570a74d4/a0b08b29f3608cda.jpg)\n#### 1、京东物流云打印编辑器\n京东物流云打印编辑器为一套Web系统，其提供了可视化、所见即所得的模板设计界面，设计者可以通过此系统完成模板的创建、修改和分类管理，上手简单和友好。\n点击[京东物流云打印编辑器](https://cloud.jdl.com/#/open-business-document/access-guide/157/53976)查看使用手册。\n#### 2、京东物流云打印API列表\n|接口|接口名称|接口描述|\n|-|-|-|\n|[获取打印模板列表](https://cloud.jdl.com/#/open-business-document/api-doc/157/194) |获取打印模板列表|获取打印模板列表|\n|[获取打印数据](https://cloud.jdl.com/#/open-business-document/api-doc/157/191)|获取打印数据|获取京配打印数据|\n\n#### 3、京东物流云打印插件\n京东物流云打印插件是面向Windows平台的一个打印客户端程序，可接收ISV软件发送的打印请求，根据模板地址下载模板，结合请求中的打印数据完成打印内容的渲染，并将请求写入打印机完成打印。\n对于ISV软件商接入，需要使用云打印组件交互协议，该协议采用websocket或wss协议，语言和环境无关性，请求地址：ws://127.0.0.1:9113\n点击查看[京东物流云打印插件安装指南](https://cloud.jdl.com/#/open-business-document/access-guide/157/53982)\n\n### 三、商家对接流程\n自研商家对接手册：[点击查看对接手册](https://cloud.jdl.com/#/open-business-document/access-guide/157/53973)\nISV对接手册：[点击查看对接手册](https://cloud.jdl.com/#/open-business-document/access-guide/157/53974)\n不使用云打印组件打印京东快递面单：[查看文档](https://cloud.jdl.com/#/docSoftwareSystem/8/53986)\n\n**对接成功后，运维问题请咨询云打印官方微信号：**\n![企业咚咚20220209101307.jpg](http://img30.360buyimg.com/document/jfs/t1/104817/10/22436/127354/62032672E14ae04b2/c7ac8c2d6f1155f2.jpg)\n`,
    };
  },
};
</script>

<style lang="scss" scoped>
.access-guide {
  .access-guide__aside {
    max-height: calc(100vh - 120px);
  }

  .access-guide__main {
    padding: 0;

    .markdown-preview {
      z-index: -1;
      min-height: calc(100vh - 200px);
    }
  }
}
</style>