<template>
  <div>
    <lemon-imui
      :class="isZoom ? 'robot_style' : 'robot_style_Zoom'"
      simple
      :user="user"
      ref="IMUI"
      @pull-messages="handlePullMessages"
    >
      <template #message-title>
        <div class="robot_im_header">
          <div class="header_title">
            <img src="../../../assets/img/headertitle.png" class="robotImg" />
            <span>物流开放平台智能助手</span>
          </div>
          <div v-if="isZoom" class="header_zoom" @click="handleZoom">
            <img src="../../../assets/img/zoom.png" class="img_zoom" />
          </div>
          <div v-else class="header_zoom" @click="handleZoom">
            <img src="../../../assets/img/zoomSmall.png" class="img_zoom" />
          </div>
          <div class="header_close" @click="closeRobot">
            <img src="../../../assets/img/close.png" class="im_btn_close" />
          </div>
        </div>
      </template>
      <template #editor-footer>
        <div class="robot_im_container_footer">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            style="height: 100%"
            @submit.native.prevent
          >
            <el-form-item
              label=""
              prop="consultationContent"
              style="height: 100%"
            >
              <el-input
                v-model="ruleForm.consultationContent"
                style="height: 100%"
                placeholder="请输入您想查询的内容"
                :disabled="isDisabled"
                @keyup.enter.native="
                  handleRequest('ruleForm', ruleForm.consultationContent)
                "
              >
                <div slot="append" class="robot_im_container_footer_button">
                  <div
                    :class="{ disabled: isDisabled }"
                    @click="
                      handleRequest('ruleForm', ruleForm.consultationContent)
                    "
                  >
                    <img
                      v-if="!isDisabled"
                      class="robot_im_container_footer_button_img"
                      src="../../../assets/img/send.png"
                      alt=""
                    />
                    <p v-if="showCountdown">{{ countdown }}</p>
                  </div>
                </div>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </lemon-imui>
  </div>
