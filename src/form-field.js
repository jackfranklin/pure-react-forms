export class FormField {
  constructor(
    name,
    {
      value = '',
      onChange = field => field,
      validator,
      errorMessage = '',
      isRequired = false,
    } = {},
    { isDirty = false, isTouched = false, isBlurred = false } = {}
  ) {
    this.name = name
    this.value = value
    this.errorMessage = errorMessage
    this.onChange = onChange
    this.validator = validator
    this.state = { isDirty, isTouched, isBlurred, isRequired }

    Object.keys(this.state).forEach(stateKey => {
      this[stateKey] = () => this.state[stateKey]
    })
  }

  getOptions() {
    return {
      ...this,
    }
  }

  isValid() {
    const notBlurredOrNotRequired =
      this.isBlurred() === false && this.isRequired() === false
    if (this.value === '' && notBlurredOrNotRequired) {
      return true
    } else {
      return this.validator(this.value)
    }
  }

  blur() {
    return new FormField(this.name, this.getOptions(), {
      ...this.state,
      isBlurred: true,
    })
  }

  touch() {
    return new FormField(this.name, this.getOptions(), {
      ...this.state,
      isTouched: true,
    })
  }

  clean() {
    return new FormField(this.name, this.getOptions())
  }

  setValue(newValue) {
    if (newValue === this.value) return this
    const newField = new FormField(
      this.name,
      {
        ...this.getOptions(),
        value: newValue,
      },
      {
        isDirty: true,
      }
    )

    this.onChange(this.value, newField.value, newField)

    return newField
  }
}

const createFormField = (name, value = '', opts = {}) => {
  const state = opts.state
  delete opts.state

  return new FormField(
    name,
    {
      ...opts,
      value,
    },
    state
  )
}

export default createFormField
// const makeField = (fieldName, initialKeys) => ({
//   value: '',
//   name: fieldName,
//   isRequired: true,
//   onChange: form => form,
//   ...initialKeys,
//   isValid: null,
//   // a value is "dirty" if its value has been edited by the user
//   isDirty: false,
//   touched: false,
//   blurred: false,
//   form: undefined,
//   calculateIfRequired() {
//     if (typeof this.isRequired === 'boolean') return this.isRequired
//     return this.isRequired(this.form)
//   },
//   validateAndSetFields(fields = {}) {
//     const valueToValidate = fields.hasOwnProperty('value')
//       ? fields.value
//       : this.value

//     const fieldsToSet = {
//       ...this,
//       ...fields,
//       // if a new value was passed in, we should validate against that, not the current this.value
//       isValid: (value => {
//         const isRequired = this.calculateIfRequired()

//         if (value && typeof value.trim === 'function') value = value.trim()

//         const isEmpty = !value

//         const isValid =
//           this.validator(value) === true ||
//           (isRequired === false && isEmpty === true)

//         return isValid
//       })(valueToValidate),
//     }

//     // only want to set isDirty IF:
//     // isDirty is explicitly passed in
//     // value is explicitly passed in
//     if (fields.hasOwnProperty('isDirty')) {
//       fieldsToSet.isDirty = fields.isDirty
//     } else if (fields.hasOwnProperty('value')) {
//       fieldsToSet.isDirty = valueToValidate !== this.value
//     }

//     return fieldsToSet
//   },
//   setValue(v) {
//     return this.validateAndSetFields({ value: v })
//   },
//   setRequired(isRequired) {
//     return this.validateAndSetFields({ isRequired })
//   },
//   touch() {
//     return this.validateAndSetFields({ touched: true })
//   },
//   blur() {
//     return this.validateAndSetFields({ blurred: true })
//   },
//   validate() {
//     return this.validateAndSetFields()
//   },
// })
