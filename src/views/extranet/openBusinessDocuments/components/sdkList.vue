<template>
  <div>
    <el-table
      :data="items"
      :header-cell-style="{
        background: '#3c6ef0',
        color: 'white',
        'font-size': '18px',
      }"
      :hide-empty-img="true"
    >
      <el-table-column :label="type == 1 ? '基础SDK名称' : '业务SDK名称'">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="版本号">
        <template slot-scope="scope">{{ scope.row.version }}</template>
      </el-table-column>
      <el-table-column label="语言">
        <template slot-scope="scope">
          <div v-if="scope.row.language === 1">JAVA</div>
          <div v-else-if="scope.row.language === 2">.NET</div>
          <div v-else-if="scope.row.language === 3">PHP</div>
          <div v-else-if="scope.row.language === 4">Python</div>
          <div v-else-if="scope.row.language === 5">Golang</div>
          <div v-else>UNKNOWN</div>
        </template>
      </el-table-column>
      <el-table-column label="SDK描述">
        <template slot-scope="scope">{{
          type === 1 ? scope.row.description : scope.row.remark
        }}</template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            @click="
              type == 1
                ? downBasicSdk(scope.row.jssKey, scope.row.fileName)
                : downBizloadSdk(scope.row.jssKey)
            "
            type="text"
            size="mini"
            >下载</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="segmentation"></div>
  </div>
</template>
<script>
import { downloadBaseSdk } from "@/api/business/sdk/baseSdk";
import { downloadBizSdk } from "@/api/business/sdk/biz-sdk";

export default {
  name: "SdkList",
  props: {
    items: Array,
    type: Number,
  },
  methods: {
    /**
     * 下载基础sdk数据
     */
    downBasicSdk(jssKey, fileName) {
      downloadBaseSdk(jssKey, fileName);
    },
    /**
     *下载业务sdk数据
     */
    downBizloadSdk(jssKey) {
      if (jssKey === null || jssKey === undefined || jssKey === "") {
        this.$message.error("SDK文件不存在!");
        console.log("SDK不存在");
      } else {
        downloadBizSdk(jssKey);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.segmentation {
  height: 50px;
}
</style>