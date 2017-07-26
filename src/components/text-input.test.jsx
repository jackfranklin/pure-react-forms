import { mount } from 'enzyme'
import React, { Component } from 'react'
import Form from './form'
import createForm from '../form'
import TextInput from './text-input'

describe('TextInput', () => {
  const makeDummyForm = () =>
    class DummyForm extends Component {
      state = { form }

      onFormChange = form => {
        this.setState({ form })
      }

      render() {
        return (
          <Form form={this.state.form} onChange={this.onFormChange}>
            <TextInput fieldName="email" className="foo" />
          </Form>
        )
      }
    }

  let form

  beforeEach(() => {
    form = createForm({
      email: {
        errorMessage: 'Email address is invalid',
        value: '',
        validator: input => input.indexOf('@') > -1,
      },
    })
  })

  it('renders an input', () => {
    const DummyForm = makeDummyForm()
    const wrapper = mount(<DummyForm />)
    expect(wrapper.find('input').length).toEqual(1)
  })

  it('gives the input the name', () => {
    const DummyForm = makeDummyForm()
    const wrapper = mount(<DummyForm />)
    expect(wrapper.find('input').props().name).toEqual('email')
  })

  it('gives the input extra classes', () => {
    const DummyForm = makeDummyForm()
    const wrapper = mount(<DummyForm />)

    expect(wrapper.find('input.foo').length).toEqual(1)
  })
})
