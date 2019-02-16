<template>
  <div id="data-case-manage">
  <el-row :gutter="24">
  <el-col :span="24">
  	<div class="grid-content bg-purple">
  		<el-form :inline="true" ref="form" :model="form" label-width="80px">
   <el-form-item >
  <el-select v-model="form.area" placeholder="请选择催收区域" clearable>
    <el-option
      v-for="item in areaList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item >
   <el-input v-model="form.batchNo" placeholder="请输入批次" clearable></el-input>
  </el-form-item>
   <el-form-item >
  <el-select v-model="form.client" placeholder="请选择委托方" clearable>
    <el-option
      v-for="item in clientList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item >
  <el-select v-model="form.caseType" placeholder="请选择案件类型" clearable>
    <el-option
      v-for="item in caseTypeList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item >
 <el-date-picker
      v-model="form.time"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="委案开始日期"
      end-placeholder="委案结束日期"
      >
    </el-date-picker>
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-caret-bottom" @click="dialogVisible = true"></el-button> 
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-search" @click="search">查询</el-button> 
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-refresh" @click="resetForm('form')">重置</el-button> 
  </el-form-item>
  </el-form>
  	</div>
  </el-col>
  <el-col :span="10">
  	<div class="grid-content bg-purple">
  <el-form :inline="true">
  	      <el-form-item >
<el-dropdown>
  <el-button type="primary">
    分案<i class="el-icon-arrow-down el-icon--right"></i>
  </el-button>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>快速分案</el-dropdown-item>
    <el-dropdown-item>查询结果快速分案</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
      </el-form-item>
            <el-form-item >
<el-dropdown>
  <el-button type="primary">
    案件<i class="el-icon-arrow-down el-icon--right"></i>
  </el-button>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>暂停案件</el-dropdown-item>
    <el-dropdown-item>关闭案件</el-dropdown-item>
    <el-dropdown-item>退案</el-dropdown-item>
    <el-dropdown-item>恢复案件</el-dropdown-item>
    <el-dropdown-item>添加评语</el-dropdown-item>
    <el-dropdown-item>案件标色</el-dropdown-item>
    <el-dropdown-item>删除案件</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
      </el-form-item>
            <el-form-item >
<el-dropdown>
  <el-button type="primary">
    修改<i class="el-icon-arrow-down el-icon--right"></i>
  </el-button>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>修改重要等级</el-dropdown-item>
    <el-dropdown-item>修改催收状态</el-dropdown-item>
    <el-dropdown-item>修改催收区域</el-dropdown-item>
    <el-dropdown-item>修改M值系数</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" >添加评语</el-button>  </el-form-item>
      <el-form-item>
      <el-button type="primary"  @click="open7">申请协催</el-button>  </el-form-item>
       <el-form-item >
<el-dropdown>
  <el-button type="primary">
    导出<i class="el-icon-arrow-down el-icon--right"></i>
  </el-button>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>查询结果</el-dropdown-item>
    <el-dropdown-item>所选案件</el-dropdown-item>
    <el-dropdown-item>所选电话</el-dropdown-item>
    <el-dropdown-item>所选催记</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
      </el-form-item>
</el-form>
  	</div>
  	
  </el-col>
    </el-row>
   <el-row :gutter="24">
  <el-col :span="18">
  	<div class="grid-content bg-purple">
  		<span>查询结果统计：</span>
	<span class="textColor">列表案量：</span>
		<span class="textColor">列表金额：</span>
			<span class="textColor">列表还款量：</span>
				<span class="textColor">列表还款额：</span>
  		<span class="textColor">列表CP值：</span>
  			<span class="textColor">列表PTP值：</span>
  	</div>
  </el-col>
   </el-row>
   <el-table
    ref="multipleTable"
    :data="tableData3"
    style="width: 100%;margin-top:10px"
     @selection-change="handleSelectionChange"
  >
  <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="ID"
      prop="id"
      >
     
    </el-table-column>
    <el-table-column
      prop="area"
      align="center"
      label="催收区域"
      >
    </el-table-column>
    <el-table-column
      prop="collectStatus"
      align="center"
      label="催收状态"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="batchNo"
      label="批次号"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="seqNo"
      width="140"
      align="center"
      label="个案序列号"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="caseDate"
      align="center"
      label="委案日期"
      width="140"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="expectTime"
      width="140"
      align="center"
      label="预计退案日期"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="cardNo"
      min-width="120"
      align="center"
      label="证件号"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      min-width="140"
      align="center"
      label="地区"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="cardNo"
      min-width="140"
      align="center"
      label="卡号"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="委案金额"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      prop="balance"
      align="center"
      label="委案余额"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      prop="collectDate"
      width="140"
      align="center"
      label="上次通电时间"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      prop="newCase"
      label="最新催记"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      prop="odv"
      label="催收员"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      prop="collectTimes"
      label="跟进次数"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="distributeTime"
      width="140"
      align="center"
      label="分配时间"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="proRepayAmt"
      label="承诺还款金额"
      width="160"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="bankAmt"
      width="160"
      align="center"
      label="待银行查账金额"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="enRepayAmt"
      width="140"
      align="center"
      label="已还金额"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="accountAge"
      label="逾期账龄"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      min-width="140"
      prop="distributeHistory"
      label="分配历史"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="summary"
      min-width="180"
      label="催收小结"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="操作"
      width="160"
      align="center"
      show-overflow-tooltip>
       <template slot-scope="scope">
        <el-button type="text" size="small">导入</el-button>
        <el-button type="text" size="small">下载</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pages"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  <el-dialog
  title="查询条件"
  :visible.sync="dialogVisible"
  width="80%"
