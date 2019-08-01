<template>
  <div id="data-batch-manage"
       v-loading="loading"
       element-loading-text="拼命加载中"
       v-loading.fullscreen.lock="fullscreenLoading"

       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.7)"
       class="page-wraper-sub">
    <el-form ref="form" :model="form" :inline="true" class="query-wrap">
      <el-form-item>
        <el-select v-model="form.areas" placeholder="请选择催收区域"  filterable multiple collapse-tags clearable>
          <el-option
            v-for="item in areaList"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.batchStatuss" placeholder="请选择批次状态" filterable multiple collapse-tags clearable>
          <el-option
            v-for="item in form.CasestatusList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.batchNos" placeholder="请选择批次编号" remote filterable multiple collapse-tags clearable :remote-method="showBatchList">
          <el-option
            v-for="item in batchList"
            :key="item.id"
            :label="item.batchNo"
            :value="item.batchNo">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.clients" placeholder="请选择委托方" filterable  @change="clientCurrent"
                   multiple clearable collapse-tags>
          <el-option
            v-for="item in clientList"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.caseTypes" placeholder="请选择案件类型" collapse-tags multiple filterable clearable>
          <el-option
            v-for="item in caseTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="form.time"
          type="daterange"
          value-format="yyyy-MM-dd"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="委案日期开始"
          end-placeholder="委案日期结束"
        >
        </el-date-picker>
      </el-form-item>
      <el-row>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click=resetForm>重置</el-button>
          <el-button type="primary" @click="addBatch">新增批次</el-button>
          <el-button type="primary" :disabled=returnTrue @click="returnCaseList" v-has="'批次退案'">批量退案</el-button>
          <el-button type="primary" @click="MorebackCase " :disabled=backTrue>批量恢复</el-button>
          <el-button type="primary" @click="open7" v-has="'批次删除'">批量删除</el-button>
          <el-button type="primary" @click="changeRadio" v-has="'导出查询结果'">导出查询结果</el-button>
          <el-button type="primary" @click='showSelectBatch' v-has="'导出所选批次'">导出所选批次</el-button>
          <el-button type="primary" @click="showSelectCollect1" v-has="'批量导出批次催记'">批量导出批次催记</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-table highlight-current-row v-loading="tableLoad"
              class="table-wrap"
              height="1"
              :data="DataList"
              border
              stripe
              style="width: 100%;"
              @selection-change="handleSelectionChange"
              @sort-change="handleSort"
    >
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        prop="areaMsg"
        align="center"
        sortable="custom"
        width="130"
        :sort-orders="['ascending','descending']"
        label="催收区域"
      >
      </el-table-column>
      <el-table-column
        prop="batchNo"
        align="center"
        sortable="custom"
        min-width="140"
        :sort-orders="['ascending','descending']"
        label="批次号"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dataCsae(scope.row.batchNo)">{{scope.row.batchNo}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="clientMsg"
        align="center"
        sortable="custom"
        min-width="120"
        :sort-orders="['ascending','descending']"
        label="委托方"
      >
      </el-table-column>
      <el-table-column
        prop="statusMsg"
        align="center"
        sortable="custom"
        min-width="120"
        :sort-orders="['ascending','descending']"
        label="批次状态"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="caseTime"
        align="center"
        label="委案日期"
        width="120"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="userCount"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="户数"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="总金额"
        min-width="120"
        align="center"
        sortable="custom"
        prop="totalAmtMsg"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.totalAmtMsg}}
        </template>
      </el-table-column>
      <el-table-column
        prop="caseTypeMsg"
        label="案件类型"
        sortable="custom"
        align="center"
        min-width="120"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="returnTime"
        label="预计退案时间"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        width="140"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="realReturnTime"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        width="140"
        align="center"
        label="实际退案时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="createTime"
        width="140"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        align="center"
        label="录入时间"
        show-overflow-tooltip>
      </el-table-column>
      <!--<el-table-column
        prop="batchRemark"
        min-width="250"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        align="center"
        label="批次备注"
        show-overflow-tooltip>
      </el-table-column>-->
      <el-table-column
        prop="creatUser"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="录入人员"
        align="center"
        width="140"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="remark"
        min-width="180"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="备注"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="250">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="scope.row.batchStatus!=2 && scope.row.batchStatus!=0"
                     @click="open2(scope.row.id)" v-has="'退案'">退案
          </el-button>
          <el-button type="text" size="small" v-if="scope.row.batchStatus!=1 && scope.row.batchStatus!=0"
                     @click="backCaseList(scope.row.id)" v-has="'退案'">恢复
          </el-button>
          <el-button type="text" size="small" @click="editMessage2(scope.row)" v-has="'编辑'">编辑</el-button>
          <el-button type="text" size="small" @click="deleteMessage(scope.row.id,scope.row.batchNo)" v-has="'删除'">删除</el-button>
          <el-button type="text" size="small" v-has="'批量导出批次催记'" @click="showSelectCollect2(scope.row)">导出催记</el-button>
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
      title="导出查询结果"
      :visible.sync="dialogVisible1"
      width="30%"
      center
      :close-on-click-modal="false"
    >
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-radio v-model="radio" label="1">按查询条件全部导出</el-radio>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-radio v-model="radio" label="2">按查询条件导出当前分页</el-radio>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="changeRadio">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="修改批次"
      :visible.sync="dialogVisible2"
      width="55%"
      :close-on-click-modal="false"
    >
      <el-form :inline="true" :model="messageForm" ref="messageForm" label-width="100px" class="demo-dynamic">
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="批  次  号"
                            prop="batchNo"
                            :rules="{ required: true, message: '批次号不能为空', trigger: 'blur'}">
                <el-input v-model="messageForm.batchNo" :disabled=true placeholder="请输入批次号" maxlength="80"
                          clearable></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="催收区域">
                <el-select v-model="messageForm.area" placeholder="请选择催收区域" clearable>
                  <el-option
                    v-for="item in areaList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>

            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="委  托  方"
                            prop="client"
                            :rules="{required: true, message: '委托方不能为空', trigger: 'blur'}">
                <el-select v-model="messageForm.client" @change="changeBotno2" placeholder="请选择委托方" clearable>
                  <el-option
                    v-for="item in clientList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="案件类型">
                <el-select v-model="messageForm.caseType" placeholder="请选择案件类型" clearable>
                  <el-option
                    v-for="item in caseTypeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="15">
            <div class="grid-content bg-purple">
              <el-form-item label="委案日期"
                            prop="caseTime"
                            :rules="{required: true, message: '请选择日期', trigger: 'change'}">
                <div class="block">
                  <el-date-picker
                    @change="changeBotno3"
                    v-model="messageForm.caseTime"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
            </div>
          </el-col>

        </el-row>
        <el-row :gutter="24">
          <el-col :span="15">
            <div class="grid-content bg-purple">
              <el-form-item label="预计退案日期">
                <div class="block">
                  <el-date-picker
                    v-model="messageForm.returnTime"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="批次备注">
              <el-input type="textarea" v-model="messageForm.remark" style="width: 200%;" maxlength="500"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="submitmsgForm('messageForm')">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="批次案件"
      class="dialog-wrap"
      :visible.sync="detailVisibleCase"
      :close-on-click-modal="false"
      width="90%"
    >
      <el-table highlight-current-row class="table-wrap"
                ref="CasetableData"
                :data="CasetableData"
                border
                stripe
                @sort-change="handleSort1"
                @row-dblclick="showDetail"
      >
        <el-table-column
          sortable="custom"
          :sort-orders="['ascending','descending']"
          label="ID"
          align="center"
          prop="id"
        >

        </el-table-column>
        <el-table-column
          prop="collectArea"
          align="center"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          min-width="140"
          label="催收区域"
        >
        </el-table-column>
        <el-table-column
          prop="collectStatusMsg"
          align="center"
          sortable="custom"
          min-width="140"
          :sort-orders="['ascending','descending']"
          label="催收状态"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="batchNo"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          label="批次号"
          min-width="120"
          align="center"
          show-overflow-tooltip>

        </el-table-column>
        <el-table-column
          prop="seqNo"
          width="140"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          align="center"
          label="个案序列号"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editCase(scope.row.id, scope.row.name,scope.row.seqNo)">
              {{scope.row.seqNo}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="caseDate"
          align="center"
          label="委案日期"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          width="140"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="expectTime"
          width="140"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          align="center"
          label="预计退案日期"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          label="姓名"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="identNo"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          min-width="200"
          align="center"
          label="证件号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="area"
          min-width="140"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          align="center"
          label="地区"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="cardNo"
          min-width="200"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          align="center"
          label="卡号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="moneyMsg"
          sortable="custom"
          min-width="140"
          :sort-orders="['ascending','descending']"
          label="委案金额"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="balanceMsg"
          sortable="custom"
          min-width="140"
          :sort-orders="['ascending','descending']"
          align="center"
          label="委案余额"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="collectDate"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          width="140"
          align="center"
          label="上次通电时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="newCase"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          label="最新催记"
          min-width="140"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="odv"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          label="催收员"
          min-width="140"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="collectTimes"
          label="跟进次数"
          min-width="120"
          align="center"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="distributeTime"
          width="140"
          align="center"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          label="案件分配时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="proRepayAmtMsg"
          label="承诺还款金额"
          width="160"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="bankAmtMsg"
          width="160"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          align="center"
          label="待银行查账金额"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="enRepayAmtMsg"
          width="140"
          align="center"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          label="已还金额"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="accountAge"
          min-width="120"
          label="逾期账龄"
          sortable="custom"
          :sort-orders="['ascending','descending']"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          min-width="140"
          prop="distributeHistory"
          sortable="custom"
          align="center"
          :sort-orders="['ascending','descending']"
          label="分配历史"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="summary"
          min-width="180"
          sortable="custom"
          align="center"
          :sort-orders="['ascending','descending']"
          label="催收小结"
          show-overflow-tooltip>
        </el-table-column>
        <!--<el-table-column
          label="操作"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editMessage(scope.row)" >编辑</el-button>
            <el-button type="text" size="small" @click="deleteMessage(scope.row.id,scope.row.batchNo)" >删除
            </el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <el-pagination
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :current-page="currentPage5"
        :page-sizes="[100, 500, 2000, 10000, 1000000]"
        :page-size="pages1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total1">
      </el-pagination>

      <span slot="footer" class="footer">
    <el-button @click="detailVisibleCase = false">取 消</el-button>
  </span>
    </el-dialog>

    <el-dialog
      title="导出选择"
      :visible.sync="showExportBatchConfVisible"
      width="60%"
      center
      :close-on-click-modal="false"
    >
      <div style="margin-bottom: 10px;"><span @click="selectAllExport" style="cursor: pointer;">全选</span><span @click="selectUnAllExport" style="cursor: pointer;margin-left:10px;">反选</span></div>
      <el-row class="pad" ref="boxWrapper">

        <el-checkbox v-model="exporttBatchConf.batchNo" label="2">批次号</el-checkbox>
        <el-checkbox v-model="exporttBatchConf.batchStatus" label="3">批次状态</el-checkbox>
        <el-checkbox v-model="exporttBatchConf.client" label="3">委托方</el-checkbox>
        <el-checkbox v-model="exporttBatchConf.caseType" label="3">案件类型</el-checkbox>
        <el-checkbox v-model="exporttBatchConf.caseTime" label="1">委托日期</el-checkbox>
        <el-checkbox v-model="exporttBatchConf.returnTime" label="1">预计退案时间</el-checkbox>
        <el-checkbox v-model="exporttBatchConf.realReturnTime" label="4">实际退案时间</el-checkbox>
        <el-checkbox v-model="exporttBatchConf.uploadTime" label="5">上传时间</el-checkbox>
        <el-checkbox v-model="exporttBatchConf.userCount" label="2">户数</el-checkbox>
        <el-checkbox v-model="exporttBatchConf.totalAmt" label="4">总金额</el-checkbox>
        <el-checkbox v-model="exporttBatchConf.createTime" label="5">录入时间</el-checkbox>
        <el-checkbox v-model="exporttBatchConf.creatUser" label="5">录入人员</el-checkbox>
        <el-checkbox v-model="exporttBatchConf.remark" label="5">备注</el-checkbox>
      </el-row>
      <span slot="footer" class="footer">
        <el-button @click="showExportBatchConfVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportExcel">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="导出选择"
      :visible.sync="showExportCollectConfVisible"
      width="60%"
      center
      :close-on-click-modal="false"
    >
      <div style="margin-bottom: 10px;"><span @click="selectAllCollectExport" style="cursor: pointer;">全选</span><span @click="selectUnAllCollectExport" style="cursor: pointer;margin-left:10px;">反选</span></div>
      <el-row class="pad" ref="boxWrapper">

        <el-checkbox v-model="exportCollectConf.name" label="2">姓名</el-checkbox>
        <el-checkbox v-model="exportCollectConf.account" label="3">账号</el-checkbox>
        <el-checkbox v-model="exportCollectConf.cardNo" label="3">卡号</el-checkbox>
        <el-checkbox v-model="exportCollectConf.identNo" label="3">证件号</el-checkbox>
        <el-checkbox v-model="exportCollectConf.archiveNo" label="1">档案号</el-checkbox>
        <el-checkbox v-model="exportCollectConf.seqNo" label="1">个案序列号</el-checkbox>
        <el-checkbox v-model="exportCollectConf.accountAge" label="4">逾期账龄</el-checkbox>
        <el-checkbox v-model="exportCollectConf.money" label="5">委案金额</el-checkbox>
        <el-checkbox v-model="exportCollectConf.residualPrinciple" label="2">欠款余额</el-checkbox>
        <el-checkbox v-model="exportCollectConf.targetName" label="4">对象姓名</el-checkbox>
        <el-checkbox v-model="exportCollectConf.relation" label="5">关系</el-checkbox>
        <el-checkbox v-model="exportCollectConf.collectPhoneAddr" label="5">电话/地址</el-checkbox>
        <el-checkbox v-model="exportCollectConf.contractType" label="5">联络类型</el-checkbox>
        <el-checkbox v-model="exportCollectConf.result" label="5">催收内容</el-checkbox>
        <el-checkbox v-model="exportCollectConf.odv" label="5">催收人员</el-checkbox>
        <el-checkbox v-model="exportCollectConf.method" label="5">谈判方式</el-checkbox>
        <el-checkbox v-model="exportCollectConf.collectStatus" label="5">催收状态</el-checkbox>
        <el-checkbox v-model="exportCollectConf.proRepayDate" label="5">承诺日期</el-checkbox>
        <el-checkbox v-model="exportCollectConf.proRepayAmt" label="5">承诺金额</el-checkbox>
        <el-checkbox v-model="exportCollectConf.reduceAmt" label="5">减免金额</el-checkbox>
        <el-checkbox v-model="exportCollectConf.reduceStatus" label="5">减免状态</el-checkbox>
        <el-checkbox v-model="exportCollectConf.collectInfo" label="5">催收小结</el-checkbox>
        <el-checkbox v-model="exportCollectConf.overDays" label="5">逾期天数</el-checkbox>
        <el-checkbox v-model="exportCollectConf.batchNo" label="5">批次号</el-checkbox>
        <el-checkbox v-model="exportCollectConf.caseDate" label="5">委案日期</el-checkbox>
        <el-checkbox v-model="exportCollectConf.expectTime" label="5">预计退案日期</el-checkbox>
        <el-checkbox v-model="exportCollectConf.newMoney" label="5">最新欠款</el-checkbox>
        <el-checkbox v-model="exportCollectConf.province" label="5">省份</el-checkbox>
        <el-checkbox v-model="exportCollectConf.city" label="5">城市</el-checkbox>
        <el-checkbox v-model="exportCollectConf.county" label="5">区县</el-checkbox>
        <el-checkbox v-model="exportCollectConf.currencyType" label="5">币种</el-checkbox>
        <el-checkbox v-model="exportCollectConf.applyOrderNo" label="5">申请单号</el-checkbox>
        <el-checkbox v-model="exportCollectConf.overdueMoney" label="5">逾期金额</el-checkbox>
        <el-checkbox v-model="exportCollectConf.remark" label="5">自定义信息</el-checkbox>
        <el-checkbox v-model="exportCollectConf.odv2" label="5">催收员</el-checkbox>
        <el-checkbox v-model="exportCollectConf.collectStatus2" label="5">催收状态</el-checkbox>
        <el-checkbox v-model="exportCollectConf.nextFollDate" label="5">下次跟进日期</el-checkbox>
        <el-checkbox v-model="exportCollectConf.minimumPayment" label="5">最低还款额</el-checkbox>
        <el-checkbox v-model="exportCollectConf.creditLine" label="5">信用额度</el-checkbox>
        <el-checkbox v-model="exportCollectConf.module" label="5">催收模板</el-checkbox>
      </el-row>
      <span slot="footer" class="footer">
        <el-button @click="showExportCollectConfVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportCollectExcel">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      class="dialog-wrap"
      title="新增批次"
      :visible.sync="dialogVisible"
      width="55%"
      :close-on-click-modal="false"
    >
      <el-form :inline="true" :model="formInline" ref="formInline" label-width="100px" class="demo-dynamic">
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="批  次  号"
                            prop="batchNo"
                            :rules="{ required: true, message: '批次号不能为空', trigger: 'blur'}">
                <el-input v-model="formInline.batchNo" :disabled=true placeholder="请输入批次号" maxlength="80"
                          clearable></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="催收区域">
                <el-select v-model="formInline.areaListId" placeholder="请选择催收区域" clearable>
                  <el-option
                    v-for="item in areaList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="委  托  方"
                            prop="client"
                            :rules="{required: true, message: '委托方不能为空', trigger: 'blur'}">
                <el-select v-model="formInline.client" placeholder="请选择委托方" clearable @change="changeBotno">
                  <el-option
                    v-for="item in clientList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="案件类型">
                <el-select v-model="formInline.caseType" placeholder="请选择案件类型" clearable>
                  <el-option
                    v-for="item in caseTypeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="委案日期"
                            prop="caseTime"
                            :rules="{required: true, message: '请选择日期', trigger: 'change'}">
                <div class="block">
                  <el-date-picker
                    @change="changeBotno"
                    v-model="formInline.caseTime"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">

            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="15">
            <div class="grid-content bg-purple">
              <el-form-item label="预计退案日期">
                <div class="block">
                  <el-date-picker
                    v-model="formInline.returnTime"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="批次备注">
              <el-input type="textarea" v-model="formInline.remark" style="width: 200%;height: 180px;"
                        maxlength="500"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="footer">
    <el-button @click="backForm">取 消</el-button>
    <el-button type="primary" @click="submitForm('formInline')">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      class="dialog-wrap"
      title="修改批次"
      :visible.sync="dialogVisible3"
      width="55%"
      :close-on-click-modal="false"
    >
      <el-form :inline="true" :model="messageForm" ref="messageForm" label-width="100px" class="demo-dynamic">
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="批  次  号"
                            prop="batchNo"
                            :rules="{ required: true, message: '批次号不能为空', trigger: 'blur'}">
                <el-input v-model="messageForm.batchNo" :disabled=true placeholder="请输入批次号" maxlength="80"
                          clearable></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="催收区域">
                <el-select v-model="messageForm.area" placeholder="请选择催收区域" clearable>
                  <el-option
                    v-for="item in areaList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>

            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="委  托  方"
                            prop="client"
                            :rules="{required: true, message: '委托方不能为空', trigger: 'blur'}">
                <el-select v-model="messageForm.client" @change="changeBotno2" placeholder="请选择委托方" clearable>
                  <el-option
                    v-for="item in clientList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="案件类型">
                <el-select v-model="messageForm.caseType" placeholder="请选择案件类型" clearable>
                  <el-option
                    v-for="item in caseTypeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="15">
            <div class="grid-content bg-purple">
              <el-form-item label="委案日期"
                            prop="caseTime"
                            :rules="{required: true, message: '请选择日期', trigger: 'change'}">
                <div class="block">
                  <el-date-picker
                    @change="changeBotno3"
                    v-model="messageForm.caseTime"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
            </div>
          </el-col>

        </el-row>
        <el-row :gutter="24">
          <el-col :span="15">
            <div class="grid-content bg-purple">
              <el-form-item label="预计退案日期">
                <div class="block">
                  <el-date-picker
                    v-model="messageForm.returnTime"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="批次备注">
              <el-input type="textarea" v-model="messageForm.remark" style="width: 200%;" maxlength="500"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="footer">
    <el-button @click="backForm">取 消</el-button>
    <el-button type="primary" @click="submitmsgForm('messageForm')">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  const CaseDetail = () => import('@/views/data-manage/detail');

  import {
    dataList,
    clientCurrent,
    CasedataList,
    remoweData,
    addData,
    saveSelectFilter,
    selectByModule,
    selectDataCollectExportByBatch,
    selectDataBatchExport,
    pageDataBatchExport,
    totalDataBatchExport,
    clientList,
    batchList,
    batchList2,
    caseTypeList,
    areaList,
    returnCase,
    update,
    backCase
  } from '@/common/js/data-batch-manage.js'

  export default {
    components: {
      CaseDetail
    },
    name: 'dataBatchManage',
    data() {
      return {
        CasetableData: [],
        detailVisibleCase: false,
        radio: "1",
        fullscreenLoading: false,
        tableLoad: false,
        batchList: [],
        batchList2:[],
        dialogVisible: false,
        dialogVisible3: false,
        showExportBatchConfVisible: false,
        exporttBatchConf: {},
        exportCollectConf: {},
        exportType: 0,
        exportCollectType: 0,
        showExportCollectConfVisible: false,
        header: {Authorization: localStorage.token},
        loading: false,
        userCount: '',
        totalAmt: '',
        messageForm: {},
        deleteList: [],
        selectDataBatchExportList: [],
        selectDataCollectExportByBatchList: [],
        DataList: [],
        pageSize: 100,
        pageSize1: 100,
        orderBy: "id",
        sort: "desc",
        orderBy1: "id",
        sort1: "desc",
        pageNum: 1,
        areaList: [],
        caseTypeList: [],
        clientList: [],
        formInline: {
          batchNo: '',
          targetRate: '',
          returnTime: '',
          caseTime: ''},
        dialogVisible1: false,
        dialogVisible2: false,
        tableData3: [],
        currentPage4: 1,
        pages: 1,
        total: 0,
        currentPage5: 1,
        pages1: 1,
        total1: 0,
        MoreBackCaseList: [],
        form: {
          time: [],
          batchStatuss:[4],
          batchNos: [],
          clients: [],
          CasestatusList: [{id: 4, name: "正常"}, {id: 0, name: "未导入"}, {id: 1, name: "未退案"}, {id: 2, name: "已退案"}]
        },
        returnTrue: false,
        backTrue: false,
        batchNos: []
      }
    },
    methods: {
      clientCurrent(){
        debugger
        if (this.form.clients==null || this.form.clients.length==0){
          this.$set(this.form, 'batchNos', [])
          this.$set(this, 'batchList', this.batchList2)
        }else {
          clientCurrent(this.form.clients).then((response) => {
            if (response==null){
              this.$set(this, 'batchList', [])
            }else{
              this.batchList = response;
            }
          })
        }
      },
      showBatchList(query){

        batchList2({"batchNo":query}).then((response) => {
          this.batchList = response;
        })
      },
      changeBotno2() {
        for (var i = 0; i <= this.clientList.length; i++) {
          if (this.messageForm.client === this.clientList[i].id) {
            this.clientValue = this.clientList[i].name
            this.$set(this.messageForm, 'batchNo', this.clientValue + '-' +this.formInline.caseTime.split("-").join(""))
            return
          }
        }
      },
      changeBotno() {
        for (var i = 0; i <= this.clientList.length; i++) {
          if (this.formInline.client === this.clientList[i].id) {
            this.clientValue = this.clientList[i].name
            this.$set(this.formInline, 'batchNo', this.clientValue + '-' + this.formInline.caseTime.split("-").join(""))
            return
          }
        }
      },
      changeBotno3() {
        for (var i = 0; i <= this.clientList.length; i++) {
          if (this.messageForm.client === this.clientList[i].id) {
            this.clientValue = this.clientList[i].name
            this.$set(this.messageForm, 'batchNo', this.clientValue + '-' + this.formInline.caseTime.split("-").join(""))
            return
          }
        }
      },
      changeBotno1() {
        for (var i = 0; i <= this.clientList.length; i++) {
          if (this.formInline.client === this.clientList[i].id) {
            this.clientValue = this.clientList[i].name
            this.$set(this.formInline, 'batchNo', this.clientValue + '-' + this.formInline.caseTime.split("-").join(""))
            return
          }
        }
      },
      backForm() {
        this.dialogVisible = false;
        this.formInline = {
          batchNo: '',
          targetRate: '',
          returnTime: '',
          caseTime: ''
        }
      },
      showDetail(row) {
        this.detailVisibleCase = false
        let id = row.id
        let name = row.name
        let seqNo = row.seqNo
        this.$router.push({
          path: 'case-detail',
          query: {
            id,
            name,
            seqNo
          }
        })
      },
      editCase(id, name, seqNo) {
        this.detailVisibleCase = false
        this.$router.push({
          path: 'case-detail',
          query: {
            id,
            name,
            seqNo
          }
        })

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addData(this.formInline).then((response) => {
              this.dialogVisible = false
              this.search()
              batchList().then((response) => {
                this.batchList = response;
              })
              this.$message({
                type: 'success',
                message: '保存成功!'
              });
              this.formInline = {
                batchNo: '',
                targetRate: '',
                returnTime: '',
                caseTime: ''
              }
            })
          } else {
            return false;
          }
        });
      },
      submitmsgForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            update(this.messageForm).then((response) => {
              this.dialogVisible3 = false
              batchList().then((response) => {
                this.batchList = response;
              })
              this.search()
              this.$message({
                type: 'success',
                message: '保存成功!'
              });
            })
          } else {
            return false;
          }
        });
      },
      editMessage(row) {

        this.dialogVisible2 = true
        this.messageForm = row

        if (this.messageForm.returnTime!=null && this.messageForm.returnTime=="NULL"){

          this.messageForm.returnTime = '';
        }

        if (this.messageForm.client) {
          this.messageForm.client = parseInt(row.client)
        }
        if (this.messageForm.caseType) {
          this.messageForm.caseType = parseInt(row.caseType)
        }
        if (this.messageForm.area) {
          this.messageForm.area = parseInt(row.area)
        }

      },
      deleteMessage(id,batchNo) {
        let arry = [{id: id,batchNo:batchNo}]
        let _self = this
        _self.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          remoweData(arry).then((response) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            _self.search()
          })
        }).catch(() => {
        });
      },
      dataCsae(batchNo) {
        let _self = this
        _self.detailVisibleCase = true
        _self.batchNos.push(batchNo)
        CasedataList(_self.batchNos).then((response) => {
          _self.CasetableData = response.pageInfo.list
          this.total1 = response.pageInfo.total
        })
      },
      saveExportCollectConf() {
        let queryObj = {module: "data-batch-manage-exportCollect", menu: this.exportCollectConf}
        saveSelectFilter(queryObj).then(data => {
        });
      },
      queryExportCollectConfList() {
        this.$set(this, 'loading2', true)
        this.$set(this, 'fullscreenLoading', true)
        let queryObj = {module: "data-batch-manage-exportCollect", menu: this.exportCollectConf}
        selectByModule(queryObj).then(data => {
          if (data) {
            this.$set(this, 'exportCollectConf', JSON.parse(data.menu))
            //this.exportCollectConf = JSON.parse(data.menu);
          }
          this.$set(this, 'loading2', false)
          this.$set(this, 'fullscreenLoading', false)
          this.showExportCollectConfVisible = true;
        });
      },
      saveExportBatchConf() {
        let queryObj = {module: "data-batch-manage-exportBatch", menu: this.exporttBatchConf}
        saveSelectFilter(queryObj).then(data => {
        });
      },
      queryExportBatchConfList() {
        this.$set(this, 'loading2', true)
        this.$set(this, 'fullscreenLoading', true)
        let queryObj = {module: "data-batch-manage-exportBatch", menu: this.exporttBatchConf}
        selectByModule(queryObj).then(data => {
          if (data) {
            this.$set(this, 'exporttBatchConf', JSON.parse(data.menu))
            //this.exporttBatchConf = JSON.parse(data.menu);
          }
          this.$set(this, 'loading2', false)
          this.$set(this, 'fullscreenLoading', false)
          this.showExportBatchConfVisible = true;
        });
      },
      selectAllExport() {
        this._selectAllInit('exporttBatchConf');
        for (var p in this.exporttBatchConf) {//遍历json对象的每个key/value对,p为key
          this.exporttBatchConf[p] = true;
        }
      },
      selectUnAllExport(){
        this._selectAllInit('exporttBatchConf');
        for (var p in this.exporttBatchConf) {//遍历json对象的每个key/value对,p为key
          this.exporttBatchConf[p] = false;
        }
      },
      exportExcel() {
        let successNum = 0;
        for (var p in this.exporttBatchConf) {//遍历json对象的每个key/value对,p为key
          if (this.exporttBatchConf[p]) {
            successNum = successNum + 1;
          }
        }
        if (successNum == 0) {
          this.$message({
            type: 'error',
            message: '请先选择导出项!'
          });
          this.fullscreenLoading = false
          this.loading = false
          return;
        }
        this.showExportBatchConfVisible = false;
        if (this.exportType == 1) {
          this.selectDataExport();
        } else if (this.exportType == 2) {
          this.totalDataExport()
        } else if (this.exportType == 3) {
          this.pageDataExport()
        }
        this.saveExportBatchConf();

      },
      changeRadio() {
        // if (this.radio == 1) {
        //   this.exportType = 2;
        // } else {
        //   this.exportType = 3;
        // }
        this.exportType = 2;
        this.queryExportBatchConfList();

        //this.dialogVisible1 = false;
      },
      exportCollect() {
        let successNum = 0;
        for (var p in this.exportCollectConf) {//遍历json对象的每个key/value对,p为key
          if (this.exportCollectConf[p]) {
            successNum = successNum + 1;
          }
        }
        if (successNum == 0) {
          this.$message({
            type: 'error',
            message: '请先选择导出项!'
          });
          this.fullscreenLoading = false
          this.loading = false
          return;
        }
        this.loading = true
        this.fullscreenLoading = true

        selectDataCollectExportByBatch(this.batchNos, this.exportCollectConf).then((response) => {
          this.loading = false;
          this.fullscreenLoading = false
          this.$message({
            type: 'success',
            message: '导出成功!'
          });
        })
        this.saveExportCollectConf();
        this.showExportCollectConfVisible = false;
      },
      showSelectBatch() {
        if (this.selectDataBatchExportList.length > 0) {
          this.exportType = 1;
          this.showExportBatchConfVisible = true;
        } else {
          this.loading = false;
          this.fullscreenLoading = false
          this.$message({
            type: 'info',
            message: '请选择需要导出的数据!'
          });
        }
      },
      showSelectCollect1() {
        this.exportCollectType = 1;
        if (this.batchNos.length > 0) {
          this.queryExportCollectConfList();
        } else {
          this.loading = false;
          this.fullscreenLoading = false
          this.$message({
            type: 'info',
            message: '请选择需要导出的数据!'
          });
        }
      },
      showSelectCollect2(row) {
        this.batchNos = [row.batchNo];
        this.exportCollectType = 2;
        this.showExportCollectConfVisible = true;
      },
      selectAllCollectExport() {
        this._selectAllInit('exportCollectConf');
        for (var p in this.exportCollectConf) {//遍历json对象的每个key/value对,p为key
          this.exportCollectConf[p] = true;
        }
      },
      selectUnAllCollectExport(){
        this._selectAllInit('exportCollectConf');
        for (var p in this.exportCollectConf) {//遍历json对象的每个key/value对,p为key
          this.exportCollectConf[p] = false;
        }
      },
      exportCollectExcel() {
        if (this.exportCollectType == 1) {
          this.exportCollect();
        } else if (this.exportCollectType == 2) {
          this.selectDataByBatch();
        }
      },
      selectDataByBatch() {
        this.loading = true
        this.fullscreenLoading = true
        let _self = this;
        if (this.batchNos.length > 0) {
          selectDataCollectExportByBatch(this.batchNos, this.exportCollectConf).then((response) => {
            this.loading = false;
            this.fullscreenLoading = false
            this.$message({
              type: 'success',
              message: '导出成功!'
            });
          })
        } else {
          this.loading = false;
          this.fullscreenLoading = false
          _self.$message({
            type: 'info',
            message: '请选择需要导出的数据!'
          });
        }
        this.showExportCollectConfVisible = false;
      },
      selectDataExport() {
        this.loading = true
        this.fullscreenLoading = true
        let _self = this;
        if (this.selectDataBatchExportList.length > 0) {
          selectDataBatchExport(this.selectDataBatchExportList, this.exporttBatchConf).then((response) => {
            this.loading = false;
            this.fullscreenLoading = false
            this.$message({
              type: 'success',
              message: '导出成功!'
            });
          })
        } else {
          this.loading = false;
          this.fullscreenLoading = false
          _self.$message({
            type: 'info',
            message: '请选择需要导出的数据!'
          });

        }
      },

      totalDataExport() {
        this.loading = true;
        this.fullscreenLoading = true

        let startTime = this.form.time[0]
        let endTime = this.form.time[1]
        totalDataBatchExport(this.exporttBatchConf, this.form.areas, this.form.batchNos, this.form.clients, this.form.batchStatuss, this.form.caseTypes, startTime, endTime, this.pageSize, this.pageNum).then((response) => {
          this.loading = false;
          this.fullscreenLoading = false
          this.$message({
            type: 'success',
            message: '导出成功!'
          });
        })
      },
      pageDataExport() {
        this.loading = true;
        this.fullscreenLoading = true
        let startTime = this.form.time[0]
        let endTime = this.form.time[1]
        pageDataBatchExport(this.exporttBatchConf, this.form.areas, this.form.batchNos, this.form.clients, this.form.batchStatuss, this.form.caseTypes, startTime, endTime, this.orderBy, this.sort, this.pageSize, this.pageNum).then((response) => {
          this.loading = false;
          this.fullscreenLoading = false
          this.$message({
            type: 'success',
            message: '导出成功!'
          });
        })
      },
      submitmsgForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.messageForm)
            update(this.messageForm).then((response) => {
              this.dialogVisible2 = false
              this.search()
              this.$message({
                type: 'success',
                message: '保存成功!'
              });
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      editMessage2(row) {

        this.dialogVisible2 = true
        this.messageForm = row
        if (this.messageForm.returnTime!=null && this.messageForm.returnTime=="NULL"){
          this.messageForm.returnTime = '';
        }
        this.messageForm.client = parseInt(row.client)
        if (this.messageForm.caseType) {

          this.messageForm.caseType = parseInt(row.caseType)
        } else {
          this.messageForm.caseType = ''
        }
        if (this.messageForm.area) {

          this.messageForm.area = parseInt(row.area)
        } else {
          this.messageForm.area = ''
        }


      },
      handleSort({column, prop, order}) {
        let startTime = this.form.time[0]
        let endTime = this.form.time[1]
        this.sort = order == null ? "desc" : order.replace("ending", "")
        this.orderBy = prop == null ? "id" : prop
        this.tableLoad = true
        dataList(this.form.areas, this.form.batchNos, this.form.clients, this.form.batchStatuss, this.form.caseTypes, startTime, endTime, this.orderBy, this.sort, this.pageSize, this.pageNum).then((response) => {

          this.DataList = response.pageInfo.list
          //this.pages = response.pageInfo.pages
          this.total = response.pageInfo.total
          this.tableLoad = false
        })
      },
      handleSort1({column, prop, order}) {
        this.sort1 = order == null ? "desc" : order.replace("ending", "")
        this.orderBy1 = prop == null ? "id" : prop
        CasedataList(this.batchNos, this.orderBy1, this.sort1,).then((response) => {

          this.CasetableData = response.pageInfo.list
          this.total1 = response.pageInfo.total

        })
      },
      search() {
        let startTime = this.form.time[0]
        let endTime = this.form.time[1]

        this.tableLoad = true
        dataList(this.form.areas, this.form.batchNos, this.form.clients, this.form.batchStatuss, this.form.caseTypes, startTime, endTime, this.orderBy, this.sort, this.pageSize, this.pageNum).then((response) => {

          this.DataList = response.pageInfo.list
          this.total = response.pageInfo.total
          this.totalAmt = this.formatMoney(response.totalAmt, 0, "￥");
          this.total = response.pageInfo.total
          this.tableLoad = false
        })
      },
      addBatch(){
        this.dialogVisible = true;
        this.$nextTick(()=>{
          if(this.$refs['formInline']){
            this.$refs['formInline'].resetFields()
          }
        });
      },
      returnCaseList() {
        let _self = this
        if (_self.deleteList.length > 0) {
          _self.$confirm('是否退案?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.loading = true;
            this.fullscreenLoading = true;
            returnCase(this.deleteList).then((response) => {
              _self.$message({
                type: 'success',
                message: '退案成功!'
              });
              _self.search()
              this.loading = false;
              this.fullscreenLoading = false;
            })
          }).catch(() => {

          });
        } else {
          _self.$message({
            type: 'info',
            message: '请选择需要退案的数据!'
          });
        }

      },
      /*deleteMessage(id) {
        let arry = [{id: id}]
        remoweData(arry).then((response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.search()
        })
      },*/
      returnMessage(id) {
        let arry = [{id: id}]
        returnCase(arry).then((response) => {
          this.$message({
            type: 'success',
            message: '退案成功!'
          });
          this.search()
        })
      },
      BackMessage(id) {
        let arry = [{id: id}]
        backCase(arry).then((response) => {
          this.$message({
            type: 'success',
            message: '恢复成功!'
          });
          this.search()
        })
      },
      handleSizeChange1(val) {
        this.pageSize1 = val
        CasedataList(this.batchNos, this.orderBy1, this.sort1,).then((response) => {
          _self.CasetableData = response.pageInfo.list
          this.total1 = response.pageInfo.total
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.search()
      },
      formatMoney(value, places, symbol, thousand, decimal) {
        places = !isNaN(places = Math.abs(places)) ? places : 2;
        symbol = symbol !== undefined ? symbol : "¥";
        thousand = thousand || ",";
        decimal = decimal || ".";
        var number = value,
          negative = number < 0 ? "-" : "",
          i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
          j = (j = i.length) > 3 ? j % 3 : 0;
        return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
      },
      uploadSuccess(res, file, fileList) {
        console.info(res)
        if (res.code == 100) {
          this.$message({
            type: 'success',
            message: res.msg
          });
          this.tableLoad = true
          dataList().then((response) => {
            this.DataList = response.pageInfo.list
            this.total = response.pageInfo.total
            this.totalAmt = this.formatMoney(response.totalAmt, 0, "￥");
            this.total = response.total
            this.tableLoad = false
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          });
        }
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.search()
      },
      handleCurrentChange1(val) {
        this.pageNum1 = val;
        CasedataList(this.batchNos, this.orderBy1, this.sort1,).then((response) => {
          this.CasetableData = response.pageInfo.list
          this.total1 = response.pageInfo.total
        })

      },
      handleSelectionChange(row) {
        let _self = this
        _self.deleteList = []
        _self.MoreBackCaseList = []
        _self.selectDataCollectExportByBatchList = [];
        _self.selectDataBatchExportList = [];
        _self.batchNos = [];
        row.forEach(function (currentValue, index, arr) {
          let Object = {"id": ""}
          let Project = {batchNo: ""}
          let BackCaseList = {status: ''}
          Project.batchNo = currentValue.batchNo
          Object.id = currentValue.id
          BackCaseList.status = currentValue.batchStatus

          Object.batchNo = currentValue.batchNo
          _self.deleteList.push(Object)
          _self.MoreBackCaseList.push(BackCaseList)
          _self.selectDataBatchExportList.push(currentValue.id)
          _self.selectDataCollectExportByBatchList.push(Project)
          console.info(currentValue.batchNo);
          _self.batchNos.push(currentValue.batchNo);
        })

        if (_self.MoreBackCaseList.length == 0) {
          this.backTrue = false
          this.returnTrue = false
        } else {
          let returnFlag = 0
          let backFlag = 0
          let unImport = 0
          for (var i = 0; i < _self.MoreBackCaseList.length; i++) {
            var temp = _self.MoreBackCaseList[i];
            if (temp.status == 2) {
              returnFlag = 2
            } else if (temp.status == 1) {
              backFlag = 1
            } else {
              unImport = 1
            }
          }
          if (unImport > 0) {
            this.backTrue = true
            this.returnTrue = true
          } else {
            if (returnFlag > 0 && backFlag > 0) {
              this.returnTrue = true
              this.backTrue = true
            } else if (backFlag > 0 && returnFlag == 0) {
              this.returnTrue = false
              this.backTrue = true
            } else if (backFlag == 0 && returnFlag > 0) {
              this.returnTrue = true
              this.backTrue = false
            } else {
              this.backTrue = true
              this.returnTrue = true
            }
          }
        }
      },
      resetForm() {
        this.form = {
          time: [],
          areas:[],
          batchNos: [],
          batchStatuss:[4],
          clients: [],
          caseTypes:[],
          CasestatusList: [{id: 0, name: "未导入"}, {id: 1, name: "未退案"}, {id: 2, name: "已退案"}]
        }
      },
      open7() {
        let _self = this
        if (_self.deleteList.length > 0) {
          _self.$confirm('是否删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            remoweData(this.deleteList).then((response) => {
              _self.$message({
                type: 'success',
                message: '删除成功!'
              });
              _self.search()
            })
          }).catch(() => {

          });
        } else {
          _self.$message({
            type: 'info',
            message: '请选择需要删除的数据!'
          });
        }
      },
      open8(id,batchNo) {
        debugger;
        this.$confirm(' 是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteMessage(id,batchNo)
        }).catch(() => {

        });
      },
      open2(id) {
        this.$confirm(' 是否退案?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.returnMessage(id)
        }).catch(() => {

        });
      },
      backCaseList(id) {
        this.$confirm(' 是否恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.BackMessage(id)
        }).catch(() => {

        });
      },
