import axios from '@/providers/axios'
import isEqual from 'lodash/isEqual'
import isObject from 'lodash/isObject'
import cloneDeep from 'lodash/cloneDeep'
import pick from 'lodash/pick'
import { isStrictEqual } from '@/utils/common'

class DataEditorObject {
  keys = []
  data = []
  params = []
  changes = {}
  constructor (keys, data, params) {
    this.keys = keys
    this.data = data
    this.params =  params
  }
  fetch () {

  }
  pull () {

  }
  push () {

  }
  getChanges () {
    
  }
}

class DataEditorArray {
  id = ''
  keys = []
  data = []
  params = []
  changes = []
  constructor (keys, data, params, id) {
    this.id = id
    this.keys = keys
    this.data = data
    this.params =  params
  }
  pull () {
    const params = this.data.map(item => pick(item, this.keys))
    this.params.splice(0, this.data.length, params)
  }
  push () {
    const params = this.params.map(item => pick(item, this.keys))
    this.data.splice(0, this.params.length, params)
  }
  getChanges () {
    this.changes = []
    this.data.forEach((item, key) => {

    })
  }
}

export default function DataEditorMixin (options) {
  const mixin = {}

  handleOptions(options)
  bindHooks(mixin, options)
  bindMethods(mixin, options)
  bindComputed(mixin, options)

  return mixin
}

function handleOptions (options) {
  if (!options.url) options.url = ''
  if (!options.closeConfirmTitle) options.closeConfirmTitle = '提示'
  if (!options.closeConfirmContent) options.closeConfirmContent = '信息尚未保存，是否确认离开'
  if (!options.savedMessageText) options.savedMessageText = '数据已更新'
  if (!Array.isArray(options.schema)) options.schema = [options.schema]
  options.schema.forEach(schema => {
    if (!schema.data) schema.data = 'data'
    if (!schema.dataId) schema.dataId = 'id'
    if (!schema.params) schema.params = 'params'
    if (!schema.paramsId) schema.paramsId = 'id'
  })
}

function bindComputed (mixin, { schema, data, params }) {
  mixin.computed = {
    changedParams () {
      return schema.map(schema => {
        return schema.$editor.getChanges()
      })
    },
    isChanged () {
      return !!this.changedParams.some(changes => changes.length)
    },
    // todo remove
    isModified () {
      return this.isChanged
    }
  }
}

function bindMethods (mixin, options) {
  const { url, data, params, dataId, paramsId, text, handleSave } = options

  mixin.methods = {
    resetData () {
      cloneData(this[params], this[data])
    },
    pullData () {
      Object.keys(this[params]).forEach(key => {
        this[params][key] = this[data][key]
      })
    },
    pushData () {

    },
    handleSave () {
      if (!this.isChanged) return

      const keys = Object.keys(this.changedParams)
      this.changedParams[paramsId] = this[data][dataId]

      this.beforeUpdate && this.beforeUpdate()
      return axios.post(url, this.changedParams)
        .then(() => {
          this.pushData(keys)
          this.$notify({ text })
          this.updated && this.updated()
        })
    }
  }
}

function bindHooks (mixin, { data, params }) {
  mixin.beforeRouteLeave = mixin.beforeRouteUpdate = function (to, from, next) {
    if (!this.isChanged) {
      return next()
    }
    this.$confirm({
      title: '提示',
      content: '信息尚未保存，是否离开页面',
      handler: () => next()
    })
  }
  mixin.created = function () {
    this.resetData()
  }
}

function cloneData (params, data) {
  for (let key in params) {
    const value = data[key]

    if (Array.isArray(value)) {
      params[key] = cloneDeep(value)
    } else if (isObject(value)) {
      cloneData(params[key], data[key])
    } else {
      params[key] = value
    }
  }
}

function getChangedParams (params, data) {
  const result = {}
  for (key in params) {
    const value = params[value]
    if (Array.isArray(value)) {

    } else if (isObject(value)) {
      let res = getChangedParams(params[key], data[key])

    } else {
      if (params[key] === data[key]) {
        result[key] = params[key]
      }
    }
  }

  return result
}

new DataEditor({
  url: '',
  schema: [
    {
      data: 'data',
      params: 'params.hoister',
      dataId: 'id',
      paramsId: 'hoister_id',
    },
    {
      data: 'data.floors',
      params: 'params.floors',
      dataId: 'id',
      paramsId: 'id',
      keys: ['id', 'name', 'type']
    },
  ],
  savedMessage: '',
  closeConfirmTitle: '',
  closeConfirmContent: ''
})
