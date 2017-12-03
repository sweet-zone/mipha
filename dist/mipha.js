(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Mipha"] = factory();
	else
		root["Mipha"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Mipha = __webpack_require__(1);

var _Mipha2 = _interopRequireDefault(_Mipha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Mipha2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Mipha;

var _constants = __webpack_require__(2);

var _util = __webpack_require__(3);

var _parser = __webpack_require__(4);

var _parser2 = _interopRequireDefault(_parser);

var _h = __webpack_require__(6);

var _h2 = _interopRequireDefault(_h);

var _patch = __webpack_require__(7);

var _patch2 = _interopRequireDefault(_patch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Mipha() {
  var _this = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var template = (options.template || '').trim();
  options.state = options.state || {};
  options.methods = options.methods || {};
  this.options = options;
  this._render = new _parser2.default(template).parse();
  this.oldVNode = null;
  this.vnode = null;
  this.isMounted = false;

  _constants.LIFECYCLE_HOOKS.map(function (hook) {
    _this[hook] = options[hook] && (0, _util.isFunction)(options[hook]) ? options[hook] : _util.noop;
  });

  this._mount2this(options);
  this._init();
}

var mo = Mipha.prototype;

mo.setState = function (state) {
  this.options.state = Object.assign({}, this.options.state, state);
  this._mountState2this(this.options);

  this.vnode = this._render(this, _h2.default);
  if (this.isMounted) {
    this.$mount(this.$parent);
  }
};

mo.$mount = function ($parent) {
  $parent = $parent || document.body;
  (0, _patch2.default)($parent, this.vnode, this.oldVNode);

  this.oldVNode = this.vnode;

  if (!this.isMounted) {
    this.mounted();
    this.isMounted = true;
    this.$parent = $parent;
  }
};

mo._init = function () {
  this.vnode = this._render(this, _h2.default);
  this.created();
};

mo._mount2this = function (options) {
  this._mountState2this(options);
  for (var key in options.methods) {
    this[key] = options.methods[key];
  }
};

mo._mountState2this = function (options) {
  for (var key in options.state) {
    this[key] = options.state[key];
  }
};

mo._destroy = function () {};

Mipha.extend = function () {};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LIFECYCLE_HOOKS = exports.LIFECYCLE_HOOKS = ['created', 'mounted', 'destroyed'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isFunction = isFunction;
var noop = exports.noop = function noop() {};

function isFunction(f) {
    return typeof f === 'function';
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tokenizer = __webpack_require__(5);

var _tokenizer2 = _interopRequireDefault(_tokenizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = function () {
  function Parser(input) {
    _classCallCheck(this, Parser);

    this.tokens = new _tokenizer2.default(input).init();
    this.current = 0;
  }

  _createClass(Parser, [{
    key: 'parse',
    value: function parse() {
      var tokens = this.tokens;
      var funcBody = '';
      while (this.current < tokens.length) {
        funcBody += this.walk();
      }
      // remove , if , on } left
      funcBody = funcBody.replace(/\,[\s]*\}/g, ' }');
      return new Function('context', 'h', 'with(context) { return ' + funcBody + ' }');
    }
  }, {
    key: 'walk',
    value: function walk() {
      var tokens = this.tokens;
      var token = tokens[this.current];

      if (token.type === 'comment') {
        this.current++;

        return {
          type: token.type,
          comment: token.comment
        };
      }

      if (token.type === 'if') {
        this.current++;

        switch (token.mark) {
          case 'if':
            return '(function() { if (' + token.expr + ') { return ';
          case 'elseif':
            return '} else if (' + token.expr + ') { return ';
          case 'else':
            return '} else { return ';
          case '/if':
            return '} })()';
        }
      }

      if (token.type === 'list') {
        this.current++;

        switch (token.mark) {
          case 'list':
            return '(function() { return ' + token.data + '.map(function(_d, _i) { ' + token.val + ' = _d; ' + token.index + ' = _i; return ';
          case '/list':
            return '}) })()';
        }
      }

      if (token.type === 'expr') {
        this.current++;

        return '(function() { return ' + token.expr + ' })()';
      }

      if (token.type === 'text') {
        this.current++;

        return token.text;
      }

      if (token.type === 'element') {
        if (typeof token.unary !== 'undefined') {
          if (!token.unary) {
            // 标签开始

            var node = {
              type: token.tag,
              props: arr2map(token.attrs),
              children: []
            };

            token = tokens[++this.current];

            while (!(token.type === 'element' && typeof token.unary === 'undefined')) {
              // tag close
              var str = this.walk();
              if (token.type === 'text' && token.text && token.text.trim()) {
                str = '"' + str.trim() + '"';
              }
              if (!token.mark && str && str.trim() || token.mark && (token.mark === '/if' || token.mark === '/list')) {
                str += ',';
              }
              if (!token.mark) {
                str = str.trim();
              }

              str = str.replace(/return[\s]*\,/g, 'return ');

              node.children.push(str);

              token = tokens[this.current];
            }

            var children = node.children.join('');

            if (children[children.length - 1] === ',') {
              children = children.substring(0, children.length - 1);
            }

            this.current++;

            return 'h("' + node.type + '", ' + node.props + ', [' + children + '])';
          }

          this.current++;
          return 'h("' + token.tag + '", ' + arr2map(token.attrs) + ', [])';
        } else {
          this.current++;
          return '';
        }
      }
    }
  }]);

  return Parser;
}();

exports.default = Parser;


function arr2map(arr) {
  if (!arr || !arr.length) return '{}';
  var obj = '{';
  arr.map(function (item) {
    obj += '"' + item.name + '":"' + item.value + '",';
  });
  obj = obj.substring(0, obj.length - 1);
  obj += '}';
  return obj;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Pure JavaScript HTML Parser
 * https://johnresig.com/blog/pure-javascript-html-parser/
 * by John Resig
 *
 * modified by DarkZone
 */

var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[-\w]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr = /([-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

var closeSelf = makeMap('area,base,br,col,colgroup,command,embed,hr,img,input,keygen,link,meta,param,source,track,wbr');

var fillAttrs = makeMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected');

var Tokenizer = function () {
  function Tokenizer(input) {
    _classCallCheck(this, Tokenizer);

    this.input = (input || '').trim();
    this.stack = [];
    this.tokens = [];

    this.last = function () {
      return this.stack[this.stack.length - 1];
    };
  }

  _createClass(Tokenizer, [{
    key: 'init',
    value: function init() {
      var input = this.input;
      var last = input;
      var match = void 0;
      var index = void 0;

      while (input) {
        var ch = input.charAt(0);

        if (ch === '<') {

          if (input.indexOf('<!--') === 0) {
            index = input.indexOf('-->');

            if (index >= 0) {
              this._handleComment(input.substring(4, index));
              input = input.substring(index + 3);
            }

            // end tag
          } else if (input.indexOf('</') === 0) {
            match = input.match(endTag);

            if (match) {
              input = input.substring(match[0].length);
              match[0].replace(endTag, this._handleEndTag.bind(this));
            }

            // start tag
          } else if (input.indexOf('<') === 0) {
            match = input.match(startTag);

            if (match) {
              input = input.substring(match[0].length);
              match[0].replace(startTag, this._handleElementStart.bind(this));
            }
          }
        } else if (ch === '{') {

          if (input.indexOf('{if') === 0) {
            index = input.indexOf('}');

            if (index >= 0) {
              this._handleIfStart(input.substring(3, index), 'if');
              input = input.substring(index + 1);
            }
          } else if (input.indexOf('{/if}') === 0) {

            this._handleEndTag('', 'if');
            input = input.substring(5);
          } else if (input.indexOf('{elseif') === 0) {
            index = input.indexOf('}');

            if (index >= 0) {
              this._handleIfStart(input.substring(7, index), 'elseif');
              input = input.substring(index + 1);
            }
          } else if (input.indexOf('{else}') === 0) {
            this._handleIfStart('', 'else');
            input = input.substring(6);
          } else if (input.indexOf('{list') === 0) {
            index = input.indexOf('}');

            if (index >= 0) {
              this._handleListStart(input.substring(5, index), 'list');
              input = input.substring(index + 1);
            }
          } else if (input.indexOf('{/list}') === 0) {
            this._handleEndTag('', 'list');
            input = input.substring(7);
          } else if (input.indexOf('{') === 0) {
            index = input.indexOf('}');

            if (index >= 0) {
              this._handleExpr(input.substring(1, index));
              input = input.substring(index + 1);
            }
          }
        } else {

          var index1 = input.indexOf('<');
          var index2 = input.indexOf('{');
          if (index1 >= 0 && index2 >= 0) {
            index = index1 < index2 ? index1 : index2;
          } else if (index1 === -1 && !index2 === -1) {
            index = -1;
          } else if (index1 >= 0) {
            index = index1;
          } else if (index2 >= 0) {
            index = index2;
          }
          var text = index < 0 ? input : input.substring(0, index);
          input = index < 0 ? '' : input.substring(index);

          this._handleText(text);
        }

        if (last == input) {
          throw Error('parse error');
        }
        last = input;
      }

      return this.tokens;
    }
  }, {
    key: '_handleComment',
    value: function _handleComment(comment) {
      this.tokens.push({
        type: 'comment',
        comment: comment
      });
    }
  }, {
    key: '_handleElementStart',
    value: function _handleElementStart(tag, tagName, rest, unary) {
      tagName = tagName.toLowerCase();

      // if inline element contains block element

      // if self closed element is written into eg: <img></img>
      if (closeSelf[tagName] && this.last() === tagName) {
        this._handleEndTag('', tagName);
      }

      unary = closeSelf[tagName] || !!unary;

      if (!unary) this.stack.push(tagName);

      var attrs = [];

      rest.replace(attr, function (match, name) {
        var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : '';

        if (name === 'class') name = 'className';

        attrs.push({
          name: name,
          value: value
        });
      });

      this.tokens.push({
        type: 'element',
        tag: tagName,
        attrs: attrs,
        unary: unary
      });
    }
  }, {
    key: '_handleEndTag',
    value: function _handleEndTag(tag, tagName) {
      var pos = void 0;
      if (!tagName) {
        pos = 0;
      } else {
        for (pos = this.stack.length - 1; pos >= 0; pos--) {
          if (this.stack[pos] === tagName) break;
        }
      }

      if (pos >= 0) {
        for (var i = this.stack.length - 1; i >= pos; i--) {
          if (tagName === 'if') {
            this.tokens.push({
              type: 'if',
              mark: '/if'
            });
          } else if (tagName === 'list') {
            this.tokens.push({
              type: 'list',
              mark: '/list'
            });
          } else {
            this.tokens.push({
              type: 'element',
              tag: tagName
            });
          }
        }

        // Remove the open elements from the this.stack
        this.stack.length = pos;
      }
    }
  }, {
    key: '_handleIfStart',
    value: function _handleIfStart(expr, mark) {
      expr = expr.trim();

      if (mark === 'if') {
        this.stack.push('if');
      }

      if (mark === 'elseif' || mark === 'else') {
        if (this.last() !== 'if') {
          throw Error('there has unclosed if');
        }
      }

      this.tokens.push({
        type: 'if',
        expr: expr,
        mark: mark
      });
    }
  }, {
    key: '_handleListStart',
    value: function _handleListStart(expr) {
      expr = expr.trim();
      var arr = expr.split('as');
      if (arr) {
        if (arr[0]) arr[0] = arr[0].trim();
        if (arr[1]) arr[1] = arr[1].trim();
        this.tokens.push({
          type: 'list',
          data: arr[0] ? arr[0] : null,
          val: arr[1] ? arr[1] : null,
          index: arr[1] ? arr[1] + '_index' : null,
          mark: 'list'
        });

        this.stack.push('list');
      }
    }
  }, {
    key: '_handleText',
    value: function _handleText(text) {
      this.tokens.push({
        type: 'text',
        text: text
      });
    }
  }, {
    key: '_handleExpr',
    value: function _handleExpr(expr) {
      expr = expr.trim();

      this.tokens.push({
        type: 'expr',
        expr: expr
      });
    }
  }]);

  return Tokenizer;
}();

exports.default = Tokenizer;


function makeMap(str) {
  var obj = {},
      items = str.split(',');
  for (var i = 0; i < items.length; i++) {
    obj[items[i]] = true;
  }return obj;
}

function arr2map(arr) {
  var obj = {};
  arr.map(function (item) {
    obj[item.name] = item.value;
  });
  return obj;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = h;
function h(type) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var cr = [];
  children.map(function (child) {
    if (Array.isArray(child)) {
      child.map(function (c) {
        cr.push(c);
      });
    } else {
      cr.push(child);
    }
  });
  return {
    type: type,
    props: props,
    children: cr
  };
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = updateElement;
function updateElement($parent, newNode, oldNode, index) {
  index = index || 0;
  if (!oldNode) {
    $parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  } else if (newNode.type) {

    updateProps($parent.childNodes[index], newNode.props, oldNode.props);

    var newLen = newNode.children.length;
    var oldLen = oldNode.children.length;
    for (var i = 0; i < newLen || i < oldLen; i++) {
      updateElement($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
    }
  }
}

// 
// props 

function isCustomProp(name) {
  return isEventProp(name);
}

function isEventProp(name) {
  return (/^on-/.test(name)
  );
}

function extractEventName(name) {
  return name.slice(3).toLowerCase();
}

function setBooleanProp($target, name, value) {
  if (value) {
    $target.setAttribute(name, value);
    $target[name] = true;
  } else {
    $target[name] = false;
  }
}

function removeBoolenProp($target, name) {
  $target.removeAttribute(name);
  $target[name] = false;
}

function setProp($target, name, value) {
  if (isCustomProp(name)) {
    if (isEventProp(name)) {
      $target.addEventListener(extractEventName(name), value, false);
    }
  } else if (name === 'className') {
    $target.setAttribute('class', value);
  } else if (typeof value === 'boolean') {
    setBooleanProp($target, name, value);
  } else {
    $target.setAttribute(name, value);
  }
}

function removeProp($target, name, value) {
  if (isCustomProp(name)) {
    if (isEventProp(name)) {
      $target.removeEventListener(extractEventName(name), window[value], false);
    }
  } else if (name === 'className') {
    $target.removeAttribute('class');
  } else if (typeof value === 'boolean') {
    removeBoolenProp($target, name);
  } else {
    $target.removeAttribute(name);
  }
}

function setProps($target, props) {
  Object.keys(props).forEach(function (name) {
    setProp($target, name, props[name]);
  });
}

// create element by virtual dom

function createElement(node) {
  // comment node

  if (typeof node === 'string' || typeof node === 'number') {
    return document.createTextNode(node + '');
  }

  var $el = document.createElement(node.type);
  setProps($el, node.props);

  node.children.map(createElement).forEach($el.appendChild.bind($el));
  return $el;
}

//
// diff dom
//

function changed(node1, node2) {
  return (typeof node1 === 'undefined' ? 'undefined' : _typeof(node1)) !== (typeof node2 === 'undefined' ? 'undefined' : _typeof(node2)) || typeof node1 === 'string' && node1 !== node2 || node1.type !== node2.type;
}

// diff props

function updateProp($target, name, newValue, oldValue) {
  if (!newValue) {
    removeProp($target, name, oldValue);
  } else if (!oldValue || newValue !== oldValue) {
    setProp($target, name, newValue);
  }
}

function updateProps($target, newProps, oldProps) {
  oldProps = oldProps || {};
  var props = Object.assign({}, newProps, oldProps);
  Object.keys(props).forEach(function (name) {
    updateProp($target, name, newProps[name], oldProps[name]);
  });
}

/***/ })
/******/ ])["default"];
});