>
	<el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="120px">
	 <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		<el-form-item label="车架号">
    <el-input v-model="formInline.vin" placeholder="请输入车架号"></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="牌照号">
    <el-input v-model="formInline.license" placeholder="请输入牌照号"></el-input>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="催收手别">
    <el-input v-model="formInline.collectHand" placeholder="请输入催收手别"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
 <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		<el-form-item label="姓名">
    <el-input v-model="formInline.name" placeholder="请输入姓名"></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="档案号">
    <el-input v-model="formInline.archiveNo" placeholder="请输入档案号"></el-input>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="账号">
    <el-input v-model="formInline.account" placeholder="请输入账号"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
 <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		<el-form-item label="开户行">
    <el-input v-model="formInline.bank" placeholder="请输入开户行"></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="案件ID">
    <el-input v-model="formInline.id" placeholder="请输入案件ID"></el-input>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="委案下限金额">
    <el-input v-model="formInline.moneyStart" placeholder="请输入委案下限金额"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
<el-row :gutter="20">
	<el-col :span="8">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="委案上限金额">
    <el-input v-model="formInline.moneyEnd" placeholder="请输入委案上限金额"></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		<el-form-item label="逾期天数">
    <el-input v-model="formInline.overDays" placeholder="请输入逾期天数"></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="卡号">
    <el-input v-model="formInline.cardNo" placeholder="请输入卡号"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
<el-row :gutter="20">
	<el-col :span="8">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="个案序列号">
    <el-input v-model="formInline.seqNo" placeholder="请输入个案序列号"></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		<el-form-item label="证件号">
    <el-input v-model="formInline.identNo" placeholder="请输入证件号"></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="催收记录">
  <el-input v-model="formInline.collectInfo" placeholder="请输入催收记录"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
 <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
   <el-form-item label="批次号">
  <el-input v-model="formInline.batchNo" placeholder="请输入批次号"></el-input>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
  		<el-form-item label="部门">
   <el-select v-model="formInline.dept" placeholder="请选择部门" clearable>
    <el-option
      v-for="item in departmentList"
      :key="item.id"
      :label="item.orgName"
      :value="item.id">
    </el-option>
  </el-select>   </el-form-item>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="催收员">
    <el-select v-model="formInline.odv" filterable  placeholder="请选择催收员" clearable>
    <el-option
      v-for="item in PersonList"
      :key="item.id"
      :label="item.userName"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  	</div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="报备状态">
    <el-select v-model="formInline.distributeStatus" filterable  placeholder="请选择报备状态" clearable>
    <el-option
      v-for="item in TellList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="委托方">
    <el-select v-model="formInline.client" filterable  placeholder="请选择委托方" clearable>
    <el-option
      v-for="item in clientList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="减免状态">
    <el-select v-model="formInline.collectStatus" filterable  placeholder="请选择减免状态" clearable>
    <el-option
      v-for="item in deleteStatusList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  	</div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="案件状态">
    <el-select v-model="formInline.status" filterable  placeholder="请选择案件状态" clearable>
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
  		  <el-form-item label="逾期账龄">
    <el-select v-model="formInline.accountAge" filterable  placeholder="请选择逾期账龄" clearable>
    <el-option
      v-for="item in accountAgeList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
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
  	</div></el-col>
</el-row>
<el-row :gutter="20">
	<el-col :span="8">
  	<div class="grid-content bg-purple">
  		<el-form-item label="标色状态">
   <el-select v-model="formInline.color" filterable  placeholder="请选择标色状态" clearable>
    <el-option
      v-for="item in val14_data"
      :key="item.label"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
  		<el-form-item label="地区">
   <el-cascader
    :options="addressList"
    v-model="formInline.area"
    :props="props"
  >
  </el-cascader>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
  		<el-form-item label="案件类型">
   <el-select v-model="formInline.caseType" filterable  placeholder="请选择案件类型" clearable>
    <el-option
      v-for="item in caseTypeList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  	</div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="分配状态">
    <el-select v-model="formInline.distributeStatus" filterable  placeholder="请选择分配状态" clearable>
    <el-option
      v-for="item in distributeStatusList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="批次共债">
    <el-select v-model="formInline.batchBonds" filterable  placeholder="请选择批次共债" clearable>
    <el-option
      v-for="item in shareList"
      :key="item.value"
      :label="item.name"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  	</div></el-col>
  	
