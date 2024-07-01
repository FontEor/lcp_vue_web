<template>
  <div class="token-search">
    <div class="tit">使用说明</div>
    <ul class="txt-ul">
      <li>1.用于查询当前token的有效期及pin名称；</li>
      <li>2.非登录态仅可查询脱敏pin；登录后可查询当前账号下appkey的完整授权结果；</li>
      <li>3.相关名词介绍及授权逻辑可见<a href="https://cloud.jdl.com/#/devSupport/53392" target="_blank">授权介绍</a>。</li>
    </ul>
    <el-divider class="help-divider" />
    <div class="tit">查询条件</div>
    <el-row>
      <el-col :span="12" class="split-pane-left">
        <el-form label-width="120px" label-position="left" :model="form" :rules="formRules" ref="inputUrlForm">
          <el-form-item label="access token" prop="token">
            <el-input v-model="form.token" placeholder="请输入想要查询的token" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchToken">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-divider class="help-divider" />
    <div class="tit">查询结果</div>
    <el-alert title="账号未登录或token所属的appkey不属于当前账号，查询结果脱敏展示。" type="info" show-icon :closable="false" v-if="tokenSearchTips"
      class="token-search-tips">
    </el-alert>

    <el-table :data="tableData" style="width: 90%">
      <el-table-column prop="env" label="授权环境" width="100">
      </el-table-column>
      <el-table-column prop="appKey" label="appkey" min-width="300">
      </el-table-column>
      <el-table-column prop="pin" label="pin" min-width="200">
      </el-table-column>
      <el-table-column prop="authorizationTime" label="授权时间"  width="160">
      </el-table-column>
      <el-table-column prop="expirationTime" label="过期时间"  width="160">
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import request_msg from "@/utils/request_msg";
export default {
  name: "TokenSearch",
  data() {
    return {
      form: {
        token: ''
      },
      formRules: {
        token: [{ required: true, message: "请输入想要查询的token", trigger: "blur" }],
      },
      tableData: [],
      tokenSearchTips: false
    }
  },
  methods: {
    searchToken() {
      request_msg({
        url: "/oauth/getInfoByToken",
        method: "get",
        params: {
          accessToken: this.form.token,
        },
      })
        .then(async (res) => {
          const data = res.data;
          this.tableData = data;
          this.tokenSearchTips = this.tableData[0].appKey.indexOf("*") != -1;
        })
        .catch((error) => {
          this.tokenSearchTips = false;
          console.log(error);
        });
    },

  }
}
</script>

<style lang="scss" scoped>
.token-search {
  padding: 16px;
  min-width: 910px;
  background: #fff;

  .help-divider {
    margin: 20px 0;
  }

  .tit {
    font-size: 20px;
    color: #333;
    line-height: 30px;
    margin-bottom: 16px;
  }

  .txt-ul {

    li {
      color: #666;
      font-size: 14px;
      line-height: 24px;

      a {
        color: #3c6ef0;
      }
    }
  }

  ::v-deep .token-search-tips {
    background-color: #f5f5f5;
    padding: 6px 16px;
    line-height: 20px;
    color: #999;
    margin-bottom: 16px;

    i {
      color: #999;
    }
  }

}
</style>