

export default function h(type, props = {}, children = []) {
  var cr = []
  children.map(function(child) {
    if(Array.isArray(child)) {
      child.map(function(c) {
        cr.push(c)
      })
    } else {
      cr.push(child)
    }
  })
  return {
    type: type,
    props: props,
    children: cr
  }
}