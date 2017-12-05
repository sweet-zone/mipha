
import { setProp, removeProp } from './prop.js'

export function updateProps($target, newProps, oldProps = {}) {
  let props = Object.assign({}, newProps, oldProps)
  Object.keys(props).forEach(function(name) {
    updateProp($target, name, newProps[name], oldProps[name])
  })
}

export function setProps($target, props) {
  Object.keys(props).forEach(function(name) {
    setProp($target, name, props[name])
  })
}

function updateProp($target, name, newValue, oldValue) {
  if(!newValue) {
    removeProp($target, name, oldValue)
  } else if(!oldValue || newValue !== oldValue) {
    // didnt handle event handler change
    if( newValue && oldValue && (typeof newValue === 'function' && typeof oldValue === 'function') )
      return

    setProp($target, name, newValue, oldValue)
  }
}

