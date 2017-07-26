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
})

//   describe('validating the form', () => {
//     it('is not true if at least one field is invalid', () => {
//       const form = createForm({
//         email: {
//           validator: () => true,
//           message: 'Blah blah',
//         },
//         name: {
//           validator: () => false,
//           message: 'Blah blah',
//         },
//       })

//       expect(form.isValid()).toEqual(false)
//     })

//     it('is true if all fields are valid', () => {
//       const form = createForm({
//         email: {
//           validator: () => true,
//           message: 'Blah blah',
//         },
//         name: {
//           validator: () => true,
//           message: 'Blah blah',
//         },
//       })

//       expect(form.isValid()).toEqual(true)
//     })

//     describe('fields that are not required', () => {
//       it('is true if all fields are valid or not required and empty', () => {
//         const form = createForm({
//           email: {
//             validator: () => true,
//             message: 'Blah blah',
//           },
//           name: {
//             isRequired: false,
//             validator: input => input === 'foo',
//             message: 'Blah blah',
//             value: '',
//           },
//         })

//         expect(form.isValid()).toEqual(true)
//       })

//       it('defines a form field as valid if it is empty and not required', () => {
//         const form = createForm({
//           email: {
//             validator: () => true,
//             message: 'Blah blah',
//           },
//           name: {
//             isRequired: false,
//             validator: input => input === 'foo',
//             message: 'Blah blah',
//             value: '',
//           },
//         })

//         const name = form.field('name').validate()
//         expect(name.isValid).toEqual(true)
//       })

//       it('is not true if the field is not required but has an invalid value', () => {
//         const form = createForm({
//           email: {
//             validator: () => true,
//             message: 'Blah blah',
//           },
//           name: {
//             isRequired: false,
//             validator: input => input === 'foo',
//             message: 'Blah blah',
//             value: 'bar',
//           },
//         })

//         expect(form.isValid()).toEqual(false)
//       })

//       it('is valid if the non required field is just empty whitespace', () => {
//         const form = createForm({
//           name: {
//             isRequired: false,
//             validator: input => input === 'foo',
//             message: 'Blah blah',
//             value: '          ',
//           },
//         })

//         expect(form.isValid()).toEqual(true)
//       })

//       it('lets a field be required based on a function which is given the form', () => {
//         let form = createForm({
//           email: {
//             validator: () => true,
//             message: 'Blah blah',
//           },
//           name: {
//             isRequired: form => form.getValue('email') === 'jack@songkick.com',
//             validator: input => input === 'foo',
//             message: 'Blah blah',
//             value: '',
//           },
//         })

//         expect(form.isRequired('name')).toEqual(false)
//         const newEmail = form.field('email').setValue('jack@songkick.com')
//         form = updateFormField(form, newEmail)
//         expect(form.isRequired('name')).toEqual(true)
//         expect(form.isValid()).toEqual(false)
//       })
//     })
//   })

//   describe('updating a form field', () => {
//     it('returns a new form and does not mutate the original form', () => {
//       const originalForm = createForm({
//         email: {
//           validator: () => true,
//           message: 'Blah blah',
//         },
//         name: {
//           validator: () => false,
//           message: 'Blah blah',
//         },
//       })

//       const newEmail = originalForm.field('email').setValue('jack')
//       const newForm = updateFormField(originalForm, newEmail)

//       // the original has not changed
//       expect(originalForm.getValue('email')).toEqual('')
//       expect(newForm.getValue('email')).toEqual('jack')
//     })
//   })

//   describe('onChange callback', () => {
//     const form = createForm({
//       country: {
//         validator: () => true,
//         onChange: form => form.resetField('region'),
//         value: 'US',
//       },
//       region: {
//         validator: () => true,
//         value: 'Washington',
//       },
//     })

//     it('runs when a field changes', () => {
//       const newForm = form.setValue('country', 'UK')
//       expect(newForm.getValue('region')).toEqual('')
//     })
//   })

//   describe('setting values for individual fields', () => {
//     const form = createForm({
//       email: {
//         validator: input => input.indexOf('@') > -1,
//         message: 'Blah blah',
//       },
//     })

//     it('allows a field to have a value set and does not mutate', () => {
//       const field = form.field('email')
//       const newField = field.setValue('jack@songkick.com')
//       expect(field.value).toEqual('')
//       expect(newField.value).toEqual('jack@songkick.com')
//     })

//     it('validates a field the moment its value is set', () => {
//       const newField = form.field('email').setValue('jack@songkick.com')
//       expect(newField.isValid).toEqual(true)
//     })

//     it('marks a field as dirty when its value changes', () => {
//       const newField = form.field('email').setValue('jack@songkick.com')
//       expect(newField.isDirty).toEqual(true)
//     })

//     it('updates dirty as expected as the form is submitted and value changes', () => {
//       const firstForm = form.setValue('email', 'jack@songkick.com')
//       expect(firstForm.field('email').isDirty).toEqual(true)
//       expect(firstForm.isDirty()).toEqual(true)
//       const newForm = firstForm.makePristine()
//       expect(newForm.field('email').isDirty).toEqual(false)
//       const newFieldWithSameValue = newForm
//         .field('email')
//         .setValue('jack@songkick.com')
//       expect(newFieldWithSameValue.isDirty).toEqual(false)
//       const newFieldWithNewValue = newForm
//         .field('email')
//         .setValue('ben@songkick.com')
//       expect(newFieldWithNewValue.isDirty).toEqual(true)
//     })

//     it('marks a field as dirty even with just whitespace added', () => {
//       const firstForm = form.setValue('email', 'jack@songkick.com')
//       expect(firstForm.field('email').isDirty).toEqual(true)
//       expect(firstForm.isDirty()).toEqual(true)
//       const newFieldWithNewValue = firstForm
//         .field('email')
//         .setValue('jack@songkick.com     ')
//       expect(newFieldWithNewValue.isDirty).toEqual(true)
//       expect(firstForm.isDirty()).toEqual(true)
//     })

//     it('can blur a field, at which point it also validates it', () => {
//       const newField = form.field('email').blur()
//       expect(newField.blurred).toEqual(true)
//       expect(newField.isValid).toEqual(false)
//     })

//     it('can touch a field, at which point it also validates it', () => {
//       const newField = form.field('email').touch()
//       expect(newField.touched).toEqual(true)
//       expect(newField.isValid).toEqual(false)
//     })

//     it('validates a field when validate is called', () => {
//       const newField = form.field('email').validate()
//       expect(newField.isValid).toEqual(false)
//     })
//   })
// })
