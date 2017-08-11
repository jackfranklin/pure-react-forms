import React, { Component } from 'react'

import Form from '../src/components/form'
import Input from '../src/components/input'
import { createForm } from '../src/index'

class CustomInputForm extends Component {
  state = {
    form: createForm({
      name: {
        validator: name => name === 'jack',
        errorMessage: 'Your name must be Jack',
        isRequired: true,
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
            {/*
              it's rare that you have to do this, but if you need to fully control the raw HTML for one of your form components, you can use the Input component, which takes a `render` prop, which gets given the props you need to pass through to hook up all the event handlers.
            */}
            <Input fieldName="name" render={props => <input {...props} />} />
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

export default CustomInputForm
