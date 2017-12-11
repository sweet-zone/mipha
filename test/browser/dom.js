
import * as dom from '../../src/dom.js'

let expect = chai.expect

describe('#dom handler test', function() {
  it('setProp set class/for should work correctly', function() {
    let input = document.createElement('input')
    dom.setProp(input, 'className', 'input1')
    dom.setProp(input, 'htmlFor', 'x2')
    document.body.appendChild(input)
    expect($('.input1').attr('for')).to.be.equal('x2')
  })

  it('setProp set style should work correctly', function() {
    let input = document.createElement('input')
    dom.setProp(input, 'className', 'input2')
    dom.setProp(input, 'style', 'color:red;font-size:28px;')
    document.body.appendChild(input)
    expect($('.input2').css('font-size')).to.be.equal('28px')
  })

  it('setProp set boolean prop should work correctly', function() {
    let input = document.createElement('input')
    dom.setProp(input, 'className', 'input3')
    dom.setProp(input, 'type', 'radio')
    dom.setProp(input, 'checked', true)
    document.body.appendChild(input)
    expect($('.input3').attr('checked')).to.be.equal('checked')
  })
})
