<template>
  <div id="setting-template">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="title"
        label="模板名称">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="deleteOne(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="1000px">
      <div class="dia-top-inp">
        <span
          style="white-space: nowrap"><span>模板名称: </span><span style="color: red">* </span>
        </span>&nbsp;
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div style="display: flex;">
        <div style="flex:1">
          <vue-ueditor-wrap :config="myConfig" @ready="ready" :destroy="true" v-model="msg"></vue-ueditor-wrap>
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
        <el-button type="primary" @click="dialogVisible = false;saveContent()">保 存</el-button>
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
      tableData:[],
      dialogVisible:false,
      msg:'',
      myConfig:{
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: '100%',
      },
      editor: {},
      modulePlaceHolder:[],
      currentRow:{},
      input:''
    }
  },
  created(){
    this.init();
  },
  methods:{
    ready(editorInstance){
      this.editor = editorInstance;
    },
    saveContent(){
      save({id:this.currentRow.id,title:this.input,context:this.editor.getAllHtml()}).then((data)=>{
        this.$message({
          message: '提交成功',
          type: 'success'
        });
      })
    },
    getMainData(){
      list().then((data)=>{
        this.tableData = data;
      });
    },
    handleClick(currentRow){
      this.dialogVisible = true;
      this.currentRow = currentRow;
      this.input = currentRow.title;
    },
    deleteOne({id}){
      deleteOne({id}).then(()=>{
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getMainData();
      })
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
  .dia-top-inp{
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    align-items: center;
  }
}
</style>

