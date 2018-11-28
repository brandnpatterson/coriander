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

var forEach = __webpack_require__(1);

(function () {
  'use strict';

  HTMLElement.prototype.coriander = function () {
    var form = this;

    var coriander = {
      $radioByName: {},
      $totalInputsByName: [],
      init: function () {
        this.cacheDOM();
        this.bindEvents();
        this.setup();
      },

      cacheDOM: function () {
        this.$inputs = form.querySelectorAll('input:not([type="radio"])');
        this.$radioInputs = form.querySelectorAll('input[type="radio"]');
      },

      bindEvents: function () {
        var _this = this;

        form.addEventListener('submit', function (e) {
          e.preventDefault();
          _this.validate();

          var validCount = _this.$totalInputsByName.length;
          forEach(_this.$totalInputsByName, function (input) {
            if (input.parentNode.dataset.invalid) {
              validCount--;
            }
          });

          if (_this.$totalInputsByName.length === validCount) {
            form.submit();
          } else {
            window.scrollTo(0, 0);
          }
        });

        form.addEventListener('change', function () {
          _this.validate();
        });
      },

      setup: function () {
        var _this = this;

        forEach(this.$inputs, function (input) {
          _this.$totalInputsByName.push(input);

          if (!input.dataset.placeholder && input.dataset.required) {
            var error = document.createElement('p');

            error.classList.add('coriander-error');
            input.parentNode.appendChild(error);
          }
        });

        forEach(_this.$radioInputs, function (input) {
          if (!_this.$radioByName[input.name]) {
            _this.$radioByName[input.name] = input;
            _this.$totalInputsByName.push(input);
          }
        });

        var input;
        for (input in _this.$radioByName) {
          var error = document.createElement('p');

          error.classList.add('coriander-error');
          _this.$radioByName[input].parentNode.appendChild(error);
        }
      },

      validate: function () {
        var _this = this;

        forEach(this.$inputs, function (input) {
          var error = input.parentNode.querySelector('.coriander-error');
          var match = input.value.match(input.dataset.regex);

          if (input.dataset.placeholder) {
            if (match) {
              delete input.parentNode.dataset.invalid;
            } else {
              input.value = '';
              input.placeholder = input.dataset.error;
              input.parentNode.dataset.invalid = true;
            }
          } else if (error) {
            if (match) {
              if (error) {
                error.textContent = '';
              }

              delete input.parentNode.dataset.invalid;
            } else {
              error.textContent = input.dataset.error;
              input.parentNode.dataset.invalid = true;
            }
          }
        });

        var input;
        for (input in this.$radioByName) {
          var radio = _this.$radioByName[input];
          var parent = radio.parentNode;
          var error = parent.querySelector('.coriander-error');

          if (form[radio.name].value === 'on') {
            error.textContent = '';

            delete parent.dataset.invalid;
          } else {
            if (error) {
              error.textContent = radio.dataset.error;
            }
            parent.dataset.invalid = true;
          }
        }
      }
    };

    coriander.init();
  };
})();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * Loop over array and return each iteration to process through callback function
 *  @param {Array} arr
 *  @param {Function} callback
 */

var forEach = function (arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
};

module.exports = forEach;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map