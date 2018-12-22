/**
 * Coriander
 * v1.5.1
 */

function arrFrom(arr) {
  return Array.prototype.slice.call(arr);
}

function forEach(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
}

/**
 * Form validation library
 * @param {Element} form
 * @param {Object} options
 *    @property  {Boolean} onChange  - validate selected input on change - default: undefined
 *    @property {Function} onSubmit - handle what to do when validation passes - default: form.submit()
 * @returns {Boolean}
 */
function coriander(form, options) {
  var app = {
    init: function() {
      this.cacheDOM();
      this.bindEvents();
    },

    cacheDOM: function() {
      this.$inputs = arrFrom(form.querySelectorAll('input, textarea'));
    },

    bindEvents: function() {
      var _this = this;

      form.addEventListener('submit', this.onSubmit.bind(this));

      if (options && options.onChange) {
        this.$inputs.forEach(function(input) {
          input.addEventListener('change', function() {
            _this.validate(input);
          });
        });
      }
    },

    /**
     * Test if all inputs have been validated
     * @param {Event} e
     * @returns {Boolean}
     */
    onSubmit: function(e) {
      e.preventDefault();

      if (this.$inputs.length === 0) {
        return false;
      }

      var _this = this;
      var names = {};

      var result = this.$inputs
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
            inputs: this.$inputs.filter(function(input) {
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

    errorShow: function(input) {
      var error = input.parentNode.querySelector('.coriander-error');

      if (!input.parentNode.querySelector('.coriander-error')) {
        var error = document.createElement('p');

        error.classList.add('coriander-error');
        input.parentNode.appendChild(error);
      }

      if (input.dataset.error) {
        error.textContent = input.dataset.error;
      } else if (error) {
        error.textContent = 'This value is required';
      }

      return false;
    },

    errorRemove: function(input) {
      var error = input.parentNode.querySelector('.coriander-error');

      if (error) {
        error.remove();
      }

      return true;
    },

    /**
     * Test single input against data-required or data-regex attribute
     * @param {Element} input
     * @returns {Boolean}
     */
    validate: function(input) {
      var _this = this;

      if (!input) {
        return false;
      }

      var dataset = input.dataset;
      var match = input.value.match(input.dataset.regex);

      if (input.type === 'radio') {
        var requiredByName;

        forEach(form[input.name], function(input) {
          if (input.dataset.required) {
            requiredByName = input.name;
          }
        });

        if (input.name === requiredByName) {
          var inputValue = document.querySelector(
            'input[name=' + [input.name] + ']:checked'
          );

          if (!inputValue) {
            return _this.errorShow(input);
          } else {
            return _this.errorRemove(input);
          }
        }
      } else if (input.dataset.required) {
        if ((dataset.regex && !match) || input.value === '') {
          return _this.errorShow(input);
        } else {
          return _this.errorRemove(input);
        }
      } else {
        return true;
      }
    }
  };

  if (form.tagName !== 'FORM') {
    console.error('element passed to Coriander must be a form');
  } else {
    app.init();
  }

  return app;
}

if (typeof module !== 'undefined') {
  module.exports = coriander;
}
