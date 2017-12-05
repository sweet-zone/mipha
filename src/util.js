
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
