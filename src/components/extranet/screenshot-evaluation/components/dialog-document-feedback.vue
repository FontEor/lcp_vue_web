<template>
  <el-dialog
    :visible="dialogVisible"
    :close-on-click-modal="false"
    title="提交文档反馈意见"
    width="640px"
    class="dialog-document-feedback"
    @close="onCloseDialog"
  >
    <el-form
      :model="formModel"
      :rules="formRules"
      label-width="100px"
      ref="form"
    >
      <el-form-item label="原因" prop="questionCause">
        <el-select
          v-model="formModel.questionCause"
          placeholder="请选择问题原因"
          style="width: 100%"
        >
          <el-option
            v-for="{ value, label } in questionCauseOptionList"
            :key="value"
            :label="label"
            :value="value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="questionDesc">
        <el-input
          v-model.trim="formModel.questionDesc"
          :rows="5"
          :maxlength="500"
          show-word-limit
          type="textarea"
          resize="none"
          placeholder="请描述您在使用本文档过程中遇到的问题"
          style="width: 100%"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onClickCancelButton">取消</el-button>
      <el-button
        :loading="confirmSubmitButtonLoading"
        type="primary"
        @click="onClickConfirmSubmitButton"
        >确认提交</el-button
      >
    </template>
  </el-dialog>
</template>

<script>
import lcp from "@/api/extranet/lcp/index.ts";
import { UserModule } from "@/store/common/modules/user.ts";
import { debounce } from "lodash";

export default {
  name: "DialogDocumentFeedback",
  props: {
    dialogVisible: { type: Boolean, required: true },
    objId: { type: Number, required: true },
    docTypeMain: { type: Number, required: true },
    bizUnitId: { type: Number },
  },
  data() {
    return {
      formModel: { questionCause: undefined, questionDesc: "" },
      formRules: {
        questionCause: [{ required: true, message: "请选择问题原因" }],
        questionDesc: [
          { required: true, message: "请描述您在使用本文档过程中遇到的问题" },
        ],
      },
      questionCauseOptionList: [
        { label: "内容不详细", value: 1 },
        { label: "文档更新不及时", value: 2 },
        { label: "内容有误", value: 3 },
        { label: "视觉体验差", value: 4 },
        { label: "其他", value: 5 },
      ],
      confirmSubmitButtonLoading: false,
    };
  },
  methods: {
    // 根据文档ID评价文档是否有帮助接口
    async submitQuestion() {
      const { objId, docTypeMain, bizUnitId } = this;
      const { questionCause, questionDesc } = this.formModel;
      const whetherHelp = 0;
      const createUser = UserModule.user_pin || undefined;
      const data = {
        objId,
        whetherHelp,
        docTypeMain,
        bizUnitId,
        questionCause,
        questionDesc,
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

    onCloseDialog() {
      this.$refs.form.resetFields();
      this.$emit("update:dialogVisible", false);
    },
    onClickCancelButton() {
      this.onCloseDialog();
    },
    onClickConfirmSubmitButton: debounce(async function () {
      await this.$refs.form.validate().catch(() => {
        throw new Error("未通过表单校验");
      });
      this.confirmSubmitButtonLoading = true;
      await this.handleSubmitQuestion().catch((error) => {
        this.confirmSubmitButtonLoading = false;
        console.error("onClickConfirmSubmitButton");
        throw error;
      });
      this.confirmSubmitButtonLoading = false;
      this.onCloseDialog();
      this.$emit("submit");
    }, 300),
  },
};
</script>

<style lang="scss" scoped>
// .dialog-document-feedback {
// }
</style>
