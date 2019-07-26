<template>
  <div id="data-case-imported"
       v-loading="loading2"
       v-loading.fullscreen.lock="fullscreenLoading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.7)"
       class="page-wraper-sub">
    <el-form ref="form" :model="form" :inline="true" class="query-wrap">
      <el-form-item>
        <el-select  v-model="form.areas" placeholder="请选择催收区域" collapse-tags multiple clearable>
          <el-option
            v-for="item in areaList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.batchNos" filterable collapse-tags multiple placeholder="请输入批次号" clearable @change="clientCurrent">
          <el-option
            v-for="item in batchList"
            :key="item.id"
            :label="item.batchNo"
            :value="item.batchNo">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.clients" filterable collapse-tags multiple placeholder="请选择委托方" clearable>
          <el-option
            v-for="item in clientList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.caseTypes" placeholder="请选择案件类型" filterable collapse-tags multiple clearable>
          <el-option
            v-for="item in caseTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="form.time"
          type="daterange"
          align="right"
          value-format="yyyy-MM-dd"
          unlink-panels
          range-separator="至"
          start-placeholder="委案日期开始"
          end-placeholder="委案日期结束"
        >
        </el-date-picker>
      </el-form-item>
      <el-row>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click=search>查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="resetForm()">重置</el-button>
          <el-button type="primary" @click="downLoadZip">导入模板下载</el-button>
          <el-button type="primary" @click="dialogVisible = true" v-has="'新增批次'">新增批次</el-button>
          <el-button type="primary" @click="open7" v-has="'删除批次'">删除批次</el-button>
          <el-upload
            class="upload-demo"
            :action="action+'/updateCase/import'"
            :headers="header"
            :show-file-list=false
            :on-success="uploadSuccess"
            :on-progress="onProgress"
            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          >
            <el-button size="small" style="padding: 7px 15px;margin-left:10px;" type="primary" v-has="'导入更新案件'">导入更新案件
            </el-button>
          </el-upload>
          <el-upload
            class="upload-demo"
            :action="action+'/comment/import'"
            :headers="header"
            :show-file-list=false
            :on-success="uploadSuccess"
            :on-progress="onProgress"
             accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          >
            <el-button size="small" style="padding: 7px 15px;margin-left:10px;" type="primary" v-has="'导入案件评语'">导入案件评语
            </el-button>
          </el-upload>
          <el-upload
            class="upload-demo"
            :action="action+'/interest/import'"
            :headers="header"
            :show-file-list=false
            :on-success="uploadSuccess"
            :on-progress="onProgress"
             accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          >
            <el-button size="small" style="padding: 7px 15px;margin-left:10px;" type="primary" v-has="'导入案件利息'">导入案件利息
            </el-button>
          </el-upload>
          <el-upload
            class="upload-demo"
            :action="action+'/tel/import'"
            :headers="header"
            :show-file-list=false
            :on-success="uploadSuccess"
            :on-progress="onProgress"
             accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          >
            <el-button size="small" style="padding: 7px 15px;margin-left:10px;" type="primary" v-has="'导入案件电话'">导入案件电话
            </el-button>
          </el-upload>
          <el-upload
            class="upload-demo"
            :action="action+'/address/import'"
            :headers="header"
            :show-file-list=false
            :on-success="uploadSuccess"
            :on-progress="onProgress"
             accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          >
            <el-button size="small" style="padding: 7px 15px;margin-left:10px;" type="primary" v-has="'导入案件地址'">导入案件地址
            </el-button>
          </el-upload>
          <el-upload
            class="upload-demo"
            :action="collectAction+'/dataCollect/import'"
            :headers="header"
            :show-file-list=false
            :on-success="uploadSuccess"
            :on-progress="onProgress"
             accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          >
            <el-button size="small" style="padding: 7px 15px;margin-left:10px;" type="primary" v-has="'导入案件记录'">导入催收记录
            </el-button>
          </el-upload>

        </el-form-item>
      </el-row>
    </el-form>
    <el-table highlight-current-row v-loading="tableLoad"
              class="table-wrap"
              height="1"
              ref="multipleTable"
              :data="DataList"
              border
              stripe
              style="width: 100%"
              @selection-change="handleSelectionChange"
              @sort-change="handleSort"
    >
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="批次号"
        align="center"
        prop="batchNo">
      </el-table-column>
      <el-table-column
        prop="clientMsg"
        sortable="custom"
        align="center"
        label="委托方"
        :sort-orders="['ascending','descending']"
        width="140">
      </el-table-column>
      <el-table-column
        prop="statusMsg"
        align="center"
        sortable="custom"
        label="批次状态"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        sortable="custom"
        :sort-orders="['ascending','descending']"
        prop="caseTime"
        label="委案日期"
        width="120"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        sortable="custom"
        :sort-orders="['ascending','descending']"
        prop="userCount"
        align="center"
        label="户数"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="总金额"
        align="center"
        width="120"
        prop="totalAmtMsg"
        show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.totalAmtMsg}}
        </template>
      </el-table-column>
      <el-table-column
        sortable="custom"
        align="center"
        :sort-orders="['ascending','descending']"
        prop="uploadTime"
        width="140"
        label="上传时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="批次备注"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <el-upload
            class="upload-demo"
            :action="action+'/newCase/import'"
            :headers="header"
            :show-file-list=false
            :on-success="uploadSuccess"
            :data="{batchNo:scope.row.batchNo}"
            :on-progress="onProgress"
             accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          >
            <el-button type="text" size="small" v-has="'导入'">导入</el-button>
          </el-upload>
          <el-button type="text" size="small" v-if="scope.row.batchStatus!=0" @click="showExport(scope.row)"
                     v-has="'下载'">下载
          </el-button>
          <el-button type="text" size="small" @click="editMessage(scope.row)" v-has="'编辑'">编辑</el-button>
          <el-button type="text" size="small" @click="deleteMessage(scope.row.id,scope.row.batchNo)" v-has="'删除批次'">删除
          </el-button>
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
                    placeholder="请选择日期"
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
                    placeholder="请选择日期"
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
                        maxlength="500" placeholder="请输入批次备注"></el-input>
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
              <el-input type="textarea" v-model="messageForm.remark" style="width: 200%;" maxlength="500" placeholder="请输入批次备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="footer">
    <el-button @click="backForm2">取 消</el-button>
    <el-button type="primary" @click="submitmsgForm('messageForm')">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      class="dialog-wrap"
      title="提示"
      :visible.sync="ImportdialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>{{ImportMsg}}</span>
      <span slot="footer" class="footer">
    <el-button type="primary" @click=ImportdialogVisibleWay>确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
      title="导出选择"
      :visible.sync="showExportConfVisible"
      width="60%"
      center
      :close-on-click-modal="false"
    >
      <div style="margin-bottom: 10px;"><span @click="selectAllExport" style="cursor: pointer;">全选</span><span @click="selectUnAllExport" style="cursor: pointer;margin-left: 10px;">反选</span></div>
      <el-row class="pad" ref="boxWrapper">
        <el-checkbox v-model="exportConf.id" label="2">ID</el-checkbox>
        <el-checkbox v-model="exportConf.seqNo" label="3">个案序列号</el-checkbox>
        <el-checkbox v-model="exportConf.name" label="3">姓名</el-checkbox>
        <el-checkbox v-model="exportConf.client" label="3">委托方</el-checkbox>
        <el-checkbox v-model="exportConf.batchNo" label="1">批次号</el-checkbox>
        <el-checkbox v-model="exportConf.status" label="1">案件状态</el-checkbox>
        <el-checkbox v-model="exportConf.identNo" label="4">证件号</el-checkbox>
        <el-checkbox v-model="exportConf.identType" label="5">证件类型</el-checkbox>
        <el-checkbox v-model="exportConf.gender" label="2">性别</el-checkbox>
        <el-checkbox v-model="exportConf.collectStatus" label="4">催收状态</el-checkbox>
        <el-checkbox v-model="exportConf.inteviewStatus" label="5">外访状态</el-checkbox>
        <el-checkbox v-model="exportConf.bank" label="5">开户行</el-checkbox>
        <el-checkbox v-model="exportConf.cardNo" label="5">卡号</el-checkbox>
        <el-checkbox v-model="exportConf.account" label="5">账号</el-checkbox>

        <el-checkbox v-model="exportConf.accountName" label="2">账户名称</el-checkbox>
        <el-checkbox v-model="exportConf.cardType" label="3">卡类</el-checkbox>
        <el-checkbox v-model="exportConf.archiveNo" label="3">档案号</el-checkbox>
        <el-checkbox v-model="exportConf.caseDate" label="3">委案日期</el-checkbox>
        <el-checkbox v-model="exportConf.money" label="1">委案金额</el-checkbox>
        <el-checkbox v-model="exportConf.proRepayAmt" label="1">PTP金额</el-checkbox>
        <el-checkbox v-model="exportConf.bankAmt" label="4">CP金额</el-checkbox>
        <el-checkbox v-model="exportConf.latestOverdueMoney" label="5">最新欠款（导入利息后更新）</el-checkbox>
        <el-checkbox v-model="exportConf.rmb" label="2">人民币</el-checkbox>
        <el-checkbox v-model="exportConf.hkd" label="4">港币</el-checkbox>
        <el-checkbox v-model="exportConf.foreignCurrency" label="5">外币</el-checkbox>
        <el-checkbox v-model="exportConf.odv" label="5">催收员</el-checkbox>
        <el-checkbox v-model="exportConf.collectionUser" label="5">催收员ID</el-checkbox>
        <el-checkbox v-model="exportConf.dept" label="5">催收员部门</el-checkbox>

        <el-checkbox v-model="exportConf.collectArea" label="2">催收区域</el-checkbox>
        <el-checkbox v-model="exportConf.collectInfo" label="3">催收小结</el-checkbox>
        <el-checkbox v-model="exportConf.lastCall" label="3">最后通电</el-checkbox>
        <el-checkbox v-model="exportConf.repayMoney" label="3">已还款</el-checkbox>
        <el-checkbox v-model="exportConf.distributeHistory" label="1">分配历史</el-checkbox>
        <el-checkbox v-model="exportConf.distributeDate" label="1">分配时间</el-checkbox>
        <el-checkbox v-model="exportConf.nextFollowDate" label="4">下次跟进日期</el-checkbox>
        <el-checkbox v-model="exportConf.collectTimes" label="5">跟进次数</el-checkbox>
        <el-checkbox v-model="exportConf.mVal" label="2">M值系数</el-checkbox>
        <el-checkbox v-model="exportConf.accountAge" label="4">逾期账龄</el-checkbox>
        <el-checkbox v-model="exportConf.email" label="5">邮箱</el-checkbox>
        <el-checkbox v-model="exportConf.qq" label="5">QQ</el-checkbox>
        <el-checkbox v-model="exportConf.tel" label="5">手机</el-checkbox>
        <el-checkbox v-model="exportConf.homeTelNumber" label="5">家庭号码</el-checkbox>

        <el-checkbox v-model="exportConf.unitTelNumber" label="2">单位号码</el-checkbox>
        <el-checkbox v-model="exportConf.unitName" label="3">单位名称</el-checkbox>
        <el-checkbox v-model="exportConf.unitAddress" label="3">单位地址</el-checkbox>
        <el-checkbox v-model="exportConf.unitZipCode" label="3">单位邮编</el-checkbox>
        <el-checkbox v-model="exportConf.homeAddress" label="3">家庭地址</el-checkbox>
        <el-checkbox v-model="exportConf.homeZipCode" label="1">家庭邮编</el-checkbox>
        <el-checkbox v-model="exportConf.statementAddress" label="1">对账单地址</el-checkbox>
        <el-checkbox v-model="exportConf.statementZipCode" label="4">对账单邮编</el-checkbox>
        <el-checkbox v-model="exportConf.censusRegisterAddress" label="5">户籍地址</el-checkbox>
        <el-checkbox v-model="exportConf.censusRegisterZipCode" label="2">户籍地邮编</el-checkbox>
        <el-checkbox v-model="exportConf.province" label="5">省份</el-checkbox>
        <el-checkbox v-model="exportConf.city" label="5">城市</el-checkbox>
        <el-checkbox v-model="exportConf.county" label="5">区县</el-checkbox>
        <el-checkbox v-model="exportConf.birthday" label="5">生日</el-checkbox>

        <el-checkbox v-model="exportConf.color" label="2">颜色</el-checkbox>
        <el-checkbox v-model="exportConf.age" label="2">年龄</el-checkbox>
        <el-checkbox v-model="exportConf.outstandingAmount" label="3">未出账金额</el-checkbox>
        <el-checkbox v-model="exportConf.currencyType" label="3">币种</el-checkbox>
        <el-checkbox v-model="exportConf.lastCollectionRecord" label="3">原催收记录</el-checkbox>
        <el-checkbox v-model="exportConf.principle" label="1">本金</el-checkbox>
        <el-checkbox v-model="exportConf.minimumPayment" label="1">最低还款额</el-checkbox>
        <el-checkbox v-model="exportConf.creditLine" label="4">信用额度</el-checkbox>
        <el-checkbox v-model="exportConf.defaultLevel" label="5">拖欠级别</el-checkbox>
        <el-checkbox v-model="exportConf.loanType" label="2">信贷分类</el-checkbox>
        <el-checkbox v-model="exportConf.collectionType" label="4">催收分类</el-checkbox>
        <el-checkbox v-model="exportConf.overdueInterest" label="5">逾期利息</el-checkbox>
        <el-checkbox v-model="exportConf.lateFee" label="5">滞纳金</el-checkbox>
        <el-checkbox v-model="exportConf.lastRepayDate" label="5">最后还款日</el-checkbox>
        <el-checkbox v-model="exportConf.lastConsumeDate" label="5">最后消费日</el-checkbox>

        <el-checkbox v-model="exportConf.lastWithdrawDate" label="2">最后提现日</el-checkbox>
        <el-checkbox v-model="exportConf.stopCardDate" label="3">停卡日</el-checkbox>
        <el-checkbox v-model="exportConf.activeCardDate" label="3">开卡日</el-checkbox>
        <el-checkbox v-model="exportConf.repayDeadline" label="3">还款期限</el-checkbox>
        <el-checkbox v-model="exportConf.contactsName0" label="1">联系人1姓名</el-checkbox>
        <el-checkbox v-model="exportConf.contactsIdentNo0" label="1">联系人1证件号</el-checkbox>
        <el-checkbox v-model="exportConf.contactsRelation0" label="4">联系人1关系</el-checkbox>
        <el-checkbox v-model="exportConf.contactsUnit0" label="5">联系人1单位</el-checkbox>
        <el-checkbox v-model="exportConf.contactsHomeTel0" label="2">联系人1家庭电话</el-checkbox>
        <el-checkbox v-model="exportConf.contactsUnitTel0" label="4">联系人1单位电话</el-checkbox>
        <el-checkbox v-model="exportConf.contactsMobile0" label="5">联系人1手机</el-checkbox>
        <el-checkbox v-model="exportConf.contactsAddress0" label="5">联系人1地址</el-checkbox>

        <el-checkbox v-model="exportConf.contactsName1" label="1">联系人2姓名</el-checkbox>
        <el-checkbox v-model="exportConf.contactsIdentNo1" label="1">联系人2证件号</el-checkbox>
        <el-checkbox v-model="exportConf.contactsRelation1" label="4">联系人2关系</el-checkbox>
        <el-checkbox v-model="exportConf.contactsUnit1" label="5">联系人2单位</el-checkbox>
        <el-checkbox v-model="exportConf.contactsHomeTel1" label="2">联系人2家庭电话</el-checkbox>
        <el-checkbox v-model="exportConf.contactsUnitTel1" label="4">联系人2单位电话</el-checkbox>
        <el-checkbox v-model="exportConf.contactsMobile1" label="5">联系人2手机</el-checkbox>
        <el-checkbox v-model="exportConf.contactsAddress1" label="5">联系人2地址</el-checkbox>

        <el-checkbox v-model="exportConf.contactsName2" label="1">联系人3姓名</el-checkbox>
        <el-checkbox v-model="exportConf.contactsIdentNo2" label="1">联系人3证件号</el-checkbox>
        <el-checkbox v-model="exportConf.contactsRelation2" label="4">联系人3关系</el-checkbox>
        <el-checkbox v-model="exportConf.contactsUnit2" label="5">联系人3单位</el-checkbox>
        <el-checkbox v-model="exportConf.contactsHomeTel2" label="2">联系人3家庭电话</el-checkbox>
        <el-checkbox v-model="exportConf.contactsUnitTel2" label="4">联系人3单位电话</el-checkbox>
        <el-checkbox v-model="exportConf.contactsMobile2" label="5">联系人3手机</el-checkbox>
        <el-checkbox v-model="exportConf.contactsAddress2" label="5">联系人3地址</el-checkbox>

        <el-checkbox v-model="exportConf.contactsName3" label="1">联系人4姓名</el-checkbox>
        <el-checkbox v-model="exportConf.contactsIdentNo3" label="1">联系人4证件号</el-checkbox>
        <el-checkbox v-model="exportConf.contactsRelation3" label="4">联系人4关系</el-checkbox>
        <el-checkbox v-model="exportConf.contactsUnit3" label="5">联系人4单位</el-checkbox>
        <el-checkbox v-model="exportConf.contactsHomeTel3" label="2">联系人4家庭电话</el-checkbox>
        <el-checkbox v-model="exportConf.contactsUnitTel3" label="4">联系人4单位电话</el-checkbox>
        <el-checkbox v-model="exportConf.contactsMobile3" label="5">联系人4手机</el-checkbox>
        <el-checkbox v-model="exportConf.contactsAddress3" label="5">联系人4地址</el-checkbox>

        <el-checkbox v-model="exportConf.contactsName4" label="1">联系人5姓名</el-checkbox>
        <el-checkbox v-model="exportConf.contactsIdentNo4" label="1">联系人5证件号</el-checkbox>
        <el-checkbox v-model="exportConf.contactsRelation4" label="4">联系人5关系</el-checkbox>
        <el-checkbox v-model="exportConf.contactsUnit4" label="5">联系人5单位</el-checkbox>
        <el-checkbox v-model="exportConf.contactsHomeTel4" label="2">联系人5家庭电话</el-checkbox>
        <el-checkbox v-model="exportConf.contactsUnitTel4" label="4">联系人5单位电话</el-checkbox>
        <el-checkbox v-model="exportConf.contactsMobile4" label="5">联系人5手机</el-checkbox>
        <el-checkbox v-model="exportConf.contactsAddress4" label="5">联系人5地址</el-checkbox>

        <el-checkbox v-model="exportConf.contactsName5" label="1">联系人6姓名</el-checkbox>
        <el-checkbox v-model="exportConf.contactsIdentNo5" label="1">联系人6证件号</el-checkbox>
        <el-checkbox v-model="exportConf.contactsRelation5" label="4">联系人6关系</el-checkbox>
        <el-checkbox v-model="exportConf.contactsUnit5" label="5">联系人6单位</el-checkbox>
        <el-checkbox v-model="exportConf.contactsHomeTel5" label="2">联系人6家庭电话</el-checkbox>
        <el-checkbox v-model="exportConf.contactsUnitTel5" label="4">联系人6单位电话</el-checkbox>
        <el-checkbox v-model="exportConf.contactsMobile5" label="5">联系人6手机</el-checkbox>
        <el-checkbox v-model="exportConf.contactsAddress5" label="5">联系人6地址</el-checkbox>

        <el-checkbox v-model="exportConf.remark0" label="1">备注1</el-checkbox>
        <el-checkbox v-model="exportConf.remark1" label="1">备注2</el-checkbox>
        <el-checkbox v-model="exportConf.remark2" label="4">备注3</el-checkbox>
        <el-checkbox v-model="exportConf.remark3" label="5">备注4</el-checkbox>
        <el-checkbox v-model="exportConf.remark4" label="2">备注5</el-checkbox>
        <el-checkbox v-model="exportConf.remark5" label="4">备注6</el-checkbox>
        <el-checkbox v-model="exportConf.goods" label="5">商品</el-checkbox>
        <el-checkbox v-model="exportConf.commercialTenant" label="5">商户</el-checkbox>
        <el-checkbox v-model="exportConf.totalOverdueMoney" label="5">总欠款(委案金额+公司佣金)</el-checkbox>
        <el-checkbox v-model="exportConf.overdueBalance" label="5">欠款余额</el-checkbox>
        <el-checkbox v-model="exportConf.applyOrderNo" label="5">申请单号</el-checkbox>
        <el-checkbox v-model="exportConf.overdueDate" label="5">逾期日期</el-checkbox>
        <el-checkbox v-model="exportConf.collectHand" label="5">催收手别</el-checkbox>
        <el-checkbox v-model="exportConf.overDays" label="5">逾期天数</el-checkbox>
        <el-checkbox v-model="exportConf.caseDeadline" label="5">委托期限</el-checkbox>
        <el-checkbox v-model="exportConf.entrustPeriods" label="5">委案期数</el-checkbox>
        <el-checkbox v-model="exportConf.repaidPeriods" label="5">已还期数</el-checkbox>
        <el-checkbox v-model="exportConf.billDate" label="5">账单日</el-checkbox>

        <el-checkbox v-model="exportConf.fixedQuota" label="5">固定额度</el-checkbox>
        <el-checkbox v-model="exportConf.billCycle" label="5">账单周期</el-checkbox>
        <el-checkbox v-model="exportConf.lastRepayMoney" label="5">最后还款额</el-checkbox>
        <el-checkbox v-model="exportConf.expectTime" label="5">预计退案日期</el-checkbox>
        <el-checkbox v-model="exportConf.mainCard" label="5">是否主卡</el-checkbox>
        <el-checkbox v-model="exportConf.deputyCardUserName" label="5">副卡卡人</el-checkbox>
        <el-checkbox v-model="exportConf.loanDate" label="5">贷款日期</el-checkbox>
        <el-checkbox v-model="exportConf.residualPrinciple" label="5">剩余本金</el-checkbox>
        <el-checkbox v-model="exportConf.overduePeriods" label="5">逾期期数</el-checkbox>
        <el-checkbox v-model="exportConf.overdueTimes" label="5">曾逾期次数</el-checkbox>
        <el-checkbox v-model="exportConf.loanRate" label="5">贷款利率</el-checkbox>

        <el-checkbox v-model="exportConf.monthlyRepayments" label="5">每月还款</el-checkbox>
        <el-checkbox v-model="exportConf.overdueMoney" label="5">逾期金额</el-checkbox>
        <el-checkbox v-model="exportConf.overduePrinciple" label="5">逾期本金</el-checkbox>
        <el-checkbox v-model="exportConf.overdueDefaultInterest" label="5">逾期罚息</el-checkbox>
        <el-checkbox v-model="exportConf.overdueManagementCost" label="5">逾期管理费</el-checkbox>
        <el-checkbox v-model="exportConf.penalty" label="5">违约金</el-checkbox>
        <el-checkbox v-model="exportConf.overrunFee" label="5">超限费</el-checkbox>
        <el-checkbox v-model="exportConf.loanDeadline" label="5">贷款截止日</el-checkbox>
        <el-checkbox v-model="exportConf.bail" label="5">保证金</el-checkbox>
        <el-checkbox v-model="exportConf.socialSecurityComputerNo" label="5">社保电脑号</el-checkbox>
        <el-checkbox v-model="exportConf.socialSecurityCardNo" label="5">社保卡号</el-checkbox>

        <el-checkbox v-model="exportConf.realReturnTime" label="5">实际退案日</el-checkbox>
        <el-checkbox v-model="exportConf.cardModel" label="5">车型</el-checkbox>
        <el-checkbox v-model="exportConf.license" label="5">牌照号</el-checkbox>
        <el-checkbox v-model="exportConf.vin" label="5">车架号</el-checkbox>
        <el-checkbox v-model="exportConf.warning" label="5">警告</el-checkbox>
        <el-checkbox v-model="exportConf.selfInfo" label="5">自定义信息</el-checkbox>
        <el-checkbox v-model="exportConf.newCase" label="5">最新催记</el-checkbox>
        <el-checkbox v-model="exportConf.commissionRate" label="5">公司佣金比率</el-checkbox>
      </el-row>
      <span slot="footer" class="footer">
        <el-button @click="showExportConfVisible = false">取 消</el-button>
        <el-button type="primary" @click="downCaseModule">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {baseURL} from '@/common/js/request.js';
  import {
    dataList,
    batchList,
    remoweData,
    clientCurrent,
    addData,
    clientList,
    selectByModule,
    saveSelectFilter,
    caseTypeList,
    areaList,
    update,
    downLoadZip,
    downCaseModule
  } from '@/common/js/data-case-imported.js';

  export default {
    name: 'dataCaseImported',
    data() {
      return {
        fullscreenLoading: false,
        tableLoad: false,
        action: baseURL + '/dataCase',
        showExportConfVisible: false,
        exportConf: {},
        currentBatchNo:'',
        collectAction: baseURL,
        ImportdialogVisible: false,
        ImportMsg: '',
        loading2: false,
        header: {Authorization: localStorage.token},
        messageForm: {},
        areaList: [],
        caseTypeList: [],
        pages: 1,
        total: 0,
        orderBy: "id",
        sort: "desc",
        clientList: [],
        batchList: [],
        deleteList: [],
        formInline: {
          batchNo: '',
          targetRate: '',
          returnTime: '',
          caseTime: ''
        },
        dialogVisible: false,
        dialogVisible2: false,
        DataList: [],
        currentPage4: 1,
        form: {
          caseTypes:[],
          areas:[],
          time: [],
          clients: [],
          batchNos: [],
        },
        clientValue: ''
      }
    },
    methods: {
      clientCurrent(){
        if (this.form.batchNos==null || this.form.batchNos.length==0){
          this.$set(this.form, 'clients', [])
        }else {
          clientCurrent(this.form.batchNos).then((response) => {
            if (response==null){
              this.$set(this.form, 'clients', [])
            }else{
              this.$set(this.form, 'clients', response)
            }
          })
        }
      },
      handleClose() {
        this.loading2 = false
        this.fullscreenLoading = false
        this.ImportdialogVisible = false
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
      changeBotno2() {
        for (var i = 0; i <= this.clientList.length; i++) {
          if (this.messageForm.client === this.clientList[i].id) {
            this.clientValue = this.clientList[i].name
            this.$set(this.messageForm, 'batchNo', this.clientValue + '-' + this.messageForm.caseTime.split("-").join(""))
            return
          }
        }
      },
      changeBotno3() {
        for (var i = 0; i <= this.clientList.length; i++) {
          if (this.messageForm.client === this.clientList[i].id) {
            this.clientValue = this.clientList[i].name
            this.$set(this.messageForm, 'batchNo', this.clientValue + '-' +this.messageForm.caseTime.split("-").join(""))
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
      ImportdialogVisibleWay() {
        this.loading2 = false
        this.fullscreenLoading = false
        this.ImportdialogVisible = false
      },
      onProgress() {
        this.loading2 = true
        this.fullscreenLoading = true
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
      backForm2() {
        this.dialogVisible2 = false;
        this.messageForm = {
          batchNo: '',
          targetRate: '',
          returnTime: '',
          caseTime: ''
        }
      },
      uploadSuccess(res, file, fileList) {
        if (res.code == 100) {
          this.$message({
            type: 'success',
            message: "导入成功"
          });
          this.tableLoad = true
          dataList().then((response) => {
            this.DataList = response.pageInfo.list
            //this.pages = response.pages
            this.total = response.total
            this.loading2 = false
            this.fullscreenLoading = false
            this.tableLoad = false
          })
        } else {
          this.ImportdialogVisible = true
          this.ImportMsg = res.msg
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
      downLoadZip() {
        downLoadZip().then((response) => {

        })
      },
      saveExportCaseConf() {
        let queryObj = {module: "data-case-import-exportCase", menu: this.exportConf}
        saveSelectFilter(queryObj).then(data => {
        });
      },
      queryExportCaseConfList() {
        this.$set(this, 'loading2', true)
        this.$set(this, 'fullscreenLoading', true)
        let queryObj = {module: "data-case-import-exportCase", menu: this.exportConf}
        selectByModule(queryObj).then(data => {
          if (data) {
            this.$set(this, 'exportConf', JSON.parse(data.menu))
            //this.exportConf = JSON.parse(data.menu);
          }
          this.$set(this, 'loading2', false)
          this.$set(this, 'fullscreenLoading', false)
          this.showExportConfVisible = true;
        });
      },
      showExport(row){
        this.queryExportCaseConfList();
        this.currentBatchNo = row.batchNo
      },
      selectAllExport(){
        this._selectAllInit('exportConf');
        for(var p in this.exportConf){//遍历json对象的每个key/value对,p为key
          this.exportConf[p] = true;
        }
      },
      selectUnAllExport(){
        this._selectAllInit('exportConf');
        for(var p in this.exportConf){//遍历json对象的每个key/value对,p为key
          this.exportConf[p] = false;
        }
      },
      downCaseModule() {
        let successNum = 0;
        for (var p in this.exportConf) {//遍历json对象的每个key/value对,p为key
          if (this.exportConf[p]) {
            successNum = successNum + 1;
          }
        }
        if (successNum == 0) {
          this.$message({
            type: 'error',
            message: '请先选择导出项!'
          });
          this.fullscreenLoading = false
          this.loading2 = false
          return;
        }
        this.loading2 = true
        this.fullscreenLoading = true
        downCaseModule(this.currentBatchNo,this.exportConf).then((response) => {
          this.loading2 = false
          this.fullscreenLoading = false
        })
        this.saveExportCaseConf();
        this.showExportConfVisible = false;
      },
      editMessage(row) {
        this.dialogVisible2 = true
        this.messageForm = row
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
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitmsgForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.messageForm)
            update(this.messageForm).then((response) => {
              this.dialogVisible2 = false
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
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleSort({column, prop, order}) {
        let startTime = this.form.time[0]
        let endTime = this.form.time[1]
        this.sort = order == null ? "desc" : order.replace("ending", "")
        this.orderBy = prop == null ? "id" : prop
        /* this.$refs.multipleTable.clearSort()*/
        this.tableLoad = true
        dataList(this.form.areas, this.form.batchNos, this.form.clients, this.form.caseTypes, startTime, endTime, this.orderBy, this.sort, this.pageSize, this.pageNum).then((response) => {
          this.DataList = response.pageInfo.list
          this.pages = response.pageInfo.pages
          this.total = response.pageInfo.total
          this.tableLoad = false
        })
      },
      search() {
        let startTime = this.form.time[0]
        let endTime = this.form.time[1]
        this.tableLoad = true
        dataList(this.form.areas, this.form.batchNos, this.form.clients, this.form.caseTypes, startTime, endTime, this.orderBy, this.sort, this.pageSize, this.pageNum).then((response) => {
          this.DataList = response.pageInfo.list
          console.info(response.pageInfo.pages);
          // this.pages = response.pageInfo.pages
          this.total = response.pageInfo.total
          this.tableLoad = false
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.search()
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.search()
      },
      handleSelectionChange(row) {
        let _self = this
        _self.deleteList = []
        row.forEach(function (currentValue, index, arr) {
          let Object = {"id": ""}
          Object.id = currentValue.id
          Object.batchNo = currentValue.batchNo
          _self.deleteList.push(Object)
        })

      },
      resetForm(formName) {
        this.form = {
          time: [],
          clients: [],
          batchNos: [],
          areas:[],
          caseTypes:[]
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
    },
    created() {
      this.tableLoad = true
      dataList().then((response) => {
        this.DataList = response.pageInfo.list
        this.total = response.pageInfo.total
        this.tableLoad = false
      })
     /* clientList().then((response) => {
        this.form.clientList = response;
        this.clientList = response;
      })*/
      this.form.clientList = this.$store.getters.caseType.委托方;
      this.clientList = this.$store.getters.caseType.委托方;
      batchList().then((response) => {
        this.batchList = response;
      })
     /* caseTypeList().then((response) => {
        this.form.caseTypeList = response
        this.caseTypeList = response;
      })*/
      this.form.caseTypeList = this.$store.getters.caseType.案件类型;
      this.caseTypeList = this.$store.getters.caseType.案件类型;
      /*areaList().then((response) => {
        this.form.areaList = response
        this.areaList = response
      })*/
      this.form.areaList = this.$store.getters.caseType.催收区域;
      this.areaList = this.$store.getters.caseType.催收区域;
    },
  }
</script>

<style lang="scss">
  #data-case-imported {
    .pad {
      .el-checkbox {
        width: 24%;
        margin-right: 0px;
      }
    }
    .el-dialog__header {
      background-color: #f8f8f8;

    }

    .el-form-item .el-form-item--mini {
      width: 80%
    }

    .upload-demo {
      display: inline-block;
    }

    .el-loading-spinner .el-loading-text {
      font-size: 18px;
    }
  }
</style>


