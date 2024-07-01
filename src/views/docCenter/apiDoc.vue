
<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="API" show-overflow-tooltip width="280">
        <template slot-scope="scope">
          <a
            :href="
              '#/apiMethodList?qualifiedName=' +
              scope.row.interfaceName +
              '&methodName=' +
              scope.row.methodName
            "
            target="_blank"
            style="color: #3c6ef0"
            >{{ scope.row.methodName }}</a
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="cnName"
        label="中文名称"
        show-overflow-tooltip
        width="280"
      >
      </el-table-column>
      <el-table-column
        prop="supportedVersions"
        label="支持的版本"
        show-overflow-tooltip
        width="300"
      >
        <template slot-scope="scope">
          <span>{{ formatVersion(scope.row.supportedVersions) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import docCenter from "@/api/intranet/docCenter/index.js";

export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    formatVersion(row) {
      if (row) {
        return row.replace(",", " | ");
      } else {
        return "-";
      }
    },
    //查询配置API列表数据
    async queryOpenApiList() {
      const productCode = this.$route.params.productCode;
      const productSysGroupId = this.$route.params.docId;
      const pageNumb = 1;
      const pageSize = 1000;
      const flag = 1;
      const data = { productCode, productSysGroupId, pageNumb, pageSize, flag };
      const response = await docCenter.queryOpenApiList(data);
      this.tableData = response.data.list;
    },
  },
  created() {
    this.queryOpenApiList();
  },
};
</script>

<style lang="scss" scoped>
</style>