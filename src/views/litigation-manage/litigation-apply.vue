<template>
  <div id="litigation-apply" class="page-wraper-sub">
    <el-form ref="form" :model="form" :inline="true" class="query-wrap">
      <el-form-item>
        <el-input v-model="form.legalNo" placeholder="请输入案号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.cstName" placeholder="请输入姓名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button> 
        <el-button type="primary" icon="el-icon-refresh" @click="clench">重置</el-button> 
      </el-form-item>
      <el-form-item class="operation-item">
        <el-button type="primary" v-has="'添加诉讼案件'" @click="addDataform">添加诉讼案件</el-button>
      </el-form-item>
    </el-form>
   <el-table highlight-current-row v-loading="tableLoad"
    class="table-wrap"
    height="1"
    :data="DataList"
    border
    stripe
          tooltip-effect="dark"
          @sort-change="handleSort"
     style="width: 100%">
    <el-table-column
      prop="legalStatusMsg"
      align="center"
      min-width="120"
      label="案件状态"
      show-overflow-tooltip
        sortable="custom"
          :sort-orders="['ascending','descending']"
     >
    </el-table-column>
   <el-table-column
      prop="progressMsg"
      align="center"
      min-width="120"
      label="办案进度"
      show-overflow-tooltip
        sortable="custom"
          :sort-orders="['ascending','descending']"
     >
    </el-table-column>
    <el-table-column
      prop="legalTypeMsg"
      align="center"
      min-width="120"
      label="案件类型"
      show-overflow-tooltip
        sortable="custom"
          :sort-orders="['ascending','descending']"
     >
    </el-table-column>
    <el-table-column
      prop="cstName"
      align="center"
      min-width="120"
      label="客户姓名"
      show-overflow-tooltip
        sortable="custom"
          :sort-orders="['ascending','descending']"
     >
    </el-table-column>
    <el-table-column
      prop="legalDate"
      align="center"
      width="120"
      label="委案日期"
      show-overflow-tooltip
        sortable="custom"
          :sort-orders="['ascending','descending']"
     >
    </el-table-column>
    <el-table-column
      prop="clientele"
      align="center"
      min-width="120"
      label="委托人"
      show-overflow-tooltip
        sortable="custom"
          :sort-orders="['ascending','descending']"
     >
    </el-table-column>
    <el-table-column
      prop="accused"
      align="center"
      min-width="120"
      label="被告人"
      show-overflow-tooltip
        sortable="custom"
          :sort-orders="['ascending','descending']"
     >
    </el-table-column>
    <el-table-column
      prop="tital"
       min-width="120"
      align="center"
      label="标的"
      show-overflow-tooltip
        sortable="custom"
          :sort-orders="['ascending','descending']"
     >
    </el-table-column>
    <el-table-column
      prop="costMsg"
      align="center"
      width="120"
      label="费用"
      show-overflow-tooltip
        sortable="custom"
          :sort-orders="['ascending','descending']"
     >
    </el-table-column>
    <el-table-column
      prop="ownerName"
      align="center"
      min-width="120"
      label="所属人"
      show-overflow-tooltip
        sortable="custom"
          :sort-orders="['ascending','descending']"
     >
    </el-table-column>
    <el-table-column
      prop="agent"
      align="center"
      min-width="120"
      label="代理律师"
      show-overflow-tooltip
        sortable="custom"
          :sort-orders="['ascending','descending']"
     >
    </el-table-column>
    <el-table-column
      prop="court"
      align="center"
      min-width="120"
      label="受案法院"
      show-overflow-tooltip
        sortable="custom"
          :sort-orders="['ascending','descending']"
     >
    </el-table-column>
    <el-table-column
      prop="legalNo"
      align="center"
      min-width="120"
      label="案号"
      show-overflow-tooltip
        sortable="custom"
          :sort-orders="['ascending','descending']"
     >
    </el-table-column>
    <el-table-column
      prop="remark"
      align="center"
      min-width="180"
      label="备注"
      show-overflow-tooltip
        sortable="custom"
          :sort-orders="['ascending','descending']"
     >
    </el-table-column>
    <el-table-column
      align="center"
      label="操作"
      width="200"
     >
     <template slot-scope="scope">
       <el-button type="text" size="small"  @click="checkDatasure(scope.row.id)" v-has="'审核'">审核</el-button>
       <el-button type="text" size="small" @click="showmessage(scope.row)" v-has="'查看'">查看</el-button>
       <el-button type="text" size="small"  @click="editData(scope.row)" v-has="'编辑'">编辑</el-button>
       <el-button type="text" size="small"  @click="deleteData(scope.row.id)" v-has="'删除'">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  	 <el-pagination
      class="pagination-wrap"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 500, 2000, 10000, 1000000]"
      :page-size="pages"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>	
  	<el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="90%"
    class="dialog-wrap"
  >
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="140px" :disabled="isTrue">
      <el-row :gutter="24">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="姓名">
              <el-input v-model="formInline.accused" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </div></el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="案件状态">
              <el-select v-model="formInline.legalStatus" filterable  placeholder="请选择案件状态" clearable>
                <el-option
                  v-for="item in legalStatusMsgList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </div></el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="证件号">
              <el-input v-model="formInline.identNo" placeholder="请输入证件号"></el-input>
            </el-form-item>
          </div></el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="办案进度">
              <el-select v-model="formInline.progress" filterable  placeholder="请选择案件进度" clearable>
                <el-option
                  v-for="item in progressList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </div></el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="案件类型">
              <el-select v-model="formInline.legalType" filterable  placeholder="请选择案件类型" clearable>
                <el-option
                  v-for="item in caseStatusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </div></el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="标的">
              <el-input v-model="formInline.tital" placeholder="请输入标的"></el-input>
            </el-form-item>
          </div></el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="委托人">
              <el-input v-model="formInline.clientele" placeholder="请输入委托人"></el-input>
            </el-form-item>
          </div></el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="所属人">
              <el-select v-model="formInline.owner" filterable  placeholder="请选择所属人" clearable>
                <el-option
                  v-for="item in PersonDataList"
                  :key="item.id"
                  :label="item.userName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </div></el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="被告人">
              <el-input v-model="formInline.accused" placeholder="请输入被告人"></el-input>
            </el-form-item>
          </div></el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="代理律师">
              <el-input v-model="formInline.agent" placeholder="请输入代理律师"></el-input>
            </el-form-item>
          </div></el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="律师联系方式">
              <el-input v-model="formInline.agentTel" placeholder="请输入联系方式"></el-input>
            </el-form-item>
          </div></el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="费用">
              <el-input v-model="formInline.cost" placeholder="请输入费用"></el-input>
            </el-form-item>
          </div></el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="委案日期">
              <div class="block">
                <el-date-picker
                  v-model="formInline.legalDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>
          </div></el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="受案日期">
              <div class="block">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="formInline.filingDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>
          </div></el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="受案法院">
              <el-input v-model="formInline.court" placeholder="请输入法院"></el-input>
            </el-form-item>
          </div></el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="办案法官">
              <el-input v-model="formInline.judge" placeholder="请输入办案法官"></el-input>
            </el-form-item>
          </div></el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="法官联系方式">
              <el-input v-model="formInline.judgeTel" placeholder="请输入联系方式"></el-input>
            </el-form-item>
          </div></el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="案号">
              <el-input v-model="formInline.legalNo" placeholder="请输入案号"></el-input>
            </el-form-item>
          </div></el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="首次开庭日期">
              <div class="block">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="formInline.firstDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>
          </div></el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="判决日期">
              <div class="block">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="formInline.judgeDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>
          </div></el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="申请执行案号">
              <el-input v-model="formInline.exeNo" placeholder="请输入案号"></el-input>
            </el-form-item>
          </div></el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="申请执行日期">
              <div class="block">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="formInline.exeDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>
          </div></el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="执行终结日期">
              <div class="block">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="formInline.exeEndDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>
          </div></el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="诉讼缴费日期">
              <div class="block">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="formInline.costDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>
          </div></el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="保全缴费日期">
              <div class="block">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="formInline.preservationDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>
          </div></el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="送达情况">
              <el-input v-model="formInline.arriveInfo" placeholder="请输入送达"></el-input>
            </el-form-item>
          </div></el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">

          </div></el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <el-form-item label="保全资产清单">
              <el-input type="textarea" style="width: 280%;" v-model="formInline.preservationList"></el-input>
            </el-form-item>
          </div></el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <el-form-item label="判决书">
              <el-input type="textarea" style="width: 280%;"  v-model="formInline.judgment"></el-input>
            </el-form-item>
          </div></el-col>

      </el-row>

      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <el-form-item label="备注">
              <el-input type="textarea" style="width: 280%;"  v-model="formInline.remark"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>


    <div v-if=isTrue>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="grid-content bg-purple addTitle" >
            关联数据
          </div></el-col>
      </el-row>
      <el-row :gutter="20"  >
        <el-col :span="24">
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="办理记录" name="first">
              <el-row :gutter="20" style="margin-bottom: 10px;" >
                <el-col :span="21">
                  <div class="grid-content bg-purple" >
                    <span style="color: #e8e8e8;font-size: 18px;">办理记录</span>
                  </div>
                </el-col>
                <el-button type="primary" @click="adddialogVisible = true"> 添加办理记录</el-button>
              </el-row>
               <el-table highlight-current-row :data="handleList"
                border
                stripe
                style="width: 100%">
                <el-table-column
                  prop="handleDate"
                  label="办理时间"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="progress"
                  label="办理进度"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="preservationDate"
                  label="保全费缴纳时间">
                </el-table-column>
                <el-table-column
                  prop="preservationList"
                  label="保全资产清单">
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="备注">
                </el-table-column>
                <el-table-column
                  align="center"
                  label="操作"
                  width="120"
                >
                  <template slot-scope="scope">
                    <el-button type="text" size="small"  @click="edithandleList(scope.row)">编辑</el-button>
                    <el-button type="text" size="small"  @click="open7(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-dialog
              title="添加办理记录"
              :visible.sync="adddialogVisible"
              width="40%"
              append-to-body
            >
              <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="办案进度"
                              prop="progress"
                              :rules="{
      required: true, message: '请选择办案进度', trigger: 'change'
    }">
                  <el-select v-model="ruleForm.progress" filterable  placeholder="请选择案件进度" clearable>
                    <el-option
                      v-for="item in progressList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="办理时间"
                              prop="handleDate"
                              :rules="{
       type: 'string', required: true, message: '请选择时间', trigger: 'change'
    }">
                  <div class="block">
                    <el-date-picker
                      value-format="yyyy-MM-dd"
                      v-model="ruleForm.handleDate"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </el-form-item>
                <el-form-item label="保全费缴纳时间">
                  <div class="block">
                    <el-date-picker
                      value-format="yyyy-MM-dd"
                      v-model="ruleForm.preservationDate"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </el-form-item>
                <el-form-item label="保全资产清单" >
                  <el-input type="textarea" v-model="ruleForm.preservationList"></el-input>
                </el-form-item>
                <el-form-item label="备注" >
                  <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
    <el-button @click="adddialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm1('ruleForm')">确 定</el-button>
  </span>
            </el-dialog>
            <el-tab-pane label="收费记录" name="second"><el-row :gutter="20" style="margin-bottom: 10px;" >
              <el-col :span="21">
                <div class="grid-content bg-purple" >
                  <span style="color: #e8e8e8;font-size: 18px;">收费记录</span>
                </div>
              </el-col>
              <el-button type="primary" @click="add1dialogVisible = true"> 添加收费记录</el-button>
            </el-row>
               <el-table highlight-current-row :data="feeList"
                border
                stripe
                style="width: 100%">
                <el-table-column
                  prop="fee"
                  label="收费金额"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="chargeDate"
                  label="收费日期"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="feeType"
                  label="款项类别">
                </el-table-column>
                <el-table-column
                  prop="feeTarget"
                  label="收费对象">
                </el-table-column>
                <el-table-column
                  prop="payMethod"
                  label="付款方式">
                </el-table-column>
                <el-table-column
                  prop="payee"
                  label="收费人">
                </el-table-column>
                <el-table-column
                  prop="voucher"
                  label="凭证号">
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="备注">
                </el-table-column>
                <el-table-column
                  align="center"
                  label="操作"
                  width="120"
                >
                  <template slot-scope="scope">
                    <el-button type="text" size="small"  @click="editfeeList(scope.row)">编辑</el-button>
                    <el-button type="text" size="small"  @click="open8(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-dialog
              title="添加收费记录"
              :visible.sync="add1dialogVisible"
              width="70%"
              append-to-body
            >
              <el-form :model="ruleForm1" ref="ruleForm1" :inline="true" label-width="180px" class="demo-ruleForm">
                <el-form-item label="收费金额"
                              prop="fee"
                              :rules="{
      required: true, message: '收费不能为空', trigger: 'blur'
    }">
                  <el-input v-model="ruleForm1.fee"></el-input>
                </el-form-item>
                <el-form-item label="收费人">
                  <el-input v-model="ruleForm1.payee"></el-input>
                </el-form-item>
                <el-form-item label="款项类别">
                  <el-select v-model="ruleForm1.feeType" filterable  placeholder="请选择款项类别" clearable>
                    <el-option
                      v-for="item in feeTypeList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="收费日期"
                              prop="chargeDate"
                              :rules="{
       type: 'string', required: true, message: '请选择时间', trigger: 'change'
    }">
                  <div class="block">
                    <el-date-picker
                      value-format="yyyy-MM-dd"
                      v-model="ruleForm1.chargeDate"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </el-form-item>
                <el-form-item label="付款方式">
                  <el-select v-model="ruleForm1.payMethod" filterable  placeholder="请选择付款方式" clearable>
                    <el-option
                      v-for="item in payMethodList"
                      :key="item.id"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="收费对象">
                  <div class="block">
                    <el-input v-model="ruleForm1.feeTarget"></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="凭证号" style="width: 80%;">
                  <el-input type="textarea" v-model="ruleForm1.voucher" style="width: 280%;"></el-input>
                </el-form-item>
                <el-form-item label="备注" style="width: 80%;">
                  <el-input type="textarea" v-model="ruleForm1.remark" style="width: 280%;"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
    <el-button @click="addd1ialogVisible = false">取 消</el-button>
    <el-button type="primary"@click="submitForm('ruleForm1')">确 定</el-button>
  </span>
            </el-dialog>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="SaveData" v-if=!isTrue>确 定</el-button>
  </span>
  </el-dialog>
    <el-dialog
  title="审核诉讼案件"
  :visible.sync="dialogVisible1"
  width="30%"
  >
