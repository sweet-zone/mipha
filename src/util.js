
export const noop = function() {}

export function isFunction(f) {
  return typeof f === 'function'
}

export function isEmpty(obj) {
  return typeof obj === 'undefined' || obj === null
}

const dash = /-([a-z])/g
export function camelCase(str) {
  return str.replace(dash, function(all, capture){
    return capture.toUpperCase()
  })
}

export function merge(o1, o2) {
  let o = {}
  for(let k in o1) {
    o[k] = o1[k]
  }
  for(let k in o2) {
    if(typeof o2[k] === 'object') {
      if(!o[k]) o[k] = {}
      for(let m in o2[k]) {
        o[k][m] = o2[k][m]
      }
    } else {
      o[k] = o2[k]
    }
  }
  return o
}
