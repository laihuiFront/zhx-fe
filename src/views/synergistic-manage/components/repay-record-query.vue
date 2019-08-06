<template>
  <div id="repay-record-query">
  <el-form  :model="queryForm" :inline="true" class="query-wrap queryStyle">
    <el-form-item  v-if="queryConf.xm || queryConfFlag">
      <el-input style="width: 180px;" v-model="queryForm.dataCase.name" clearable placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item  v-if="queryConf.csqy || queryConfFlag">
      <el-select style="width: 180px;" clearable v-model="queryForm.dataCase.collectionArea.ids" filterable collapse-tags multiple placeholder="请选择催收区域">
        <el-option
          v-for="item in collectionAreaList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item  v-if="queryConf.pc || queryConfFlag">
      <el-select style="width: 180px;" v-model="queryForm.dataCase.batchNos" filterable collapse-tags multiple placeholder="请选择批次" clearable>
        <el-option
          v-for="item in batchList"
          :key="item.id"
          :label="item.batchNo"
          :value="item.batchNo">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item  v-if="queryConf.wtf || queryConfFlag">
      <el-select style="width: 180px;" clearable v-model="queryForm.dataCase.clients" filterable collapse-tags multiple placeholder="请选择委托方">
        <el-option
          v-for="item in clientList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item  v-if="queryConf.warq || queryConfFlag">
      <el-date-picker
        @change="caseDateChange"
        clearable
        v-model="caseDate"
        value-format="yyyy-MM-dd"
        type="daterange"
        unlink-panels
        range-separator="至"
        start-placeholder="委案日期开始"
        end-placeholder="委案日期结束">
      </el-date-picker>
    </el-form-item>
    <el-form-item  v-if="queryConf.hsbm || queryConfFlag">
            <e-l-TreeSelect style="width: 180px;"
                ref="treeSelectDept"
                v-model="queryForm.dataCase.dept"
                :selectParams="{'multiple': false,'clearable': true,'placeholder': '请选择回收部门'}"
                :treeParams="elTreeParamsDept">
            </e-l-TreeSelect>
    </el-form-item>
    <el-form-item  v-if="queryConf.hscsy || queryConfFlag">
            <!--<el-select style="width:200px;" clearable v-model="queryForm.dataCase.collectionUser.ids" filterable collapse-tags multiple placeholder="请选择回收催收员">
              <el-option
                v-for="item in collectionUserList"
                :key="item.id"
                :label="item.userName"
                :value="item.id">
              </el-option>
            </el-select>-->
      <el-input v-model="queryForm.odvNameFiter" width="200" @focus="onClickSelectUser3" clearable placeholder="请选择回收催收员"></el-input>
    </el-form-item>
    <el-form-item  v-if="queryConf.dq || queryConfFlag">
            <e-l-TreeSelect
                ref="treeSelectArea"
                v-model="queryForm.dataCase.caseArea.id"
                :selectParams="{'multiple': false,'clearable': true,'placeholder': '请选择地区'}"
                :treeParams="elTreeParamsArea">
            </e-l-TreeSelect>
    </el-form-item>
    <el-form-item  v-if="queryConf.ajzt || queryConfFlag">
            <el-select style="width: 180px;" clearable v-model="queryForm.dataCase.statuss" filterable collapse-tags multiple placeholder="请选择案件状态">
              <el-option
                v-for="item in statusList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
    </el-form-item>
    <el-form-item  v-if="queryConf.yqzl || queryConfFlag">
            <el-select clearable style="width: 180px;" v-model="queryForm.dataCase.accountAges" filterable collapse-tags multiple placeholder="请选择逾期账龄">
              <el-option
                v-for="item in overdueBillTimeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
    </el-form-item>
    <el-form-item  v-if="queryConf.cszt || queryConfFlag">
            <el-select style="width: 180px;" v-model="queryForm.dataCase.collectStatuss" filterable collapse-tags multiple clearable placeholder="请选择催收状态">
              <el-option
                v-for="item in collectStatusList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
    </el-form-item>
    <el-form-item  v-if="queryConf.yjtarq || queryConfFlag">
            <el-date-picker
              @change="expectDateChange"
              clearable
              v-model="expectDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="预计退案日期开始"
              end-placeholder="预计退案日期结束">
            </el-date-picker>
    </el-form-item>
    <el-form-item  v-if="queryConf.ajlx || queryConfFlag">
            <el-select style="width: 180px;" v-model="queryForm.dataCase.caseTypes" filterable collapse-tags multiple placeholder="请选择案件类型">
              <el-option
                clearable
                v-for="item in caseTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
    </el-form-item>
    <el-form-item  v-if="queryConf.gaxlh || queryConfFlag">
            <el-input v-model="seqNos" style="width: 180px;" @change="seqNosChange" type="textarea" :rows="3" clearable placeholder="请输入个案序列号"></el-input>
    </el-form-item>
    <el-form-item  v-if="queryConf.zjh || queryConfFlag">
            <el-input v-model="identNos" style="width: 180px;" @change="identNosChange" type="textarea" :rows="3"  clearable placeholder="请输入证件号"></el-input>
    </el-form-item>
    <el-form-item  v-if="queryConf.zh || queryConfFlag">
            <el-input v-model="accounts" style="width: 180px;" @change="accountsChange" type="textarea" :rows="3" clearable placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item  v-if="queryConf.kh || queryConfFlag">
            <el-input v-model="cardNos" style="width: 180px;"  @change="cardNosChange" type="textarea" :rows="3" clearable placeholder="请输入卡号"></el-input>
    </el-form-item>
    <el-form-item  v-if="queryConf.qrr || queryConfFlag">
            <el-input v-model="queryForm.confirmUser.name" style="width: 180px;"  clearable placeholder="请输入确认人"></el-input>
    </el-form-item>
    <el-form-item  v-if="queryConf.qrrq || queryConfFlag">
            <el-date-picker
              @change="confirmTimeChange"
              clearable
              v-model="confirmTime"
              value-format="yyyy-MM-dd"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="确认日期开始"
              end-placeholder="确认日期结束">
            </el-date-picker>
    </el-form-item>
    <el-form-item  v-if="queryConf.hkrq || queryConfFlag">
            <el-date-picker
              @change="repayDateChange"
              clearable
              v-model="repayDate"
              value-format="yyyy-MM-dd"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="还款日期开始"
              end-placeholder="还款日期结束">
            </el-date-picker>
    </el-form-item>
    <el-row>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="$emit('query')">查询</el-button>
        <el-button icon="el-icon-refresh" type="primary" @click="$emit('reset');thisReset();">重置</el-button>
        <el-button  type="primary" @click="showQueryConf">查询条件配置</el-button>
      </el-form-item>
      <el-form-item>
        <slot></slot>
      </el-form-item>
    </el-row>
  </el-form>
  <el-dialog
    title="查询条件配置"
    :visible.sync="showQueryConfVisible"
    width="60%"
    center
    :close-on-click-modal="false"
  >
    <el-row class="pad">
      <el-checkbox v-model="queryConf.csqy" label="1" >姓名</el-checkbox>
      <el-checkbox v-model="queryConf.csqy" label="1" >催收区域</el-checkbox>
      <el-checkbox v-model="queryConf.pc" label="2" >批次</el-checkbox>
      <el-checkbox v-model="queryConf.wtf" label="3" >委托方</el-checkbox>
      <el-checkbox v-model="queryConf.warq" label="4" >委案日期</el-checkbox>
      <el-checkbox v-model="queryConf.hsbm" label="5" >回收部门</el-checkbox>

      <el-checkbox v-model="queryConf.hscsy" label="1" >回收催收员</el-checkbox>
      <el-checkbox v-model="queryConf.dq" label="2" >地区</el-checkbox>
      <el-checkbox v-model="queryConf.ajzt" label="3" >案件状态</el-checkbox>
      <el-checkbox v-model="queryConf.yqzl" label="4" >逾期账龄</el-checkbox>
      <el-checkbox v-model="queryConf.cszt" label="5" >催收状态</el-checkbox>

      <el-checkbox v-model="queryConf.yjtarq" label="1" >预计退案日期</el-checkbox>
      <el-checkbox v-model="queryConf.ajlx" label="2" >案件类型</el-checkbox>
      <el-checkbox v-model="queryConf.gaxlh" label="2" >个案序列号</el-checkbox>
      <el-checkbox v-model="queryConf.zjh" label="2" >证件号</el-checkbox>
      <el-checkbox v-model="queryConf.zh" label="2" >账号</el-checkbox>
      <el-checkbox v-model="queryConf.kh" label="2" >卡号</el-checkbox>
      <el-checkbox v-model="queryConf.qrr" label="2" >确认人</el-checkbox>
      <el-checkbox v-model="queryConf.qrrq" label="2" >确认日期</el-checkbox>
      <el-checkbox v-model="queryConf.hkrq" label="2" >还款日期</el-checkbox>

    </el-row>
    <span slot="footer" class="footer">
        <el-button @click="showQueryConfVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveConf">确 定</el-button>
      </span>
  </el-dialog>

    <el-dialog
      title="选择回收催收员"
      class="dialog-wrap"
      :visible.sync="selectUserVisible3"
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
        <el-button @click="selectUserVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="onClickSaveUser3">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ELTreeSelect from '@/components/el-tree-select/elTreeSelect'
