<template>
  <div id="collect-repayment-statistics" style="display:flex;flex-direction:column;height:100%;">
    <section class="topDataWp">
      <el-row :gutter="10">
        <el-col :span="4"
        ><span class="topSpan">上月还款金额：</span>{{ topData.lastPaidMoney }}</el-col
        >
        <el-col :span="4"
        ><span class="topSpan">上月承诺还款金额：</span>{{ topData.lastRepayAmt }}</el-col
        >
        <el-col :span="5"
        ><span class="topSpan">上月待银行查账金额：</span>{{ topData.lastBankAmt }}</el-col
        >
        <el-col :span="5"
        ><span class="topSpan">上月提成（已还款）：</span>{{
          topData.lastRepaidAmt
          }}</el-col
        >
        <el-col :span="6"
        ><span class="topSpan">上月提成（待银行查账金额）：</span>{{ topData.lastRepaidBankAmt }}</el-col
        >
      </el-row>
      <el-row :gutter="10" style="margin-top: 15px;">
        <el-col :span="4"
        ><span class="topSpan">本月还款金额：</span>{{ topData.thisPaidMoney }}</el-col
        >
        <el-col :span="4"
        ><span class="topSpan">本月承诺还款金额：</span>{{ topData.thisRepayAmt }}</el-col
        >
        <el-col :span="5"
        ><span class="topSpan">本月待银行查账金额：</span>{{ topData.thisBankAmt }}</el-col
        >
        <el-col :span="5"
        ><span class="topSpan">本月提成（已还款）：</span>{{
          topData.thisRepaidAmt
          }}</el-col
        >
        <el-col :span="6"
        ><span class="topSpan">本月提成（待银行查账金额）：</span>{{ topData.thisRepaidBankAmt }}</el-col
        >
      </el-row>
    </section>
    <section class="form">
      <el-form :inline="true" ref="form1" :model="form1" label-width="80px">
        <el-row>
          <el-form-item>
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
            <el-form-item prop="val8">
              <el-input v-model="deptName" width="200" @focus="onClickSelectUser" clearable placeholder="请选择部门"></el-input>
            </el-form-item>
          <el-form-item prop="val9">
            <el-select
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
            </el-select>
          </el-form-item>
          <el-form-item prop="val2">
            <el-select v-model="form1.val2" placeholder="请选择委托方" filterable collapse-tags multiple clearable>
              <el-option
                v-for="item in val2_data"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="val3">
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
          <el-form-item prop="val4">
            <el-select
              v-model="form1.val4"
              placeholder="请选择逾期账龄"
              filterable
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
        <el-form-item prop="val5">
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
        <el-form-item prop="val6">
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
        <el-form-item prop="val7">
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
      <div style="padding-bottom: 20px;">
        <span style="color: black;font-size: 16px;">查询结果统计：</span>
        <span class="" v-if="form1.val1 == 0">
          <span style="color: #66b1ff;font-size: 16px;">列表还款金额：{{ topData.paidMoney }}，</span>
          <span style="color: #66b1ff;font-size: 16px;"> 还款提成金额：{{ topData.repaidAmt }}</span>
        </span>
        <span class="" v-if="form1.val1 == 1">
          <span style="color: #66b1ff;font-size: 16px;"> 列表待银行查账金额：{{ topData.bankAmtC }}，</span>
          <span style="color: #66b1ff;font-size: 16px;"> 待银行查账提成金额：{{ topData.repaidBankAmt }}</span>
        </span>
        <span class="" v-if="form1.val1 == 2">
          <span style="color: #66b1ff;font-size: 16px;"> 列表承诺还款金额：{{ topData.repayAmtP }}</span>
        </span>
      </div>
       <el-table highlight-current-row v-loading="tableLoad"
        class="table-wrap"
        height="1"
        ref="multipleTable"
        :data="tableData"
        border
        stripe
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >

       <el-table-column
            label="个案序列号"
            prop="seqno"
            show-overflow-tooltip                 
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                style="text-decoration: underline"
                type="text"
                size="small"
                @click="showCase3(scope.row)"
                >{{ scope.row.seqno }}</el-button
              >
            </template>
          </el-table-column>

        <el-table-column
          v-for="(item, index) in tablecol_data"
          v-bind="item"
          align="center"
          :key="index"
        ></el-table-column>
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
    ></el-pagination>
    <!-- </section> -->

    <el-dialog
      width="300px"
      title="选择部门"
      class="dialog-wrap department-wrap"
      :visible.sync="departmentVisible"
      :close-on-click-modal="false"
      append-to-body
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
  </div>
