<template>
  <div class="result-list">
    <ul class="list">
      <li class="list-item" v-for="(item, index) in items" :key="index">
        <router-link
          v-show="item.businessType === 'biz_unit'"
          tag="a"
          target="_blank"
          :to="'/quick?id=' + item.raw.id"
          class="link"
          v-html="renderItemAllTitle(item)"
        ></router-link>
        <!-- 外网 -->
        <router-link
          v-show="item.businessType === 'api'"
          tag="a"
          target="_blank"
          :to="
            '/open-business-document/api-doc/' +
              item.raw.unitId +
              '/' +
              item.raw.id
          "
          class="link"
          v-html="renderItemAllTitle(item)"
        ></router-link>
        <router-link
          v-show="item.businessType === 'api_inner'"
          tag="a"
          target="_blank"
          :to="'/apiMethodList?qualifiedName=' + item.raw.qualifiedName"
          class="link"
          v-html="renderItemAllTitle(item)"
        ></router-link>
        <router-link
          v-show="item.businessType === 'api_method_inner'"
          tag="a"
          target="_blank"
          :to="
            '/apiMethodList?qualifiedName=' +
              item.raw.qualifiedName +
              '&methodName=' +
              item.raw.name
          "
          class="link"
          v-html="renderItemAllTitle(item)"
        ></router-link>
        <router-link
          v-if="item.businessType === 'http_api_inner'"
          tag="a"
          target="_blank"
          :to="'/httpApiDetail?id=' + item.raw.id"
          class="link"
          v-html="renderItemAllTitle(item)"
        />
        <!-- 外网 -->
        <router-link
          v-show="item.businessType === 'worker_order_question'"
          tag="a"
          target="_blank"
          :to="'/question-docs/'+item.raw.workOrderTypeCode +'/' + item.raw.code"
          class="link"
          v-html="renderItemAllTitle(item)"
        ></router-link>
        <router-link
          v-show="item.businessType == 'doc' && item.raw.type == 1"
          tag="a"
          target="_blank"
          :to="'/devSupport/' + item.raw.id"
          class="link"
          v-html="renderItemAllTitle(item)"
        ></router-link>
        <router-link
          v-show="item.businessType == 'doc' && item.raw.type == 2"
          tag="a"
          target="_blank"
          :to="'/devSupport/' + item.raw.id"
          class="link"
          v-html="renderItemAllTitle(item)"
        ></router-link>
        <router-link
          v-show="item.businessType == 'doc' && item.raw.type == 3"
          tag="a"
          target="_blank"
          :to="
            '/open-business-document/access-guide/' +
              item.raw.objId +
              '/' +
              item.raw.id
          "
          class="link"
          v-html="renderItemAllTitle(item)"
        ></router-link>
        <router-link
          v-show="item.businessType == 'doc' && item.raw.type == 5"
          tag="a"
          target="_blank"
          :to="'/devSupport/' + item.raw.id"
          class="link"
          v-html="renderItemAllTitle(item)"
        ></router-link>
        <router-link
          v-show="item.businessType == 'doc' && item.raw.type == 6"
          tag="a"
          target="_blank"
          :to="'/devSupport/' + item.raw.id"
          class="link"
          v-html="renderItemAllTitle(item)"
        ></router-link>
        <router-link
          v-show="item.businessType == 'doc' && item.raw.type == 7"
          tag="a"
          target="_blank"
          :to="'/apiNewHand/' + item.raw.id"
          class="link"
          v-html="renderItemAllTitle(item)"
        ></router-link>
        <router-link
          v-show="item.businessType == 'question'"
          tag="a"
          target="_blank"
          :to="'/qs/' + item.raw.type + '/' + item.raw.id"
          class="link"
          v-html="renderItemAllTitle(item)"
        ></router-link>
        <!-- 产品文档 -->
        <router-link
          v-if="item.businessType === 'product'"
          tag="a"
          target="_blank"
          :to="'/docSoftwareSystem/' + item.raw.objId + '/' + item.raw.id"
          class="link"
          v-html="renderItemAllTitle(item)"
        ></router-link>
        <!-- 消息文档 -->
        <router-link
          v-show="item.businessType === 'message_doc'"
          tag="a"
          target="_blank"
          :to="
            '/open-business-document/message-doc/' +
              item.raw.unitId +
              '/' +
              item.raw.id
          "
          class="link"
          v-html="renderItemAllTitle(item)"
        ></router-link>
        <div class="item-cont" v-html="renderItemAllContent(item)"></div>
        <div class="item-source">
          <el-breadcrumb
            separator-class="el-icon-arrow-right"
            class="breadcrumb"
          >
            <span>来自：</span>
            <el-breadcrumb-item
              :to="{ path: handleFirstBreadcrumbPath(item) }"
              >{{ handleFirstBreadcrumbContent(item) }}</el-breadcrumb-item
            >
            <el-breadcrumb-item
              :to="{ path: handleSecondBreadcrumbPath(item) }"
              v-if="handleSecondBreadcrumbVisible(item)"
              >{{ handleSecondBreadcrumbContent(item) }}</el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>
      </li>
    </ul>
    <div class="list-pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="resultCurrentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultList",
  props: {
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
    handleCurrentChange: {
      type: Function,
      default: () => [],
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 20,
    },
    total: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      secondbreadcrumbVisible: false,
    };
  },
  computed: {
    resultCurrentPage: {
      get() {
        return this.currentPage;
      },
      set(values) {
        return values;
      },
    },
  },
  methods: {
    renderItemAllTitle(item) {
      if (item.highlight && item.highlight.title) {
        return  item.highlight.title.join('');
      }
      return item.title;
    },
    renderItemAllContent(item) {
      if (item.highlight && item.highlight.content) {
        const contentList = [...item.highlight.content, ...item.highlight.content]
        return item.highlight.content.map(contentItem => `${contentItem}...`).join('');
      }
      return item.content;
    },
    handleSecondBreadcrumbVisible(item) {
      if (item.type === 1) {
        return false;
      } else if (item.type === 2) {
        if (item.scope === 1) {
          return item.raw.businessName ? true : false;
        } else {
          return false;
        }
      } else if (item.type == 3) {
        return true;
      } else if (item.type == 4) {
        return false;
      } else if (+item.type === 5) {
        if (item.scope === 1) {
          return item.raw.businessName ? true : false;
        } else {
          return false;
        }
      }
    },
    handleFirstBreadcrumbContent(item) {
      if (item.type === 1) {
        return "对接方案";
      } else if (item.type === 2) {
        if (item.scope === 1) {
          return item.raw.businessName || "接口文档";
        } else {
          return "API文档";
        }
      } else if (item.type == 3) {
        if (item.raw.type !== 3) {
          return "文档";
        } else if (item.raw.type === 3 && item.raw.businessName) {
          return item.raw.businessName;
        }
      } else if (item.type == 4) {
        return "产品文档";
      } else if (item.type === 5) {
        if (item.scope === 1) {
          return item.raw.businessName || "消息文档";
        }
      }
    },
    handleSecondBreadcrumbContent(item) {
      const hashMap = {
        1: "新手指南",
        2: "开发支持",
        3: "开放业务接入指南",
        5: "新手指南",
        6: "开发支持",
        7: "API使用指南",
      };
      if (item.type === 2) {
        if (item.scope === 1) {
          return item.raw.businessName ? "接口文档" : "";
        }
      } else if (item.businessType === "doc") {
        return hashMap[item.raw.type];
      } else if (item.businessType === "question" || item.businessType === "worker_order_question") {
        return "常见问题";
      }else if (+item.type === 5) {
        if (item.scope === 1) {
          return item.raw.businessName ? "消息文档" : "";
        }
      }
    },
    handleFirstBreadcrumbPath(item) {
      if (item.type === 1) {
        return "/competence-center";
      } else if (item.type === 2) {
        // 外网
        if (item.scope === 1) {
          return item.raw.businessName
            ? "/quick?id=" + item.raw.unitId
            : "/open-business-document/api-doc/" +
                item.raw.unitId +
                "/" +
                item.raw.id;
        } else {
          return "/apiStore";
        }
      } else if (item.type == 3) {
        if (item.raw.type !== 3) {
          return "/helpDocument";
        } else if (item.raw.type === 3 && item.raw.businessName) {
          return "/quick?id=" + item.raw.objId;
        }
      } else if (item.type == 4) {
        return "/helpDocument";
      } else if (+item.type === 5) {
        if (+item.scope === 1) {
          // 外网
          return item.raw.businessName
            ? "/quick?id=" + item.raw.unitId
            : "/open-business-document/message-doc/" +
                item.raw.unitId +
                "/" +
                item.raw.id;
        }
      }
    },
    handleSecondBreadcrumbPath(item) {
      const hashMap = {
        1: "/devSupport/" + item.raw.id,
        2: "/devSupport/" + item.raw.id,
        3:
          "/open-business-document/access-guide/" +
          item.raw.objId +
          "/" +
          item.raw.id,
        5: "/devSupport/" + item.raw.id,
        6: "/devSupport/" + item.raw.id,
        7: "/apiNewHand/" + item.raw.id,
      };
      if (item.type === 2) {
        if (item.scope === 1) {
          return item.raw.businessName
            ? "/open-business-document/api-doc/" +
                item.raw.unitId +
                "/" +
                item.raw.id
            : "";
        }
      } else if (item.businessType === "doc") {
        return hashMap[item.raw.type];
      } else if (item.businessType === "question") {
        return "/qs/" + item.raw.type + "/" + item.raw.id;
      } else if (+item.type === 5) {
        if (item.scope === 1) {
          return item.raw.businessName
            ? "/open-business-document/message-doc/" +
                item.raw.unitId +
                "/" +
                item.raw.id
            : "";
        }
      }else if(item.businessType === "worker_order_question"){
        return "/question-docs/" +item.raw.workOrderTypeCode+  "/" + item.raw.code;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.result-list {
  .list-item {
    padding: 20px 0;
    border-bottom: 1px solid #e4e9f0;
    .link {
      font-size: 16px;
      color: #3c6ef0;
    }
    .item-cont {
      margin-top: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    ::v-deep .item-source {
      margin-top: 10px;
      color: #999;
      .breadcrumb {
        display: inline;
        .el-breadcrumb__inner .el-breadcrumb__item:last-child,
        .el-breadcrumb__inner.is-link,
        .el-breadcrumb__inner a,
        .el-breadcrumb__item:last-child .el-breadcrumb__inner,
        .el-breadcrumb__item:last-child .el-breadcrumb__inner a {
          color: #999;
        }
        .el-breadcrumb__item {
          float: none;
        }
        .el-breadcrumb__inner.is-link,
        .el-breadcrumb__inner a,
        .el-breadcrumb__item:last-child .el-breadcrumb__inner a {
          cursor: pointer;
        }
        .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
        .el-breadcrumb__inner.is-link,
        .el-breadcrumb__inner a {
          &:hover {
            color: #3c6ef0;
          }
        }
      }
    }
  }
  .list-pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>