

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
    setProp($target, name, newValue)
  }
}

function isCustomProp(name) {
  return isEventProp(name)
}

function isEventProp(name) {
  return /^on-/.test(name)
}

function extractEventName(name) {
  return name.slice(3).toLowerCase()
}

function setBooleanProp($target, name, value) {
  if(value) {
    $target.setAttribute(name, value)
    $target[name] = true
  } else {
    $target[name] = false
  }
}

function removeBoolenProp($target, name) {
  $target.removeAttribute(name)
  $target[name] = false
}

function setProp($target, name, value) {
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

function setCustomProp($target, name, value) {
  if(isEventProp(name)) {
    $target.addEventListener(extractEventName(name), value, false)
  }
}

function removeProp($target, name, value) {
  if(isCustomProp(name)) {
    removeCustomProp($target, name, value)
  } else if(name === 'className') {
    $target.removeAttribute('class')
  } else if(typeof value === 'boolean') {
    removeBoolenProp($target, name)
  } else {
    $target.removeAttribute(name)
  }
}

function removeCustomProp($target, name, value) {
  if(isEventProp(name)) {
    $target.removeEventListener(extractEventName(name), window[value], false)
  }
}