</template>

<script>
import { batchNo, pay, getEnum,listOrganization } from "@/common/js/collect-my-case";

import {role} from '@/common/js/collect-departmental-case'
 const CaseDetail2 = () => import('@/views/data-manage/detail');
export default {
     components: {
      CaseDetail2
    },
  name: "collectRepaymentStatistics",
  data() {

    const tablecol_common = [
      {
        label: "批次号",
        prop: "batchNo"
      },
      {
        label: "姓名",
        prop: "targetName"
      },
      // {
      //   label: "个案序列号",
      //   width:"160",
      //   prop: "seqno"
      // },
      {
        label: "委托方",
        prop: "client"
      },
      {
        label: "账龄",
        prop: "accountAge"
      },
      {
        label: "委案金额",
        prop: "money"
      }
    ];
    return {
      paginationData: {
        pageSize: 100,
        total: 0,
        currentPage: 1
      },
      deptName:"",
      departmentVisible:false,
      departmentTree: [],
      tableLoad:false,
      topData: {},
      form1: {
        val1: "0",
        val2: "",
        val3: "",
        val4: "",
        val5: "",
        val6: "",
        val7: "",
        val8: "",
        val9: "",
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
          label: "提成系数",
          prop: "mVal"
        },
        {
          label: "待银行查账金额",
          width:"140",
          prop: "bankAmt"
        },
        {
          label: "待银行查账日期",
          width:"160",
          prop: "bankTime"
        },
        {
          label: "待银行查账提成金额",
          width:"140",
          prop: "repaidAmtM"
        },
        {
          label: "还款金额",
          width:"140",
          prop: "repayAmt"
        },
        {
          label: "还款日期",
          width:"160",
          prop: "picih"
        },
        {
          label: "还款提成值",
          width:"140",
          prop: "repaidBankAmtM"
        },
        {
          label: "还款人",
          prop: "payName"
        },
        {
          label: "还款方式",
          prop: "payMethod"
        },
        {
          label: "确认人",
          prop: "confimName"
        },
        {
          label: "确认时间",
          width:"180",
          prop: "confimTime"
        },
        {
          label: "备注",
          prop: "remark"
        }
      ],
      tablecol_raw2: [
        ...tablecol_common,
        {
          label: "提成系数",
          prop: "mVal"
        },
        {
          label: "待银行查账金额",
          prop: "bankAmt"
        },
        {
          label: "待银行查账日期",
          prop: "bankTime"
        },
        {
          label: "待银行查账提成金额",
          prop: "repaidAmtM"
        },
        {
          label: "还款人",
          prop: "payName"
        },
        {
          label: "还款方式",
          prop: "payMethod"
        },
        {
          label: "备注",
          prop: "remark"
        }
      ],
      tablecol_raw3: [
        ...tablecol_common,
        {
          label: "提成系数",
          prop: "mVal"
        },
        {
          label: "承诺还款金额",
          prop: "repayAmt"
        },
        {
          label: "承诺还款日期",
          prop: "repayTime"
        },
        {
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
    handleSelectionChange() {},
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
    },

     showCase3(row) {
        let id= row.id 
        let name = row.targetName
        let seqNo = row.seqno
      this.$router.push({
        path: "case-detail",
        query: {
          id,     
          name,
          mycase:true,
          seqNo
        }
      });
    }
  },
  mounted(){
    this["val2_data"] = this.transform(this.$store.getters.caseType.委托方);
    this["val4_data"] = this.transform(this.$store.getters.caseType.逾期账龄);
  }
};
</script>

<style lang="scss">
#collect-repayment-statistics {
  .form {
    padding: 20px 0;
  }
  .topDataWp {
    padding: 10px 5px;
  }
  .topSpan {
    display: inline-block;
    margin-right: 10px;
    color: #b2adb2;
  }
}
</style>