//    MorebackCaseList() {
//      this.$confirm(' 是否恢复?', '提示', {
//        confirmButtonText: '确定',
//        cancelButtonText: '取消',
//        type: 'warning'
//      }).then(() => {
//        this.backCase()
//      }).catch(() => {
//
//      });
//    },
      MorebackCase() {
        let _self = this
        for (var i = 0; i < _self.MoreBackCaseList.length; i++) {
          if (_self.MoreBackCaseList[i].status != 2) {
            _self.$message({
              type: 'error',
              message: '含有不可恢复数据!'
            });
            return
          }

        }
        if (_self.deleteList.length > 0) {
          this.$confirm('是否恢复案件?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.loading = true;
            this.fullscreenLoading = true;
            backCase(this.deleteList).then((response) => {
              this.$message({
                type: 'success',
                message: '恢复成功!'
              });
              this.search()
              this.loading = false;
              this.fullscreenLoading = false;
            })
          }).catch(() => {

          });
        } else {
          _self.$message({
            type: 'info',
            message: '请选择需要恢复的数据!'
          });
        }
      }
    },


    created() {
      this.tableLoad = true
      dataList(null, null, null, this.form.batchStatuss, null, null, null, this.orderBy, this.sort, this.pageSize, this.pageNum).then((response) => {
        this.DataList = response.pageInfo.list
        //this.pages = response.pageInfo.pages
        this.total = response.pageInfo.total
        this.totalAmt = this.formatMoney(response.totalAmt, 0, "￥");
        this.userCount = response.userCount;
        this.tableLoad = false
      })
      /*  clientList().then((response) => {
          this.form.clientList = this.$store.getters.caseType.委托方;
          this.clientList = this.$store.getters.caseType.委托方;
        })*/
      this.form.clientList = this.$store.getters.caseType.委托方;
      this.clientList = this.$store.getters.caseType.委托方;
      batchList().then((response) => {
        this.batchList = response;
        this.batchList2 = response;
      })
      /*caseTypeList().then((response) => {
        this.form.caseTypeList = response
        this.caseTypeList = response;
      })*/
      this.form.caseTypeList =  this.$store.getters.caseType.案件类型;
      this.caseTypeList =  this.$store.getters.caseType.案件类型;
      /*   areaList().then((response) => {
           this.form.areaList = response
           this.areaList = response
         })*/
      this.form.areaList = this.$store.getters.caseType.催收区域;
      this.areaList = this.$store.getters.caseType.催收区域;
    },
  }
</script>

<style lang="scss">
  #data-batch-manage {
    .pad {
      .el-checkbox {
        width: 24%;
        margin-right: 0px;
      }
    }

    .textColor {
      display: inline-block;
      color: #66b1ff;
    }

    .el-dialog__header {
      background-color: #f8f8f8;

    }

    .el-loading-spinner .el-loading-text {
      font-size: 18px;
    }
    .el-table__body tr.current-row > td{
      border-top: 1px solid #0080ff  !important;
      border-bottom: 1px solid #0080ff  !important;
    }
  }
</style>

