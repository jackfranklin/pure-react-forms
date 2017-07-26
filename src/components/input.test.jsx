import React, { Component } from 'react'
import { mount } from 'enzyme'
import Input from './input'
import Form from './form'
import createForm from '../form'

describe('ValidatedInput', () => {
  let form

  beforeEach(() => {
    form = createForm({
      alwaysValid: {
        errorMessage: 'This field is always valid',
        value: 'alwaysValid',
        validator: () => true,
      },
      alwaysInvalid: {
        errorMessage: 'This field is always invalid',
        value: 'alwaysInvalid',
        validator: () => false,
      },
      invalidWithMessageFn: {
        errorMessage: () => 'Totes Invalid',
        validator: () => false,
      },
    })
  })

  const createDummyFormComponent = fieldName => {
    return class DummyForm extends Component {
      state = { form }

      onFormChange = form => {
        this.setState({ form })
      }

      render() {
        return (
          <Form form={this.state.form} onChange={this.onFormChange}>
            <Input
              fieldName={fieldName}
              render={props => <input type="text" {...props} />}
            />
          </Form>
        )
      }
    }
  }

  it('renders an input with the right value when one is given', () => {
    const ValidForm = createDummyFormComponent('alwaysValid')
    const wrapper = mount(<ValidForm />)

    expect(wrapper.find('input').props().value).toEqual('alwaysValid')
  })

  it('throws a nice error if the field cannot be found', () => {
    const FormWithBadField = createDummyFormComponent('FIELD_DOESNT_EXIST')
    expect(() => mount(<FormWithBadField />)).toThrowError(/Field FIELD_DOESNT_EXIST not found/)
  })

  it('does not show an error when the field is valid', () => {
    const ValidForm = createDummyFormComponent('alwaysValid')
    const wrapper = mount(<ValidForm />)

    wrapper.find('input').simulate('change', { target: { value: 'bar' } })
    wrapper.find('input').simulate('blur')
    expect(wrapper.find('div').hasClass('has-error')).toEqual(false)
    expect(wrapper.find('span.input-error').length).toEqual(0)
  })

  it('does show an error when the field is invalid', () => {
    const InvalidForm = createDummyFormComponent('alwaysInvalid')
    const wrapper = mount(<InvalidForm />)

    wrapper.find('input').simulate('change', { target: { value: 'bar' } })
    wrapper.find('input').simulate('blur')
    expect(wrapper.find('div').hasClass('has-error')).toEqual(true)
    expect(wrapper.find('span.input-error').text()).toEqual(
      'This field is always invalid'
    )
  })

  it('the error message can be defined via a function', () => {
    const InvalidForm = createDummyFormComponent('invalidWithMessageFn')
    const wrapper = mount(<InvalidForm />)

    wrapper.find('input').simulate('change', { target: { value: 'bar' } })
    wrapper.find('input').simulate('blur')
    expect(wrapper.find('div').hasClass('has-error')).toEqual(true)
    expect(wrapper.find('span.input-error').text()).toEqual('Totes Invalid')
  })
})

//   it('does not show an error if the field is invalid but has not been blurred', () => {
//     const InvalidForm = createDummyFormComponent('alwaysInvalid')
//     const wrapper = mount(<InvalidForm />)

//     wrapper.find('input').simulate('change', { target: { value: 'bar' } })
//     expect(wrapper.find('div').hasClass('has-error')).toEqual(false)
//   })

//   it('does not show an error if the field is invalid but not touched', () => {
//     const InvalidForm = createDummyFormComponent('alwaysInvalid')
//     const wrapper = mount(<InvalidForm />)

//     expect(wrapper.find('div').hasClass('has-error')).toEqual(false)
//   })
// })
