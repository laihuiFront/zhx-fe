<template>
  <div  id="syn-record-query" >
  <el-form  :model="queryForm" :inline="true" class="query-wrap queryStyle">
    <el-form-item  v-if="queryConf.csqy || queryConfFlag" label="催收区域：">
      <el-select  clearable v-model="queryForm.dataCase.collectionArea.ids" filterable multiple collapse-tags placeholder="请选择催收区域">
        <el-option
          v-for="item in collectionAreaList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item  v-if="queryConf.pc || queryConfFlag" label="批次：">
      <el-select  v-model="queryForm.dataCase.batchNos" filterable multiple collapse-tags placeholder="请选择批次" remote  :remote-method="querySearch"  clearable>
        <el-option
          v-for="item in batchList"
          :key="item.id"
          :label="item.batchNo"
          :value="item.batchNo">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item  v-if="queryConf.wtf || queryConfFlag" label="委托方：">
      <el-select  clearable v-model="queryForm.dataCase.clients" filterable collapse-tags multiple placeholder="请选择委托方">
        <el-option
          v-for="item in clientList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item  v-if="queryConf.warq || queryConfFlag" label="委案日期：">
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
    <el-form-item  v-if="queryConf.ajzt || queryConfFlag" label="案件状态：">
            <el-select clearable v-model="queryForm.dataCase.statuss" filterable collapse-tags multiple placeholder="请选择案件状态">
              <el-option
                v-for="item in statusList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
    </el-form-item>
    <el-form-item  v-if="queryConf.cszt || queryConfFlag" label="催收状态：">
            <el-select v-model="queryForm.dataCase.collectStatuss" filterable collapse-tags multiple clearable placeholder="请选择催收状态">
              <el-option
                v-for="item in collectStatusList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
    </el-form-item>
    <el-form-item  v-if="queryConf.xclx || queryConfFlag" label="协催类型：">
            <el-select v-model="queryForm.synergisticType.names" filterable collapse-tags multiple clearable placeholder="请选择协催类型">
              <el-option
                v-for="item in synergisticTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
    </el-form-item>
    <el-form-item  v-if="queryConf.waje || queryConfFlag" label="委案金额下限：">
            <el-input v-model="queryForm.dataCase.moneyStart" type="number" clearable placeholder="请输入委案金额下限" ></el-input>
    </el-form-item>
    <el-form-item  v-if="queryConf.waje || queryConfFlag">
    至
    </el-form-item>
    <el-form-item  v-if="queryConf.waje || queryConfFlag" label="委案金额上限：">
            <el-input v-model="queryForm.dataCase.moneyEnd" type="number" clearable placeholder="请输入委案金额上限"></el-input>
    </el-form-item>
    <el-form-item v-if="queryConf.xm || queryConfFlag" label="姓名：">
            <el-input v-model="names" @change="namesChange" type="textarea" :rows="3" clearable placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item v-if="queryConf.gaxlh || queryConfFlag" label="个案序列号：">
            <el-input v-model="seqNos" @change="seqNosChange" type="textarea" :rows="3" clearable placeholder="请输入个案序列号"></el-input>
    </el-form-item>
    <el-form-item v-if="queryConf.zjh || queryConfFlag" label="证件号：">
            <el-input v-model="identNos" @change="identNosChange" type="textarea" :rows="3" clearable placeholder="请输入证件号"></el-input>
    </el-form-item>
    <el-form-item v-if="queryConf.sqr || queryConfFlag" label="申请人：">
            <el-input v-model="queryForm.applyUser.name" clearable placeholder="请输入申请人"></el-input>
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
    v-dialogDrag
    class="dialog-wrap"
  >
    <div class="selectAllBtn">
      <el-button type="primary" @click="selectMethod(true)" >全部选中</el-button>
      <el-button type="primary" @click="selectMethod(false)" >全部取消</el-button>
    </div>
    <el-row class="pad" ref="boxWrapper">

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
import {getEnum,getBatchList,getStatusList,saveSelectFilter,batchNo,selectByModule} from '@/common/js/api-sync'
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
    //查询批次号
    querySearch(queryString) {
      batchNo({ batchNo: queryString }).then(data => {
        this.batchList = data;
      });
    },
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
     // getEnum('催收区域').then(data => this.collectionAreaList = data)
      this.collectionAreaList = this.$store.getters.caseType.催收区域;
      getBatchList().then(data=> this.batchList = data)
     // getEnum('委托方').then(data => this.clientList = data)
      this.clientList = this.$store.getters.caseType.委托方;
      this.statusList = getStatusList()
      //getEnum('催收状态').then(data => this.collectStatusList = data)
      this.collectStatusList = this.$store.getters.caseType.催收状态;
      getEnum('协催类型').then(data => this.synergisticTypeList = data)
      this.synergisticTypeList = this.$store.getters.caseType.协催类型;
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
      if(val){
        this.queryForm.dataCase.caseDateStart = val[0]
        this.queryForm.dataCase.caseDateEnd = val[1]
      }else{
        this.queryForm.dataCase.caseDateStart = null
        this.queryForm.dataCase.caseDateEnd = null
      }
    },
    applyTimeChange(val){
      if(val){
        this.queryForm.applyTimeStart = val[0]
        this.queryForm.applyTimeEnd = val[1]
      }else{
        this.queryForm.applyTimeStart = null
        this.queryForm.applyTimeEnd = null
      }
    },
    selectMethod(param){
      this._selectAllInit('queryConf');
      Object.keys(this.queryConf).map(x=>this.queryConf[x]=param)
    }
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
    width:180px !important;
  }
  .selectAllBtn{
    margin-bottom: 10px;
  }
}
</style>