</template>
<script>
import { UserModule } from "@/store/common/modules/user";
import { EventBus } from "@/utils/bus.js";
import request from "@/utils/request";
import lcp from "@/api/extranet/lcp";
const { v4: uuidv4 } = require("uuid");
const getTime = () => new Date().getTime();
const generateRandId = () => Math.random().toString(36).substr(-8);
export default {
  name: "SmartRobot",
  props: {
    isZoom: Boolean,
    chatHistory: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      // 请求人的信息
      user: {
        id: "1",
        displayName: UserModule.name || "",
      },
      isDisabled: false,
      showCountdown: false,
      countdown: 3,
      greetingInfo: {
        title: "Hi~我是物流开放平台智能助手，您可以：",
        answerList: [],
        isGreet: true,
        isShowHistoryLog: 1,
        total: 0,
      },
      ruleForm: {
        consultationContent: "",
      },
      rules: {
        consultationContent: [
          { min: 0, max: 200, message: "最多输入200字", trigger: "change" },
        ],
      },
      fromPage: 0, //用于存储答案接口的index值
      lastConsultationContent: "",
      totalList: 0, //用于暂存答案列表的长度
      bizId: "",
      //新增的时候：question，answerSource，answerDetail，bizId 必传
      //更新的时候：bizId 必传
      saveObj: {
        answerDetail: "", //答案详情
        answerSource: null, //答案来源  1-常见问题列表  2常见问题  3-系统兜底
        bizId: "", //
        question: "", //提问的问题
        remarkDetail: "", //评价描述/问题描述
        remarkReason: null, //  评价原因/问题原因  1-答非所问、2-回答不详细、3-没有找到我想问的问题 4-问题列表中我问的问题不够靠前
        remarkStatus: 0, // 评价状态  0-未评价 1-点赞 2-点踩
      },
      messages: [],
      isLikeOrUnLike: false,
    };
  },
  watch: {},
  computed: {},
  mounted() {
    EventBus.$on("handleRefresh", (id) => {
      this.handleRefresh(this.lastConsultationContent, id);
    });
    EventBus.$on("handleCheckHistoryLog", () => {
      this.handleCheckHistoryLog();
    });
    EventBus.$on("handleAnswerListItem", (item) => {
      this.handleAnswerListItem(item);
    });
    EventBus.$on("handleLike", (bizId, isLikeRed) => {
      this.handleLike(bizId, isLikeRed);
    });
    EventBus.$on("handleUnLike", (remarkDetail, bizId) => {
      this.handleUnLike(remarkDetail, bizId);
    });
    // 初始化lemon
    this.initLemon();
  },
  updated() {},
  destroyed() {
    EventBus.$off();
  },
  // TODO：方法中的代码需要优化
  methods: {
    initLemon() {
      const { IMUI } = this.$refs;
      const contact = [
        {
          id: "contact-1",
          displayName: "物流开放平台智能助手",
          avatar: "",
          type: "single",
          index: "T",
          unread: 0,
          lastSendTime: getTime(),
          lastContent: "你好123",
          lastContent: IMUI.lastContentRender({
            type: "box",
            content: "你在干嘛呢？",
          }),
        },
      ];
      IMUI.setLastContentRender("box", (message) => {
        return <span>[语音]</span>;
      });
      IMUI.initContacts(contact);
      setTimeout(() => {
        IMUI.changeContact("contact-1");
      }, 0);
    },
    handleZoom() {
      this.$emit("handleZoom");
    },
    closeRobot() {
      const { IMUI } = this.$refs;
      IMUI.clearMessages();
      this.$emit("closeRobot");
    },
    message(
      content,
      fromUser = this.user,
      type = "text",
      data = this.greetingInfo,
      currentContactId,
      isShowLikeOrUnlike = true,
      bizId
    ) {
      return {
        id: generateRandId(),
        status: "succeed",
        type,
        sendTime: getTime(),
        content,
        toContactId: currentContactId,
        fromUser,
        data,
        isShowLikeOrUnlike,
        bizId,
      };
    },
    // 公共部分
    boxMessage() {
      const answerInfo = {
        title: "",
        answerList: [item.content],
        isGreet: false,
        isShowHistoryLog: 1,
        total: 1,
      };
      const { IMUI } = this.$refs;
      const { currentContactId } = this.$refs.IMUI;
      const otherUser = {};
      const message = this.message(
        "",
        otherUser,
        "box",
        answerInfo,
        currentContactId
      );
      IMUI.appendMessage(message, true);
    },
    handleCheckHistoryLog() {
      const chatBox = document.getElementById("lemon-messages-chat");
      chatBox.scrollTop = 0;
      this.handleHistoryData();
    },
    // 处理喜欢
    handleLike(bizId, isLikeRed) {
      this.isLikeOrUnLike = true;
      this.saveObj["bizId"] = bizId || this.bizId;
      if (isLikeRed) {
        this.saveObj["remarkStatus"] = 1;
      } else {
        this.saveObj["remarkStatus"] = 0;
      }
      this.saveObj["remarkDetail"] = null;
      this.saveObj["remarkReason"] = null;
      this.saveRecord(this.saveObj);
      this.saveObj["remarkStatus"] = null;
    },
    //处理不喜欢
    handleUnLike(form, bizId) {
      this.isLikeOrUnLike = true;
      this.saveObj["bizId"] = bizId || this.bizId;
      this.saveObj["remarkStatus"] = 2;
      this.saveObj["remarkDetail"] = form.remarkDetail;
      this.saveObj["remarkReason"] = form.remarkReason;
      this.saveRecord(this.saveObj);
      this.saveObj["remarkStatus"] = null;
    },
    // 处理换一换事件
    handleRefresh(keyword, id) {
      this.fromPage = this.fromPage + 5;
      if (this.fromPage > this.totalList) {
        this.fromPage = 0;
      }
      request({
        url: "/search/question",
        method: "get",
        params: {
          q: keyword,
          from: this.fromPage,
          size: 5,
        },
      })
        .then(async (res) => {
          const data = res.data;
          this.updateMessage(data, id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //处理点击answerListItem
    async handleAnswerListItem(item) {
      this.bizId = uuidv4();
      this.appendCustomMessage(item.title, this.user);
      this.saveObj["bizId"] = this.bizId;
      let contentData;
      await lcp.workOrder.problemDetail(item.raw.code).then(async (res) => {
        try {
          contentData = JSON.parse(res.data.content);
        } catch (e) {
          contentData = res.data.content;
        }
        // contentData =JSON.parse(res.data.content);
        this.saveObj["answerDetail"] = JSON.stringify(res.data.content);
        this.saveObj["question"] = res.data.title;
        await this.saveRecord(this.saveObj);
      });
      const answerInfo = {
        title: "",
        answerList: [contentData], //[item.content],//[contentData],
        isGreet: false,
        isShowHistoryLog: 1,
        total: 1,
      };
      const { IMUI } = this.$refs;
      const { currentContactId } = this.$refs.IMUI;
      const otherUser = {};
      const message = this.message(
        "",
        otherUser,
        "box",
        answerInfo,
        currentContactId,
        true,
        this.bizId
      );
      IMUI.appendMessage(message, true);
    },
    // 保存对话的接口
    saveRecord(saveObj) {
      // console.log("answerDetail:", saveObj["answerDetail"]);
      if (!this.isLikeOrUnLike) {
        let answerDetailList;
        try {
          answerDetailList = JSON.parse(saveObj["answerDetail"]);
        } catch (e) {
          answerDetailList = saveObj["answerDetail"];
        }
        // const answerDetailList = JSON.parse(saveObj["answerDetail"]);
        if (Array.isArray(answerDetailList)) {
          if (answerDetailList.length > 1) {
            saveObj["answerSource"] = 1; //常见问题列表
          } else if (answerDetailList.length == 1) {
            saveObj["answerSource"] = 2;
          } else {
            saveObj["answerSource"] = 3; //系统兜底
          }
        } else {
          saveObj["answerSource"] = 2; // 常见问题
        }
      }

      request({
        url: "/smartrobotrecord/saveRecord",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
          answerDetail: saveObj["answerDetail"] || null,
          answerSource: saveObj["answerSource"] || null,
          bizId: saveObj["bizId"] || null,
          question: saveObj["question"] || null,
          remarkDetail: saveObj["remarkDetail"] || null,
          remarkReason: saveObj["remarkReason"] || null,
          remarkStatus: saveObj["remarkStatus"] || 0,
          createUser: UserModule.user_pin || undefined,
        }),
      })
        .then((res) => {
          console.log(res);
          saveObj["remarkDetail"] = null;
          saveObj["remarkReason"] = null;
          saveObj["remarkStatus"] = null;
          this.isLikeOrUnLike = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 获取答案列表的接口
    getAnswerList(keyword, form) {
      this.bizId = uuidv4();
      request({
        url: "/search/question",
        method: "get",
        params: {
          q: keyword,
          from: form,
          size: 5,
        },
      })
        .then(async (res) => {
          const data = res.data;
          this.totalList = data.total;
          let title = "您是否想咨询：";
          // if (data.total === 0) {
          //   title = "";
          // }
          if (data.total <= 1) {
            title = "";
          }
          let rowsList = data.rows;
          if (data.total === 1) {
            const code = data.rows[0]["raw"]["code"];
            await lcp.workOrder.problemDetail(code).then((res) => {
              if (res.data["content"] == "\n") {
                rowsList = [""];
              } else {
                let content;
                try {
                  content = JSON.parse(res.data["content"]);
                } catch (e) {
                  content = res.data["content"];
                }
                // content = JSON.parse(res.data["content"]);
                rowsList = [];
                rowsList.push(content);
              }
            });
          }
          const answerInfo = {
            title: title,
            answerList: rowsList, //data.rows, //rowsList,
            isGreet: false,
            isShowHistoryLog: 1,
            total: data.total,
          };
          const { IMUI } = this.$refs;
          const { currentContactId } = this.$refs.IMUI;
          const otherUser = {};
          const message = this.message(
            "",
            otherUser,
            "box",
            answerInfo,
            currentContactId,
            true,
            this.bizId
          );
          IMUI.appendMessage(message, true);
          this.saveObj["bizId"] = this.bizId;
          this.saveObj["answerDetail"] = JSON.stringify(data.rows);
          this.saveObj["question"] = keyword;
          await this.saveRecord(this.saveObj);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 以下为自定义方法
    // 请求答案的接口
    handleRequest(formName, consultationContent) {
      if (consultationContent.trim() === "") {
        return;
      }
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.appendCustomMessage(
            this.ruleForm.consultationContent,
            this.user
          );
          await this.getAnswerList(this.ruleForm.consultationContent, 0);
          this.fromPage = 0;
          this.lastConsultationContent = this.ruleForm.consultationContent;
          this.ruleForm.consultationContent = "";
          this.isDisabled = true;
          this.buttonText = "Disabled";
          this.showCountdown = true;
          let timer = setInterval(() => {
            this.countdown--;
            if (this.countdown === 0) {
              clearInterval(timer);
              this.isDisabled = false;
              this.showCountdown = false;
              this.countdown = 3;
            }
          }, 1000);
        } else {
          return false;
        }
      });
    },
    // 发送消息
    appendCustomMessage(content, fromUser) {
      const { IMUI } = this.$refs;
      const message = {
        id: generateRandId(),
        status: "succeed",
        type: "text",
        sendTime: getTime(),
        content,
        toContactId: "contact-1",
        fromUser,
      };
      IMUI.appendMessage(message, true);
    },
    // 处理历史数据
    handleHistoryData(currentContactId, fromUser, otherUser) {
      const chatHistoryCopy = [];
      this.chatHistory.reverse().map((item) => {
        const obj1 = {
          id: generateRandId(),
          status: "succeed",
          type: "text",
          sendTime: item.createTime,
          content: item.question,
          toContactId: currentContactId,
          fromUser: fromUser,
        };
        // const answerDetail = JSON.parse(item.answerDetail);
        let answerDetail;
        try {
          answerDetail = JSON.parse(item.answerDetail);
        } catch (e) {
          answerDetail = item.answerDetail;
        }

        let parseAnswerDetail = [];
        if (Array.isArray(answerDetail)) {
          parseAnswerDetail = answerDetail;
          if (answerDetail.length === 1) {
            parseAnswerDetail[0] = answerDetail[0]["content"];
          }
        } else {
          parseAnswerDetail[0] = answerDetail;
        }
        let title = "";
        if (parseAnswerDetail.length > 1) {
          title = "您是否想咨询：";
        }
        const answerInfo = {
          title: title,
          answerList: parseAnswerDetail,
          isGreet: false,
          isShowHistoryLog: 1,
          total: parseAnswerDetail.length,
          remarkStatus: item.remarkStatus || 0,
        };
        const obj2 = {
          id: generateRandId(),
          status: "succeed",
          type: "box",
          sendTime: item.createTime,
          content: "contact-1",
          toContactId: currentContactId,
          fromUser: otherUser,
          data: answerInfo,
          isShowLikeOrUnlike: false,
          bizId: item.bizId,
        };
        chatHistoryCopy.push(obj1, obj2);
      });
      return chatHistoryCopy;
    },
    // 获取历史消息
    handlePullMessages(contact, next) {
      this.messages = [];
      const { currentContactId } = this.$refs.IMUI;
      const otherUser = {
        id: contact.id,
        displayName: contact.displayName,
      };
      const HistoryInfo = {
        title: "",
        answerList: [],
        isGreet: false,
        isShowHistoryLog: 0,
        total: 0,
      };
      const HistoryInfoObj = {
        id: generateRandId(),
        status: "succeed",
        type: "box",
        sendTime: getTime(),
        content: "contact-1",
        toContactId: currentContactId,
        fromUser: otherUser,
        data: HistoryInfo,
      };
      if (UserModule.name) {
        this.messages.push(HistoryInfoObj);
      }
      const chatHistoryCopy = this.handleHistoryData(
        currentContactId,
        this.user,
        otherUser
      );
      this.messages.push(...chatHistoryCopy);
      this.messages.push(this.message(currentContactId, otherUser, "box"));
      next(this.messages, true);
    },
    // 更新消息
    updateMessage(data, id) {
      const { IMUI } = this.$refs;
      const messages = IMUI.getCurrentMessages();
      const message = messages.find((obj) => obj.id === id);
      let title = "您是否想咨询：";
      if (data.total === 0) {
        title = "";
      }
      const answerInfo = {
        title: title,
        answerList: data.rows,
        isGreet: false,
        isShowHistoryLog: 1,
        total: data.total,
      };
      if (messages.length > 0) {
        const update = {
          id: message.id,
          status: "succeed",
          type: "box",
          sendTime: getTime(),
          data: answerInfo,
          content: "",
          fromUser: {},
        };
        IMUI.updateMessage(update);
        // 更新消息后返回底部
        // IMUI.messageViewToBottom();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/smartRobot.scss";
@import "@/assets/styles/smartRobotZoom.scss";
@import "@/assets/styles/smartRobotCommon.scss";
.disabled {
  display: flex;
  width: 100%;
  height: 100%;
  color: #fff;
  pointer-events: none;
  align-items: center;
  justify-content: center;
}
::v-deep .el-form-item {
  margin-bottom: 0px;
}
::v-deep .el-form-item__content {
  height: 100%;
}
::v-deep .el-form-item__error {
  top: 40%;
  left: -7%;
}
</style>
