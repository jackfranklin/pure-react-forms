import React, { Component } from 'react'
import Form from '../src/components/form'

export const makeDummyFormComponent = form =>
  class DummyForm extends Component {
    state = { form }

    onFormChange = form => {
      this.setState({ form })
    }

    render() {
      return (
        <Form form={this.state.form} onChange={this.onFormChange}>
          {this.props.children}
        </Form>
      )
    }
  }
