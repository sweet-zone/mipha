
import { setProp, removeProp } from '../dom.js'
import { isCustomProp, setCustomProp, removeCustomProp } from './customProp.js'

export function updateProps($target, newProps, oldProps = {}) {
  let props = Object.assign({}, newProps, oldProps)
  Object.keys(props).forEach(function(name) {
    updateProp($target, name, newProps[name], oldProps[name])
  })
}

export function setProps($target, props) {
  Object.keys(props).forEach(function(name) {
    setPropX($target, name, props[name])
  })
}

function updateProp($target, name, newValue, oldValue) {
  if(!newValue) {
    removePropX($target, name, oldValue)
  } else if(!oldValue || newValue !== oldValue) {
    // didnt handle event handler change
    if( newValue && oldValue && (typeof newValue === 'function' && typeof oldValue === 'function') )
      return

    setPropX($target, name, newValue, oldValue)
  }
}

function setPropX($target, name, value) {
  if(isCustomProp(name)) {
    setCustomProp($target, name, value)
  } else {
    setProp($target, name, value)
  }
}

function removePropX($target, name, value) {
  if(isCustomProp(name)) {
    removeCustomProp($target, name, value)
  } else {
    removeProp($target, name, value)
  }
}

