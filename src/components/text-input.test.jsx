import { mount } from 'enzyme'
import React, { Component } from 'react'
import Form from './form'
import createForm from '../form'
import TextInput from './text-input'

import { makeDummyFormComponent } from '../../test/util'

describe('TextInput', () => {
  const form = createForm({
    email: {
      errorMessage: 'Email address is invalid',
      value: '',
      validator: input => input.indexOf('@') > -1,
    },
  })

  const DummyForm = makeDummyFormComponent(form)

  const TextInputForm = () =>
    <DummyForm>
      <TextInput fieldName="email" className="foo" />
    </DummyForm>

  it('renders an input', () => {
    const wrapper = mount(<TextInputForm />)
    expect(wrapper.find('input').length).toEqual(1)
  })

  it('gives the input the name', () => {
    const wrapper = mount(<TextInputForm />)
    expect(wrapper.find('input').props().name).toEqual('email')
  })

  it('gives the input extra classes', () => {
    const wrapper = mount(<TextInputForm />)

    expect(wrapper.find('input.foo').length).toEqual(1)
  })
})
