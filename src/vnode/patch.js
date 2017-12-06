
import { updateProps, setProps } from './props.js'

let cachedRemoveNodes = []

export default function updateElement($parent, newNode, oldNode, index = 0) {
  if(!oldNode) {
    $parent.appendChild(createElement(newNode))
  } else if(!newNode) {
    cachedRemoveNodes.push($parent.childNodes[index])
    //$parent.removeChild($parent.childNodes[index])
  } else if(changed(newNode, oldNode)) {
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index])
  } else if(newNode.type) {

    updateProps($parent.childNodes[index], newNode.props, oldNode.props)

    let newLen = newNode.children.length
    let oldLen = oldNode.children.length
    let $curParent = $parent.childNodes[index]
    for(let i = 0; i < newLen || i < oldLen; i++) {
      updateElement($curParent, newNode.children[i], oldNode.children[i], i)
    }
    if(cachedRemoveNodes.length) {
      cachedRemoveNodes.forEach(function(node) {
        $curParent.removeChild(node)
      })
      cachedRemoveNodes = []
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





