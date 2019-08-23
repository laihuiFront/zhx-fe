<template>
  <div id="setting-template">
    <el-row style="margin-bottom: 15px;">
      <el-button type="primary" style="float: right"
                 @click="handleClick()" v-has="'添加信函模板'">添加信函模板
      </el-button>
    </el-row>
     <el-table highlight-current-row
      :data="tableData"
      border stripe
      v-loading="tableLoad"
      style="width: 100%">
      <el-table-column
        prop="id"
        align="center"
        width="100"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="title"
        align="center"
        label="模板名称">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small" v-has="'编辑'">编辑</el-button>
          <el-button type="text" size="small" @click="deleteOne(scope.row)" v-has="'删除'">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="1000px"
      custom-class="dia-top"
      :close-on-click-modal="false"
    >
      <div class="dia-top-inp">
        <span
          style="white-space: nowrap"><span>模板名称: </span><span style="color: red">* </span>
        </span>&nbsp;
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div style="display: flex;height: 600px;">
        <div style="flex:1">
          <vue-ueditor-wrap :config="myConfig" @ready="ready" height="100%" :destroy="true" v-model="msg"></vue-ueditor-wrap>
        </div>
        <div class="r-list">
          <div class="tit">模板占位符</div>
          <div class="cont" v-for="(item,i) in modulePlaceHolder" :key="i">
            {{item.moduleKey}} = {{item.moduleTxt}}
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" style="display: flex;justify-content: center">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false;saveContent()">保
          存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap';
import {list,deleteOne,modulePlaceHolder,save} from '@/common/js/setting-template';

export default {
  name: 'settingTemplate',
  components:{
    VueUeditorWrap
  },
  data(){
    return{
      tableLoad:false,
      tableData:[],
      dialogVisible:false,
      msg:'',
      title:'添加模板',
      myConfig:{
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: '100%',
      },
      editor: {},
      modulePlaceHolder:[],
      currentRow:{},
      input:'',
      addmodule:true
    }
  },
  watch:{
    addmodule(n){
      if(n){
        this.input = '';
        this.msg = '';
      }
    },
  },
  created(){
    this.init();
  },
  methods:{
    ready(editorInstance){
      this.editor = editorInstance;
      document.querySelector(`#${this.editor.key}`).style.height = '100%'
    },
    saveContent(){
      let data = {title:this.input,context:this.editor.getAllHtml()};
      if (!this.addmodule) {
        data.id = this.currentRow.id;
      }else{
      	data.id = 0;
      }
      save(data).then((data)=>{
        this.getMainData();
        this.$message({
          message: '提交成功',
          type: 'success'
        });
      });
    },
    getMainData(){
      this.tableLoad = true
      list().then((data)=>{
        this.tableData = data
        this.tableLoad = false
      });
    },
    handleClick(currentRow){
      if(currentRow){
      	this.currentRow = currentRow;
      	this.title = "修改模板";
      	this.input = currentRow.title;
      	this.addmodule=false;
      }else{
      	this.title = "添加模板";
      	this.addmodule=true;
      }
       this.dialogVisible = true;
    },
    deleteOne({id}){
      this.$confirm('此操作将永久删除该条内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOne({id}).then(()=>{
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getMainData();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    init(){
      this.getMainData();
      modulePlaceHolder({type:1}).then((data)=>{
        this.modulePlaceHolder = data;
      })
    },
  }
}
</script>

<style lang="scss">
#setting-template{
  // .el-table__body-wrapper{
  //   overflow-y: auto;
  // }
  .r-list{
    min-width: 220px;
    box-sizing: border-box;
    margin-left: 10px;
    max-width: 220px;
    padding: 10px;
    border: 2px solid #FFDB9B;
    overflow: auto;
    background-color:#FDFBC4 ;
    .tit{
      color: #FFBB52;
      font-size: 18px;
    }
    .cont{
      line-height: 33px;
      color: #D09F6D;
    }
  }
  .dia-top{
    .edui-editor{
      height: 100%;
    }
    #edui1{
      height: 100%;
    }
  }
  .dia-top-inp{
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    align-items: center;

  }
  .el-table__body tr.current-row > td{
    border-top: 1px solid #0080ff  !important;
    border-bottom: 1px solid #0080ff  !important;
  }
}
</style>
