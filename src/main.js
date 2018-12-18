/**
 * Coriander
 * v1.3.7
 */

var forEach = function(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
};

function coriander(form, options) {
  var app = {
    $totalInputs: [],
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

        var validCount = _this.$totalInputs.length;
        forEach(_this.$totalInputs, function(input) {
          if (input.parentNode.dataset.invalid) {
            validCount--;
          }
        });

        if (_this.$totalInputs.length === validCount) {
          if (options.onSubmit) {
            options.onSubmit({
              form: form,
              inputs: _this.$totalInputs.filter(function(input) {
                if (input.type === 'radio' && input.checked === true) {
                  return input;
                } else if (input.type !== 'radio') {
                  return input;
                }
              })
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
        _this.$totalInputs.push(input);

        if (input.dataset.required) {
          var error = document.createElement('p');

          error.classList.add('coriander-error');
          input.parentNode.appendChild(error);
        }
      });

      forEach(_this.$radioInputs, function(input) {
        _this.$totalInputs.push(input);
      });

      forEach(_this.$textAreas, function(input) {
        _this.$totalInputs.push(input);

        if (input.dataset.required) {
          var error = document.createElement('p');

          error.classList.add('coriander-error');
          input.parentNode.appendChild(error);
        }
      });
    },
    validate: function(single) {
      function validateSingle(input) {
        var dataset = input.dataset;
        var error = input.parentNode.querySelector('.coriander-error');
        var match = input.value.match(input.dataset.regex);

        if (!dataset.regex && dataset.required && input.value === '') {
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

      function validateSingleRadio(input) {
        var parent = input.parentNode;
        var error = parent.querySelector('.coriander-error');

        if (form[input.name].value === 'on') {
          if (error) {
            error.textContent = '';
          }

          delete parent.dataset.invalid;
        } else {
          if (error) {
            error.textContent = input.dataset.error;
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
        for (input in this.$totalInputs) {
          if (this.$totalInputs[input].type === 'radio') {
            validateSingleRadio(this.$totalInputs[input]);
          }
        }
      }
    }
  };

  app.init();
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = coriander;
} else {
  window.coriander = coriander;
}
