<template>
  <div id="setting-reward"
       v-loading="loading"
       element-loading-text="拼命加载中"
       v-loading.fullscreen.lock="fullscreenLoading"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.7)">
    <el-tabs v-model="activeName" class="tabs-wrap">
      <el-tab-pane label="业务员、经理" name="tab1" style="height: 100%">
        <div class="buttons">
          <el-button type="primary" @click="onclickSave">保存</el-button>
        </div>

        <el-table v-loading="tableLoad" ref="tab1"
                  :data="dataList"
                  border
                  highlight-current-row
                  :header-cell-style="discountHeaderStyle1">
          <el-table-column
            min-width="120"
            prop="client"
            align="center"
            label="条线"
          >
          </el-table-column>
          <el-table-column label="业务员提成" align="center">
            <el-table-column
              min-width="160"
              prop="odvLowMsg"
              label="基础提成"
              align="center"
            >
              <template slot-scope="scope">
                <span v-if="(scope.row.id ===108 || scope.row.id ===172) && scope.row.editType==='edit'">
                  <p>委案金额 <el-input align="center" v-model="scope.row.odvLowMsg"></el-input>%</p>
                  <p>超过委案金额 <el-input align="center" v-model="scope.row.odvReward2Msg"></el-input>%</p>
                </span>
                <span v-if="(scope.row.id ===108 || scope.row.id ===172)&& scope.row.editType!='edit'">
                  <p>委案金额 {{scope.row.odvLowMsg}}%</p>
                  <p>超过委案金额 {{scope.row.odvReward2Msg}}%</p>
                </span>
                <el-input
                  v-if="scope.row.editType==='edit' && scope.row.id !=108 && scope.row.id !=172"
                  align="center"
                  v-model="scope.row.odvLowMsg"
                ></el-input>
                <span v-if="scope.row.id !=108 && scope.row.id !=172 && scope.row.editType!='edit'">{{scope.row.odvLowMsg}}</span>
                <span v-if="scope.row.enable ==='阶梯累加'">%</span>
                <span v-if="scope.row.enable ==='特殊2'">元/户</span>
              </template>
            </el-table-column>
            <el-table-column
              min-width="100"
              prop="odvBasicMsg"
              label="低标"
              align="center"
            >
              <template slot-scope="scope">
                <span v-if="(scope.row.id ===108 || scope.row.id ===172) && scope.row.editType==='edit'">
                  <el-input align="center" v-model="scope.row.odvBasicMsg"></el-input>
                </span>
                <span v-if="(scope.row.id ===108 || scope.row.id ===172) && scope.row.editType!='edit'">
                  <span>{{scope.row.odvBasicMsg}}</span>
                </span>
                <el-input
                  v-if="scope.row.editType==='edit' && scope.row.id !=108 && scope.row.id !=172"
                  align="center"
                  v-model="scope.row.odvBasicMsg"
                ></el-input>
                <span v-if="scope.row.editType!='edit' && scope.row.id !=108 && scope.row.id !=172">{{scope.row.odvBasicMsg}}</span>
                <span v-if="scope.row.enable ==='特殊2'">户</span>
                <span v-else>万</span>
              </template>
            </el-table-column>
            <el-table-column
              min-width="340"
              prop="odvRewardMsg"
              label="低标提成"
              align="center"
            >
              <template slot-scope="scope">
                <span v-if="(scope.row.id ===108 || scope.row.id ===172) && scope.row.editType==='edit'">
                  <p>委案金额<el-input align="center" v-model="scope.row.odvRewardMsg"></el-input>%</p>
                  <p>超过委案金额<el-input align="center" v-model="scope.row.odvReward3Msg"></el-input>%</p>
                </span>
                <span v-if="(scope.row.id ===108 || scope.row.id ===172) && scope.row.editType!='edit'">
                  <p>委案金额 {{scope.row.odvRewardMsg}}%</p>
                  <p>超过委案金额 {{scope.row.odvReward3Msg}}%</p>
                </span>
                <span v-if="scope.row.id !=108 && scope.row.id !=172 && scope.row.id !=110 && scope.row.id !=173 && scope.row.editType==='edit'">
                  <p><el-input align="center" v-model="scope.row.odvRewardMsg"></el-input>%</p>
                </span>
                <span v-if="scope.row.id !=108 && scope.row.id !=172 && scope.row.id !=110  && scope.row.id !=173 && scope.row.editType !='edit'">
                  <p>{{scope.row.odvRewardMsg}}%</p>
                </span>
                <span v-if="(scope.row.id===110 || scope.row.id===173) && scope.row.editType==='edit'">
                  <p>
                    <el-input align="center" v-model="scope.row.odvRewardRange1Msg"></el-input>
                    <span>%≤综合户达率&lt;</span>
                    <el-input align="center" v-model="scope.row.odvRewardRange2Msg"></el-input>
                    <span>%</span>
                    <el-input align="center" v-model="scope.row.odvRewardMsg"></el-input>
                    <span>元/户</span>
                  </p>
                  <p>
                    <el-input align="center" v-model="scope.row.odvRewardRange2Msg"></el-input>
                    <span>%≤综合户达率&lt;</span>
                    <el-input align="center" v-model="scope.row.odvRewardRange4Msg"></el-input>
                    <span>%</span>
                    <el-input align="center" v-model="scope.row.odvReward2Msg"></el-input>
                    <span>元/户</span>
                  </p>
                  <p>
                    <span>综合户达率≥</span>
                    <el-input align="center" v-model="scope.row.odvRewardRange4Msg"></el-input>
                    <span>%</span>
                    <el-input align="center" v-model="scope.row.odvReward3Msg"></el-input>
                    <span>元/户</span>
                  </p>
                </span>
                <span v-if="(scope.row.id===110 || scope.row.id===173) && scope.row.editType!='edit'">
                  <p>{{scope.row.odvRewardRange1Msg}}%≤综合户达率&lt;{{scope.row.odvRewardRange2Msg}}% {{scope.row.odvRewardMsg}}元/户</p>
                  <p>{{scope.row.odvRewardRange2Msg}}%≤综合户达率&lt;{{scope.row.odvRewardRange4Msg}}% {{scope.row.odvReward2Msg}}元/户</p>
                  <p>综合户达率≥{{scope.row.odvRewardRange4Msg}}% {{scope.row.odvReward3Msg}}元/户</p>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="odvHighBasicMsg"
              label="高标"
              width="90"
              align="center">
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.editType==='edit' && scope.row.id!=110 && scope.row.id!=173 &&　scope.row.enable != '特殊1'"
                  align="center"
                  v-model="scope.row.odvHighBasicMsg"
                ></el-input>
                <span
                  v-if="scope.row.editType!='edit' && scope.row.id!=110 && scope.row.id!=173 && scope.row.enable != '特殊1'">{{scope.row.odvHighBasicMsg}}</span>
                <span v-if="scope.row.id!=110 && scope.row.id!=173 && scope.row.enable != '特殊1'">万</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="odvHighRewardMsg"
              label="高标提成"
              width="90"
              align="center">
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.editType==='edit' && scope.row.id!=110 && scope.row.id!=173 && scope.row.enable != '特殊1'"
                  align="center"
                  v-model="scope.row.odvHighRewardMsg"
                ></el-input>
                <span
                  v-if="scope.row.editType!='edit' && scope.row.id!=110 && scope.row.id!=173 && scope.row.enable != '特殊1'">{{scope.row.odvHighRewardMsg}}</span>
                <span v-if="scope.row.id!=110 && scope.row.id!=173 && scope.row.enable != '特殊1'">%</span>
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
              min-width="120"
              align="center"
            >
              <template slot-scope="scope">
                <el-select class="selectClass" v-if="scope.row.editType==='edit' && scope.row.id!=110 && scope.row.id!=173"
                           v-model="scope.row.manageMethod" placeholder="请选择提成方式">
                  <el-option
                    v-for="item in methodList"
                    :key="item.id"
                    :label="item.userName"
                    :value="item.id">
                  </el-option>
                </el-select>
                <span v-if="scope.row.editType!='edit' && scope.row.id!=110  && scope.row.id!=173">{{scope.row.manageMethod}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="odvBasicMsg"
              label="提成"
              min-width="350"
              align="center"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.editType==='edit' &&  scope.row.id!=110 && scope.row.id!=173">
                  <p>
                    <el-input align="center" v-model="scope.row.manageRewardMsg"></el-input>
                    <span>低标</span>
                  </p>
                  <p>
                    <span>过低标人数*</span>
                    <el-input align="center" v-model="scope.row.manageRewardRange1Msg"></el-input>
                    <span>元/人+过低标员工提成*</span>
                    <el-input align="center" v-model="scope.row.manageRewardRange2Msg"></el-input>
                    <span>%</span>
                  </p>
                </span>
                <span v-if="scope.row.editType==='edit' &&  (scope.row.id===110 || scope.row.id===173)">
                  <p>
                    <span>上汽短期 综合户达率≥</span>
                    <el-input align="center" v-model="scope.row.manageRewardRange1Msg"></el-input>
                    <span>% 提成</span>
                    <el-input align="center" v-model="scope.row.manageRewardMsg"></el-input>
                    <span>元</span>
                  </p>
                  <p>
                    <span>安吉蓝海 综合户达率≥</span>
                    <el-input align="center" v-model="scope.row.manageRewardRange2Msg"></el-input>
                    <span>% 提成</span>
                    <el-input align="center" v-model="scope.row.manageRewardRange3Msg"></el-input>
                    <span>元</span>
                  </p>
                  <p>
                    <span>上汽短期 总回款完成率≥</span>
                    <el-input align="center" v-model="scope.row.manageRewardRange4Msg"></el-input>
                    <span>% 提成</span>
                    <el-input align="center" v-model="scope.row.manageRewardRange5Msg"></el-input>
                    <span>元</span>
                  </p>
                  <p>
                    <span>以上3个指标全部达成 奖励</span>
                    <el-input align="center" v-model="scope.row.manageRewardRange6Msg"></el-input>
                    <span>元</span>
                  </p>
                  <span v-if="scope.row.editType!='edit' && (scope.row.id===110 || scope.row.id===173)">
                    <p>上汽短期 综合户达率≥{{scope.row.manageRewardRange1Msg}}% 提成{{scope.row.manageRewardMsg}}元</p>
                    <p>安吉蓝海 综合户达率≥{{scope.row.manageRewardRange2Msg}}% 提成{{scope.row.manageRewardRange3Msg}}元</p>
                    <p>上汽短期 总回款完成率≥{{scope.row.manageRewardRange4Msg}}% 提成{{scope.row.manageRewardRange5Msg}}元</p>
                    <p>以上3个指标全部达成 奖励{{scope.row.manageRewardRange6Msg}}元</p>
                  </span>
                  <span v-if="scope.row.editType!='edit' && scope.row.id!=110 && scope.row.id!=173">
                    <p>{{scope.row.manageRewardMsg}}低标</p>
                    <p>过低标人数*{{scope.row.manageRewardRange1Msg}}元/人+过低标员工提成*{{scope.row.manageRewardRange2Msg}}%</p>
                  </span>
                </span>
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column prop="address" label="操作" align="center" width="60">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="onClickEdit(scope.row)"
              >修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top:30px;display: flex;align-items: center;justify-content: center;">
          <span>提成说明: </span>
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
        //row.editType = "edit";
        this.$set(row, 'editType',"edit" )
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

<style lang="scss">
  #setting-reward {
    min-width: 1540px !important;

    .tabs-wrap{
      height: 100%;
    }

    .el-input {
      max-width: 50px;

      .el-input__inner{
        padding: 0 5px;
        text-align: center;
      }
    }

    .el-select {
      text-align: center;

      .el-input {
        max-width: 80px !important;

        .el-input__inner{
          padding: 0 30px 0 5px;
          text-align: center;
        }
      }
    }

    .has-gutter .gutter {
      display: block !important;
    }

    #directorTab {
      .inputAlign{
        width: 60px;

        .el-input__inner{
          width: 100%;
          padding: 0;
          text-align: center !important;
        }
      }
    }

    .buttons{
      margin-bottom: 10px;
    }
  }
</style>
