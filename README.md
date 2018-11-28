# Coriander

A simple form validation library

## Version

1.0.1

## Example

validation via regex

```
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

```
<script type="text/javascript">
  var $form = document.querySelector('.form');

  $form.coriander({
    onChange: true
  });
</script>
```

add data attributes to the inputs of your form

## Built With

- [Gulp](https://gulpjs.com/) - Task runner
- [BrowserSync](https://browsersync.io/) - Local server
- [Sass](https://sass-lang.com/) - SCSS partials
- [Babel](https://babeljs.io/) - Compiles JS ES6 to ES5
- [Webpack](https://webpack.js.org/) - Bundles JS files
- [Stylelint](https://stylelint.io/) - Lints CSS / SCSS files
- [ESLint](https://eslint.org/) - Lints JS files

## Authors

- **Brandon Patterson** - _Initial work_ - [brandnpatterson](https://github.com/brandnpatterson)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
