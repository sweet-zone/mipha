
# Mipha

**a simple and simple mvvm library**

> Mipha (ミファー Mifā) is a character in The Legend of Zelda: Breath of the Wild. She is the Princess of the Zora and a major character. Mipha is also the Zora Champion, one of Link's allies, and wears the same blue cloth as Daruk, Urbosa and Revali. This blue cloth is similar to the blue shirts worn by Link and Zelda.  [Zelda Wiki](http://zelda.wikia.com/wiki/Mipha)

![Mipha](http://nos.netease.com/dealer/cfdc6c4841a6ecd505fb1d165fbb78c5ea38b5a07004de28502d95c900968d58.png)

## Example

```js
let mipha = new Mipha({
  template: `<div id="mipha">
      <h1>{title}</h1>
      {if zelda}
      <p>{hello}</p>
      {/if}
    </div>`,

  state: {
    title: 'Mipha',
    zelda: true,
    hello: 'a simple and simple mvvm library'
  },

  created: function() {
    console.log('created!')
  },

  mounted: function() {
    console.log('mounted!')
  }
})

mipha.$mount(document.getElementById('app'))
```

## How to USE

### Template Syntax


* Text

```html
<p>{ message }</p>
```

* Html

```html
<p mf-html="message"></p>
```

* Using JavaScript Expressions

```html
<p>{ x + 1 }</p>
<p>{ ok ? 'YES' : 'NO' }</p>
<p>{ message.split('').reverse().join('') }</p>
```

### props bindings

```html
<p mf-id="myId"></p>

<!-- display none or not -->
<p mf-show="isShow"></p>
```

### Conditional Rendering

```html
{if x === 1}
<p>1</p>
{elseif x === 2}
<p>2</p>
{else}
<p>3</p>
{/if}
```

### List Rendering

```html
<ul>
  {list items as item}
  <li><span>{item}</span><span>{item_index}</span></li>
  {/list}
</ul>
```

**use `item_index` for list index**

### Event Handling

```html
<button on-click="handleClick"></button>
```

**if you want to handle event object, use `$event`**

```html
<button on-click="handleClick($event, ':)')"></button>
```

### setState

```js
this.setState({
  todos: newTodos
})
```

## Examples

see [examples](https://github.com/zjzhome/mipha/tree/master/example)

## License

[MIT](https://opensource.org/licenses/MIT)



