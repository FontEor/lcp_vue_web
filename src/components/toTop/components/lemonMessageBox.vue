<template>
  <div>
    <div v-if="messageData.isShowHistoryLog == 0">
      <el-divider content-position="center">没有更多历史消息了</el-divider>
    </div>
    <div
      v-if="messageData.isShowHistoryLog == 1"
      class="robot_im_container_header_robot"
    >
      <div class="robot_im_container_header_name">
        <p
          >物流开放平台智能助手
          {{ this.$attrs.message.sendTime | formatTime }}</p
        >
      </div>
      <!-- 答案标题以及头像 -->
      <div v-if="messageData.title" class="robot_im_container_header_title">
        <img
          class="robot_im_container_header_title_img"
          src="@/assets/img/robot.png"
          alt="标题头像"
        />
        <div style="position: relative">
          <span class="robot_im_container_header_title_span">{{
            this.messageData.title
          }}</span>
          <div
            v-if="messageData.total > 5"
            class="robot_im_container_header_title_refresh"
            @click="handleRefresh($attrs.message.id)"
            ><i class="el-icon-refresh"></i>换一换</div
          >
          <div class="robot_im_container_header_title_div"></div>
        </div>
      </div>
      <!--答案主题 -->
      <div class="robot_im_container_header_contain">
        <!-- 进入界面的问候语 -->
        <div v-if="messageData.isGreet">
          <div class="robot_im_container_header_contain_div"
            >1. 咨询智能助手获取自动回复</div
          >
          <div class="robot_im_container_header_contain_div">
            2. 提报<a
              style="color: rgba(60, 110, 240, 1)"
              type="primary"
              target="_blank"
              href="https://cloud.jdl.com/admin/#/upgrade/work-order/new"
              >工单</a
            >获取人工支持
          </div>
          <div class="robot_im_container_header_contain_div">
            3. 全局<a
              style="color: rgba(60, 110, 240, 1)"
              type="primary"
              target="_blank"
              href="https://cloud.jdl.com/#/searchResult?q="
              >搜索文档</a
            >
          </div>
        </div>
        <!-- 实际回答的内容部分 -->
        <div v-else>
          <!-- 用于展示答案列表>1的情况 -->
          <div v-if="messageData.total > 1">
            <div
              class="robot_im_container_header_contain_div answer_list"
              v-for="(item, index) in messageData.answerList"
              :key="index"
              @click="handleAnswerListItem(item)"
            >
              <div class="answer_list_item">
                {{ item.title }}
              </div>
              <div style="width: 14px">
                <span class="robot_im_container_header_contain_div_span">
                  <i class="el-icon-arrow-right"></i>
                </span>
              </div>
            </div>
          </div>

          <!--这部分使用markdown展示答案列表 == 1的情况  -->
          <div
            v-else-if="messageData.total == 1"
            class="robot_im_container_header_contain_contentText"
          >
            <MarkdownPreview
              v-if="messageData.answerList.length"
              v-model="messageData.answerList[0]"
            />
          </div>

          <!-- 这部分用于展示答案列表 == 0的情况 -->
          <div v-else class="robot_im_container_header_contain_contentText"
            >{{ defaultCopy }}
          </div>

          <!-- 点赞和点踩部分 -->
          <div class="robot_im_container_header_contain_footer">
            <span class="robot_im_container_header_contain_span"
              >您也可通过<a
                style="color: rgba(60, 110, 240, 1)"
                type="primary"
                target="_blank"
                href="https://cloud.jdl.com/admin/#/upgrade/work-order/new"
                >工单</a
              >获取人工支持，或通过全局<a
                style="color: rgba(60, 110, 240, 1)"
                type="primary"
                target="_blank"
                href="https://cloud.jdl.com/#/searchResult?q="
                >搜索文档</a
              ></span
            >
            <div
              v-if="messageData.answerList?.length >= 1"
              style="display: inline"
              :class="{ pointer_event_active: isActive }"
            >
              <span
                class="robot_im_container_header_contain_spanContent"
                @click="handleUnLike"
              >
                <img
                  v-if="!isUnLikeRed"
                  class="robot_im_container_header_contain_img"
                  src="@/assets/img/unlike.png"
                  alt="点踩"
                />
                <img
                  v-else
                  class="robot_im_container_header_contain_img"
                  src="@/assets/img/unlikered.png"
                  alt="点踩"
                />
              </span>
              <span
                class="robot_im_container_header_contain_spanContent"
                @click="handleLike"
              >
                <img
                  v-if="!isLikeRed"
                  class="robot_im_container_header_contain_img"
                  src="@/assets/img/like.png"
                  alt="点赞"
                />
                <img
                  v-else
                  class="robot_im_container_header_contain_img"
                  src="@/assets/img/likered.png"
                  alt="点赞"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="messageData.isShowHistoryLog == 2" class="history_log_button">
      <div class="history_log_button_div" @click="handleCheckHistoryLog">
        <span> 查看历史记录 </span>
        <img
          class="history_log_button_div_img"
          src="@/assets/img/upTop.png"
          alt=""
        />
      </div>
    </div>

    <el-dialog
      title="您认为本条回答的问题是："
      :visible.sync="dialogFormVisible"
      center
      width="90%"
      :modal="modal"
      :close="handleClickClose"
    >
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item label="" prop="remarkReason">
          <el-radio-group
            v-if="messageData.answerList?.length == 1"
            v-model="form.remarkReason"
          >
            <el-radio :label="1">答非所问</el-radio>
            <el-radio :label="2">回答不详细</el-radio>
          </el-radio-group>
          <el-radio-group v-else v-model="form.remarkReason">
            <el-radio :label="3">没有找到我想问的问题</el-radio>
            <el-radio :label="4">问题列表中我问的问题不够靠前</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="">
          <el-input
            type="textarea"
            placeholder="请留下您的宝贵意见或建议"
            v-model="form.remarkDetail"
            maxlength="150"
            show-word-limit
            :autosize="autosize"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: right">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { EventBus } from "@/utils/bus.js";
