import React, { Component } from 'react'

import Input from './input'
import { inputTypes } from './prop-types'

class TextInput extends Component {
  static propTypes = {
    ...inputTypes.propTypes,
  }
  static defaultProps = {
    ...inputTypes.defaultProps,
  }

  render() {
    const { fieldName, ...inputProps } = this.props

    return (
      <Input
        fieldName={fieldName}
        render={props => <input {...inputProps} {...props} />}
      />
    )
  }
}

export default TextInput
