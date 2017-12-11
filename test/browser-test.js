/******/ (function(modules) { // webpackBootstrap
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


__webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dom = __webpack_require__(2);

var dom = _interopRequireWildcard(_dom);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var expect = chai.expect;

describe('#dom handler test', function () {
  it('setProp set class/for should work correctly', function () {
    var input = document.createElement('input');
    dom.setProp(input, 'className', 'input1');
    dom.setProp(input, 'htmlFor', 'x2');
    document.body.appendChild(input);
    expect($('.input1').attr('for')).to.be.equal('x2');
  });

  it('setProp set style should work correctly', function () {
    var input = document.createElement('input');
    dom.setProp(input, 'className', 'input2');
    dom.setProp(input, 'style', 'color:red;font-size:28px;');
    document.body.appendChild(input);
    expect($('.input2').css('font-size')).to.be.equal('28px');
  });

  it('setProp set boolean prop should work correctly', function () {
    var input = document.createElement('input');
    dom.setProp(input, 'className', 'input3');
    dom.setProp(input, 'type', 'radio');
    dom.setProp(input, 'checked', true);
    document.body.appendChild(input);
    expect($('.input3').attr('checked')).to.be.equal('checked');
  });
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setProp = setProp;
exports.removeProp = removeProp;
exports.setBooleanProp = setBooleanProp;
exports.removeBooleanProp = removeBooleanProp;
function setProp($target, name, value) {
  if (name === 'className') {
    $target.setAttribute('class', value);
  } else if (name === 'htmlFor') {
    $target.setAttribute('for', value);
  } else if (typeof value === 'boolean') {
    setBooleanProp($target, name, value);
  } else {
    $target.setAttribute(name, value);
  }
}

function removeProp($target, name, value) {
  if (name === 'className') {
    $target.removeAttribute('class');
  } else if (name === 'htmlFor') {
    $target.removeAttribute('for', value);
  } else if (typeof value === 'boolean') {
    removeBooleanProp($target, name);
  } else {
    $target.removeAttribute(name);
  }
}

function setBooleanProp($target, name, value) {
  if (value) {
    $target.setAttribute(name, value);
    $target[name] = true;
  } else {
    $target[name] = false;
  }
}

function removeBooleanProp($target, name) {
  $target.removeAttribute(name);
  $target[name] = false;
}

/***/ })
/******/ ]);