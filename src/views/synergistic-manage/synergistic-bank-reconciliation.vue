<template>
  <div id="synergistic-bank-reconciliation" class="page-wraper-sub">
    <el-tabs v-model="queryForm.status">
      <el-tab-pane label="待银行对帐" name="0"></el-tab-pane>
      <el-tab-pane label="已作废" name="1"></el-tab-pane>
    </el-tabs>
    <bank-record-query 
      @reset="onClickReset"
      @query="onClickQuery"
      :queryForm="queryForm">
      <el-button type="primary" v-if="queryForm.status==='0'">作废CP</el-button>
      <el-button type="primary" v-if="queryForm.status==='0'">导入CP</el-button>

      <el-button type="primary">导出选中数据</el-button>
      <el-dropdown trigger="click" @command="handleCommand">
        <el-button type="primary">导出查询结果<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="all">导出全部</el-dropdown-item>
          <el-dropdown-item command="current">导出当前分页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </bank-record-query>
    <el-table
      @selection-change="onSelectRow"
      :data="recordList"
      style="width: 100%"
      class="table-wrap">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="createTime" label="批次号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="卡号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="证件号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="姓名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="个案序列号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="委托方" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="委案金额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="案件已还款" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="CP金额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="CP日期" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="还款人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="还款方式" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="提交人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="提交时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="备注" show-overflow-tooltip></el-table-column>
    </el-table>
    <el-pagination
      @size-change="onClickQuery"
      @current-change="onClickQuery"
      :current-page.sync="queryForm.pageNum"
      :page-size.sync="queryForm.pageSize"
      layout="prev, pager, next, jumper,total, sizes"
      :total="total"
      class="pagination-wrap"
    ></el-pagination>
    <el-dialog
      :title="dialogData.title"
      class="dialog-wrap"
      :visible.sync="dialogData.editVisible"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-form
        :model="recordInfo"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="add-form"
      >
        <el-form-item label="回收催收员" prop="dyga">
          <el-select v-model="recordInfo.dyga" clearable placeholder="请选择回收催收员">
            <!-- <el-option
              v-for="item in positionList"
              :key="item.job"
              :label="item.position"
              :value="item.position"
            ></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="还款日期" prop="dyga">
          <el-date-picker
            clearable
            v-model="recordInfo.joinTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择还款日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="确认还款" prop="dyga">
          <el-input v-model="recordInfo.mobile" clearable placeholder="确认还款金额"></el-input>
        </el-form-item>
        <el-form-item label="还款人" prop="dyga">
           <el-input v-model="recordInfo.mobile" clearable placeholder="请输入还款人"></el-input>
        </el-form-item>
        <el-form-item label="还款方式" prop="dyga">
          <el-select v-model="recordInfo.dyga" clearable placeholder="请选择还款方式">
            <!-- <el-option
              v-for="item in positionList"
              :key="item.job"
              :label="item.position"
              :value="item.position"
            ></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="dyga" class="whole">
          <el-input type="textarea" :rows="4" v-model="recordInfo.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="footer">
        <el-button @click="onClickCancel">取 消</el-button>
        <el-button type="primary" @click="onClickSave">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {BankRecordQuery} from './components'
export default {
  name: 'synergisticBankReconciliation',
  components:{
    BankRecordQuery
  },
  data(){
    return {
      recordList: [],
      total:0,
      dialogData:{
        title:'',
        editVisible: false
      },
      rules: {

      },
      recordInfo:{},
      queryForm:{
        status: '0',
        pageNum: 1,
        pageSize: 10,
        dataCase: {
          collectionArea:{},
          collectionUser:{},
          caseArea:{},
        },
      }
    }
  },
  methods: {
    onClickReset(){
      this.queryForm = {
        status: this.queryForm.status,
        pageNum: this.queryForm.pageNum,
        pageSize: this.queryForm.pageSize,
        dataCase: {
          collectionArea:{id: null},
          collectionUser:{id: null},
          caseArea:{id: null},
        }
      }
    },
    onSelectRow(){},
    onClickQuery(){},
    onClickCancel(){},
    onClickSave(){},
    handleCommand(){}
  }
}
</script>

<style lang="scss">
#synergistic-bank-reconciliation{
  .add-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      display: flex;
      width: 50%;
      &.whole{
        width: 100%;
      }
      .el-form-item__content {
        flex: 1;
        margin-left: 0 !important;
        .el-select {
          width: 100%;
        }
      }
    }
  }
}
</style>


