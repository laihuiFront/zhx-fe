<template>
  <div id="login">
    <img src="./left.png" alt="" class="left-panel">
    <div class="form">
      <img src="./group.png" alt="" class="group">
      <div class="system-name">
        <img src="./xitongmingcheng.png" alt="">
      </div>
      <div class="input-wrap">
        <img src="./user.png" alt="" class="icon">
        <input type="text" v-model="loginForm.userName" @keyup.enter="login" placeholder="请输入用户名">
      </div>
      <div class="input-wrap">
        <img src="./password.png" alt="" class="icon">
        <input type="password" v-model="loginForm.password" @keyup.enter="login" placeholder="请输入密码">
      </div>
      <div class="remember-pass">
        <el-checkbox v-model="loginForm.checked">是否记住密码</el-checkbox>
      </div>
      <div class="btns">
        <el-button class="item" size="medium" type="primary" @click="login" style="width: 105px;" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
        <el-button class="item" size="medium" @click="reset" style="width: 105px;">重置</el-button>
      </div>
      <!-- <el-form class="login-form" autoComplete="on" :model="loginForm" ref="loginForm">
        <el-form-item>
          <el-input size="large" autofocus v-model="loginForm.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input size="large" type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="rem-pass">
          <el-checkbox>是否记住密码</el-checkbox>
        </el-form-item>
        <el-form-item class="operation">
          <el-button class="item" type="primary" @click="login">登录</el-button>
          <el-button class="item" @click="reset">重置</el-button>
        </el-form-item>
      </el-form> -->
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'login',
  data(){
    return {
      loginForm: {},
      fullscreenLoading: false
    }
  },
  mounted() {
    this.getCookie();
  },
  methods: {
    login(){
      this.fullscreenLoading = true
      if (this.loginForm.checked){
        this.setCookie(this.loginForm.userName,this.loginForm.password,15)
      }else{
        this.clearCookie();
      }

      this.loginAction(this.loginForm).then(()=>{
        this.$router.replace({ path: '/' })
      }).catch(() => this.fullscreenLoading = false)
    },
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('='); //再次切割
          //判断查找相对应的值
          if (arr2[0] == 'userName') {
            //  console.log(arr2[1])
           // this.loginForm.userName = arr2[1]; //保存到保存数据的地方
            this.$set(this.loginForm, 'userName', arr2[1])
          } else if (arr2[0] == 'password') {
            // console.log(arr2[1])
            //this.loginForm.password = arr2[1];
            this.$set(this.loginForm, 'password', arr2[1])
          }
        }
        this.$set(this.loginForm, 'checked', true)
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
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
  background: url('./bg.png') 100% 100%;
  .left-panel{
    width: 52.5vw;
    height: 75.2%;
  }
  .form{
    margin-left: -68px;
    padding: 46px 0;
    // height: 284px;
    width: 340px;
    background: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    .group{
      margin: 0 0 30px 25px;
      width: 207px;
      height: 25px;
    }
    .system-name{
      text-align: center;
      margin-bottom: 45px;
      img{
        width: 184px;
        height: 18px;
      }
    }
    .input-wrap{
      position: relative;
      height: 38px;
      padding: 0 56px;
      margin-bottom: 15px;
      .icon{
        position: absolute;
        left: 75px;
        top: 50%;
        transform: translateY(-50%);
        width: 19px;
        height: 19px;
      }
      input{
        padding-left: 46px;
        border-radius: 5px;
        width: 100%;
        height: 100%;
        background: #fff;
        border: 1px solid #e8e8e8;
      }
    }
    .remember-pass{
      padding: 0 56px;
      margin-bottom: 45px;
      text-align: right;
      .el-checkbox__label{
        color: #333;
        font-size: 8px;
      }
    }
    .btns{
      display: flex;
      justify-content: center;
    }
  }
}
</style>
