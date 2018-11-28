var forEach = require('./util/forEach');

(function() {
  'use strict';

  HTMLElement.prototype.coriander = function() {
    var form = this;

    var coriander = {
      $radioByName: {},
      $totalInputsByName: [],
      init: function() {
        this.cacheDOM();
        this.bindEvents();
        this.setup();
      },

      cacheDOM: function() {
        this.$inputs = form.querySelectorAll('input:not([type="radio"])');
        this.$radioInputs = form.querySelectorAll('input[type="radio"]');
      },

      bindEvents: function() {
        var _this = this;

        form.addEventListener('submit', function(e) {
          e.preventDefault();
          _this.validate();

          var validCount = _this.$totalInputsByName.length;
          forEach(_this.$totalInputsByName, function(input) {
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
      },

      setup: function() {
        var _this = this;

        forEach(this.$inputs, function(input) {
          _this.$totalInputsByName.push(input);

          if (!input.dataset.placeholder && input.dataset.required) {
            var error = document.createElement('p');

            error.classList.add('coriander-error');
            input.parentNode.appendChild(error);
          }
        });

        forEach(_this.$radioInputs, function(input) {
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

      validate: function() {
        var _this = this;

        forEach(this.$inputs, function(input) {
          var dataset = input.dataset;
          var error = input.parentNode.querySelector('.coriander-error');
          var match = input.value.match(input.dataset.regex);

          // @todo refactor
          if (dataset.placeholder) {
            if (!dataset.regex && dataset.required && input.value === '') {
              input.value = '';
              input.placeholder = 'This value is required';
              input.parentNode.dataset.invalid = true;
            } else if (match) {
              delete input.parentNode.dataset.invalid;
            } else {
              input.value = '';
              input.placeholder = dataset.error;
              input.parentNode.dataset.invalid = true;
            }
          } else if (!dataset.regex && dataset.required && input.value === '') {
            if (error) {
              error.textContent = 'This value is required';
            }
            input.parentNode.dataset.invalid = true;
          } else if (error) {
            if (match) {
              if (error) {
                error.textContent = '';
              }

              delete input.parentNode.dataset.invalid;
            } else {
              error.textContent = dataset.error;
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
