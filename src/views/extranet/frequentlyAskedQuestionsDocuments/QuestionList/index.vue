<template>
  <div class="question-list">
    <div v-if="!$route.params.docCode" class="list-container">
      <div class="container-item" v-for="item in questionList" :key="item.code">
        <div class="item-title">
          <h1 @click="handleClickTitle(item.code)">{{ item.title }}</h1>
          <div class="title-view">浏览量 {{ item.views }}</div>
        </div>
        <div class="item-content">
          {{ item.content }}
        </div>
      </div>
      <Pagination
        v-if="questionList && questionList.length > 0"
        :currentPage.sync="pageNumb"
        :pageSize.sync="pageSize"
        :total.sync="total"
        :reloadTableData="queryProblemList"
      />
    </div>
    <router-view v-else />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import lcp from "@/api/extranet/lcp";

export default {
  name: "QuestionList",
  components: { Pagination },
  data() {
    return { pageSize: 10, pageNumb: 1, total: 0, questionList: [] };
  },
  watch: {
    "$route.params.workOrderTypeCode": {
      handler() {
        this.queryProblemList();
      },
    },
  },
  created() {
    this.queryProblemList();
  },
  methods: {
    async problemRetrieval(workOrderTypeCode, params) {
      return await lcp.workOrder
        .problemRetrieval(workOrderTypeCode, params)
        .catch((error) => {
          throw new Error("problemRetrieval" + error);
        });
    },
    async queryProblemList() {
      const workOrderTypeCode = this.$route.params.workOrderTypeCode;
      const { pageSize, pageNumb } = this;
      const params = { pageSize, pageNumb };
      const response = await this.problemRetrieval(
        workOrderTypeCode,
        params
      ).catch((error) => {
        throw new Error("queryProblemList" + error);
      });
      const { data } = response;
      this.questionList = data.list;
      this.total = data.total;
    },
    handleClickTitle(code) {
      this.$router.push({
        name: "QuestionDocsDetail",
        params: {
          docCode: code,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.question-list {
  max-width: 66vw;
  margin-top: 24px;
  .list-container {
    .container-item {
      border-bottom: 1px solid rgb(230, 231, 235);

      .item-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 24px;
        h1 {
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          &:hover {
            color: #1966ff;
          }
        }
        .title-view {
          width: 172px;
          text-align: right;
          color: #999;
        }
      }
      .item-content {
        line-height: 20px;
        margin: 8px 0 28px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>