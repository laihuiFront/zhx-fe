<template>
  <div  id="syn-record-query" >
  <el-form  :model="queryForm" :inline="true" class="query-wrap">
    <el-form-item  v-if="queryConf.csqy || queryConfFlag">
      <el-select style="width: 200px;" clearable v-model="queryForm.dataCase.collectionArea.id" filterable placeholder="请选择催收区域">
        <el-option
          v-for="item in collectionAreaList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item  v-if="queryConf.pc || queryConfFlag">
      <el-select style="width: 200px;" v-model="queryForm.dataCase.batchNos" filterable multiple collapse-tags placeholder="请选择批次" clearable>
        <el-option
          v-for="item in batchList"
          width="200"
          :key="item.id"
          :label="item.batchNo"
          :value="item.batchNo">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item  v-if="queryConf.wtf || queryConfFlag">
      <el-select style="width: 200px;" clearable v-model="queryForm.dataCase.clients" filterable placeholder="请选择委托方">
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
        range-separator="至"
        start-placeholder="委案日期开始"
        end-placeholder="委案日期结束">
      </el-date-picker>
    </el-form-item>
    <el-form-item  v-if="queryConf.ajzt || queryConfFlag">
            <el-select clearable v-model="queryForm.dataCase.status" filterable placeholder="请选择案件状态" style="width: 200px;">
              <el-option
                v-for="item in statusList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
    </el-form-item>
    <el-form-item  v-if="queryConf.cszt || queryConfFlag">
            <el-select v-model="queryForm.dataCase.collectStatus" filterable clearable placeholder="请选择催收状态" style="width: 200px;">
              <el-option
                v-for="item in collectStatusList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
    </el-form-item>
    <el-form-item  v-if="queryConf.xclx || queryConfFlag">
            <el-select v-model="queryForm.synergisticType.name" filterable clearable placeholder="请选择协催类型" style="width: 200px;">
              <el-option
                v-for="item in synergisticTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
    </el-form-item>
    <el-form-item  v-if="queryConf.waje || queryConfFlag">
            <el-input v-model="queryForm.dataCase.moneyStart" clearable placeholder="请输入委案金额下限" style="width: 200px;"></el-input>
    </el-form-item>
    <el-form-item  v-if="queryConf.waje || queryConfFlag">
    至
    </el-form-item>
    <el-form-item  v-if="queryConf.waje || queryConfFlag">
            <el-input v-model="queryForm.dataCase.moneyEnd" clearable placeholder="请输入委案金额上限" style="width: 200px;"></el-input>
    </el-form-item>
    <el-form-item v-if="queryConf.xm || queryConfFlag">
            <el-input v-model="names" @change="namesChange" type="textarea" :rows="3" clearable placeholder="请输入姓名" style="width: 200px;"></el-input>
    </el-form-item>
    <el-form-item v-if="queryConf.gaxlh || queryConfFlag">
            <el-input v-model="seqNos" @change="seqNosChange" type="textarea" :rows="3" clearable placeholder="请输入个案序列号" style="width: 200px;"></el-input>
    </el-form-item>
    <el-form-item v-if="queryConf.zjh || queryConfFlag">
            <el-input v-model="identNos" @change="identNosChange" type="textarea" :rows="3" clearable placeholder="请输入证件号" style="width: 200px;"></el-input>
    </el-form-item>
    <el-form-item v-if="queryConf.sqr || queryConfFlag">
            <el-input v-model="queryForm.applyUser.name" clearable placeholder="请输入申请人" style="width: 200px;"></el-input>
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

      <el-checkbox v-model="queryConf.csqy" label="1" >催收区域</el-checkbox>
      <el-checkbox v-model="queryConf.pc" label="2" >批次</el-checkbox>
      <el-checkbox v-model="queryConf.wtf" label="3" >委托方</el-checkbox>
      <el-checkbox v-model="queryConf.warq" label="4" >委案日期</el-checkbox>
      <el-checkbox v-model="queryConf.ajzt" label="5" >案件状态</el-checkbox>

      <el-checkbox v-model="queryConf.cszt" label="1" >催收状态</el-checkbox>
      <el-checkbox v-model="queryConf.xclx" label="2" >协催类型</el-checkbox>
      <el-checkbox v-model="queryConf.waje" label="3" >委案金额</el-checkbox>
      <el-checkbox v-model="queryConf.xm" label="4" >姓名</el-checkbox>
      <el-checkbox v-model="queryConf.gaxlh" label="5" >个案序列号</el-checkbox>

      <el-checkbox v-model="queryConf.zjh" label="1" >证件号</el-checkbox>
      <el-checkbox v-model="queryConf.sqr" label="2" >申请人</el-checkbox>

    </el-row>
    <span slot="footer" class="footer">
        <el-button @click="showQueryConfVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveConf">确 定</el-button>
      </span>
  </el-dialog>
  </div>
</template>

<script>
import {getEnum,getBatchList,getStatusList,saveSelectFilter,selectByModule} from '@/common/js/api-sync'
export default {
  name:'repayRecordQuery',
  props:{
    queryForm:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      caseDate:[],
      applyTime:[],
      collectionAreaList: [],
      batchList:[],
      clientList:[],
      showQueryConfVisible:false,
      queryConf:{},
      queryConfFlag:true,
      statusList: [],
      collectStatusList:[],
      synergisticTypeList:[],
      names:null,
      seqNos:null,
      identNos:null
    }
  },
  created(){
    this.initPage()
    this.queryConfList();
  },
  methods:{
    thisReset(){
      this.names=null,
        this.seqNos=null,
        this.identNos=null
      this.caseDate=[]
    },
    saveConf(){
      this.showQueryConfVisible = false;
      let queryObj = {module:"synergistic-application",menu:this.queryConf}
      saveSelectFilter(queryObj).then(data => {
        this.$message({
          message: "配置成功",
          type: "success"
        });
        this.queryConfList();
      });
    },
    queryConfList(){
      let queryObj = {module:"synergistic-application",menu:this.queryConf}
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
      getEnum('催收区域').then(data => this.collectionAreaList = data)
      getBatchList().then(data=> this.batchList = data)
      getEnum('委托方').then(data => this.clientList = data)
      this.statusList = getStatusList()
      getEnum('催收状态').then(data => this.collectStatusList = data)
      getEnum('协催类型').then(data => this.synergisticTypeList = data)
    },
    namesChange(val){
      if(val){
        this.queryForm.dataCase.names = val.split('\n')
      }else{
        this.queryForm.dataCase.names = null
      }
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
    applyTimeChange(val){
      console.log(val)
      if(val){
        this.queryForm.applyTimeStart = val[0]
        this.queryForm.applyTimeEnd = val[1]
      }else{
        this.queryForm.applyTimeStart = null
        this.queryForm.applyTimeEnd = null
      }
    },
  }
}
</script>

<style lang="scss" scoped>
#syn-record-query{

  .pad{
    .el-checkbox{
      width:24%;
      margin-right: 0px;
    }
  }
  .el-select-dropdown{
    width:200px !important;
  }
}
</style>

