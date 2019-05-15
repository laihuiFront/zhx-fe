<template>
  <div
    id="collect-status-statistics"
    style="display:flex;flex-direction:column;height:100%;"
  >
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs-wrap statistics">
      <el-tab-pane label="当日电催跟进量" name="first">
        <el-form :inline="true" ref="form1" :model="form1" label-width="80px">
          <el-form-item prop="val1">
            <el-date-picker
              v-model="form1.val1"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="催收开始日期"
              end-placeholder="催收结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getMainData1()"
              >查询</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-refresh"
              @click="
                resetForm('form1');
                getMainData1();
              "
              >重置</el-button
            >
          </el-form-item>
        </el-form>
         <el-table highlight-current-row class="table-wrap"
          height="1"
          v-loading="tableLoad"
          :data="tableData1"
          style="width: 100%;min-height: 400px;"
        >
          <el-table-column
            v-for="(item, index) in tablecol_data1"
            :key="index"
            v-bind="item"
            header-align="center"
            align="center"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="催收状态统计" name="second">
        <el-form :inline="true" ref="form2" :model="form2" label-width="80px">
          <el-form-item prop="val1">
            <el-select
              v-model="form2.val1"
              placeholder="请选择委托方"
              filterable
              multiple
              clearable
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
            <el-select v-model="form2.val2" placeholder="请选择催收状态" clearable>
              <el-option
                v-for="item in val2_data_form2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="val3">
            <el-select
              v-model="form2.val3"
              placeholder="请选择逾期账龄"
              clearable
            >
              <el-option
                v-for="item in val3_data"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getMainData2"
              >查询</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-refresh"
              @click="
                resetForm('form2');
                getMainData2();
              "
              >重置</el-button
            >
          </el-form-item>
        </el-form>
         <el-table highlight-current-row v-loading="tableLoad"
          class="table-wrap"
          height="1"
          :data="tableData2"
          border
          stripe
          style="width: 100%"
        >
          <el-table-column
            v-for="(item, index) in tablecol_data2"
            :key="index"
            align="center"
            v-bind="item"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="批次分类统计" name="third">
        <el-form :inline="true" ref="form3" :model="form3" label-width="80px">
          <el-form-item prop="val1">
            <el-select
              v-model="form3.val1"
              placeholder="请选择委托方"
              filterable
              multiple
              clearable
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
            <el-select
              v-model="form3.val2"
              multiple
              filterable
              remote
              placeholder="请输入批次号"
              :remote-method="querySearch1"
            >
              <el-option
                v-for="item in val2_data_form3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="val3">
            <el-select
              v-model="form3.val3"
              placeholder="请选择逾期账龄"
              clearable
            >
              <el-option
                v-for="item in val3_data"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getMainData3"
              >查询</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-refresh"
              @click="
                resetForm('form3');
                getMainData3();
              "
              >重置</el-button
            >
          </el-form-item>
        </el-form>
         <el-table highlight-current-row v-loading="tableLoad"
          class="table-wrap"
          height="1"
          :data="tableData3"
          border
          stripe
          style="width: 100%"
        >
          <el-table-column
            v-for="(item, index) in tablecol_data3"
            :key="index"
            align="center"
            v-bind="item"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  day,
  state,
  batchNo,
  getEnum,
  batch
} from "@/common/js/collect-my-case";
export default {
  name: "collectStatusStatistics",
  data() {
    return {
      tableLoad: false,
      activeName: "first",
      form1: { val1: null },
      tableData1: [],
      tablecol_data1: [
        { prop: "timeArea", label: "时段" },
        /*{ prop: "dateEnd", label: "结束时间" },*/
        { prop: "countConPhoneNum", label: "有效通电量" },
        { prop: "countPhoneNum", label: "总通电量" },
        { prop: "countCasePhoneNum", label: "通电案量" }
      ],
      form2: { val1: null, val2: null, val3: null },
      val2_data_form2: [],
      tableData2: [],
      tablecol_data2: [
        { prop: "collectStatusMsg", label: "催收状态" },
        { prop: "paidMoney", label: "已还款金额（回收值）" },
        { prop: "commisionMoney", label: "委案金额（案值）" },
        { prop: "sumCase", label: "案件量" }
      ],
      tablecol_data3: [
        { prop: "batchNo", label: "批次号" },
        { prop: "paidMoney", label: "已还款金额（回收值）" },
        { prop: "commisionMoney", label: "委案金额（案值）" },
        { prop: "sumCase", label: "案件量" }
      ],
      val1_data: [], //tab2 委托方
      val3_data: [], //tab2 逾期账龄
      form3: { val1: null, val2: null, val3: null },
      val2_data_form3: [],
      tableData3: []
    };
  },
  created() {
    this.init();
  },
  computed: {
    form2_data() {
      let { val1: clients, val2: collectStatus, val3: accountAge } = this.form2;
      return {
        clients,
        collectStatus,
        accountAge
      };
    },
    form3_data() {
      let { val1: clients, val2: batchNos, val3: accountAge } = this.form3;
      return {
        clients,
        batchNos,
        accountAge,
        sType: 0
      };
    }
  },
  methods: {
    init() {
      this.getMainData1();
    },
    getMainData1() {
      this.tableLoad = true;
      day({
        dateSearchStart: (!!this.form1.val1 && this.form1.val1[0]) || "",
        dateSearchEnd: (!!this.form1.val1 && this.form1.val1[1]) || ""
      }).then(data => {
        this.tableData1 = data;
        this.tableLoad = false;
      });
    },
    getMainData2() {
      this.tableLoad = true;
      state(this.form2_data).then(data => {
        this.tableData2 = data;
        this.tableLoad = false;
      });
    },
    getMainData3() {
      this.tableLoad = true;
      batch(this.form3_data).then(data => {
        this.tableData3 = data;
        this.tableLoad = false;
      });
    },
    getEnum() {
      this.getEnumHandle("委托方", "val1_data");
      this.getEnumHandle("逾期账龄", "val3_data");
      this.getEnumHandle("催收状态", "val2_data_form2");
    },
    handleClick(tab, event) {
      if (this.activeName == "first") {
        this.getMainData1();
      } else if (this.activeName == "second") {
        this.getEnum();
        this.getMainData2();
      } else {
        this.getEnum();
        this.getMainData3();
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    //查询批次号
    querySearch(queryString) {
      batchNo({ batchNo: queryString }).then(data => {
        this.val2_data_form2 = data.reduce((acc, item) => {
          acc.push({
            value: item.batchNo
          });
          return acc;
        }, []);
      });
    }, //查询批次号
    querySearch1(queryString) {
      batchNo({ batchNo: queryString }).then(data => {
        this.val2_data_form3 = data.reduce((acc, item) => {
          acc.push({
            value: item.batchNo
          });
          return acc;
        }, []);
      });
    }
  }
};
</script>

<style lang="scss">
#collect-status-statistics {
}

</style>