import {getEnum, getBatchList, getUserTree,getCollectionUserList, getStatusList,saveSelectFilter,selectByModule} from '@/common/js/api-sync'
import { getDepartmentTree } from '@/common/js/api-setting'
export default {
  name:'repayRecordQuery',
  components:{
    ELTreeSelect,
  },
  props:{
    queryForm:{
      odvNameFiter:'',
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      seqNos:null,
      identNos:null,
      accounts:null,
      cardNos: null,
      showQueryConfVisible:false,
      queryConf:{},
      selectUserVisible3:false,
      selectUserTree:[],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      queryConfFlag:true,
      caseDate:[],
      expectDate:[],
      confirmTime:[],
      repayDate:[],
      collectionAreaList:[],
      batchList:[],
      clientList:[],
      collectionUserList:[],
      overdueBillTimeList:[],
      collectStatusList: [],
      caseTypeList: [],
      statusList:[],
      elTreeParamsDept: {
        'default-expand-all': true,
          filterable: false,
          'check-strictly': true,
          data: [],
          props: {
            children: 'children',
              label: 'orgName',
              value: 'id'
          }
      },
      elTreeParamsArea: {
        'default-expand-all': true,
          filterable: false,
          'check-strictly': true,
          data: [],
          props: {
            children: 'children',
              label: 'name',
              value: 'id'
          }
      },
    }
  },
  created(){
    this.initPage()
    this.queryConfList();
  },
  methods:{
    onClickSelectUser3(){
      this.selectUserVisible3 = true
    },
    onClickSaveUser3() {
      let selectDataArr = this.$refs.tree.getCheckedNodes()
      let selectUserNames = []
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
      this.$set(this.queryForm, 'odvNameFiter', selectUserNames.join(','))
      //this.$set(this.queryForm, 'dataCase.collectionUser.ids', selectUserIds)
      this.queryForm.dataCase.collectionUser.ids = selectUserIds;
      this.selectUserVisible3 = false
    },
    thisReset(){
      this.seqNos=null
      this.identNos=null
      this.accounts=null
      this.cardNos=null
      this.caseDate=[]
      this.expectDate= []
      this.repayDate = []
      this.confirmTime = []
    },
    saveConf(){
      this.showQueryConfVisible = false;
      let queryObj = {module:"synergistic-repayment-record",menu:this.queryConf}
      saveSelectFilter(queryObj).then(data => {
        this.$message({
          message: "配置成功",
          type: "success"
        });
        this.queryConfList();
      });
    },
    queryConfList(){
      let queryObj = {module:"synergistic-repayment-record",menu:this.queryConf}
      selectByModule(queryObj).then(data => {
        if (data){
          this.queryConf = JSON.parse(data.menu);
          this.queryConfFlag = false;
        }else{
          this.queryConfFlag = true;
        }
      });
    },
    showQueryConf(){
      this.showQueryConfVisible = true;
    },
    initPage(){
      getUserTree().then(data => {
        this.selectUserTree = [data]
      })
      //getEnum('催收区域').then(data => this.collectionAreaList = data)
      this.collectionAreaList = this.$store.getters.caseType.催收区域;
      getBatchList().then(data=> this.batchList = data)
      //getEnum('委托方').then(data => this.clientList = data)
      this.clientList = this.$store.getters.caseType.委托方;
      getDepartmentTree().then(data => {
        this.$set(this.elTreeParamsDept, 'data', data)
        this.$refs.treeSelectDept.treeDataUpdateFun(data)
      })
      getEnum('地区').then(data => {
        this.$set(this.elTreeParamsArea, 'data', data)
        this.$refs.treeSelectArea.treeDataUpdateFun(data)
      })
      getCollectionUserList().then(data => this.collectionUserList = data)
      //getEnum('逾期账龄').then(data => this.overdueBillTimeList = data)
      this.overdueBillTimeList = this.$store.getters.caseType.逾期账龄;
      //getEnum('催收状态').then(data => this.collectStatusList = data)
      this.collectStatusList = this.$store.getters.caseType.催收状态;
      //getEnum('案件类型').then(data => this.caseTypeList = data)
      this.caseTypeList = this.$store.getters.caseType.案件类型;
      this.statusList = getStatusList()
    },
    seqNosChange(val){
      if(val){
        this.queryForm.dataCase.seqNos = val.split('\n')
      }else{
        this.queryForm.dataCase.seqNos = null
      }
    },
    identNosChange(val){
      if(val){
        this.queryForm.dataCase.identNos = val.split('\n')
      }else{
        this.queryForm.dataCase.identNos = null
      }
    },
    accountsChange(val){
      if(val){
        this.queryForm.dataCase.accounts = val.split('\n')
      }else{
        this.queryForm.dataCase.accounts = null
      }
    },
    cardNosChange(val){
      if(val){
        this.queryForm.dataCase.cardNos = val.split('\n')
      }else{
        this.queryForm.dataCase.cardNos = null
      }
    },
    caseDateChange(val){
      console.log(val)
      if(val){
        this.queryForm.dataCase.caseDateStart = val[0]
        this.queryForm.dataCase.caseDateEnd = val[1]
      }else{
        this.queryForm.dataCase.caseDateStart = null
        this.queryForm.dataCase.caseDateEnd = null
      }
    },
    expectDateChange(val){
      if(val){
        this.queryForm.dataCase.expectStartTime = val[0]
        this.queryForm.dataCase.expectEndTime = val[1]
      }else{
        this.queryForm.dataCase.expectStartTime = null
        this.queryForm.dataCase.expectEndTime = null
      }
    },
    confirmTimeChange(val){
      if(val){
        this.queryForm.confirmTimeStart = val[0]
        this.queryForm.confirmTimeEnd = val[1]
      }else{
        this.queryForm.confirmTimeStart = null
        this.queryForm.confirmTimeEnd = null
      }
    },
    repayDateChange(val){
      if(val){
        this.queryForm.repayDateStart = val[0]
        this.queryForm.repayDateEnd = val[1]
      }else{
        this.queryForm.repayDateStart = null
        this.queryForm.repayDateEnd = null
      }
    },
  }
}
</script>

<style lang="scss" scoped>
#repay-record-query{
  .pad{
    .el-checkbox{
      width:24%;
      margin-right: 0px;
    }
  }
}
</style>

