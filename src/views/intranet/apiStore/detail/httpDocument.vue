<<template>
  <div class="my-wrap">
    <div class="my-column">
      <div>
        <div>
          <h4 class="document-sub-title" style="float: left;">请求地址</h4>
          <a
            href="http://lcp.jdl.com/#/docSoftwareSystem/17/2570"
            class="link"
            style="color: #3c6ef0;float: right;"
            >
              更多请求地址
            </a>
        </div>
        <el-table
            :data="requestAddressTableData"
            class="my-table mb2"
            row-key="id"
            style="margin-bottom: 25px">
            <el-table-column
              :show-tooltip-when-overflow="true"
              label="环境"
              min-width="22%" prop="environment">
            </el-table-column>
            <el-table-column
              :show-tooltip-when-overflow="true"
              label="域名"
              min-width="39%" prop="address">
            </el-table-column>
             <el-table-column
              :show-tooltip-when-overflow="true"
              label="调用地址"
              min-width="39%" prop="url">
              <template>
                <span>{{url}}</span>
              </template>
            </el-table-column>
        </el-table>
        <h4 class="document-sub-title">URL参数</h4>
        <el-table
            :data="publicParamsTableData"
            class="my-table mb2"
            row-key="id"
            style="margin-bottom: 25px">
            <el-table-column
              :show-tooltip-when-overflow="true"
              label="名称"
              min-width="20%" prop="name">
            </el-table-column>
            <el-table-column
              :show-tooltip-when-overflow="true"
              label="类型"
              min-width="10%" prop="type">
            </el-table-column>
            <el-table-column
              label="是否必选"
              min-width="10%"
              prop="required">
            <template slot-scope="scope">
              <span>{{ scope.row.required === '1' ? '是' : '' }}</span>
              <span>{{ scope.row.required === '0' ? '否' : '' }}</span>
               <span>{{ scope.row.required === '' ? '' : '' }}</span>
            </template>
            </el-table-column>
            <el-table-column
              :show-tooltip-when-overflow="true"
              label="描述"
              min-width="60%"
              prop="remark">
              <template slot-scope="scope">
                <p class="line-feed">{{ scope.row.remark }}</p>
              </template>
            </el-table-column>
        </el-table>
       <h4 class="document-sub-title">请求参数</h4>
        <el-table
            :data="inParamsTableData"
            :tree-props="{children: 'children'}"
            class="my-table mb2"
            row-key="id"
            style="margin-bottom: 25px">
            <el-table-column
              :show-tooltip-when-overflow="true"
              label="名称"
              min-width="22%" prop="name">
            </el-table-column>
            <el-table-column
              :show-tooltip-when-overflow="true"
              label="类型"
              min-width="20%" prop="type">
            </el-table-column>
            <el-table-column
              label="是否必选"
              min-width="15%"
              prop="required">
            <template slot-scope="scope">
              <span>{{ scope.row.required === '1' ? '是' : '' }}</span>
              <span>{{ scope.row.required === '0' ? '否' : '' }}</span>
               <span>{{ scope.row.required === '2' ? '条件' : '' }}</span>
            </template>
            </el-table-column>
            <el-table-column
              :show-tooltip-when-overflow="true"
              label="示例值"
              min-width="15%"
              prop="exampleValue">
            </el-table-column>
            <el-table-column
              :show-tooltip-when-overflow="true"
              label="描述"
              min-width="28%"
              prop="remark">
              <template slot-scope="scope">
                <div
                    v-html="
                      formatTableColumnDescriptionInnerHtml(scope.row.remark)
                    "
                    class="wb-doc-title"
                  ></div>
                <!-- <p class="line-feed">{{ scope.row.remark }}</p> -->
              </template>
            </el-table-column>
        </el-table>
        <h4 class="document-sub-title">响应参数</h4>
        <el-table
              :data="outParamsTableData"
              :tree-props="{children: 'children'}"
              class="my-table mb2"
              row-key="id"
              style="margin-bottom: 25px">
            <el-table-column
              :show-tooltip-when-overflow="true"
              label="名称"
              min-width="22%" prop="name">
            </el-table-column>
            <el-table-column
              :show-tooltip-when-overflow="true"
              label="类型"
              min-width="20%" prop="type">
            </el-table-column>
            <el-table-column
              :show-tooltip-when-overflow="true"
              label="示例值"
              min-width="15%" prop="exampleValue">
            </el-table-column>
            <el-table-column
              :show-tooltip-when-overflow="true"
              label="描述"
              min-width="28%"
              prop="remark">
              <template slot-scope="scope">
                <div
                    v-html="
                      formatTableColumnDescriptionInnerHtml(scope.row.remark)
                    "
                    class="wb-doc-title"
                  ></div>
                <!-- <p class="line-feed">
                  {{ scope.row.remark }}
                </p> -->
              </template>
            </el-table-column>
        </el-table>
        <h4 class="document-sub-title">错误码</h4>
        <el-table
              :data="errorCodeTableData"
              :tree-props="{children: 'children'}"
              class="my-table mb2"
              hideEmptyImg
              row-key="id"
              style="margin-bottom: 25px">
            <el-table-column
              label="错误码"
              min-width="20%"
              prop="errorCode">
            </el-table-column>
            <el-table-column
              label="错误信息"
              prop="errorMsg">
              <template slot-scope="scope">
                <p class="line-feed">
                  {{ scope.row.errorMsg }}
                </p>
              </template>
            </el-table-column>
        </el-table>
        <h4 class="document-sub-title">API工具</h4>
          <el-row>
            <el-button disabled type="primary">API测试
            </el-button>
            <el-alert
              :closable="false"
              style="margin-bottom: 20px;margin-top: 20px"
              title="生产环境API测试不可用，请移步测试环境（测试环境地址：http://test-lcp.jdl.com）"
              type="error"
              />
          </el-row>
        </div>
    </div>
  </div>
