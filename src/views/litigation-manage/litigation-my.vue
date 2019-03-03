<template>
  <div id="litigation-my">
  	 <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="我的诉讼案件" name="first"> <el-row :gutter="24">
  <el-col :span="20">
  	<div class="grid-content bg-purple">
  		<el-form :inline="true" ref="form" :model="form" >
  			<el-form-item label="案件状态">
     <el-select v-model="form.legalStatusMsg " filterable  placeholder="请选择案件状态" clearable>
    <el-option
      v-for="item in legalStatusMsgList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
     </el-select>
  </el-form-item>
   <el-form-item label="案号">
     <el-input v-model="form.legalNo" placeholder="请输入案号" clearable></el-input>
  </el-form-item>
  <el-form-item label="姓名">
   <el-input v-model="form.cstName" placeholder="请输入姓名" clearable></el-input>
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-search" @click=search>查询</el-button> 
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-refresh" @click=clench>重置</el-button> 
  </el-form-item>
  <el-form-item>
      <el-button type="primary" @click=addDataform>添加诉讼案件</el-button>  </el-form-item>    
</el-form>
  </el-form>
  	</div>
  </el-col>
   </el-row>	
  	
  <el-table
    :data="DataList"   
     style="width: 100%">
    <el-table-column
      prop="legalStatusMsg"
      align="center"
      label="案件状态"
     >
    </el-table-column>
   <el-table-column
      prop="progressMsg"
      align="center"
      label="办案进度"
     >
    </el-table-column><el-table-column
      prop="legalType"
      align="center"
      label="案件类型"
     >
    </el-table-column><el-table-column
      prop="cstName"
      align="center"
      label="客户姓名"
     >
    </el-table-column><el-table-column
      prop="legalDate"
      align="center"
      label="委案日期"
     >
    </el-table-column><el-table-column
      prop="clientele"
      align="center"
      label="委托人"
     >
    </el-table-column>
    <el-table-column
      prop="accused"
      align="center"
      label="被告人"
     >
    </el-table-column>
    <el-table-column
      prop="tital"
      align="center"
      label="标的"
     >
    </el-table-column>
    <el-table-column
      prop="cost"
      align="center"
      label="费用"
     >
    </el-table-column>
    <el-table-column
      prop="owner"
      align="center"
      label="所属人"
     >
    </el-table-column><el-table-column
      prop="agent"
      align="center"
      label="代理律师"
     >
    </el-table-column><el-table-column
      prop="court"
      align="center"
      label="受案法院"
     >
    </el-table-column><el-table-column
      prop="legalNo"
      align="center"
      label="案号"
     >
    </el-table-column>
    <el-table-column
      prop="remark"
      align="center"
      label="备注"
     >
    </el-table-column>
    <el-table-column
      align="center"
      label="操作"
      width="120"
     >
     <template slot-scope="scope">
       <el-button type="text" size="small" icon="el-icon-message" @click="showmessage(scope.row)"></el-button>
       <el-button type="text" size="small" icon="el-icon-edit" @click="editData(scope.row)"></el-button>
       <el-button type="text" size="small" icon="el-icon-delete" @click="deleteData(scope.row.id)"></el-button>
      </template>
    </el-table-column>
  </el-table>
    <div class="block">
  	 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 500, 2000, 10000, 1000000]"
      :page-size="pages"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>	
  	<el-dialog
  :title="dialogTitle"
  :visible.sync="dialogVisible"
  width="90%"
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
    <el-select v-model="formInline.progress" filterable  placeholder="请选择案件进度" clearable>
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
      :label="item.name"
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
    <el-input v-model="formInline.agentTel" placeholder="请输入联系方式"></el-input>
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
      placeholder="选择日期">
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
      v-model="formInline.filingDat"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
    <el-form-item label="受案法院">
    <el-input v-model="formInline.court" placeholder="请输入法院"></el-input>
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
    <el-input v-model="formInline.judgeTel" placeholder="请输入联系方式"></el-input>
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
      placeholder="选择日期">
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
      placeholder="选择日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
    <el-form-item label="申请执行案号">
    <el-input v-model="formInline.exeNo" placeholder="请输入案号"></el-input>
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
      placeholder="选择日期">
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
      placeholder="选择日期">
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
      placeholder="选择日期">
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
      placeholder="选择日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	 <el-form-item label="送达情况">
    <el-input v-model="formInline.arriveInfo" placeholder="请输入送达"></el-input>
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
    <el-input type="textarea" style="width: 280%;" v-model="formInline.preservationList"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>

