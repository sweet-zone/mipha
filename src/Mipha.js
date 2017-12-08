
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

  this.vnode = this._render(this, h)
  if(this.isMounted) {
    this.$mount(this.$parent)
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

    // Object.keys(this.components).forEach((name) => {
    //   this.components[name].isMounted = true
    // })
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
  this.components = {}

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
    if(this.vnode.children && this.vnode.children.length) {
      this.vnode.children = replaceVNodeChild(this.vnode.children, components, names, this)
    }
  }

  function replaceVNodeChild(children, components, names, self) {
    return children.map(function(child) {
      let i = names.indexOf(child.type)
      if(i === -1) return child

      let component = new components[ names[i] ]()
      self.components[ names[i] ] = component
      return component.vnode

      if(child.children && child.children.length) {
        return replaceVNodeChild(child.chilren, components)
      }
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




