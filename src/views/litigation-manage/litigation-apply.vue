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
      <el-button type="primary">新增</el-button>  </el-form-item>    
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
  	
  </div>
</template>

<script>
export default {
  name: 'litigationApply',
  	data(){
  		return{
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


