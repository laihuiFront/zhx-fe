<template>
  <div id="collect-repayment-statistics">
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
          ><span class="topSpan">上月佣金（已还款）：</span>{{
            topData.lastRepaidAmt
          }}</el-col
        >
        <el-col :span="6"
          ><span class="topSpan">上月佣金（待银行查账金额）：</span>{{ topData.lastRepaidBankAmt }}</el-col
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
          ><span class="topSpan">本月佣金（已还款）：</span>{{
            topData.thisRepaidAmt
          }}</el-col
        >
        <el-col :span="6"
          ><span class="topSpan">本月佣金（待银行查账金额）：</span>{{ topData.thisRepaidBankAmt }}</el-col
        >
      </el-row>
    </section>
    <section class="form queryStyle">
      <el-form :inline="true" ref="form1" :model="form1">
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
          <el-form-item prop="val2" label="委托方：">
            <el-select v-model="form1.val2" placeholder="请选择委托方"
                      multiple collapse-tags clearable>
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
              collapse-tags
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
              multiple
              collapse-tags
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
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getMainData">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-refresh"
              @click="resetForm('form1');getMainData()"
              >重置</el-button
            >
          </el-form-item>
        </el-row>
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
        @selection-change="handleSelectionChange"
        @row-dblclick="showCase"
      >
          <el-table-column
            min-width="180"
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
                @click="showCase(scope.row)"
                >{{ scope.row.seqno }}</el-button
              >
            </template>
          </el-table-column>
        <el-table-column
          v-for="(item, index) in tablecol_data"
          align="center"
          v-bind="item"
          :key="index"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
    <!-- </section> -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paginationData.currentPage"
      :page-sizes="pageSizes"
      :page-size="paginationData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="paginationData.total"
    ></el-pagination>
  </div>
</template>

<script>
import { batchNo, pay, getEnum,listOrganization,role } from "@/common/js/collect-my-case";
import {pageSizes} from "@/common/js/const"

export default {
  name: "collectRepaymentStatistics",
  data() {
    const tablecol_common = [
      {
        'min-width':120,
        label: "批次号",
        prop: "batchNo"
      },
      {
        'min-width':120,
        label: "姓名",
        prop: "targetName"
      },
      {
        'min-width':140,
        label: "委托方",
        prop: "client"
      },
      {
        'min-width':120,
        label: "账龄",
        prop: "accountAge"
      },
      {
        'min-width':120,
        label: "委案金额",
        prop: "moneyMsg"
      }
    ];
    return {
      pageSizes,
      paginationData: {
        pageSize: pageSizes[0],
        total: 0,
        currentPage: 1
      },
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
          'min-width':80,
          label: "提成系数",
          prop: "mValMsg"
        },
        {
          'min-width':100,
          label: "待银行查账金额",
          prop: "bankAmtMsg"
        },
        {
          'min-width':140,
          label: "待银行查账日期",
          prop: "bankTime"
        },
        {
          'min-width':120,
          label: "待银行查账金额提成",
          prop: "repaidAmtMMsg"
        },
        {
          'min-width':120,
          label: "还款金额",
          prop: "repayAmtMsg"
        },
        {
          'min-width':120,
          label: "还款日期",
          prop: "repayTime"
        },
        {
          'min-width':120,
          label: "还款提成",
          prop: "repaidBankAmtMMsg"
        },
        {
          'min-width':120,
          label: "还款人",
          prop: "payName"
        },
        {
          'min-width':120,
          label: "还款方式",
          prop: "repayType.name"
        },
        {
          'min-width':120,
          label: "确认人",
          prop: "confimName"
        },
        {
          'min-width':180,
          label: "确认时间",
          prop: "confimTime"
        },
        {
          'min-width':100,
          label: "备注",
          prop: "remark"
        }
      ],
      tablecol_raw2: [
        ...tablecol_common,
        {
          label: "提成值系数",
          prop: "mVal"
        },
        {
          label: "待银行查账金额",
          prop: "bankAmtMsg"
        },
        {
          label: "待银行查账日期",
          prop: "bankTime"
        },
        {
          label: "待银行查账金额提成",
          prop: "repaidAmtMMsg"
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
          label: "提成值系数",
          prop: "mValMsg"
        },
        {
          label: "承诺还款金额",
          prop: "repayAmtMsg"
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
      val8_data: [],  //部门
      val3_data: [],  //批次号
    };
  },
  created() {
    this.tablecol_data = this.tablecol_raw1;
    this.init();
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
        val7
      } = this.form1;
      return {
        opeType,
        clients,
        batchNos,
        accountAges,
        repayTimeStart: (!!val5 && val5[0]) || "",
        repayTimeEnd: (!!val5 && val5[1]) || "",
        bankTimeStart:(!!val6 && val6[0]) || "",
        bankTimeEnd:(!!val6 && val6[1]) || "",
        expectTimeStart:(!!val7 && val7[0]) || "",
        expectTimeEnd:(!!val7 && val7[1]) || "",
        pageNum: this.paginationData.currentPage,
        pageSize: this.paginationData.pageSize,
        sType:0
      };
    }
  },
  methods: {
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
    handleCurrentChange(currentPage) {
      this.paginationData.currentPage = currentPage;
      this.getMainData();
    },
    handleSizeChange(pageSize) {
      this.paginationData.pageSize = pageSize;
      this.getMainData();
    },
    getMainData() {
      this.tableLoad = true
      pay(this.fetchData).then(data => {
        this.tableData = data.list;
        this.topData = data;
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
    },
    showCase(row) {
      window.open(`#/zhx/case-detail?id=${row.caseId}&type=1`)
    }
  },
  mounted(){
    this['val2_data'] = this.transform(this.$store.getters.caseType.委托方);
    this['val4_data'] = this.transform(this.$store.getters.caseType.逾期账龄);
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
    color: #b2adb2;
  }
  .el-tabs__content{
    margin-bottom: 40px;
    overflow-y: auto;
  }
}
</style>
