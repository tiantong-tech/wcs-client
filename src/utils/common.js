export function isStrictEqual (a, b) {
  if (typeof a === typeof b && typeof a === 'object') {
    // 处理 null 为 object 的问题
    if (a === null && b === null) {
      return a === b
    }

    if (a.length !== b.length) {
      return false
    }

    for (let key in a) {
      if (a[key] !== b[key]) {
        return false
      }
    }

    return true
  } else {
    return a === b
  }
}

export function getFormatDate () {
  let date = new Date()
  let month = '' + (date.getMonth() + 1)
  let day = '' + date.getDate()
  let year = date.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}
