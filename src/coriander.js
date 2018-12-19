/**
 * Coriander
 * v1.4.4
 */

function coriander(form, options) {
  var app = {
    $allInputs: [],

    options: {
      onSubmit: function() {
        form.submit();
      }
    },

    init: function() {
      this.cacheDOM();
      this.bindEvents();
    },

    cacheDOM: function() {
      this.$inputs = form.querySelectorAll('input:not([type="radio"])');
      this.$radioInputs = form.querySelectorAll('input[type="radio"]');
      this.$textAreas = form.querySelectorAll('textarea');
    },

    bindEvents: function() {
      form.addEventListener('submit', this.onValidate.bind(this));
    },

    onValidate: function(e) {
      e.preventDefault();

      var testGroups = [
        this.testIfValid(this.$inputs),
        this.testIfValid(this.$radioInputs),
        this.testIfValid(this.$textAreas)
      ];

      result = testGroups.every(function(group) {
        return group === true;
      });

      if (result) {
        if (options.onSubmit) {
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
        } else {
          this.options.onSubmit();
        }
      }
    },

    showError: function(input) {
      var error = document.createElement('p');

      if (!input.parentNode.querySelector('.coriander-error')) {
        error.classList.add('coriander-error');
        input.parentNode.appendChild(error);
      }

      if (input.dataset.error) {
        error.textContent = input.dataset.error;
      } else {
        error.textContent = 'This value is required';
      }

      input.parentNode.dataset.valid = 'false';
      window.scrollTo(0, 0);
    },

    showValid: function(input) {
      var error = input.parentNode.querySelector('.coriander-error');

      if (error) {
        error.textContent = '';
      }

      input.parentNode.dataset.valid = 'true';
    },

    testIfValid: function(inputs) {
      var _this = this;

      return Array.prototype.slice
        .call(inputs)
        .map(function(input, index) {
          _this.$allInputs.push(input);

          var dataset = input.dataset;
          var match = input.value.match(input.dataset.regex);

          if (input.type !== 'radio') {
            if (input.dataset.required) {
              if ((dataset.regex && !match) || input.value === '') {
                _this.showError(input);
              } else {
                _this.showValid(input, index);
              }
            }
          } else if (input.dataset.required) {
            if (form[input.name].value !== '') {
              _this.showValid(input, index);
            } else {
              _this.showError(input);
            }
          }

          if (input.parentNode.dataset.valid === 'false') {
            return false;
          } else {
            return true;
          }
        })
        .every(function(input) {
          return input === true;
        });
    }
  };

  app.init();
}

if (typeof module !== 'undefined') {
  module.exports = coriander;
}
