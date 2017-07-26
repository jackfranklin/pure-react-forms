import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from './input'
import { inputTypes } from './prop-types'

class SelectInput extends Component {
  static propTypes = {
    ...inputTypes.propTypes,
  }
  static defaultProps = {
    ...inputTypes.defaultProps,
  }

  static childContextTypes = {
    isOptionSelected: PropTypes.func,
  }

  renderSelect(props) {
    return (
      <select {...props}>
        {this.props.children}
      </select>
    )
  }

  render() {
    const { fieldName, children, ...inputProps } = this.props

    return (
      <Input
        fieldName={fieldName}
        render={props => this.renderSelect({ ...inputProps, ...props })}
      />
    )
  }
}

export default SelectInput