import MarkdownPreview from "./Markdown.vue";
export default {
  //组件的name必须以lemonMessage开头，后面跟上 Message.type
  name: "lemonMessageBox",
  components: {
    MarkdownPreview,
  },
  inheritAttrs: false,
  //如果需要使用父组件的方法，可以使用注入。
  inject: {
    IMUI: {
      from: "IMUI",
      default() {
        return this;
      },
    },
  },
  filters: {
    formatTime: function (timestamp) {
      var date = new Date(timestamp); // 通过时间戳创建 Date 对象
      var year = date.getFullYear(); // 获取年份
      var month = ("0" + (date.getMonth() + 1)).slice(-2); // 获取月份，补零
      var day = ("0" + date.getDate()).slice(-2); // 获取日期，补零
      var hour = ("0" + date.getHours()).slice(-2); // 获取小时，补零
      var minute = ("0" + date.getMinutes()).slice(-2); // 获取分钟，补零
      var second = ("0" + date.getSeconds()).slice(-2); // 获取秒数，补零
      var formattedTime =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
      return formattedTime;
    },
  },
  props: {},
  data() {
    return {
      itemList: [
        { key: 1, contain: "1. 咨询智能助手获取自动回复", url: "" },
        {
          key: 1,
          contain: "2. 提报工单获取人工支持",
          url: "https://cloud.jdl.com/admin/#/upgrade/work-order/new",
        },
        {
          key: 1,
          contain: "3. 全局搜索文档",
          url: "https://cloud.jdl.com/#/searchResult?q=",
        },
      ],
      defaultCopy:
        "很抱歉，您咨询的问题智能助手未收录，您可以尝试更换关键词或通过下方工单获取支持",
      messageData: {},
      dialogFormVisible: false,
      rules: {
        remarkReason: [
          { required: true, message: "请选择问题原因", trigger: "blur" },
        ],
      },
      form: {
        remarkReason: "",
        remarkDetail: "",
      },
      isLikeRed: false,
      isUnLikeRed: false,
      modal: false,
      isActive: false,
      autosize: {
        minRows: 2,
      },
    };
  },
  computed: {},
  mounted() {
    this.messageData = this.$attrs.message.data;
    if (this.messageData.remarkStatus == 1) {
      this.isLikeRed = true;
      this.isActive = false;
      this.isUnLikeRed = false;
    } else if (this.messageData.remarkStatus == 2) {
      this.isLikeRed = false;
      this.isActive = true;
      this.isUnLikeRed = true;
    } else {
      this.isLikeRed = false;
      this.isActive = false;
      this.isUnLikeRed = false;
    }
  },
  watch: {
    $attrs() {
      this.messageData = this.$attrs.message.data;
    },
  },
  destroyed() {
    EventBus.$off();
  },
  methods: {
    handleClickClose() {
      this.form = {
        remarkReason: "",
        remarkDetail: "",
      };
    },
    handleRefresh(id) {
      EventBus.$emit("handleRefresh", id);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          EventBus.$emit("handleUnLike", this.form, this.$attrs.message.bizId);
          this.isActive = true;
          this.isUnLikeRed = !this.isUnLikeRed;
          if (this.isUnLikeRed) {
            this.isLikeRed = false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleLike() {
      this.isActive = false;
      this.isLikeRed = !this.isLikeRed;
      if (this.isLikeRed) {
        this.isUnLikeRed = false;
      }
      EventBus.$emit("handleLike", this.$attrs.message.bizId, this.isLikeRed);
    },
    handleUnLike() {
      this.dialogFormVisible = true;
    },
    handleCheckHistoryLog() {
      EventBus.$emit("handleCheckHistoryLog");
    },
    handleAnswerListItem(item) {
      EventBus.$emit("handleAnswerListItem", item);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/lemonMessageBox.scss";
::v-deep .el-divider__text {
  background-color: rgba(244, 245, 247, 1);
  color: rgba(134, 141, 159, 1);
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: normal;
}

::v-deep .el-radio-group {
  z-index: 1;
  position: relative;
}
</style>
