<template>
  <div id="setting-remind">
    <el-form ref="form" :model="saveForm" :inline="true" class="query-wrap">
      <el-form-item>
        <el-date-picker
          v-model="saveForm.creattime"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="发送日期开始"
          end-placeholder="发送日期结束">
        </el-date-picker>
      </el-form-item>
      <el-form-item style="margin-left:10px;">
        <el-button type="primary" @click="getMainData()">查询
        </el-button>
        <el-button type="primary" @click="handleClick()">添加提醒
        </el-button>
      </el-form-item>
    </el-form>
     <el-table highlight-current-row
      :data="tableData"
      border stripe
      v-loading="tableLoad"
      style="width: 100%">
      <el-table-column
        prop="receiveUserName"
        align="center"
        label="接收人">
      </el-table-column>
       <el-table-column
         prop="context"
         align="center"
         label="内容">
       </el-table-column>
       <el-table-column
         prop="sendUserName"
         align="center"
         label="发送人">
       </el-table-column>
       <el-table-column
         prop="createTime"
         align="center"
         label="发送时间">
       </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteOne(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="getMainData"
      @current-change="getMainData"
      :current-page.sync="saveForm.pageNum"
      :page-size.sync="saveForm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="pageSizes"
      :total="total">
    </el-pagination>
    <el-dialog
      title="添加提醒"
      :visible.sync="dialogVisible"
      width="600px"
      custom-class="dia-top"
      :close-on-click-modal="false"
    >
      <el-form
        :model="saveForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="saveForm.role" placeholder="请选择角色" @change="onClickSelectRole"
                     filterable collapse-tags multiple     clearable>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接收人" prop="receiveUserName">
          <el-input  v-model="saveForm.receiveUserName"  @focus="onClickSelectUser"  placeholder="请选择接收人"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="context">
          <el-input type="textarea" v-model="saveForm.context"  :rows="4" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" style="display: flex;justify-content: center">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveContent">发送</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="选择接收人"
      class="dialog-wrap"
      :visible.sync="selectUserVisible"
      :close-on-click-modal="false"
      width="600px"
    >
      <el-tree
        :data="selectUserTree"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
      <span slot="footer" class="footer">
        <el-button @click="selectUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="onClickSaveUser">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {list,deleteOne,save,roleList,getUserTree} from '@/common/js/setting-remind';
import {pageSizes} from "@/common/js/const"

export default {
  name: 'settingRemind',
  data(){
    return{
      pageSizes,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      tableLoad:false,
      tableData:[],
      receiveUserName:'',
      selectUserTree: [],
      selectUserVisible: false,
      roleList:[],
      total:0,
      dialogVisible:false,
      saveForm:{creattime:null,starttime:null,endTime:null,role:null,context:'',receiveUserName:null,roleId:null,pageNum:1,pageSize:50,receiveUsers:[]}
    }
  },
  created(){
    this.init();
  },
  methods:{
    onClickSaveUser() {
      let selectDataArr = this.$refs.tree.getCheckedNodes()
      let selectUserNames = ''
      let selectUserIds = []
      if (selectDataArr.length > 0) {
        selectUserNames = selectDataArr.filter((item) => {
          return item.type === 'user'
        }).map((item) => {
          return item.name
        })
        selectUserIds = selectDataArr.filter((item) => {
          return item.type === 'user'
        }).map((item) => {
          return item.id
        })
      }
      this.$set(this.saveForm, 'receiveUserName', selectUserNames.join(','))
      this.$set(this.saveForm, 'receiveUsers', selectUserIds)
      this.selectUserVisible = false
    },
    onClickSelectRole() {
      getUserTree(this.saveForm.role).then(data => {
        this.selectUserTree = [data]
      })
    },
    onClickSelectUser() {
      this.selectUserVisible = true
      if (!this.odvName) {
        this.$set(this.saveForm, 'receiveUsers', [])
      }
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.saveForm.receiveUsers);
      })
    },
    saveContent(){
      this.tableLoad = true
      save(this.saveForm).then((data)=>{
        this.getMainData();
        this.$message({
          message: '提交成功',
          type: 'success'
        });
      }).catch(() => {});
    },
    getMainData(){
      this.tableLoad = true
      this.saveForm.starttime = this.saveForm.creattime==null?null:this.saveForm.creattime[0];
      this.saveForm.endTime = this.saveForm.creattime==null?null:this.saveForm.creattime[1],
      list(this.saveForm).then((data)=>{
        this.tableData = data.list
        this.total = data.total
        this.tableLoad = false
      });
    },
    handleClick(){
      roleList().then((data)=>{
        this.roleList = data
      });
      this.saveForm={role:null,context:'',receiveUserName:null,roleId:null,receiveUsers:[]}
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
      getUserTree().then(data => {
        this.selectUserTree = [data]
      })
    },
  }
}
</script>

<style lang="scss">
#setting-remind{
  // .el-table__body-wrapper{
  //   overflow-y: auto;
  //   overflow-x:hidden;
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
    align-items: flex-start;

  }
  .el-table__body tr.current-row > td{
    border-top: 1px solid #0080ff  !important;
    border-bottom: 1px solid #0080ff  !important;
  }
}
</style>
