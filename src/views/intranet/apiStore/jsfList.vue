<<template>
  <div class="jsf-list">
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
                  v-model="listQuery.businessCategoryId"
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
              <el-col :span="18">
                <el-input
                  placeholder="请输入内容"
                  v-model.trim="listQuery.searchKeyWord"
                  size="middle"
                  @keyup.enter.native="search({page:1,limit:listQuery.pageSize})"
                >
                  <el-select
                    v-model="listQuery.searchType"
                    slot="prepend"
                    style="width: 90px"
                  >
                    <el-option label="接口" :value="1"></el-option>
                    <el-option label="方法" :value="3"></el-option>
                  </el-select>
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    :clstag="clstag('apiStoreSearch_1597811877606|1', '')"
                    @click="search({page:1,limit:listQuery.pageSize})"
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
            :row-class-name="getRowClass"
            :default-expand-all="isExpand"
            :key="tableKey"
            class="my-table mb2"
          >
            <el-table-column type="expand" min-width="10%">
              <template slot-scope="props">
                <el-table :data="props.row.apiMethodList" class="">
                  <el-table-column min-width="20%"> </el-table-column>
                  <el-table-column prop="api" label="方法" min-width="35%">
                    <template slot-scope="scope">
                      <a
                        href="javascript:void(0)"
                        class="link"
                        style="color: #3c6ef0"
                        @click="
                          apiMethod(
                            scope.row.qualifiedName,
                            scope.row.id,
                            scope.row.name
                          )
                        "
                        >{{ scope.row.name }}</a
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="cnName"
                    label=""
                    show-overflow-tooltip
                    min-width=""
                  >
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    label=""
                    show-overflow-tooltip
                    min-width=""
                  >
                  <template slot-scope="scope">
                    <p class="line-feed">{{ scope.row.remark }}</p>
                  </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              label="接口"
              prop="api"
              show-overflow-tooltip
              min-width="150px"
            >
              <template slot-scope="scope">
                <a
                  href="javascript:void(0)"
                  class="link"
                  @click="apiMethodList(scope.row.qualifiedName)"
                  style="color: #3c6ef0"
                >
                  {{ parserClassName(scope.row.qualifiedName) }}
                </a>
              </template>
            </el-table-column>
            <el-table-column
              label="中文名称"
              prop="cnName"
              show-overflow-tooltip
              min-width="180px"
            >
            </el-table-column>
            <el-table-column
              label="所属分类"
              prop="businessCategoryName"
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
              <p class="line-feed">{{ scope.row.remark }}</p>
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
              :currentPage.sync="listQuery.pageNumb"
              :pageSize.sync="listQuery.pageSize"
              :reloadTableData="queryApi"
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
      env: "",
      tableKey: "myTable",
      isExpand: false,
      categoryList: [],
      listQuery: {
        businessCategoryId: "",
        searchType: 1,
        searchKeyWord: "",
        total: 0,
        pageNumb: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
      },
      tableData: [],
      className: "",
      loading: true,
      interfaceType: 0,
      interfaceTypeOption: [
        {
          value: 0,
          label: "JSF服务API",
        },
        {
          value: 1,
          label: "HTTP服务API",
        },
      ],
    };
  },
  computed: {
    parserClassName: function () {
      return function (qualifiedName) {
        const splits = qualifiedName.split(["."]);
        const index = splits.length - 1;
        const className = splits[index];
        return className;
      };
    },
  },
  methods: {
    // 内网-API仓库-查询业务分类列表
    async queryApiCategory() {
      const { pageNumb } = this.listQuery;
      const pageSize = 10000;
      const data = [{ pageNumb, pageSize }];
      return await apiStore.queryApiCategory(data);
    },

    async queryCategoryList() {
      const { data } = await this.queryApiCategory().catch(() => {
        throw new Error("queryCategoryList queryApiCategory");
      });
      this.categoryList = data;
    },
    // 内网-API仓库-分页查询API表格数据
    async queryApiReleaseByCondition() {
      const pageNumb = this.listQuery.pageNumb;
      const pageSize = this.listQuery.pageSize;
      const businessCategoryId = this.listQuery.businessCategoryId;
      const searchType = this.listQuery.searchType;
      const searchKeyWord = this.listQuery.searchKeyWord;
      const data = [
        {
          pageNumb,
          pageSize,
        },
        {
          businessCategoryId,
          searchType,
          searchKeyWord,
          sceneType: 1,
        },
      ];
      return await apiStore.queryApiReleaseByCondition(data).catch((error) => {
        const { message } = error;
        message && this.$message.error(message);
        throw new Error("queryApiReleaseByCondition");
      });
    },

    search(p) {
      this.paginationChange(p);
      this.tableKey = "myTable" + Date.parse(new Date());
      if (this.listQuery.searchType === 2) {
        if (this.listQuery.searchKeyWord !== "") {
          this.isExpand = true;
        } else {
          this.isExpand = false;
        }
      } else {
        this.isExpand = false;
      }
    },
    async queryApi() {
      this.loading = true;
      const response = await this.queryApiReleaseByCondition().catch(() => {
        this.loading = false;
        throw new Error("queryApi queryApiReleaseByCondition");
      });
      const { data } = response;
      const { total, list } = data;
      this.listQuery.total = total;
      this.tableData = list;
      this.loading = false;
    },
    paginationChange(p) {
      this.listQuery.pageNumb = p.page;
      this.listQuery.pageSize = p.limit;
      this.queryApi();
    },
    apiMethodList(qualifiedName) {
      this.$router.push({
        path: "/apiMethodList",
        query: { qualifiedName: qualifiedName },
      });
    },
    apiMethod(qualifiedName, id, methodName) {
      this.$router.push({
        path: "/apiMethodList",
        query: { qualifiedName: qualifiedName, id: id, methodName: methodName },
      });
    },
    getRowClass(row, index) {
      if (row.row.apiMethodList != null) {
        return "";
      } else {
        return "hide-expand";
      }
    },
    updateInterfaceType(value) {
      if (value === 1) {
        this.$emit("updateInterfaceType", 1);
      }
    },
  },
  created() {
    if (this.$route.query.type) {
      this.listQuery.searchType = parseInt(this.$route.query.type);
      console.log("搜索类型：" + this.listQuery.searchType);
    }
    if (this.$route.query.methodName) {
      this.listQuery.searchKeyWord = this.$route.query.methodName;
      console.log("搜索关键字：" + this.listQuery.searchKeyWord);
      this.tableKey = "myTable" + Date.parse(new Date());
      if (this.listQuery.searchType === 2) {
        if (this.listQuery.searchKeyWord !== "") {
          this.isExpand = true;
        } else {
          this.isExpand = false;
        }
      } else {
        this.isExpand = false;
      }
    }
    if (this.$route.query.qualifiedName) {
      this.listQuery.searchKeyWord = this.$route.query.qualifiedName;
      console.log("搜索关键字：" + this.listQuery.searchKeyWord);
    }
  },
  mounted() {
    const keyword = this.$route.query.keyword;
    if (keyword) {
      this.listQuery.searchKeyWord = keyword;
    }
    this.env = window.env.baseEnv;
    console.log(this.env);
    this.queryCategoryList();
    this.queryApi();
  },
};
</script>

<style lang="scss" scoped>
.jsf-list {
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

  .hide-expand .el-table__expand-column .el-icon {
    visibility: hidden;
  }
}
.line-feed {
  white-space: pre-wrap;
  word-break: break-all
}
</style>