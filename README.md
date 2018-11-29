# Coriander

A simple form validation library

## Version

1.1.6

## Example

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
    onChange: true,
    onSubmit: function(data) {
      var namesObj = {};

      var names = data.inputs.forEach(function(d) {
        if (d.type === 'radio') {
          namesObj[d.name] = d.nextElementSibling.textContent;
        } else {
          namesObj[d.name] = d.value;
        }
      });

      console.log(JSON.stringify(namesObj));
    }
  });
</script>
```

## Built With

- [Gulp](https://gulpjs.com/) - Task runner
- [BrowserSync](https://browsersync.io/) - Local server
- [ESLint](https://eslint.org/) - Lints JS files

## Authors

- **Brandon Patterson** - _Initial work_ - [brandnpatterson](https://github.com/brandnpatterson)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