</el-row>
<el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		<el-form-item label="催收区域">
   <el-select v-model="formInline.collectArea" placeholder="请选择催收区域" clearable>
    <el-option
      v-for="item in areaList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  	</div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		<el-form-item label="还款日期">
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
  	</div></el-col>
  	<el-col :span="12">
  	<div class="grid-content bg-purple">
  		<el-form-item label="委案日期">
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
  	</div></el-col>
 </el-row>
<el-row :gutter="20">
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		<el-form-item label="预退案日期">
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
  	</div></el-col>
  	<el-col :span="12">
  	<div class="grid-content bg-purple">
  		<el-form-item label="实际退案日期">
   <el-date-picker
      v-model="formInline.time4"
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
  	</div></el-col>
 </el-row>
<el-row :gutter="20">
  <el-col :span="16">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="最后跟进日期" label-width="100px">
   <el-date-picker
      v-model="formInline.time5"
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
  	</div></el-col>
</el-row>
</el-form>

<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click=searchdataList>确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
	import {dataList,areaList,caseTypeList,addressList,TellList,collectStatusList,deleteStatusList,accountAgeList,clientList,EndList,PersonList,departmentList,searchList} from '@/common/js/data-case-manage.js'
export default {
  name: 'dataCaseManage',
  data(){
    return {
    	 props: {
          label:'name',
          value:'id',
          children: 'children'
        },
    	caseStatusList:[{name:"未退案",id:0},{name:"正常",id:1},{name:"暂停",id:2},{name:"关档",id:3},{name:"退档",id:4},{name:"全部",id:5}],
    	distributeStatusList:[{name:"已分配",id:1},{name:"未分配",id:0}],
    	shareList:[{name:"是",value:"true"},{name:"否",value:'false'}],
    	departmentList:[],
    	addressList:[],
    	accountAgeList:[],
    	collectStatusList:[],
    	deleteStatusList:[],
    	pageSize:10,
    	pageNum:1,
    	clientList:[],
      total:0,
      pages:1,
    	deleteList:[],
    	caseTypeList:[],
    	  areaList:[],
        formInline:{time1:[],time2:[],time3:[],time4:[],time5:[]},
        dialogVisible:false,
        tableData3:[],
        currentPage4: 1,
        TellList:[],
        EndList:[],
        PersonList:[],
    	form:{
    		time:[]
    	},
    	val14_data: [
        {
          label:'正常',
          value:'黑'
        },
        {
          label:'红色',
          value:'红'
        },
        {
          label:'蓝色',
          value:'蓝'
        },
        {
          label:'橙色',
          value:'橙'
        },
        {
          label:'紫色',
          value:'紫'
        },
        {
          label:'棕色',
          value:'棕'
        },
      ],
    }
  },
methods: {
	searchdataList(form){
	dataList(form).then((response)=>{
          	this.tableData3=response.list
            this.pages = response.pages
            this.total = response.total
          	this.dialogVisible = false
          })},
	 	handleSelectionChange(row){
  		let _self=this
  		_self.deleteList=[]
	row.forEach(function(currentValue, index, arr){
		let Object={"id":""}
	   Object.id=currentValue.id
	   _self.deleteList.push(Object)
	})
	console.log(_self.deleteList)
},
	search(){

		let caseDateStart=this.form.time==null?"":this.form.time[0]
		let caseDateEnd=this.form.time==null?"":this.form.time[1]
		searchList(this.form.area,this.form.batchNo,this.form.client,this.form.caseType,caseDateStart,caseDateEnd,this.pageSize,this.pageNum).then((response)=>{
          	this.tableData3=response.list
            this.pages = response.pages
            this.total = response.total
          })
	},
	handleSizeChange(val){
	this.pageSize=val 
	this.search()
},
handleCurrentChange(val){
this.pageNum=val;
this.search()
},
  	resetForm(){
  		this.form={}
  	},
   
      open7() {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
created() {
      	  searchList().then((response)=>{
          	this.tableData3=response.list
            this.pages = response.pages
            this.total = response.total
          })
           areaList().then((response)=>{
          	this.areaList=response
          })
            caseTypeList().then((response)=>{
          	this.caseTypeList=response
          })
            clientList().then((response)=>{
          	this.clientList=response
          })
            EndList().then((response)=>{
          	this.EndList=response
          })
             PersonList().then((response)=>{
          	this.PersonList=response
          	this.form.PersonList=response
          })
            departmentList().then((response)=>{
          	this.departmentList=response
          })
            accountAgeList().then((response)=>{
          	this.accountAgeList=response
          })
           collectStatusList().then((response)=>{
          	this.collectStatusList=response
          })
            deleteStatusList().then((response)=>{
          	this.deleteStatusList=response
          })
           TellList().then((response)=>{
          	this.TellList=response
          })
           addressList().then((response)=>{
          	this.addressList=response
          })
},
}
</script>

<style lang="scss">
#data-case-manage{
.el-form--inline .el-form-item{
	margin-right:0px;
}
.el-dialog__header{
  	background-color: #f8f8f8;
  
  }
  .textColor{
  	display: inline-block;
  color: #66b1ff;

  }
}
</style>
