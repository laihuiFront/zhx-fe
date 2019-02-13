<template>
  <div id="collect-repayment-statistics">
    <section class="topDataWp">
      <el-row :gutter="10">
        <el-col :span="4"
          ><span class="topSpan">上月还款金额:</span>¥{{ topData.a1 }}</el-col
        >
        <el-col :span="3"
          ><span class="topSpan">上月PTP值:</span>¥{{ topData.a1 }}</el-col
        >
        <el-col :span="3"
          ><span class="topSpan">上月CP值:</span>¥{{ topData.a1 }}</el-col
        >
        <el-col :span="4"
          ><span class="topSpan">上月M值(已还款):</span>¥{{
            topData.a1
          }}</el-col
        >
        <el-col :span="4"
          ><span class="topSpan">上月M值(CP):</span>¥{{ topData.a1 }}</el-col
        >
      </el-row>
      <el-row :gutter="10" style="margin-top: 15px;">
        <el-col :span="4"
          ><span class="topSpan">当月还款金额:</span>¥{{ topData.a1 }}</el-col
        >
        <el-col :span="3"
          ><span class="topSpan">当月PTP值:</span>¥{{ topData.a1 }}</el-col
        >
        <el-col :span="3"
          ><span class="topSpan">当月CP值:</span>¥{{ topData.a1 }}</el-col
        >
        <el-col :span="4"
          ><span class="topSpan">当月M值(已还款):</span>¥{{
            topData.a1
          }}</el-col
        >
        <el-col :span="4"
          ><span class="topSpan">当月M值(CP):</span>¥{{ topData.a1 }}</el-col
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
          <el-autocomplete
            class="inline-input"
            v-model="form1.val2"
            :fetch-suggestions="querySearch"
            placeholder="委托方"
          ></el-autocomplete>
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
          <el-autocomplete
            class="inline-input"
            v-model="form1.val4"
            :fetch-suggestions="querySearch"
            placeholder="逾期账龄"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item prop="val5">
          <el-date-picker
            v-model="form1.val5"
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
          <el-button type="text" icon="el-icon-search">查询</el-button>
          <el-button
            type="text"
            icon="el-icon-refresh"
            @click="resetForm('form1')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </section>
    <section class="table-wrap">
      <div style="padding-bottom: 20px;">
        <span style="color:#CAA460;">查询结果统计:</span>
        <span class="" v-if="form1.val1 == 0">
          <span>列表还款金额: ¥ {{ tableV1 }}, </span>
          <span>还款M值金额: ¥ {{ tableV2 }}</span>
        </span>
        <span class="" v-if="form1.val1 == 1">
          <span>列表CP金额: ¥ {{ tableV1 }}, </span>
          <span>CPM值金额: ¥ {{ tableV2 }}</span>
        </span>
        <span class="" v-if="form1.val1 == 2">
          <span>列表PTP金额: ¥ {{ tableV1 }} </span>
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
export default {
  name: "collectRepaymentStatistics",
  data() {
    const tablecol_common = [
      {
        label: "批次号",
        prop: "picih"
      },
      {
        label: "姓名",
        prop: "picih"
      },
      {
        label: "个案序列号",
        prop: "picih"
      },
      {
        label: "委托方",
        prop: "picih"
      },
      {
        label: "账龄",
        prop: "picih"
      },
      {
        label: "委案金额",
        prop: "picih"
      }
    ];
    return {
      topData: {
        a1: 0.012121,
        a2: 0.0
      },
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
          prop: "picih"
        },
        {
          label: "CP金额",
          prop: "picih"
        },
        {
          label: "CP日期",
          prop: "picih"
        },
        {
          label: "CPM值",
          prop: "picih"
        },
        {
          label: "还款金额",
          prop: "picih"
        },
        {
          label: "还款日期",
          prop: "picih"
        },
        {
          label: "还款M值",
          prop: "picih"
        },
        {
          label: "还款人",
          prop: "picih"
        },
        {
          label: "还款方式",
          prop: "picih"
        },
        {
          label: "确认人",
          prop: "picih"
        },
        {
          label: "确认时间",
          prop: "picih"
        },
        {
          label: "备注",
          prop: "picih"
        }
      ],
      tablecol_raw2: [
        ...tablecol_common,
        {
          label: "M值系数",
          prop: "picih"
        },
        {
          label: "CP金额",
          prop: "picih"
        },
        {
          label: "CP日期",
          prop: "picih"
        },
        {
          label: "CPM值",
          prop: "picih"
        },
        {
          label: "还款人",
          prop: "picih"
        },
        {
          label: "还款方式",
          prop: "picih"
        },
        {
          label: "备注",
          prop: "picih"
        }
      ],
      tablecol_raw3: [
        ...tablecol_common,
        {
          label: "M值系数",
          prop: "picih"
        },
        {
          label: "PTP金额",
          prop: "picih"
        },
        {
          label: "PTP日期",
          prop: "picih"
        },
        {
          label: "备注",
          prop: "picih"
        }
      ]
    };
  },
  created() {
    this.tablecol_data = this.tablecol_raw1;
  },
  computed: {},
  methods: {
    modeChange(v) {
      this.tablecol_data = this[`tablecol_raw${v * 1 + 1}`];
    },
    querySearch(queryString, cb) {
      cb([]);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSelectionChange() {}
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
