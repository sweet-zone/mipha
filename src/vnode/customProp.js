
// on-click="say()"

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
  if(isEventProp(name)) {
    $target.addEventListener(extractCustomPropName(name), value, false)
  }
}

export function removeCustomProp($target, name, value) {
  if(isEventProp(name)) {
    $target.removeEventListener(name, value, false)
  }
}
