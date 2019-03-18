//import 'babel-polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";

import "@/common/scss/index";
import ElementUI from "element-ui";
import { Message, MessageBox } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/common/scss/element-variables.scss";
import { localCache } from "@/common/js/auth";

import has from "./common/js/directives";
Vue.use(ElementUI, { size: "mini" });
Vue.directive("dropdown-patch", {
  bind(el, binding, vnode){
    let a = vnode.componentInstance.broadcast;
    let clz = el.className;
    vnode.componentInstance.broadcast= function(c,d,val) {
      a(c,d,val);
      if (val) {
        el.classList += ' active';
      }else{
        el.classList = clz;
      }
    }
  },
  inserted(el, binding, vnode) {
    el.querySelector(".el-dropdown-menu").style.minWidth =
      el.querySelector(".el-button").offsetWidth + "px";
  },
});
Vue.config.productionTip = false;

const whiteList = ["/login"];
router.beforeEach((to, from, next) => {
  if (localCache("token")) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      if (!store.getters.menu.length) {
        store
          .dispatch("getUserInfoAction")
          .then(() => {
            store.dispatch("getUserMenu").then(() => {
              if (to.path.includes("case-detail")) {
                store.dispatch("initCaseDetailPage", to.query);
              } else {
                store.dispatch("initPageMenu", to.path);
              }
              next();
            });
          })
          .catch(err => {
            store.dispatch("fedLogOut").then(() => {
              Message.error(err || "权限错误，请重新登录");
              next({ path: "/" });
            });
          });
      } else {
        if (to.path.includes("case-detail")) {
          store.dispatch("initCaseDetailPage", to.query);
        } else {
          store.dispatch("initPageMenu", to.path);
        }
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
