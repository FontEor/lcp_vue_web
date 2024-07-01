<template>
  <div :class="{ inline }" class="screenshot-evaluation">
    <p>本篇文档是否有帮助？</p>
    <div class="screenshot-evaluation__button-wrapper">
      <el-button
        :loading="buttonLoading"
        :disabled="evaluationButtonDisabled"
        :plain="helpfulButtonPlain"
        :size="buttonSize"
        type="primary"
        icon="icon-thumbs-up"
        @click="onClickHelpfulButton"
      >
        有帮助
      </el-button>
      <el-button
        :loading="buttonLoading"
        :disabled="evaluationButtonDisabled"
        :plain="helplessButtonPlain"
        :size="buttonSize"
        type="primary"
        icon="icon-thumbs-down"
        @click="onClickHelplessButton"
      >
        无帮助
      </el-button>
    </div>
    <p v-if="!inline"
      >接入过程中遇到问题，您可以通过<Link href="/admin/#/upgrade/work-order"
        >提交工单</Link
      >的方式获得帮助</p
    >
    <DialogDocumentFeedback
      :dialogVisible.sync="dialogDocumentFeedbackVisible"
      :objId="objId"
      :docTypeMain="docTypeMain"
      :bizUnitId="bizUnitId"
      @submit="onSubmitDialog"
    />
  </div>
</template>

<script>
import Link from "@/components/common/Link.vue";
import DialogDocumentFeedback from "./components/dialog-document-feedback.vue";
import { debounce } from "lodash";
import "@/assets/iconfont/thumbs-up/iconfont.css";
import "@/assets/iconfont/thumbs-down/iconfont.css";
import lcp from "@/api/extranet/lcp/index.ts";
import { UserModule } from "@/store/common/modules/user.ts";

export default {
  name: "ScreenshotEvaluation",
  components: { Link, DialogDocumentFeedback },
  props: {
    objId: { type: Number, required: true },
    docTypeMain: { type: Number, required: true },
    bizUnitId: { type: Number },
    inline: { type: Boolean, default: false },
    helpful: { type: Boolean | undefined, required: true },
    buttonLoading: { type: Boolean, required: true },
    evaluationButtonDisabled: { type: Boolean, required: true },
  },
  data() {
    return {
      dialogDocumentFeedbackVisible: false,
    };
  },
  computed: {
    helpfulButtonPlain() {
      const { helpful } = this;
      if (typeof helpful !== "boolean") {
        return true;
      }
      return !helpful;
    },
    helplessButtonPlain() {
      const { helpful } = this;
      if (typeof helpful !== "boolean") {
        return true;
      }
      return helpful;
    },
    buttonSize() {
      const { inline } = this;
      return inline ? "mini" : "small";
    },
  },
  methods: {
    // 根据文档ID评价文档是否有帮助接口
    async submitQuestion() {
      const { objId, docTypeMain, bizUnitId } = this;
      const whetherHelp = 1;
      const createUser = UserModule.user_pin || undefined;
      const data = {
        objId,
        whetherHelp,
        docTypeMain,
        bizUnitId,
        createUser,
      };
      return await lcp.evaluate.submitQuestion(data);
    },

    // 根据文档ID评价文档是否有帮助接口调用
    async handleSubmitQuestion() {
      await this.submitQuestion().catch((error) => {
        console.error("handleSubmitQuestion");
        throw error;
      });
    },

    toggleHelpful(helpful) {
      this.$emit("update:helpful", helpful);
      this.$emit("update:evaluationButtonDisabled", true);
    },

    onClickHelpfulButton: debounce(async function () {
      this.$emit("update:buttonLoading", true);
      await this.handleSubmitQuestion().catch((error) => {
        this.$emit("update:buttonLoading", false);
        console.error("onClickHelpfulButton");
        throw error;
      });
      this.$emit("update:buttonLoading", false);
      this.toggleHelpful(true);
    }),
    onClickHelplessButton() {
      this.dialogDocumentFeedbackVisible = true;
    },
    onSubmitDialog() {
      this.toggleHelpful(false);
    },
  },
};
</script>

<style lang="scss" scoped>
.screenshot-evaluation {
  &.inline {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 320px;
  }

  .screenshot-evaluation__button-wrapper {
    padding: 8px 0;
  }
}
</style>
