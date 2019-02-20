<template>
  <el-form id="repay-record-query" :model="queryForm" :inline="true" class="query-wrap">
    <el-form-item>
      <e-l-TreeSelect
          ref="treeSelect"
          v-model="queryForm.diqu"
          :selectParams="{'multiple': false,'clearable': true,'placeholder': '请选择区域'}"
          :treeParams="elTreeParams">
      </e-l-TreeSelect>
    </el-form-item>
    <el-form-item>
      <el-button icon="el-icon-search" type="text">查询</el-button>
      <el-button icon="el-icon-refresh" type="text">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import ELTreeSelect from 'el-tree-select'
import { getDepartmentTree } from '@/common/js/api-setting'
export default {
  name:'repayRecordQuery',
  components:{
    ELTreeSelect,
  },
  props:{
    queryForm:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      elTreeParams: {
          'default-expand-all': true,
          filterable: false,
          'check-strictly': true,
          data: [],
          props: {
              children: 'children',
              label: 'orgName',
              value: 'id'
          }
      }
    }
  },
  created(){
    getDepartmentTree().then(data => {
      this.$set(this.elTreeParams, 'data', data)
       this.$refs.treeSelect.treeDataUpdateFun(data)
    })
  }
}
</script>

<style lang="scss" scoped>
#repay-record-query{}
</style>

