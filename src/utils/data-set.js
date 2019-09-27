export function clear (data) {
  data.data = {}
  data.result = []
}

export function from (dataSource = [], callback) {
  const list = [], entities = {}

  dataSource.forEach(data => {
    let id = data.id
    let entity = data

    if (callback) {
      [id, entity] = callback(data)
    }

    list.push(id)
    entities[id] = entity
  })

  return { list, entities }
}

export function push (data, ...params) {
  const state = from(...params)

  data.result.push(...state)
  Object.assign(data.data, state.data)
}

export default {
  push,
  from,
  clear,
  map,
}
