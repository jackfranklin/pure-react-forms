import React, { Component } from 'react'

import Form from '../src/components/form'
import TextInput from '../src/components/text-input'
import { createForm } from '../src/index'

class BasicForm extends Component {
  state = {
    form: createForm({
      email: {
        validator: input => input.indexOf('@') > -1,
        errorMessage: 'The given email is invalid',
        isRequired: true,
      },
    }),
  }

  onFormChange = form => this.setState({ form })

  onSubmit = e => {
    e.preventDefault()

    alert('Your submitted email was ' + this.state.form.getValue('email'))
  }

  render() {
    return (
      <div className="form-container">
        <div>
          <Form
            form={this.state.form}
            onChange={this.onFormChange}
            onSubmit={this.onSubmit}
          >
            <TextInput
              fieldName="email"
              type="email"
              placeholder="bill@gates.com"
            />
            <button
              type="submit"
              disabled={this.state.form.isValid() === false}
            >
              Submit to my super service
            </button>
          </Form>
        </div>
        <div className="state-container">
          <pre>
            <code>
              {JSON.stringify(this.state.form, null, 2)}
            </code>
          </pre>
        </div>
      </div>
    )
  }
}

export default BasicForm
