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

Vue.config.productionTip = false;
Vue.mixin({
  beforeRouteLeave: function(to, from, next) {
    if (
      this.$route.meta.cacheflush
    ) {
      if (this.$vnode && this.$vnode.data.keepAlive) {
        if (
          this.$vnode.parent &&
          this.$vnode.parent.componentInstance &&
          this.$vnode.parent.componentInstance.cache
        ) {
          if (this.$vnode.componentOptions) {
            var key =
              this.$vnode.key == null
                ? this.$vnode.componentOptions.Ctor.cid +
                  (this.$vnode.componentOptions.tag
                    ? `::${this.$vnode.componentOptions.tag}`
                    : "")
                : this.$vnode.key;
            var cache = this.$vnode.parent.componentInstance.cache;
            var keys = this.$vnode.parent.componentInstance.keys;
            if (cache[key]) {
              if (keys.length) {
                var index = keys.indexOf(key);
                if (index > -1) {
                  keys.splice(index, 1);
                }
              }
              delete cache[key];
            }
          }
        }
      }
      this.$route.meta.cacheflush = false;
      this.$destroy();
    }
    next();
  }
});
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
