

export default function updateElement($parent, newNode, oldNode, index = 0) {
  if(!oldNode) {
    $parent.appendChild(createElement(newNode))
  } else if(!newNode) {
    $parent.removeChild($parent.childNodes[index])
  } else if(changed(newNode, oldNode)) {
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index])
  } else if(newNode.type) {

    updateProps($parent.childNodes[index], newNode.props, oldNode.props)

    let newLen = newNode.children.length
    let oldLen = oldNode.children.length
    for(let i = 0; i < newLen || i < oldLen; i++) {
      updateElement($parent.childNodes[index], newNode.children[i], oldNode.children[i], i)
    }
  }
}

// 
// props 

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
    if(isEventProp(name)) {
      $target.addEventListener(extractEventName(name), value, false)
    }
  } else if(name === 'className') {
    $target.setAttribute('class', value)
  } else if(typeof value === 'boolean') {
    setBooleanProp($target, name, value)
  } else {
    $target.setAttribute(name, value)
  }
}

function removeProp($target, name, value) {
  if(isCustomProp(name)) {
    if(isEventProp(name)) {
      $target.removeEventListener(extractEventName(name), window[value], false)
    }
  } else if(name === 'className') {
    $target.removeAttribute('class')
  } else if(typeof value === 'boolean') {
    removeBoolenProp($target, name)
  } else {
    $target.removeAttribute(name)
  }
}

function setProps($target, props) {
  Object.keys(props).forEach(function(name) {
    setProp($target, name, props[name])
  })
}

// create element by virtual dom

function createElement(node) {
  // comment node
  
  if(typeof node === 'string' || typeof node === 'number') {
    return document.createTextNode(node+'')
  }

  if(node.type === '!') {
    return document.createComment(node.children[0])
  }

  let $el = document.createElement(node.type)
  setProps($el, node.props)

  node.children
    .map(createElement)
    .forEach($el.appendChild.bind($el))
  return $el
}

//
// diff dom
//

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
        typeof node1 === 'string' && node1 !== node2 ||
        node1.type !== node2.type
}


// diff props

function updateProp($target, name, newValue, oldValue) {
  if(!newValue) {
    removeProp($target, name, oldValue)
  } else if(!oldValue || newValue !== oldValue) {
    setProp($target, name, newValue)
  }
}

function updateProps($target, newProps, oldProps) {
  oldProps = oldProps || {}
  let props = Object.assign({}, newProps, oldProps)
  Object.keys(props).forEach(function(name) {
    updateProp($target, name, newProps[name], oldProps[name])
  })
}
