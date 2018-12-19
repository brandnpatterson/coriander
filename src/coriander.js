/**
 * Coriander
 * v1.4.6
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
      input.parentNode.appendChild(error);
    },

    setup: function() {
      var _this = this;

      this.$inputs.forEach(function(input) {
        _this.$allInputs.push(input);
        _this.newError(input);
      });

      this.$radioInputs.forEach(function(input) {
        _this.$allInputs.push(input);
        _this.newError(input);
      });

      this.$textAreas.forEach(function(input) {
        _this.$allInputs.push(input);
        _this.newError(input);
      });
    },

    bindEvents: function() {
      var _this = this;

      form.addEventListener('submit', this.onValidate.bind(this));

      if (options.onChange) {
        this.$allInputs.forEach(function(input) {
          input.addEventListener('change', function() {
            _this.validate(input);
          });
        });
      }
    },

    onValidate: function(e) {
      e.preventDefault();

      var _this = this;

      var result = this.$allInputs
        .map(function(input) {
          return _this.validate(input);
        })
        .every(function(group) {
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
      } else {
        window.scrollTo(0, 0);
      }
    },

    showError: function(input) {
      var error = input.parentNode.querySelector('.coriander-error');

      if (input.dataset.error) {
        error.textContent = input.dataset.error;
      } else {
        error.textContent = 'This value is required';
      }

      input.parentNode.dataset.valid = 'false';
    },

    showValid: function(input) {
      var error = input.parentNode.querySelector('.coriander-error');

      if (error) {
        error.textContent = '';
      }

      input.parentNode.dataset.valid = 'true';
    },

    validate: function(input) {
      var _this = this;
      var dataset = input.dataset;
      var match = input.value.match(input.dataset.regex);

      if (input.type !== 'radio') {
        if (input.dataset.required) {
          if ((dataset.regex && !match) || input.value === '') {
            _this.showError(input);
          } else {
            _this.showValid(input);
          }
        }
      } else if (input.dataset.required) {
        if (form[input.name].value !== '') {
          _this.showValid(input);
        } else {
          _this.showError(input);
        }
      }

      if (input.parentNode.dataset.valid === 'false') {
        return false;
      } else {
        return true;
      }
    }
  };

  app.init();
}

if (typeof module !== 'undefined') {
  module.exports = coriander;
}
