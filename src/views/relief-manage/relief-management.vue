<template>
  <div id="relief-management" class="page-wraper-sub"
  		v-loading="loading"
   	 element-loading-text="拼命加载中"
   	   	  	  v-loading.fullscreen.lock="fullscreenLoading"

    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.7)">
    <el-form ref="form" :model="formInline" :inline="true" class="query-wrap">
      <el-form-item>
        <el-input v-model="formInline.batchNo" clearable placeholder="请输入批次号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.seqno" clearable placeholder="请输入个案序列号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.targetName" clearable placeholder="请输入对象姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.area" clearable placeholder="请选择催收区域">
          <el-option
            v-for="item in areaList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-popover
        placement="bottom-end"
        width="750"
        :visible-arrow="false"
        trigger="click">
          <ul class="condition-wrap">
            <li class="condition-item">
              <el-select v-model="formInline.client" filterable   placeholder="请选择委托方" clearable>
                <el-option
                  v-for="item in clientList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item">
              <el-select v-model="formInline.accountAge" filterable  placeholder="请选择逾期账龄" clearable>
                <el-option
                  v-for="item in accountAgeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
         <!--  </el-form-item>-->
              <!--<el-form-item label="逾期账龄">
                <el-select v-model="formInline.accountAge" filterable  placeholder="请选择逾期账龄" clearable>
                  <el-option
                    v-for="item in accountAgeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="减免状态">
                <el-select v-model="formInline.reduceStatus" filterable  placeholder="请选择减免状态" clearable>
                  <el-option
                    v-for="item in deleteStatusList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="催收状态">
                <el-select v-model="formInline.collectStatus" filterable  placeholder="请选择催收状态" clearable>
                  <el-option
                    v-for="item in collectStatusList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="提交日期">
                <el-date-picker
                  v-model="formInline.time1"
                  type="daterange"
                  align="right"
                  value-format="yyyy-MM-dd"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
               <el-form-item label="有效日期">
                <el-date-picker
                  v-model="formInline.time2"
                  type="daterange"
                  align="right"
                  value-format="yyyy-MM-dd"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
               <el-form-item label="完成日期">
                <el-date-picker
                  v-model="formInline.time3"
                  type="daterange"
                  align="right"
                  value-format="yyyy-MM-dd"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="search">查询</el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click=clear>重置</el-button>
  </el-form-item>
   <el-form-item v-show="istrue1">
    <el-button type="primary" @click=addData >新增减免</el-button>
  </el-form-item>
  <el-form-item v-show="istrue2">
    <el-button type="primary" @click=moreDataList >批量撤销</el-button>
  </el-form-item>
   <el-form-item v-show="istrue3">
    <el-button type="primary" @click=moreDataListcheck >批量审核</el-button>
  </el-form-item>
   <el-form-item v-show="istrue4">
    <el-button type="primary" @click=moreDownDataList >批量下载附件</el-button>
  </el-form-item>
  <el-form-item v-show="istrue5">
    <el-button type="primary" @click="dialogVisible1 = true" >导出减免结果</el-button>
  </el-form-item>
