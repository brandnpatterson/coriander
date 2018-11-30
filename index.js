(function() {
  'use strict';

  var forEach = function(arr, callback) {
    for (var i = 0; i < arr.length; i++) {
      callback(arr[i], i, arr);
    }
  };

  HTMLElement.prototype.coriander = function(options) {
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
        this.$textAreas = form.querySelectorAll('textarea');
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
            if (options.onSubmit) {
              options.onSubmit({
                form: form,
                inputs: _this.$totalInputsByName
              });
            } else {
              form.submit();
            }
          } else {
            window.scrollTo(0, 0);
          }
        });

        if (options && options.onChange) {
          this.onChange(this.$inputs);
          this.onChange(this.$radioInputs);
          this.onChange(this.$textAreas);
        }
      },

      onChange: function(inputs) {
        var _this = this;

        forEach(inputs, function(input) {
          input.addEventListener('change', function() {
            _this.validate(input);
          });
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

        forEach(_this.$textAreas, function(input) {
          _this.$totalInputsByName.push(input);

          if (input.dataset.required) {
            var error = document.createElement('p');

            error.classList.add('coriander-error');
            input.parentNode.appendChild(error);
          }
        });

        var input;
        for (input in _this.$radioByName) {
          var error = document.createElement('p');

          error.classList.add('coriander-error');
          _this.$radioByName[input].parentNode.appendChild(error);
        }
      },

      validate: function(single) {
        var _this = this;

        function validateSingle(input) {
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
        }

        function validateSingleRadio() {
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
        if (single) {
          validateSingle(single);
        } else {
          forEach(this.$inputs, function(input) {
            validateSingle(input);
          });

          forEach(this.$textAreas, function(input) {
            validateSingle(input);
          });

          var input;
          for (input in this.$radioByName) {
            validateSingleRadio(input);
          }
        }
      }
    };

    coriander.init();
  };
})();
