<template>
  <div id="collect-call-inquiry">
    <el-dialog
      :title="detailTitle"
      class="dialog-wrap"
      :visible.sync="detailVisible"
      :close-on-click-modal="false"
      width="90%"
      v-dialogDrag
    >
      <case-detail :id="detailId" ref='detail'></case-detail>
    </el-dialog>
    <!-- label-width="80px" -->
    <el-form :inline="true" ref="form1" :model="form1" class="queryStyle">
      <el-form-item prop="val1">
        <el-checkbox-group v-model="form1.val1">
          <el-checkbox true-label="1" false-label="2">精准匹配</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item prop="val2" label="委托方：">
        <el-select
          v-model="form1.val2"
          placeholder="请选择委托方"
          multiple
          collapse-tags
          clearable
        >
          <el-option
            v-for="item in val2_data"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="val3" label="姓名：">
        <el-input
          v-model="form1.val3"
          placeholder="请输入姓名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="val4" label="电话：">
        <el-input
          v-model="form1.val4"
          placeholder="请输入电话"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="val5" label="地址：">
        <el-input
          v-model="form1.val5"
          placeholder="请输入地址"
          clearable
        ></el-input>
      </el-form-item><el-form-item prop="val6" label="证件号：">
        <el-input
          v-model="form1.val6"
          placeholder="请输入证件号"
          clearable
        ></el-input>
      </el-form-item><el-form-item prop="val7" label="卡号：">
        <el-input
          v-model="form1.val7"
          placeholder="请输入卡号"
          clearable
        ></el-input>
      </el-form-item><el-form-item prop="val8" label="单位名称：">
        <el-input
          v-model="form1.val8"
          placeholder="请输入单位名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-row>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="query()">查询</el-button>
        <el-button
          type="primary"
          icon="el-icon-refresh"
          @click="resetForm('form1');getMainData()"
        >重置</el-button
        >
      </el-form-item>
      </el-row>
    </el-form>
     <el-table highlight-current-row v-loading="tableLoad"
      :data="tableData"
      tooltip-effect="dark"
      sortable="custom"
      @row-dblclick="showCase"
      @sort-change="sortHandle"
    >
      <el-table-column
        label="个案序列号"
        min-width="180"
        prop="seqNo"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        header-align="center" align="center"
        show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button v-if="scope.row.status==3" type="text" style ="color:#999999;" size="small" @click="showCase(scope.row)">
              {{scope.row.seqNo}}
            </el-button>
            <el-button v-if="scope.row.status==4" type="text" style ="color:#999999;text-decoration:line-through;" size="small" @click="showCase(scope.row)">
              {{scope.row.seqNo}}
            </el-button>
            <el-button v-if="scope.row.status!=3 && scope.row.status!=4" type="text" size="small" @click="showCase(scope.row)">
              {{scope.row.seqNo}}
            </el-button>
          </template>
      </el-table-column>

      <el-table-column
        label="姓名"
        align="center"
        min-width="120"
        prop="name"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip
      >
      <template slot-scope="scope">
           {{scope.row.name}}
      </template>
      </el-table-column>

      <el-table-column
        label="卡号"
        align="center"
        min-width="180"
        prop="cardNo"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip
      >
      <template slot-scope="scope">
           {{scope.row.cardNo}}
      </template>
      </el-table-column>

      <el-table-column
        label="委案金额"
        align="center"
        min-width="120"
        prop="moneyMsg"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{scope.row.moneyMsg}}
        </template>
      </el-table-column>

      <el-table-column
        label="委案日期"
        align="center"
        min-width="120"
        prop="caseDate"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip
      >
      <template slot-scope="scope">
        {{scope.row.caseDate}}
      </template>
      </el-table-column>

      <el-table-column
        label="催收状态"
        align="center"
        min-width="100"
        prop="collectStatusMsg"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip
      >
      <template slot-scope="scope">
           {{scope.row.collectStatusMsg}}
      </template>
      </el-table-column>

      <el-table-column
        label="上次通电时间"
        align="center"
        min-width="180"
        prop="collectDate"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip
      >
      <template slot-scope="scope">
        <span>
          {{scope.row.collectDate}}
        </span>
      </template>
      </el-table-column>

      <el-table-column
        v-for="(item, index) in tablecol_data"
        v-bind="item"
        :key="index"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        align="center"
        header-align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" align="center" width="100">
      <template slot-scope="scope">
          <el-button type="text" align="center" @click="dialogVisible=true;currentRow = scope;textarea3 = currentRow.comment" v-has="'评语'">
            评语
          </el-button>
      </template>
      </el-table-column>

    </el-table>
    <el-dialog
      title="添加评语"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      v-dialogDrag
      class="dialog-wrap"
      >
      <el-input
        type="textarea"
        :autosize="{ minRows: 6, maxRows: 14}"
        placeholder="请输入评语"
        v-model="textarea3">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false;diaOkHandle()">确 定</el-button>
      </span>
    </el-dialog>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paginationData.currentPage"
      :page-sizes="pageSizes"
      :page-size="paginationData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="paginationData.total">
    </el-pagination>
  </div>
</template>

<script>
import {pageCaseTel,addComment,getEnum} from '@/common/js/collect-call-inquiry.js';
//import CaseDetail from '@/views/data-manage/detail';
const CaseDetail = () => import('@/views/data-manage/detail');
import {pageSizes} from "@/common/js/const"

