
import Tokenizer from './tokenizer.js'
import { isEventProp, isMfProp } from '../vnode/customProp.js'

export default class Parser {

  constructor(input) {
    this.tokens = new Tokenizer(input).init()
    this.current = 0
  }

  parse () {
    let tokens = this.tokens

    let funcBody = ''
    while(this.current < tokens.length) {
      funcBody += this.walk()
    }
    // remove , if , on } left
    funcBody = funcBody.replace(/\,[\s]*\}/g, ' }')
    return new Function('context', 'h', 'with(context) { return ' + funcBody + ' }')
  }

  walk () {
    let tokens = this.tokens
    let token = tokens[this.current]

    if(token.type === 'comment') {
      this.current++

      token.comment = token.comment || ''

      return `h(\"!\", {}, [\"${token.comment}\"])`
    }

    if(token.type === 'if') {
      this.current++

      switch(token.mark) {
        case 'if':
          return '(function() { if (' + token.expr + ') { return '
        case 'elseif':
          return '} else if (' + token.expr + ') { return '
        case 'else':
          return '} else { return '
        case '/if':
          return '} })()'
      }
    }

    if(token.type === 'list') {
      this.current++

      switch(token.mark) {
        case 'list':
          return `(function() { return ${token.data}.map(function(_d, _i) { ${token.val} = _d; ${token.index} = _i; return `
        case '/list':
          return '}) })()'
      }
    }

    if(token.type === 'expr') {
      this.current++

      return `(function() { return ${token.expr} })()`
    }

    if(token.type === 'text') {
      this.current++

      return token.text
    }

    if(token.type === 'element') {
      if(typeof token.unary !== 'undefined') {
        if(!token.unary) { // tag open

          let node = {
            type: token.tag,
            props: this.handleProps(token.attrs),
            children: []
          }

          token = tokens[++this.current]

          while( !(token.type === 'element' && typeof token.unary === 'undefined') ) {
            // tag close
            let str = this.walk()
            if(token.type === 'text' && token.text && token.text.trim()) {
              str = ('"' + str.trim() + '"')
            }
            if( (!token.mark && str && str.trim()) ||
                (token.mark && (token.mark === '/if' || token.mark === '/list') ) ) {
              str += ','
            }
            if(!token.mark) {
              str = str.trim()
            }

            str = str.replace(/return[\s]*\,/g, 'return ')

            node.children.push(str)

            token = tokens[this.current]
          }

          let children = node.children.join('')

          if(children[children.length-1] === ',') {
            children = children.substring(0, children.length-1)
          }

          this.current++

          return `h(\"${node.type}\", ${node.props}, [${children}])`
        }

        this.current++
        return `h(\"${token.tag}\", ${this.handleProps(token.attrs)}, [])`
      } else {
        this.current++
        return ''
      }
    }
  }

  handleProps (attrs) {
    if(!attrs || !attrs.length) return '{}'
    let obj = '{'

    attrs.map(function(item) {
      let value
      if( isEventProp(item.name) ) {
        value = `function() { return ${item.value} }`
        obj += '\"' + item.name + '\":' + value + ','
      } else if( isMfProp(item.name) ) {
        value = `(function() { return ${item.value} })()`
        obj += '\"' + item.name + '\":' + value + ','
      } else {
        obj += '\"' + item.name + '\":\"' + item.value + '\",'
      }
    })

    obj = obj.substring(0, obj.length-1)
    obj += '}'
    return obj
  }

}

