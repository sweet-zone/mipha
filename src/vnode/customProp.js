
// on-click="say()"
// mf-class="{ red: isRed, 'text-red': isRed === 1 }"
// mf-class="red"

import { camelCase } from '../util.js'
import { setProp, removeProp } from '../dom.js'

export function isCustomProp(name) {
  return isEventProp(name) || isMfProp(name)
}

export function isEventProp(name) {
  return /^on-/.test(name)
}

export function isMfProp(name) {
  return /^mf-/.test(name)
}

function extractCustomPropName(name) {
  return name.slice(3).toLowerCase()
}

export function setCustomProp($target, name, value) {
  if( isEventProp(name) ) {
    $target.addEventListener(extractCustomPropName(name), value, false)
  } else if( isMfProp(name) ) {
    name = extractCustomPropName(name)
    if(typeof value === 'string' || typeof value === 'number') {
      setProp($target, name, value)
    } else {
      // class or style
      if(name === 'class') {
        Object.keys(value).forEach(function(k) {
          if(value[k]) {
            $target.classList.add(k)
          } else {
            $target.classList.remove(k)
          }
        })
      } else if(name === 'style') {
        Object.keys(value).forEach(function(k) {
          let k1 = camelCase(k)
          $target.style[k1] = value[k]
        })
      }
    }
  }
}

export function removeCustomProp($target, name, value) {
  if( isEventProp(name) ) {
    $target.removeEventListener(name, value, false)
  }
}
