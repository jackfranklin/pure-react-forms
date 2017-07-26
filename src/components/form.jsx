import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form as FormClass } from '../form'

class Form extends Component {
  static propTypes = {
    form: PropTypes.instanceOf(FormClass).isRequired,
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static childContextTypes = {
    getField: PropTypes.func,
    onFieldChange: PropTypes.func,
  }

  getChildContext() {
    return {
      getField: fieldName => this.props.form.fields(fieldName),
      onFieldChange: this.onFieldChange,
    }
  }

  onFieldChange = field => {
    const newForm = this.props.form.updateField(field.name, field)
    this.props.onChange(newForm)
  }

  render() {
    const formProps = {
      ...this.props,
    }
    delete formProps.form
    delete formProps.onChange

    return <form {...formProps} />
  }
}

export default Form

// export default class ValidatedForm extends Component {
//   static propTypes = {
//     form: PropTypes.object.isRequired,
//     children: PropTypes.node.isRequired,
//     onFormChange: PropTypes.func.isRequired,
//   }

//   static childContextTypes = {
//     form: PropTypes.object,
//     onFieldChange: PropTypes.func,
//   }

//   getChildContext() {
//     return {
//       form: this.props.form,
//       onFieldChange: this.onFieldChange.bind(this),
//     }
//   }

//   onFieldChange(field, e) {
//     const newForm = updateFormField(this.props.form, field, e)
//     this.props.onFormChange(newForm)
//   }

//   render() {
//     const formProps = omit(this.props, ['form', 'onFormChange'])
//     return <form {...formProps} />
//   }
// }
