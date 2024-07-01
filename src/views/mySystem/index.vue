<template>
  <div class="my-wrap my-pd">
    <div class="my-column">
      <h3 class="my-column-title">
        <span class="right-tip">{{ $t("mySystem.index.5iw5xp1zepc0") }}</span
        >{{ $t("mySystem.index.5iw5xp1zepc1") }}
      </h3>
      <el-row>
        <el-table
          :data="tableData"
          stripe
          :row-class-name="rowClassName"
          v-loading="loading"
          :element-loading-text="$t('mySystem.index.5iw5xp1zffk0')"
          element-loading-spinner="el-icon-loading"
        >
          <el-table-column
            prop="number"
            :label="$t('mySystem.index.5iw5xp1zfks0')"
            width="50"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="systemId"
            :label="$t('mySystem.index.5iw5xp1zfo00')"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{ scope.row.systemId }}</template>
          </el-table-column>
          <el-table-column
            prop="systemName"
            :label="$t('mySystem.index.5iw5xp1zfrc0')"
            width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="schemeType"
            :label="$t('mySystem.index.5iw5xp1zfuo0')"
            width="100"
          >
            <template scope="scope">
              <span>{{
                scope.row.schemeType == 0
                  ? $t("mySystem.index.5iw5xp1zfxs0")
                  : ""
              }}</span>
              <span>{{
                scope.row.schemeType == 1
                  ? $t("mySystem.index.5iw5xp1zg100")
                  : ""
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="limitNum"
            :label="$t('mySystem.index.5iw5xp1zg4g0')"
            width="80"
            align="center"
          >
            <template scope="scope">
              <span>{{ scope.row.limitNum }}</span>
              <span>{{
                scope.row.limitType == 1
                  ? $t("mySystem.index.5iw5xp1zg7k0")
                  : ""
              }}</span>
              <span>{{
                scope.row.limitType == 2
                  ? $t("mySystem.index.5iw5xp1zgao0")
                  : ""
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            :label="$t('mySystem.index.5iw5xp1zgds0')"
            width="80"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status === 1" class="status1">{{
                $t("mySystem.index.5iw5xp1zggs0")
              }}</span>
              <span v-if="scope.row.status === 2" class="status4">{{
                $t("mySystem.index.5iw5xp1zgjs0")
              }}</span>
              <span v-if="scope.row.status === 3" class="status2">{{
                $t("mySystem.index.5iw5xp1zgnk0")
              }}</span>
              <span v-if="scope.row.status === 4" class="status3">{{
                $t("mySystem.index.5iw5xp1zgqc0")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="applyTime"
            :label="$t('mySystem.index.5iw5xp1zgts0')"
            width="155"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="statusUpdateTime"
            :label="$t('mySystem.index.5iw5xp1zgwk0')"
            width="155"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="url"
            :label="$t('mySystem.index.5iw5xp1zgzc0')"
            width="170"
          >
            <template slot-scope="scope">
              <p class="url-box" v-if="scope.row.status === 3 && scope.row.url">
                <el-tooltip
                  effect="dark"
                  :content="scope.row.url"
                  placement="top"
                >
                  <span>{{ scope.row.url }}</span>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="$t('mySystem.index.5iw5xp1zh2s0')"
                  placement="top"
                >
                  <a
                    href="javascript:void(0)"
                    v-clipboard:copy="scope.row.url"
                    v-clipboard:success="copySuccess"
                    v-clipboard:error="copyError"
                  >
                    <i class="el-icon-document-copy" />
                  </a>
                </el-tooltip>
              </p>
              <p class="url-box" v-else>-</p>
            </template>
          </el-table-column>
          <el-table-column :label="$t('mySystem.index.5iw5xp1zh780')">
            <template slot-scope="scope">
              <el-button
                type="text"
                v-if="scope.row.status === 3 && scope.row.url"
                @click="goSystem(scope.row.url)"
                >{{ $t("mySystem.index.5iw5xp1zh781") }}
              </el-button>
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

    querySystem() {
      const url = "/wms/queryList";
      request({
        url: url,
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
          pageSize: this.listQuery.pageSize,
          pageNum: this.listQuery.pageNum,
        }),
      })
        .then((rsp) => {
          this.loading = false;
          this.listQuery.total = rsp.data.total;
          this.tableData = rsp.data.list;
        })
        .catch((e) => {
          this.loading = false;
          console.log(e);
        });
    },

    paginationChange(p) {
      this.listQuery.pageNum = p.page;
      this.listQuery.pageSize = p.limit;
      this.querySystem();
    },

    copySuccess() {
      this.$message({
        message: this.$t("mySystem.index.5iw5xp1zha00"),
        type: "success",
      });
    },
    copyError() {
      this.$message({
        message: this.$t("mySystem.index.5iw5xp1zhdc0"),
        type: "success",
      });
    },

    rowClassName({ row, rowIndex }) {
      row.number = rowIndex + 1;
    },

    goSystem(val) {
      const reg = /^([http|https]*?:\/{2})/;
      reg.test(val)
        ? window.open(val, "_blank")
        : window.open("http://" + val, "_blank");
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
</style>
