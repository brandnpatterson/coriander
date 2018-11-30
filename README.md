# Coriander

A simple form validation library

## Version

1.2.4

## Installation

`npm install coriander`

## Getting Started

### HTML data-\* Attributes

Add datasets to the inputs in your form in order for coriander to recognize them

`data-error:` custom error will display, otherwise a default message will appear
<br>
`data-placeholder:` validate using the placeholder attribute
<br>
`data-regex:` validate against regex
<br>
`data-required:` only validate if this is present

### Example

```html
<input
  class="form-input"
  type="text"
  id="name"
  name="name"
  data-error="Please enter letters only"
  data-placeholder="true"
  data-regex="[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$"
  data-required="true"
/>
```

### Call coriander method

`form.coriander();`

optional arguments

`onChange: Boolean`
<br>
`onSubmit: Function` - handles when form is vaild.
<br>
(if not present, the form submits once validation passes)

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
- [ESLint](https://eslint.org/) - Lints JS files

## Authors

- **Brandon Patterson** - _Initial work_ - [brandnpatterson](https://github.com/brandnpatterson)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

```

```