<el-row :gutter="20">
  <el-col :span="16">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="判决书">
    <el-input type="textarea" style="width: 280%;"  v-model="formInline.judgment"></el-input>
  </el-form-item>
  	</div></el-col>
  
</el-row>

<el-row :gutter="20">
  <el-col :span="16">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="备注">
     <el-input type="textarea" style="width: 280%;"  v-model="formInline.remark"></el-input>
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
    <el-tab-pane label="全部诉讼案件" name="second"><el-row :gutter="24">
  <el-col :span="20">
  	<div class="grid-content bg-purple">
  		<el-form :inline="true" ref="form" :model="form2" >
  			<el-form-item label="案件状态">
     <el-select v-model="form2.legalStatusMsg " filterable  placeholder="请选择案件状态" clearable>
    <el-option
      v-for="item in legalStatusMsgList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
     </el-select>
  </el-form-item>
   <el-form-item label="案号">
     <el-input v-model="form2.legalNo" placeholder="请输入案号" clearable></el-input>
  </el-form-item>
  <el-form-item label="姓名">
   <el-input v-model="form2.cstName" placeholder="请输入姓名" clearable></el-input>
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-search" @click=search2>查询</el-button> 
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-refresh" @click=clench>重置</el-button> 
  </el-form-item>
  <el-form-item>
      <el-button type="primary" @click=addDataform>添加诉讼案件</el-button>  </el-form-item>    
</el-form>
  </el-form>
  	</div>
  </el-col>
   </el-row>	
  	
  <el-table
    :data="DataList2"   
     style="width: 100%">
    <el-table-column
      prop="legalStatusMsg"
      align="center"
      label="案件状态"
     >
    </el-table-column>
   <el-table-column
      prop="progressMsg"
      align="center"
      label="办案进度"
     >
    </el-table-column><el-table-column
      prop="legalType"
      align="center"
      label="案件类型"
     >
    </el-table-column><el-table-column
      prop="cstName"
      align="center"
      label="客户姓名"
     >
    </el-table-column><el-table-column
      prop="legalDate"
      align="center"
      label="委案日期"
     >
    </el-table-column><el-table-column
      prop="clientele"
      align="center"
      label="委托人"
     >
    </el-table-column>
    <el-table-column
      prop="accused"
      align="center"
      label="被告人"
     >
    </el-table-column>
    <el-table-column
      prop="tital"
      align="center"
      label="标的"
     >
    </el-table-column>
    <el-table-column
      prop="cost"
      align="center"
      label="费用"
     >
    </el-table-column>
    <el-table-column
      prop="owner"
      align="center"
      label="所属人"
     >
    </el-table-column><el-table-column
      prop="agent"
      align="center"
      label="代理律师"
     >
    </el-table-column><el-table-column
      prop="court"
      align="center"
      label="受案法院"
     >
    </el-table-column><el-table-column
      prop="legalNo"
      align="center"
      label="案号"
     >
    </el-table-column>
    <el-table-column
      prop="remark"
      align="center"
      label="备注"
     >
    </el-table-column>
    <el-table-column
      align="center"
      label="操作"
      width="120"
     >
     <template slot-scope="scope">
       <el-button type="text" size="small" icon="el-icon-message" @click="showmessage(scope.row)"></el-button>
       <el-button type="text" size="small" icon="el-icon-edit" @click="editData(scope.row)"></el-button>
       <el-button type="text" size="small" icon="el-icon-delete" @click="deleteData(scope.row.id)"></el-button>
      </template>
    </el-table-column>
  </el-table>
    <div class="block">
  	 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 500, 2000, 10000, 1000000]"
      :page-size="pages"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>	
  	<el-dialog
  :title="dialogTitle"
  :visible.sync="dialogVisible"
  width="90%"
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
    <el-select v-model="formInline.progress" filterable  placeholder="请选择案件进度" clearable>
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
      :label="item.name"
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
    <el-input v-model="formInline.agentTel" placeholder="请输入联系方式"></el-input>
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
      placeholder="选择日期">
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
      v-model="formInline.filingDat"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
    <el-form-item label="受案法院">
    <el-input v-model="formInline.court" placeholder="请输入法院"></el-input>
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
    <el-input v-model="formInline.judgeTel" placeholder="请输入联系方式"></el-input>
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
      placeholder="选择日期">
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
      placeholder="选择日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
    <el-form-item label="申请执行案号">
    <el-input v-model="formInline.exeNo" placeholder="请输入案号"></el-input>
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
      placeholder="选择日期">
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
      placeholder="选择日期">
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
      placeholder="选择日期">
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
      placeholder="选择日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	 <el-form-item label="送达情况">
    <el-input v-model="formInline.arriveInfo" placeholder="请输入送达"></el-input>
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
    <el-input type="textarea" style="width: 280%;" v-model="formInline.preservationList"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>

