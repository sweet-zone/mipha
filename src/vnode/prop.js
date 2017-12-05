

import { isCustomProp, setCustomProp, removeCustomProp } from './customProp.js'

export function setProp($target, name, value) {
  if(isCustomProp(name)) {
    setCustomProp($target, name, value)
  } else if(name === 'className') {
    $target.setAttribute('class', value)
  } else if(typeof value === 'boolean') {
    setBooleanProp($target, name, value)
  } else {
    $target.setAttribute(name, value)
  }
}

export function removeProp($target, name, value) {
  if(isCustomProp(name)) {
    removeCustomProp($target, name, value)
  } else if(name === 'className') {
    $target.removeAttribute('class')
  } else if(typeof value === 'boolean') {
    removeBooleanProp($target, name)
  } else {
    $target.removeAttribute(name)
  }
}

function setBooleanProp($target, name, value) {
  if(value) {
    $target.setAttribute(name, value)
    $target[name] = true
  } else {
    $target[name] = false
  }
}

function removeBooleanProp($target, name) {
  $target.removeAttribute(name)
  $target[name] = false
}
