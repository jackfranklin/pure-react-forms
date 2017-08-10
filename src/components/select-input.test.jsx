import React, { Component } from 'react'
import { mount } from 'enzyme'
import SelectInput from './select-input'
import Form from './form'
import createForm from '../form'
import { makeDummyFormComponent } from '../../test/util'

describe('select input', () => {
  const form = createForm({
    colour: {
      value: '',
    },
  })

  const DummyForm = makeDummyFormComponent(form)

  const SelectInputForm = () =>
    <DummyForm>
      <SelectInput fieldName="colour">
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </SelectInput>
    </DummyForm>

  it('renders a select with the right options', () => {
    const wrapper = mount(<SelectInputForm />)

    expect(wrapper.find('select').length).toEqual(1)
    expect(wrapper.find('select').props().name).toEqual('colour')
    expect(wrapper.find('select option').length).toEqual(2)
    expect(
      wrapper.find('select option').map(opt => opt.props().value)
    ).toEqual(['red', 'blue'])
  })

  it('lets an option be selected', () => {
    const wrapper = mount(<SelectInputForm />)
    wrapper.find('select').simulate('change', {
      target: { value: 'red' },
    })

    expect(wrapper.find('select').props().value).toEqual('red')
  })
})
