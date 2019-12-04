<template>
  <div id="setting-department" v-loading="pageLoading" element-loading-text="拼命加载中">
    <div class="treeStyle">
      <div>
        <el-button type="primary" class="movebtn" @click="onClickMove">移动</el-button>
      </div>
      <div class="deptTree">
        <el-tree
          v-if="departmentTree.length>0"
          ref="tree"
          :data="departmentTree"
          node-key="id"
          :expand-on-click-node="false"
          class="tree-wrap"
          :default-expanded-keys="expandedlist"
          :default-expand-all="true"
          @node-click="clickNode"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ data.orgName }}</span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="tablestyle">
      <div>
        <el-button type="primary" class="btn" @click="onClickSave">新增</el-button>
        <el-button v-show="false" type="primary" @click="saveColumnsWidth">保存列宽</el-button>
      </div>
      <div class="deptTable">
        <el-table
          ref="table"
          v-loading="tableLoad"
          :data="tableData"
          highlight-current-row
          class="tablebodystyle"
          border
        >
          <el-table-column
            min-width="10"
            label="部门名称"
            align="center"
            prop="orgName"
            show-overflow-tooltip
          />
          <el-table-column
            min-width="10"
            label="员工人数"
            align="center"
            prop="userNum"
            show-overflow-tooltip
          />
          <el-table-column :resizable="false" align="center" label="操作" show-overflow-tooltip width="300">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editDepartment(scope.$index,scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="deleteDepartment(scope.$index,scope.row)">删除</el-button>
              <el-button
                v-if="scope.$index !== 0"
                type="text"
                size="small"
                @click="move(scope.$index,scope.row,-1)"
              >上移</el-button>
              <el-button
                v-if="scope.$index !== tableData.length - 1"
                type="text"
                size="small"
                @click="move(scope.$index,scope.row,1)"
              >下移</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog v-dialogDrag title="编辑部门" class="dialog-wrap" :visible.sync="showDepartmentDialog" width="30%" :close-on-click-modal="false">
      <el-form
        ref="form_update"
        :model="form_update"
        label-position="right"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="上级部门">
          <el-input v-model="selectedTreeNode.name" class="fixedWidth" maxlength="65" disabled />
        </el-form-item>
        <el-form-item label="部门名称" prop="orgName">
          <el-input v-model="form_update.orgName" class="fixedWidth" maxlength="65" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="footer">
        <el-button @click="showDepartmentDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveDept('form_update')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog v-dialogDrag title="新增部门" class="dialog-wrap" :visible.sync="showDepartmentDialog2" width="30%" :close-on-click-modal="false">
      <el-form
        ref="form_add"
        :model="form_add"
        label-position="right"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="上级部门">
          <el-input v-model="selectedTreeNode.name" class="fixedWidth" maxlength="65" disabled />
        </el-form-item>
        <el-form-item label="部门名称" prop="orgName">
          <el-input v-model="form_add.orgName" class="fixedWidth" maxlength="65" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="footer">
        <el-button @click="showDepartmentDialog2 = false">取 消</el-button>
        <el-button type="primary" @click="addDept">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-dialogDrag
      title="选择目标部门"
      class="dialog-wrap"
      :visible.sync="showDialog"
      :append-to-body="true"
      width="400px"
      :close-on-click-modal="false"
    >
      <el-tree
        v-if="moveSelectDepartTree.length>0"
        ref="treeSelect"
        :data="moveSelectDepartTree"
        node-key="id"
        :expand-on-click-node="false"
        class="tree-wrap-select"
        width="200px"
        :default-expand-all="true"
        @node-click="onSelectDepartment"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">{{ data.orgName }}</span>
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
  moveToTargetDepartment,
  listAllOrgsWithUserNum
} from '@/common/js/api-setting'
import {
  saveTableInformation,
  findTableInformationMethod
} from '@/common/js/api-table-column'
import { forkJoin } from 'rxjs'
export default {
  name: 'SettingDepartment',
  data() {
    return {
      departmentTree: [],
      tableData: [],
      showDepartmentDialog: false,
      form_update: {},
      tableLoad: false,
      pageLoading: false,
      expandedlist: [],
      selectedTreeNode: {
        id: null,
        name: null
      },
      showDepartmentDialog2: false,
      form_add: {},
      initValue: {
        orgName: ''
      },
      rules: {
        orgName: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' }
        ]
      },
      nodeSort: '',
      moveSelectDepartTree: [],
      showDialog: false,
      //   columnsWidth: [
      //     {
      //       columnname: '部门名称',
      //       columnwidth: 10
      //     },
      //     {
      //       columnname: '员工人数',
      //       columnwidth: 10
      //     }
      //   ],
      tableWidthInformation: {
        tableid: 'table_1',
        columns: []
      },
      allOrgsWithUserNum: []
    }
  },
  created() {
    this.initTree()
    listAllOrgsWithUserNum().then(data => {
      this.allOrgsWithUserNum = data
    }).catch(() => {})
  },

  methods: {
    initTree() {
      this.pageLoading = true
      getDepartmentTree().then(data => {
        this.departmentTree = data
        this.moveSelectDepartTree = data
      }).catch(() => {}).finally(() => {
        this.pageLoading = false
      })
    },
    clickNode(obj, node, data) {
      this.selectedTreeNode.id = obj.id
      this.selectedTreeNode.name = obj.orgName
      // this.initTable()
      this.tableData = this.allOrgsWithUserNum.filter(x => x.parentId === obj.id)
    },
    initTable() {
      this.pageLoading = true
      findTableData(this.selectedTreeNode.id).then(res => {
        this.tableData = [...res]
      }).catch(() => {}).finally(() => {
        this.pageLoading = false
      })
    },
    editDepartment(index, row) {
      if (this.$refs['form_update']) {
        this.$refs['form_update'].resetFields()
      }
      this.showDepartmentDialog = true
      this.form_update = { ...row }
    },
    deleteDepartment(index, row) {
      this.expandedlist.push(row.parent.id)
      this.$confirm(`确认删除部门[${row.orgName}]吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.pageLoading = true
        deletMethod(row)
          .then(() => {
            this.tableData.splice(index, 1)
            this.$message.success('部门更新成功')
            forkJoin([
              getDepartmentTree(),
              findTableData(this.selectedTreeNode.id)
            ]).subscribe(results => {
              if (results[0].length > 0 && results[1].length > 0) {
                this.departmentTree = results[0]
                this.tableData = results[1]
                this.pageLoading = false
              } else {
                this.departmentTree = results[0]
                this.tableData = results[1]
                this.pageLoading = false
              }
            })
          }).catch(() => {}).finally(() => {
            this.initTree()
          })
      }).catch(() => {})
    },
    saveDept() {
      this.showDepartmentDialog = false
      this.pageLoading = true
      saveDepartment(this.form_update).then(() => {
        this.expandedlist.push(this.form_update.parent.id)
        this.$message.success('部门更新成功')
        forkJoin([
          getDepartmentTree(),
          findTableData(this.selectedTreeNode.id)
        ]).subscribe(results => {
          if (results[0].length > 0 && results[1].length > 0) {
            this.departmentTree = results[0]
            this.tableData = results[1]
          }
        })
      }).catch(() => {}).finally(() => {
        this.pageLoading = false
      })
    },
    // direction: 上移 -1，下移 1
    move(index, row, direction) {
      this.pageLoading = true
      this.expandedlist.push(row.parentId)
      upDownMethod(
        this.tableData[index].id,
        this.tableData[index + direction].id,
      ).then(() => {
        this.$message.success('操作成功')
        forkJoin([
          getDepartmentTree(),
          findTableData(this.selectedTreeNode.id)
        ]).subscribe(results => {
          if (results[0].length > 0 && results[1].length > 0) {
            this.departmentTree = results[0]
            this.tableData = results[1]
          }
        })
      }).catch(() => {}).finally(() => {
        this.pageLoading = false
      })
    },
    onClickSave() {
      if (!this.selectedTreeNode.id) {
        this.$message.error('请先在左侧选择一个部门')
        return
      }
      this.form_add = { ...this.initValue }
      if (this.$refs['form_add']) {
        this.$refs['form_add'].clearValidate()
      }
      this.showDepartmentDialog2 = true
    },
    addDept() {
      this.pageLoading = true
      this.$refs.form_add.validate(valid => {
        if (valid) {
          addDeptMethod({
            ...this.form_add,
            parent: {
              id: this.selectedTreeNode.id
            }
          }).then(() => {
            this.showDepartmentDialog2 = false
            this.$message.success('操作成功')
            forkJoin([
              getDepartmentTree(),
              findTableData(this.selectedTreeNode.id)
            ]).subscribe(results => {
              if (results[0].length > 0 && results[1].length > 0) {
                this.departmentTree = results[0]
                this.tableData = results[1]
              }
            })
          }).catch(() => {}).finally(() => {
            this.pageLoading = false
          })
        }
      })
    },
    onClickMove() {
      if (!this.selectedTreeNode.id) {
        this.$message('请选择部门')
        return
      }
      this.showDialog = true
    },
    onClickConfirmDept() {
      if (!this.selectDeptId) {
        this.$message('请选择目标部门')
        return
      }
      this.$confirm(
        '该操作会将部门及其子部门移动到目标部门下，确认继续？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.pageLoading = true
        moveToTargetDepartment(this.selectedTreeNode.id, this.selectDeptId).then(() => {
          this.$message.success('操作成功')
          forkJoin([
            getDepartmentTree(),
            findTableData(this.selectedTreeNode.id)
          ]).subscribe(results => {
            if (results[0].length > 0 && results[1].length > 0) {
              this.departmentTree = results[0]
              this.moveSelectDepartTree = results[0]
              this.tableData = results[1]
              this.pageLoading = false
            }
          })
        })
        this.showDialog = false
      }).catch(() => {})
    },
    onSelectDepartment(data) {
      this.selectDeptId = data.id
    },
    saveColumnsWidth() {
      this.pageLoading = true
      const headers = this.$refs.table.$children
        .filter(x => x.label && x.minWidth)
        .map(x => {
          const obj = {
            columnname: x.label,
            columnwidth: x.columnConfig.width,
            minwidth: x.columnConfig.minWidth
          }
          return obj
        })
      this.tableWidthInformation.columns = []
      for (const iterator of headers) {
        if (iterator.columnname === '部门名称' && iterator.columnwidth === undefined) {
          iterator.columnwidth = iterator.minwidth
        }
        if (iterator.columnname === '员工人数' && iterator.columnwidth === undefined) {
          iterator.columnwidth = iterator.minwidth
        }
        delete iterator.minwidth
        this.tableWidthInformation.columns.push(iterator)
      }

      saveTableInformation(this.tableWidthInformation).then(() => {
        this.$message.success('保存成功！')
        this.findTableInformation()
        this.pageLoading = false
      })
    },
    // 查询并展示表格
    findTableInformation() {
      this.pageLoading = true
      findTableInformationMethod(this.tableWidthInformation.tableid).then(data => {
        this.columnsWidth = [...data]
      }).catch(() => {}).finally(() => {
        this.pageLoading = false
      })
    }
  }
}
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
      display: inline-flex;
      flex-direction: column;
			width: 30%;
      height: 100%;
      padding-right: 10px;
      border-right: 1px solid #e8e8e8;

      .deptTree{
        margin-top: 10px;
        flex: 1;
        overflow-y: auto;
      }
		}
		.tree-wrap {
			margin-top: 5px;
		}
		.tablestyle {
      display: inline-flex;
      flex-direction: column;
			width: 75%;
      height: calc(100%);
      margin-left: 20px;

      .deptTable{
        margin-top: 10px;
        flex: 1;
        overflow-y: auto;
      }
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
