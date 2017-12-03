
/**
 * Pure JavaScript HTML Parser
 * https://johnresig.com/blog/pure-javascript-html-parser/
 * by John Resig
 *
 * modified by DarkZone
 */

const startTag = /^<([-A-Za-z0-9_]+)((?:\s+[-\w]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/
const endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/
const attr = /([-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g

const closeSelf = makeMap('area,base,br,col,colgroup,command,embed,hr,img,input,keygen,link,meta,param,source,track,wbr')

const fillAttrs = makeMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected')

export default class Tokenizer {

  constructor(input) {
    this.input = (input || '').trim()
    this.stack = []
    this.tokens = []

    this.last = function() {
      return this.stack[this.stack.length - 1]
    }
  }

  init () {
    let input = this.input
    let last = input
    let match
    let index

    while(input) {
      let ch = input.charAt(0)

      if(ch === '<') {

        if(input.indexOf('<!--') === 0) {
          index = input.indexOf('-->')

          if(index >= 0) {
            this._handleComment(input.substring(4, index))
            input = input.substring(index + 3)
          }

        // end tag
        } else if(input.indexOf('</') === 0) {
          match = input.match(endTag)

          if(match) {
            input = input.substring(match[0].length)
            match[0].replace(endTag, this._handleEndTag.bind(this))
          }

        // start tag
        } else if(input.indexOf('<') === 0) {
          match = input.match(startTag)

          if(match) {
            input = input.substring(match[0].length)
            match[0].replace(startTag, this._handleElementStart.bind(this))
          }
        } 

      } else if(ch === '{') {

        if(input.indexOf('{if') === 0) {
          index = input.indexOf('}')

          if(index >= 0) {
            this._handleIfStart(input.substring(3, index), 'if')
            input = input.substring(index + 1)
          }

        } else if(input.indexOf('{/if}') === 0) {

          this._handleEndTag('', 'if')
          input = input.substring(5)

        } else if(input.indexOf('{elseif') === 0) {
          index = input.indexOf('}')

          if(index >= 0) {
            this._handleIfStart(input.substring(7, index), 'elseif') 
            input = input.substring(index + 1)
          }
        } else if(input.indexOf('{else}') === 0) {
          this._handleIfStart('', 'else') 
          input = input.substring(6)

        } else if(input.indexOf('{list') === 0) {
          index = input.indexOf('}')

          if(index >= 0) {
            this._handleListStart(input.substring(5, index), 'list') 
            input = input.substring(index + 1)
          }
        } else if(input.indexOf('{/list}') === 0) {
          this._handleEndTag('', 'list')
          input = input.substring(7)

        } else if(input.indexOf('{') === 0) {
            index = input.indexOf('}')

            if(index >= 0) {
              this._handleExpr(input.substring(1, index)) 
              input = input.substring(index + 1)
            }
        }

      } else {

        let index1 = input.indexOf('<') 
        let index2 = input.indexOf('{')
        if(index1 >= 0 && index2 >= 0) {
            index = (index1 < index2 ? index1 : index2)
        } else if(index1 === -1 && !index2 === -1 ) {
            index = -1
        } else if(index1 >= 0) {
            index = index1
        } else if(index2 >= 0) {
            index = index2
        }
        let text = index < 0 ? input : input.substring(0, index)
        input = index < 0 ? '' : input.substring(index)

        this._handleText(text)

      }

      if(last == input) {
        throw Error('parse error')
      }
      last = input
    }

    return this.tokens
  }

  _handleComment (comment) {
    this.tokens.push({
      type: 'comment',
      comment: comment
    })
  }

  _handleElementStart (tag, tagName, rest, unary) {
    tagName = tagName.toLowerCase()

    // if inline element contains block element

    // if self closed element is written into eg: <img></img>
    if(closeSelf[tagName] && this.last() === tagName) {
      this._handleEndTag('', tagName)
    }

    unary = closeSelf[tagName] || !!unary

    if(!unary) this.stack.push(tagName)

    let attrs = []
    
    rest.replace(attr, function(match, name) {
      let value = arguments[2] ? arguments[2] :
          arguments[3] ? arguments[3] :
          arguments[4] ? arguments[4] :
          fillAttrs[name] ? name : ''

      if(name === 'class') name = 'className'
      
      attrs.push({
        name: name,
        value: value
      })
    })

    this.tokens.push({
      type: 'element',
      tag: tagName,
      attrs: attrs,
      unary: unary
    })
  }

  _handleEndTag (tag, tagName) {
    let pos
    if(!tagName) {
      pos = 0
    } else {
      for(pos = this.stack.length - 1; pos >= 0; pos--) {
        if(this.stack[pos] === tagName) break
      }
    }

    if(pos >= 0) {
      for(let i = this.stack.length - 1; i >= pos; i--) {
        if(tagName === 'if') {
          this.tokens.push({
            type: 'if',
            mark: '/if'
          })
        } else if(tagName === 'list') {
          this.tokens.push({
            type: 'list',
            mark: '/list'
          })
        } else {
          this.tokens.push({
            type: 'element',
            tag: tagName
          })
        }
      }

      // Remove the open elements from the this.stack
      this.stack.length = pos
    }
  }

  _handleIfStart (expr, mark) {
    expr = expr.trim()

    if(mark === 'if') {
      this.stack.push('if')
    }

    if(mark === 'elseif' || mark === 'else') {
      if(this.last() !== 'if') {
        throw Error('there has unclosed if')
      }
    }

    this.tokens.push({
      type: 'if',
      expr: expr,
      mark: mark
    })
  }

  _handleListStart (expr) {
    expr = expr.trim()
    let arr = expr.split('as')
    if(arr) {
      if(arr[0]) arr[0] = arr[0].trim()
      if(arr[1]) arr[1] = arr[1].trim()
      this.tokens.push({
        type: 'list',
        data: arr[0] ? arr[0] : null,
        val: arr[1] ? arr[1] : null,
        index: arr[1] ? (arr[1] + '_index') : null,
        mark: 'list'
      })

      this.stack.push('list')
    }
  }

  _handleText (text) {
    this.tokens.push({
      type: 'text',
      text: text
    })
  }

  _handleExpr (expr) {
    expr = expr.trim()

    this.tokens.push({
      type: 'expr',
      expr: expr
    })
  }

}



function makeMap(str){
  let obj = {}, items = str.split(',')
  for ( let i = 0; i < items.length; i++ )
    obj[ items[i] ] = true
  return obj
}

function arr2map(arr) {
  let obj = {}
  arr.map(function(item) {
    obj[item.name] = item.value
  })
  return obj
}