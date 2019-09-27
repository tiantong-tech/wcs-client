import cloneDeep from 'lodash/cloneDeep'

export function pull (params, data) {
  console.log(params)
  Object.keys(params).forEach(key => {
    params[key] = cloneDeep(data[key])
  })
}

export function getChanges (params, data) {

}

export function isChanged (changes) {
  return !!Object.keys(changes).length
}

export default {
  pull,
  isChanged,
  getChanges,
}
