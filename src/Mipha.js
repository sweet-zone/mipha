
import { LIFECYCLE_HOOKS } from './constants.js'
import { noop, isFunction, merge } from './util.js'
import Parser from './compiler/parser.js'
import h from './vnode/h.js'
import updateElement from './vnode/patch.js'

export default function Mipha(options = {}) {
  this._init(options)
}

let mo = Mipha.prototype

mo.setState = function(state) {
  this.options.state = Object.assign({}, this.options.state, state)
  this._mountState2this(this.options)

  // 判断是不是有外层组件，如果有外层组件，则修改外层组件的 vnode，
  // 判断外层组件是否 isMount 确定外层是否 $mount
  // 若无，则按之前逻辑
  this.vnode = this._render(this, h)

  if(this.outers && this.outers.length) {
    this.outers.forEach(function(outer) {
      outer._insertVNodeFromComponents()
      if(outer.isMounted) {
        outer.$mount(outer.$parent)
      }
    })
  } else {
    if(this.isMounted) {
      this.$mount(this.$parent)
    }
  }
}

mo.$mount = function($parent) {
  $parent = $parent || document.body
  updateElement($parent, this.vnode, this.oldVNode)

  this.oldVNode = this.vnode

  if(!this.isMounted) {
    this.mounted()
    this.isMounted = true
    this.$parent = $parent
  }
}

mo._init = function(options) {
  let template = (options.template || '').trim()
  options.state = options.state || {}
  options.methods = options.methods || {}
  this.options = options
  this._render = new Parser(template).parse()

  this.oldVNode = null
  this.vnode = null
  this.isMounted = false
  this.components = {}  // includes components
  this.outers = []      // outer components

  LIFECYCLE_HOOKS.map((hook) => {
    this[hook] = ( options[hook] && isFunction(options[hook]) ) ? options[hook] : noop
  })

  this._mount2this(options)

  this.vnode = this._render(this, h)

  this._insertVNodeFromComponents()

  this.created()
}

mo._mount2this = function(options) {
  this._mountState2this(options)
  for(let key in options.methods) {
    this[key] = options.methods[key]
  }
}

mo._mountState2this = function(options) {
  for(let key in options.state) {
    this[key] = options.state[key]
  }
}

mo._insertVNodeFromComponents = function() {
  let components = this.options.components

  if(typeof components === 'object' && Object.keys(components).length) {
    const names = Object.keys(components)
    this.originalVNode = this._render(this, h)
    if(this.originalVNode.children && this.originalVNode.children.length) {
      this.originalVNode.children = replaceVNodeChild(this.originalVNode.children, components, names, this)
      this.vnode = this.originalVNode
    }
  }

  function replaceVNodeChild(children, components, names, self) {
    return children.map(function(child) {
      let i = names.indexOf(child.type)
      if(i === -1) return child

      let component = self.components[ names[i] ]
      if(!component) {
        component = new components[ names[i] ]()
        self.components[ names[i] ] = component

        // push outers
        if(component.outers.indexOf(self) === -1) {
          component.outers.push(self)
        }
      }

      if(child.children && child.children.length) {
        return replaceVNodeChild(child.chilren, components, names, self)
      }

      return component.vnode
    })
  }
}

mo._destroy = function() {

}

Mipha.extend = function(exOptions = {}) {
  const Super = this

  const Sub = function MiphaComponent(options = {}) {
    options = merge(Sub.options, options)
    this._init(options)
  }
  Sub.prototype = Object.create(Super.prototype)
  Sub.prototype.constructor = Sub
  Sub.options = Object.assign({}, Super.options, exOptions)
  Sub['super'] = Super

  Sub.extend = Super.extend

  return Sub
}




