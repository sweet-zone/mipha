
// on-click="say()"
// mf-class="{ red: isRed, 'text-red': isRed === 1 }"
// mf-class="red"
//
// mf-show
// mf-model
// mf-html

import { camelCase } from '../util.js'
import { setProp } from '../dom.js'

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
    } else if(name === 'show') {
      if(!!value === true) {
        $target.style.display = ''
      } else {
        $target.style.display = 'none'
      }
    } else if(name === 'html') {
      $target.innerHTML = value
    } else if(name === 'model') {
      // @todo
    } else {
      setProp($target, name, value)
    }

  }
}

export function removeCustomProp($target, name, value) {
  if( isEventProp(name) ) {
    $target.removeEventListener(name, value, false)
  }
}
