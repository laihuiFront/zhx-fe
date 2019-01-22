// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import '@/common/scss/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/common/scss/element-variables.scss'
import { localCache } from '@/common/js/auth'
Vue.use(ElementUI, { size: 'mini', zIndex: 3000 });


Vue.config.productionTip = false

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  if(localCache('token')){
    if(to.path === '/login') {
      next({path:'/'})
    } else {
      if(!store.getters.userInfo){
        store.dispatch('getUserInfoAction').then(()=>{
          store.dispatch('getUserMenu').then(()=>{
            next()
          })
        }).catch((err)=>{
          store.dispatch('fedLogOut').then(() => {
            Message.error(err || '权限错误，请重新登录')
            next({ path: '/' })
          })
        })
      }else{
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
