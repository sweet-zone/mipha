
import Tokenizer from '../src/compiler/tokenizer.js'
import { expect } from 'chai'

describe('tokenizer test', function() {

  it('pure html should return tokens correctly', function() {
    let input = '<div data-index="1" class="mn"><p>mipha</p></div>'
    let tokens = new Tokenizer(input).init()

    expect(tokens[0].tag).to.be.equal('div')
    expect(tokens[0].type).to.be.equal('element')
    expect(tokens[0].unary).to.be.equal(false)
    expect(tokens[0].attrs[0].name).to.be.equal('data-index')
    expect(tokens[0].attrs[1].value).to.be.equal('mn')
    expect(tokens[2].text).to.be.equal('mipha')
  })

  it('html with if should return tokens correctly', function() {
    let input = '<div>{if test===1}1{elseif test===2}2{else}3{/if}</div>'
    let tokens = new Tokenizer(input).init()

    expect(tokens[1].type).to.be.equal('if')
    expect(tokens[1].mark).to.be.equal('if')
    expect(tokens[1].expr).to.be.equal('test===1')
  })

  it('html with list should return tokens correctly', function() {
    let input = '<ul>{list items as item}{item}{/list}</ul>'
    let tokens = new Tokenizer(input).init()

    expect(tokens[1].type).to.be.equal('list')
    expect(tokens[1].mark).to.be.equal('list')
    expect(tokens[1].data).to.be.equal('items')
    expect(tokens[1].val).to.be.equal('item')
  })

})