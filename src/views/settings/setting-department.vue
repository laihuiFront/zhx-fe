<template>
	<div id="setting-department" v-loading="pageLoading" element-loading-text="拼命加载中">
		<div class="treeStyle">
			<div class="header">
				<el-button type="primary" @click="onClickMove" class="movebtn">移动</el-button>
			</div>
			<el-tree
				v-if="departmentTree.length>0"
				ref="tree"
				:data="departmentTree"
				node-key="id"
				:expand-on-click-node="false"
				class="tree-wrap"
				width="400px"
				@node-click="clickNode"
				:default-expanded-keys="expandedlist"
				:default-expand-all="true"
			>
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{data.orgName}}</span>
				</span>
			</el-tree>
		</div>
		<div class="tablestyle">
			<div class="header">
				<el-button type="primary" @click="onClickSave" class="btn">新增</el-button>
				<el-button type="primary" @click="saveColumnsWidth" v-show="false">保存列宽</el-button>
			</div>
			<el-table
				stripe
				border
				:data="tableData"
				highlight-current-row
				class="tablebodystyle"
				v-loading="tableLoad"
				ref="table"
			>
				<el-table-column
					:min-width="columnsWidth.filter(x => x.columnname=='部门名称')[0].columnwidth"
					label="部门名称"
					align="center"
					prop="orgName"
					show-overflow-tooltip
				/>
				<el-table-column
					:min-width="columnsWidth.filter(x => x.columnname=='员工人数')[0].columnwidth"
					label="员工人数"
					align="center"
					prop="userNum"
					show-overflow-tooltip
				/>
				<el-table-column :resizable="false"  align="center" label="操作" show-overflow-tooltip width="300">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="editDepartment(scope.$index,scope.row)">编辑</el-button>
						<el-button type="text" size="small" @click="deleteDepartment(scope.$index,scope.row)">删除</el-button>
						<el-button
							v-if="scope.row.begin!==0"
							type="text"
							size="small"
							@click="moveUp(scope.$index,scope.row)"
						>上移</el-button>
						<el-button
							v-if="scope.row.last!==0"
							type="text"
							size="small"
							@click="moveDown(scope.$index,scope.row)"
						>下移</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog title="编辑部门名称" class="dialog-wrap" :visible.sync="showDepartmentDialog" width="30%">
			<el-form
				ref="form_update"
				:model="form_update"
				label-position="right"
				label-width="100px"
				:rules="rules"
			>
				<el-form-item label="部门名称" prop="orgName">
					<el-input v-model="form_update.orgName" class="fixedWidth" maxlength="65"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="footer">
				<el-button @click="showDepartmentDialog = false">取 消</el-button>
				<el-button type="primary" @click="saveDept('form_update')">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="新增部门名称" class="dialog-wrap" :visible.sync="showDepartmentDialog2" width="30%">
			<el-form
				ref="form_add"
				:model="form_add"
				label-position="right"
				label-width="100px"
				:rules="rules"
			>
				<el-form-item label="部门名称" prop="orgName">
					<el-input v-model="form_add.orgName" class="fixedWidth" maxlength="65"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="footer">
				<el-button @click="showDepartmentDialog2 = false">取 消</el-button>
				<el-button type="primary" @click="addDept('form_add')">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog
			title="选择目标部门"
			class="dialog-wrap"
			:visible.sync="showDialog"
			:close-on-click-modal="true"
			:append-to-body="true"
			width="400px"
		>
			<el-tree
				v-if="moveSelectDepartTree.length>0"
				ref="treeSelect"
				:data="moveSelectDepartTree"
				node-key="id"
				:expand-on-click-node="false"
				@node-click="onSelectDepartment"
				class="tree-wrap-select"
				width="200px"
				:default-expand-all="true"
			>
				<span class="custom-tree-node" slot-scope="{ node, data }">{{data.orgName}}</span>
			</el-tree>
			<span slot="footer" class="footer">
				<el-button @click="showDialog = false">取 消</el-button>
				<el-button type="primary" @click="onClickConfirmDept">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import {
		getDepartmentTree,
		saveDepartment,
		upDownMethod,
		deletMethod,
		findTableData,
		addDeptMethod,
		moveToTargetDepartment
	} from "@/common/js/api-setting";
	import {
		saveTableInformation,
		findTableInformationMethod
	} from "@/common/js/api-table-column";
	import { forkJoin } from "rxjs";
	export default {
		name: "settingDepartment",
		data() {
			return {
				departmentTree: [],
				tableData: [],
				showDepartmentDialog: false,
				form_update: {},
				tableLoad: false,
				pageLoading: false,
				expandedlist: [],
				treeObjid: "",
				showDepartmentDialog2: false,
				form_add: {},
				initValue: {
					orgName: ""
				},
				rules: {
					orgName: [
						{ required: true, message: "部门名称不能为空", trigger: "blur" }
					]
				},
				nodeSort: "",
				moveSelectDepartTree: [],
				showDialog: false,
				columnsWidth: [
					{
						columnname: "部门名称",
						columnwidth: 400
					},
					{
						columnname: "员工人数",
						columnwidth: 300
					}
				],
				tableWidthInformation: {
					tableid: "table_1",
					columns: []
				}
			};
		},
		created() {
			this.initTree();
			getDepartmentTree().then(data => {
				this.moveSelectDepartTree = data;
			});
			this.findTableInformation();
		},

		methods: {
			initTree() {
				this.pageLoading = true;
				getDepartmentTree().then(data => {
					this.departmentTree = data;
					this.pageLoading = false;
				});
			},
			clickNode(obj, node, data) {
				if (obj.children == undefined) {
					this.tableData = [];
				} else {
					if (obj.children.length == 1) {
						obj.children[0].begin = 0;
						obj.children[obj.children.length - 1].last = 0;
					}
					if (obj.children.length > 1) {
						obj.children[0].begin = 0;
						obj.children[obj.children.length - 1].last = 0;
					}
				}
				this.treeObjid = obj.id;
				this.nodeSort = obj.sort;
				this.initTable();
			},
			initTable() {
				this.pageLoading = true;
				findTableData(this.treeObjid).then(res => {
					if (res.length > 0) {
						this.tableData = res;
						res[0].begin = 0;
						res[res.length - 1].last = 0;
					} else {
						this.tableData = [];
					}
					this.pageLoading = false;
				});
			},
			editDepartment(index, row) {
				if (this.$refs["form_update"]) {
					this.$refs["form_update"].resetFields();
				}
				this.showDepartmentDialog = true;
				this.form_update = row;
			},
			deleteDepartment(index, row) {
				this.expandedlist.push(row.parent.id);
				this.$confirm("确认删除？", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					this.pageLoading = true;
					deletMethod(row)
						.then(() => {
							this.tableData.splice(index, 1);
							this.$message.success("部门更新成功");
							forkJoin([
								getDepartmentTree(),
								findTableData(this.treeObjid)
							]).subscribe(results => {
								if (results[0].length > 0 && results[1].length > 0) {
									this.departmentTree = results[0];
									this.tableData = results[1];
									results[1][0].begin = 0;
									results[1][results[1].length - 1].last = 0;
									this.pageLoading = false;
								} else {
									this.departmentTree = results[0];
									this.tableData = results[1];
									this.pageLoading = false;
								}
							});
						})
						.catch(() => {
							this.initTree();
						});
				});
			},
			saveDept() {
				this.showDepartmentDialog = false;
				this.pageLoading = true;
				saveDepartment(this.form_update).then(() => {
					this.expandedlist.push(this.form_update.parent.id);
					this.$message.success("部门更新成功");
					forkJoin([
						getDepartmentTree(),
						findTableData(this.treeObjid)
					]).subscribe(results => {
						if (results[0].length > 0 && results[1].length > 0) {
							this.departmentTree = results[0];
							this.tableData = results[1];
							results[1][0].begin = 0;
							results[1][results[1].length - 1].last = 0;
							this.pageLoading = false;
						}
					});
				});
			},
			moveUp(index, row) {
				this.pageLoading = true;
				this.expandedlist.push(row.parent.id);
				upDownMethod(
					this.tableData[index].id,
					this.tableData[index].sort,
					this.tableData[index - 1].id,
					this.tableData[index - 1].sort
				).then(() => {
					this.$message.success("操作成功");
					forkJoin([
						getDepartmentTree(),
						findTableData(this.treeObjid)
					]).subscribe(results => {
						if (results[0].length > 0 && results[1].length > 0) {
							this.departmentTree = results[0];
							this.tableData = results[1];
							results[1][0].begin = 0;
							results[1][results[1].length - 1].last = 0;
							this.pageLoading = false;
						}
					});
				});
			},
			moveDown(index, row) {
				this.pageLoading = true;
				this.expandedlist.push(row.parent.id);
				upDownMethod(
					this.tableData[index].id,
					this.tableData[index].sort,
					this.tableData[index + 1].id,
					this.tableData[index + 1].sort
				).then(() => {
					this.$message.success("操作成功");
					forkJoin([
						getDepartmentTree(),
						findTableData(this.treeObjid)
					]).subscribe(results => {
						if (results[0].length > 0 && results[1].length > 0) {
							this.departmentTree = results[0];
							this.tableData = results[1];
							results[1][0].begin = 0;
							results[1][results[1].length - 1].last = 0;
							this.pageLoading = false;
						}
					});
				});
			},
			onClickSave() {
				this.form_add = { ...this.initValue };
				if (this.$refs["form_add"]) {
					this.$refs["form_add"].clearValidate();
				}
				this.showDepartmentDialog2 = true;
			},
			addDept(formName) {
				this.showDepartmentDialog2 = false;
				this.pageLoading = true;
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.form_add.pid = this.treeObjid;
						findTableData(this.treeObjid).then(res => {
							if (res.length === 0) {
								this.form_add.sort = this.nodeSort;
							} else {
								this.form_add.sort = res[res.length - 1].sort;
							}
							addDeptMethod(this.form_add).then(() => {
								this.$message.success("操作成功");
								forkJoin([
									getDepartmentTree(),
									findTableData(this.treeObjid)
								]).subscribe(results => {
									if (results[0].length > 0 && results[1].length > 0) {
										this.departmentTree = results[0];
										this.tableData = results[1];
										results[1][0].begin = 0;
										results[1][results[1].length - 1].last = 0;
										this.pageLoading = false;
									}
								});
							});
						});
					}
				});
			},
			onClickMove() {
				if (!this.treeObjid) {
					this.$message("请选择部门");
					return;
				}
				this.showDialog = true;
			},
			onClickConfirmDept() {
				if (!this.selectDeptId) {
					this.$message("请选择目标部门");
					return;
				}
				this.$confirm(
					"该操作会将部门及其子部门移动到目标部门下，确认继续？",
					"提示",
					{
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}
				)
					.then(() => {
						this.pageLoading = true;
						moveToTargetDepartment(this.treeObjid, this.selectDeptId).then(() => {
							this.$message.success("操作成功");
							forkJoin([
								getDepartmentTree(),
								findTableData(this.treeObjid)
							]).subscribe(results => {
								if (results[0].length > 0 && results[1].length > 0) {
									this.departmentTree = results[0];
									this.moveSelectDepartTree = results[0];
									this.tableData = results[1];
									results[1][0].begin = 0;
									results[1][results[1].length - 1].last = 0;
									this.pageLoading = false;
								}
							});
						});
						this.showDialog = false;
					})
					.catch(() => {});
			},
			onSelectDepartment(data) {
				this.selectDeptId = data.id;
			},
			saveColumnsWidth() {
				this.pageLoading = true;
				const headers = this.$refs.table.$children
					.filter(x => x.label && x.minWidth)
					.map(x => {
						const obj = {
							columnname: x.label,
							columnwidth: x.columnConfig.width,
							minwidth: x.columnConfig.minWidth
						};
						return obj;
					});
				this.tableWidthInformation.columns = [];
				for (let iterator of headers) {
					if (
						iterator.columnname == "部门名称" &&
						iterator.columnwidth == undefined
					) {
						iterator.columnwidth = iterator.minwidth;					
					}
					if (
						iterator.columnname == "员工人数" &&
						iterator.columnwidth == undefined
					) {
						iterator.columnwidth = iterator.minwidth;
					}
						delete iterator.minwidth;
					this.tableWidthInformation.columns.push(iterator);
				}

				saveTableInformation(this.tableWidthInformation).then(() => {
					this.$message.success("保存成功！");
					this.findTableInformation();
					this.pageLoading = false;
				});
			},
			// 查询并展示表格
			findTableInformation() {
				this.pageLoading = true;
				findTableInformationMethod(this.tableWidthInformation.tableid).then(data => {
					if(data!=null&&data.length>0){
						this.columnsWidth=data
				}
					this.pageLoading = false;
				});
			}
		}
	};
