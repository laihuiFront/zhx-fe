export const userInfo = state => state.userInfo
export const menu = state => state.menu
export const tabMenus = state => state.tabMenus
export const currentMenu = state => state.currentMenu
export const getTabIndex = state => menuId => _.findIndex(state.tabMenus, item => item.id === menuId)