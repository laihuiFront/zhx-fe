<template>
  <div id="forbiddenwords" v-loading.fullscreen.lock="pageLoading" element-loading-text="拼命加载中">
    <el-tabs type="border-card">
      <el-tab-pane label="催收记录屏蔽词">
        <el-form inline>
          <el-row>
            <el-form-item>
              <el-button type="primary" @click="reset(0)">重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="splitWords(0)">生成</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="save(0)">保存</el-button>
            </el-form-item>
          </el-row>
        </el-form>
        <el-form ref="form" label-width="100px" :model="form" :rules="rules">
          <el-row>
            <el-form-item label="屏蔽词" prop="words">
              <template>
                <div v-if="form.words.length == 0">
                  <span>暂无数据</span>
                </div>
                <div v-else>
                  <el-checkbox v-for="(item, index) in form.words" :key="index" v-model="item.checked" @change="checkboxChange">{{ item.word }}</el-checkbox>
                </div>
              </template>
            </el-form-item>
          </el-row>
          <el-form-item label="屏蔽词内容" prop="content">
            <el-input v-model="form.content" clearable type="textarea" placeholder="请输入屏蔽词内容，示例：微信，QQ" :autosize="{ minRows: 2}" />
          </el-form-item>
          <el-row>
            <el-form-item label="分隔符" prop="separator">
              <el-input v-model="form.separator" clearable placeholder="请输入分隔符，示例：，" />
            </el-form-item>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="自定义信息屏蔽词">
        <el-form inline>
          <el-row>
            <el-form-item>
              <el-button type="primary" @click="reset(1)">重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="splitWords(1)">生成</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="save(1)">保存</el-button>
            </el-form-item>
          </el-row>
        </el-form>
        <el-form ref="form1" label-width="100px" :model="form1" :rules="rules">
          <el-row>
            <el-form-item label="屏蔽词" prop="words">
              <template>
                <div v-if="form1.words.length == 0">
                  <span>暂无数据</span>
                </div>
                <div v-else>
                  <el-checkbox v-for="(item, index) in form1.words" :key="index" v-model="item.checked" @change="checkboxChange">{{ item.word }}</el-checkbox>
                </div>
              </template>
            </el-form-item>
          </el-row>
          <el-form-item label="屏蔽词内容" prop="content">
            <el-input v-model="form1.content" clearable type="textarea" placeholder="请输入屏蔽词内容，示例：微信，QQ" :autosize="{ minRows: 2}" />
          </el-form-item>
          <el-row>
            <el-form-item label="分隔符" prop="separator">
              <el-input v-model="form1.separator" clearable placeholder="请输入分隔符，示例：，" />
            </el-form-item>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { query, save } from '@/common/js/setting-forbiddenwords'

export default {
  data() {
    return {
      pageLoading: false,
      form: {
        content: '',
        separator: '',
        words: []
      },
      form1: {
        content: '',
        separator: '',
        words: []
      },
      rules: {
        content: [
          { required: true, message: '请输入屏蔽词内容', trigger: 'blur' }
        ],
        separator: [
          { required: true, message: '请输入分隔符', trigger: 'blur' }
        ]
      },
      words: {
        dataCollectionType: [],
        remarkType: []
      }
    }
  },
  created() {
    this.queryForbiddenwords()
  },
  methods: {
    queryForbiddenwords() {
      this.pageLoading = true
      query().then(data => {
        this.words = data
        this.form.words = data.dataCollectionType.map(x => {
          x.checked = (x.enabled === 1)
          return x
        })
        this.form1.words = data.remarkType.map(x => {
          x.checked = (x.enabled === 1)
          return x
        })
      }).catch(() => {}).finally(() => {
        this.pageLoading = false
      })
    },
    splitWords(wordtype) {
      let formRef, formData
      if (wordtype === 0) {
        formRef = this.$refs.form
        formData = this.form
      } else {
        formRef = this.$refs.form1
        formData = this.form1
      }
      formRef.validate((valid) => {
        if (valid) {
          const splited = formData.content.split(formData.separator)
          const words = splited.map(x => x.trim()).filter(x => x.length > 0)
          if (words.length === 1) {
            this.$message({
              type: 'error',
              message: '无法使用此分隔符拆分屏蔽词内容'
            })
            return
          }
          formData.words = words.map(x => ({
            word: x,
            enabled: 1,
            checked: true
          }))
          this.$message({
            type: 'success',
            message: '屏蔽词生成成功'
          })
        }
      })
    },
    reset(wordtype) {
      if (wordtype === 0) {
        this.$refs.form.resetFields()
      } else {
        this.$refs.form1.resetFields()
      }
      this.queryForbiddenwords()
    },
    save(wordtype) {
      this.pageLoading = true
      const words = (wordtype === 0 ? this.form.words : this.form1.words)
      save({
        wordtype,
        words: words.map(x => {
          x.enabled = (x.checked ? 1 : 0)
          return x
        })
      }).then(() => {
        this.$message({
          type: 'success',
          message: '屏蔽词保存成功'
        })
        if (wordtype === 0) {
          this.words.dataCollectionType = [...this.form.words]
        } else {
          this.words.remarkType = [...this.form1.words]
        }
      }).catch(() => {}).finally(() => {
        this.pageLoading = false
      })
    },
    checkboxChange() {
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
