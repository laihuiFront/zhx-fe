<template>
  <div id="litigation-my" class="page-wraper-sub">
  	 <el-tabs v-model="activeName2" class="tabs-wrap">
    <el-tab-pane label="我的诉讼案件" name="first">
      <el-form ref="form" :model="form" :inline="true" class="query-wrap queryStyle">
        <el-form-item label="案件状态：">
          <el-select v-model="form.legalStatus" filterable collapse-tags multiple  placeholder="请选择案件状态" clearable>
            <el-option
              v-for="item in legalStatusMsgList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="案号：">
          <el-input v-model="form.legalNo" placeholder="请输入案号" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="form.cstName" placeholder="请输入姓名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="clench">重置</el-button>
          <el-button type="primary" v-has="'添加诉讼案件'" @click="addDataform">添加诉讼案件</el-button>
        </el-form-item>
      </el-form>

   <el-table highlight-current-row v-loading="tableLoad"
    :data="DataList"
    tooltip-effect="dark"
    @sort-change="handleSort">
    <el-table-column
      prop="legalStatusMsg"
      align="center"
      min-width="120"
      label="案件状态"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
   <el-table-column
      prop="progressMsg"
      align="center"
      min-width="120"
      label="办案进度"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="legalTypeMsg"
      align="center"
      min-width="120"
      label="案件类型"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="cstName"
      align="center"
      min-width="120"
      label="客户姓名"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="legalDate"
      align="center"
      min-width="120"
      label="委案日期"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="clientele"
      align="center"
      min-width="120"
      label="委托人"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="accused"
      align="center"
      min-width="120"
      label="被告人"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="tital"
      align="center"
      min-width="120"
      label="标的"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="costMsg"
      align="center"
      min-width="120"
      label="费用"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="ownerName"
      align="center"
      min-width="120"
      label="所属人"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="agent"
      min-width="120"
      align="center"
      label="代理律师"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="court"
      align="center"
      min-width="120"
      label="受案法院"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="legalNo"
      align="center"
      min-width="120"
      label="案号"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="remark"
      align="center"
      min-width="180"
      label="备注"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      align="center"
      label="操作"
      width="180"
     >
     <template slot-scope="scope">
       <el-button type="text" size="small"  @click="showmessage(scope.row)" v-has="'查看'">查看</el-button>
       <el-button type="text" size="small"  @click="editData(scope.row)" v-has="'编辑'">编辑</el-button>
       <el-button type="text" size="small"  @click="deleteData(scope.row.id)" v-has="'删除'">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage1"
    :page-sizes="pageSizes"
    :page-size="pages1"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total1">
  </el-pagination>
  	<el-dialog
  :title="dialogTitle"
  append-to-body
  :visible.sync="dialogVisible"
  width="90%"
  :close-on-click-modal="false"
  v-dialogDrag
  class="dialog-wrap"
  >
 <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="140px" :disabled="isTrue">
 	<el-row :gutter="24">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="姓名">
    <el-input v-model="formInline.cstName" placeholder="请输入姓名"></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		<el-form-item label="案件状态">
     <el-select v-model="formInline.legalStatusMsg " filterable  placeholder="请选择案件状态" clearable>
    <el-option
      v-for="item in legalStatusMsgList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
     </el-select>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
   <el-form-item label="证件号">
    <el-input v-model="formInline.identNo" placeholder="请输入证件号"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>

  <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		<el-form-item label="办案进度">
    <el-select v-model="formInline.progress" filterable  placeholder="请选择办案进度" clearable>
    <el-option
      v-for="item in progressList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
     </el-select>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="案件类型">
     <el-select v-model="formInline.legalType" filterable  placeholder="请选择案件类型" clearable>
    <el-option
      v-for="item in caseStatusList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
     </el-select>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
    <el-form-item label="标的">
    <el-input v-model="formInline.tital" placeholder="请输入标的"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
  <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	<el-form-item label="委托人">
    <el-input v-model="formInline.clientele" placeholder="请输入委托人"></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	   <el-form-item label="所属人">
     <el-select v-model="formInline.owner" filterable  placeholder="请选择所属人" clearable>
    <el-option
      v-for="item in PersonDataList"
      :key="item.id"
      :label="item.userName"
      :value="item.id">
    </el-option>
     </el-select>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
    <el-form-item label="被告人">
    <el-input v-model="formInline.accused" placeholder="请输入被告人"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
 <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="代理律师">
    <el-input v-model="formInline.agent" placeholder="请输入代理律师"></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	    <el-form-item label="律师联系方式">
    <el-input v-model="formInline.agentTel" placeholder="请输入律师联系方式"></el-input>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
    <el-form-item label="费用">
    <el-input v-model="formInline.cost" placeholder="请输入费用"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
 <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="委案日期">
     <div class="block">
    <el-date-picker
      v-model="formInline.legalDate"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="请选择委案日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	   <el-form-item label="受案日期">
     <div class="block">
    <el-date-picker
    	value-format="yyyy-MM-dd"
      v-model="formInline.filingDate"
      type="date"
      placeholder="请选择受案日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
    <el-form-item label="受案法院">
    <el-input v-model="formInline.court" placeholder="请输入受案法院"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
     <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="办案法官">
    <el-input v-model="formInline.judge" placeholder="请输入办案法官"></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	    <el-form-item label="法官联系方式">
    <el-input v-model="formInline.judgeTel" placeholder="请输入法官联系方式"></el-input>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
    <el-form-item label="案号">
    <el-input v-model="formInline.legalNo" placeholder="请输入案号"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
    <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="首次开庭日期">
     <div class="block">
    <el-date-picker
    	value-format="yyyy-MM-dd"
      v-model="formInline.firstDate"
      type="date"
      placeholder="请选择首次开庭日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	   <el-form-item label="判决日期">
     <div class="block">
    <el-date-picker
    	value-format="yyyy-MM-dd"
      v-model="formInline.judgeDate"
      type="date"
      placeholder="请选择判决日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
    <el-form-item label="申请执行案号">
    <el-input v-model="formInline.exeNo" placeholder="请输入申请执行案号"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
  <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="申请执行日期">
     <div class="block">
    <el-date-picker
    	value-format="yyyy-MM-dd"
      v-model="formInline.exeDate"
      type="date"
      placeholder="请选择申请执行日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	   <el-form-item label="执行终结日期">
     <div class="block">
    <el-date-picker
    	value-format="yyyy-MM-dd"
      v-model="formInline.exeEndDate"
      type="date"
      placeholder="请选择执行终结日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
      <el-form-item label="诉讼缴费日期">
     <div class="block">
    <el-date-picker
    	value-format="yyyy-MM-dd"
      v-model="formInline.costDate"
      type="date"
      placeholder="请选择诉讼缴费日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="保全缴费日期">
     <div class="block">
    <el-date-picker
    	value-format="yyyy-MM-dd"
      v-model="formInline.preservationDate"
      type="date"
      placeholder="请选择保全缴费日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	 <el-form-item label="送达情况">
    <el-input v-model="formInline.arriveInfo" placeholder="请输入送达情况"></el-input>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
  	</div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="16">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="保全资产清单">
    <el-input type="textarea" style="width: 280%;" placeholder="请输入保全资产清单" v-model="formInline.preservationList"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="16">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="判决书">
    <el-input type="textarea" style="width: 280%;" placeholder="请输入判决书" v-model="formInline.judgment"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="16">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="备注">
     <el-input type="textarea" style="width: 280%;" placeholder="请输入备注" v-model="formInline.remark"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="SaveData">确 定</el-button>
  </span>
