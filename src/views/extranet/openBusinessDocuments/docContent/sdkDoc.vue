<template>
  <div class="sdk-doc">
    <el-tag
      v-for="(tag, index) in tagList"
      :key="index"
      :disable-transitions="true"
      type="info"
      class="tagTip"
    >
      <p>
        <i class="el-icon-info"></i>{{ $t("docContent.sdkDoc.5ivlb280hqw0")
        }}<a
          href="https://cloud.jdl.com/#/devSupport/53209"
          target="_blank"
          class="anchor"
          >{{ $t("docContent.sdkDoc.5ivlb280hqw1") }}</a
        >
      </p>
    </el-tag>

    <div class="sdk-wrapper">
      <sdk-list :items="tableBasicSdk" :type="1" />
      <sdk-list :items="tableBizSdk" :type="2" />
    </div>
  </div>
</template>

<script>
import { getBizUnitSdks } from "@/api/business/sdk/biz-sdk";
import { getBaseSdkList } from "@/api/business/sdk/baseSdk";
import SdkList from "../components/sdkList.vue";

export default {
  name: "SdkDoc",
  components: {
    SdkList,
  },
  data() {
    return {
      tableBasicSdk: [],
      tableBizSdk: [],
      id: "",
      tagList: ["tag"],
    };
  },
  methods: {
    /**
     * 获取sdk相关数据
     */
    getData(unitId) {
      //获取基础sdk数据
      getBaseSdkList().then(
        (baseSdkList) => (this.tableBasicSdk = baseSdkList)
      );
      //获取业务sdk数据
      getBizUnitSdks(Number(this.id), 0, 0x7fffffff).then(
        (bizSdks) => (this.tableBizSdk = bizSdks)
      );
    },
  },
  created() {
    this.id = this.$route.params.unitId;
    this.getData(this.id);
  },
};
</script>

<style lang="scss" scoped>
.sdk-doc {
  margin: 0 auto;
  width: 1200px;
  .tagTip {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 16px;
    border-color: #f5f5f5;
    .el-icon-info {
      color: #b5b5b5;
    }
    .anchor {
      color: #3c6ef0;
    }
  }
  .sdk-wrapper {
    padding: 10px 20px;
    background: #fff;
  }
}
</style>