</template>

<script>
import apiStore from "@/api/intranet/apiStore/index";
export default {
  props: {
    url: String,
    domainId: Number,
    domainCode: String,
    inParamList: Array,
    outParamList: Array,
    errorCodeList: Array,
  },
  data() {
    return {
      requestAddressTableData: [],
      publicParamsTableData: [],
      inParamsTableData: [],
      outParamsTableData: [],
      errorCodeTableData: [],
    };
  },
  methods: {
    formatTableColumnDescriptionInnerHtml(value) {
      value = value || "";
      value = value
        .split("\n")
        .map((item) =>
          item
            ? `<div>${item
                .replace(/\s/g, "&nbsp;")
                .replace(
                  /<a&nbsp;data-selection/g,
                  `<a style="color:#3c6ef0;" class="remark-anchor" target='__blank' href`
                )}</div>`
            : "<div><br></div>"
        )
        .join("");
      return value;
    },
    initRequestAddressTableData() {
      if (window.env.baseEnv === "uat" || window.env.baseEnv === "prod") {
        this.requestAddressTableData.push({
          environment: "线上环境",
          address: "https://api.jdl.com",
        });
        this.requestAddressTableData.push({
          environment: "uat环境",
          address: "https://uat-api.jdl.com",
        });
      }
      if (window.env.baseEnv === "devtest" || window.env.baseEnv === "lEnv") {
        this.requestAddressTableData.push({
          environment: "测试环境",
          address: "https://test-api.jdl.com",
        });
      }
    },
    initPublicParamsTableData() {
      this.publicParamsTableData.push({
        name: "LOP-DN",
        type: "String",
        required: "1",
        remark: this.domainCode,
      });
      this.publicParamsTableData.push({
        name: "app_key",
        type: "String",
        required: "1",
        remark: "调用方应用的app_key",
      });
      //获得http的安全配置插件
      this.getSecurityConfiguration();
    },
    async getSecurityConfiguration() {
      let domainId = this.domainId;
      let templateCode = "hmac-auth";
      const params = [{ domainId: domainId, templateCode: templateCode }];
      const response = await apiStore
        .getSecurityConfiguration(params)
        .catch((error) => {
          const { message } = error.data;
          this.$message.error(`${message}`);
        });
      if (response) {
        const { data } = response.data;
        if (data !== null && data.length > 0) {
          let json = JSON.parse(data[0].templateConfig);
          this.addSecurityParams(json);
        }
        console.log("data", data);
      }
    },
    addSecurityParams(templateConfig) {
      this.publicParamsTableData.push({
        name: "sign",
        type: "String",
        required: "1",
        remark: "签名",
      });
      for (let index = 0; index < templateConfig.auth.rules.length; index++) {
        if (templateConfig.auth.rules[index].type === 2) {
          if (templateConfig.auth.rules[index].name === "timestamp") {
            this.publicParamsTableData.push({
              name: "timestamp",
              type: "String",
              required: "1",
              remark:
                "调用时的系统时间（注意：一定要用GMT的时间，例如：Tue, 16 Jan 2018 08:56:59 GMT）",
            });
            continue;
          }
          if (templateConfig.auth.rules[index].name === "v") {
            this.publicParamsTableData.push({
              name: "v",
              type: "String",
              required: "1",
              remark: "API协议版本，可选值:2.0",
            });
            continue;
          }
        }
      }
    },
  },
  mounted() {
    console.log("this.inParamList", this.inParamList);
    this.initRequestAddressTableData();
    this.initPublicParamsTableData();
    this.inParamsTableData = this.inParamList;
    this.outParamsTableData = this.outParamList;
    this.errorCodeTableData = this.errorCodeList;
  },
};
</script>

<style lang="scss" scoped>
.line-feed {
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
