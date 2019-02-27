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
        <component v-for="(item) in menu" :data="item" :is="item.children?'two-level':'one-level'" :key="item.id"></component>
    </el-menu>
    <el-dropdown trigger="click" @command="handleCommand">
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
  <el-form-item label="旧密码" prop="pass">
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
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import oneLevel from './one-level'
import twoLevel from './two-level'
 import {resetPassword} from '@/store/actions.js';
export default {
  name: 'topMenu',
  data(){
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
  	return{
  		dialogVisible:false,
  		ruleForm2:{},
  		rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
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
  methods: {
    handleCommand(command) {
      if (command === 'logOut') {
        this.logoutAction().then(()=>{
          this.$router.replace({path:'/login'})
        })
      }else if(command === 'editPassword'){
      	this.dialogVisible=true
      }
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.info(this.ruleForm2);
            resetPassword(this.ruleForm2);
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
#top-menu{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 80px;
  background: #132c51;
  .logo{
    width: 247px;
    height: 33px;
  }
  .el-dropdown{
    .el-dropdown-link{
      color:#fff;
      font-size: 14px;
    }
  }
  .el-menu-demo{
    border: 0;
    height: 80px;
    // .el-submenu. .el-submenu__title
    .el-menu-item{
      height: 80px;
      &.is-active{
        border-bottom: 0;
        background: #409eff !important;
      }
    }
    .el-submenu{
      height: 80px;
      &.is-active{
        .el-submenu__title{
          border-bottom: 0;
          background: #409eff !important;
        }
      }
      .el-submenu__title{
        height: 80px;
      }
    }
    .first-wrap{
      height: 80px;
      padding: 16px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      .icon{
        width: 24px;
        height: 24px;
      }
      .text{
        color:#fff;
        font-size: 14px;
        line-height: 14px;
      }
      .label{
        line-height: 14px;
        color:#fff;
        font-size: 14px;
      }
    }
    .el-submenu__icon-arrow{
      display: none;
    }
  }
}
</style>
