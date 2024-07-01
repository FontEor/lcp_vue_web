<template>
  <div class="question-page">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="com-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'HelpDocument' }">{{
        $t("docSupport.Question.5ivmo76unk00")
      }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{
        $t("docSupport.Question.5ivmo76uo1s0")
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
          <div :id="qsChannel.value.toString()" style="display: none">
            <div class="list">
              <el-row v-for="qs in qsList" :key="qs.id" class="row-item">
                <el-col :span="20"
                  ><p class="te">
                    <a
                      href="javascript:void(0)"
                      @click="gotoQuestionDetail(qs.id)"
                      class="link"
                      >{{ qs.question }}</a
                    >
                  </p></el-col
                >
                <el-col :span="4" class="time">{{
                  qs.updateTime | parseTimefilter("{y}-{m}-{d}")
                }}</el-col>
              </el-row>
            </div>
            <div class="pagination">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="listQuery.pageSizes"
                :page-size="listQuery.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="listQuery.total"
              >
              </el-pagination>
            </div>
          </div>
          <div
            :id="qsChannel.value + 'noData'"
            class="com-no-data"
            style="display: none"
          >
            <img src="~@/assets/img/null-data-bg.png" />
            <p class="tip">{{ $t("docSupport.Question.5ivmo76uo600") }}</p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { parseTime } from "@/utils";
import isIntranet from "@/utils/isIntranet";

export default {
  name: "Question",
  data() {
    return {
      activeName: this.$route.params.channelId,
      qsChannelList: [],
      qsList: [],
      listQuery: {
        total: 0,
        pageNumb: 1,
        pageSize: 10,
        pageSizes: [10, 20, 40, 60],
      },
      isVisible: "",
      questionContent: "",
      netType: -1,
    };
  },
  filters: {
    parseTimefilter(obj, fomart) {
      return parseTime(obj, fomart);
    },
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
            this.findQuestionList(qsChannel);
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
      return new Promise((resolve, reject) => {
        const url = "question/getQuestionType";
        request({
          url: url,
          method: "get",
          params: { netType: this.netType },
        })
          .then((resp) => {
            this.qsChannelList = resp.data;
            resolve();
          })
          .catch((e) => {
            console.log(e);
          });
      });
    },
    //--获取问题列表
    findQuestionList(channel) {
      const url = "question/getQuestionReleaseList";
      request({
        url: url,
        method: "get",
        params: {
          type: channel.value,
          pageSize: this.listQuery.pageSize,
          pageNumb: this.listQuery.pageNumb,
        },
      })
        .then((resp) => {
          const channelId = channel.value.toString();
          const count = resp.data.total;
          if (count > 0) {
            document.getElementById(channelId).style.display = "";
            this.listQuery.total = resp.data.total;
            this.qsList = resp.data.list;
          } else {
            document.getElementById(channelId + "noData").style.display = "";
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //--频道切换
    handleClick(tab, event) {
      this.$router.push({ name: "Question", params: { channelId: tab.name } });
    },
    //--详情跳转
    gotoQuestionDetail(id) {
      this.$router.push({
        name: "Qs",
        params: {
          channelId: this.$route.params.channelId,
          questionId: id.toString(),
        },
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.fetchCurrentQuestionList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNumb = val;
      this.fetchCurrentQuestionList();
    },
    fetchCurrentQuestionList() {
      const url = "question/getQuestionReleaseList";
      request({
        url: url,
        method: "get",
        params: {
          type: this.$route.params.channelId,
          pageSize: this.listQuery.pageSize,
          pageNumb: this.listQuery.pageNumb,
        },
      })
        .then((resp) => {
          const channelId = channel.value.toString();
          const count = resp.data.total;
          if (count > 0) {
            document.getElementById(channelId).style.display = "";
            this.listQuery.total = resp.data.total;
            this.qsList = resp.data.list;
          } else {
            document.getElementById(channelId + "noData").style.display = "";
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    if (isIntranet()) {
      this.netType = `2`;
    } else {
      this.netType = `1`;
    }
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
