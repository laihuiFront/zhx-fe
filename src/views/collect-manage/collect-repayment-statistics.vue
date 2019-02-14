<template>
  <div id="collect-repayment-statistics">
    <section class="topDataWp">
      <el-row :gutter="10">
        <el-col :span="4"
          ><span class="topSpan">上月还款金额:</span>¥{{ topData.lastPaidMoney }}</el-col
        >
        <el-col :span="3"
          ><span class="topSpan">上月PTP值:</span>¥{{ topData.lastRepayAmt }}</el-col
        >
        <el-col :span="3"
          ><span class="topSpan">上月CP值:</span>¥{{ topData.lastBankAmt }}</el-col
        >
        <el-col :span="4"
          ><span class="topSpan">上月M值(已还款):</span>¥{{
            topData.lastRepaidAmt
          }}</el-col
        >
        <el-col :span="4"
          ><span class="topSpan">上月M值(CP):</span>¥{{ topData.lastRepaidBankAmt }}</el-col
        >
      </el-row>
      <el-row :gutter="10" style="margin-top: 15px;">
        <el-col :span="4"
          ><span class="topSpan">当月还款金额:</span>¥{{ topData.thisPaidMoney }}</el-col
        >
        <el-col :span="3"
          ><span class="topSpan">当月PTP值:</span>¥{{ topData.thisRepayAmt }}</el-col
        >
        <el-col :span="3"
          ><span class="topSpan">当月CP值:</span>¥{{ topData.thisBankAmt }}</el-col
        >
        <el-col :span="4"
          ><span class="topSpan">当月M值(已还款):</span>¥{{
            topData.thisRepaidAmt
          }}</el-col
        >
        <el-col :span="4"
          ><span class="topSpan">当月M值(CP):</span>¥{{ topData.thisRepaidBankAmt }}</el-col
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
        </el-row>
        <el-form-item prop="val2">
          <el-select v-model="form1.val2" placeholder="请选择委托方" clearable>
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
          <el-autocomplete
            class="inline-input"
            v-model="form1.val3"
            :fetch-suggestions="querySearch"
            placeholder="批次号"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item prop="val4">
          <el-select
            v-model="form1.val4"
            placeholder="请选择逾期账龄"
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
        <el-form-item prop="val5">
          <el-date-picker
            v-model="form1.val5"
            value-format="yyyy-MM-dd"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="PTP起始日期"
            end-placeholder="PTP结束日期"
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
            start-placeholder="CP起始日期"
            end-placeholder="CP结束日期"
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
            start-placeholder="还款起始日期"
            end-placeholder="还款结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="text" icon="el-icon-search" @click="getMainData">查询</el-button>
          <el-button
            type="text"
            icon="el-icon-refresh"
            @click="resetForm('form1');getMainData()"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </section>
    <section class="table-wrap">
      <div style="padding-bottom: 20px;">
        <span style="color:#CAA460;">查询结果统计:</span>
        <span class="" v-if="form1.val1 == 0">
          <span>列表还款金额: ¥ {{ topData.paidMoney }}, </span>
          <span>还款M值金额: ¥ {{ topData.repaidAmt }}</span>
        </span>
        <span class="" v-if="form1.val1 == 1">
          <span>列表CP金额: ¥ {{ topData.bankAmtC }}, </span>
          <span>CPM值金额: ¥ {{ topData.repaidBankAmt }}</span>
        </span>
        <span class="" v-if="form1.val1 == 2">
          <span>列表PTP金额: ¥ {{ topData.repayAmtP }} </span>
        </span>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          v-for="(item, index) in tablecol_data"
          v-bind="item"
          :key="index"
        ></el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
import { batchNo, pay, getEnum } from "@/common/js/collect-my-case";

export default {
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
      {
        label: "个案序列号",
        prop: "seqno"
      },
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
      topData: {},
      form1: {
        val1: "0",
        val2: "",
        val3: "",
        val4: "",
        val5: "",
        val6: "",
        val7: ""
      },
      val1_data: [
        {
          label: "还款记录",
          value: "0"
        },
        {
          label: "CP记录",
          value: "1"
        },
        {
          label: "PTP记录",
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
          label: "M值系数",
          prop: "mVal"
        },
        {
          label: "CP金额",
          prop: "bankAmt"
        },
        {
          label: "CP日期",
          prop: "bankTime"
        },
        {
          label: "CPM值",
          prop: "repaidAmtM"
        },
        {
          label: "还款金额",
          prop: "repayAmt"
        },
        {
          label: "还款日期",
          prop: "picih"
        },
        {
          label: "还款M值",
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
          label: "M值系数",
          prop: "mVal"
        },
        {
          label: "CP金额",
          prop: "bankAmt"
        },
        {
          label: "CP日期",
          prop: "bankTime"
        },
        {
          label: "CPM值",
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
          label: "M值系数",
          prop: "mVal"
        },
        {
          label: "PTP金额",
          prop: "repayAmt"
        },
        {
          label: "PTP日期",
          prop: "repayTime"
        },
        {
          label: "备注",
          prop: "remark"
        }
      ],
      val2_data: [],
      val4_data: []
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
        val2: client,
        val3: batchNo,
        val4: accountAge,
        val5,
        val6,
        val7
      } = this.form1;
      return {
        opeType,
        client,
        batchNo,
        accountAge,
        repayTimeStart: (!!val5 && val5[0]) || "",
        repayTimeEnd: (!!val5 && val5[1]) || "",
        expectTimeStart:(!!val6 && val6[0]) || "",
        expectTimeEnd:(!!val6 && val6[1]) || "",
        bankTimeStart:(!!val7 && val7[0]) || "",
        bankTimeEnd:(!!val7 && val7[1]) || "",
      };
    }
  },
  methods: {
    modeChange(v) {
      this.tablecol_data = this[`tablecol_raw${v * 1 + 1}`];
      this.getMainData();
    },
    querySearch(queryString, cb) {
      batchNo({ batchNo: queryString }).then(data => {
        cb(
          data.reduce((acc, item) => {
            acc.push({
              value: item.batchNo
            });
            return acc;
          }, [])
        );
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
    getMainData() {
      pay(this.fetchData).then(data => {
        this.tableData = data.list;
        this.topData = data;
      });
    },
    init() {
      this.getMainData();
      this.getEnumHandle("委托方", "val2_data");
      this.getEnumHandle("逾期账龄", "val4_data");
    }
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
