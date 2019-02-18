import Vue from 'vue'
import store from '../../store/index'
import pinyin from 'js-pinyin'
const has = Vue.directive('has', {
  bind: function(el, binding) {
    const buttonList = store.getters.currentMenu.buttonList
    const buttonPinYin = pinyin.getCamelChars(binding.value).toLowerCase()
    const containButton = buttonList.some(item=> item.buttonAuthSymbol === buttonPinYin)
    if(!containButton){
      el.style.display = 'none';
    }
  }
})

export {has}