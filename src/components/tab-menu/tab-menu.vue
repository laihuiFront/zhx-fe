<template>
  <div id="tab-menu">
    <!-- <span class="left-wrap" @click="onClickLeft"><i class="icon el-icon-arrow-left"></i></span>
    <ul class="menu-wrap" ref='tabList' style="overflow: hidden;">
      <li
         @click="gotoPage(menu)"
         class="menu-item"
         :class="{active:menu.id === currentMenu.id}"
         v-for="(menu) in tabMenus"
         :key="'tab'+menu.id"
          @contextmenu.prevent="openMenu(menu,$event)">
        <span class="text">{{menu.menuLabel}}</span>
        <i v-if="menu.menuLabel !== '首页'" @click.stop="closeTab(menu)" class="el-icon-close"></i>
      </li>
    </ul>
    <span class="right-wrap" @click="onClickRight"><i class="icon el-icon-arrow-right"></i></span>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="closeTab(selectedTab)" v-if="selectedTab.menuLabel !== '首页'">关闭当前标签页</li>
      <li @click="closeOthersTags">关闭其他标签页</li>
      <li @click="closeAllTags" v-if="selectedTab.menuLabel !== '首页'">关闭所有标签页</li>
    </ul> -->
    <div class="leftPanel">
      <el-breadcrumb>
        <el-breadcrumb-item v-for="item in breadcrumb" :key="item.id">{{ item.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="rightPanel">
      <div class="message" @click="showRemindList">
        <img :src="require('./collect-manage.png')">
        <span>{{ remindNum }}</span>
      </div>
      <el-dropdown trigger="click" class="userCommand" @command="handleCommand">
        <span class="el-dropdown-link">{{ userInfo.userName }}
          <i class="el-icon-arrow-down" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="editPassword">修改密码</el-dropdown-item>
          <el-dropdown-item command="editHomePhone">修改坐席设置</el-dropdown-item>
          <el-dropdown-item command="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog
      v-dialogDrag
      title="修改密码"
      :visible.sync="dialogVisible"
      width="30%"
      class="dialog-wrap"
      :close-on-click-modal="false"
    >
      <el-form ref="ruleForm2" :model="ruleForm2" status-icon :rules="rules2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="ruleForm2.oldPassword" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input v-model="ruleForm2.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input v-model="ruleForm2.checkPass" type="password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-dialogDrag
      title="修改坐席设置"
      :visible.sync="dialogHomePhoneVisible"
      width="400px"
      class="dialog-wrap"
      :close-on-click-modal="false"
    >
      <el-form ref="ruleForm3" :model="ruleForm3" status-icon :rules="rules3" label-width="80px" class="ruleForm3">
        <el-form-item label="呼叫中心" prop="callCenter">
          <el-select v-model="ruleForm3.callCenter" clearable placeholder="请选择呼叫中心" @change="callCenterChanged">
            <el-option
              v-for="item in callCenters"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="坐席号" prop="officePhone">
          <el-input v-model="ruleForm3.officePhone" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="footer">
        <el-button @click="dialogHomePhoneVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm2('ruleForm3')">保存</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-dialogDrag
      title="提醒消息列表"
      class="dialog-wrap"
      :visible.sync="detailVisible"
      :close-on-click-modal="false"
      width="800px"
    >
      <el-table
        highlight-current-row
        :data="remindList"
        border
        stripe
      >
        <el-table-column
          prop="createTime"
          align="center"
          width="140"
          label="发送时间"
        />
        <el-table-column
          prop="sendUserName"
          label="发送人"
          width="140"
          align="center"
        />
        <el-table-column
          prop="context"
          label="内容"
          align="center"
        />
        <el-table-column
          prop="viewMsg"
          label="是否阅览"
          width="80"
          align="center"
        />
      </el-table>
      <el-pagination
        :current-page.sync="pageNum"
        :page-size.sync="pageSize"
        :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="pagination-wrap"
        @size-change="showRemindList"
        @current-change="showRemindList"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { resetPassword, initMind, remindList, findMine } from '@/store/actions.js'
import { queryCallCenters } from '@/common/js/api-tel.js'
import { pageSizes } from '@/common/js/const'

export default {
  name: 'TabMenu',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入的新密码不一致'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      ruleForm2: {
        oldPassword: '',
        pass: '',
        checkPass: ''
      },
      rules2: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ]
      },
      ruleForm3: {
        callCenter: null,
        oldOfficePhone: '',
        officePhone: ''
      },
      rules3: {
        callCenter: [
          { required: true, message: '请选择呼叫中心', trigger: 'blur' }
        ],
        officePhone: [
          { required: true, message: '请输入坐席号', trigger: 'blur' }
        ]
      },
      dialogHomePhoneVisible: false,
      callCenters: [],
      pageSizes,
      pageNum: 0,
      pageSize: pageSizes[0],
      total: 0,
      remindList: [],
      remindNum: null,
      detailVisible: false,

      visible: false,
      top: 0,
      left: 0,
      selectedTab: {}
    }
  },
  computed: {
    ...mapGetters([
      'menu',
      'userInfo',
      'tabMenus',
      'currentMenu',
      'breadcrumb'
    ])
  },
  watch: {
    tabMenus() {
      setTimeout(() => {
        if (this.$refs.tabList) {
          this.$refs.tabList.scrollTo(this.$refs.tabList.scrollWidth, 0)
        }
      }, 250)
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  // mounted(){
  //   this.$refs.tabList.style.left = '0px'
  //   this.$refs.tabList.style.right = '0px'
  // },
  created() {
    initMind().then(data => {
      this.remindNum = data
    })
  },
  methods: {
    handleCommand(command) {
      if (command === 'editPassword') {
        this.editPassword()
      } else if (command === 'editHomePhone') {
        this.editHomePhone()
      } else if (command === 'logOut') {
        this.logOut()
      }
    },
    editPassword() {
      const form = this.$refs['ruleForm2']
      if (form) {
        form.resetFields()
      }
      this.dialogVisible = true
    },
    editHomePhone() {
      findMine().then((response) => {
        this.$set(this.ruleForm3, 'officePhone', response.officePhone)
        this.$set(this.ruleForm3, 'oldOfficePhone', response.officePhone)
        this.$set(this.ruleForm3, 'callCenter', response.callcenterid)
        this.dialogHomePhoneVisible = true
      })
      queryCallCenters().then((response) => {
        this.callCenters = response
      })
    },
    ...mapActions([
      'logoutAction'
    ]),
    logOut() {
      this.logoutAction().then(() => {
        this.$router.replace({ path: '/login' })
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          resetPassword(this.ruleForm2).then((response) => {
            this.$message({
              type: 'success',
              message: '修改密码成功!'
            })
            this.dialogVisible = false
          }).catch(() => {})
        }
      })
    },
    callCenterChanged(callCenterID) {
      this.$set(this.ruleForm3, 'callCenter', callCenterID)
    },
    showRemindList() {
      const data = { pageNum: this.pageNum, pageSize: this.pageSize }
      this.detailVisible = true
      remindList(data).then(data => {
        this.remindList = data.list
        this.total = data.total
      })
    },
    onClickLeft() {
      // this.$refs.tabList.scrollTo(this.$refs.tabList.scrollWidth, 0)
      // console.log(this.$refs.tabList.scrollLeft)
      this.$refs.tabList.scrollLeft = this.$refs.tabList.scrollLeft - 50
    },
    onClickRight() {
      this.$refs.tabList.scrollLeft = this.$refs.tabList.scrollLeft + 50
    },
    openMenu(tab, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.top = e.clientY

      this.visible = true
      this.selectedTab = tab
    },
    closeMenu() {
      this.visible = false
    },
    closeOthersTags() {
      this.gotoPage(this.selectedTab)
      this.removeOtherTab(this.selectedTab.id)
    },
    // 关闭所有就回到首页，第一个一定是首页
    closeAllTags() {
      this.gotoPage(this.tabMenus[0])
      this.removeOtherTab()
    },
    gotoPage(menu) {
      if (menu.isDetail) {
        this.$router.push({
          path: 'case-detail',
          query: menu.query
        })
      } else {
        this.$router.push('/zhx' + menu.menuUrl)
      }
    },
    closeTab(menu) {
      this.$route.meta.cacheflush = true
      const tabIndex = this.$store.getters.getTabIndex(menu.id)
      let nextPath = null
      let nextMenu = null
      if (menu.id === this.currentMenu.id) {
        if (this.tabMenus.length > 1) {
          if (tabIndex === 0) {
            nextMenu = this.tabMenus[1]
          } else {
            nextMenu = this.tabMenus[tabIndex - 1]
          }
          nextPath = nextMenu.menuUrl
        } else {
          this.$router.push('/zhx' + '/home-page')
          return
        }
      }
      this.removeTab(menu.id)

      if (nextMenu) {
        if (nextMenu.isDetail) {
          this.$router.push({
            path: 'case-detail',
            query: nextMenu.query
          })
        } else {
          this.$router.push('/zhx' + nextPath)
          if (menu.isDetail) {
            sessionStorage.removeItem(menu.query.id)
          }
        }
      }
    },
    ...mapMutations({
      removeTab: 'REMOVE_TAB_MENUS',
      removeOtherTab: 'REMOVE_TAB_OTHER'
    })
  }
}
</script>

<style lang="scss">
#tab-menu{
  // position: relative;
  width:100%;
  display: flex;
  height: 65px;
  box-shadow:0 1px 4px #00152914;

  .leftPanel{
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 25px;

    .el-breadcrumb__item{
      .el-breadcrumb__inner{
        color: #8B8B8B;
      }

      .el-breadcrumb__separator{
        margin: 0 5px;
        color: #8B8B8B;
      }

      &:last-of-type .el-breadcrumb__inner{
        color: #4F73FA;
      }
    }
  }

  .rightPanel{
    width: 200px;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .message{
      width: 24px;
      position: relative;
      cursor: pointer;

      span{
        position: absolute;
        top: -5px;
        right: -5px;
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        background: red;
        color: #fff;
        border-radius: 50%;
      }
    }

    .userCommand{
      padding: 0 10px;
      cursor: pointer;
    }
  }
}
</style>
