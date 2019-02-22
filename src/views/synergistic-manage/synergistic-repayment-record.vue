<template>
  <div id="synergistic-repayment-record" class="page-wraper-sub">
    <el-tabs v-model="tabName">
      <el-tab-pane label="还款记录" name="1"></el-tab-pane>
      <el-tab-pane label="已撤销" name="2"></el-tab-pane>
    </el-tabs>
    <repay-record-query 
      :queryForm="queryForm">
      <el-button type="primary">导入还款记录</el-button>
      <el-button type="primary">新建还款记录</el-button>
      <el-button type="primary">导出选中数据</el-button>
      <el-button type="primary">导出查询结果</el-button>
    </repay-record-query>
    <div class="statistics-wrap" v-if="tabName==='1'">
      <span class="title">查询结果统计：</span>
      <span class="item">总还款额：0</span>
      <span class="item">总M值：0</span>
      <span class="item">总佣金额：0</span>
    </div>
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
      <el-table-column prop="createTime" label="账龄" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="违案金额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="CP金额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="CP日期" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="回收催收员" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="分配时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="还款金额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="余额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="还款日期" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="还款人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="还款方式" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="确认人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="确认时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="M值" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="公司佣金" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" v-if="tabName==='1'" show-overflow-tooltip width=“100” fixed="right">
        <el-button type="text">修改</el-button>
        <el-button type="text">撤销还款</el-button>
      </el-table-column>
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
        <el-form-item label="对应个案" prop="dyga">
          <el-select v-model="recordInfo.dyga" clearable placeholder="请选择对应个案">
            <!-- <el-option
              v-for="item in positionList"
              :key="item.job"
              :label="item.position"
              :value="item.position"
            ></el-option> -->
          </el-select>
        </el-form-item>
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
        <el-form-item label="确认还款金额" prop="dyga">
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
import {RepayRecordQuery} from './components'
export default {
  name: 'synergisticRepaymentRecord',
  components:{
    RepayRecordQuery
  },
  data(){
    return {
      tabName: '1',
      recordList: [],
      total:0,
      dialogData:{
        title:'',
        editVisible: true
      },
      rules: {

      },
      recordInfo:{},
      queryForm:{
        pageNum: 1,
        pageSize: 10,
      }
    }
  },
  methods: {
    onSelectRow(){},
    onClickQuery(){},
    onClickCancel(){},
    onClickSave(){}
  }
}
</script>

<style lang="scss">
#synergistic-repayment-record{
  .statistics-wrap{
    margin: 12px 0 24px;
  }
  .item{
    margin-right: 12px;
    display: inline-block;
    color: #66b1ff;
  }
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


