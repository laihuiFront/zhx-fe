<template>
  <div id="data-case-manage" class="page-wraper-sub"
  	v-loading="loading2"
  	   	   	  	  v-loading.fullscreen.lock="fullscreenLoading"

    element-loading-text="正在导入中"
    element-loading-spinner="el-icon-loading"
   element-loading-background="rgba(0, 0, 0, 0.7)">
    <el-form ref="form" :model="formInline" :inline="true" class="query-wrap">
      <el-form-item >
        <el-select v-model="formInline.collectArea" placeholder="请选择催收区域" clearable>
          <el-option
            v-for="item in areaList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item >
        <el-select v-model="formInline.batchNos" filterable collapse-tags  multiple placeholder="请输入批次" clearable>
          <el-option
            v-for="item in batchList"
            :key="item.id"
            :label="item.batchNo"
            :value="item.batchNo">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item >
        <el-select v-model="formInline.clients" filterable collapse-tags  multiple placeholder="请选择委托方" clearable>
          <el-option
            v-for="item in clientList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item >
        <el-select v-model="formInline.caseType" placeholder="请选择案件类型" clearable>
          <el-option
            v-for="item in caseTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item >
        <el-date-picker
          v-model="formInline.time2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="委案开始日期"
          end-placeholder="委案结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-popover
          placement="bottom-end"
          width="800"
          trigger="click">
          <ul class="condition-wrap data-case-condition-wrap">
            <li class="condition-item five-one">
              <el-input v-model="formInline.vin" placeholder="请输入车架号"></el-input>
            </li>
            <li class="condition-item five-one">
              <el-input v-model="formInline.license" placeholder="请输入牌照号"></el-input>
            </li>
            <li class="condition-item five-one">
              <el-input v-model="formInline.collectHand" placeholder="请输入催收手别"></el-input>
            </li>
            <li class="condition-item five-one">
              <el-input  type="textarea" v-model="formInline.name" placeholder="请输入姓名" style="width: 100%;" rows="3"></el-input>
            </li>
            <li class="condition-item five-one">
              <el-input  type="textarea" v-model="formInline.archiveNo" placeholder="请输入档案号" style="width: 100%;" rows="3"></el-input>
            </li>
            <li class="condition-item five-one">
              <el-input  type="textarea"  v-model="formInline.account" placeholder="请输入账号" style="width: 100%;" rows="3"></el-input>
            </li>
            <li class="condition-item five-one">
              <el-input v-model="formInline.bank" placeholder="请输入开户行"></el-input>
            </li>
            <li class="condition-item five-one">
              <el-input  type="textarea" v-model="formInline.id" style="width: 100%;" placeholder="请输入案件ID" rows="3"></el-input>
            </li>
            <li class="condition-item five-one">
              <el-input v-model="formInline.moneyStart" placeholder="请输入委案下限金额"></el-input>
            </li>
            <li class="condition-item five-one">
              <el-input v-model="formInline.moneyEnd" placeholder="请输入委案上限金额"></el-input>
            </li>
            <li class="condition-item five-one">
              <el-input v-model="formInline.overDays" placeholder="请输入逾期天数"></el-input>
            </li>
            <li class="condition-item five-one">
              <el-input  type="textarea" v-model="formInline.cardNo" placeholder="请输入卡号" style="width: 100%;" rows="3"></el-input>
            </li>
            <li class="condition-item five-one">
              <el-input v-model="formInline.seqNo" placeholder="请输入个案序列号"></el-input>
            </li>
            <li class="condition-item five-one">
              <el-input  type="textarea" v-model="formInline.identNo" style="width: 100%;" placeholder="请输入证件号" rows="3"></el-input>
            </li>
            <li class="condition-item five-one">
              <el-input v-model="formInline.collectInfo" placeholder="请输入催收记录"></el-input>
            </li>
            <li class="condition-item five-one">
              <el-select v-model="formInline.batchNos" filterable collapse-tags  multiple placeholder="请选择批次" clearable>
                  <el-option
                    v-for="item in batchList"
                    :key="item.batchNo"
                    :label="item.batchNo"
                    :value="item.batchNo">
                  </el-option>
                </el-select>
            </li>
            <li class="condition-item five-one">
              <el-select v-model="formInline.dept" placeholder="请选择部门" clearable>
                <el-option
                  v-for="item in departmentList"
                  :key="item.id"
                  :label="item.orgName"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item five-one">
              <el-select v-model="formInline.odvs" filterable collapse-tags multiple placeholder="请选择催收员" clearable>
                <el-option
                  v-for="item in PersonList"
                  :key="item.id"
                  :label="item.userName"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item five-one">
              <el-select v-model="formInline.distributeStatus" filterable  placeholder="请选择报备状态" clearable>
                <el-option
                  v-for="item in TellList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item five-one">
              <el-select v-model="formInline.clients" filterable collapse-tags  multiple placeholder="请选择委托方" clearable>
                <el-option
                  v-for="item in clientList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item five-one">
              <el-select v-model="formInline.collectStatus" filterable  placeholder="请选择减免状态" clearable>
                <el-option
                  v-for="item in deleteStatusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item five-one">
              <el-select v-model="formInline.status" filterable  placeholder="请选择案件状态" clearable>
                <el-option
                  v-for="item in caseStatusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item five-one">
              <el-select v-model="formInline.accountAge" filterable  placeholder="请选择逾期账龄" clearable>
                <el-option
                  v-for="item in accountAgeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item five-one">
              <el-select v-model="formInline.collectStatus" filterable  placeholder="请选择催收状态" clearable>
                <el-option
                  v-for="item in collectStatusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item five-one">
              <el-select v-model="formInline.color" filterable  placeholder="请选择标色状态" clearable>
                <el-option
                  v-for="item in val14_data"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item five-one">
              <el-cascader
                  :options="addressList"
                  v-model="formInline.area"
                  :props="props"
                  placeholder="请选择地区"
                >
                </el-cascader>
            </li>
            <li class="condition-item five-one">
              <el-select v-model="formInline.caseType" filterable  placeholder="请选择案件类型" clearable>
                <el-option
                  v-for="item in caseTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item five-one">
              <el-select v-model="formInline.distributeStatus" filterable  placeholder="请选择分配状态" clearable>
                <el-option
                  v-for="item in distributeStatusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item five-one">
              <el-select v-model="formInline.batchBonds" filterable  placeholder="请选择批次共债" clearable>
                <el-option
                  v-for="item in shareList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item five-one">
              <el-select v-model="formInline.collectArea" placeholder="请选择催收区域" clearable>
                <el-option
                  v-for="item in areaList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li class="condition-item half">
              <el-date-picker
                v-model="formInline.time1"
                type="daterange"
                align="right"
                value-format="yyyy-MM-dd"
                unlink-panels
                range-separator="至"
                start-placeholder="还款开始日期"
                end-placeholder="还款结束日期"
              >
              </el-date-picker>
            </li>
            <li class="condition-item half">
              <el-date-picker
                v-model="formInline.time2"
                type="daterange"
                align="right"
                value-format="yyyy-MM-dd"
                unlink-panels
                range-separator="至"
                start-placeholder="委案开始日期"
                end-placeholder="委案结束日期"
              >
              </el-date-picker>
            </li>
            <li class="condition-item half">
              <el-date-picker
                v-model="formInline.time3"
                type="daterange"
                align="right"
                value-format="yyyy-MM-dd"
                unlink-panels
                range-separator="至"
                start-placeholder="预计退案开始日期"
                end-placeholder="预计退案结束日期"
              >
              </el-date-picker>
            </li>
            <li class="condition-item half">
              <el-date-picker
                v-model="formInline.time4"
                type="daterange"
                align="right"
                value-format="yyyy-MM-dd"
                unlink-panels
                range-separator="至"
                start-placeholder="实际退案开始日期"
                end-placeholder="实际退案结束日期"
              >
              </el-date-picker>
            </li>
            <li class="condition-item half">
              <el-date-picker
                v-model="formInline.time5"
                type="daterange"
                align="right"
                value-format="yyyy-MM-dd"
                unlink-panels
                range-separator="至"
                start-placeholder="最后跟进开始日期"
                end-placeholder="最后跟进结束日期"
              >
              </el-date-picker>
            </li>
          </ul>
          <img src="./down.png" width="12" height="12" alt="更多" slot="reference">
        </el-popover>
        <el-button type="text" icon="el-icon-search" @click="search">查询</el-button>
        <el-button type="text" icon="el-icon-refresh" @click=resetFormInline>重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-dropdown @command="fenancheck" v-has="'分案'" trigger="click">
          <el-button type="primary" >
            分案<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">快速分案</el-dropdown-item>
            <el-dropdown-item command="b">查询结果快速分案</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="guanlianjian" v-has="'案件'">
          <el-button type="primary">
            案件<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  command="2">暂停案件</el-dropdown-item>
            <el-dropdown-item  command="3">关闭案件</el-dropdown-item>
            <el-dropdown-item  command="4">退案</el-dropdown-item>
            <el-dropdown-item  command="1">恢复案件</el-dropdown-item>
            <!--    <el-dropdown-item>案件标色</el-dropdown-item>
            -->    <el-dropdown-item  command="a">删除案件</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handleCommand" v-has="'修改'">
          <el-button type="primary">
            修改<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="important">修改重要等级</el-dropdown-item>
            <el-dropdown-item command="collectStatus">修改催收状态</el-dropdown-item>
            <el-dropdown-item command="collectArea">修改催收区域</el-dropdown-item>
            <el-dropdown-item command="mVal">修改M值系数</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" @click="addshow" v-has="'添加评语'">添加评语</el-button>
        <el-button type="primary"  @click="xiecui" v-has="'申请协催'">申请协催</el-button>
        <el-dropdown @command="handleExport" v-has="'导出'">
          <el-button type="primary">
            导出<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="exportTotalCase">查询结果</el-dropdown-item>
            <el-dropdown-item command="exportSelectCase">所选案件</el-dropdown-item>
            <el-dropdown-item command="exportTel">所选电话</el-dropdown-item>
            <el-dropdown-item command="exportCollect">所选催记</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="biaose" v-has="'案件标色'">
          <el-button type="primary" >
            案件标色<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="黑">黑色</el-dropdown-item>
            <el-dropdown-item command="红">红色</el-dropdown-item>
            <el-dropdown-item command="蓝">蓝色</el-dropdown-item>
            <el-dropdown-item command="橙">橙色</el-dropdown-item>
            <el-dropdown-item command="紫">紫色</el-dropdown-item>
            <el-dropdown-item command="棕">棕色</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
    </el-form>
    <el-row :gutter="24">
      <el-col :span="18">
        <div class="grid-content bg-purple">
          <span>查询结果统计：</span>
          <span class="textColor">列表案量:{{totalCaseNum}}件, </span>
          <span class="textColor"> 列表金额:{{totalAmt}}, </span>
          <span class="textColor"> 列表还款量:{{repayNum}}, </span>
          <span class="textColor"> 列表还款额:{{repayTotalAmt}}, </span>
          <span class="textColor"> 列表待银行查账金额:{{totalCp}}, </span>
          <span class="textColor"> 列表承诺还款金额:{{totalPtp}}</span>
        </div>
      </el-col>
    </el-row>
    
    <el-table
      v-loading="tableLoad"
      class="table-wrap"
      height="1"
      ref="multipleTable"
      :data="tableData3"
      border
      stripe
      :row-class-name="rowColor"
      style="margin-top:10px;"
      @selection-change="handleSelectionChange"
      @row-dblclick="showDetail"
      @sort-change="handleSort"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="ID"
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
          <el-button type="text" size="small" @click="editCase(scope.row.id, scope.row.name,scope.row.seqNo)">{{scope.row.seqNo}}</el-button>
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
        min-width="120"
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
        min-width="140"
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
        :sort-orders="['ascending','descending']"
        label="分配历史"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="summary"
        min-width="180"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="催收小结"
        show-overflow-tooltip>
      </el-table-column>

    </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 500, 2000, 10000, 1000000]"
        :page-size="pages"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    <el-dialog
      :title="detailTitle"
      class="dialog-wrap"
      :visible.sync="detailVisible"
      :close-on-click-modal="false"
      width="90%"
    >
      <case-detail :id="detailId" ref='detail'></case-detail>
    </el-dialog>
    <el-dialog
      title="添加评语"
      class="dialog-wrap"
      :visible.sync="detailVisible2"
      :close-on-click-modal="false"
      width="40%"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="120px">
        <div class="grid-content bg-purple">
          <el-form-item label="添加评语">
            <el-input type=textarea style="width: 200%;" v-model="value12" placeholder="请输入评语"></el-input>
          </el-form-item>
        </div>
      </el-form>

      <span slot="footer" class="footer">
    <el-button @click="detailVisible2 = false">取 消</el-button>
    <el-button type="primary" @click=sureAddShow>确 定</el-button>
  </span>


    </el-dialog>
    <el-dialog
      title="快速分案"
      class="dialog-wrap"
      :visible.sync="detailVisible3"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form :inline="true" ref="fenan" :model="fenan" class="demo-form-inline" label-width="120px">
        <div class="grid-content bg-purple">
          <el-form-item label="催收员"
          	prop="odv"
    :rules="{required: true, message: '催收员不能为空', trigger: 'blur'}">
            <el-select v-model="fenan.odv" filterable  placeholder="请选择催收员" clearable>
              <el-option
                v-for="item in PersonList"
                :key="item.id"
                :label="item.userName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="detailVisible3 = false">取 消</el-button>
    <el-button type="primary" @click="submitmsgForm('fenan')">确 定</el-button>
  </span>
    </el-dialog>
      <el-dialog
      title="查询结果快速分案"
      class="dialog-wrap"
      :visible.sync="detailVisible8"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form :inline="true" ref="fenan" :model="fenan" class="demo-form-inline" label-width="120px">
        <div class="grid-content bg-purple">
          <el-form-item label="催收员"
          		prop="odv"
    :rules="{required: true, message: '催收员不能为空', trigger: 'blur'}">
            <el-select v-model="fenan.odv" filterable  placeholder="请选择催收员" clearable>
              <el-option
                v-for="item in PersonList"
                :key="item.id"
                :label="item.userName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="footer">
    <el-button @click="detailVisible8 = false">取 消</el-button>
    <el-button type="primary" @click="submitmsgForm2('fenan')">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="修改等级"
      class="dialog-wrap"
      :visible.sync="detailVisible4"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form :inline="true" ref="formInline1" :model="formInline1" class="demo-form-inline" label-width="120px">
        <div class="grid-content bg-purple">
          <el-form-item label="案件等级"
          	prop="importLeave"
    :rules="{required: true, message: '请选择', trigger: 'blur'}">
            <el-select v-model=" formInline1.importLeave" filterable  placeholder="请选择案件等级" clearable>
              <el-option
                v-for="item in LeaveList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="footer">
    <el-button @click="detailVisible4 = false">取 消</el-button>
    <el-button type="primary" @click="submitmsgForm4('formInline1')">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="修改催收状态"
      class="dialog-wrap"
      :visible.sync="detailVisible5"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form :inline="true" ref="formInline1"  :model="formInline1" class="demo-form-inline" label-width="120px">
        <div class="grid-content bg-purple">
          <el-form-item label="催收状态"
          		prop="collectStatus"
    :rules="{required: true, message: '请选择', trigger: 'blur'}">
            <el-select v-model="formInline1.collectStatus" filterable  placeholder="请选择催收状态" clearable>
              <el-option
                v-for="item in collectStatusList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="footer">
    <el-button @click="detailVisible5 = false">取 消</el-button>
    <el-button type="primary" @click="submitmsgForm5('formInline1')">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="修改催收区域"
      class="dialog-wrap"
      :visible.sync="detailVisible6"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form :inline="true" ref="formInline1" :model="formInline1" class="demo-form-inline" label-width="120px">
        <div class="grid-content bg-purple">
          <el-form-item label="催收区域"
          		prop="collectStatus"
    :rules="{required: true, message: '请选择', trigger: 'blur'}">
            <el-select v-model="formInline1.collectArea" placeholder="请选择催收区域" clearable>
              <el-option
                v-for="item in areaList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="footer">
    <el-button @click="detailVisible6 = false">取 消</el-button>
    <el-button type="primary" @click="submitmsgForm6('formInline1')">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="修改M值"
      class="dialog-wrap"
      :visible.sync="detailVisible7"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form :inline="true" ref="formInline1" :model="formInline1" class="demo-form-inline" label-width="120px">
        <div class="grid-content bg-purple">
          <el-form-item label="M值"
          		prop="collectStatus"
    :rules="{required: true, message: '请选择', trigger: 'blur'}">
            <el-input  v-model="formInline1.mVal" style="width: 100%;" placeholder="请输入M值" rows="4"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="detailVisible7 = false">取 消</el-button>
    <el-button type="primary" @click="submitmsgForm7('formInline1')">确 定</el-button>
  </span>
    </el-dialog>
     <el-dialog
      title="申请协催"
      class="dialog-wrap"
      :visible.sync="detailVisible9"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-form  :model="addSynergyForm" class="demo-form-inline" label-width="120px">
        <div class="grid-content bg-purple">
        	<el-form-item label="协催类型"
        		>
            <el-select v-model="addSynergyForm.Synergytype" placeholder="请选择协催类型" clearable>
              <el-option
                v-for="item in addSynergyFormList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请内容">
            <el-input type="textarea" v-model="addSynergyForm.value" style="width: 100%;" placeholder="请输入" rows="4"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="footer">
    <el-button @click="detailVisible9 = false">取 消</el-button>
    <el-button type="primary" @click=addSynergyFormType>确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
  title="导出查询结果"
  :visible.sync="dialogVisibleCase"
  width="30%"
  >
  <el-row :gutter="20">
  <el-col :span="10"><div class="grid-content bg-purple"> 
  	<el-button @click=totalDataExport>按查询条件全部导出</el-button>
