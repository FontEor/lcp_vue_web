<template>
  <div class="question-page">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="com-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'HelpDocument' }">{{
        $t("docSupport.Qs.5ivmvc6pqnk0")
      }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{
        $t("docSupport.Qs.5ivmvc6pr540")
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="cont-view" v-if="findActiveChannelModel">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="(qsChannel, idx) in qsChannelList"
          :key="idx"
          :name="qsChannel.value.toString()"
          :label="qsChannel.name"
        >
          <MarkdownPreview
            v-if="activeName === qsChannel.value.toString() && questionContent"
            v-model="questionContent"
            class="markdown-preview"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import MarkdownPreview from "@/components/MarkdownPreview/index.vue";
import isIntranet from "@/utils/isIntranet";

export default {
  name: "Qs",
  components: { MarkdownPreview },
  data() {
    return {
      activeName: this.$route.params.channelId,
      questionId: this.$route.params.questionId,
      qsChannelList: [],
      questionContent: "",
      type: -1,
    };
  },
  computed: {
    //--查询激活频道名称
    findActiveChannelModel() {
      const list = this.qsChannelList;
      const channelId = this.$route.params.channelId;
      if (channelId) {
        for (let i = 0; i < list.length; i++) {
          const qsChannel = list[i];
          if (channelId === qsChannel.value.toString()) {
            return qsChannel.value.toString();
          }
        }
      }
      return null;
    },
  },
  methods: {
    //--组织频道列表
    fetchQsChannelList() {
      const url = "question/getQuestionType";
      request({
        url: url,
        method: "get",
        params: { netType: this.type },
      })
        .then((resp) => {
          this.qsChannelList = resp.data;
          this.findQuestion();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    //--查找问题内容
    findQuestion() {
      const url = "question/getQuestionRelease";
      request({
        url: url,
        method: "get",
        params: { id: this.$route.params.questionId },
      })
        .then((resp) => {
          console.log(resp.data);
          this.questionContent =
            "### " + resp.data.question + "\n\n" + resp.data.solution;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    //--频道切换
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.$router.push({ name: "Question", params: { channelId: tab.name } });
    },
  },
  created() {
    this.type = isIntranet() ? 2 : 1;
    this.fetchQsChannelList();
  },
};
</script>

<style lang="scss" scoped>
.question-page {
  width: 98vw;
  margin: 0 auto 20px;
}

.cont-view {
  background: #fff;
  padding: 20px 150px;
  min-height: 600px;
  .markdown-preview {
    padding: 0 20px;
  }

  .row-item {
    height: 47px;
    line-height: 46px;
    border-bottom: 1px solid #e4e9f0;

    .time {
      color: #999;
      text-align: right;
    }
  }

  .pagination {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
