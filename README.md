# Coriander

Form validation library built with JavaScript

## Version

1.2.9

## Installation

### npm

`npm install coriander`

### unpkg

`<script src="https://unpkg.com/coriander@1.2.9/index.js"></script>`

## Getting Started

### Dataset Options

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>data-error</th>
      <th>string</th>
      <th>'This value is required'</th>
      <th>Error reporting for an input with failed validation</th>
    </tr>
    <tr>
      <th>data-regex</th>
      <th>string</th>
      <th>undefined</th>
      <th>Validate input against regex</th>
    </tr>
    <tr>
      <th>data-required</th>
      <th>boolean</th>
      <th>undefined</th>
      <th>Only validate input if this is present</th>
    </tr>
  </tbody>
</table>

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

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>onChange</th>
      <th>boolean</th>
      <th>undefined</th>
      <th>Listen for validation when a change is made to the inputs</th>
    </tr>
    <tr>
      <th>onSubmit</th>
      <th>function</th>
      <th>submit the form if validation passes</th>
      <th>handle what to do when validation passes</th>
    </tr>
  </tbody>
</table>

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
