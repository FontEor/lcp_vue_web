<template>
  <div class="Questions-docs">
    <div class="docs-container">
      <h1 class="container-title">{{ title }}</h1>
      <div class="container-info">
        <div>更新时间：{{ updateTime }}</div>
        <div class="info-reading-num">阅读量：{{ views }}</div>
      </div>
      <div class="container-content">
        <MarkdownPreview
          v-if="content"
          v-model="content"
          class="markdown-preview"
        />
      </div>
      <div class="container-footer">
        <div class="footer-prev-and-next">
          <div v-if="previous" @click="handleRouterLink(previous)">
            <i class="el-icon-arrow-left"></i>
            <el-tooltip
              class="item"
              effect="dark"
              :content="previous.title"
              placement="top"
            >
              <span class="title">{{
                previous.title ? previous.title : ""
              }}</span>
            </el-tooltip>
          </div>
        </div>
        <div class="footer-prev-and-next">
          <div v-if="next" @click="handleRouterLink(next)">
            <el-tooltip
              class="item"
              effect="dark"
              :content="next.title"
              placement="top"
            >
              <span class="title">{{ next.title ? next.title : "" }}</span>
            </el-tooltip>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownPreview from "@/components/MarkdownPreview/index.vue";
import lcp from "@/api/extranet/lcp";

export default {
  name: "QuestionsDocs",
  components: { MarkdownPreview },
  data() {
    return {
      content: "",
      title: "",
      updateTime: "",
      views: "",
      previous: null,
      next: null,
    };
  },
  watch: {
    "$route.params.docCode": {
      handler() {
        this.content = "";
        this.queryDocContent();
        this.querySiblingsDoc();
      },
    },
  },
  created() {
    this.queryDocContent();
    this.querySiblingsDoc();
  },
  methods: {
    async queryDocContent() {
      const code = this.$route.params.docCode;
      const { data } = await this.problemDetail(code).catch((error) => {
        throw new Error("queryDocContent" + error);
      });
      this.title = data.title;
      this.updateTime = data.updateTime;
      this.views = data.views;
      this.content = data.content;
    },
    async problemDetail(code) {
      return await lcp.workOrder.problemDetail(code).catch((error) => {
        throw new Error("problemDetail" + error);
      });
    },
    async querySiblingsDoc() {
      const code = this.$route.params.docCode;
      const { data } = await this.problemNeighbor(code).catch((error) => {
        throw new Error("querySiblingsDoc" + error);
      });
      this.previous = data.previous;
      this.next = data.next;
    },
    async problemNeighbor(code) {
      return await lcp.workOrder.problemNeighbor(code).catch((error) => {
        throw new Error("problemNeighbor" + error);
      });
    },
    handleRouterLink(item) {
      this.$router.push({
        name: "QuestionDocsDetail",
        params: {
          workOrderTypeCode: item.workOrderTypeCode,
          docCode: item.code,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.Questions-docs {
  .docs-container {
    .container-title {
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      line-height: 48px;
    }
    .container-info {
      display: flex;
      justify-content: center;
      margin: 16px 0;
      .info-reading-num {
        margin-left: 16px;
      }
    }
    .container-footer {
      display: flex;
      justify-content: space-between;
      margin: 24px 0;
      .footer-prev-and-next {
        cursor: pointer;
        .title {
          display: inline-block;
          max-width: 200px;
          line-height: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .el-icon-arrow-left {
          position: relative;
          bottom: 1px;
          margin-right: 4px;
        }
        .el-icon-arrow-right {
          position: relative;
          bottom: 1px;
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
