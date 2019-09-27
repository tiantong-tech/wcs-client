import Vue from 'vue'
import axios from 'axios'
import isEqual from 'lodash/isEqual'
import cloneDeep from 'lodash/cloneDeep'
import mapValues from 'lodash/mapValues'

const a = {
  a: 1,
  b: 2,
  c: 5
}

export function pull (params, data, keys = []) {
  if (!keys.length) {
    keys = Object.keys(params)
  }

  keys.forEach(key => params[key] = cloneDeep(data[key]))

  return params
}

export function push (changes = {}, data = {}) {
  for (let key in changes) {
    data[key] = cloneDeep(changes[key])
  }
}

export function getChanges (params = {}, data = {}, keys = []) {
  let changes = {}
  if (!keys.length) {
    keys = Object.keys(params)
  }

  Object.keys(params).forEach(key => {
    if (!isEqual(params[key], data[key])) {
      changes[key] = params[key]
    }
  })

  return changes
}

export function isChanged (changes = {}) {
  return !!Object.keys(changes).length
}

export function save (url, params, text = '信息已保存') {
  return axios.post(url, params)
    .then(() => {
      Vue.prototype.$message(text)
    })
}

export function closeConfirm (isChanged = 'isChanged', title, content) {
  return function (to, from, next) {
    let flag = this[isChanged]

    if (typeof flag === 'object') {
      flag = Object.values(flag).some((flag => flag))
    }
    if (!flag) {
      return next()
    }
    if (!title) {
      title = '提示'
    }
    if (!content) {
      content = '信息尚未保存，是否离开页面'
    }

    this.$confirm({
      title,
      content,
      handler: () => next()
    })
  }
}

export default {
  pull,
  push,
  save,
  isChanged,
  getChanges,
  closeConfirm,
}
