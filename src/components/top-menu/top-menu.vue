<template>
  <div>
    <section id="top-menu">
      <img src="./logo_1 .png" alt="" class="logo">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#132c51"
        text-color="#fff"
        active-text-color="#fff"
        :default-active="$route.path">
        <component v-for="(item) in menu" :data="item" :is="item.children?'two-level':'one-level'"
                   :key="item.id"></component>
      </el-menu>
      <el-dropdown trigger="click" @command="handleCommand">
        <p class="message">
          <span style="cursor:pointer;" @click="showRemindList">{{remindNum}}</span>
        </p>
        <span class="el-dropdown-link">
        {{userInfo.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="editPassword">修改密码</el-dropdown-item>
          <el-dropdown-item command="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </section>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="ruleForm2.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="提醒消息列表"
      class="dialog-wrap"
      :visible.sync="detailVisible"
      :close-on-click-modal="false"
      width="800px"
    >
      <el-table highlight-current-row
                :data="remindList"
                style="min-height:150px;"
                border
                stripe
      >

        <el-table-column
          prop="createTime"
          align="center"
          width="140"
          label="发送时间"
        >
        </el-table-column>

        <el-table-column
          prop="sendUserName"
          label="发送人"
          width="140"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="context"
          label="内容"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="viewMsg"
          label="是否阅览"
          width="80"
          align="center"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="showRemindList"
        @current-change="showRemindList"
        :current-page.sync="pageNum"
        :page-size.sync="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="prev, pager, next, jumper,total, sizes"
        :total="total"
        class="pagination-wrap"
      ></el-pagination>
      <span slot="footer" class="footer">
        <el-button @click="detailVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import oneLevel from './one-level'
  import twoLevel from './two-level'
  import {resetPassword, initMind, remindList} from '@/store/actions.js';

  export default {
    name: 'topMenu',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        pageNum: 0,
        pageSize: 10,
        total: 0,
        remindNum: null,
        detailVisible: false,
        remindList: [],
        dialogVisible: false,
        ruleForm2: {
          oldPassword: '',
          pass: '',
          checkPass: ''
        },
        rules2: {
          oldPassword: [
            {
              validator: validatePass, trigger: 'blur'
            }],
          pass: [{validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
        }
      }
    },
    components: {
      oneLevel,
      twoLevel
    },
    computed: {
      ...mapGetters([
        'userInfo',
        'menu'
      ])
    },
    created() {
      initMind().then(data => {
        this.remindNum = data
      })
    },
    methods: {
      showRemindList() {
        var data = {pageNum: this.pageNum, pageSize: this.pageSize}
        this.detailVisible = true;
        remindList(data).then(data => {
          this.remindList = data.list;
          this.total = data.total;
        })
      },
      handleCommand(command) {
        if (command === 'logOut') {
          this.logoutAction().then(() => {
            this.$router.replace({path: '/login'})
          })
        } else if (command === 'editPassword') {
          this.dialogVisible = true
          this.$refs["ruleForm2"].resetFields();
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            resetPassword(this.ruleForm2).then((response) => {
              this.$message({
                type: 'success',
                message: '修改密码成功!'
              });
              this.dialogVisible = false;
              this.$refs["ruleForm2"].resetFields();
            })
//          resetPassword(this.ruleForm2);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      ...mapActions([
        'logoutAction',

      ])
    }
  }
</script>

<style lang="scss">
  #top-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 80px;
    background: #132c51;

    .message {
      position: absolute;
      top: -6px;
      left: -40px;
      width: 25px;
      height: 25px;
      background: url(./collect-manage.png);

      span {
        position: absolute;
        top: -5px;
        right: -5px;
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        display: block;
        font-size: 12px;
        background: red;
        color: #fff;
        border-radius: 50%;
      }
    }

    .logo {
      width: 247px;
      height: 33px;
      margin-right: 32px;
    }

    .el-dropdown {
      .el-dropdown-link {
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        user-select: none;
      }
    }

    .el-menu-demo {
      flex: 1;
      border: 0;
      height: 80px;
      // .el-submenu. .el-submenu__title
      .el-menu-item {
        height: 80px;

        &.is-active {
          border-bottom: 0;
          background: #409eff !important;
        }
      }

      .el-submenu {
        height: 80px;

        &.is-active {
          .el-submenu__title {
            border-bottom: 0;
            background: #409eff !important;
          }
        }

        .el-submenu__title {
          height: 80px;
        }
      }

      .first-wrap {
        height: 80px;
        padding: 16px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;

        .icon {
          width: 24px;
          height: 24px;
        }

        .text {
          color: #fff;
          font-size: 14px;
          line-height: 14px;
        }

        .label {
          line-height: 14px;
          color: #fff;
          font-size: 14px;
        }
      }

      .el-submenu__icon-arrow {
        display: none;
      }
    }
  }
</style>
