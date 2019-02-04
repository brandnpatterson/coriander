describe('Coriander Integration Tests', () => {
  var form = document.createElement('form');
  var input = document.createElement('input');
  var input2 = document.createElement('input');
  input.type = 'text';
  input.name = 'name';
  input.dataset.required = 'true';

  input2.type = 'text';
  input2.name = 'email';
  input2.dataset.required = 'true';

  var e = jasmine.createSpyObj('e', ['preventDefault']);

  it('should not validate if no inputs are passed', () => {
    var app = coriander(form);

    expect(app.validate()).toBe(false);
  });

  it('should not validate if any input value equals an empty string', () => {
    input.value = '';
    input2.value = 'pass test';

    form.appendChild(input);
    form.appendChild(input2);

    var app = coriander(form);

    expect(app.onSubmit(e)).toBe(false);
  });

  it('should validate only if no input values equal an empty string', () => {
    input.value = 'test';
    input2.value = 'test2';

    form.appendChild(input);
    form.appendChild(input2);

    var app = coriander(form);

    expect(app.onSubmit(e)).toBe(true);
  });
});
