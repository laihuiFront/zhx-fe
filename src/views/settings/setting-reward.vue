<template>
  <div id="setting-reward" class="page-wraper-sub"
       v-loading="loading"
       element-loading-text="拼命加载中"
       v-loading.fullscreen.lock="fullscreenLoading"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.7)">
    <el-tabs v-model="activeName" class="tabs-wrap">
      <el-tab-pane label="业务员、经理" name="tab1"
                   style="height: 100%"
      >

        <div class="buttons">
          <el-button type="primary" @click="onclickSave">保存</el-button>
        </div>

        <el-table v-loading="tableLoad" ref="tab1"
                  :data="dataList"
                  border
                  :header-cell-style="discountHeaderStyle1"
                  height="1"
                  class="table-wrap">
          <el-table-column
            prop="client"
            align="center"
            label="条线"
          >
          </el-table-column>

          <el-table-column label="业务员提成" align="center">

            <el-table-column
              prop="odvLowMsg"
              label="基础提成"
              min-width="100"
              align="center"
            >
              <template slot-scope="scope">
          <span v-if="scope.row.id ===108 && scope.row.editType==='edit'">
             委案金额 <el-input align="center" v-model="scope.row.odvLowMsg"></el-input>%<br>
             超过委案金额 <el-input align="center" v-model="scope.row.odvReward2Msg"></el-input>%
           </span>
                <span v-if="scope.row.id ===108&& scope.row.editType!='edit'">
              委案金额 {{scope.row.odvLowMsg}}%<br>
              超过委案金额 {{scope.row.odvReward2Msg}}%
           </span>
                <el-input
                  v-if="scope.row.editType==='edit' && scope.row.id !=108"
                  align="center"
                  v-model="scope.row.odvLowMsg"
                ></el-input>
                <span v-if="scope.row.id !=108 && scope.row.editType!='edit'">{{scope.row.odvLowMsg}}</span>
                <span v-if="scope.row.enable ==='阶梯累加'">%</span>
                <span v-if="scope.row.enable ==='特殊2'">元/户</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="odvBasicMsg"
              label="低标"
              width="100"
              align="center"
            >
              <template slot-scope="scope">
           <span v-if="scope.row.id ===108 && scope.row.editType==='edit'">
             <el-input align="center" v-model="scope.row.odvBasicMsg"></el-input>
           </span>
                <span v-if="scope.row.id ===108&& scope.row.editType!='edit'">
              {{scope.row.odvRewardMsg}}
           </span>
                <el-input
                  v-if="scope.row.editType==='edit' && scope.row.id !=108"
                  align="center"
                  v-model="scope.row.odvBasicMsg"
                ></el-input>
                <span v-if="scope.row.editType!='edit' && scope.row.id !=108">{{scope.row.odvBasicMsg}}</span>
                <span v-if="scope.row.enable ==='特殊2'">户</span>
                <span v-else>万</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="odvRewardMsg"
              label="低标提成"
              min-width="170"
              align="center"
            >
              <template slot-scope="scope">
           <span v-if="scope.row.id ===108 && scope.row.editType==='edit'">
             委案金额 <el-input align="center" v-model="scope.row.odvRewardMsg"></el-input>%<br>
             超过委案金额 <el-input align="center" v-model="scope.row.odvReward3Msg"></el-input>%
           </span>
                <span v-if="scope.row.id ===108 && scope.row.editType!='edit'">
              委案金额 {{scope.row.odvRewardMsg}}%<br>
              超过委案金额 {{scope.row.odvReward3Msg}}%
           </span>
                <span v-if="scope.row.id !=108 && scope.row.id !=110 && scope.row.editType==='edit'">
              <el-input align="center" v-model="scope.row.odvRewardMsg"></el-input>%<br>
           </span>
                <span v-if="scope.row.id !=108 && scope.row.id !=110 && scope.row.editType !='edit'">
              {{scope.row.odvRewardMsg}}%
           </span>
                <span v-if="(scope.row.id===110 || scope.row.id===170) && scope.row.editType==='edit'">
             <el-input align="center" v-model="scope.row.odvRewardRange1Msg"></el-input>%≤综合户达率<<el-input align="center"
                                                                                                          v-model="scope.row.odvRewardRange2Msg"></el-input>%  <el-input
                  align="center" v-model="scope.row.odvRewardMsg"></el-input>元/户<br>
             <el-input align="center" v-model="scope.row.odvRewardRange2Msg"></el-input>%≤综合户达率<<el-input align="center"
                                                                                                          v-model="scope.row.odvRewardRange4Msg"></el-input>%  <el-input
                  align="center" v-model="scope.row.odvReward2Msg"></el-input>元/户<br>
             综合户达率≥<el-input align="center" v-model="scope.row.odvRewardRange4Msg"></el-input>%  <el-input
                  align="center" v-model="scope.row.odvReward3Msg"></el-input>元/户
           </span>
                <span v-if="(scope.row.id===110 || scope.row.id===170) && scope.row.editType!='edit'">
             {{scope.row.odvRewardRange1Msg}}%≤综合户达率<{{scope.row.odvRewardRange2Msg}}%  {{scope.row.odvRewardMsg}}元/户<br>
             {{scope.row.odvRewardRange2Msg}}%≤综合户达率<{{scope.row.odvRewardRange4Msg}}%  {{scope.row.odvReward2Msg}}元/户<br>
             综合户达率≥{{scope.row.odvRewardRange4Msg}}%  {{scope.row.odvReward3Msg}}元/户
           </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="odvHighBasicMsg"
              label="高标"
              width="80"
              align="center">
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.editType==='edit' && scope.row.id!=110 && scope.row.id!=170 &&　scope.row.enable != '特殊1'"
                  align="center"
                  v-model="scope.row.odvHighBasicMsg"
                ></el-input>
                <span
                  v-if="scope.row.editType!='edit' && scope.row.id!=110 && scope.row.id!=170  &&　scope.row.enable != '特殊1'">{{scope.row.odvHighBasicMsg}}</span>
                <span v-if="scope.row.id!=110 && scope.row.id!=170  &&　scope.row.enable != '特殊1'">万</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="odvHighRewardMsg"
              label="高标提成"
              width="80"
              align="center">
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.editType==='edit'  &&  scope.row.id!=110 && scope.row.id!=170 &&　scope.row.enable != '特殊1'"
                  align="center"
                  v-model="scope.row.odvHighRewardMsg"
                ></el-input>
                <span
                  v-if="scope.row.editType!='edit' &&  scope.row.id!=110 && scope.row.id!=170 &&　scope.row.enable != '特殊1'">{{scope.row.odvHighRewardMsg}}</span>
                <span v-if="scope.row.id!=110 && scope.row.id!=170 &&　scope.row.enable != '特殊1'">%</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop="manageRewardMsg"
            label="经理提成"
            min-width="180"
            align="center"
          >
            <el-table-column
              prop="manageMethod"
              label="提成方式"
              align="center"
            >
              <template slot-scope="scope">
                <el-select class="selectClass" v-if="scope.row.editType==='edit' && scope.row.id!=110"
                           v-model="scope.row.manageMethod" placeholder="请选择提成方式">
                  <el-option
                    v-for="item in methodList"
                    :key="item.id"
                    :label="item.userName"
                    :value="item.id">
                  </el-option>
                </el-select>
                <span v-if="scope.row.editType!='edit' && scope.row.id!=110">{{scope.row.manageMethod}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="odvBasicMsg"
              label="提成"
              min-width="230"
              align="center"
            >
              <template slot-scope="scope">
          <span v-if="scope.row.editType==='edit' &&  scope.row.id!=110 && scope.row.id!=170">
            <el-input align="center" v-model="scope.row.manageRewardMsg"></el-input>
            低标
            过低标人数*
            <el-input align="center" v-model="scope.row.manageRewardRange1Msg"></el-input>元/人+过低标员工提成*
            <el-input align="center" v-model="scope.row.manageRewardRange2Msg"></el-input>%
          </span>
                <span v-if="scope.row.editType==='edit' &&  (scope.row.id===110 || scope.row.id===170)">
            上汽短期 综合户达率≥
            <el-input align="center" v-model="scope.row.manageRewardRange1Msg"></el-input>% 提成
            <el-input align="center" v-model="scope.row.manageRewardMsg"></el-input>元<br>
            安吉蓝海 综合户达率≥<el-input align="center" v-model="scope.row.manageRewardRange2Msg"></el-input>% 提成
            <el-input align="center" v-model="scope.row.manageRewardRange3Msg"></el-input>元<br>
            上汽短期 总回款完成率≥<el-input align="center" v-model="scope.row.manageRewardRange4Msg"></el-input>%
            提成<el-input align="center" v-model="scope.row.manageRewardRange5Msg"></el-input>元<br>
            以上3个指标全部达成  奖励<el-input align="center" v-model="scope.row.manageRewardRange6Msg"></el-input>元</span>
                <span v-if="scope.row.editType!='edit' &&  (scope.row.id===110 || scope.row.id===170)">上汽短期 综合户达率≥{{scope.row.manageRewardRange1Msg}}% 提成{{scope.row.manageRewardMsg}}元<br>
安吉蓝海 综合户达率≥{{scope.row.manageRewardRange2Msg}}% 提成{{scope.row.manageRewardRange3Msg}}元<br>上汽短期 总回款完成率≥{{scope.row.manageRewardRange4Msg}}% 提成{{scope.row.manageRewardRange5Msg}}元<br>以上3个指标全部达成  奖励{{scope.row.manageRewardRange6Msg}}元</span>
                <span v-if="scope.row.editType!='edit' &&  scope.row.id!=110 && scope.row.id!=170">{{scope.row.manageRewardMsg}}低标
过低标人数*{{scope.row.manageRewardRange1Msg}}元/人+过低标员工提成*{{scope.row.manageRewardRange2Msg}}%</span>
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column prop="address" label="操作" align="center" width="80">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="onClickEdit(scope.row)"
              >修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top:30px;text-align: center;">
          <span style="height: 100%;display: inline-flex;align-items: center;">提成说明: </span>
          <el-input type="textarea" label="提成说明" v-model="tips" style="width: 800px;" resize="none" placeholder="请输入提成说明" rows="6" maxlength="500"></el-input>
        </div>
      </el-tab-pane>
      <el-tab-pane id="directorTab" label="总监" name="tab2">
        <div class="buttons">
          <el-button type="primary" class="button" @click="onclickSave2">保存</el-button>
          <el-button type="primary" class="button" @click="setTableData()">重置</el-button>
        </div>

				<el-table v-loading="tableLoad2" :data="tableData" border style="width: 100%;" height="1">
					<el-table-column align="center" label="标准" prop="msg" >
            <template slot-scope="scope">
              <span v-if="scope.row.id===0">
                团队业务员提成＜<el-input class="inputAlign" v-model="dataList2.standard1Msg"></el-input>元
              </span>
              <span v-else-if="scope.row.id===1">
                <el-input class="inputAlign" v-model="dataList2.standard1Msg"></el-input>元≤团队业务员提成＜<el-input class="inputAlign" v-model="dataList2.standard2Msg"></el-input>元
              </span>
              <span v-else-if="scope.row.id===2">
                团队业务员提成≥<el-input class="inputAlign" v-model="dataList2.standard2Msg"></el-input>元
              </span>
            </template>
          </el-table-column>

					<el-table-column align="center" label="奖励金额" prop="reward">
            <template slot-scope="scope">
              <span v-if="scope.row.id===0">
                <el-input class="inputAlign" v-model="dataList2.reward1Msg"></el-input>（元/人）
              </span>
              <span v-else-if="scope.row.id===1">
                <el-input class="inputAlign" v-model="dataList2.reward2Msg"></el-input>（元/人）
              </span>
              <span v-else-if="scope.row.id===2">
                <el-input class="inputAlign" v-model="dataList2.reward3Msg"></el-input>（元/人）
              </span>
            </template>
          </el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>


<script>
  import {clientList, updatePercent, updateRemark, findRemark, clientList2, updateStandard} from '@/common/js/api-reward.js'

  export default {
    name: 'setting-reward',
    data() {
      return {
        tableLoad: false,
        detailVisible: false,
        tips: "",
        disableSave: true,
        activeName: "tab1",
        loading: false,
        methodList: [{"id": "按提成", "userName": "按提成"}, {"id": "按业绩", "userName": "按业绩"}],
        fullscreenLoading: false,
        dataList: [],
        dataList2: [],
        dataList2_temp: [],
        tableData: [],
        tableLoad2: false,
      }
    },
    watch:{
      activeName(){
       this.$nextTick(()=>{
         this.$refs.tab1.doLayout()
       })
      }

    },
    methods: {
      discountHeaderStyle1({row, column, rowIndex, columnIndex}) {
        if (rowIndex == 2) {
          return {display: 'none'}
        }
      },
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0) {
          if (rowIndex === 0 || rowIndex === 11) {
            return {
              rowspan: 1,
              colspan: 1
            };
          } else if (rowIndex === 1) {
            return {
              rowspan: 3,
              colspan: 1
            };
          } else if (rowIndex === 4) {
            return {
              rowspan: 5,
              colspan: 1
            };
          } else if (rowIndex === 9) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 1,
              colspan: 0
            };
          }
        } else if (columnIndex === 1) {
          if (rowIndex === 9) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else if (rowIndex === 10) {
            return {
              rowspan: 1,
              colspan: 0
            };
          } else {
            return {
              rowspan: 1,
              colspan: 1
            };
          }
        }
      },


      onclickSave() {
        updatePercent(this.dataList).then((response) => {
          updateRemark(this.tips).then((response) => {

          })
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
          clientList().then((response) => {
            this.dataList = response
          })

        })
      },
      onClickEdit(row) {
        row.editType = "edit";
        this.disableSave = false;

      },

      onClickEdit2(row) {
       row.editType = "edit";
      },

      onclickSave2() {
        if(isNaN(this.dataList2.standard1Msg) || isNaN(this.dataList2.standard2Msg) ||
            isNaN(this.dataList2.reward1Msg) || isNaN(this.dataList2.reward2Msg) || isNaN(this.dataList2.reward3Msg) ||
            Number(this.dataList2.standard1Msg) >= Number(this.dataList2.standard2Msg)){
          this.$message({
            type: 'error',
            message: '无效的数值'
          })
        }else{
          updateStandard(this.dataList2).then(response => {
            this.$message({
              type: "success",
              message: "保存成功!"
            });
            clientList2().then(response => {
              this.dataList2 = response;
            });
          });
        }
      },

     setTableData(data){
       if(data){
         this.dataList2 = Object.assign({}, data)
         this.dataList2_temp = Object.assign({}, data)
       }else{
         this.dataList2 = Object.assign({}, this.dataList2_temp)
       }
       this.tableData = [
					{
            id: 0,
						msg: `团队业务员提成<${this.dataList2.standard1Msg}元`,
            reward: `${this.dataList2.reward1Msg}（元/人）`,
            editType: null
					},
					{
            id: 1,
						msg: `${this.dataList2.standard1Msg}元≤团队业务员提成<${this.dataList2.standard2Msg}元`,
            reward: `${this.dataList2.reward2Msg}（元/人）`,
            editType: null
					},
					{
            id: 2,
						msg: `团队业务员提成≥${this.dataList2.standard2Msg}元`,
            reward: `${this.dataList2.reward3Msg}（元/人）`,
            editType: null
					}
        ]
     }
    },

     created() {
      clientList().then((response) => {
        this.dataList = response
      })
      findRemark().then((response) => {
        this.tips = response.remark
      })
      clientList2().then(response => {
        this.setTableData(response)
			});
    },
  }
</script>

<style lang="scss" scoped>
  #setting-reward {
    overflow-y: hidden !important;

    .tabs-wrap{
      height: 100%;
    }

    .el-input {
      width: 40px;
    }

    .selectClass .el-input {
      width: 100px !important;
      text-align: center;
    }

    .el-select .el-input__inner {
      text-align: center;
      width: 100px !important;
    }

    .el-input .el-input__inner {
      text-align: center;
      width: 40px;
      padding-left: 0px;
      padding-right: 0px;
    }

    .has-gutter .gutter {
      display: block !important;
    }

    #directorTab {
      .inputAlign{
        width: 60px;

         /deep/ .el-input__inner{
          width: 100%;
          padding: 0;
          text-align: center !important;
        }
      }
    }

    .buttons{
      margin-bottom: 10px;
      text-align: right;
    }
  }
</style>