</script>

<style lang="scss">
	#setting-department {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		.fixedWidth {
			width: 240px;
		}
		.treeStyle {
			display: inline-block;
			width: 20%;
			height: 100%;
			overflow-y: auto;
		}
		.tree-wrap {
			margin-top: 5px;
		}
		.tablestyle {
			display: inline-block;
			width: 80%;
			height: calc(100%);
		}
		.tablebodystyle {
			height: calc(100% - 30px);
			width: calc(100%);
			margin-top: 5px;
		}
		.el-table .el-table__body-wrapper {
			height: calc(100% - 36px);
			width: calc(100%);
			overflow-x: hidden;
		}
		.header {
			text-align: right;
		}
		.tree-wrap {
			flex: 0.1;
			.el-tree-node__content {
				height: 40px;
				&:hover {
					background: #ddd;
				}
			}
			.custom-tree-node {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 14px;
				padding-right: 8px;
				color: #0080ff;
				.el-input {
					width: 150px;
				}
			}
		}
		.tree-wrap-select {
			width: 300px;
			.el-dialog__body {
				.tree-wrap-select {
					height: 100%;
					.el-tree-node__content {
						height: 40px;
					}
					.custom-tree-node {
						display: inline-block;
						height: 100%;
						flex: 1;
						font-size: 14px;
						padding: 0 8px 0 12px;
						color: #0080ff;
					}
				}
			}
		}
	}
</style>


