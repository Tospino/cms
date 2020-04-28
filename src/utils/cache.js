export const cache = {
  getItem (key) {
    let value = localStorage.getItem(key)
    if (/^\{.*\}$/.test(value) || /^\[.*\]$/.test(value)) value = JSON.parse(value)
    return value
  },
  setItem (key, value) {
    if (typeof value === typeof {}) value = JSON.stringify(value)
    return localStorage.setItem(key, value)
  },
  removeItem (key) {
    return localStorage.removeItem(key)
  }
}
