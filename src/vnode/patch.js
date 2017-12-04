
import { updateProps, setProps } from './props.js'

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

// create element by virtual dom

function createElement(node) {
  
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


function changed(node1, node2) {
  return typeof node1 !== typeof node2 ||
    typeof node1 === 'string' && node1 !== node2 ||
    node1.type !== node2.type
}





