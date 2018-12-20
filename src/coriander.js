/**
 * Coriander
 * v1.4.9
 */

function forEach(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
}

function coriander(form, options) {
  var app = {
    $allInputs: [],
    requiredNames: [],

    init: function() {
      this.cacheDOM();
      this.setup();
      this.bindEvents();
    },

    cacheDOM: function() {
      this.$inputs = form.querySelectorAll('input:not([type="radio"])');
      this.$radioInputs = form.querySelectorAll('input[type="radio"]');
      this.$textAreas = form.querySelectorAll('textarea');
    },

    newError: function(input) {
      var error = document.createElement('p');

      error.classList.add('coriander-error');

      if (!input.parentNode.querySelector('.coriander-error')) {
        input.parentNode.appendChild(error);
      }
    },

    setup: function() {
      var _this = this;

      forEach(this.$inputs, function(input) {
        _this.$allInputs.push(input);
        _this.newError(input);
      });

      forEach(this.$radioInputs, function(input) {
        _this.$allInputs.push(input);
        _this.newError(input);
      });

      forEach(this.$textAreas, function(input) {
        _this.$allInputs.push(input);
        _this.newError(input);
      });
    },

    bindEvents: function() {
      var _this = this;

      form.addEventListener('submit', this.onValidate.bind(this));

      if (options && options.onChange) {
        this.$allInputs.forEach(function(input) {
          input.addEventListener('change', function() {
            _this.validate(input);
          });
        });
      }
    },

    onValidate: function(e) {
      e.preventDefault();

      if (this.$allInputs.length === 0) {
        return false;
      }

      var _this = this;
      var names = {};

      var result = this.$allInputs
        .map(function(input) {
          if (!names[input.name]) {
            names[input.name] = input.name;

            return _this.validate(input);
          } else {
            return true;
          }
        })
        .every(function(group) {
          return group === true;
        });

      if (result) {
        if (options === false) {
          form.submit();
        } else if (options && options.onSubmit) {
          options.onSubmit({
            form: form,
            inputs: this.$allInputs.filter(function(input) {
              if (input.type === 'radio' && input.checked === true) {
                return input;
              } else if (input.type !== 'radio') {
                return input;
              }
            })
          });
        }
      } else {
        window.scrollTo(0, 0);
      }

      return result;
    },

    showError: function(input) {
      var error = input.parentNode.querySelector('.coriander-error');

      if (input.dataset.error) {
        error.textContent = input.dataset.error;
      } else {
        error.textContent = 'This value is required';
      }

      input.parentNode.dataset.valid = 'false';

      return false;
    },

    showValid: function(input) {
      var error = input.parentNode.querySelector('.coriander-error');

      if (error) {
        error.textContent = '';
      }

      input.parentNode.dataset.valid = 'true';

      return true;
    },

    validate: function(input) {
      if (!input) {
        return false;
      }

      var _this = this;
      var dataset = input.dataset;
      var match = input.value.match(input.dataset.regex);

      if (input.type === 'radio') {
        var required;

        forEach(form[input.name], function(input) {
          if (input.dataset.required) {
            required = input.name;
          }
        });

        if (input.name === required) {
          var inputValue = document.querySelector(
            'input[name=' + [input.name] + ']:checked'
          );

          if (!inputValue) {
            return _this.showError(input);
          } else {
            return _this.showValid(input);
          }
        }
      } else if (input.dataset.required) {
        if (input.dataset.required) {
          if ((dataset.regex && !match) || input.value === '') {
            return _this.showError(input);
          } else {
            return _this.showValid(input);
          }
        }
      } else if (input.parentNode.dataset.valid === 'false') {
        return false;
      } else {
        return true;
      }
    }
  };

  app.init();

  return app;
}

if (typeof module !== 'undefined') {
  module.exports = coriander;
}