</div></el-col>
  <el-col :span="10">
  	<div class="grid-content bg-purple">  
  		<el-button @click=pageDataExport>按查询条件导出当前分页</el-button>
</div></el-col>
</el-row>
</el-dialog>
  </div>
</template>

<script>
  //import CaseDetail from './detail'
  const CaseDetail = () => import('@/views/data-manage/detail');
  import {dataList,getSynergyTypeList,LeaveList,areaList,batchList,caseTypeList,addressList,TellList,collectStatusList,deleteStatusList,accountAgeList,clientList,EndList,PersonList,departmentList,searchList,fenan1,fenan2,addpingyu,caseStatus,deteleCase,colorList,addMValue,addCollectArea,addCollectStatus,addImportant,addSynergy,selectDataTel,selectDataCollect,pageDataExport,selectDataCaseExport,totalDataBatchExport} from '@/common/js/data-case-manage.js'
  export default {
    name: 'dataCaseManage',
    components: {
      CaseDetail
    },
    data(){
      return {
      	formInline1:{},
        tableLoad:false,
      	dialogVisibleCase:false,
        detailId: -1,
      	addSynergyForm:{
      		Synergytype:'',
      		value:'',
      		List:[
      		{name:'投诉预警',id:1},{name:'地址查询',id:2}, {name:'法院协催',id:3} ,{name:'社保查询',id:4},{name:'公安协催',id:5},{name:'争议咨询',id:6},{name:'移动查询',id:7},{name:'主管协催',id:8},{name:'客服咨询',id:9},{name:'电信查询',id:10},{name:"短信申请",id:11},{name:"退件查询",id:12}
      		]
      	},
      	mVal:'',
      	collectArea:'',
      	collectStatus:'',
      	importLeave:'',
      	value12:'',
        images:{background: "url(" + require("./down.png") + ") repeat-x",padding:"8px 5px 3px 6px"},
        props: {
          label:'name',
          value:'id',
          children: 'children'
        },
        caseStatusList:[{name:"未退案",id:0},{name:"正常",id:1},{name:"暂停",id:2},{name:"关档",id:3},{name:"退档",id:4},{name:"全部",id:5}],
        distributeStatusList:[{name:"已分配",id:1},{name:"未分配",id:0}],
        shareList:[{name:"是",value:"true"},{name:"否",value:'false'}],
        departmentList:[],
        addressList:[],
        accountAgeList:[],
        collectStatusList:[],
        deleteStatusList:[],
        pageSize:100,
        pageNum:1,
        LeaveList:[],
        clientList:[],
        batchList:[],
        total:0,
        pages:1,
        orderBy:"id",
        sort:"desc",
        totalCaseNum:0,
        totalAmt:0,
        repayNum:0,
        repayTotalAmt:0,
        totalCp:0,
        totalPtp:0,
        deleteList:[],
        caseTypeList:[],
        areaList:[],
        formInline:{odvs:[],batchNos:[],clients:[],time1:[],time2:[],time3:[],time4:[],time5:[],time6:[]},
        dialogVisible:false,
        tableData3:[],
        currentPage4: 1,
        TellList:[],
        EndList:[],
        PersonList:[],
        form:{
          time:[]
        },
        val14_data: [
          {
            label:'正常',
            value:'黑'
          },
          {
            label:'红色',
            value:'红'
          },
          {
            label:'蓝色',
            value:'蓝'
          },
          {
            label:'橙色',
            value:'橙'
          },
          {
            label:'紫色',
            value:'紫'
          },
          {
            label:'棕色',
            value:'棕'
          },
        ],
        addSynergyFormList:[],
        detailVisible4:false,
        detailVisible5:false,
        detailVisible6:false,
        detailVisible7:false,
        detailVisible3:false,
        detailVisible2:false,
        detailVisible: false,
        detailVisible8: false,
        detailVisible9: false,
        detailTitle: '案件详情',
        fenan:{odv:''},
         loading2:false,
					fullscreenLoading:false
      }
    },
    methods: {
    	  submitmsgForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
         this.fenancheckone()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitmsgForm2(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
         this.fenanchecktwo()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitmsgForm4(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
         this.sureAddShow4()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitmsgForm5(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
         this.sureAddShow5()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitmsgForm6(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
         this.sureAddShow6()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitmsgForm7(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
         this.sureAddShow7()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    	rowColor({row}){
      return `color_${row.color}`;
    },
    	guanlianjian(command){
    		if(this.deleteList.length>=1){
    		let datasList=[]
         	for (var i=0;i<this.deleteList.length;i++){
       		let dataObject={id:'',status:command}
       		dataObject.id=this.deleteList[i].id
       		datasList.push(dataObject)}
          if(command==="1"){
          	this.$confirm('是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
         caseStatus(datasList).then((response)=>{
              this.$message({
             type: 'success',
             message: '操作成功!'
          });
        this.search()
      })
        }).catch(() => {

        });
           
       	}
          else if(command==="2"){
            this.$confirm('是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
         caseStatus(datasList).then((response)=>{
              this.$message({
             type: 'success',
             message: '操作成功!'
          });
        this.search()
      })
        }).catch(() => {

        });
          }else if(command==="3"){
         this.$confirm('是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
         caseStatus(datasList).then((response)=>{
              this.$message({
             type: 'success',
             message: '操作成功!'
          });
        this.search()
      })
        }).catch(() => {

        });
          }else if(command==="4"){
          this.$confirm('是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
         caseStatus(datasList).then((response)=>{
              this.$message({
             type: 'success',
             message: '操作成功!'
          });
        this.search()
      })
        }).catch(() => {

        });
          }else {
            this.$confirm('是否删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              deteleCase(this.deleteList).then((response)=>{
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.search()
              })
            }).catch(() => {

            });


          }
        }else{
          this.$message({
            type: 'error',
            message: '请选择数据!'
          });
        }

    	},
      handleExport(command){
    	  console.info(command,this.deleteList.length)

          if(command==="exportTotalCase"){
          	this.dialogVisibleCase=true
          }else if(command==="exportSelectCase"){
             this.exportSelectCase()
          }else if(command==="exportTel"){
            this.exportTel();
          }else if(command==="exportCollect"){
            this.exportCollect();
          }

      },
      handleCommand(command){
      	
        if(this.deleteList.length>=1){
          if(command==="important"){
            this.detailVisible4=true
          }else if(command==="collectStatus"){
            this.detailVisible5=true
          }else if(command==="collectArea"){
            this.detailVisible6=true
          }else {
            this.detailVisible7=true
          }
        }else{
          this.$message({
            type: 'error',
            message: '请选择数据!'
          });
        }

      },
      biaose(a){
      	let datasList=[]
       	for (var i=0;i<this.deleteList.length;i++){
       		let dataObject={id:'',color:a}
       		dataObject.id=this.deleteList[i].id
       		datasList.push(dataObject)
       	}
        if(this.deleteList.length>=1){
        	colorList(datasList).then((response)=>{
           this.$message({
          type: 'success',
          message: '操作成功!'
       });
        this.search()
      })
         
        }else{
          this.$message({
            type: 'error',
            message: '请选择数据!'
          });
        }
      },
      fenancheck(command){
        if(command==="a"){
        if(this.deleteList.length>=1){
         this.detailVisible3=true		
        }else{
          this.$message({
            type: 'error',
            message: '请选择数据!'
          });
        }
        	
        }else{
        	 this.detailVisible8=true
        }
      },
    totalDataExport(){
    	this.loading2=true
              this.fullscreenLoading=true
			let startTime=this.formInline.time2[0]
      	let endTime=this.formInline.time2[1]
		totalDataBatchExport(this.formInline).then((response)=>{
			this.loading2=false
              this.fullscreenLoading=false
          	this.$message({
            type: 'success',
            message: '导出成功!'
          });
          })
	},
      formatMoney(value,places, symbol, thousand, decimal) {
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
		pageDataExport(){
			this.loading2=true
              this.fullscreenLoading=true
			let startTime=this.formInline.time2[0]
      	let endTime=this.formInline.time2[1]
      pageDataExport(this.formInline).then((response)=>{
      	this.loading2=false
              this.fullscreenLoading=false
          	this.$message({
            type: 'success',
            message: '导出成功!'
          });
          })
	},
      exportSelectCase(){
          let datasList=[]
        if(this.deleteList.length>=1){
          for (var i=0;i<this.deleteList.length;i++){
            let dataObject={}
            dataObject.id=this.deleteList[i].id
            datasList.push(dataObject)
          }
          this.loading2=true
					this.fullscreenLoading=true
          selectDataCaseExport(datasList).then((response)=>{
this.loading2=false
					this.fullscreenLoading=false
          })
        }else{
          this.$message({
            type: 'info',
            message: '请选择数据!'
          });
        }

      },
      exportTel(){

        let datasList=[]
        let _self = this;
        if(this.deleteList.length>=1) {
          for (var i = 0; i < this.deleteList.length; i++) {
            let dataObject = {}
            dataObject.id = this.deleteList[i].id
            datasList.push(dataObject)
          }
this.loading2=true
					this.fullscreenLoading=true
          selectDataTel(datasList).then((response) => {
this.loading2=false
					this.fullscreenLoading=false
          })
        }else{
          _self.$message({
            type: 'info',
            message: '请选择需要导出的数据!'
          });
        }
      },
      exportCollect(){
        let datasList=[]
        let _self = this;
        if(this.deleteList.length>=1) {
          for (var i=0;i<this.deleteList.length;i++){
            let dataObject={}
            dataObject.id=this.deleteList[i].id
            datasList.push(dataObject)
          }
          this.loading2=true
					this.fullscreenLoading=true
          selectDataCollect(datasList).then((response)=>{
this.loading2=false
					this.fullscreenLoading=false
          })
        }else{
          _self.$message({
            type: 'info',
            message: '请选择需要导出的数据!'
          });
        }
      },
       fenancheckone(){
       	let datasList=[]
       	for (var i=0;i<this.deleteList.length;i++){
       		let dataObject={id:'',odv:this.fenan.odv}
       		dataObject.id=this.deleteList[i].id
       		datasList.push(dataObject)
       	}
         fenan1(datasList).then((response)=>{
       this.$message({
          type: 'success',
          message: '操作成功!'
        });
        this.detailVisible3=false
        this.fenan.odv=''
        this.search()
      })
      },
       fenanchecktwo(){
       	console.log('12',this.fenan.odv)
         fenan2(this.formInline,this.fenan.odv).then((response)=>{
       this.$message({
          type: 'success',
          message: '操作成功!'
        });
        this.detailVisible8=false
         this.fenan.odv=''
        this.search()
      })
      },
      sureAddShow7(){
        let datasList=[]
       	for (var i=0;i<this.deleteList.length;i++){
       		let dataObject={id:'',mVal:this.formInline1.mVal}
       		dataObject.id=this.deleteList[i].id
       		datasList.push(dataObject)
       	}
      	addMValue(datasList).then((response)=>{
       this.$message({
          type: 'success',
          message: '操作成功!'
        });
        this.detailVisible7=false
        this.mVal=''
        this.search()
      })
      
     
      },
      sureAddShow6(){
        let datasList=[]
       	for (var i=0;i<this.deleteList.length;i++){
       		let dataObject={id:'',collectArea:this.formInline1.collectArea}
       		dataObject.id=this.deleteList[i].id
       		datasList.push(dataObject)
       	}
      	addCollectArea(datasList).then((response)=>{
       this.$message({
          type: 'success',
          message: '操作成功!'
        });
        this.detailVisible6=false
        this.collectArea=''
        this.search()
      })
      
      },
      sureAddShow5(){
       let datasList=[]
       	for (var i=0;i<this.deleteList.length;i++){
       		let dataObject={id:'',collectStatus:this.formInline1.collectStatus}
       		dataObject.id=this.deleteList[i].id
       		datasList.push(dataObject)
       	}
      	addCollectStatus(datasList).then((response)=>{
       this.$message({
          type: 'success',
          message: '操作成功!'
        });
       this.detailVisible5=false
        this.collectStatus=''
        this.search()
      })
      
      },
      sureAddShow4(){
      	let datasList=[]
       	for (var i=0;i<this.deleteList.length;i++){
       		let dataObject={id:'',important:this.formInline1.importLeave}
       		dataObject.id=this.deleteList[i].id
       		datasList.push(dataObject)
       	}
      	addImportant(datasList).then((response)=>{
       this.$message({
          type: 'success',
          message: '操作成功!'
        });
        this.detailVisible4=false
        this.fimportLeave=''
        this.search()
      })
      },
      addshow(){
        if(this.deleteList.length>=1){
          this.detailVisible2=true
        }else{
          this.$message({
            type: 'error',
            message: '请选择数据!'
          });
        }
      },
      sureAddShow(){
      	let datasList=[]
       	for (var i=0;i<this.deleteList.length;i++){
       		let dataObject={id:'',comment:this.value12}
       		dataObject.id=this.deleteList[i].id
       		datasList.push(dataObject)
       	}
       addpingyu(datasList).then((response)=>{
       this.$message({
          type: 'success',
          message: '操作成功!'
        });
        this.detailVisible2=false
        this.fenan.value12=''
        this.search()
      })
      },
      xiecui(){
        if(this.deleteList.length>=1){
        	this.detailVisible9=true
        }else{
          this.$message({
            type: 'error',
            message: '请选择数据!'
          });
        }
      },
      addSynergyFormType(){
      	let datasList=[]
       	for (var i=0;i<this.deleteList.length;i++){
       		let dataObject={id:'',synergyType:this.addSynergyForm.Synergytype,synergyContext:this.addSynergyForm.value}
       		dataObject.id=this.deleteList[i].id
       		datasList.push(dataObject)
       	}
       	addSynergy(datasList).then((response)=>{
       this.$message({
          type: 'success',
          message: '操作成功!'
        });
        this.detailVisible9=false
        this.addSynergyForm.Synergytype=''
        this.addSynergyForm.value=''
        this.search()
      })
      },
      searchdataList(form){
        this.formInline.orderBy = this.orderBy;
        this.formInline.sort = this.sort;
        this.tableLoad = true
        dataList(this.formInline).then((response)=>{
          this.totalCaseNum=response.totalCaseNum
          this.totalAmt = this.formatMoney(response.totalAmt,0, "￥")
          this.repayTotalAmt= this.formatMoney(response.repayTotalAmt,0, "￥")
          this.repayNum = response.repayNum
          this.totalCp = this.formatMoney(response.totalCp,0, "￥")
          this.totalPtp = this.formatMoney(response.totalPtp,0, "￥")
          this.tableData3=response.pageInfo.list
          //this.pages = response.pages
          this.total = response.pageInfo.total
          this.dialogVisible = false
          this.tableLoad = false
        })
      },
      handleSelectionChange(row){
        let _self=this
        _self.deleteList=[]
        row.forEach(function(currentValue, index, arr){
          let Object={"id":""}
          Object.id=currentValue.id
          _self.deleteList.push(Object)
        })
        console.log(_self.deleteList)
      },
      handleSort( {column,prop,order}){
        this.sort = order==null?"desc":order.replace("ending","")
        this.orderBy = prop==null?"id":prop

        this.tableLoad = true
        searchList(this.formInline,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{
          this.totalCaseNum=response.totalCaseNum
          this.totalAmt = this.formatMoney(response.totalAmt,0, "￥")
          this.repayTotalAmt= this.formatMoney(response.repayTotalAmt,0, "￥")
          this.repayNum = response.repayNum
          this.totalCp = this.formatMoney(response.totalCp,0, "￥")
          this.totalPtp = this.formatMoney(response.totalPtp,0, "￥")
          this.tableData3=response.pageInfo.list

          //this.pages = response.pages
          this.total = response.pageInfo.total
          this.tableLoad = false
        })
      },
      handleSizeChange(val){
        this.pageSize=val
        this.search()
      },
      search(){
          this.tableLoad = true
        searchList(this.formInline,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{
          this.totalCaseNum=response.totalCaseNum
          this.totalAmt = this.formatMoney(response.totalAmt,0, "￥")
          this.repayTotalAmt= this.formatMoney(response.repayTotalAmt,0, "￥")
          this.repayNum = response.repayNum
          this.totalCp = this.formatMoney(response.totalCp,0, "￥")
          this.totalPtp = this.formatMoney(response.totalPtp,0, "￥")
          this.tableData3=response.pageInfo.list

          //this.pages = response.pages
          this.total = response.pageInfo.total
          this.tableLoad = false
        })
      },
      handleSizeChange(val){
        this.pageSize=val
        this.search()
      },
      handleCurrentChange(val){
        this.pageNum=val;
        this.search()
      },
      resetFormInline() {
        this.formInline={odvs:[],batchNos:[],clients:[],time1:[],time2:[],time3:[],time4:[],time5:[],time6:[]}
      },

      open7() {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {

        });
      },
      showDetail(row){
        let id = row.id
        let name = row.name
        let seqNo = row.seqNo
        this.$router.push({
          path:'case-detail',
          query:{
            id,
            name,
            seqNo
          }
        })
      },
      editCase(id, name, seqNo){
        this.$router.push({
          path:'case-detail',
          query:{
            id,
            name,
            seqNo
          }
        })
        // this.detailTitle = name+'案件详情'
        // this.detailId = id
        // this.detailVisible = true
        // this.$nextTick(()=>{
        //   this.$refs.detail.queryDetail()
        // })
      }
    },
    created() {
      this.tableLoad = true
      searchList(this.formInline,this.orderBy,this.sort,this.pageSize,this.pageNum).then((response)=>{
        this.tableData3=response.pageInfo.list
        this.totalCaseNum=response.totalCaseNum
        this.totalAmt = this.formatMoney(response.totalAmt,0, "￥")
        this.repayTotalAmt= this.formatMoney(response.repayTotalAmt,0, "￥")
        this.repayNum = response.repayNum
        this.totalCp = this.formatMoney(response.totalCp,0, "￥")
        this.totalPtp = this.formatMoney(response.totalPtp,0, "￥")
        this.total = response.pageInfo.total
        this.tableData3 = response.pageInfo.list.map((item)=>{
          return Object.assign(item, {'class-name': `color_${item.color}`});
        })
        this.tableLoad = false
      })
      areaList().then((response)=>{
        this.areaList=response
      })
      caseTypeList().then((response)=>{
        this.caseTypeList=response
      })
      clientList().then((response)=>{
        this.clientList=response
      })
      batchList().then((response)=>{
        this.batchList=response;
      })
      EndList().then((response)=>{
        this.EndList=response
      })
      PersonList().then((response)=>{
        this.PersonList=response
        this.form.PersonList=response
      })
      departmentList().then((response)=>{
        this.departmentList=response
      })
      accountAgeList().then((response)=>{
        this.accountAgeList=response
      })
      collectStatusList().then((response)=>{
        this.collectStatusList=response
      })
      deleteStatusList().then((response)=>{
        this.deleteStatusList=response
      })
      TellList().then((response)=>{
        this.TellList=response
      })
      addressList().then((response)=>{
        this.addressList=response
      })
      LeaveList().then((response)=>{
        this.LeaveList=response
      })
      getSynergyTypeList().then((response)=>{
        this.addSynergyFormList=response
      })

    },
  }
</script>

<style lang="scss">
  #data-case-manage{
  	.el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__labe
    .el-form--inline .el-form-item{
      margin-right:-10px;
      line-height: 21px;
    }
     .el-loading-spinner .el-loading-text {
    font-size: 18px;
    }
    .el-table__body-wrapper{
      height: calc(100% - 74px);
    }
    .el-dialog__header{
      background-color: #f8f8f8;

    }
    .textColor{
      display: inline-block;
      color: #66b1ff;

    }
    .color_gray {
  color: #b2adb2;
}
.color_BLACK {
  color: #000000;
}
.color_RED {
  color: #FF0000;
}
.color_BLUE {
  color: #0000FF;
}
.color_ORANGE {
  color: #FA8072;
}
.color_ZI {
  color: #A020F0;
}
.color_ZONG{
  color: #D2B48C;
}
  }
.data-case-condition-wrap{
  height: 350px;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
