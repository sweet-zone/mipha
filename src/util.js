
export const noop = function() {}

export function isFunction(f) {
  return typeof f === 'function'
}

export function isEmpty(obj) {
  return typeof obj === 'undefined' || obj === null
}
