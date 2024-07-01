<template>
  <div class="my-wrap my-pd">
    <div class="my-column">
      <h3 class="my-column-title">
        <span class="right-tip"
          >提示：系统创建需要一定的时间，请您耐心等待。</span
        >我的系统
      </h3>
      <el-row>
        <el-table
          :data="tableData"
          stripe
          :row-class-name="rowClassName"
          v-loading="loading"
          element-loading-text="加载中"
          element-loading-spinner="el-icon-loading"
          :default-sort="{ prop: 'applyTime', order: 'descending' }"
        >
          <el-table-column prop="number" label="序号" width="50" align="center">
          </el-table-column>
          <el-table-column
            prop="code"
            label="系统ID"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="productName"
            label="系统名称"
            width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="versionName" label="订阅版本" width="100">
          </el-table-column>
          <el-table-column
            prop="timeLength"
            label="订阅时长"
            width="80"
            align="center"
          >
            <template scope="scope">
              <span>{{ scope.row.timeLength }}</span>
              <span>年</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 1" class="status1">审核中</span>
              <span v-if="scope.row.status === 2" class="status2"
                >申请成功</span
              >
              <span v-if="scope.row.status === 3" class="status3">已驳回</span>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            prop="applyTime"
            label="系统申请时间"
            width="155"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ formatTime(scope.row.applyTime) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="版本有效期"
            width="155"
            show-overflow-tooltip
          >
            <template v-if="scope.row.status === 2" slot-scope="scope">
              {{ formatTime(scope.row.endTime) }}
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-dropdown
                @command="handleCommand"
                v-if="scope.row.status === 2"
              >
                <span class="el-dropdown-link">
                  进入系统<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-if="env === 'lEnv' || env === 'devtest'"
                    :command="scope.row.domainName"
                    >测试环境</el-dropdown-item
                  >
                  <template v-else-if="env === 'uat' || env === 'prod'">
                    <el-dropdown-item :command="scope.row.uatDomainName"
                      >预发环境</el-dropdown-item
                    >
                    <el-dropdown-item :command="scope.row.domainName"
                      >线上环境</el-dropdown-item
                    >
                  </template>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          id="systemPagination"
          v-show="listQuery.total"
          :total="listQuery.total"
          :pageSizes.sync="listQuery.pageSizes"
          :page.sync="listQuery.pageNum"
          :limit.sync="listQuery.pageSize"
          style="float: right"
          @pagination="paginationChange"
        />
      </el-row>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import Pagination from "@/components/Pagination";
import { UserModule } from "@/store/common/modules/user";
import productApi from "@/api/intranet/product/index";
import parseTime from "@/utils/parseTime.js";
import Cookies from "js-cookie";

export default {
  components: { Pagination },
  data() {
    return {
      listQuery: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
      },
      tableData: [],
      loading: false,
      env: window.env.baseEnv,
    };
  },
  created() {
    this.fetchSystem();
  },

  methods: {
    async fetchSystem() {
      const supplierId = Number(Cookies.get("supplierId"));
      this.loading = true;
      if (supplierId === -1) {
        request({
          url: "/user/saveOutDeveloper",
          method: "get",
        })
          .then((res) => {
            //自动入驻后将supplierId的值存入缓存
            Cookies.set("supplierId", res.data.supplierId);
            UserModule.SET_USER_DEVELOP(res.data.develop);
            this.querySystem();
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
            // Message.info('当前团队信息未知，不可查看我的系统')
          });
      } else {
        this.querySystem();
      }
    },

    // 查询此用户拥有的软件系统
    async querySystem() {
      this.loading = false;

      const result = await productApi.selectProductApplyByUserId();
      console.log(
        "selectProductApplyByUserId 的 result ： ",
        JSON.stringify(result)
      );
      this.tableData = result.data.list;
      this.listQuery.total = result.data.total;
    },

    // 分页查询相关
    paginationChange(p) {
      this.listQuery.pageNum = p.page;
      this.listQuery.pageSize = p.limit;
      this.querySystem();
    },

    copySuccess() {
      this.$message({
        message: "链接复制成功！",
        type: "success",
      });
    },
    copyError() {
      this.$message({
        message: "链接复制失败！",
        type: "success",
      });
    },

    rowClassName({ row, rowIndex }) {
      row.number = rowIndex + 1;
    },

    // 进入系统线上环境和预发环境
    handleCommand(command) {
      const reg = /^([http|https]*?:\/{2})/;
      reg.test(command)
        ? window.open(command, "_blank")
        : window.open("http://" + command, "_blank");
    },

    formatTime(time) {
      return parseTime.timeInTable(time);
    },
  },
};
</script>

<style lang="scss" scoped>
.url-box {
  span {
    display: inline-block;
    max-width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
}

.right-tip {
  float: right;
  font-size: 14px;
  color: rgba(102, 102, 102, 1);
  font-weight: 400;
}

.status1 {
  color: #ffb600;
}

.status3 {
  color: #e1251b;
}

.status2 {
  color: #26a872;
}

.status4 {
  color: #666666;
}
.el-dropdown-link {
  cursor: pointer;
  color: #3c6ef0;
}
</style>
