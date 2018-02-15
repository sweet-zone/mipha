
import entities from './entities.js'

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

// thanks to regularjs
const rEntity = new RegExp("&(?:(#x[0-9a-fA-F]+)|(#[0-9]+)|(" + Object.keys(entities).join('|') + '));', 'gi');

export function convertEntity(chr){

  return ('' + chr).replace(rEntity, function(all, hex, dec, capture){
    var charCode
    if( dec ) charCode = parseInt( dec.slice(1), 10 )
    else if( hex ) charCode = parseInt( hex.slice(2), 16 )
    else charCode = entities[capture]

    return String.fromCharCode( charCode )
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

export function happyNewYear() {
  return 'wangwangwang ~'
}