<el-form ref="checkform" :model="checkform" label-width="80px">
 
  <el-form-item label="审批结果"
  	 prop="resource"
 		:rules="{
      required: true, message: '请选择审批结果', trigger: 'change'  
    }">
    <el-radio-group v-model="checkform.resource">
      <el-radio :label="1">通过</el-radio>
      <el-radio :label="2">驳回</el-radio>
    </el-radio-group>
  </el-form-item>
     <el-form-item label="所属人"
     	 prop="owner"
 		:rules="{
     required: true, message: '请选择所属人', trigger: 'change' 
    }">
     <el-select v-model="checkform.owner" filterable  placeholder="请选择所属人" clearable>
    <el-option
      v-for="item in PersonDataList"
      :key="item.id"
      :label="item.userName"
      :value="item.id">
    </el-option>
     </el-select>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="submitFormCheck('checkform')">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
			import {dataList,remoweData,addData,PersonList,checkData,detaildata,saveHandle,saveFee,deleteHandle,deleteFee} from '@/common/js/litigation-apply.js'	

export default {
  name: 'litigationApply',
  	data(){
  		return{
        tableLoad:false,
  			payMethodList:[{id:1,value:"现金"},{id:2,value:"支票"},{id:3,value:"邮政汇款"},{id:4,value:"银行电汇"},{id:5,value:"网上支付"},{id:6,value:"其他"},],
  			feeTypeList:[],
  			ruleForm1:{},
  			add1dialogVisible:false,
  			ruleForm:{handleDate:""},
  			adddialogVisible:false,
  			activeName2:'first',
  			addDataList:true,
  			isTrue:false,
  			dialogTitle:'新增',
  			progressList:[{name:"判决",id:1},{name:"收案",id:2}], 
        legalStatusMsgList:[{name:"已审核",id:1},{name:"待审核",id:0}],
        caseStatusList:[{name:"未退案",id:0},{name:"正常",id:1},{name:"暂停",id:2},{name:"关档",id:3},{name:"退档",id:4},{name:"全部",id:5}],
  			formInline:{},
  			dialogVisible:false,
  			dialogVisible1:false,
  		  form:{},
  		  checkform:{
  		  	resource:''
  		  },
  		  currentPage4: 1,
        pages:1,
        total:100,
         DataList: [],
         PersonDataList:[],
         checkId:'',
         addId:'',
         	handleList:[],
  				feeList:[],
  				changeId:'',
  					orderBy:"id",
      sort:"desc",
  	}
  },
   methods: {
   	open7(id) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
                     this.deletehandleList(id).then((response)=>{
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.search()
            })
        }).catch(() => {
        });
      },
      	open8(id) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
                     this.deleteFeeList(id).then((response)=>{
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.search()
            })
        }).catch(() => {
        });
      },
 
