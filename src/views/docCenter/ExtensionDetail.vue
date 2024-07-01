<template>
  <div>
    <h3 class="document-title">
      {{ interfaceName + "#" + methodName }}（{{ cnName }}）
    </h3>
    <p style="margin-left: 0px; margin-bottom: 20px">{{ remark }}</p>
    <!-- 触发场景 -->
    <h4 class="document-sub-title">触发场景</h4>
    <div class="md-container">
      <MarkdownPreview
        v-if="docContent"
        class="markdown-preview"
        v-model="docContent"
      />
    </div>
    <h4 class="document-sub-title">请求参数</h4>
    <el-table
      :data="inParamsTableData"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      class="my-table mb2"
      row-key="id"
      style="margin-bottom: 25px"
    >
      <el-table-column
        :show-tooltip-when-overflow="true"
        label="名称"
        min-width="22%"
        prop="name"
      >
      </el-table-column>
      <el-table-column
        :show-tooltip-when-overflow="true"
        label="类型"
        min-width="20%"
        prop="type"
      >
      </el-table-column>
      <el-table-column label="是否必选" min-width="15%" prop="required">
        <template slot-scope="scope">
          <span>{{ scope.row.required === 1 ? "是" : "" }}</span>
          <span>{{ scope.row.required === 0 ? "否" : "" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-tooltip-when-overflow="true"
        label="示例值"
        min-width="15%"
        prop="exampleValue"
      >
      </el-table-column>
      <el-table-column
        :show-tooltip-when-overflow="true"
        label="描述"
        min-width="28%"
        prop="remark"
      >
      </el-table-column>
    </el-table>
    <h4 class="document-sub-title">响应参数</h4>
    <el-table
      :data="outParamsTableData"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      class="my-table mb2"
      row-key="id"
      style="margin-bottom: 25px"
    >
      <el-table-column
        :show-tooltip-when-overflow="true"
        label="名称"
        min-width="22%"
        prop="name"
      >
      </el-table-column>
      <el-table-column
        :show-tooltip-when-overflow="true"
        label="类型"
        min-width="20%"
        prop="type"
      >
      </el-table-column>
      <el-table-column
        :show-tooltip-when-overflow="true"
        label="示例值"
        min-width="15%"
        prop="exampleValue"
      >
      </el-table-column>
      <el-table-column
        :show-tooltip-when-overflow="true"
        label="描述"
        min-width="28%"
        prop="remark"
      >
      </el-table-column>
    </el-table>
    <h4 class="document-sub-title">错误码</h4>
    <el-table
      :data="errorCodeTableData"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      class="my-table mb2"
      hideEmptyImg
      row-key="id"
      style="margin-bottom: 25px"
    >
      <el-table-column label="错误码" min-width="20%" prop="errorCode">
      </el-table-column>
      <el-table-column label="错误信息" prop="errorMsg"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import docCenter from "@/api/intranet/docCenter/index.js";
import MarkdownPreview from "@/components/MarkdownPreview/index.vue";

export default {
  name: "ExtensionDetail",
  components: { MarkdownPreview },
  data() {
    return {
      inParamsTableData: [],
      outParamsTableData: [],
      errorCodeTableData: [],
      methodName: "",
      interfaceName: "",
      cnName: "",
      remark: "",
      docContent: "",
    };
  },
  methods: {
    async querySpiReleaseDoc() {
      const id = this.$route.query.spiId;
      const data = { id };
      const response = await docCenter.querySpiReleaseDoc(data);
      this.inParamsTableData = response.data.inParamList;
      this.outParamsTableData = response.data.outParamList;
      this.errorCodeTableData = response.data.errorCodeList;
      this.methodName = response.data.methodName;
      this.interfaceName = response.data.interfaceName;
      this.interfaceName = this.interfaceName.substring(
        this.interfaceName.lastIndexOf(".") + 1
      );
      this.cnName = response.data.cnName;
      this.remark = response.data.remark;
      this.docContent = response.data.docContent;
    },
  },
  created() {
    this.querySpiReleaseDoc();
  },
};
</script>


<style lang="scss" scoped>
.md-container {
  margin-bottom: 20px;
  .v-note-wrapper {
    z-index: 80;
  }
}
</style>