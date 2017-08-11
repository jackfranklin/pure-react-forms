import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from './input'
import { inputTypes } from './prop-types'

class CheckboxInput extends Component {
  static propTypes = {
    ...inputTypes.propTypes,
  }
  static defaultProps = {
    className: '',
  }

  checkboxChange = props => {
    const newValue = !props.value
    props.onChange({ target: { value: newValue } })
  }

  renderCheckbox(props) {
    return (
      <input
        type="checkbox"
        checked={props.value}
        {...props}
        onChange={() => this.checkboxChange(props)}
      />
    )
  }

  render() {
    const { fieldName, ...inputProps } = this.props

    return (
      <Input
        fieldName={fieldName}
        render={props => this.renderCheckbox({ ...inputProps, ...props })}
      />
    )
  }
}

export default CheckboxInput
