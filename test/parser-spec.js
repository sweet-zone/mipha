

import Parser from '../src/compiler/parser.js'
import h from '../src/vnode/h.js'
import { expect } from 'chai'

const testObj = {
  test: 1,
  text: 'mipha',
  items: [1,2,3],
  say: function() {
    console.log('say hi')
  }
}

describe('parser test', function() {

  it('pure html should return render function correctly', function() {
    let input = '<div data-index="1" class="mn">{text}</div>'
    let render = new Parser(input).parse()

    let vnode = render(testObj, h)
    expect(vnode.children[0]).to.be.equal('mipha')
  })

  it('html with if should return function correctly', function() {
    let input = '<div>{if test===1}1{elseif test===2}2{else}3{/if}</div>'
    let render = new Parser(input).parse()
    let vnode = render(testObj, h)

    expect(vnode.children[0]+'').to.be.equal('1')
  })

})