</el-dialog>
    </el-tab-pane>
    <el-tab-pane label="全部诉讼案件" name="second">
      <el-form ref="form" :model="form2" :inline="true" class="query-wrap queryStyle">
        <el-form-item label="案件状态：">
          <el-select v-model="form2.legalStatus" filterable collapse-tags multiple  placeholder="请选择案件状态" clearable>
            <el-option
              v-for="item in legalStatusMsgList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="案号：">
          <el-input v-model="form2.legalNo" placeholder="请输入案号" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="form2.cstName" placeholder="请输入姓名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search2">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="clench2">重置</el-button>
          <el-button type="primary" @click="addDataform">添加诉讼案件</el-button>
        </el-form-item>
      </el-form>

   <el-table highlight-current-row v-loading="tableLoad"
    :data="DataList2"
    tooltip-effect="dark"
    @sort-change="handleSort2">
    <el-table-column
      prop="legalStatusMsg"
      align="center"
      min-width="120"
      label="案件状态"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="progressMsg"
      align="center"
      min-width="120"
      label="办案进度"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="legalTypeMsg"
      align="center"
      min-width="120"
      label="案件类型"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="cstName"
      align="center"
      min-width="120"
      label="客户姓名"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="legalDate"
      align="center"
      min-width="120"
      label="委案日期"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="clientele"
      align="center"
      min-width="120"
      label="委托人"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="accused"
      min-width="120"
      align="center"
      label="被告人"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="tital"
      min-width="120"
      align="center"
      label="标的"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="costMsg"
      min-width="120"
      align="center"
      label="费用"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="ownerName"
      align="center"
      min-width="120"
      label="所属人"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="agent"
      align="center"
      min-width="120"
      label="代理律师"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="court"
      align="center"
      min-width="120"
      label="受案法院"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="legalNo"
      align="center"
      min-width="120"
      label="案号"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      prop="remark"
      align="center"
      min-width="180"
      label="备注"
      sortable="custom"
      :sort-orders="['ascending','descending']"
      show-overflow-tooltip
     >
    </el-table-column>
    <el-table-column
      align="center"
      label="操作"
      width="180"
     >
     <template slot-scope="scope">
       <el-button type="text" size="small" v-has="'查看'" @click="showmessage(scope.row)">查看</el-button>
       <el-button type="text" size="small" v-has="'编辑'" @click="editData(scope.row)">编辑</el-button>
       <el-button type="text" size="small" v-has="'删除'" @click="deleteData(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  	 <el-pagination
      @size-change="handleSizeChange2"
      @current-change="handleCurrentChange2"
      :current-page="currentPage4"
      :page-sizes="pageSizes"
      :page-size="pages"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  	<el-dialog
    class="dialog-wrap"
  :title="dialogTitle"
  append-to-body
  :visible.sync="dialogVisible"
  width="90%"
  :close-on-click-modal="false"
  v-dialogDrag
  >
 <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="140px" :disabled="isTrue">
 	<el-row :gutter="24">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="姓名">
    <el-input v-model="formInline.cstName" style="width:200px;" placeholder="请输入姓名"></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		<el-form-item label="案件状态">
     <el-select v-model="formInline.legalStatus" style="width:200px;" filterable  placeholder="请选择案件状态" clearable>
    <el-option
      v-for="item in legalStatusMsgList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
     </el-select>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
   <el-form-item label="证件号">
    <el-input v-model="formInline.identNo" style="width:200px;" placeholder="请输入证件号"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>

  <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		<el-form-item label="办案进度">
    <el-select v-model="formInline.progress" filterable  style="width:200px;"  placeholder="请选择案件进度" clearable>
    <el-option
      v-for="item in progressList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
     </el-select>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="案件类型">
     <el-select v-model="formInline.legalType" filterable  style="width:200px;"  placeholder="请选择案件类型" clearable>
    <el-option
      v-for="item in caseStatusList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
     </el-select>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
    <el-form-item label="标的">
    <el-input v-model="formInline.tital" placeholder="请输入标的" style="width:200px;" ></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>


  <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	<el-form-item label="委托人">
    <el-input v-model="formInline.clientele" placeholder="请输入委托人" style="width:200px;" ></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	   <el-form-item label="所属人">
     <el-select v-model="formInline.owner" filterable  style="width:200px;"  placeholder="请选择所属人" clearable>
    <el-option
      v-for="item in PersonDataList"
      :key="item.id"
      :label="item.userName"
      :value="item.id">
    </el-option>
     </el-select>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
    <el-form-item label="被告人">
    <el-input v-model="formInline.accused"  style="width:200px;" placeholder="请输入被告人"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>

 <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="代理律师">
    <el-input v-model="formInline.agent"  style="width:200px;" placeholder="请输入代理律师"></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	    <el-form-item label="律师联系方式">
    <el-input v-model="formInline.agentTel"  style="width:200px;" placeholder="请输入律师联系方式"></el-input>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
    <el-form-item label="费用">
    <el-input v-model="formInline.cost"  style="width:200px;" placeholder="请输入费用"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>

 <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="委案日期">
     <div class="block">
    <el-date-picker
      v-model="formInline.legalDate"
      type="date"
      style="width:200px;"
      value-format="yyyy-MM-dd"
      placeholder="请选择委案日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	   <el-form-item label="受案日期">
     <div class="block">
    <el-date-picker
    	value-format="yyyy-MM-dd"
      v-model="formInline.filingDate"
      type="date"
      style="width:200px;"
      placeholder="请选择受案日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
    <el-form-item label="受案法院">
    <el-input v-model="formInline.court"  style="width:200px;" placeholder="请输入受案法院"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>

     <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="办案法官">
    <el-input v-model="formInline.judge"  style="width:200px;" placeholder="请输入办案法官"></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	    <el-form-item label="法官联系方式">
    <el-input v-model="formInline.judgeTel"  style="width:200px;" placeholder="请输入法官联系方式"></el-input>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
    <el-form-item label="案号">
    <el-input v-model="formInline.legalNo"  style="width:200px;" placeholder="请输入案号"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>

    <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="首次开庭日期">
     <div class="block">
    <el-date-picker
    	value-format="yyyy-MM-dd"
      style="width:200px;"
      v-model="formInline.firstDate"
      type="date"
      placeholder="请选择首次开庭日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	   <el-form-item label="判决日期">
     <div class="block">
    <el-date-picker
    	value-format="yyyy-MM-dd"
      style="width:200px;"
      v-model="formInline.judgeDate"
      type="date"
      placeholder="请选择判决日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
    <el-form-item label="申请执行案号">
    <el-input v-model="formInline.exeNo"  style="width:200px;" placeholder="请输入申请执行案号"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>

  <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="申请执行日期">
     <div class="block">
    <el-date-picker
    	value-format="yyyy-MM-dd"
      v-model="formInline.exeDate"
      style="width:200px;"
      type="date"
      placeholder="请选择申请执行日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	   <el-form-item label="执行终结日期">
     <div class="block">
    <el-date-picker
    	value-format="yyyy-MM-dd"
      v-model="formInline.exeEndDate"
      style="width:200px;"
      type="date"
      placeholder="请选择执行终结日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
      <el-form-item label="诉讼缴费日期">
     <div class="block">
    <el-date-picker
    	value-format="yyyy-MM-dd"
      v-model="formInline.costDate"
      style="width:200px;"
      type="date"
      placeholder="请选择诉讼缴费日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