<el-row :gutter="20">
  <el-col :span="16">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="判决书">
    <el-input type="textarea" style="width: 280%;"  v-model="formInline.judgment"></el-input>
  </el-form-item>
  	</div></el-col>
  
</el-row>

<el-row :gutter="20">
  <el-col :span="16">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="备注">
     <el-input type="textarea" style="width: 280%;"  v-model="formInline.remark"></el-input>
  </el-form-item>
  	</div></el-col>
  
</el-row>
</el-form>
 
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="SaveData">确 定</el-button>
  </span>
</el-dialog></el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
				import {dataList,remoweData,addData,PersonList,checkData,dataList2} from '@/common/js/litigation-my.js'	
export default {
  name: 'litigationMy',
	data(){
  		return{
  			 activeName2: 'first',
  			isTrue:false,
  			dialogTitle:'新增',
  			progressList:[{name:"判决",id:1},{name:"收案",id:2}], 
        legalStatusMsgList:[{name:"已审核",id:1},{name:"审核中",id:2},{name:"未申请",id:0}],  
        caseStatusList:[{name:"未退案",id:0},{name:"正常",id:1},{name:"暂停",id:2},{name:"关档",id:3},{name:"退档",id:4},{name:"全部",id:5}],
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
        total:100,
         DataList: [],
         DataList2: [],
         PersonDataList:[],
         checkId:'',
  	}
  },
   methods: {
   	 handleClick(tab, event) {
        console.log(tab, event);
     },
   	showmessage(row){
   		this.dialogVisible=true
   		this.dialogTitle="详情"
   		this.isTrue=true
   		this.formInline=row
   	},
   	addDataform(){
   		this.formInline={};
   		this.dialogVisible=true
   		this.dialogTitle="新增"
   		this.isTrue=false
   		
   	},
   	checkresource(){
   		checkData(this.checkform,this.checkId).then((response)=>{
          this.$message({
            type: 'success',
            message: '审核成功!'
          });
          this.dialogVisible=false;
          this.search()
          this.formInline={}
          this.checkId=''
          })    
   	},
   	SaveData(){
   		addData(this.formInline).then((response)=>{
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
          this.dialogVisible=false;
          this.search()
          this.formInline={}
})    
   	},
   	checkDatasure(id){
   		this.dialogVisible1=true;
   		this.checkId=id;
   	},
   	editData(row){
   		this.dialogVisible=true;
   		this.dialogTitle="修改";
   		this.formInline=row
   		this.isTrue=false
   	},
   	deleteData(id){
         	let _self=this 
        _self.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
           	remoweData(id).then((response)=>{
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
   	clench(){
  		this.form={}
  	},
  	search(){
  		dataList(this.form).then((response)=>{
            this.DataList=response.data.list
              this.total = response.total
})    
  	},
  	search2(){
  		dataList2(this.form2).then((response)=>{
            this.DataList2=response.data.list
              this.total = response.total
})    
  	},
  		handleSizeChange(val){
	   this.pageSize=val
},
handleCurrentChange(val){
this.pageNum=val;
},
},
created() {
              dataList(this.form).then((response)=>{
              this.DataList=response.data.list
             // this.pages = response.pages
              this.total = response.total
})    
        dataList2(this.form).then((response)=>{
              this.DataList2=response.data.list
             // this.pages = response.pages
              this.total = response.total
})    
                PersonList().then((response)=>{
          	this.PersonDataList=response
          })
},
}
</script>

<style lang="scss">
#litigation-my{}
</style>


