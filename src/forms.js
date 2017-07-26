import FormValidator from './form-validator'
export const createForm = fields => new FormValidator(fields)

export const updateFormField = (form, newField, e) =>
  form.updateField(newField.name, newField, e)
