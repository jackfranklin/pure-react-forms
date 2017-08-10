import createForm from './form'

describe('a form', () => {
  it('creates a form based on the fields that are passed', () => {
    const form = createForm({
      email: {},
      name: {
        value: 'Jack',
      },
    })

    expect(form.fields().name).toBeDefined()
    expect(form.getValue('name')).toEqual('Jack')
  })

  it('can update the values of fields and does not mutate', () => {
    const form = createForm({
      name: {
        value: 'Jack',
      },
    })

    const newForm = form.setValue('name', 'Ben')

    expect(form.getValue('name')).toEqual('Jack')
    expect(newForm.getValue('name')).toEqual('Ben')
  })

  it('marks the form fields as dirty when the values change', () => {
    const form = createForm({
      name: {
        value: 'Jack',
      },
    })

    const newForm = form.setValue('name', 'Ben')

    expect(newForm.fields('name').isDirty()).toEqual(true)
  })

  describe('serializing the values', () => {
    it('can produce an object of key values', () => {
      const name = 'Jack'
      const email = 'jack@jackfranklin.net'

      const form = createForm({
        name: {
          value: name,
        },
        email: {
          value: email,
        },
      })

      expect(form.serialize()).toEqual({
        name,
        email,
      })
    })

    it('lets a value be mapped', () => {
      const name = 'Jack'
      const email = 'jack@jackfranklin.net'

      const form = createForm({
        name: {
          value: name,
        },
        email: {
          value: email,
        },
      })

      expect(
        form.serialize({
          name: input => input.toUpperCase(),
        })
      ).toEqual({
        name: 'JACK',
        email,
      })
    })
  })

  describe('form validations', () => {
    it('is valid when no fields have been touched', () => {
      const form = createForm({
        email: {
          value: '',
          validator: x => x === 'valid',
        },
        name: {
          value: 'Jack',
          validator: x => x === 'Jack',
        },
      })

      expect(form.isValid()).toEqual(true)
    })

    it('is invalid when the field has an invalid value', () => {
      const form = createForm({
        email: {
          value: '',
          validator: x => x === 'valid',
        },
        name: {
          value: 'Jack',
          validator: x => x === 'Jack',
        },
      })

      const newForm = form.setValue('email', 'invalid')

      expect(newForm.isValid()).toEqual(false)
    })
  })

  describe('onChange callbacks', () => {
    it('a field can supply an onChange callback and get called', () => {
      const onChange = jest.fn()

      const form = createForm({
        name: {
          value: '',
          onChange,
        },
      })

      const newForm = form.setValue('name', 'jack')

      expect(onChange).toHaveBeenCalledWith('', 'jack', newForm.fields('name'))
    })
  })
})
