<template>
	<div id="setting-department" v-loading="pageLoading" element-loading-text="拼命加载中">
		<div class="treeStyle">
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
			</div>
			<el-table
				stripe
				border
				:data="tableData"
				highlight-current-row
				class="tablebodystyle"
				v-loading="tableLoad"
			>
				<el-table-column
					min-width="3"
					label="部门名称"
					align="center"
					prop="orgName"
					show-overflow-tooltip
				/>
				<el-table-column
					min-width="3"
					label="员工人数"
					align="center"
					prop="userNum"
					show-overflow-tooltip
				/>
				<el-table-column align="center" label="操作" min-width="8" show-overflow-tooltip>
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
	</div>
</template>
<script>
	import {
		getDepartmentTree,
		saveDepartment,
		upDownMethod,
		deletMethod,
		findTableData,
		addDeptMethod
	} from "@/common/js/api-setting";
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
				nodeSort: ""
			};
		},
		created() {
			this.initTree();
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
          if(res.length>0){
            this.tableData = res;
            res[0].begin = 0;
            res[res.length - 1].last = 0;
          }else{
            this.tableData=[]
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
					deletMethod(row).then(() => {
					  this.tableData.splice(index, 1);
            this.$message.success("部门更新成功");
					forkJoin([getDepartmentTree(),findTableData(this.treeObjid)]).subscribe(results => {
						if (results[0].length > 0 && results[1].length > 0) {
							this.departmentTree = results[0];
							this.tableData = results[1];
							results[1][0].begin = 0;
							results[1][results[1].length - 1].last = 0;
              this.pageLoading = false;
              }else{
                this.departmentTree = results[0];
                this.tableData = results[1];
                this.pageLoading = false;
              }             
            })
					}).catch(() => {
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
          forkJoin([getDepartmentTree(),findTableData(this.treeObjid)]).subscribe(results => {
						if (results[0].length > 0 && results[1].length > 0) {
							this.departmentTree = results[0];
							this.tableData = results[1];
							results[1][0].begin = 0;
							results[1][results[1].length - 1].last = 0;
              this.pageLoading = false;
            }
          })
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
					forkJoin([getDepartmentTree(),findTableData(this.treeObjid)]).subscribe(results => {
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
					forkJoin([getDepartmentTree(),findTableData(this.treeObjid)]).subscribe(results => {
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
            if(res.length===0){
              this.form_add.sort =this.nodeSort
            }else{
							this.form_add.sort = res[res.length - 1].sort;
            }
							addDeptMethod(this.form_add).then(() => {
								this.$message.success("操作成功");
								forkJoin([getDepartmentTree(),findTableData(this.treeObjid)]).subscribe(results => {
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
		.tablestyle {
			display: inline-block;
			width: 80%;
			height: calc(100%);
		}
		.tablebodystyle {
			height: calc(100% - 30px);
			width: calc(100%);
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


