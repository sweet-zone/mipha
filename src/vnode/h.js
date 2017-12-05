
import { isEmpty } from '../util.js'

export default function h(type, props = {}, children = []) {
  var cr = []
  children.map(function(child) {
    if(Array.isArray(child)) {
      child.map(function(c) {
        if( !isEmpty(c) ) cr.push(c)
      })
    } else {
      if( !isEmpty(child) ) cr.push(child)
    }
  })
  return {
    type: type,
    props: props,
    children: cr
  }
}
