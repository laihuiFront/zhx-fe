import Vue from 'vue'
import store from '../../store/index'
import pinyin from 'js-pinyin'
const has = Vue.directive('has', {
  bind: function(el, binding) {
    const buttonList = store.getters.currentMenu.buttonList
   // if(buttonList!=null){
      const buttonPinYin = pinyin.getCamelChars(binding.value).toLowerCase()
      const containButton = buttonList.some(item=> item.buttonAuthSymbol === buttonPinYin)
      if(!containButton){
        el.style.display = 'none';
      }
    //}
  }
})

export {has}

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
