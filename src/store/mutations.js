import * as types from './mutation-types'

const mutations = {
  [types.SET_USER_INFO](state, userInfo){
    state.userInfo = userInfo
  },
  [types.SET_MENU](state, menu){
    state.menu = menu
  },
  [types.SET_TAB_MENUS](state, menus){
    state.tabMenus = menus
  },
  [types.SET_CASE_TYPE](state, caseTypes){
    state.caseType = caseTypes
  },
  [types.PUSH_TAB_MENUS](state, menu){
    const menuIndex = _.findIndex(state.tabMenus, item => item.id === menu.id)
    if(menuIndex === -1){
      state.tabMenus.push(menu)
    }
  },
  [types.REMOVE_TAB_MENUS](state, menuId){
    const menuIndex = _.findIndex(state.tabMenus, item => item.id === menuId)
    state.tabMenus.splice(menuIndex, 1)
  },
  [types.REMOVE_TAB_OTHER](state, reservedId){
    let tabMenus = [state.tabMenus[0]]
    if(reservedId){
      const menuIndex = _.findIndex(state.tabMenus, item => item.id === reservedId)
      if(menuIndex > 0){
        tabMenus.push(state.tabMenus[menuIndex])
      }
    }
    state.tabMenus = tabMenus
    state.cacheflushFlag = true;
  },
  [types.SET_CURRENT_MENU](state, menu){
    state.currentMenu = menu
  },
  SET_CACHEFLUSHFLAG(state,flag){
    state.cacheflushFlag = flag;
  },
  [types.SET_BREADCRUMB](state, breadcrumb){
    state.breadcrumb = breadcrumb
  },
}

export default mutations