handleSort( {column,prop,order}){
      this.sort = order==null?"desc":order.replace("ending","")
      this.orderBy = prop==null?"id":prop
      this.search()

    },   	
   	  submitFormCheck(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          this.checkresource()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
   	deletehandleList(id){
   		deleteHandle(id).then((response)=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.showmessage(this.formInline)
          })    
   	},
   	deleteFeeList(id){
   		deleteFee(id).then((response)=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.showmessage(this.formInline)
          })    
   	},
   	submitForm1(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.adddruleForm()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
   	    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.adddruleForm1()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      editfeeList(row){
      this.ruleForm1=row
   		this.changeId=row.id
   		this.add1dialogVisible=true;
      },
   	adddruleForm1(){
   		saveFee(this.ruleForm1,this.formInline.id,this.changeId).then((response)=>{
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.add1dialogVisible=false;
          this.showmessage(this.formInline)
          this.ruleForm1={}
           this.changeId=''
          })    
   	},
   	edithandleList(row){
   		this.ruleForm=row
   		this.changeId=row.id
   		this.adddialogVisible=true;
   	},
   	adddruleForm(){
   		saveHandle(this.ruleForm,this.formInline.id,this.changeId).then((response)=>{
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.adddialogVisible=false;
          this.showmessage(this.formInline)
          this.ruleForm={}
          this.changeId=''
          })    
   	},
   	handleClick(tab, event) {
        console.log(tab, event);
     },
   	showmessage(row){
   		detaildata(row.id).then((response)=>{
      this.dialogVisible=true
   		this.dialogTitle="详情"
   		this.isTrue=true 
   		this.handleList=response.handleList
   		this.feeList=response.feeList
   		this.formInline=response.legalEntity
   		this.formInline.progress=parseInt(response.legalEntity.progress)
   		if(!response.legalEntity.progress){
   			this.formInline.progress=""
   		}
   		this.formInline.owner=parseInt(response.legalEntity.owner)
   		if(!response.legalEntity.owner){
   			this.formInline.owner=""
   		}
        console.log(this.formInline)
   		})
   	},
   	addDataform(){
   		this.formInline={};
   		this.dialogVisible=true
   		this.dialogTitle="新增"
   		this.isTrue=false
   		this.addId=''
   		
   	},
   	checkresource(){
   		checkData(this.checkform,this.checkId).then((response)=>{
          this.$message({
            type: 'success',
            message: '审核成功!'
          });
          this.dialogVisible1=false;
          this.search()
          this.formInline={}
          this.checkId=''
          })    
   	},
   	SaveData(){
   		addData(this.formInline,this.addId).then((response)=>{
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
          this.dialogVisible=false;
          this.search()
          this.formInline={}
          this.addId=""
})    
   	},
   	checkDatasure(id){
   		this.dialogVisible1=true;
   		this.checkId=id;
   	},
   	editData(row){
   		console.log(row)
   		this.dialogVisible=true;
   		this.dialogTitle="修改";
   		this.formInline=JSON.parse(JSON.stringify(row))
   		this.formInline.progress=parseInt(row.progress)
   		if(!this.formInline.progress){
   			this.formInline.progress=""
   		}
   		this.formInline.owner=parseInt(row.owner)
   		if(!this.formInline.owner){
   			this.formInline.owner=""
   		}
   		this.isTrue=false
   		this.addId=row.id
   	},
   	deleteData(id){
         	let _self=this 
        _self.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
           	remoweData(id).then((response)=>{
            _self.$message({
            type: 'success',
            message: '删除成功!'
          });
          _self.search(this.form)
})
        }).catch(() => {
            _self.$message({
            type: 'success',
            message: '已取消删除!'
          });
        });  
   	},
   	clench(){
  		this.form={}
  	},
  	search(){
      this.tableLoad = true
  		dataList(this.form,this.orderBy,this.sort).then((response)=>{
            this.DataList=response.list
             // this.pages = response.pages
              this.total = response.total
              this.tableLoad = false
})    
  	},
  		handleSizeChange(val){
	   this.pageSize=val
},
handleCurrentChange(val){
this.pageNum=val;
},
   },
      created() {
              this.tableLoad = true
              dataList(this.form).then((response)=>{
              this.DataList=response.list
              this.total = response.total
              this.tableLoad = false
})    
                PersonList().then((response)=>{
          	this.PersonDataList=response
          })
},
}
</script>

<style lang="scss">
#litigation-apply{
	.addTitle{
		padding: 10px;
		background-color: #e3e2e2;
	}
	 
}
</style>


