<template>
  <div id="litigation-apply">
   <el-row :gutter="24">
  <el-col :span="16">
  	<div class="grid-content bg-purple">
  		<el-form :inline="true" ref="form" :model="form" >
   <el-form-item label="案号">
     <el-input v-model="form.identNo" placeholder="请输入案号" clearable></el-input>
  </el-form-item>
  <el-form-item label="姓名">
   <el-input v-model="form.name" placeholder="请输入姓名" clearable></el-input>
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-search" @click=search>查询</el-button> 
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-refresh" @click=clench>重置</el-button> 
  </el-form-item>
  <el-form-item>
      <el-button type="primary" @click="dialogVisible=true">新增</el-button>  </el-form-item>    
</el-form>
  </el-form>
  	</div>
  </el-col>
   </el-row>	
  	
  <el-table
    :data="tableData3"   
     style="width: 100%">
    <el-table-column
      prop="date"
      align="center"
      label="案件状态"
     >
    </el-table-column>
   <el-table-column
      prop="name"
      align="center"
      label="办案进度"
     >
    </el-table-column><el-table-column
      prop="name"
      align="center"
      label="案件类型"
     >
    </el-table-column><el-table-column
      prop="name"
      align="center"
      label="客户姓名"
     >
    </el-table-column><el-table-column
      prop="name"
      align="center"
      label="委案日期"
     >
    </el-table-column><el-table-column
      prop="name"
      align="center"
      label="委托人"
     >
    </el-table-column>
    <el-table-column
      prop="name"
      align="center"
      label="办案人"
     >
    </el-table-column>
    <el-table-column
      prop="name"
      align="center"
      label="标的"
     >
    </el-table-column>
    <el-table-column
      prop="name"
      align="center"
      label="费用"
     >
    </el-table-column>
    <el-table-column
      prop="name"
      align="center"
      label="所属人"
     >
    </el-table-column><el-table-column
      prop="name"
      align="center"
      label="代理律师"
     >
    </el-table-column><el-table-column
      prop="name"
      align="center"
      label="受案法院"
     >
    </el-table-column><el-table-column
      prop="name"
      align="center"
      label="案号"
     >
    </el-table-column>
    <el-table-column
      prop="name"
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
        <el-button type="text" size="small" icon="el-icon-search" ></el-button>
       <el-button type="text" size="small" icon="el-icon-search" ></el-button>
       <el-button type="text" size="small" icon="el-icon-search" ></el-button>
       <el-button type="text" size="small" icon="el-icon-search" ></el-button>
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
  title="新增"
  :visible.sync="dialogVisible"
  width="90%"
  >
 <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="140px">
 	<el-row :gutter="24">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		  <el-form-item label="姓名">
    <el-input v-model="formInline.user" placeholder="请输入姓名"></el-input>
  </el-form-item>
  	</div></el-col>
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
   <el-form-item label="证件号">
    <el-input v-model="formInline.user" placeholder="请输入证件号"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
 
  <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  		<el-form-item label="办案进度">
    <el-select v-model="formInline.status" filterable  placeholder="请选择案件进度" clearable>
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
  	  <el-form-item label="案件类型">
     <el-select v-model="formInline.status" filterable  placeholder="请选择案件类型" clearable>
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
    <el-input v-model="formInline.user" placeholder="请输入标的"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
 
  
  <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	<el-form-item label="委托人">
    <el-input v-model="formInline.user" placeholder="请输入委托人"></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	   <el-form-item label="所属人">
     <el-select v-model="formInline.status" filterable  placeholder="请选择所属人" clearable>
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
    <el-form-item label="被告人">
    <el-input v-model="formInline.user" placeholder="请输入被告人"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
 
 <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="代理律师">
    <el-input v-model="formInline.user" placeholder="请输入代理律师"></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	    <el-form-item label="律师联系方式">
    <el-input v-model="formInline.user" placeholder="请输入联系方式"></el-input>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
    <el-form-item label="费用">
    <el-input v-model="formInline.user" placeholder="请输入费用"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
  
 <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="委案日期">
     <div class="block">
    <el-date-picker
      v-model="value1"
      type="date"
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
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
    <el-form-item label="受案法院">
     <div class="block">
    <el-date-picker
      v-model="value1"
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
  	  <el-form-item label="代理律师">
    <el-input v-model="formInline.user" placeholder="请输入代理律师"></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	    <el-form-item label="律师联系方式">
    <el-input v-model="formInline.user" placeholder="请输入联系方式"></el-input>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
    <el-form-item label="费用">
    <el-input v-model="formInline.user" placeholder="请输入费用"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
     <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="办案法官">
    <el-input v-model="formInline.user" placeholder="请输入办案法官"></el-input>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	    <el-form-item label="法官联系方式">
    <el-input v-model="formInline.user" placeholder="请输入联系方式"></el-input>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
    <el-form-item label="案号">
    <el-input v-model="formInline.user" placeholder="请输入案号"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>
   
    <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="首次开庭日期">
     <div class="block">
    <el-date-picker
      v-model="value1"
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
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  	<el-col :span="8">
  	<div class="grid-content bg-purple">
    <el-form-item label="申请执行案号">
    <el-input v-model="formInline.user" placeholder="请输入案号"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>

  <el-row :gutter="20">
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="申请执行日期">
     <div class="block">
    <el-date-picker
      v-model="value1"
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
      v-model="value1"
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
      v-model="value1"
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
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
  </el-form-item>
  	</div></el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  	 <el-form-item label="送达情况">
    <el-input v-model="formInline.user" placeholder="请输入送达"></el-input>
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
    <el-input type="textarea" style="width: 280%;" v-model="formInline.desc"></el-input>
  </el-form-item>
  	</div></el-col>
</el-row>

<el-row :gutter="20">
  <el-col :span="16">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="判决书">
    <el-input type="textarea" style="width: 280%;"  v-model="formInline.desc"></el-input>
  </el-form-item>
  	</div></el-col>
  
</el-row>

<el-row :gutter="20">
  <el-col :span="16">
  	<div class="grid-content bg-purple">
  	  <el-form-item label="备注">
     <el-input type="textarea" style="width: 280%;"  v-model="formInline.desc"></el-input>
  </el-form-item>
  	</div></el-col>
  
</el-row>
</el-form>
 
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  name: 'litigationApply',
  	data(){
  		return{
  			value1:'',
  			caseStatusList:[{name:"未退案",id:0},{name:"正常",id:1},{name:"暂停",id:2},{name:"关档",id:3},{name:"退档",id:4},{name:"全部",id:5}],
  			formInline:{},
  			dialogVisible:false,
  		form:{},
  		 currentPage4: 1,
        pages:1,
        total:100,
         tableData3: [{
          date: '飞飞',
          name:  1,
          
        }, {
          date: '辉辉',
          name:  1,
          
        }, {
          date: '邱邱',
          name:  1,
          
        }, {
          date: '龙龙',
          name:  1,
         
        },]
  	}
  },
   methods: {
   	clench(){
  		this.form={}
  	},
  	search(){
  		
  	},
  		handleSizeChange(val){
	this.pageSize=val
},
handleCurrentChange(val){
this.pageNum=val;
},
   }
}
</script>

<style lang="scss">
#litigation-apply{}
</style>


