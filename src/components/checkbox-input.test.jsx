import React, { Component } from 'react'
import { mount } from 'enzyme'
import CheckboxInput from './checkbox-input'
import Form from './form'
import createForm from '../form'
import { makeDummyFormComponent } from '../../test/util'

describe('checkbox input', () => {
  const form = createForm({
    happy: {
      value: false,
    },
  })

  const DummyForm = makeDummyFormComponent(form)

  const CheckboxInputForm = () =>
    <DummyForm>
      <CheckboxInput fieldName="happy" />
    </DummyForm>

  it('renders a checkbox', () => {
    const wrapper = mount(<CheckboxInputForm />)

    expect(wrapper.find('input[type="checkbox"]').length).toEqual(1)
    expect(wrapper.find('input[type="checkbox"]').props().value).toEqual(false)
  })

  it('can be toggled', () => {
    const wrapper = mount(<CheckboxInputForm />)
    wrapper.find('input[type="checkbox"]').simulate('change')
    expect(wrapper.find('input[type="checkbox"]').props().value).toEqual(true)
  })
})
