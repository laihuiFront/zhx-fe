<template>
  <div
    id="xhjl"
    class="page-wraper-sub"
    v-loading="loading2"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="正在导入中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.7)"
  >
    <el-dialog
      :title="detailTitle"
      class="dialog-wrap"
      :visible.sync="detailVisible"
      :close-on-click-modal="false"
      width="90%"
    >
      <case-detail :id="detailId" ref="detail"></case-detail>
    </el-dialog>
    <el-dialog title="同意协催" :visible.sync="dialogVisible" width="30%">
      <el-input
        type="textarea"
        :autosize="{ minRows: 6, maxRows: 14 }"
        placeholder="请输入内容"
        v-model="textarea3"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogVisible = false;
            xcHandle();
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-row :gutter="24">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-form :inline="true" ref="form" :model="form" label-width="80px">
            <el-form-item prop="val0">
              <el-select
                v-model="form.val0"
                placeholder="请选择委托方"
                filterable
                collapse-tags
                multiple
                clearable
              >
                <el-option
                  v-for="item in val0_data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="val1">
              <el-select
                v-model="form.val1"
                multiple
                filterable
                remote
                placeholder="请输入批次号"
                :remote-method="querySearch"
              >
                <el-option
                  v-for="item in val1_data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="val2">
              <el-date-picker
                v-model="form.val2"
                value-format="yyyy-MM-dd"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="申请开始日期"
                end-placeholder="申请结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="val3">
              <el-input
                v-model="form.val3"
                placeholder="个案序列号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="val4">
              <el-cascader
                :options="val4_data"
                clearable
                placeholder="催收区域"
                v-model="form.val4"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item prop="val5">
              <el-input
                v-model="form.val5"
                placeholder="姓名"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="val7">
              <el-input
                v-model="form.val7"
                placeholder="委案金额下限"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="val6">
              <el-input
                v-model="form.val6"
                placeholder="委案金额上限"
                clearable
              ></el-input>
            </el-form-item>

            <el-form-item prop="val8">
              <el-input
                v-model="form.val8"
                placeholder="申请人"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="val9">
              <el-select v-model="form.val9" placeholder="信函模板" clearable>
                <el-option
                  v-for="item in val9_data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="val10">
              <el-select v-model="form.val10" placeholder="案件状态" clearable>
                <el-option
                  v-for="item in val10_data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="searchHandle"
                >查询</el-button
              >
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-refresh"
                @click="resetForm('form')"
                >重置</el-button
              >
            </el-form-item>
            <el-form-item>
              <el-dropdown
                @command="exportXh"
                v-has="'导出信函'"
                v-dropdown-patch
              >
                <el-button type="primary">导出信函<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in moduleList"
                    :key="index"
                    :command="item.id"
                    >{{ item.title }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="dialogVisibleCase=true;">导出查询结果</el-button>
            </el-form-item>
            <el-form-item>
              <el-upload
                class="upload-demo"
                :action="action"
                :headers="headers"
                :show-file-list="false"
                accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.xls,.xlsx"
                :multiple="false"
                :on-error="
                  () => {
                    this.fullscreenLoading = false;
                          this.loading2 = false;

                  }
                "
                :on-progress="
                  () => {
                    this.fullscreenLoading = true;
                          this.loading2 = true;

                  }
                "
                :on-success="fileStatu"
              >
                <el-button class="daoru" type="primary" v-has="'导入信函记录'"
                  >导入信函记录</el-button
                >
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-dialog
        title="导出查询结果"
        :visible.sync="dialogVisibleCase"
        width="30%"
      >
        <el-row :gutter="20">
          <el-col :span="10"><div class="grid-content bg-purple">
            <el-radio label="1" @change='exportCx(1)'>按查询条件全部导出</el-radio>
          </div></el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">
              <el-radio label="2" @change='exportCx(2)'>按查询条件导出当前分页</el-radio>
            </div></el-col>
        </el-row>
      </el-dialog>
      <el-col :span="22">
        <div class="grid-content bg-purple">
          <el-form :inline="true">
            <el-form-item>
              <el-button type="primary" v-has="'撤销协催'" @click="cxHandle"
                >撤销信函</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-table
      v-loading="tableLoad"
      class="table-wrap"
      height="1"
      ref="multipleTable"
      :data="tableData"
      border
      stripe
      style="width: 100%"
      :cell-style="{ whiteSpace: 'nowrap' }"
      @selection-change="handleSelectionChange"
      @sort-change="sortHandle"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        label="个案序列号"
        prop="seqno"
        sortable="custom"
        :sort-orders="['ascending', 'descending']"
        min-width="120"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            style="text-decoration: underline"
            type="text"
            size="small"
            @click="showCase(scope.row)"
            >{{ scope.row.seqno }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in tableCol_data"
        :key="index"
        v-bind="item"
        sortable="custom"
        min-width="100"
        :sort-orders="['ascending', 'descending']"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <!--<el-table-column label="操作" show-overflow-tooltip>-->
      <!--<template slot-scope="scope">-->
      <!--<el-button type="text" size="small">导入</el-button>-->
      <!--<el-button type="text" size="small">下载</el-button>-->
      <!--<el-button type="text" size="small">编辑</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <el-pagination
      class="pagination-wrap"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paginationData.currentPage"
      :page-sizes="[100, 500, 2000, 10000, 1000000]"
      :page-size="paginationData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="paginationData.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import {
  pageMyCase,
  getEnum,
  markColor,
  addSynergy,
  batchNo,
  addCollectStatus
} from "@/common/js/collect-my-case";
import {
  list as moduleList,
  confirmSynergy,
  cancelLetter,
  pageDataLetterInfo,
  confirmLetter,
  dcxh,
  dccxjg,
  dccxjgThis,
  dccxjgInfo,
  dccxjgInfoThis
} from "@/common/js/synergistic-letter-application.js";
import CaseDetail from "@/views/data-manage/detail";
import { baseURL } from "@/common/js/request.js";

export default {
  name: "synergisticLetterApplication2",
  components: {
    CaseDetail
  },
  data() {
    return {
      dialogVisibleCase:false,
      loading2: false,
      fullscreenLoading: false,
      tableLoad: false,
      ImportdialogVisible: false,
      ImportMsg: "",
      paginationData: {
        pageSize: 10,
        total: 0,
        currentPage: 1
      },
      dialogVisible: false,
      textarea3: "",
      activeName: "tab1",
      //表格数据
      tableData: [],
      fetchData: {},
      detailId: -1,
      form: {
        val0: null, //委托方
        val1: null, //批次号
        val2: [], //申请时间
        val3: "", //个案序列号
        val4: null, //地区
        val5: "", //姓名
        val6: "", //委案金额上限
        val7: "", //委案金额下限
        val8: null, //申请人
        val9: null, //信函模板
        val10: null //案件状态
      },
      val0_data: [], //委托方
      val1_data: [], //批次号
      val4_data: [], //地区
      val9_data: [], //信函模板
      // 未退案0/正常1/暂停2/关档3/退档4/全部5
      val10_data: [
        { label: "全部", value: "" },
        { label: "未退案", value: 0 },
        { label: "正常", value: 1 },
        { label: "暂停", value: 2 },
        { label: "关档", value: 3 },
        { label: "退档", value: 4 }
      ],
      val19_data: [{ label: "是", value: 1 }, { label: "否", value: 0 }],
      // collectStatusMsg 催收状态
      // seqNo  个案序列号
      // name  姓名
      // caseAmt  委案金额
      // repayAmt 还款金额
      // address 地址
      // times 次数
      // applyContext 申请内容
      // addressType 地址类型
      // module 模板
      // relationer 联系人
      // applyDate  申请时间
      // applyer  申请人
      // synergyDate 协催时间
      // synergyer 协催人
      // synergyResult  协催结果
      tableCol_data: [
        {
          prop: "id",
          label: "ID"
        },
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "collectStatusMsg",
          label: "催收状态"
        },
        {
          prop: "caseAmtMsg",
          label: "委案金额"
        },
        {
          prop: "repayAmtMsg",
          label: "还款金额"
        },
        {
          prop: "address",
          label: "地址"
        },
        {
          prop: "times",
          label: "次数"
        },
        {
          prop: "address",
          label: "申请内容"
        },
        {
          prop: "applyContext",
          label: "地址"
        },
        {
          prop: "module",
          label: "模板"
        },
        {
          prop: "relationer",
          label: "联系人"
        },
        {
          prop: "applyDate",
          label: "申请时间"
        },
        {
          prop: "applyer",
          label: "申请人"
        },
        {
          prop: "synergyDate",
          label: "协催时间"
        },
        {
          prop: "synergyer",
          label: "协催人"
        },
        {
          prop: "synergyResult",
          label: "协催结果"
        }
      ],
      multipleSelection: [],
      sort: {
        orderBy: "id",
        sort: "desc"
      },
      detailVisible: false,
      detailTitle: "案件详情",
      action: baseURL + "/letter/import",
      headers: { Authorization: localStorage.token },
      moduleList: []
    };
  },
  computed: {
    realFetchFormData() {
      // val0: null, //委托方
      //   val1: null, //批次号
      //   val2: [], //申请时间
      //   val3: "", //个案序列号
      //   val4: null, //地区
      //   val5: "", //姓名
      //   val6: "", //委案金额上限
      //   val7: "", //委案金额下限
      //   val8: null, //申请人
      //   val9: null, //信函模板
      //   val10: null, //案件状态
      let {
        val0: clients,
        val1: batchNos,
        val2,
        val3: seqno,
        val4: collectArea,
        val5: name,
        val6: caseAmtStart,
        val7: caseAmtEnd,
        val8: applyer,
        val9: module,
        val10: caseStatus
      } = this.form;
      return {
        clients,
        batchNos,
        seqno,
        collectArea: collectArea + "" ? collectArea : null,
        name,
        caseAmtStart,
        caseAmtEnd,
        applyer,
        module,
        caseStatus,
        applyDateStart: (!!val2 && val2[0]) || "",
        applyDateEnd: (!!val2 && val2[1]) || "",
        pageNum: this.paginationData.currentPage,
        pageSize: this.paginationData.pageSize,
        orderBy: this.sort.orderBy,
        sort: this.sort.sort,
        status: 1
      };
    }
  },
  watch: {
    form: {
      handler(newObj) {
        console.log(Object.values(newObj));
      },
      deep: true
    }
  },
  created() {
    this.init();
  },
  methods: {
    fileStatu(res) {
      if (res.code == 100) {
        this.$message({
          type: "success",
          message: "导入成功"
        });
        this.getMainData();
      } else if (res.code == 800) {
        this.ImportdialogVisible = true;
        this.ImportMsg = res.msg;
      } else {
        this.$message({
          type: "error",
          message: res.msg
        });
      }
      this.loading2 = false;

      this.fullscreenLoading = false;
    },
    exportXh(command) {
      if (this.multipleSelection.length == 0) {
        this.$message.warning("至少选择一条数据");
        return;
      }else if (this.multipleSelection.length > 1) {
        this.$message.warning("只能选择一条数据");
        return;
      }
      let {id,caseId} = this.multipleSelection[0];
      dcxh({ module: command, id ,caseId});
    },
    exportCx(command) {
      this.fullscreenLoading = true;

      if (command == 1) {
        dccxjgInfo(this.realFetchFormData).then(()=>{
          this.fullscreenLoading = false;
        });
      } else {
        dccxjgInfoThis(this.realFetchFormData).then(()=>{
          this.fullscreenLoading = false;
        });
      }
    },
    showCase(row) {
      let id = row.id;
      let name = row.name;
      let seqNo = row.seqno;
      this.$router.push({
        path: "case-detail",
        query: {
          id,
          name,
          seqNo
        }
      });
    },
    sortHandle({ prop, order }) {
      this.sort.sort = order.replace("ending", "");
      this.sort.orderBy = prop;
      this.getMainData();
    },
    //查询批次号
    querySearch(queryString) {
      batchNo({ batchNo: queryString }).then(data => {
        this.val1_data = data.reduce((acc, item) => {
          acc.push({
            value: item.batchNo
          });
          return acc;
        }, []);
      });
    },
    handleCurrentChange(currentPage) {
      this.paginationData.currentPage = currentPage;
      this.getMainData();
    },
    handleSizeChange(pageSize) {
      this.paginationData.pageSize = pageSize;
      this.getMainData();
    },
    //查询按钮
    searchHandle() {
      this.getMainData();
    },
    colorHandle(color) {
      let data = this.multipleSelection.reduce((acc, item) => {
        acc.push({
          id: item.id,
          color
        });
        return acc;
      }, []);
      markColor(data).then(data => {
        this.getMainData();
      });
    },
    cxHandle() {
      if (this.multipleSelection.length == 0) {
        return;
      }
      let data = this.multipleSelection.reduce((acc, item) => {
        acc.push({
          id: item.id
        });
        return acc;
      }, []);

      cancelLetter(data).then(() => {
        this.$message({
          message: "提交成功",
          type: "success"
        });
      });
    },
    //同意协催
    qrHandle() {
      if (this.multipleSelection.length == 0) {
        return;
      }
      let data = this.multipleSelection.reduce((acc, item) => {
        acc.push({
          id: item.id
        });
        return acc;
      }, []);

      confirmLetter(data).then(() => {
        this.$message({
          message: "提交成功",
          type: "success"
        });
      });
    },
    getMainData() {
      this.tableLoad = true;
      pageDataLetterInfo(this.realFetchFormData).then(data => {
        if (!data) {
          data = { total: 9, list: [] };
        }
        this.fetchData = data;
        this.paginationData.total = data.total;
        this.tableData = data.list.map(item => {
          return Object.assign(item, { "class-name": `color_${item.color}` });
        });
        this.tableLoad = false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getMainData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    transform(data, obj = [["name", "label"], ["id", "value"]]) {
      return data.reduce((acc, item) => {
        for (let [key, tarKey] of obj) {
          item[tarKey] = item[key];
        }
        acc.push(item);
        return acc;
      }, []);
    },
    getEnumHandle(name, target, transData) {
      getEnum({ name }).then(data => {
        this[target] = this.transform(data, transData);
      });
    },
    init() {
      this.getMainData();
      moduleList().then(data => {
        this.val9_data = this.transform(data, [
          ["id", "value"],
          ["title", "label"]
        ]);
        this.moduleList = data;
      });
      // val0: null, //委托方
      //   val1: null, //批次号
      //   val2: [], //申请时间
      //   val3: "", //个案序列号
      //   val4: null, //地区
      //   val5: "", //姓名
      //   val6: "", //委案金额上限
      //   val7: "", //委案金额下限
      //   val8: null, //申请人
      //   val9: null, //信函模板
      //   val10: null, //案件状态
      this.getEnumHandle("委托方", "val0_data");
      this.getEnumHandle("地区", "val4_data");
    }
  }
};
</script>

<style lang="scss">
#xhjl {
  height: calc(100% - 21px);
  .el-table {
    height: calc(100% - 143px);
  }
  .upload-demo {
    padding-bottom: 20px;
    .el-upload {
      float: right;
    }
    .el-upload:after {
      content: " ";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
  }
}
#synergistic-letter-application {
}
</style>