</el-form>
 <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="待审核" name="first"><el-table
      ref="multipleTable"
      :data="tableData3"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
     
    >
      <el-table-column
      	fixed
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="seqno"
        align="center"
        label="个人序列号"-->
            </li>
            <li class="condition-item">
              <el-select v-model="formInline.reduceStatus" filterable  placeholder="请选择减免状态" clearable>
                <el-option
                  v-for="item in deleteStatusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item">
              <el-select v-model="formInline.collectStatus" filterable  placeholder="请选择催收状态" clearable>
                <el-option
                  v-for="item in collectStatusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item half">
              <el-date-picker
                v-model="formInline.time1"
                type="daterange"
                align="right"
                value-format="yyyy-MM-dd"
                unlink-panels
                range-separator="至"
                start-placeholder="提交开始日期"
                end-placeholder="提交结束日期"
                clearable
              >
              </el-date-picker>
            </li>
            <li class="condition-item half">
              <el-date-picker
                v-model="formInline.time2"
                type="daterange"
                align="right"
                value-format="yyyy-MM-dd"
                unlink-panels
                range-separator="至"
                start-placeholder="有效开始日期"
                end-placeholder="有效结束日期"
                clearable
              >
              </el-date-picker>
            </li>
            <li class="condition-item half">
              <el-date-picker
                v-model="formInline.time3"
                type="daterange"
                align="right"
                value-format="yyyy-MM-dd"
                unlink-panels
                range-separator="至"
                start-placeholder="完成开始日期"
                end-placeholder="完成结束日期"
                clearable
              >
              </el-date-picker>
            </li>
          </ul>
          <img src="./zhankai.png" width="12" height="12" alt="更多" slot="reference" style="margin-right:8px;">
        </el-popover>
        <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
        <el-button icon="el-icon-refresh" type="primary" @click="clear">重置</el-button>
      </el-form-item>
      <el-form-item class="operation-item">
        <el-button type="primary"　v-show="istrue1" v-has="'新增减免'" @click=addData >新增减免</el-button>
        <el-button type="primary"　v-show="istrue2" v-has="'批量撤销'" @click=open8 >批量撤销</el-button>
        <el-button type="primary"　v-show="istrue3" v-has="'批量审核'" @click=open9 >批量审核</el-button>
        <el-button type="primary"　v-show="istrue6" v-has="'批量确认'" @click=open10 >批量确认</el-button>
        <el-button type="primary"　v-show="istrue4" v-has="'批量下载附件'" @click=moredownDataList >批量下载附件</el-button>
        <el-button type="primary"　v-show="istrue5" v-has="'导出减免结果'" @click="dialogVisible1 = true"  >导出减免结果</el-button>
      </el-form-item>
    </el-form>
 <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" class="tabs-wrap">
    <el-tab-pane label="待审核" name="first" >
      <el-table
        class="table-wrap"
        height="1"
        ref="multipleTable"
        :data="tableData3"
        style="width: 150%;"
        border
         stripe
          tooltip-effect="dark"
          @sort-change="handleSort"
        @selection-change="handleSelectionChange"
        v-loading="tableLoad"
        @row-dblclick="dbeditCase"
            >
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          prop="seqno"
          align="center"
          label="个案序列号"
          sortable="custom"
          :sort-orders="['ascending','descending']"
           width="120"
        >
           <template slot-scope="scope">
          <el-button type="text" size="small" @click="editCase(scope.row.caseId, scope.row.targetName,scope.row.seqno)">{{scope.row.seqno}}</el-button>
        </template>
        </el-table-column>
        <el-table-column
          prop="targetName"
          align="center"
        label="案人姓名"
        sortable="custom"
          width="120"
        :sort-orders="['ascending','descending']"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="collectStatusMsg"
          align="center"
          label="催收状态"
            width="120"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="moneyMsg"
          align="center"
            width="120"
          label="委案金额"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="completeTime"
        align="center"
          label="完成时间"
            width="160"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="completeUser"
          label="完成人"
            width="120"
          align="center"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="approveRepayAmtMsg"
          align="center"
          min-width="130"
          label="批复还款金额"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="reduceValidTime"
        align="center"
          label="有效日期"
          sortable="custom"
            width="160"
          :sort-orders="['ascending','descending']"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="reduceStatusMsg"
          align="center"
            width="120"
          label="减免状态"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="reduceResult"
        label="减免结果"
          align="center"
            width="120"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="enRepayAmtMsg"
        align="center"
          width="130"
          label="实际还款金额"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="reduceUpdateTime"
          align="center"
            width="180"
          label="减免状态更新时间"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="fileName"
          label="附件"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          width="170"
          align="center"
          show-overflow-tooltip>
          <template slot-scope="scope">
          <el-button type="text" size="small" @click="open7(scope.row)" v-has="'批量审核'">审核</el-button>
          <el-button type="text" size="small" @click="showMessage(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="editMessage(scope.row)" v-has="'修改'">修改</el-button>
            <el-button type="text" size="small" @click="deteleList(scope.row.id)" v-has="'删除'">删除</el-button>
        </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination-wrap"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 500, 2000, 10000, 1000000]"
        :page-size="pages"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-tab-pane>
    <el-tab-pane label="已审核" name="second">
      <el-table
      class="table-wrap"
      ref="multipleTable"
      :data="tableData3"
      height="1"
      style="width: 100%;"
       border
         stripe
          tooltip-effect="dark"
          @sort-change="handleSort"
      @selection-change="handleSelectionChange"
     v-loading="tableLoad"
             @row-dblclick="dbeditCase"
    >
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        prop="seqno"
        align="center"
        label="个案序列号"
         sortable="custom"
          width="120"
          :sort-orders="['ascending','descending']"
      >
      <template slot-scope="scope">
          <el-button type="text" size="small" @click="editCase(scope.row.caseId, scope.row.targetName,scope.row.seqno)">{{scope.row.seqno}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="targetName"
        align="center"
       label="案人姓名"
        width="120"
        sortable="custom"
          :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="collectStatusMsg"
        align="center"
        label="催收状态"
         width="120"
        sortable="custom"
          :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="moneyMsg"
        align="center"
        label="委案金额"
         width="130"
         sortable="custom"
          :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="completeTime"
       align="center"
        width="180"
        label="完成时间"
         sortable="custom"
          :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="completeUser"
        label="完成人"
        align="center"
         width="120"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="approveRepayAmtMsg"
      align="center"
       sortable="custom"
        width="130"
          :sort-orders="['ascending','descending']"
        label="批复还款金额"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reduceValidTime"
      align="center"
        label="有效日期"
        sortable="custom"
         width="160"
          :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reduceStatusMsg"
        align="center"
        label="减免状态"
         width="120"
       sortable="custom"
          :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reduceResult"
      label="减免结果"
       width="120"
        align="center"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="enRepayAmtMsg"
      align="center"
       width="130"
       sortable="custom"
          :sort-orders="['ascending','descending']"
        label="实际还款金额"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reduceUpdateTime"
        align="center"
        label="减免状态更新时间"
         width="180"
        sortable="custom"
          :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="fileName"
        label="附件"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        align="center"
         width="120"
        show-overflow-tooltip>
      </el-table-column>
  
      <el-table-column
        label="操作"
        align="center"
        width="170"
        show-overflow-tooltip>
        <template slot-scope="scope">
         <el-button type="text" size="small" @click="editMessage(scope.row)" v-has="'修改'">修改</el-button>
           <el-button type="text" size="small" @click="deteleList(scope.row.id)" v-has="'删除'">删除</el-button>
       </template>
      </el-table-column>
    
    </el-table>
      <el-pagination
        class="pagination-wrap"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 500, 2000, 10000, 1000000]"
        :page-size="pages"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-tab-pane>
    <el-tab-pane label="已完成" name="third">
      <el-table
      class="table-wrap"
      height="1"
      ref="multipleTable"
      :data="tableData3"
      style="width: 100%;"
       border
         stripe
          tooltip-effect="dark"
          @sort-change="handleSort"
      @selection-change="handleSelectionChange"
      v-loading="tableLoad"
              @row-dblclick="dbeditCase"
    >
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        prop="seqno"
        align="center"
        label="个案序列号"
         width="120"
       sortable="custom"
          :sort-orders="['ascending','descending']"
      >
         <template slot-scope="scope">
          <el-button type="text" size="small" @click="editCase(scope.row.caseId, scope.row.targetName,scope.row.seqno)">{{scope.row.seqno}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="targetName"
        align="center"
       label="案人姓名"
        width="120"
        sortable="custom"
          :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="collectStatusMsg"
        align="center"
        label="催收状态"
         width="120"
        sortable="custom"
          :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="moneyMsg"
        align="center"
        label="委案金额"
         width="130"
    sortable="custom"
          :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="completeTime"
       align="center"
        label="完成时间"
         width="180"
         sortable="custom"
          :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="completeUser"
        label="完成人"
         width="120"
         sortable="custom"
          :sort-orders="['ascending','descending']"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="approveRepayAmtMsg"
      align="center"
        label="批复还款金额"
         width="130"
        sortable="custom"
          :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reduceValidTime"
      align="center"
        label="有效日期"
         width="160"
       sortable="custom"
          :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reduceStatusMsg"
        align="center"
        label="减免状态"
         width="120"
         sortable="custom"
          :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reduceResult"
      label="减免结果"
        align="center"
         width="120"
       sortable="custom"
          :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="enRepayAmtMsg"
      align="center"
        label="实际还款金额"
         width="130"
        sortable="custom"
          :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="reduceUpdateTime"
        align="center"
    sortable="custom"
          :sort-orders="['ascending','descending']"
        label="减免状态更新时间"
         width="180"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="fileName"
        label="附件"
        sortable="custom"
        :sort-orders="['ascending','descending']"
         width="120"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
  
      <el-table-column
        label="操作"
        width="120"
        align="center"
        show-overflow-tooltip>
        <template slot-scope="scope">
         <el-button type="text" size="small" @click="showMessage(scope.row)">查看</el-button>
           <el-button type="text" size="small" @click="downloadList(scope.row)" v-has="'下载附件'">下载附件</el-button>
       </template>
      </el-table-column>
    
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 500, 2000, 10000, 1000000]"
      :page-size="pages"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="pagination-wrap">
    </el-pagination>
    </el-tab-pane>
  </el-tabs>

    <el-dialog
    class="dialog-wrap"
  :title="dialogTitle"
  :visible.sync="dialogVisible"
  width="40%"
  >
  <el-form :model="ruleForm" ref="ruleForm" :disabled="MessageTrue" :inline=true label-width="100px" class="demo-ruleForm">
 	<el-form-item label="个案序列号"
 		prop="seqno"
 		:rules="{
      required: true, message: '请输入个案序列号', trigger: 'blur'  
    }">
    <el-input v-model="ruleForm.seqno" placeholder="请输入个案序列号"></el-input>
  </el-form-item>
  <el-form-item label="批复还款金额">
    <el-input v-model="ruleForm.approveRepayAmt" placeholder="请输入批复还款金额"></el-input>
  </el-form-item>
  <el-form-item label="减免结果">
    <el-input v-model="ruleForm.reduceResult" placeholder="请输入减免结果"></el-input>
  </el-form-item>
   <el-form-item label="有效期"
   		prop="reduceValidTime"
 		:rules="{
       type: 'string', required: true, message: '请选择时间', trigger: 'blur' 
    }">
     <div class="block">
    <el-date-picker
    	value-format="yyyy-MM-dd"
      v-model="ruleForm.reduceValidTime"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
  </el-form-item>
  </el-form>
  <span slot="footer" class="footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" v-if=!MessageTrue @click="submitForm('ruleForm')">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
  title="导出查询结果"
  :visible.sync="dialogVisible1"
  width="30%"
  center
  >
  <el-row :gutter="20">
  <el-col :span="10"><div class="grid-content bg-purple"> 
  	<el-radio v-model="radio" label="1" >按查询条件全部导出</el-radio>
