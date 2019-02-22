<template>
  <div id="collect-call-inquiry">
    <el-dialog
      :title="detailTitle"
      class="dialog-wrap"
      :visible.sync="detailVisible"
      :close-on-click-modal="false"
      width="90%"
    >
      <case-detail></case-detail>
    </el-dialog>
    <el-form :inline="true" ref="form1" :model="form1" label-width="80px">
      <el-form-item prop="val1">
        <el-radio-group v-model="form1.val1">
          <el-radio label="1" >精确</el-radio>
          <el-radio label="2" >模糊</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="val2">
        <el-select
          v-model="form1.val2"
          placeholder="请选择委托方"
          filterable
          multiple
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
      <el-form-item prop="val3">
        <el-input
          v-model="form1.val3"
          placeholder="姓名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="val4">
        <el-input
          v-model="form1.val4"
          placeholder="电话"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="val5">
        <el-input
          v-model="form1.val5"
          placeholder="地址"
          clearable
        ></el-input>
      </el-form-item><el-form-item prop="val6">
        <el-input
          v-model="form1.val6"
          placeholder="证件号"
          clearable
        ></el-input>
      </el-form-item><el-form-item prop="val7">
        <el-input
          v-model="form1.val7"
          placeholder="卡号"
          clearable
        ></el-input>
      </el-form-item><el-form-item prop="val8">
        <el-input
          v-model="form1.val8"
          placeholder="单位名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="text" icon="el-icon-search" @click="getMainData()">查询</el-button>
        <el-button
          type="text"
          icon="el-icon-refresh"
          @click="resetForm('form1');getMainData()"
        >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      sortable="custom"
      @sort-change="sortHandle"
    >
      <el-table-column
        label="个案序列号"
        min-width="90"
        prop="seqno"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        header-align="center" align="center">
        <template slot-scope="scope">
          <el-button style="text-decoration: underline" type="text" size="small"
                     @click="showCase(scope.row)">{{scope
            .row.seqNo}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in tablecol_data"
        v-bind="item"
        :key="index"
        min-width="90"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        align="center"
        header-align="center"
      ></el-table-column>
      <el-table-column label="操作" >

      <template slot-scope="scope">
          <el-button @click="dialogVisible=true;currentRow = scope;">
            评语
          </el-button>
      </template>
      </el-table-column>

    </el-table>
    <el-dialog
      title="添加评语"
      :visible.sync="dialogVisible"
      width="30%">
      <el-input
        type="textarea"
        :autosize="{ minRows: 6, maxRows: 14}"
        placeholder="请输入内容"
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
      :page-sizes="[100, 500, 2000, 10000, 1000000]"
      :page-size="paginationData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="paginationData.total">
    </el-pagination>
  </div>
</template>

<script>
import {pageCaseTel,addComment,getEnum} from '@/common/js/collect-call-inquiry.js';
import CaseDetail from '@/views/data-manage/detail';

export default {
  name: 'collectCallInquiry',
  components:{
    CaseDetail
  },
  data(){
    return {
      paginationData:{
        pageSize:10,
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
          prop:'name',
          label:'姓名'
        },{
          prop:'cardNo',
          label:'卡号'
        },{
          prop:'money',
          label:'委案金额'
        },{
          prop:'caseDate',
          label:'委案日期'
        },{
          prop:'collectStatusMsg',
          label:'催收状态'
        },{
          prop:'collectDate',
          label:'上次通电'
        },{
          prop:'proRepayAmt',
          label:'承诺还款金额'
        },{
          prop:'enRepayAmt',
          label:'已还款金额'
        },{
          prop:'accountAge',
          label:'账龄'
        },{
          prop:'odv',
          label:'催收员'
        },
      ],
      detailVisible: false,
      detailTitle: '案件详情',
      sort:{
        orderBy: 'id',
        sort:'desc'
      }
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
    sortHandle({prop,order}){
      this.sort = order.replace('ending', '');
      this.sort.orderBy = prop;
      this.getMainData();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    querySearch(queryString, cb) {
      cb([]);
    },
    getMainData(){
      this.realFetchFormData.orderBy = this.sort.orderBy
      this.realFetchFormData.sort = this.sort.sort
      pageCaseTel(this.realFetchFormData).then((data)=>{
        console.log(data)
        // "totalPageNum":""//总页数
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
        this.paginationData.total = data.total;
        this.tableData = data.list;
      })
    },
    showCase(row){
      this.detailVisible=true;
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
      this.getEnumHandle('委托方', 'val2_data');
    },
  }
}
</script>

<style lang="scss">
#collect-call-inquiry{
  
}
</style>


