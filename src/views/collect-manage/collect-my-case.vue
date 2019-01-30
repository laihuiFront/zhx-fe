<template>
  <div id="collect-my-case">
    <el-row :gutter="24">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-form :inline="true" ref="form" :model="form" label-width="80px">
            <el-form-item prop="val0">
              <el-select
                v-model="form.val0"
                placeholder="请选择委托方"
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
                filterable
                placeholder="请输入批次号"
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
            <el-form-item prop="val3">
              <el-input
                v-model="form.val3"
                placeholder="个案序列号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="val2">
              <el-date-picker
                v-model="form.val2"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="跟进开始日期"
                end-placeholder="跟进结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="val4">
              <el-cascader
                :options="val4_data"
                clearable
                placeholder="选择地区"
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
            <el-form-item prop="val6">
              <el-input
                v-model="form.val6"
                placeholder="证件号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="val7">
              <el-date-picker
                v-model="form.val7"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="委案起始日期"
                end-placeholder="委案结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="val8">
              <el-select
                v-model="form.val8"
                placeholder="请选择逾期账龄"
                clearable
              >
                <el-option
                  v-for="item in val8_data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="val9">
              <el-select
                v-model="form.val9"
                placeholder="请选择案件状态"
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
            <el-form-item prop="val10">
              <el-select
                v-model="form.val10"
                placeholder="请选择催收状态"
                clearable
              >
                <el-option
                  v-for="item in val10_data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="val11">
              <el-select
                v-model="form.val11"
                placeholder="请选择案件类型"
                clearable
              >
                <el-option
                  v-for="item in val11_data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="val12">
              <el-date-picker
                v-model="form.val12"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="还款起始日期"
                end-placeholder="还款结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="val13">
              <el-input
                v-model="form.val13"
                placeholder="委案金额"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="val14">
              <el-select
                v-model="form.val14"
                placeholder="请选择标色状态"
                clearable
              >
                <el-option
                  v-for="item in val14_data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="val15">
              <el-input
                v-model="form.val15"
                placeholder="卡号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="val16">
              <el-input
                v-model="form.val16"
                placeholder="档案号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="val17">
              <el-date-picker
                v-model="form.val17"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="最后跟进起始日期"
                end-placeholder="最后跟进结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="val18">
              <el-input
                v-model="form.val18"
                placeholder="跟进次数"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="val19">
              <el-select
                v-model="form.val19"
                placeholder="是否新分配"
                clearable
              >
                <el-option
                  v-for="item in val19_data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="val20">
              <el-select
                v-model="form.val20"
                placeholder="还款情况"
                clearable
              >
                <el-option
                  v-for="item in val20_data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="val21">
              <el-date-picker
                v-model="form.val21"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="预计退案起始日期"
                end-placeholder="预计退案结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="val22">
              <el-input
                v-model="form.val22"
                placeholder="自定义信息"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="val23">
              <el-input
                v-model="form.val23"
                placeholder="催收分类"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="val24">
              <el-select
                v-model="form.val24"
                placeholder="减免状态"
                clearable
              >
                <el-option
                  v-for="item in val24_data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="val25">
              <el-select
                v-model="form.val25"
                placeholder="报备状态"
                clearable
              >
                <el-option
                  v-for="item in val25_data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="val26">
              <el-input
                v-model="form.val26"
                placeholder="姓名"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="val27">
              <el-input
                v-model="form.val27"
                placeholder="电话号码"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="val28">
              <el-input
                v-model="form.val28"
                placeholder="催收记录"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="text" icon="el-icon-search">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="text"
                icon="el-icon-refresh"
                @click="resetForm('form')"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <el-form :inline="true">
            <el-form-item>
              <el-button type="primary">添加评语</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">申请协催</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-for="(item,index) in tableCol_data" :key="index"
                       v-bind="item"></el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" size="small">导入</el-button>
          <el-button type="text" size="small">下载</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <!--<el-pagination-->
      <!--@size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page="currentPage4"-->
      <!--:page-sizes="[100, 200, 300, 400]"-->
      <!--:page-size="100"-->
      <!--layout="total, sizes, prev, pager, next, jumper"-->
      <!--:total="400">-->
      <!--</el-pagination>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "collectMyCase",
  data() {
    return {
      //表格数据
      tableData: [],
      form: {
        val0: null, //委托方
        val1: null, //批次号
        val2: null, //下次跟进日期
        val3: "", //个案序列号
        val4: null, //地区
        val5: "", //姓名
        val6: "", //证件号
        val7: null, //委案日期
        val8: null, //逾期账龄
        val9: null, //案件状态
        val10: null, //催收状态
        val11: null, //案件类型
        val12: null, //还款日期
        val13: '', //委案金额
        val14: null, //标色状态
        val15: '', //卡号
        val16: '', //档案号
        val17: null, //最后跟进日期
        val18: '', //跟进次数
        val19: null, //是否新分配
        val20: null, //还款情况
        val21: null, //预计退案日期
        val22: '', //自定义信息
        val23: '', //催收分类
        val24: null, //减免状态
        val25: null, //报备状态
        val26: '', //姓名
        val27: '', //电话号码
        val28: '', //催收记录
      },
      val0_data: [],
      val1_data: [],
      val4_data: [],
      val8_data: [],
      // 未退案/正常/暂停/关档/退档/ 全部
      val9_data: [
        { label: "全部", value: 0 },
        { label: "未退案", value: 12 },
        { label: "正常", value: 1 },
        { label: "暂停", value: 2 },
        { label: "关档", value: 3 },
        { label: "退档", value: 33 },
      ],
      val10_data: [],
      val11_data: [],
      val14_data: [],
      val19_data: [{ label: "是", value: 1 },{ label: "否", value: 0 }],
      val20_data: [],
      val24_data: [],
      val25_data: [],
      tableCol_data: [
        {
          prop:'a12',
          label:'跟进次数'
        },
        {
          prop:'a12',
          label:'提醒'
        },{
          prop:'a12',
          label:'下次跟进日期'
        },{
          prop:'a12',
          label:'催收状态'
        },{
          prop:'a12',
          label:'催收分类'
        },{
          prop:'a12',
          label:'逾期账龄'
        },{
          prop:'a12',
          label:'个案序列号'
        },{
          prop:'a12',
          label:'委案日期'
        },{
          prop:'a12',
          label:'预计退案日期'
        },{
          prop:'a12',
          label:'姓名'
        },{
          prop:'a12',
          label:'卡号'
        },{
          prop:'a12',
          label:'证件号'
        },{
          prop:'a12',
          label:'委案金额'
        },{
          prop:'a12',
          label:'委案余额'
        },{
          prop:'a12',
          label:'最新欠款'
        },{
          prop:'a12',
          label:'逾期天数'
        },{
          prop:'a12',
          label:'已还款金额'
        },{
          prop:'a12',
          label:'承诺还款金额'
        },{
          prop:'a12',
          label:'待银行查账金额'
        },{
          prop:'a12',
          label:'上次通电时间'
        },{
          prop:'a12',
          label:'闲置天数'
        },{
          prop:'a12',
          label:'催收小结'
        },
      ],
    };
  },
  computed:{
    realFetchFormData(){
      return {
        'xxx':this.form.val0
      }
    },
  },
  watch: {
    form: {
      handler(newObj) {
        console.log(Object.values(newObj));
      },
      deep: true
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style lang="scss">
#collect-my-case {
}
</style>
