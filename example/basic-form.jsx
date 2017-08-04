import React, { Component } from 'react'

import Form from '../src/components/form'
import TextInput from '../src/components/text-input'
import SelectInput from '../src/components/select-input'
import { createForm } from '../src/index'

class BasicForm extends Component {
  state = {
    form: createForm({
      email: {
        validator: input => input.indexOf('@') > -1,
        errorMessage: 'The given email is invalid',
        isRequired: true,
      },
      favouriteColour: {
        value: 'blue',
      },
    }),
    submitted: null,
  }

  onFormChange = form => this.setState({ form })

  onSubmit = e => {
    e.preventDefault()

    this.setState({
      submitted: this.state.form.serialize(),
    })
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
            <SelectInput fieldName="favouriteColour">
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
            </SelectInput>
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
          {this.state.submitted &&
            <div>
              <p>Submitted:</p>
              <pre>
                <code>
                  {JSON.stringify(this.state.submitted, null, 2)}
                </code>
              </pre>
            </div>}
        </div>
      </div>
    )
  }
}

export default BasicForm