</el-row>

<el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="保全缴费日期">
     <div class="block">
    <el-date-picker
    	value-format="yyyy-MM-dd"
      style="width:200px;"
      v-model="formInline.preservationDate"
      type="date"
      placeholder="请选择保全缴费日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	 <el-form-item label="送达情况">
    <el-input v-model="formInline.arriveInfo"  style="width:200px;" placeholder="请输入送达情况"></el-input>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">

  	</div></el-col>
</el-row>

<el-row :gutter="20">
  <el-col :span="16">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="保全资产清单">
    <el-input type="textarea" style="width: 280%;" placeholder="请输入保全资产清单" v-model="formInline.preservationList"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>

<el-row :gutter="20">
  <el-col :span="16">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="判决书">
    <el-input type="textarea" style="width: 280%;" placeholder="请输入判决书"  v-model="formInline.judgment"></el-input>
  </el-form-item>
  	</div></el-col>

</el-row>

<el-row :gutter="20">
  <el-col :span="16">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="备注">
     <el-input type="textarea" style="width: 280%;" placeholder="请输入备注"  v-model="formInline.remark"></el-input>
  </el-form-item>
  	</div></el-col>

</el-row>
</el-form>

  <span slot="footer" class="dialog-footer">
    <el-button  @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="SaveData" v-if=!isTrue> 确 定</el-button>
  </span>
