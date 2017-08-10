export class FormField {
  constructor(
    name,
    {
      value = '',
      onChange = form => form,
      validator = () => true,
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
    this._isRequired = isRequired
    this.state = { isDirty, isTouched, isBlurred }

    Object.keys(this.state).forEach(stateKey => {
      this[stateKey] = () => this.state[stateKey]
    })
  }

  isRequired() {
    return this._isRequired === true
  }

  getOptions() {
    return {
      ...this,
      isRequired: this._isRequired,
    }
  }

  isValid() {
    const notBlurredOrNotRequired =
      this.isBlurred() === false && this.isRequired() === false

    if (this.value === '' && this.isRequired() === false) {
      return true
    } else if (this.value === '' && notBlurredOrNotRequired) {
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
        ...this.state,
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
