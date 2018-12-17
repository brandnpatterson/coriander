# Coriander

Form validation library built with JavaScript

## Version

1.3.1

## Installation

### npm

`npm install coriander`

### unpkg

`<script src="https://unpkg.com/coriander@1.3.1/index.js"></script>`

## Getting Started

### Dataset Options

| Option        |  Type   |                  Default |                                                      Description |
| ------------- | :-----: | -----------------------: | ---------------------------------------------------------------: |
| data-error    | string  | 'This value is required' | Error reporting that displays when validation fails for an input |
| data-regex    | string  |                undefined |                                     Validate input against regex |
| data-required | boolean |                undefined |                           Only validate input if this is present |

### Example

```html
<input
  class="form-input"
  type="text"
  id="name"
  name="name"
  data-error="Please enter letters only"
  data-regex="[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$"
  data-required="true"
/>
```

## Call coriander method

```
form.coriander();
```

### Method Options

| Option   |   Type   |                              Default |                                             Description |
| -------- | :------: | -----------------------------------: | ------------------------------------------------------: |
| onChange | boolean  |                            undefined | Listen for validation when a change is made to an input |
| onSubmit | function | submit the form if validation passes |                handle what to do when validation passes |

### Example

```javascript
const form = document.querySelector('.form');

form.coriander({
  onChange: true,
  onSubmit(data) {
    const names = {};

    data.inputs.forEach(d => {
      if (d.type === 'radio') {
        names[d.name] = d.nextElementSibling.textContent;
      } else {
        names[d.name] = d.value;
      }
    });

    console.log(JSON.stringify(names));
  }
});
```

## Built With

- [Gulp](https://gulpjs.com/) - Task runner
- [BrowserSync](https://browsersync.io/) - Local server
- [ESLint](https://eslint.org/) - Linter for JS files

## Authors

- **Brandon Patterson** - _Initial work_ - [brandnpatterson](https://github.com/brandnpatterson)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