export default {
  name: 'collectCallInquiry',
  components:{
    CaseDetail
  },
  data(){
    return {
      pageSizes,
      tableLoad:false,
      paginationData:{
        pageSize:pageSizes[0],
        total:0,
        currentPage:1
      },
      currentRow: {},
      dialogVisible:false,
      textarea3: '',
      form1:{
        val1:'1',  //查询方式
        val2:'',  //委托方
        val3:'',//姓名
        val4:'',//电话
        val5:'',//地址
        val6:'',//证件号
        val7:'',//卡号
        val8:'',//单位名称
      },
      val2_data: [],
      tableData: [],
      //   [{
      //   "seqNo"//个案序列号
      //     "name"//姓名
      //   "card_no"//卡号
      //     "money"//委案金额
      //   "caseDate"//委案日期
      //     "collectStatus"//催收状态
      //   "collectDate"//上次通电
      //     "proRepayAmt"//承诺还款金额
      //   "en_repay_amt"//已还款金额
      //     "account_age"//账龄
      //   "odvv"//催收员
      // }]
      tablecol_data:[
        {
          'min-width': 140,
          prop:'proRepayAmtMsg',
          label:'承诺还款金额'
        },
        {
          'min-width': 120,
          prop:'enRepayAmtMsg',
          label:'已还金额'
        },
        {
          'min-width': 100,
          prop:'accountAge',
          label:'账龄'
        },
        {
          'min-width': 140,
          prop:'odv',
          label:'催收员'
        },
      ],
      detailVisible: false,
      detailTitle: '案件详情',
      detailId:-1,
      sort:{
        orderBy: 'id',
        sort:'desc'
      },
    }
  },

  computed:{
    realFetchFormData(){
      // {
      //   "client"//委托方
      //   "name"//名称
      //   "cardNo"//卡号
      //   "unitName"://单位名称
      //   "identNo"//证件号
      //   "address"//地址
      //   "tel"//电话
      //   "queryMethod" 查询方式  1精确查询 2模糊查询
      //   "pageNum":1,
      //   "pageSize":2,
      // }
      let
        {val1:queryMethod,val2:clients,val3:name,val4:tel,val5:address,val6:identNo,val7:cardNo,val8:unitName} =
        this.form1;
      return{
        cardNo,
        queryMethod,
        clients,
        name,
        tel,
        address,
        identNo,
        unitName,
        pageNum: this.paginationData.currentPage,
        pageSize: this.paginationData.pageSize
      }
    },
  },

  created(){
    this.init();
  },
  methods:{
    sortHandle({column,prop,order}){
      this.sort.sort = order.replace('ending', '');
      this.sort.orderBy = prop;
      this.getMainData();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    querySearch(queryString, cb) {
      cb([]);
    },
    query(){
      if ((this.realFetchFormData.clients==null||this.realFetchFormData.clients=="") && (this.realFetchFormData.name==null||this.realFetchFormData.name=="") && (this.realFetchFormData.tel==null||this.realFetchFormData.tel=="")&& (this.realFetchFormData.address==null||this.realFetchFormData.address=="") && (this.realFetchFormData.identNo==null||this.realFetchFormData.identNo=="") && (this.realFetchFormData.cardNo==null||this.realFetchFormData.cardNo=="") && (this.realFetchFormData.unitName==null||this.realFetchFormData.unitName=="")){
        this.$message({
          message: '请先选择查询条件',
          error: 'success'
        });
        return;
      }
      this.getMainData();
    },
    getMainData(){
      this.tableLoad = true
      this.realFetchFormData.orderBy = this.sort.orderBy
      this.realFetchFormData.sort = this.sort.sort
      pageCaseTel(this.realFetchFormData).then((data)=>{
        this.paginationData.total = data.total;
        this.tableData = data.list;
        this.tableLoad = false
      })
    },
    showCase(row){
      window.open(`#/zhx/case-detail?id=${row.id}`)
      // let id = row.id
      // let name = row.name
      // let seqNo = row.seqNo
      // this.$router.push({
      //   path:'case-detail',
      //   query:{
      //     id,
      //     name,
      //     mycase:true,
      //     seqNo
      //   }
      // })
    },
    handleCurrentChange(currentPage){
      this.paginationData.currentPage = currentPage;
      this.getMainData();
    },
    handleSizeChange(pageSize){
      this.paginationData.pageSize = pageSize;
      this.getMainData();
    },
    diaOkHandle(){
      let {id} = this.currentRow.row;
      addComment([{id,comment:this.textarea3}]).then(()=>{
        this.$message({
          message: '提交成功',
          type: 'success'
        });
        this.getMainData();
      })
    },
    transform(data,obj=[['name','label'],['id','value']]){
      return data.reduce((acc, item) => {
        for (let [key, tarKey] of obj) {
          item[tarKey] = item[key];
        }
        acc.push(item);
        return acc;
      }, []);
    },
    getEnumHandle(name,target,transData){
      getEnum({name}).then((data)=>{
        this[target] = this.transform(data,transData);
      });
    },
    init(){
      this.getMainData();
      //this.getEnumHandle('委托方', 'val2_data');
      this["val2_data"] = this.transform(this.$store.getters.caseType.委托方);
    },
  }
}
</script>

<style lang="scss">
#collect-call-inquiry{
  min-width: 1700px !important;
}
</style>
