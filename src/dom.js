

export function setProp($target, name, value) {
  if(name === 'className') {
    $target.setAttribute('class', value)
  } else if(name === 'htmlFor') {
    $target.setAttribute('for', value)
  } else if(typeof value === 'boolean') {
    setBooleanProp($target, name, value)
  } else {
    $target.setAttribute(name, value)
  }
}

export function removeProp($target, name, value) {
  if(name === 'className') {
    $target.removeAttribute('class')
  } else if(name === 'htmlFor') {
    $target.removeAttribute('for', value)
  } else if(typeof value === 'boolean') {
    removeBooleanProp($target, name)
  } else {
    $target.removeAttribute(name)
  }
}

export function setBooleanProp($target, name, value) {
  if(value) {
    $target.setAttribute(name, value)
    $target[name] = true
  } else {
    $target[name] = false
  }
}

export function removeBooleanProp($target, name) {
  $target.removeAttribute(name)
  $target[name] = false
}
