<<template>
  <div class="http-list">
      <el-row>
        <el-col :span="22">
          <div style="margin-bottom: 15px">
            <el-row>
              <el-col :span="3">
                <el-select v-model="interfaceType"
                style="width: 130px; margin-right: 0px"
                @change="updateInterfaceType">
                  <el-option
                    v-for="item in interfaceTypeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="3">
                <el-select
                  v-model="listQuery.categoryId"
                  style="width: 130px; margin-right: 0px"
                  @change="paginationChange({page:1,limit:listQuery.pageSize})"
                >
                  <el-option label="全部分类" value=""></el-option>
                  <el-option
                    v-for="category in categoryList"
                    :key="category.id"
                    :label="category.name"
                    :value="category.id"
                  ></el-option>
                </el-select>
              </el-col>
               <el-col :span="3">
                <el-select v-model="listQuery.domainCode"
                  style="width: 130px; margin-right: 0px"
                  filterable
                  remote
                  placeholder="输入分组英文名称"
                  :remote-method="queryDomainCodeOption"
                  :loading="selectLoading">
                  <el-option
                    v-for="item in domainCodeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="15">
                <el-input
                  placeholder="请输入内容"
                  v-model.trim="listQuery.keyWords"
                  size="middle"
                  @keyup.enter.native="paginationChange({page:1,limit:listQuery.pageSize})"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    :clstag="clstag('apiStoreSearch_1597811877606|1', '')"
                    @click="paginationChange({page:1,limit:listQuery.pageSize})"
                  ></el-button>
                </el-input>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>

      <div v-if="listQuery.total">
        <el-row>
          <el-table
            v-loading="loading"
            :data="tableData"
            class="my-table mb2"
          >
            <el-table-column  label="分组英文名称"
              prop="domainCode"
              show-overflow-tooltip
              min-width="150px">
            </el-table-column>
            <el-table-column
              label="URI"
              prop="url"
              show-overflow-tooltip
              min-width="150px"
            >
              <template slot-scope="scope">
                <a
                  href="javascript:void(0)"
                  class="link"
                  @click="httpApiDetail(scope.row.id)"
                  style="color: #3c6ef0"
                >
                  {{ scope.row.url}}
                </a>
              </template>
            </el-table-column>
            <el-table-column
              label="API中文名称"
              prop="name"
              show-overflow-tooltip
              min-width="180px"
            >
            </el-table-column>
            <el-table-column
              label="所属分类"
              prop="categoryName"
              show-overflow-tooltip
              min-width="100px"
            >
            </el-table-column>
            <el-table-column
              label="描述"
              prop="remark"
              show-overflow-tooltip
              min-width="250px"
            >
            <template slot-scope="scope">
              <p>{{ scope.row.remark }}</p>
            </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row>
          <el-col :span="24">
            <pagination
              id="testPagination"
              :total="listQuery.total"
              :pageSizes="listQuery.pageSizes"
              style="float: right"
              :currentPage.sync="listQuery.page"
              :pageSize.sync="listQuery.pageSize"
              :reloadTableData="queryHttpApi"
            />
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <div style="margin-top: 0px; text-align: center">
          <img src="@/assets/img/noData.png" />
        </div>
        <div class="noDataMessage">抱歉，没有查询到结果～</div>
      </div>
 </div>
</template>

<script>
import apiStore from "@/api/intranet/apiStore/index";
import Pagination from "@/components/Pagination";
import point from "@/mixins/point";

export default {
  components: { Pagination },
  mixins: [point],
  data() {
    return {
      loading: true,
      env: "",
      categoryList: [],
      interfaceType: 1,
      interfaceTypeOption: [
        {
          value: 0,
          label: "JSF协议接口",
        },
        {
          value: 1,
          label: "HTTP协议接口",
        },
      ],
      tableData: [],
      listQuery: {
        categoryId: "",
        domainCode: null,
        keyWords: null,
        total: 0,
        page: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
      },
      domainCodeOption: [],
      selectLoading: false,
    };
  },
  methods: {
    // 内网-API仓库-查询业务分类列表
    async queryApiCategory() {
      const { page } = this.listQuery;
      const pageSize = 10000;
      const data = [{ page, pageSize }];
      return await apiStore.queryApiCategory(data);
    },

    async queryCategoryList() {
      const { data } = await this.queryApiCategory().catch(() => {
        throw new Error("queryCategoryList queryApiCategory");
      });
      this.categoryList = data;
    },
    updateInterfaceType(value) {
      if (value === 0) {
        this.$emit("updateInterfaceType", 0);
      }
    },
    async queryDomainList(queryStr) {
      const keyWords = queryStr;
      const page = 1;
      const pageSize = 10000;
      const isOnline = 1;
      const params = [
        { page: page, pageSize: pageSize },
        { queryLike: keyWords, isOnline: isOnline },
      ];
      const response = await apiStore
        .getDomainCodeList(params)
        .catch((error) => {
          const { message } = error.data;
          this.$message.error(`${message}`);
        });
      if (response) {
        const data = response.data;
        this.domainCodeOption = data.rows.map((item) => {
          return { value: item.code, label: item.code };
        });
        this.selectLoading = false;
      }
    },
    async queryHttpApi() {
      this.loading = true;
      const page = this.listQuery.page;
      const pageSize = this.listQuery.pageSize;
      let categoryId;
      if (this.listQuery.categoryId === "") {
        categoryId = null;
      } else {
        categoryId = this.listQuery.categoryId;
      }
      const domainCode = this.listQuery.domainCode;
      const keyWords = this.listQuery.keyWords;

      const gwParams = [
        { page, pageSize },
        { categoryId, domainCode, keyWords,  sceneType: 1},
      ];
      const response = await apiStore
        .getHttpApiList(gwParams)
        .catch((error) => {
          const { message } = error.data;
          this.$message.error(`${message}`);
          this.loading = false;
        });
      if (response) {
        const { data } = response;
        const { total, rows } = data;
        this.listQuery.total = total;
        this.tableData = rows;
        this.loading = false;
      }
    },
    paginationChange(p) {
      this.listQuery.page = p.page;
      this.listQuery.pageSize = p.limit;
      this.queryHttpApi();
    },
    queryDomainCodeOption(queryStr) {
      if (queryStr !== "") {
        this.selectLoading = true;
        this.queryDomainList(queryStr);
      } else {
      }
    },
    httpApiDetail(id) {
      this.$router.push({
        path: "/httpApiDetail",
        query: { id: id },
      });
    },
  },
  mounted() {
    this.env = window.env.baseEnv;
    if (this.$route.query.domainCode !== null) {
      this.listQuery.domainCode = this.$route.query.domainCode;
    }
    this.queryCategoryList();
    this.queryHttpApi();
  },
};
</script>

<style lang="scss" scoped>
.http-list {
  .noDataMessage {
    width: 100%;
    margin: 0 auto;
    margin-top: 0px;
    text-align: center;
    vertical-align: middle;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  ::v-deep .el-input--suffix .el-input__inner {
    padding-right: 0px;
  }
}
</style>
