import * as types from './mutation-types'

const mutations = {
  [types.SET_USER_INFO](state, userInfo){
    state.userInfo = userInfo
  },
  [types.SET_MENU](state, menu){
    state.menu = menu
  } 
}

export default mutations