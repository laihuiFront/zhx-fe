<template>
  <div id="collect-status-statistics">
    <el-tabs v-model="activeName" @tab-click="handleClick">
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
            <el-button type="text" icon="el-icon-search">查询</el-button>
            <el-button
              type="text"
              icon="el-icon-refresh"
              @click="resetForm('form1')"
            >重置</el-button
            >
          </el-form-item>
        </el-form>
        <el-table :data="tableData1" style="width: 100%">
          <el-table-column
            v-for="(item, index) in tablecol_data1"
            :key="index"
            v-bind="item"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="催收状态统计" name="second">
        <el-form :inline="true" ref="form2" :model="form2" label-width="80px">
          <el-form-item prop="val1">
            <el-autocomplete
              class="inline-input"
              v-model="form2.val1"
              :fetch-suggestions="querySearch"
              placeholder="委托方"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item prop="val2">
            <el-autocomplete
              class="inline-input"
              v-model="form2.val2"
              :fetch-suggestions="querySearch"
              placeholder="批次号"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item prop="val3">
            <el-autocomplete
              class="inline-input"
              v-model="form2.val3"
              :fetch-suggestions="querySearch"
              placeholder="逾期账龄"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-button type="text" icon="el-icon-search">查询</el-button>
            <el-button
              type="text"
              icon="el-icon-refresh"
              @click="resetForm('form2')"
            >重置</el-button
            >
          </el-form-item>
        </el-form>
        <el-table :data="tableData2" style="width: 100%">
          <el-table-column
            v-for="(item, index) in tablecol_data2"
            :key="index"
            v-bind="item"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="批次分类统计" name="third">
        <el-form :inline="true" ref="form3" :model="form3" label-width="80px">
          <el-form-item prop="val1">
            <el-autocomplete
              class="inline-input"
              v-model="form3.val1"
              :fetch-suggestions="querySearch"
              placeholder="委托方"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item prop="val2">
            <el-autocomplete
              class="inline-input"
              v-model="form3.val2"
              :fetch-suggestions="querySearch"
              placeholder="批次号"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item prop="val3">
            <el-autocomplete
              class="inline-input"
              v-model="form3.val3"
              :fetch-suggestions="querySearch"
              placeholder="逾期账龄"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-button type="text" icon="el-icon-search">查询</el-button>
            <el-button
              type="text"
              icon="el-icon-refresh"
              @click="resetForm('form3')"
            >重置</el-button
            >
          </el-form-item>
        </el-form>
        <el-table :data="tableData2" style="width: 100%">
          <el-table-column
            v-for="(item, index) in tablecol_data2"
            :key="index"
            v-bind="item"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "collectStatusStatistics",
  data() {
    return {
      activeName: "first",
      form1: { val1: null },
      tableData1: [],
      tablecol_data1: [
        { prop: "a12", label: "时段" },
        { prop: "a12", label: "有效通电量" },
        { prop: "a12", label: "总通电量" },
        { prop: "a12", label: "通电案量" }
      ],
      form2:{val1:null,val2:null,val3:null},
      tableData2: [],
      tablecol_data2:[
      ],
      val1_data: [],//tab2 委托方
      val3_data: [],//tab2 逾期账龄
      form3:{val1:null,val2:null,val3:null},
      tableData3: [],
      tablecol_data3:[]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    querySearch(queryString, cb){
      cb([]);
    },
  }
};
</script>

<style lang="scss">
#collect-status-statistics {
}
</style>
