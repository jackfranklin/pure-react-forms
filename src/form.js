import { FormField } from './form-field'

export class Form {
  constructor(fields, { skipInit = false } = {}) {
    if (skipInit) {
      this._fields = fields
    } else {
      this._fields = {}
      Object.keys(fields).forEach(fieldName => {
        this._fields[fieldName] = new FormField(fieldName, fields[fieldName])
      })
    }
  }

  fields(fieldName) {
    return fieldName ? this._fields[fieldName] : this._fields
  }

  getValue(field) {
    return this.fields()[field].value
  }

  updateField(fieldName, newField) {
    const newFields = {
      ...this.fields(),
      [fieldName]: newField,
    }
    return new Form(newFields, { skipInit: true })
  }

  setValue(fieldName, newValue) {
    const newField = this.fields(fieldName).setValue(newValue)
    return this.updateField(fieldName, newField)
  }

  isValid() {
    return Object.keys(this.fields()).every(fieldName =>
      this._fields[fieldName].isValid()
    )
  }
}

const createForm = fields => new Form(fields)

export default createForm
