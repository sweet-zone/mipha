
import { LIFECYCLE_HOOKS } from './constants.js'
import { noop, isFunction } from './util.js'
import Parser from './compiler/parser.js'
import h from './compiler/h.js'
import updateElement from './compiler/patch.js'

export default function Mipha(options = {}) {
  let template = (options.template || '').trim()
  options.state = options.state || {}
  options.methods = options.methods || {}
  this.options = options
  this._render = new Parser(template).parse()
  this.oldVNode = null
  this.vnode = null
  this.isMounted = false

  LIFECYCLE_HOOKS.map((hook) => {
    this[hook] = ( options[hook] && isFunction(options[hook]) ) ? options[hook] : noop
  })

  this._mount2this(options)
  this._init()
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
  }
}

mo._init = function() {
  this.vnode = this._render(this, h)
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

mo._destroy = function() {

}

Mipha.extend = function() {
  
}