</el-dialog></el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import {getCaseTypeList,dataList,remoweData,addData,PersonList,checkData,dataList2} from '@/common/js/litigation-my.js'
import {pageSizes} from "@/common/js/const"

export default {
  name: 'litigationMy',
	data(){
  		return{
        pageSizes,
        orderBy:"id",
        sort:"desc",
        tableLoad:false,
        activeName2: 'first',
  			isTrue:false,
  			dialogTitle:'新增',
  			progressList:[{name:"立案",id:"filing"},{name:"收案",id:"back"},{name:"保全",id:"presv"},{name:"开庭",id:"court"},{name:"判决",id:"decree"},{name:"执行",id:"enforce"}],
        legalStatusMsgList:[{name:"办案",id:0},{name:"结案",id:1},{name:"待审核",id:-1}],
        caseStatusList:[],
  			formInline:{},
  			dialogVisible:false,
  			dialogVisible1:false,
  		  form:{},
  		  form2:{},
  		  checkform:{
  		  	resource:''
  		  },
  		  currentPage4: 1,
        pages:1,
        currentPage1:1,
        pages1:1,
        total1:0,
        total:0,
        pageSize:pageSizes[0],
        pageNum:1,
        pageSize2:pageSizes[0],
        pageNum2:1,
        DataList: [],
        DataList2: [],
        PersonDataList:[],
        checkId:'',
  	}
  },
   methods: {
     handleSort({column, prop, order}) {
       this.sort = order == null ? "desc" : order.replace("ending", "")
       this.orderBy = prop == null ? "id" : prop
       this.search()
     },
     handleSort2({column, prop, order}) {
       this.sort = order == null ? "desc" : order.replace("ending", "")
       this.orderBy = prop == null ? "id" : prop
       this.search2()
     },
     showmessage(row) {
       this.dialogVisible = true
       this.dialogTitle = "详情"
       this.isTrue = true
       this.formInline = row

       this.formInline.progress = parseInt(row.progress)
       this.formInline.owner = parseInt(row.owner)
     },
     addDataform() {
       this.formInline = {};
       this.dialogVisible = true
       this.dialogTitle = "新增"
       this.isTrue = false
     },
     checkresource() {
       checkData(this.checkform, this.checkId).then((response) => {
         this.$message({
           type: 'success',
           message: '审核成功!'
         });
         this.dialogVisible = false;
         this.search()
         this.formInline = {}
         this.checkId = ''
       })
     },
     SaveData() {
       addData(this.formInline).then((response) => {
         this.$message({
           type: 'success',
           message: '保存成功!'
         });
         this.dialogVisible = false;
         this.search()
         this.formInline = {}
       })
     },
     checkDatasure(id) {
       this.dialogVisible1 = true;
       this.checkId = id;
     },
     editData(row) {
       this.dialogVisible = true;
       this.dialogTitle = "修改";
       this.formInline = JSON.parse(JSON.stringify(row))
       this.formInline.progress = row.progress
       if (!this.formInline.progress) {
         this.formInline.progress = ""
       }

       if (row.owner == null || row.owner == "") {
         this.$set(this.formInline, 'owner', this.PersonDataList)
       } else {
         this.formInline.owner = parseInt(row.owner)
       }
       this.isTrue = false
     },
     deleteData(id) {
       let _self = this
       _self.$confirm('是否删除?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning',
         center: true
       }).then(() => {
         remoweData(id).then((response) => {
           _self.$message({
             type: 'success',
             message: '删除成功!'
           });
           _self.search(this.form)
         })
       }).catch(() => {
         _self.$message({
           type: 'success',
           message: '已取消删除!'
         });
       });
     },
     clench() {
       this.form = {}
     },
     clench2() {
       this.form2 = {}
     },
     search() {
       this.tableLoad = true
       dataList(this.form, this.orderBy, this.sort).then((response) => {
         this.DataList = response.list
         this.total1 = response.total
         this.tableLoad = false
       })
     },
     search2() {
       this.tableLoad = true
       dataList2(this.form2, this.orderBy, this.sort).then((response) => {
         this.DataList2 = response.list
         this.total = response.total
         this.tableLoad = false
       })
     },
     handleSizeChange(val) {
       this.pageSize = val
       this.tableLoad = true
       dataList(this.form, this.orderBy, this.sort, this.pageSize, this.pageNum).then((response) => {
         this.DataList = response.list
         this.total1 = response.total
         this.tableLoad = false
       })
     },
     handleCurrentChange(val) {
       this.pageNum = val;
       dataList(this.form, this.orderBy, this.sort, this.pageSize, this.pageNum).then((response) => {
         this.DataList = response.list
         this.total1 = response.total
         this.tableLoad = false
       })
     },
     handleSizeChange2(val) {
       this.pageSize2 = val
       this.tableLoad = true
       dataList2(this.form2, this.orderBy, this.sort, this.pageSize2, this.pageNum2).then((response) => {
         this.DataList2 = response.list
         this.total = response.total
         this.tableLoad = false
       })
     },
     handleCurrentChange2(val) {
       this.pageNum2 = val;
       this.tableLoad = true
       dataList2(this.form2, this.orderBy, this.sort, this.pageSize2, this.pageNum2).then((response) => {
         this.DataList2 = response.list
         this.total = response.total
         this.tableLoad = false
       })
     },
   },
created() {
    this.tableLoad = true
              dataList(this.form).then((response)=>{
              this.DataList=response.list
             // this.pages = response.pages
              this.total1 = response.total
              this.tableLoad = false
})
  this.tableLoad = true
        dataList2(this.form).then((response)=>{
              this.DataList2=response.list
             // this.pages = response.pages
              this.total = response.total
              this.tableLoad = false
})
                PersonList().then((response)=>{
          	this.PersonDataList=response
          })
  /*getCaseTypeList().then((response) => {
    this.caseStatusList = response
  })*/
  this.caseStatusList = this.$store.getters.caseType.诉讼案件类型;
},
}
</script>

<style lang="scss">
#litigation-my{
  min-width: 2020px !important;
}
</style>
