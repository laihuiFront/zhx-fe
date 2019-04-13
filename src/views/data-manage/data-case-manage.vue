<template>
  <div id="data-case-manage" class="page-wraper-sub"
       v-loading="loading2"
       v-loading.fullscreen.lock="fullscreenLoading"
       element-loading-text="正在加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.7)">
    <el-form ref="form" :model="formInline" :inline="true" class="query-wrap">
      <el-form-item v-if="queryConf.csqy || queryConfFlag">
        <el-select v-model="formInline.collectArea" :visible-arrow="false" placeholder="请选择催收区域" clearable>
          <el-option
            v-for="item in areaList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.pc || queryConfFlag">
        <el-select v-model="formInline.batchNos" style="min-width: 160px;" filterable collapse-tags multiple
                   placeholder="请输入批次" clearable>
          <el-option
            v-for="item in batchList"
            :key="item.id"
            :label="item.batchNo"
            :value="item.batchNo">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.wtf || queryConfFlag">
        <el-select v-model="formInline.clients" filterable collapse-tags multiple placeholder="请选择委托方" clearable>
          <el-option
            v-for="item in clientList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.ajlx || queryConfFlag">
        <el-select v-model="formInline.caseType" placeholder="请选择案件类型" clearable>
          <el-option
            v-for="item in caseTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.warq || queryConfFlag">
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
      <el-form-item v-if="queryConf.cjh || queryConfFlag">
        <el-input v-model="formInline.vin" placeholder="请输入车架号"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.pzh || queryConfFlag">
        <el-input v-model="formInline.license" placeholder="请输入牌照号"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.cssb || queryConfFlag">
        <el-input v-model="formInline.collectHand" placeholder="请输入催收手别"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.xm || queryConfFlag">
        <el-input type="textarea" v-model="formInline.name" placeholder="请输入姓名" style="width: 100%;"
                  rows="3"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.dah || queryConfFlag">
        <el-input type="textarea" v-model="formInline.archiveNo" placeholder="请输入档案号" style="width: 100%;"
                  rows="3"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.zh || queryConfFlag">
        <el-input type="textarea" v-model="formInline.account" placeholder="请输入账号" style="width: 100%;"
                  rows="3"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.khh || queryConfFlag">
        <el-input v-model="formInline.bank" placeholder="请输入开户行"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.aj || queryConfFlag">
        <el-input type="textarea" v-model="formInline.id" style="width: 100%;" placeholder="请输入案件ID"
                  rows="3"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.waje || queryConfFlag">
        <el-input v-model="formInline.moneyStart" placeholder="请输入委案下限金额"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.waje || queryConfFlag">
        <el-input v-model="formInline.moneyEnd" placeholder="请输入委案上限金额"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.yqts || queryConfFlag">
        <el-input v-model="formInline.overDays" placeholder="请输入逾期天数"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.kh || queryConfFlag">
        <el-input type="textarea" v-model="formInline.cardNo" placeholder="请输入卡号" style="width: 100%;"
                  rows="3"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.gaxlh || queryConfFlag">
        <el-input type="textarea" v-model="formInline.seqNo" placeholder="请输入个案序列号" style="width: 100%;"
                  rows="3"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.zjh || queryConfFlag">
        <el-input type="textarea" v-model="formInline.identNo" style="width: 100%;" placeholder="请输入证件号"
                  rows="3"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.csjl || queryConfFlag">
        <el-input v-model="formInline.collectInfo" placeholder="请输入催收记录"></el-input>
      </el-form-item>
      <el-form-item v-if="queryConf.bm || queryConfFlag">
        <el-select v-model="formInline.dept" placeholder="请选择部门" clearable>
          <el-option
            v-for="item in departmentList"
            :key="item.id"
            :label="item.orgName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.csy || queryConfFlag">
        <el-select v-model="formInline.odvs" filterable collapse-tags multiple placeholder="请选择催收员" clearable>
          <el-option
            v-for="item in PersonList"
            :key="item.id"
            :label="item.userName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.bbzt || queryConfFlag">
        <el-select v-model="formInline.distributeStatus" filterable placeholder="请选择报备状态" clearable>
          <el-option
            v-for="item in TellList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="queryConf.jmzt || queryConfFlag">
        <el-select v-model="formInline.collectStatus" filterable placeholder="请选择减免状态" clearable>
          <el-option
            v-for="item in deleteStatusList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.ajzt || queryConfFlag">
        <el-select v-model="formInline.status" filterable placeholder="请选择案件状态" clearable>
          <el-option
            v-for="item in caseStatusList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.yqzl || queryConfFlag">
        <el-select v-model="formInline.accountAge" filterable placeholder="请选择逾期账龄" clearable>
          <el-option
            v-for="item in accountAgeList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.cszt || queryConfFlag">
        <el-select v-model="formInline.collectStatus" filterable placeholder="请选择催收状态" clearable>
          <el-option
            v-for="item in collectStatusList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.bszt || queryConfFlag">
        <el-select v-model="formInline.color" filterable placeholder="请选择标色状态" clearable>
          <el-option
            v-for="item in val14_data"
            :key="item.label"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.dq || queryConfFlag">
        <el-cascader
          :options="addressList"
          v-model="formInline.area"
          :props="props"
          placeholder="请选择地区"
        >
        </el-cascader>
      </el-form-item>

      <el-form-item v-if="queryConf.fpzt || queryConfFlag">
        <el-select v-model="formInline.distributeStatus" filterable placeholder="请选择分配状态" clearable>
          <el-option
            v-for="item in distributeStatusList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="queryConf.pcgz || queryConfFlag">
        <el-select v-model="formInline.batchBonds" filterable placeholder="请选择批次共债" clearable>
          <el-option
            v-for="item in shareList"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="queryConf.hkrq || queryConfFlag">
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
      </el-form-item>
      <el-form-item v-if="queryConf.warq || queryConfFlag">
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
      </el-form-item>
      <el-form-item v-if="queryConf.yjtarq || queryConfFlag">
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
      </el-form-item>
      <el-form-item v-if="queryConf.sjtarq || queryConfFlag">
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
      </el-form-item>
      <el-form-item v-if="queryConf.zhgjrq || queryConfFlag">
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
      </el-form-item>
      <el-row>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search" style="margin-left:10px;">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-refresh" @click="resetFormInline" style="margin-left:10px;">重置
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="showQueryConf" style="margin-left:10px;">查询条件配置</el-button>
        </el-form-item>
        <el-form-item>
          <el-dropdown v-dropdown-patch @command="fenancheck" style="margin-left:10px;" v-has="'分案'">
            <el-button type="primary">
              分案<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">快速分案</el-dropdown-item>
              <el-dropdown-item command="b">查询结果快速分案</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
        <el-form-item style="margin-left: 10px;">
          <el-dropdown v-dropdown-patch @command="guanlianjian" v-has="'案件'">
            <el-button type="primary">
              案件<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="2">暂停案件</el-dropdown-item>
              <el-dropdown-item command="3">关闭案件</el-dropdown-item>
              <el-dropdown-item command="4">退案</el-dropdown-item>
              <el-dropdown-item command="1">恢复案件</el-dropdown-item>
              <!--    <el-dropdown-item>案件标色</el-dropdown-item>
              -->
              <el-dropdown-item command="a">删除案件</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
        <el-form-item style="margin-left: 10px;">
          <el-dropdown v-dropdown-patch @command="handleCommand" v-has="'修改'">
            <el-button type="primary">
              修改<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="important">修改重要等级</el-dropdown-item>
              <el-dropdown-item command="collectStatus">修改催收状态</el-dropdown-item>
              <el-dropdown-item command="collectArea">修改催收区域</el-dropdown-item>
              <el-dropdown-item command="mVal">修改提成值系数</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
        <el-form-item style="margin-left: 10px;">
          <el-button type="primary" @click="addshow" v-has="'添加评语'">添加评语</el-button>
        </el-form-item>
        <el-form-item style="margin-left: 10px;">
          <el-button type="primary" @click="xiecui" v-has="'申请协催'">申请协催</el-button>
        </el-form-item>
        <el-form-item style="margin-left: 10px;">
          <el-dropdown v-dropdown-patch @command="handleExport" v-has="'导出'">
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
        </el-form-item>
        <el-form-item style="margin-left: 10px;">
          <el-dropdown v-dropdown-patch @command="biaose" v-has="'案件标色'">
            <el-button type="primary">
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
      </el-row>
    </el-form>
    <el-row :gutter="24">
      <el-col :span="18" style="    width: 100%;">
        <div class="grid-content bg-purple">
          <span>查询结果统计：</span>
          <span class="textColor">列表案量：{{totalCaseNum}}件，</span>
          <span class="textColor"> 列表金额：{{totalAmt}}，</span>
          <span class="textColor"> 列表还款量：{{repayNum}}，</span>
          <span class="textColor"> 列表还款额：{{repayTotalAmt}}，</span>
          <span class="textColor"> 列表待银行查账金额：{{totalCp}}，</span>
          <span class="textColor"> 列表承诺还款金额：{{totalPtp}}</span>
        </div>
      </el-col>
    </el-row>

    <el-table highlight-current-row v-loading="tableLoad"
              class="table-wrap"
              height="1"
              ref="multipleTable"
              :data="tableData3"
              border
              stripe
              :row-class-name="rowColor"
              style="margin-top:10px;min-height:390px;margin-bottom: 40px;"
              @selection-change="handleSelectionChange"
              @row-dblclick="showDetail"
              @sort-change="handleSort"
    >
      <el-table-column
        min-width="5"
        type="selection"
        align="center">
      </el-table-column>
      <el-table-column
        min-width="5"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="ID"
        align="center"
        prop="id"
      >

      </el-table-column>
      <el-table-column
        min-width="5"
        prop="collectArea"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="催收区域"
      >
      </el-table-column>
      <el-table-column
        min-width="5"
        prop="collectStatusMsg"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="催收状态"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="5"
        prop="batchNo"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="批次号"
        align="center"
        show-overflow-tooltip>

      </el-table-column>
      <el-table-column
        min-width="5"
        prop="seqNo"
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
        min-width="5"
        prop="caseDate"
        align="center"
        label="委案日期"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="5"
        prop="expectTime"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        align="center"
        label="预计退案日期"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="5"
        prop="name"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="姓名"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="5"
        prop="identNo"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        align="center"
        label="证件号"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="5"
        prop="area"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        align="center"
        label="地区"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="5"
        prop="cardNo"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        align="center"
        label="卡号"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="5"
        prop="moneyMsg"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="委案金额"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="5"
        prop="balanceMsg"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        align="center"
        label="委案余额"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="5"
        prop="collectDate"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        align="center"
        label="上次通电时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="5"
        prop="newCase"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="最新催记"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="5"
        prop="odv"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="催收员"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="5"
        prop="collectTimes"
        label="跟进次数"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="5"
        prop="distributeTime"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="案件分配时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="5"
        prop="proRepayAmtMsg"
        label="承诺还款金额"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="5"
        prop="bankAmtMsg"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        align="center"
        label="待银行查账金额"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="5"
        prop="enRepayAmtMsg"
        align="center"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        label="已还金额"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="5"
        prop="accountAge"
        label="逾期账龄"
        sortable="custom"
        :sort-orders="['ascending','descending']"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="5"
        prop="distributeHistory"
        sortable="custom"
        align="center"
        :sort-orders="['ascending','descending']"
        label="分配历史"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        min-width="5"
        prop="collectInfo"
        sortable="custom"
        align="center"
        :sort-orders="['ascending','descending']"
        label="催收小结"
        show-overflow-tooltip>
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
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" label-width="120px">
        <div class="grid-content bg-purple">
          <el-form-item label="添加评语" :rules="{required: true, message: '评语不能为空', trigger: 'blur'}">
            <el-input type=textarea style="width: 200%;" v-model="value12" placeholder="请输入评语"></el-input>
          </el-form-item>
        </div>
      </el-form>

      <span slot="footer" class="footer">
    <el-button @click="detailVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="sureAddShow('formInline')">确 定</el-button>
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
            <el-select v-model="fenan.odv" filterable placeholder="请选择催收员" clearable>
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
            <el-select v-model="fenan.odv" filterable placeholder="请选择催收员" clearable>
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
                        prop="importLeave" :rules="{required: true, message: '请选择案件等级', trigger: 'blur'}">
            <el-select v-model=" formInline1.importLeave" filterable placeholder="请选择案件等级" clearable>
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
      <el-form :inline="true" ref="formInline1" :model="formInline1" class="demo-form-inline" label-width="120px">
        <div class="grid-content bg-purple">
          <el-form-item label="催收状态"
                        prop="collectStatus"
                        :rules="{required: true, message: '请选择催收状态', trigger: 'blur'}">
            <el-select v-model="formInline1.collectStatus" filterable placeholder="请选择催收状态" clearable>
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
                        :rules="{required: true, message: '请选择催收区域', trigger: 'blur'}">
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
      title="修改提成值"
      class="dialog-wrap"
      :visible.sync="detailVisible7"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form :inline="true" ref="formInline1" :model="formInline1" class="demo-form-inline" label-width="120px">
        <div class="grid-content bg-purple">
          <el-form-item label="提成值"
                        prop="collectStatus"
                        :rules="{required: true, message: '请选择提成值', trigger: 'blur'}">
            <el-input v-model="formInline1.mVal" style="width: 100%;" placeholder="请输入提成值" rows="4"></el-input>
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
      <el-form :model="addSynergyForm" class="demo-form-inline" label-width="120px">
        <div class="grid-content bg-purple">
          <el-form-item label="协催类型">
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
            <el-input type="textarea" v-model="addSynergyForm.value" style="width: 100%;" placeholder="请输入"
                      rows="4"></el-input>
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
      center
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
    <el-button @click="dialogVisibleCase = false">取 消</el-button>
    <el-button type="primary" @click="changeRadio">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
      title="查询条件配置"
      :visible.sync="showQueryConfVisible"
      width="60%"
      center
    >
      <el-row class="pad">

        <el-checkbox v-model="queryConf.csqy" label="1">催收区域</el-checkbox>
        <el-checkbox v-model="queryConf.pc" label="2">批次</el-checkbox>
        <el-checkbox v-model="queryConf.wtf" label="3">委托方</el-checkbox>
        <el-checkbox v-model="queryConf.ajlx" label="4">案件类型</el-checkbox>
        <el-checkbox v-model="queryConf.warq" label="5">委案日期</el-checkbox>

        <el-checkbox v-model="queryConf.cjh" label="1">车架号</el-checkbox>
        <el-checkbox v-model="queryConf.pzh" label="2">牌照号</el-checkbox>
        <el-checkbox v-model="queryConf.cssb" label="3">催收手别</el-checkbox>
        <el-checkbox v-model="queryConf.xm" label="4">姓名</el-checkbox>
        <el-checkbox v-model="queryConf.dah" label="5">档案号</el-checkbox>

        <el-checkbox v-model="queryConf.zh" label="1">账号</el-checkbox>
        <el-checkbox v-model="queryConf.khh" label="2">开户行</el-checkbox>
        <el-checkbox v-model="queryConf.aj" label="4">案件ID</el-checkbox>
        <el-checkbox v-model="queryConf.waje" label="5">委案金额</el-checkbox>

        <el-checkbox v-model="queryConf.yqts" label="1">逾期天数</el-checkbox>
        <el-checkbox v-model="queryConf.kh" label="2">卡号</el-checkbox>
        <el-checkbox v-model="queryConf.gaxlh" label="3">个案序列号</el-checkbox>
        <el-checkbox v-model="queryConf.zjh" label="4">证件号</el-checkbox>
        <el-checkbox v-model="queryConf.csjl" label="5">催收记录</el-checkbox>

        <el-checkbox v-model="queryConf.bm" label="1">部门</el-checkbox>
        <el-checkbox v-model="queryConf.csy" label="2">催收员</el-checkbox>
        <el-checkbox v-model="queryConf.bbzt" label="3">报备状态</el-checkbox>
        <el-checkbox v-model="queryConf.jmzt" label="4">减免状态</el-checkbox>

        <el-checkbox v-model="queryConf.ajzt" label="5">案件状态</el-checkbox>
        <el-checkbox v-model="queryConf.yqzl" label="5">逾期账龄</el-checkbox>
        <el-checkbox v-model="queryConf.cszt" label="5">催收状态</el-checkbox>
        <el-checkbox v-model="queryConf.bszt" label="5">标色状态</el-checkbox>
        <el-checkbox v-model="queryConf.dq" label="5">地区</el-checkbox>
        <el-checkbox v-model="queryConf.fpzt" label="5">分配状态</el-checkbox>
        <el-checkbox v-model="queryConf.pcgz" label="5">批次共债</el-checkbox>
        <el-checkbox v-model="queryConf.hkrq" label="5">还款日期</el-checkbox>
        <el-checkbox v-model="queryConf.warq" label="5">委案日期</el-checkbox>
        <el-checkbox v-model="queryConf.yjtarq" label="5">预计退案日期</el-checkbox>
        <el-checkbox v-model="queryConf.sjtarq" label="5">实际退案日期</el-checkbox>
        <el-checkbox v-model="queryConf.zhgjrq" label="5">最后跟进日期</el-checkbox>

      </el-row>
      <span slot="footer" class="footer">
        <el-button @click="showQueryConfVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveConf">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="导出选择"
      :visible.sync="showExportTelConfVisible"
      width="60%"
      center
    >
      <div style="margin-bottom: 10px;"><span @click="selectAllTelExport" style="cursor: pointer;">全选</span></div>
      <el-row class="pad" ref="boxWrapper">

        <el-checkbox v-model="exportTelConf.seqno" label="2">个案序列号</el-checkbox>
        <el-checkbox v-model="exportTelConf.name" label="3">姓名</el-checkbox>
        <el-checkbox v-model="exportTelConf.cardNo" label="3">卡号</el-checkbox>
        <el-checkbox v-model="exportTelConf.identNo" label="3">证件号</el-checkbox>
        <el-checkbox v-model="exportTelConf.archiveNo" label="1">档案号</el-checkbox>
        <el-checkbox v-model="exportTelConf.account" label="1">账号</el-checkbox>
        <el-checkbox v-model="exportTelConf.accountAge" label="4">逾期账龄</el-checkbox>
        <el-checkbox v-model="exportTelConf.caseDate" label="5">委案日期</el-checkbox>
        <el-checkbox v-model="exportTelConf.telName" label="2">电话姓名</el-checkbox>
        <el-checkbox v-model="exportTelConf.telStatusMsg" label="4">电话状态</el-checkbox>
        <el-checkbox v-model="exportTelConf.tel" label="5">电话号码</el-checkbox>
        <el-checkbox v-model="exportTelConf.telType" label="5">电话类型</el-checkbox>
        <el-checkbox v-model="exportTelConf.relation" label="5">关系</el-checkbox>
        <el-checkbox v-model="exportTelConf.remark" label="5">电话备注</el-checkbox>
      </el-row>
      <span slot="footer" class="footer">
        <el-button @click="showExportTelConfVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportTel">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="导出选择"
      :visible.sync="showExportCollectConfVisible"
      width="60%"
      center
    >
      <div style="margin-bottom: 10px;"><span @click="selectAllCollectExport" style="cursor: pointer;">全选</span></div>
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
        <el-button type="primary" @click="exportCollect">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="导出选择"
      :visible.sync="showExportConfVisible"
      width="60%"
      center
    >
      <div style="margin-bottom: 10px;"><span @click="selectAllExport" style="cursor: pointer;">全选</span></div>
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
        <el-checkbox v-model="exportConf.dept" label="4">部门</el-checkbox>
        <el-checkbox v-model="exportConf.province" label="5">省份</el-checkbox>
        <el-checkbox v-model="exportConf.city" label="5">城市</el-checkbox>
        <el-checkbox v-model="exportConf.county" label="5">区县</el-checkbox>
        <el-checkbox v-model="exportConf.birthday" label="5">生日</el-checkbox>

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
        <el-button type="primary" @click="exportCase">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  //import CaseDetail from './detail'
  const CaseDetail = () => import('@/views/data-manage/detail');
  import {
    dataList,
    getSynergyTypeList,
    LeaveList,
    saveSelectFilter,
    selectByModule,
    areaList,
    batchList,
    caseTypeList,
    addressList,
    TellList,
    collectStatusList,
    deleteStatusList,
    accountAgeList,
    clientList,
    EndList,
    PersonList,
    departmentList,
    searchList,
    fenan1,
    fenan2,
    addpingyu,
    caseStatus,
    deteleCase,
    colorList,
    addMValue,
    addCollectArea,
    addCollectStatus,
    addImportant,
    addSynergy,
    selectDataTel,
    selectDataCollect,
    pageDataExport,
    selectDataCaseExport,
    totalDataBatchExport
  } from '@/common/js/data-case-manage.js'

  export default {
    name: 'dataCaseManage',
    components: {
      CaseDetail
    },
    data() {
      return {
        radio: "1",
        formInline1: {},
        tableLoad: false,
        dialogVisibleCase: false,
        detailId: -1,
        showQueryConfVisible: false,
        showExportTelConfVisible: false,
        showExportCollectConfVisible:false,
        showExportConfVisible:false,
        exportTelConf: {},
        exportCollectConf: {},
        exportConf:{},
        queryConf: {},
        exportType: 0,
        queryConfFlag: true,
        addSynergyForm: {
          Synergytype: '',
          value: '',
          List: [
            {name: '投诉预警', id: 1}, {name: '地址查询', id: 2}, {name: '法院协催', id: 3}, {name: '社保查询', id: 4}, {
              name: '公安协催',
              id: 5
            }, {name: '争议咨询', id: 6}, {name: '移动查询', id: 7}, {name: '主管协催', id: 8}, {
              name: '客服咨询',
              id: 9
            }, {name: '电信查询', id: 10}, {name: "短信申请", id: 11}, {name: "退件查询", id: 12}
          ]
        },
        mVal: '',
        collectArea: '',
        collectStatus: '',
        importLeave: '',
        value12: '',
        images: {background: "url(" + require("./down.png") + ") repeat-x", padding: "8px 5px 3px 6px"},
        props: {
          label: 'name',
          value: 'id',
          children: 'children'
        },
        caseStatusList: [{name: "未退案", id: 0}, {name: "正常", id: 1}, {name: "暂停", id: 2}, {
          name: "关档",
          id: 3
        }, {name: "退档", id: 4}, {name: "全部", id: 5}],
        distributeStatusList: [{name: "已分配", id: 1}, {name: "未分配", id: 2}],
        shareList: [{name: "是", value: "true"}, {name: "否", value: 'false'}],
        departmentList: [],
        addressList: [],
        accountAgeList: [],
        collectStatusList: [],
        deleteStatusList: [],
        pageSize: 100,
        pageNum: 1,
        LeaveList: [],
        clientList: [],
        batchList: [],
        total: 0,
        pages: 1,
        orderBy: "id",
        sort: "desc",
        totalCaseNum: 0,
        totalAmt: 0,
        repayNum: 0,
        repayTotalAmt: 0,
        totalCp: 0,
        totalPtp: 0,
        deleteList: [],
        caseTypeList: [],
        areaList: [],
        formInline: {
          odvs: [],
          batchNos: [],
          clients: [],
          time1: [],
          time2: [],
          time3: [],
          time4: [],
          time5: [],
          time6: []
        },
        dialogVisible: false,
        tableData3: [],
        currentPage4: 1,
        TellList: [],
        EndList: [],
        PersonList: [],
        form: {
          time: []
        },
        val14_data: [
          {
            label: '正常',
            value: '黑'
          },
          {
            label: '红色',
            value: '红'
          },
          {
            label: '蓝色',
            value: '蓝'
          },
          {
            label: '橙色',
            value: '橙'
          },
          {
            label: '紫色',
            value: '紫'
          },
          {
            label: '棕色',
            value: '棕'
          },
        ],
        addSynergyFormList: [],
        detailVisible4: false,
        detailVisible5: false,
        detailVisible6: false,
        detailVisible7: false,
        detailVisible3: false,
        detailVisible2: false,
        detailVisible: false,
        detailVisible8: false,
        detailVisible9: false,
        detailTitle: '案件详情',
        fenan: {odv: ''},
        loading2: false,
        fullscreenLoading: false
      }
    },
    methods: {
      saveConf() {
        this.showQueryConfVisible = false;
        let queryObj = {module: "data-case-manage", menu: this.queryConf}
        saveSelectFilter(queryObj).then(data => {
          this.$message({
            message: "配置成功",
            type: "success"
          });
          this.queryConfList();
        });
      },
      saveExportCaseConf() {
        let queryObj = {module: "data-case-manage-exportCase", menu: this.exportConf}
        saveSelectFilter(queryObj).then(data => {
        });
      },
      queryExportCaseConfList() {
        let queryObj = {module: "data-case-manage-exportCase", menu: this.exportConf}
        selectByModule(queryObj).then(data => {
          if (data) {
            this.exportConf = JSON.parse(data.menu);
          }
        });
      },
      saveExportTelConf() {
        let queryObj = {module: "data-case-manage-exportTel", menu: this.exportTelConf}
        saveSelectFilter(queryObj).then(data => {
        });
      },
      queryExportTelConfList() {
        let queryObj = {module: "data-case-manage-exportTel", menu: this.exportTelConf}
        selectByModule(queryObj).then(data => {
          if (data) {
            this.exportTelConf = JSON.parse(data.menu);
          }
        });
      },
      saveExportCollectConf() {
        let queryObj = {module: "data-case-manage-exportCollect", menu: this.exportCollectConf}
        saveSelectFilter(queryObj).then(data => {
        });
      },
      queryExportCollectConfList() {
        let queryObj = {module: "data-case-manage-exportCollect", menu: this.exportCollectConf}
        selectByModule(queryObj).then(data => {
          if (data) {
            this.exportCollectConf = JSON.parse(data.menu);
          }
        });
      },


      queryConfList() {
        let queryObj = {module: "data-case-manage", menu: this.queryConf}
        selectByModule(queryObj).then(data => {
          if (data) {
            this.queryConf = JSON.parse(data.menu);
            this.queryConfFlag = false;
          } else {
            this.queryConfFlag = true;
          }
        });
      },
      showQueryConf() {
        this.showQueryConfVisible = true;
      },
      changeRadio() {
        if (this.radio == 1) {
          this.exportType = 2;
        } else {
          this.exportType = 3;
        }
        this.dialogVisibleCase = false;
        this.queryExportCaseConfList();
        this.showExportConfVisible = true;
      },
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
            return false;
          }
        });
      },
      submitmsgForm5(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.sureAddShow5()
          } else {

            return false;
          }
        });
      },
      submitmsgForm6(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.sureAddShow6()
          } else {
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
      rowColor({row}) {
        return `color_${row.color}`;
      },
      guanlianjian(command) {
        if (this.deleteList.length >= 1) {
          let datasList = []
          for (var i = 0; i < this.deleteList.length; i++) {
            let dataObject = {id: '', status: command}
            dataObject.id = this.deleteList[i].id
            datasList.push(dataObject)
          }
          if (command === "1") {
            this.$confirm('是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              caseStatus(datasList).then((response) => {
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                });
                this.search()
              })
            }).catch(() => {

            });

          } else if (command === "2") {
            this.$confirm('是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              caseStatus(datasList).then((response) => {
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                });
                this.search()
              })
            }).catch(() => {

            });
          } else if (command === "3") {
            this.$confirm('是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              caseStatus(datasList).then((response) => {
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                });
                this.search()
              })
            }).catch(() => {

            });
          } else if (command === "4") {
            this.$confirm('是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              caseStatus(datasList).then((response) => {
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                });
                this.search()
              })
            }).catch(() => {

            });
          } else {
            this.$confirm('是否删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              deteleCase(this.deleteList).then((response) => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.search()
              })
            }).catch(() => {

            });


          }
        } else {
          this.$message({
            type: 'error',
            message: '请选择数据!'
          });
        }

      },
      handleExport(command) {

        if (command === "exportTotalCase") {
          this.dialogVisibleCase = true
        } else if (command === "exportSelectCase") {
          if (this.deleteList.length >= 1) {
            this.queryExportCaseConfList();
            this.showExportConfVisible = true;
            this.exportType = 1;
          } else {
            this.$message({
              type: 'info',
              message: '请选择需要导出的数据!'
            });
          }
        } else if (command === "exportTel") {
          if (this.deleteList.length >= 1) {
            this.queryExportTelConfList();
            this.showExportTelConfVisible = true;
          } else {
            this.$message({
              type: 'info',
              message: '请选择需要导出的数据!'
            });
          }

        } else if (command === "exportCollect") {
          if (this.deleteList.length >= 1) {
            this.queryExportCollectConfList();
            this.showExportCollectConfVisible = true;
          } else {
            this.$message({
              type: 'info',
              message: '请选择需要导出的数据!'
            });
          }

        }

      },
      handleCommand(command) {

        if (this.deleteList.length >= 1) {
          if (command === "important") {
            this.detailVisible4 = true
          } else if (command === "collectStatus") {
            this.detailVisible5 = true
          } else if (command === "collectArea") {
            this.detailVisible6 = true
          } else {
            this.detailVisible7 = true
          }
        } else {
          this.$message({
            type: 'error',
            message: '请选择数据!'
          });
        }

      },
      biaose(a) {
        let datasList = []
        for (var i = 0; i < this.deleteList.length; i++) {
          let dataObject = {id: '', color: a}
          dataObject.id = this.deleteList[i].id
          datasList.push(dataObject)
        }
        if (this.deleteList.length >= 1) {
          colorList(datasList).then((response) => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.search()
          })

        } else {
          this.$message({
            type: 'error',
            message: '请选择数据!'
          });
        }
      },
      fenancheck(command) {
        if (command === "a") {
          if (this.deleteList.length >= 1) {
            this.detailVisible3 = true
          } else {
            this.$message({
              type: 'error',
              message: '请选择数据!'
            });
          }

        } else {
          this.detailVisible8 = true
        }
      },
      totalDataExport() {
        this.loading2 = true
        this.fullscreenLoading = true
        let startTime = this.formInline.time2[0]
        let endTime = this.formInline.time2[1]
        this.formInline.exportConf = this.exportConf
        totalDataBatchExport(this.formInline).then((response) => {
          this.loading2 = false
          this.fullscreenLoading = false
          this.$message({
            type: 'success',
            message: '导出成功!'
          });
        })
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
      pageDataExport() {
        this.loading2 = true
        this.fullscreenLoading = true
        let startTime = this.formInline.time2[0]
        let endTime = this.formInline.time2[1]
        this.formInline.exportConf = this.exportConf
        pageDataExport(this.formInline).then((response) => {
          this.loading2 = false
          this.fullscreenLoading = false
          this.$message({
            type: 'success',
            message: '导出成功!'
          });
        })
      },
      selectAllExport(){
        this._selectAllInit('exportConf');
        for(var p in this.exportConf){//遍历json对象的每个key/value对,p为key
          this.exportConf[p] = true;
        }
      },
      exportCase(){
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
        this.saveExportCaseConf();
          if (this.exportType == 1){
            this.exportSelectCase();
          }else if (this.exportType == 2){
            this.totalDataExport();
          }else if (this.exportType == 3){
            this.pageDataExport();
          }
          this.showExportConfVisible = false;
      },
      exportSelectCase() {
        let datasList = []
        if (this.deleteList.length >= 1) {
          for (var i = 0; i < this.deleteList.length; i++) {
            datasList.push(this.deleteList[i].id)
          }
          this.loading2 = true
          this.fullscreenLoading = true
          selectDataCaseExport(datasList,this.exportConf).then((response) => {
            this.loading2 = false
            this.fullscreenLoading = false
          })
        } else {
          this.$message({
            type: 'info',
            message: '请选择数据!'
          });
        }
        this.showExportConfVisible = false;
      },
      selectAllTelExport(){
        this._selectAllInit('exportTelConf');
        for(var p in this.exportTelConf){//遍历json对象的每个key/value对,p为key
          this.exportTelConf[p] = true;
        }
      },
      exportTel() {
        let successNum = 0;
        for (var p in this.exportTelConf) {//遍历json对象的每个key/value对,p为key
          if (this.exportTelConf[p]) {
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
        let datasList = []
        let _self = this;
        if (this.deleteList.length >= 1) {
          for (var i = 0; i < this.deleteList.length; i++) {
            datasList.push(this.deleteList[i].id)
          }
          this.loading2 = true
          this.fullscreenLoading = true
          selectDataTel(datasList,this.exportTelConf).then((response) => {
            this.loading2 = false
            this.fullscreenLoading = false
          })
          this.saveExportTelConf();
        } else {
          _self.$message({
            type: 'info',
            message: '请选择需要导出的数据!'
          });
        }
        this.showExportTelConfVisible = false;
      },
      selectAllCollectExport(){
        this._selectAllInit('exportCollectConf');
        for(var p in this.exportCollectConf){//遍历json对象的每个key/value对,p为key
          this.exportCollectConf[p] = true;
        }
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
          this.loading2 = false
          return;
        }
        let datasList = []
        let _self = this;
        if (this.deleteList.length >= 1) {
          for (var i = 0; i < this.deleteList.length; i++) {
            datasList.push(this.deleteList[i].id)
          }
          this.loading2 = true
          this.fullscreenLoading = true
          selectDataCollect(datasList,this.exportCollectConf).then((response) => {
            this.loading2 = false
            this.fullscreenLoading = false
          })
          this.saveExportCollectConf();
        } else {
          _self.$message({
            type: 'info',
            message: '请选择需要导出的数据!'
          });
        }
        this.showExportCollectConfVisible = false
      },
      fenancheckone() {
        let datasList = []
        for (var i = 0; i < this.deleteList.length; i++) {
          let dataObject = {id: '', odv: this.fenan.odv}
          dataObject.id = this.deleteList[i].id
          datasList.push(dataObject)
        }
        fenan1(datasList).then((response) => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.detailVisible3 = false
          this.fenan.odv = ''
          this.search()
        })
      },
      fenanchecktwo() {
        console.log('12', this.fenan.odv)
        fenan2(this.formInline, this.fenan.odv).then((response) => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.detailVisible8 = false
          this.fenan.odv = ''
          this.search()
        })
      },
      sureAddShow7() {
        let datasList = []
        for (var i = 0; i < this.deleteList.length; i++) {
          let dataObject = {id: '', mVal: this.formInline1.mVal}
          dataObject.id = this.deleteList[i].id
          datasList.push(dataObject)
        }
        addMValue(datasList).then((response) => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.detailVisible7 = false
          this.mVal = ''
          this.search()
        })


      },
      sureAddShow6() {
        let datasList = []
        for (var i = 0; i < this.deleteList.length; i++) {
          let dataObject = {id: '', collectArea: this.formInline1.collectArea}
          dataObject.id = this.deleteList[i].id
          datasList.push(dataObject)
        }
        addCollectArea(datasList).then((response) => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.detailVisible6 = false
          this.collectArea = ''
          this.search()
        })

      },
      sureAddShow5() {
        let datasList = []
        for (var i = 0; i < this.deleteList.length; i++) {
          let dataObject = {id: '', collectStatus: this.formInline1.collectStatus}
          dataObject.id = this.deleteList[i].id
          datasList.push(dataObject)
        }
        addCollectStatus(datasList).then((response) => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.detailVisible5 = false
          this.collectStatus = ''
          this.search()
        })

      },
      sureAddShow4() {
        let datasList = []
        for (var i = 0; i < this.deleteList.length; i++) {
          let dataObject = {id: '', important: this.formInline1.importLeave}
          dataObject.id = this.deleteList[i].id
          datasList.push(dataObject)
        }
        addImportant(datasList).then((response) => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.detailVisible4 = false
          this.fimportLeave = ''
          this.search()
        })
      },
      addshow() {
        if (this.deleteList.length >= 1) {
          this.detailVisible2 = true
        } else {
          this.$message({
            type: 'error',
            message: '请选择数据!'
          });
        }
      },
      sureAddShow(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let datasList = []
            for (var i = 0; i < this.deleteList.length; i++) {
              let dataObject = {id: '', comment: this.value12}
              dataObject.id = this.deleteList[i].id
              datasList.push(dataObject)
            }
            addpingyu(datasList).then((response) => {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.detailVisible2 = false
              this.fenan.value12 = ''
              this.search()
            })
          } else {
            return false;
          }
        });

      },
      xiecui() {
        if (this.deleteList.length >= 1) {
          this.detailVisible9 = true
        } else {
          this.$message({
            type: 'error',
            message: '请选择数据!'
          });
        }
      },
      addSynergyFormType() {
        let datasList = []
        for (var i = 0; i < this.deleteList.length; i++) {
          let dataObject = {
            id: '',
            synergyType: this.addSynergyForm.Synergytype,
            synergyContext: this.addSynergyForm.value
          }
          dataObject.id = this.deleteList[i].id
          datasList.push(dataObject)
        }
        addSynergy(datasList).then((response) => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.detailVisible9 = false
          this.addSynergyForm.Synergytype = ''
          this.addSynergyForm.value = ''
          this.search()
        })
      },
      searchdataList(form) {
        this.formInline.orderBy = this.orderBy;
        this.formInline.sort = this.sort;
        this.tableLoad = true
        dataList(this.formInline).then((response) => {
          this.totalCaseNum = response.totalCaseNum
          this.totalAmt = this.formatMoney(response.totalAmt, 0, "￥")
          this.repayTotalAmt = this.formatMoney(response.repayTotalAmt, 0, "￥")
          this.repayNum = response.repayNum
          this.totalCp = this.formatMoney(response.totalCp, 0, "￥")
          this.totalPtp = this.formatMoney(response.totalPtp, 0, "￥")
          this.tableData3 = response.pageInfo.list
          //this.pages = response.pages
          this.total = response.pageInfo.total
          this.dialogVisible = false
          this.tableLoad = false
        })
      },
      handleSelectionChange(row) {
        let _self = this
        _self.deleteList = []
        row.forEach(function (currentValue, index, arr) {
          let Object = {"id": ""}
          Object.id = currentValue.id
          _self.deleteList.push(Object)
        })
        console.log(_self.deleteList)
      },
      handleSort({column, prop, order}) {
        this.sort = order == null ? "desc" : order.replace("ending", "")
        this.orderBy = prop == null ? "id" : prop

        this.tableLoad = true
        searchList(this.formInline, this.orderBy, this.sort, this.pageSize, this.pageNum).then((response) => {
          this.totalCaseNum = response.totalCaseNum
          this.totalAmt = this.formatMoney(response.totalAmt, 0, "￥")
          this.repayTotalAmt = this.formatMoney(response.repayTotalAmt, 0, "￥")
          this.repayNum = response.repayNum
          this.totalCp = this.formatMoney(response.totalCp, 0, "￥")
          this.totalPtp = this.formatMoney(response.totalPtp, 0, "￥")
          this.tableData3 = response.pageInfo.list

          //this.pages = response.pages
          this.total = response.pageInfo.total
          this.tableLoad = false
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.search()
      },
      search() {
        this.tableLoad = true
        searchList(this.formInline, this.orderBy, this.sort, this.pageSize, this.pageNum).then((response) => {
          this.totalCaseNum = response.totalCaseNum
          this.totalAmt = this.formatMoney(response.totalAmt, 0, "￥")
          this.repayTotalAmt = this.formatMoney(response.repayTotalAmt, 0, "￥")
          this.repayNum = response.repayNum
          this.totalCp = this.formatMoney(response.totalCp, 0, "￥")
          this.totalPtp = this.formatMoney(response.totalPtp, 0, "￥")
          this.tableData3 = response.pageInfo.list

          //this.pages = response.pages
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
      resetFormInline() {
        this.formInline = {
          odvs: [],
          batchNos: [],
          clients: [],
          time1: [],
          time2: [],
          time3: [],
          time4: [],
          time5: [],
          time6: []
        }
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
      showDetail(row) {
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
        this.$router.push({
          path: 'case-detail',
          query: {
            id,
            name,
            seqNo
          }
        })
      }
    },
    created() {
      this.queryConfList();
      this.tableLoad = true
      searchList(this.formInline, this.orderBy, this.sort, this.pageSize, this.pageNum).then((response) => {
        this.tableData3 = response.pageInfo.list
        this.totalCaseNum = response.totalCaseNum
        this.totalAmt = this.formatMoney(response.totalAmt, 0, "￥")
        this.repayTotalAmt = this.formatMoney(response.repayTotalAmt, 0, "￥")
        this.repayNum = response.repayNum
        this.totalCp = this.formatMoney(response.totalCp, 0, "￥")
        this.totalPtp = this.formatMoney(response.totalPtp, 0, "￥")
        this.total = response.pageInfo.total
        this.tableData3 = response.pageInfo.list.map((item) => {
          return Object.assign(item, {'class-name': `color_${item.color}`});
        })
        this.tableLoad = false
      })
      areaList().then((response) => {
        this.areaList = response
      })
      caseTypeList().then((response) => {
        this.caseTypeList = response
      })
      clientList().then((response) => {
        this.clientList = response
      })
      batchList().then((response) => {
        this.batchList = response;
      })
      EndList().then((response) => {
        this.EndList = response
      })
      PersonList().then((response) => {
        this.PersonList = response
        this.form.PersonList = response
      })
      departmentList().then((response) => {
        this.departmentList = response
      })
      accountAgeList().then((response) => {
        this.accountAgeList = response
      })
      collectStatusList().then((response) => {
        this.collectStatusList = response
      })
      deleteStatusList().then((response) => {
        this.deleteStatusList = response
      })
      TellList().then((response) => {
        this.TellList = response
      })
      addressList().then((response) => {
        this.addressList = response
      })
      LeaveList().then((response) => {
        this.LeaveList = response
      })
      getSynergyTypeList().then((response) => {
        this.addSynergyFormList = response
      })

    },
  }
</script>

<style lang="scss">
  #data-case-manage {
    .pagination-wrap {
      position: fixed;
      bottom: 0;
      z-index: 100;
      min-height: 40px;
      background-color: white;
      width: 100%;
    }

    .pad {
      .el-checkbox {
        width: 24%;
        margin-right: 0px;
      }
    }

    .el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__labe
    .el-form--inline .el-form-item {
      margin-right: -10px;
      line-height: 21px;
    }

    .el-loading-spinner .el-loading-text {
      font-size: 18px;
    }

    .el-table__body-wrapper {
      height: calc(100% - 74px);
    }

    .el-dialog__header {
      background-color: #f8f8f8;

    }

    .textColor {
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

    .color_ZONG {
      color: #D2B48C;
    }
  }

  .data-case-condition-wrap {
    height: 350px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>
