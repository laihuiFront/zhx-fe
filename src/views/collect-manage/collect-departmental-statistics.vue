<template>
  <div id="collect-repayment-statistics">
    <section class="topDataWp">
      <el-row :gutter="10">
        <el-col :span="4">
          <span class="topSpan">上月还款金额：</span>
          <span>{{ topData.lastPaidMoney }}</span>
        </el-col>
        <el-col :span="4">
          <span class="topSpan">上月承诺还款金额：</span>
          <span>{{ topData.lastRepayAmt }}</span>
        </el-col>
        <el-col :span="5">
          <span class="topSpan">上月待银行查账金额：</span>
          <span>{{ topData.lastBankAmt }}</span>
        </el-col>
        <el-col :span="5">
          <span class="topSpan">上月提成（已还款）：</span>
          <span>{{ topData.lastRepaidAmt }}</span>
        </el-col>
        <el-col :span="6">
          <span class="topSpan">上月提成（待银行查账金额）：</span>
          <span>{{ topData.lastRepaidBankAmt }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top: 15px;">
        <el-col :span="4">
          <span class="topSpan">本月还款金额：</span>
          <span>{{ topData.thisPaidMoney }}</span>
        </el-col>
        <el-col :span="4">
          <span class="topSpan">本月承诺还款金额：</span>
          <span>{{ topData.thisRepayAmt }}</span>
        </el-col>
        <el-col :span="5">
          <span class="topSpan">本月待银行查账金额：</span>
          <span>{{ topData.thisBankAmt }}</span>
        </el-col>
        <el-col :span="5">
          <span class="topSpan">本月提成（已还款）：</span>
          <span>{{ topData.thisRepaidAmt }}</span>
        </el-col>
        <el-col :span="6">
          <span class="topSpan">本月提成（待银行查账金额）：</span>
          <span>{{ topData.thisRepaidBankAmt }}</span>
        </el-col>
      </el-row>
    </section>
    <section class="form">
      <!-- label-width="80px" -->
      <el-form :inline="true" ref="form1" :model="form1"  class="query-wrap queryStyle">
        <el-row>
          <el-form-item label="类型：">
            <el-select
              v-model="form1.val1"
              placeholder="请选择类型"
              @change="modeChange"
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
            <el-form-item prop="val8" label="部门：">
              <el-input v-model="deptName" width="200" @focus="onClickSelectUser" clearable placeholder="请选择部门"></el-input>
            </el-form-item>
          <el-form-item prop="val9" label="催收员：">
            <!--<el-select
              v-model="form1.val9"
              placeholder="请选择催收员"
              filterable
              collapse-tags
              multiple
              clearable
            >
              <el-option
                v-for="item in val9_data"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>-->
            <el-input v-model="form1.odvNameFiter" width="200" @focus="onClickSelectUser3" clearable placeholder="请选择催收员"></el-input>
          </el-form-item>
          <el-form-item prop="val2" label="委托方：">
            <el-select v-model="form1.val2" placeholder="请选择委托方"  collapse-tags multiple clearable>
              <el-option
                v-for="item in val2_data"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="val3" label="批次号：">
            <el-select
              v-model="form1.val3"
              multiple
              filterable
              remote
              placeholder="请输入批次号"
              :remote-method="querySearch">
              <el-option
                v-for="item in val3_data"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="val4" label="逾期账龄：">
            <el-select
              v-model="form1.val4"
              placeholder="请选择逾期账龄"
              collapse-tags
              multiple
              clearable
            >
              <el-option
                v-for="item in val4_data"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-form-item prop="val5" label="承诺还款日期：">
          <el-date-picker
            v-model="form1.val5"
            value-format="yyyy-MM-dd"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="承诺还款日期开始"
            end-placeholder="承诺还款日期结束"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="val6" label="待银行查账日期：">
          <el-date-picker
            v-model="form1.val6"
            value-format="yyyy-MM-dd"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="待银行查账日期开始"
            end-placeholder="待银行查账日期结束"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="val7" label="还款日期：">
          <el-date-picker
            v-model="form1.val7"
            value-format="yyyy-MM-dd"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="还款日期开始"
            end-placeholder="还款日期结束"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getMainData">查询</el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh"
            @click="resetForm('form1');getMainData()"
          >重置</el-button
          >
        </el-form-item>
      </el-form>
    </section>
    <!-- <section class="table-wrap"> -->
      <div class="grid-content bg-purple queryResultSummary">
        <i class="el-icon-info"></i>
        <span>查询结果统计：</span>
        <span v-if="tableLoad" class="queryStyle">查询中，请稍候...</span>
        <span v-else>
          <span class="" v-if="form1.val1 == 0">
            <span class="queryStyle">列表还款金额：</span><span class="textColor">{{topData.paidMoney}}</span><span class="queryStyle">，</span>
            <span class="queryStyle">还款提成金额：</span><span class="textColor">{{topData.repaidAmt}}</span><span class="queryStyle"></span>
          </span>
          <span class="" v-if="form1.val1 == 1">
            <span class="queryStyle">列表待银行查账金额：</span><span class="textColor">{{topData.bankAmtC}}</span><span class="queryStyle">，</span>
            <span class="queryStyle">待银行查账提成金额：</span><span class="textColor">{{topData.repaidBankAmt}}</span><span class="queryStyle"></span>
          </span>
          <span class="" v-if="form1.val1 == 2">
            <span class="queryStyle">列表承诺还款金额：</span><span class="textColor">{{topData.repayAmtP}}</span><span class="queryStyle"></span>
          </span>
        </span>
      </div> 
       <el-table highlight-current-row v-loading="tableLoad"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @row-dblclick="showCase"
        >
          <el-table-column
              label="个案序列号"
              prop="seqno"
              show-overflow-tooltip
              header-align="center"
              align="center"
              min-width="180"
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
          v-for="(item, index) in tablecol_data"
          v-bind="item"
          align="center"
          :key="index"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paginationData.currentPage"
      :page-sizes="pageSizes"
      :page-size="paginationData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="paginationData.total"
    ></el-pagination>
    <!-- </section> -->

    <el-dialog
      width="300px"
      title="选择部门"
      class="dialog-wrap department-wrap"
      :visible.sync="departmentVisible"
      :close-on-click-modal="false"
      append-to-body
      v-dialogDrag
    >
      <el-tree
        v-if="departmentTree.length>0"
        ref="tree"
        :data="departmentTree"
        node-key="id"
        :expand-on-click-node="false"
        @node-click="onSelectDepartment"
        :default-expanded-keys="[departmentTree[0].id]"
        class="tree-wrap"
        width="200px"
      >
          <span
            :class="{active:form1.val8 === data.id}"
            class="custom-tree-node"
            slot-scope="{ node, data }"
          >{{data.orgName}}</span>
      </el-tree>
      <span slot="footer" class="footer">
          <el-button @click="departmentVisible=false">取 消</el-button>
          <el-button type="primary" @click="onClickSaveDept">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
      title="选择催收员"
      class="dialog-wrap"
      :visible.sync="selectUserVisible3"
      :close-on-click-modal="false"
      width="600px"
      v-dialogDrag
    >
      <el-tree
        :data="selectUserTree"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
      <span slot="footer" class="footer">
        <el-button @click="selectUserVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="onClickSaveUser3">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { batchNo, pay, getEnum,listOrganization,getUserTree } from "@/common/js/collect-my-case";
import {role} from '@/common/js/collect-departmental-case'
import {pageSizes} from "@/common/js/const"

export default {
  name: "collectRepaymentStatistics",
  data() {
    const tablecol_common = [
      {
        'min-width': 120,
        label: "批次号",
        prop: "batchNo"
      },
      {
        'min-width': 120,
        label: "姓名",
        prop: "targetName"
      },
      {
        'min-width': 100,
        label: "委托方",
        prop: "client"
      },
      {
        'min-width': 100,
        label: "账龄",
        prop: "accountAge"
      },
      {
        'min-width': 120,
        label: "委案金额",
        prop: "money"
      }
    ];
    return {
      pageSizes,
      paginationData: {
        pageSize: pageSizes[0],
        total: 0,
        currentPage: 1
      },
      deptName:"",
      selectUserVisible3:false,
      selectUserTree:[],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      departmentVisible:false,
      departmentTree: [],
      tableLoad:false,
      topData: {},
      form1: {
        odvNameFiter:null,
        val1: "0",
        val2: "",
        val3: "",
        val4: "",
        val5: "",
        val6: "",
        val7: "",
        val8: "",
        val9: [],
      },
      val3_data: [],
      val1_data: [
        {
          label: "还款记录",
          value: "0"
        },
        {
          label: "待银行查账记录",
          value: "1"
        },
        {
          label: "承诺还款记录",
          value: "2"
        }
      ],
      tableV1: "0.0",
      tableV2: "0.0",
      tableData: [],
      tablecol_data: [],
      tablecol_raw1: [
        ...tablecol_common,
        {
          'min-width': 120,
          label: "提成系数",
          prop: "mVal"
        },
        {
          'min-width': 120,
          label: "待银行查账金额",
          prop: "bankAmt"
        },
        {
          'min-width': 120,
          label: "待银行查账日期",
          prop: "bankTime"
        },
        {
          'min-width': 140,
          label: "待银行查账提成金额",
          prop: "repaidAmtM"
        },
        {
          'min-width': 120,
          label: "还款金额",
          prop: "repayAmt"
        },
        {
          'min-width': 120,
          label: "还款日期",
          prop: "picih"
        },
        {
          'min-width': 140,
          label: "还款提成值",
          prop: "repaidBankAmtM"
        },
        {
          'min-width': 120,
          label: "还款人",
          prop: "payName"
        },
        {
          'min-width': 120,
          label: "还款方式",
          prop: "payMethod"
        },
        {
          'min-width': 120,
          label: "确认人",
          prop: "confimName"
        },
        {
          'min-width': 180,
          label: "确认时间",
          prop: "confimTime"
        },
        {
          'min-width': 180,
          label: "催收员",
          prop: "odv"
        },
        {
          'min-width': 100,
          label: "备注",
          prop: "remark"
        }
      ],
      tablecol_raw2: [
        ...tablecol_common,
        {
          'min-width': 120,
          label: "提成系数",
          prop: "mVal"
        },
        {
          'min-width': 120,
          label: "待银行查账金额",
          prop: "bankAmt"
        },
        {
          'min-width': 120,
          label: "待银行查账日期",
          prop: "bankTime"
        },
        {
          'min-width': 140,
          label: "待银行查账提成金额",
          prop: "repaidAmtM"
        },
        {
          'min-width': 120,
          label: "还款人",
          prop: "payName"
        },
        {
          'min-width': 120,
          label: "还款方式",
          prop: "payMethod"
        },
        {
          'min-width': 100,
          label: "备注",
          prop: "remark"
        }
      ],
      tablecol_raw3: [
        ...tablecol_common,
        {
          'min-width': 120,
          label: "提成系数",
          prop: "mVal"
        },
        {
          'min-width': 120,
          label: "承诺还款金额",
          prop: "repayAmt"
        },
        {
          'min-width': 120,
          label: "承诺还款日期",
          prop: "repayTime"
        },
        {
          'min-width': 100,
          label: "备注",
          prop: "remark"
        }
      ],
      val2_data: [],
      val4_data: [],
      val8_data: [],
      val9_data: [],
    };
  },
  created() {
    this.tablecol_data = this.tablecol_raw1;
    this.init();
    listOrganization().then((data)=>{
      this.departmentTree = data;
    });
  },
  computed: {
    fetchData() {
      let {
        val1: opeType,
        val2: clients,
        val3: batchNos,
        val4: accountAges,
        val5,
        val6,
        val7,
        val8:dept,
        val9:odvs
      } = this.form1;
      return {
        opeType,
        clients,
        batchNos,
        accountAges,
        repayTimeStart: (!!val5 && val5[0]) || "",
        repayTimeEnd: (!!val5 && val5[1]) || "",
        expectTimeStart:(!!val6 && val6[0]) || "",
        expectTimeEnd:(!!val6 && val6[1]) || "",
        bankTimeStart:(!!val7 && val7[0]) || "",
        bankTimeEnd:(!!val7 && val7[1]) || "",
        pageNum: this.paginationData.currentPage,
        pageSize: this.paginationData.pageSize,
        sType:1,
        dept,
        odvs
      };
    }
  },
  methods: {
    onClickSelectUser3(){
      this.selectUserVisible3 = true
    },
    onClickSaveUser3() {
      let selectDataArr = this.$refs.tree.getCheckedNodes()
      let selectUserNames = []
      let selectUserIds = []
      if (selectDataArr.length > 0) {
        selectUserNames = selectDataArr.filter((item) => {
          return item.type === 'user'
        }).map((item) => {
          return item.name
        })
        selectUserIds = selectDataArr.filter((item) => {
          return item.type === 'user'
        }).map((item) => {
          return item.id
        })
      }
      this.$set(this.form1, 'odvNameFiter', selectUserNames.join(','))
      this.$set(this.form1, 'val9', selectUserIds)
      this.selectUserVisible3 = false
    },
    onClickSelectUser() {
      this.departmentVisible = true
    },
    onSelectDepartment (data, node) {
      this.currentDept = data
    },
    handleCurrentChange(currentPage) {
      this.paginationData.currentPage = currentPage;
      this.getMainData();
    },
    handleSizeChange(pageSize) {
      this.paginationData.pageSize = pageSize;
      this.getMainData();
    },
    onClickSaveDept () {
      this.$set(this.form1, 'val8', this.currentDept.id)
      this.deptName = this.currentDept.orgName;
      this.departmentVisible = false;
    },
    formatMoney(value,places, symbol, thousand, decimal) {
      var placesTemp = 0 ;
      value = parseFloat(value).toString();
      if (value.indexOf(".")>=0){
        placesTemp = value.length - value.indexOf(".") -1;
      }
      places = placesTemp
      places = !isNaN(places = Math.abs(places)) ? places : 2;
      symbol = symbol !== undefined ? symbol : "¥";
      thousand = thousand || ",";
      decimal = decimal || ".";
      var number = value,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
      return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
    },
    modeChange(v) {
      this.tablecol_data = this[`tablecol_raw${v * 1 + 1}`];
      this.getMainData();
    },
    //查询批次号
    querySearch(queryString){
      batchNo({batchNo:queryString}).then((data)=>{
        this.val3_data = data.reduce((acc,item)=>{
          acc.push({
            value:item.batchNo
          })
          return acc;
        },[]);
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.deptName = ""
      this.getMainData();
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
    getMainData() {
      this.tableLoad = true
      if (this.deptName==null || this.deptName==""){
        this.form1.val8 = '';
      }
      pay(this.fetchData).then(data => {
        this.tableData = data.list;
        this.topData = data;
        /*this.fetchData.paidMoney = this.formatMoney(data.paidMoney,0, "￥")
        this.fetchData.repaidAmt = this.formatMoney(data.repaidAmt,0, "￥")
        this.fetchData.bankAmtC = this.formatMoney(data.bankAmtC,0, "￥")
        this.fetchData.repaidBankAmt = this.formatMoney(data.repaidBankAmt,0, "￥")
        this.fetchData.repayAmtP = this.formatMoney(data.repayAmtP,0, "￥")*/

        this.topData.lastPaidMoney = this.formatMoney(data.lastPaidMoney,0, "￥")
        this.topData.repayAmtP = this.formatMoney(data.repayAmtP,0, "￥")
        this.topData.repaidBankAmt = this.formatMoney(data.repaidBankAmt,0, "￥")
        this.topData.bankAmtC = this.formatMoney(data.bankAmtC,0, "￥")
        this.topData.paidMoney = this.formatMoney(data.paidMoney,0, "￥")
        this.topData.repaidAmt = this.formatMoney(data.repaidAmt,0, "￥")
        this.topData.thisRepaidBankAmt = this.formatMoney(data.thisRepaidBankAmt,0, "￥")
        this.topData.thisRepaidAmt = this.formatMoney(data.thisRepaidAmt,0, "￥")
        this.topData.thisPaidMoney = this.formatMoney(data.thisPaidMoney,0, "￥")
        this.topData.thisRepayAmt = this.formatMoney(data.thisRepayAmt,0, "￥")
        this.topData.thisBankAmt = this.formatMoney(data.thisBankAmt,0, "￥")
        this.topData.lastRepaidBankAmt = this.formatMoney(data.lastRepaidBankAmt,0, "￥")
        this.topData.lastRepayAmt = this.formatMoney(data.lastRepayAmt,0, "￥")
        this.topData.lastBankAmt = this.formatMoney(data.lastBankAmt,0, "￥")
        this.topData.lastRepaidAmt = this.formatMoney(data.lastRepaidAmt,0, "￥")
        this.paginationData.total = data.totalNum
        this.tableLoad = false
      });
    },
    init() {
      this.getMainData();
     /* this.getEnumHandle("委托方", "val2_data");
      this.getEnumHandle("逾期账龄", "val4_data");*/

      listOrganization().then((data)=>{
        this.val8_data = this.transform(data,[['orgName','label'],['id','value']]);
      });
      role({role:'催收员'}).then((data)=>{
        this.val9_data = this.transform(data,[['userName','label'],['id','value']]);
      })
      getUserTree().then(data => {
        this.selectUserTree = [data]
      })
    },

    showCase(row) {
      window.open(`#/zhx/case-detail?id=${row.caseId}`)
    }
  },
  mounted(){
    this["val2_data"] = this.transform(this.$store.getters.caseType.委托方);
    this["val4_data"] = this.transform(this.$store.getters.caseType.逾期账龄);
  }
};
</script>

<style lang="scss" scoped>
#collect-repayment-statistics {
  .form {
    padding: 20px 0;
  }
  .topDataWp {
    padding: 10px 5px;
  }
  .topSpan {
    display: inline-block;
    color: #b2adb2;
  }
}
</style>