</div></el-col>
  <el-col :span="10">
  	<div class="grid-content bg-purple">  
  		<el-radio v-model="radio" label="2" >按查询条件导出当前分页</el-radio>
</div></el-col>
</el-row>
 <span slot="footer" class="footer" >
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="changeRadio">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
	 const CaseDetail = () => import('@/views/data-manage/detail');
	import {areaList,sureData,clientList,downDataList,PersonList,pageDataBatchExport,dataList,checkData,deleteStatusList,accountAgeList,collectStatusList,remoweData,addDataform,remoweDataList} from '@/common/js/relief-management.js'
	
export default {
  name: 'reliefManagement',
  components: {
      CaseDetail
    },
  data(){
    return {
    	radio:"1",
    	MessageTrue:false,
    	fullscreenLoading:false,
    	loading:false,
      tableLoad:false,
    	dialogVisible1:false,
    	sType:0,
    	istrue1:true,
    	istrue2:false,
    	istrue3:true,
    	istrue4:true,
    	istrue5:false,
    	istrue6:false,
    	activeName2:"first",
    	dialogTitle:'新增减免',
    	ruleForm:{
    	
    	},
    	dialogVisible:false,
    	accountAgeList:[],
    	dataList:[],
    	 currentPage4: 1,
        pages:100,
        total:0,
    	formInline:{
    		time1:[],
    		time2:[],
    		time3:[]
    	},
    	PersonLists:[],
    	areaList:[],
    	clientList:[],
    	 tableData3: [],
    	 collectStatusList:[],
    	 deleteStatusList:[],
    	 deleteList:[],
    	 applyStatus:0,
    	 downList:[],
    	orderBy:"id",
      sort:"desc",
    }
},
 methods: {
 	 	changeRadio(){
		if(this.radio==1){
			this.totalDataExport()
		}else{
			this.pageDataExport()
		}
	},
 	editCase(id, name, seqNo){
        this.$router.push({
          path:'case-detail',
          query:{
            id,
            name,
            seqNo
          }
        })
    
      },
      dbeditCase(row){
      	this.editCase(row.caseId, row.targetName,row.seqno)
      },
 	  open7(row) {
        this.$confirm('确定审核通过减免申请转入待提交吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.checkData(row)
        }).catch(() => {

        });
      },
       open8() {
        this.$confirm('确定撤销吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.moreDataList()
        }).catch(() => {

        });
      },
      open9() {
        this.$confirm('确定审核通过减免申请转入待提交吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.moreDataListcheck()
        }).catch(() => {

        });
      },
      open10() {
        this.$confirm('确定通过进入已完成吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.moreDataListsure()
        }).catch(() => {

        });
      },
 	   handleSort( {column,prop,order}){
      this.sort = order==null?"desc":order.replace("ending","")
      this.orderBy = prop==null?"id":prop
      this.search()

    },
 	downloadList(row){
 		if(!row.fileName){
 			this.$message({
            type: 'error',
            message: '无下载数据!'
          });
          return
 		}
 		let downloadData=[]
 		downloadData.push(row.id);
 		this.fullscreenLoading=true
    	this.loading=true
 			downDataList(downloadData).then((response)=>{
          this.$message({
            type: 'success',
            message: '下载成功!'
          });
          this.tableLoad = true
          this.fullscreenLoading=false
    	this.loading=false
          dataList(this.formInline,this.applyStatus,this.sort,this.orderBy,this.currentPage4,this.pageSize).then((response)=>{
          	this.tableData3=response.list
          	this.formInline={	time1:[],time2:[],time3:[]}
            this.total = response.total
            this.tableLoad = false
          })
          }) 
 	},
 	totalDataExport(){
 		this.fullscreenLoading=true
    	this.loading=true
 		this.sType=0
pageDataBatchExport(this.formInline,this.applyStatus,this.sType,this.sort,this.orderBy,this.currentPage4,this.pageSize).then((response)=>{
          	this.fullscreenLoading=false
    	this.loading=false
          })

 
 	},
 	pageDataExport(){
 		this.fullscreenLoading=true
    	this.loading=true
 		this.sType=1
pageDataBatchExport(this.formInline,this.applyStatus,this.sType,this.sort,this.orderBy,this.currentPage4,this.pageSize).then((response)=>{
          	this.fullscreenLoading=false
    	this.loading=false
          })
},
 	moreDataListcheck(){
 		if(this.deleteList.length>=1){
 			checkData(this.deleteList).then((response)=>{
          this.$message({
            type: 'success',
            message: '审核成功!'
          });
          this.tableLoad = true
          dataList(this.formInline,this.applyStatus,this.sort,this.orderBy,this.currentPage4,this.pageSize).then((response)=>{
          	this.tableData3=response.list
          	this.formInline={	time1:[],time2:[],time3:[]}
            this.total = response.total
            this.tableLoad = false
          })
          })    
 		}else{
 			this.$message({
            type: 'error',
            message: '请选择数据!'
          });
 		}
 	},
 	checkData(row){
 		let ids=[]
 		ids.push(row.id)
 		checkData(ids).then((response)=>{
          this.$message({
            type: 'success',
            message: '审核成功!'
          });
//        dataList(this.formInline,this.applyStatus).then((response)=>{
//        	this.tableData3=response.list
//        	this.formInline={	time1:[],time2:[],time3:[]}
//        })
this.search()
          })    
 	},
 	handleClick(tab, event) {
       if(this.activeName2==="first"){
	     this.istrue1=true
    	this.istrue2=false
    	this.istrue3=true
    	this.istrue4=true
    	this.istrue5=false
    	this.istrue6=false
    	this.applyStatus=0
    	this.search()
       } else if(this.activeName2==="second"){
       	 this.istrue1=false
    	   this.istrue2=true
        	this.istrue3=false
        	this.istrue4=false
    	   this.istrue5=true
    	   this.istrue6=true
    	   this.applyStatus=1
    	   this.search()
       } else{
       	this.istrue1=false
    	   this.istrue2=false
        	this.istrue3=false
        	this.istrue4=true
    	   this.istrue5=false
    	    this.istrue6=false
    	   this.applyStatus=2
    	   this.search()
       }   },
 	showMessage(row){
 		this.ruleForm=row
 		this.dialogTitle="查看减免"
 		this.dialogVisible=true
 		this.MessageTrue=true
 	},
 		editMessage(row){
 		this.ruleForm=JSON.parse(JSON.stringify(row))
 		this.dialogTitle="修改减免"
 		this.dialogVisible=true
 			this.MessageTrue=false
 	},
 	moreDataList(){
 		if(this.deleteList.length>=1){
 			remoweDataList(this.deleteList).then((response)=>{
          this.$message({
            type: 'success',
            message: '撤销成功!'
          });
          this.tableLoad = true
          dataList(this.formInline,this.applyStatus,this.sort,this.orderBy,this.currentPage4,this.pageSize).then((response)=>{
          	this.tableData3=response.list
          	this.formInline={	time1:[],time2:[],time3:[]}
            this.total = response.total
            this.tableLoad = false
          })
          })    
 		}else{
 			this.$message({
            type: 'error',
            message: '请选择数据!'
          });
 		}
 	},
 	moreDataListsure(){
 		if(this.deleteList.length>=1){
 			sureData(this.deleteList).then((response)=>{
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.tableLoad = true
          dataList(this.formInline,this.applyStatus,this.sort,this.orderBy,this.currentPage4,this.pageSize).then((response)=>{
          	this.tableData3=response.list
          	this.formInline={	time1:[],time2:[],time3:[]}
            this.total = response.total
            this.tableLoad = false
          })
          })    
 		}else{
 			this.$message({
            type: 'error',
            message: '请选择数据!'
          });
 		}
 	},
 		moredownDataList(){
   	/*		for (var i=0;i<this.downList.length;i++){
   				if(!this.downList[i]){
              this.$message({
                type: 'error',
                message: '无下载数据!'
              });
            return
   				}
   				
   			}*/
 			
 		if(this.deleteList.length>=1){
 				this.fullscreenLoading=true
          this.loading=true

         for(var i=0;i<this.deleteList.length;i++){
           if(this.downList[i]){
             let realDeleteList = [];
             realDeleteList[0] = this.deleteList[i]

             downDataList(realDeleteList).then((response)=>{

             })
           }

         }
        this.fullscreenLoading=false
        this.loading=false

      }else{
        this.$message({
              type: 'error',
              message: '请选择数据!'
            });
      }
 	},
 	search(){
     this.tableLoad = true
 		  dataList(this.formInline,this.applyStatus,this.sort,this.orderBy,this.currentPage4,this.pageSize).then((response)=>{
          	this.tableData3=response.list
            this.total = response.total
            this.tableLoad = false
          })
 	},
 	deteleList(id){
 		this.deleteList.push(id)
 		remoweData(this.deleteList).then((response)=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.tableLoad = true
           dataList(this.formInline,this.applyStatus,this.sort,this.orderBy,this.currentPage4,this.pageSize).then((response)=>{
          	this.tableData3=response.list
             this.total = response.total
             this.tableLoad = false
          })
          })    
 	},
 	 submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           addDataform(this.ruleForm).then((response)=>{
              this.$message({
                 type: 'success',
                 message: '新增成功!'
             });
             this.dialogVisible=false;
             this.tableLoad = true
          dataList(this.formInline,this.applyStatus,this.sort,this.orderBy,this.currentPage4,this.pageSize).then((response)=>{
          	this.tableData3=response.list
          	this.formInline={	time1:[],time2:[],time3:[]}
            this.total = response.total
            this.tableLoad = false
          })
          })     
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
 	addData(){
 		this.MessageTrue=false
 		this.dialogTitle='新增减免',
 		this.dialogVisible=true
 		this.ruleForm={
    		reduceValidTime:'',
    		seqno:''	
    	}
 	},
 	clear(){
 			this.formInline={
    		time1:[],
    		time2:[],
    		time3:[]
    	}
 	},
 		handleSelectionChange(row){
  		let _self=this
  		_self.deleteList=[]
  		_self.downList=[]
  		
	row.forEach(function(currentValue, index, arr){
	   _self.deleteList.push(currentValue.id)
	   _self.downList.push(currentValue.fileName)
	})
},
handleSizeChange(val){
	this.pageSize=val
	this.search()
},
handleCurrentChange(val){
this.currentPage4=val;
this.search()
},
 },
 created() {
 	
         	accountAgeList().then((response)=>{
            this.accountAgeList=response
          })
          areaList().then((response)=>{
          	this.areaList=response
          })
       
            clientList().then((response)=>{
          	this.clientList=response
          })
           
             PersonList().then((response)=>{
          	this.PersonLists=response
          })
          this.tableLoad = true
              dataList(this.formInline,this.applyStatus,this.sort,this.orderBy,this.currentPage4,this.pageSize).then((response)=>{
          	this.tableData3=response.list
            this.total = response.total
            this.tableLoad = false
          })
               collectStatusList().then((response)=>{
                this.collectStatusList=response
           }) 
            deleteStatusList().then((response)=>{
             this.deleteStatusList=response
          })
            
            
},
}
</script>

<style lang="scss">
#relief-management{
	.el-dialog__header{
  	background-color: #f8f8f8;
  }
}
</style>


