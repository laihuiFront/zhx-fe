<template>
  <div id="member-in"
       v-loading="loading2"
       v-loading.fullscreen.lock="fullscreenLoading"
       element-loading-text="正在加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.7)"
  >
    <div class="left-wrap">
      <el-tree
        v-if="departmentTree.length>0"
        ref="tree"
        :data="departmentTree"
        node-key="id"
        :expand-on-click-node="false"
        :default-expanded-keys="[departmentTree[0].id]"
        @node-click="onClickDepartment"
        class="tree-wrap"
      >
        <span
          :class="{active:queryForm.department === data.id}"
          class="custom-tree-node"
          slot-scope="{ node, data }"
        >{{data.orgName}}</span>
      </el-tree>
    </div>
    <div class="right-wrap">
      <el-form ref="form" :model="queryForm" :inline="true" class="query-wrap queryStyle">
        <el-form-item label="员工ID：">
          <el-input type="textarea" v-model="queryForm.id" placeholder="请输入员工ID" rows="3"></el-input>
        </el-form-item>
        <el-form-item label="账号：">
          <el-input v-model="queryForm.loginName" clearable placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名：">
          <el-input v-model="queryForm.userName" clearable placeholder="请输入员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="坐席号：">
          <el-input v-model="queryForm.officePhone" clearable placeholder="请输入坐席号"></el-input>
        </el-form-item>
        <el-form-item label="账号状态：">
          <el-select v-model="queryForm.accountStatus" filterable placeholder="请选择账号状态" clearable>
            <el-option
              v-for="item in accountStatus"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onClickQuery">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-refresh" type="primary" @click="onClickReset">重置</el-button>
          </el-form-item>
          <el-form-item v-has="'新增员工'">
            <el-button type="primary" @click="onClickAdd">新增员工</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onClickUpdateDept">修改部门</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onClickBatchDelete">刪除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onClickBatchLeave">离职</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onClickModuleImport">导入模板下载</el-button>
          </el-form-item>
          <el-form-item>
            <el-upload
              :action="action+'/user/import'"
              :headers="header"
              :show-file-list=false
              :on-success="uploadSuccess"
              :on-progress="onProgress"
              accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            >
              <el-button type="primary">导入员工信息</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-upload
              :action="action+'/user/simpleImport'"
              :headers="header"
              :show-file-list=false
              :on-success="uploadSuccess"
              :on-progress="onProgress"
              accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            >
              <el-button type="primary">导入企业员工信息</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onClickImport">导出员工信息</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <el-table v-loading="tableLoad" highlight-current-row sortable="custom" @sort-change="handleSort" @selection-change="handleSelectionChange" :row-class-name="rowColor" :data="memberList">
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column sortable="custom" :sort-orders="['ascending','descending']"  align="center" prop="id" min-width="80" label="员工ID" show-overflow-tooltip></el-table-column>
        <el-table-column sortable="custom" :sort-orders="['ascending','descending']" align="center" prop="userName" min-width="120" label="员工姓名" show-overflow-tooltip></el-table-column>
        <el-table-column sortable="custom" :sort-orders="['ascending','descending']" align="center"  prop="loginName" min-width="140" show-overflow-tooltip label="账号"></el-table-column>
        <el-table-column sortable="custom" :sort-orders="['ascending','descending']" align="center"  prop="enableMsg" min-width="100" show-overflow-tooltip label="状态"></el-table-column>
        <!-- <el-table-column sortable="custom" :sort-orders="['ascending','descending']" align="center" prop="sex" min-width="60" label="性别" show-overflow-tooltip width="70"></el-table-column>-->
        <el-table-column sortable="custom" :sort-orders="['ascending','descending']" align="center" prop="callCenter" min-width="140" label="呼叫中心" show-overflow-tooltip></el-table-column>
        <el-table-column sortable="custom" :sort-orders="['ascending','descending']" align="center" prop="officePhone" min-width="120" label="坐席号" show-overflow-tooltip></el-table-column>
        <!--<el-table-column sortable="custom" :sort-orders="['ascending','descending']" align="center" prop="mobile" min-width="120" label="手机" show-overflow-tooltip></el-table-column>
        <el-table-column sortable="custom" :sort-orders="['ascending','descending']" align="center" prop="joinTime" min-width="120" label="入职日期" show-overflow-tooltip></el-table-column>
        <el-table-column sortable="custom" :sort-orders="['ascending','descending']" align="center" prop="actualTime" min-width="120" label="下组日期" show-overflow-tooltip></el-table-column>-->
        <el-table-column sortable="custom" :sort-orders="['ascending','descending']" align="center" prop="roleList" :formatter="formatRole" min-width="140" label="员工角色" show-overflow-tooltip></el-table-column>
        <el-table-column sortable="custom" :sort-orders="['ascending','descending']" align="center" prop="department" min-width="140" label="部门" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="250"  align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="onClickEdit(scope.row)"  v-has="'修改'">修改</el-button>
            <el-button type="text" @click="onClickPwdReset(scope.row)" >密码重置</el-button>
            <el-button
              v-has="'锁定'"
              type="text"
              @click="onClickLock(scope.row)"
              v-if="scope.row.enable === 1 && scope.row.id !== $store.getters.userInfo.id"
            >锁定</el-button>
            <el-button
              v-has="'解锁'"
              type="text"
              @click="onClickUnLock(scope.row)"
              v-if="scope.row.enable === 0 && scope.row.id !== $store.getters.userInfo.id"
            >解锁</el-button>
            <el-button
              v-has="'离职'"
              type="text"
              @click="onClickLeave(scope.row)"
              v-if="scope.row.id !== $store.getters.userInfo.id"
            >离职</el-button>
            <el-button
              v-has="'删除'"
              type="text"
              @click="onClickDelete(scope.row)"
              v-if="scope.row.id !== $store.getters.userInfo.id"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="onClickQuery2"
        @current-change="onClickQuery2"
        :current-page.sync="queryForm.pageNum"
        :page-size.sync="queryForm.pageSize"
        :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog
      :title="dialogData.title"
      class="dialog-wrap"
      :visible.sync="dialogData.editVisible"
      :close-on-click-modal="false"
      width="50%"
      v-dialogDrag
    >
      <el-form
        :model="memberInfo"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="memberInfo.userName" placeholder="请输入用户名" @blur="adduserName"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="loginName">
          <el-input  v-model="memberInfo.loginName" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input
            v-model="memberInfo.department"
            @focus="$set(dialogData, 'departmentVisible' ,true)"
            placeholder="请选择部门"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleList">
          <el-select v-model="memberInfo.roleList" multiple placeholder="请选择角色">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="memberInfo.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="memberInfo.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="呼叫中心" prop="callCenter">
          <el-select v-model="memberInfo.callCenter" clearable placeholder="请选择呼叫中心" @change="callCenterChanged" @clear="callCenterCleared">
            <el-option
              v-for="item in callCenters"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="坐席号" prop="officePhone">
          <el-input v-model="memberInfo.officePhone" placeholder="请输入坐席号"></el-input>
        </el-form-item>
        <el-form-item label="下组日期" prop="actualTime">
          <el-date-picker
            v-model="memberInfo.actualTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择下组日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="入职日期" prop="joinTime">
          <el-date-picker
            v-model="memberInfo.joinTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择入职日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="footer">
        <el-button @click="onClickCancel">取 消</el-button>
        <el-button type="primary" @click="onClickSave">保 存</el-button>
      </span>
      <el-dialog
        width="300px"
        title="选择部门"
        class="dialog-wrap department-wrap"
        :visible.sync="dialogData.departmentVisible"
        :close-on-click-modal="false"
        append-to-body
        v-dialogDrag
      >
        <el-tree
          v-if="departmentTree.length>0"
          ref="tree"
          :data="departmentTree"
          node-key="id"
          :expand-on-click-node="false"
          :default-expanded-keys="[departmentTree[0].id]"
          @node-click="onSelectDepartment"
          class="tree-wrap"
          width="200px"
        >
          <span
            :class="{active:queryForm.department === data.id}"
            class="custom-tree-node"
            slot-scope="{ node, data }"
          >{{data.orgName}}</span>
        </el-tree>
        <span slot="footer" class="footer">
          <el-button @click="$set(dialogData, 'departmentVisible' ,false)">取 消</el-button>
          <el-button type="primary" @click="onClickSaveDept">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
    <el-dialog
      width="300px"
      title="选择部门"
      class="dialog-wrap department-wrap"
      :visible.sync="dialogData.departmentVisible2"
      :close-on-click-modal="false"
      append-to-body
      v-dialogDrag
    >
      <el-tree
        v-if="departmentTree.length>0"
        ref="tree"
        :data="departmentTree"
        node-key="id"
        :expand-on-click-node="false"
        :default-expanded-keys="[departmentTree[0].id]"
        @node-click="onSelectDepartment"
        class="tree-wrap"
        width="200px"
      >
          <span
            :class="{active:queryForm.department === data.id}"
            class="custom-tree-node"
            slot-scope="{ node, data }"
          >{{data.orgName}}</span>
      </el-tree>
      <span slot="footer" class="footer">
          <el-button @click="$set(dialogData, 'departmentVisible2' ,false)">取 消</el-button>
          <el-button type="primary" @click="updateDept">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import {baseURL} from '@/common/js/request.js';
  import { getDepartmentTree, getRoleList } from '@/common/js/api-setting'
  import { listMember, deleteMember,changeBatchStatus,batchDelete,updateDept,exportList,exportModule, resetMember,changeStatus, addMember, updateMember, getUserById, getPositionList,getLoginName} from '@/common/js/api-member'
  import {pageSizes} from "@/common/js/const"
  import {queryCallCenters} from '@/common/js/api-tel.js'

  export default {
    name: 'memberIn',
    data () {
      return {
        pageSizes,
        header:{Authorization:localStorage.token},
        queryDepartment:null,
        tableLoad:false,
        fullscreenLoading:false,
        loading2:false,
        action:baseURL,
        accountStatus: [{name: "锁定", id: 2}, {name: "正常", id: 1}],
        isTrue:true,
        departmentTree: [],
        queryForm: {
          pageNum: 1,
          pageSize: pageSizes[0],
          id:'',
          accountStatus:null,
          department: null,
          orderBy:null,
          sort:null
        },
        dialogData: {
          editVisible: false,
          title: '新增权限组',
          type: 'add',
          departmentVisible: false,
          departmentVisible2:false,
        },
        total: 0,
        memberList: [],
        memberInfo: {loginName:'',userName2:''},
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          loginName: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          department: [
            { required: true, message: '请选择部门', trigger: 'change' }
          ],
          roleList: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ],
        },
        roleList: [],
        positionList: [],
        multipleSelection:[],
        returnName: null,
        callCenters: []
      }
    },
    created () {
      getDepartmentTree().then(data => {
        this.departmentTree = data
        this.queryDepartment = data[0]
        this.onClickQuery()
      })
      getRoleList().then(response => {
        this.roleList = response
      })
      getPositionList().then(response => {
        this.positionList = response
      })
      queryCallCenters().then((response)=>{
        this.callCenters = response
      })
    },
    methods: {
      rowColor({row}){
        return `color_${row.color}`;
      },
      handleSelectionChange(row) {
        let _self = this
        _self.multipleSelection = []
        row.forEach(function (currentValue, index, arr) {
          _self.multipleSelection.push(currentValue.id)
        })
      },
      onProgress(){
        this.loading2=true
        this.fullscreenLoading=true
      },
      uploadSuccess(res,file,fileList){
        if (res.code ==100){
          this.$message({
            type: 'success',
            message: "导入成功"
          });
          getDepartmentTree().then(data => {
            this.departmentTree = data
            this.queryDepartment = data[0]
            this.onClickQuery()
          })
          this.loading2=false
          this.fullscreenLoading=false
        }else{
          this.ImportdialogVisible=true
          this.ImportMsg= res.msg
          this.$message({
            type: 'error',
            message: this.ImportMsg
          });
          this.loading2=false
          this.fullscreenLoading=false
        }
      },
      adduserName(){
        if(this.memberInfo.userName){
          getLoginName(this.memberInfo.userName).then(response => {
            if(response.loginNameCount==1){
              this.$set(this.memberInfo, 'loginName', response.loginName)
              this.$set(this.memberInfo, 'loginNameCount', response.loginNameCount)
              this.returnName = response.userName
            }else{
              if(this.memberInfo.userName!=this.memberInfo.userName2){
                this.makeSure(response.loginName)
              }
              this.returnName = response.userName
            }
          })
        }else{
          return
        }
      },
      makeSure(name) {
        this.$confirm('此用户名已重复,是否使用账号'+name+ '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isTrue=true
          this.$set(this.memberInfo, 'loginName', name)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
          this.isTrue=false
        });
      },
      handleSort({column,prop,order}){
        // console.log(prop,'@',order)
        this.queryForm.orderBy = prop
        this.queryForm.sort = order === 'ascending' ? 'asc':'desc'
        this.onClickQuery()
      },
      onClickQuery () {
        this.memberList = []
        this.$set(this.queryForm, 'pageNum', 1);
        const data = {
          status: 1,
          idStrs: this.queryForm.id?(this.queryForm.id.trim()==""?null:this.queryForm.id.split('\n')):null,
          department: this.queryForm.department,
          loginName: this.queryForm.loginName,
          userName: this.queryForm.userName,
          callCenter: this.queryForm.callCenter,
          officePhone:this.queryForm.officePhone,
          accountStatus:this.queryForm.accountStatus,
          pageNum: this.queryForm.pageNum,
          pageSize: this.queryForm.pageSize,
          orderBy:this.queryForm.orderBy,
          sort:this.queryForm.sort
        }
        this.tableLoad = true
        listMember(data).then(response => {
          this.memberList = response.list
          this.total = response.total
          this.tableLoad = false
        })
      },
      onClickQuery2 () {
        this.memberList = []
        const data = {
          status: 1,
          idStrs: this.queryForm.id?(this.queryForm.id.trim()==""?null:this.queryForm.id.split('\n')):null,
          department: this.queryForm.department,
          loginName: this.queryForm.loginName,
          userName: this.queryForm.userName,
          accountStatus:this.queryForm.accountStatus,
          pageNum: this.queryForm.pageNum,
          pageSize: this.queryForm.pageSize,
          orderBy:this.queryForm.orderBy,
          sort:this.queryForm.sort
        }
        this.tableLoad = true
        listMember(data).then(response => {
          this.memberList = response.list
          this.total = response.total
          this.tableLoad = false
        })
      },
      onClickBatchLeave () {
        if (this.multipleSelection.length<=0){
          this.$message({
            message: "请先选择员工信息",
            type: "error"
          });
          return;
        }

        this.$confirm('确定对该员工执行离职操作？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const data = {
            ids: this.multipleSelection,
            status: 0,
            enable: 0
          }
          changeBatchStatus(data).then(() => {
            this.$message({
              message: "员工离职操作成功",
              type: "success"
            });
            this.onClickQuery()
          })
        }).catch(() => { })
      },
      onClickBatchDelete(){
        if (this.multipleSelection.length<=0){
          this.$message({
            message: "请先选择员工信息",
            type: "error"
          });
          return;
        }
        this.$confirm('此操作将永久删除该员工，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.memberInfo = {
            ids:this.multipleSelection
          }
          batchDelete(this.memberInfo).then(response => {
            this.$message({
              message: "刪除成功",
              type: "success"
            });
            this.onClickQuery();
          })
        }).catch(() => { })


      },
      onClickUpdateDept(){
        if (this.multipleSelection.length<=0){
          this.$message({
            message: "请先选择员工信息",
            type: "error"
          });
          return;
        }
        this.$set(this.dialogData, 'departmentVisible2', true);
        this.dialogData.departmentVisible2 = true;
      },
      onClickAdd () {
        // this.memberInfo.roleList = null
        this.$nextTick(()=>{
          if(this.$refs['ruleForm']){
            this.$refs['ruleForm'].resetFields()
          }
        });
        if(!this.queryDepartment){
          this.memberInfo = {
            status: 1,
            enable: 1,
            roleList: [],
          }
        }else{
          this.memberInfo = {
            status: 1,
            enable: 1,
            roleList: [],
            departId:this.queryDepartment.id,
            department:this.queryDepartment.orgName
          }
        }
        this.$set(this.dialogData, 'title', '新增员工')
        this.$set(this.dialogData, 'type', 'add')
        this.$set(this.dialogData, 'editVisible', true)
      },
      onClickEdit (row) {
        this.$nextTick(()=>{
          if(this.$refs['ruleForm']) {
            this.$refs['ruleForm'].resetFields()
          }
        });
        this.$set(this.dialogData, 'title', '修改员工')
        this.$set(this.dialogData, 'type', 'edit')
        this.$set(this.memberInfo, 'userName2', '')
        getUserById(row.id).then(response => {
          this.memberInfo = response
          this.memberInfo.userName2 = response.userName
          const roleList = this.memberInfo.roleList.map(item => item.id)
          this.$set(this.memberInfo, 'roleList', roleList)
          this.$set(this.memberInfo, 'callCenter', response.callcenterid)
          this.$set(this.dialogData, 'editVisible', true)
        })
      },
      onClickPwdReset(row){
        this.$confirm('确定重置该员工密码？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resetMember(row.id).then(() => {
            this.$message({
              type: 'success',
              message: '员工密码重置成功!'
            });
            //this.onClickQuery()
          })
        }).catch(() => { })
      },
      onClickLock (row) {
        this.$confirm('确定锁定该员工账号？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const data = {
            id: row.id,
            status: row.status,
            enable: 0
          }
          changeStatus(data).then(() => {
            this.$message({
              type: 'success',
              message: '员工账号锁定成功'
            });
            this.onClickQuery()
          })
        }).catch(() => { })
      },
      onClickUnLock (row) {
        this.$confirm('确定解锁该员工账号？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const data = {
            id: row.id,
            status: row.status,
            enable: 1
          }
          changeStatus(data).then(() => {
            this.$message('员工账号解锁成功')
            this.onClickQuery()
          })
        }).catch(() => { })
      },
      onClickLeave (row) {
        this.$confirm('确定对该员工执行离职操作？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const data = {
            id: row.id,
            status: 0,
            enable: 0
          }
          changeStatus(data).then(() => {
            this.$message('员工离职操作成功')
            this.onClickQuery()
          })
        }).catch(() => { })
      },
      onClickDelete (row) {
        this.$confirm('此操作将永久删除该员工，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteMember(row.id).then(() => {
            this.$message('员工删除成功')
            this.onClickQuery()
          })
        }).catch(() => { })
      },
      onClickSelectDept () {
        this.$set(dialogData, 'departmentVisible', true)
        this.currentDept = null
      },
      onClickDepartment (data, node) {
        this.queryDepartment = data
        this.$set(this.queryForm, 'department', data.id)
        this.onClickQuery()
      },
      onSelectDepartment (data, node) {
        this.currentDept = data
      },
      onClickSaveDept () {
        this.$set(this.memberInfo, 'departId', this.currentDept.id)
        this.$set(this.memberInfo, 'department', this.currentDept.orgName)
        this.$set(this.dialogData, 'departmentVisible', false)
      },
      updateDept () {
        this.$set(this.memberInfo, 'departId', this.currentDept.id)
        this.$set(this.memberInfo, 'department', this.currentDept.orgName)
        this.$set(this.memberInfo, 'ids', this.multipleSelection)
        this.$set(this.dialogData, 'departmentVisible2', false)
        let { ...resultData } = this.memberInfo

        updateDept(resultData).then(response => {
          this.onClickQuery()
          this.onClickCancel()
          this.$message({
            message: "修改部门成功",
            type: "success"
          });
        })
      },
      onClickReset () {
        this.queryForm = {
          pageNum: this.queryForm.pageNum,
          pageSize: this.queryForm.pageSize
        }
      },
      onClickCancel () {
        this.$refs['ruleForm'].resetFields()
        this.$set(this.dialogData, 'editVisible', false)
      },
      onClickModuleImport(){
        this.loading2=true
        this.fullscreenLoading=true
        exportModule().then(() => {
          this.loading2=false
          this.fullscreenLoading=false
          this.$message({
            message: "下载成功",
            type: "success"
          });
        });
      },
      onClickImport(){
        this.loading2=true
        this.fullscreenLoading=true
        const data = {
          status: 1,
          department: this.queryForm.department,
          loginName: this.queryForm.loginName,
          userName: this.queryForm.userName
        }
        exportList(data).then(() => {
          this.loading2=false
          this.fullscreenLoading=false
          this.$message({
            message: "导出成功",
            type: "success"
          });
        });
      },
      onClickSave () {
        this.$refs.ruleForm.validate((valid)=>{
          if(valid){
            if(this.returnName && this.returnName !== this.memberInfo.userName && this.memberInfo.userName!=this.memberInfo.userName2){
              this.$confirm(`已有用户名相同的员工,是否用${this.returnName}替换${this.memberInfo.userName}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.loading2 = true
                this.fullscreenLoading = true
                this.memberInfo.userName = this.returnName
                this.returnName = null
                let { ...resultData } = this.memberInfo
                resultData.roleList = resultData.roleList.map(item => { return { id: item } })
                if (this.dialogData.type === 'add') {
                  addMember(resultData).then(response => {
                    this.onClickQuery()
                    this.onClickCancel()
                    this.loading2 = false
                    this.fullscreenLoading = false
                  })
                } else {
                  updateMember(resultData).then(response => {
                    this.onClickQuery()
                    this.onClickCancel()
                    this.loading2 = false
                    this.fullscreenLoading = false
                  })
                }
              }).catch(() => {

              })
            }else{
              this.loading2 = true
              this.fullscreenLoading = true
              this.returnName = null
              let { ...resultData } = this.memberInfo
              resultData.roleList = resultData.roleList.map(item => { return { id: item } })
              resultData.callcenterid = resultData.callCenter
              if (this.dialogData.type === 'add') {
                addMember(resultData).then(response => {
                  this.onClickQuery()
                  this.onClickCancel()
                  this.$message.success('操作成功')
                })
                this.loading2 = false
                this.fullscreenLoading = false
              } else {
                updateMember(resultData).then(response => {
                  this.onClickQuery()
                  this.onClickCancel()
                  this.$message.success('操作成功')
                })
                this.loading2 = false
                this.fullscreenLoading = false
              }
            }
          }else{
            this.$message('校验失败，请根据提示修改后提交')
            return
          }
        })
      },
      formatRole (row, column, cellValue) {
        if (cellValue && cellValue.length > 0) {
          return cellValue.map(item => item.roleName).join('/')
        } else {
          return null
        }
      },
      callCenterChanged(callCenterID){
        this.$set(this.memberInfo, 'callCenter', callCenterID)
      },
      callCenterCleared(){
        this.$set(this.memberInfo, 'callCenter', null)
      }
    }
  }
</script>

<style lang="scss">
  #member-in {
    min-width: 1650px !important;

    display: flex;
    .left-wrap {
      display: inline-block;
      overflow-y: auto;
      width: 240px;
      border-right: 1px solid #e8e8e8;
      .tree-wrap {
        height: 100%;
        .el-tree-node__content {
          height: 40px;
        }
        .custom-tree-node {
          display: inline-block;
          height: 100%;
          line-height: 40px;
          flex: 1;
          font-size: 14px;
          padding: 0 8px 0 12px;
          color: #0080ff;
          &.active {
            color: #fff;
            background: #0080ff;
          }
        }
      }
    }
    .right-wrap{
      height: 100%;
      width: calc(100% - 270px);
      display: inline-block;
      margin-left: 20px;
    }
    .color_BLACK {
      color: #000000;
    }
    .color_RED {
      color: #FF0000;
    }
    .dialog-wrap {
      .el-dialog__body {
        .el-form {
          display: flex;
          flex-wrap: wrap;
          .el-form-item {
            display: flex;
            width: 50%;
            .el-form-item__content {
              flex: 1;
              margin-left: 0 !important;
              .el-select {
                width: 100%;
              }
              .el-date-editor{
                width: 100%;
              }
            }
          }
        }
      }
      .department-wrap {
        width: 300px;
        .el-dialog__body {
          .tree-wrap {
            height: 100%;
            .el-tree-node__content {
              height: 40px;
            }
            .custom-tree-node {
              display: inline-block;
              height: 100%;
              flex: 1;
              font-size: 14px;
              padding: 0 8px 0 12px;
              color: #0080ff;
              &.active {
                color: #fff;
                background: #0080ff;
              }
            }
          }
        }
      }
    }
  }
</style>
