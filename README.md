# pure-react-forms

A library that reduces the boilerplate around React forms whilst having no external dependencies.

## Quick Example

```jsx
import React, { Component } from 'react'
import {
  Form,
  TextInput,
  SelectInput,
  CheckboxInput
} from 'pure-react-forms/components'
import { createForm } from 'pure-react-forms'

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
      isHappy: {
        value: false,
        validator: input => input === true,
        errorMessage: 'You must be happy to submit!',
      },
    }),
  }

  // the magic! All changes are dealt with for you in the form object
  // so you don't have to have separate event handlers for all
  // of your inputs
  onFormChange = form => this.setState({ form })

  onSubmit = e => {
    e.preventDefault()
    // send the form data to a server, do what you'd like :)
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
            <label>Are you happy?</label>
            <CheckboxInput fieldName="isHappy" />
            <button
              type="submit"
              disabled={this.state.form.isValid() === false}
            >
              Submit to my super service
            </button>
          </Form>
        </div>
      </div>
    )
  }
}
```

## Motivation
