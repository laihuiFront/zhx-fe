export const localCache = (key, value) => {
  if(!value){
    return localStorage.getItem(key)
  } else {
    localStorage.setItem(key, value)
  }
}

export const removeCache = (key) => {
  localStorage.removeItem(key)
}
