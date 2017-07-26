import createFormField from './form-field'

describe('a form field', () => {
  it('is created with a name and initial value', () => {
    const field = createFormField('email', 'jack@jackfranklin.net')
    expect(field.name).toEqual('email')
    expect(field.value).toEqual('jack@jackfranklin.net')
  })

  it('has a default value of empty string', () => {
    const field = createFormField('email')
    expect(field.value).toEqual('')
  })

  it('setting the value returns a new field', () => {
    const field = createFormField('email')
    const newField = field.setValue('jack@jackfranklin.net')
    expect(field.value).toEqual('')
    expect(newField.value).toEqual('jack@jackfranklin.net')
  })

  it('can have an onChange function that is called with arguments', () => {
    const onChange = jest.fn()
    const field = createFormField('email', 'old', { onChange })
    const newField = field.setValue('new')
    expect(onChange).toHaveBeenCalledWith('old', 'new', newField)
  })

  it('is set to dirty if the field is changed by the user', () => {
    const field = createFormField('email', 'old')
    expect(field.isDirty()).toEqual(false)
    const newField = field.setValue('new')
    expect(newField.isDirty()).toEqual(true)
  })

  it('does not update the field if the value is the same', () => {
    const field = createFormField('email', 'value')
    expect(field.isDirty()).toEqual(false)
    const newField = field.setValue('value')
    expect(newField).toEqual(field)
    expect(newField.isDirty()).toEqual(false)
  })

  it('a field can be made pristine', () => {
    const field = createFormField('email', 'old')
    const newField = field.setValue('new')
    expect(newField.isDirty()).toEqual(true)
    const resetField = newField.clean()
    expect(resetField.isDirty()).toEqual(false)
  })

  it('can be validated by providing a validator', () => {
    const field = createFormField('email', 'invalid', {
      validator: x => x === 'jack',
    })

    expect(field.isValid()).toEqual(false)
  })

  it('is valid if it has not been blurred and is empty', () => {
    const field = createFormField('email', '', {
      validator: x => x === 'jack',
    })

    expect(field.isValid()).toEqual(true)
  })

  it('is valid if not required, blurred and empty', () => {
    const field = createFormField('email', '', {
      validator: x => x === 'jack',
    })

    const newField = field.blur()

    expect(newField.isValid()).toEqual(true)
  })

  it('is valid if not required and empty', () => {
    const field = createFormField('email', '', {
      validator: x => x === 'jack',
    })

    expect(field.isValid()).toEqual(true)
  })

  it('is valid if required, non empty, and passes validation', () => {
    const field = createFormField('email', 'jack', {
      validator: x => x === 'jack',
    })

    expect(field.isValid()).toEqual(true)
  })

  it('is invalid if not required, non empty, and fails validation', () => {
    const field = createFormField('email', 'bob', {
      validator: x => x === 'jack',
    })

    expect(field.isValid()).toEqual(false)
  })

  it('can be made required', () => {
    const field = createFormField('email', 'old', {
      isRequired: true,
    })
    expect(field.isRequired()).toEqual(true)
  })
})
