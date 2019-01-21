<template>
  <div id="login">
    <img src="./left.png" alt="" class="left-panel">
    <div class="form">
      <img src="./group.png" alt="" class="group">
      <div class="system-name">
        <img src="./xitongmingcheng.png" alt="">
      </div>
      <el-form class="login-form" autoComplete="on" :model="loginForm" ref="loginForm">
        <el-form-item>
          <el-input autofocus v-model="loginForm.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="rem-pass">
          <el-checkbox>是否记住密码</el-checkbox>
        </el-form-item>
        <el-form-item class="operation">
          <el-button class="item" type="primary" @click="login">登录</el-button>
          <el-button class="item" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'login',
  data(){
    return {
      loginForm: {}
    }
  },
  methods: {
    login(){
      this.loginAction(this.loginForm).then(()=>{
        this.$router.replace({ path: '/' })
      })
    },
    reset() {
      this.loginForm = {}
    },
    ...mapActions([
      'loginAction'
    ])
  }
}
</script>

<style lang="scss">
#login{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #0080ff;
  .left-panel{
    width: 403px;
    height: 284px;
  }
  .form{
    margin-left: 68px;
    padding: 31px 0;
    height: 284px;
    width: 238px;
    background: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    .group{
      margin: 0 0 20px 18px;
      width: 148px;
      height: 18px;
    }
    .system-name{
      text-align: center;
      margin-bottom: 15px;
      img{
        width: 132px;
        height: 16px;
      }
    }
    .login-form{
      padding: 0 33px 0 40px;
      .el-form-item{
        margin-bottom: 10px;
      }
      .rem-pass{
        text-align: right;
        .el-checkbox__label{
          color: #333;
          font-size: 8px;
        }
      }
      .operation{
        .el-form-item__content{
          display: flex;
          .item{
            flex:1;
          }
        }
      }
    }
  }
}
</style>

