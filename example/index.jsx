import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import BasicForm from './basic-form'
import CustomInputForm from './custom-input'

import Form from '../src/components/form'
import SelectInput from '../src/components/select-input'
import { createForm } from '../src/index'

const forms = {
  BasicForm,
  CustomInputForm,
}

class App extends Component {
  state = {
    form: createForm({
      activeExample: {
        value: 'BasicForm',
      },
    }),
  }

  onFormChange = form => this.setState({ form })

  getFormComponent() {
    return forms[this.state.form.getValue('activeExample')]
  }

  render() {
    const activeComponent = this.getFormComponent()
    const exampleOptions = Object.keys(forms).map(formKey =>
      <option key={formKey} value={formKey}>
        {formKey}
      </option>
    )

    return (
      <div>
        <Form
          form={this.state.form}
          onChange={this.onFormChange}
          className="example-picker"
        >
          <label>
            Pick an example from the dropdown to change which form is used.
          </label>
          <SelectInput fieldName="activeExample">
            {exampleOptions}
          </SelectInput>
        </Form>
        {React.createElement(activeComponent)}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
