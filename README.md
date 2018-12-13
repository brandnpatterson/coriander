<style>
table {
  display: table !important;
}
</style>

# Coriander

Form validation library built with JavaScript

## Version

1.3.0

## Installation

### npm

`npm install coriander`

### unpkg

`<script src="https://unpkg.com/coriander@1.3.0/index.js"></script>`

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
      <td>data-error</td>
      <td>string</td>
      <td>'This value is required'</td>
      <td>Error reporting for an input with failed validation</td>
    </tr>
    <tr>
      <td>data-regex</td>
      <td>string</td>
      <td>undefined</td>
      <td>Validate input against regex</td>
    </tr>
    <tr>
      <td>data-required</td>
      <td>boolean</td>
      <td>undefined</td>
      <td>Only validate input if this is present</td>
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
      <td>onChange</td>
      <td>boolean</td>
      <td>undefined</td>
      <td>Listen for validation when a change is made to the inputs</td>
    </tr>
    <tr>
      <td>onSubmit</td>
      <td>function</td>
      <td>submit the form if validation passes</td>
      <td>handle what to do when validation passes</td>
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
