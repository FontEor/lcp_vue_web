
<template>
  <div>
    <el-table v-if="!showDetail" :data="tableData" style="width: 100%">
      <el-table-column
        prop="cnName"
        label="扩展点名称"
        show-overflow-tooltip
        min-width="160"
      >
        <template slot-scope="scope">
          <a
            target="_blank"
            style="color: #3c6ef0"
            @click="extensionMethodUrl(scope.row.id)"
            >{{ scope.row.cnName }}</a
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="methodName"
        label="方法名"
        show-overflow-tooltip
        min-width="240"
      >
        <template slot-scope="scope">
          <span>{{
            formatMethodName(scope.row.methodName, scope.row.interfaceName)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="docJssKey" label="触发场景" min-width="260">
        <template slot-scope="scope">
          <span>{{ formatMD(scope.row.docJssKey) }}</span>
          <el-popover placement="bottom" width="640px">
            <template>
              <MarkdownPreview
                v-if="scope.row.docJssKey"
                class="markdown-preview"
                v-model="scope.row.docJssKey"
              />
            </template>
            <div slot="reference" style="color: #3c6ef0; cursor: pointer">
              查看更多
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="supportedVersions"
        label="支持的版本"
        show-overflow-tooltip
        min-width="180"
      >
        <template slot-scope="scope">
          <span>{{ formatVersion(scope.row.supportedVersions) }}</span>
        </template>
      </el-table-column>
    </el-table>
    <ExtensionDetail v-else />
  </div>
</template>

<script>
import docCenter from "@/api/intranet/docCenter/index.js";
import ExtensionDetail from "@/views/docCenter/ExtensionDetail.vue";
import MarkdownPreview from "@/components/MarkdownPreview/index.vue";
export default {
  name: "ExtensionDoc",
  components: { ExtensionDetail, MarkdownPreview },
  data() {
    return {
      showDetail: false,
      tableData: [],
    };
  },
  methods: {
    formatMethodName(methodName, interfaceName) {
      const interfaceSubName = interfaceName.substring(
        interfaceName.lastIndexOf(".") + 1
      );
      return `${interfaceSubName}#${methodName}`;
    },
    formatVersion(row) {
      if (row) {
        return row.replace(",", " | ");
      } else {
        return "—";
      }
    },
    formatMD(row) {
      if (row) {
        return row.slice(0, 50);
      }
    },
    extensionMethodUrl(id) {
      const url =
        window.location.origin +
        "/#/extensiondoc/" +
        this.$route.params.productCode +
        "/" +
        this.$route.params.docId +
        "?spiId=" +
        id;
      window.open(url);
    },
    //查询扩展点列表数据
    async querySpiDocList() {
      const productCode = this.$route.params.productCode;
      const productSysGroupId = this.$route.params.docId;
      const pageNumb = 1;
      const pageSize = 1000;
      const data = { productCode, productSysGroupId, pageNumb, pageSize };
      const response = await docCenter.querySpiDocList(data);
      this.tableData = response.data;
    },
  },
  created() {
    if (this.$route.query.spiId) {
      this.showDetail = true;
    } else {
      this.showDetail = false;
      this.querySpiDocList();
    }
  },
};
</script>

<style lang="scss" scoped>
.markdown-preview {
  box-shadow: transparent;
  width: 600px;
  height: 400px;
  z-index: 80;
}
</style>