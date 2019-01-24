<template>
  <div id="data-file-manage">
  <el-row :gutter="24">
  <el-col :span="24">
  	<div class="grid-content bg-purple">
  		<el-form :inline="true" ref="form" :model="form" label-width="80px">
   <el-form-item >
     <el-input v-model="form.user" placeholder="请输入证件号"></el-input>
  </el-form-item>
  <el-form-item >
   <el-input v-model="form.user" placeholder="请输入姓名"></el-input>
  </el-form-item>
   <el-form-item >
     <el-input v-model="form.user" placeholder="请输入电话号码"></el-input>
  </el-form-item>
   <el-form-item >
  <el-select v-model="value" placeholder="请输入地址">
    <el-option
      v-for="item in form.options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item >
 <el-date-picker
      v-model="value7"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      >
    </el-date-picker>
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-search">查询</el-button> 
  </el-form-item>
  <el-form-item>
  <el-button type="text" icon="el-icon-refresh">重置</el-button> 
  </el-form-item>
  </el-form>
  	</div>
  </el-col>
  <el-col :span="8">
  	<div class="grid-content bg-purple">
  <el-form :inline="true">
  		<el-form-item>
      <el-button type="primary" @click="dialogVisible = true">导入</el-button> 
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="dialogVisible2 = true">新增</el-button>  </el-form-item>
      <el-form-item>
      <el-button type="primary">删除</el-button>  </el-form-item>
</el-form>
  	</div>
  </el-col>
   </el-row>
   <el-table
    ref="multipleTable"
    :data="tableData3"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="证件号"
      >
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      >
    </el-table-column>
    <el-table-column
      prop="address"
      label="电话类型"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="电话号码"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="备注"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
  <div class="block">
  	 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
  <el-dialog
  title="导入"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  导入
  <span slot="footer" class="dialog-footer" id="EndFooter">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="新增"
  :visible.sync="dialogVisible2"
  width="40%"
  :before-close="handleClose">
<el-form :inline="true" :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
  <el-form-item
    prop="email"
    label="姓名"
    :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
  >
    <el-input v-model="dynamicValidateForm.email"></el-input>
  </el-form-item>
  <el-form-item
    prop="email"
    label="证件号"
    :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
  >
    <el-input v-model="dynamicValidateForm.email"></el-input>
  </el-form-item>
</el-form>  
<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  name: 'dataFileManage',
   data(){
    return {
    	pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        dialogVisible:false,
        dialogVisible2:false,
        tableData3:{},
        currentPage4: 1,
    	form:{
    		user:'',
    		options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
    	},
        value7: ''
    }
  },
}
</script>

<style lang="scss">
#data-file-manage{
  
}
</style>

