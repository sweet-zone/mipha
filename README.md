
# Mipha

**a simple and simple mvvm library**

> Mipha (ミファー Mifā) is a character in The Legend of Zelda: Breath of the Wild. She is the Princess of the Zora and a major character. Mipha is also the Zora Champion, one of Link's allies, and wears the same blue cloth as Daruk, Urbosa and Revali. This blue cloth is similar to the blue shirts worn by Link and Zelda.  [Zelda Wiki](http://zelda.wikia.com/wiki/Mipha)

![Mipha](http://nos.netease.com/dealer/cfdc6c4841a6ecd505fb1d165fbb78c5ea38b5a07004de28502d95c900968d58.png)

## Example

```js

  let mipha = new Mipha({
    template: `<div id="user">{if login}<p>Mipha</p>{/if}<ul>{list items as item}<li>{item}</li>{/list}</ul><p>{say()}</p></div>`,

    state: {
      items: [1, 2, 3],
      login: true
    },

    created: function() {
      console.log('created!')
    },

    mounted: function() {
      console.log('mounted!')
    },

    methods: {
      say: function() {
        return 'I am here'
      }
    }
  })

  mipha.$mount(document.getElementById('app'))

  setTimeout(function() {
    mipha.setState({
      login: false
    })
  }, 2000)
```

## Document

### Template Syntax

### props bindings

### Conditional Rendering

### List Rendering

### Event Handling

## developing





