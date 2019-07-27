<template>
	<div class="page-wraper-sub">
		<el-table
			:data="gridData"
			style="width: 100%"
			show-summary
			:summary-method="summary"
			height="100%"
			border
			v-loading="gridLoading"
			class="directorGrid"
		>
			<el-table-column type="expand">
				<template slot-scope="scope">
					<el-table
						:data="scope.row.staffs"
						border
						class="staffsGrid"
					>
						<el-table-column
							label="业务员"
							prop="userName"
							align="center"
							sortable>
						</el-table-column>
						<el-table-column
							label="已还款金额（元）"
							prop="paidMoneyMsg"
							align="center"
							sortable>
						</el-table-column>
						<el-table-column
							label="提成（元）"
							prop="commissionMsg"
							align="center"
							sortable>
						</el-table-column>
					</el-table>
				</template>
			</el-table-column>
			<el-table-column
				label="标准"
				prop="standard"
				align="center">
			</el-table-column>
			<el-table-column
				label="奖励金额（元/人）"
				prop="bonus"
				align="center">
			</el-table-column>
			<el-table-column
				label="人数（人）"
				prop="count"
				align="center">
			</el-table-column>
			<el-table-column
				label="合计（元）"
				prop="sum"
				align="center">
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import {queryDirectorCommission} from '@/common/js/collect-director-commission.js'

export default {
	name:"collect-director-commission",
	data() {
		return {
			gridData:[],
			gridLoading:true
		}
	},

	methods: {
		summary(param){
			const { columns, data } = param
			const sums = []
			columns.forEach((column, index) => {
				if (index === 0) {
					sums[index] = ''
				}else if(index === 1){
					sums[index] = '合计'
				}else if(index === 2){
					sums[index] = '-'
				}else{
					const values = data.map(item => Number(item[column.property]));
					sums[index] = values.reduce((prev, curr) => {
						const value = Number(curr)
						if (!isNaN(value)) {
							return prev + curr
						} else {
							return prev
						}
					}, 0);
				}
			});
			return sums
		}
	},

	created(){
		queryDirectorCommission().then((response) => {
			this.gridLoading = false;
			const {standard1Msg,standard2Msg,reward1Msg,reward2Msg,reward3Msg} = response.commissionSettings
			const {level0=[],level1=[],level2=[],level3=[]} = response.staffs
			this.gridData = [
				{
					standard:"不参与考核的团队业务员",
					bonus:"-",
					sum:"-",
					count:level0.length,
					staffs:level0
				},
				{
					standard:`团队业务员提成＜${standard1Msg}`,
					bonus:reward1Msg,
					sum:reward1Msg*level1.length,
					count:level1.length,
					staffs:level1
				},
				{
					standard:`${standard1Msg}≤团队业务员提成＜${standard2Msg}`,
					bonus:reward2Msg,
					sum:reward2Msg*level2.length,
					count:level2.length,
					staffs:level2
				},
				{
					standard:`团队业务员提成≥${standard2Msg}`,
					bonus:reward3Msg,
					sum:reward3Msg*level3.length,
					count:level3.length,
					staffs:level3
				}
			]
		})
	}
}
</script>

<style lang="scss" scoped>
	.directorGrid{
		/deep/ .el-table__body-wrapper{
			overflow-x: hidden;
		}

		.staffsGrid /deep/ .el-table__body-wrapper{
			overflow: hidden;
		}
    tr.current-row > td{
      border-top: 1px solid #0080ff  !important;
      border-bottom: 1px solid #0080ff  !important;
    }
	}
</style>
