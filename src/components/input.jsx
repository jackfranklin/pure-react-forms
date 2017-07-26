import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Input extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    fieldName: PropTypes.string.isRequired,
  }

  static contextTypes = {
    getField: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
  }

  componentWillMount() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.field() == undefined) {
        throw new Error(`Field ${this.props.fieldName} not found`)
      }
    }
  }

  field() {
    return this.context.getField(this.props.fieldName)
  }

  propsForRender() {
    const field = this.field()
    return {
      name: field.name,
      value: field.value,
      onChange: this.onChange,
      onBlur: this.onBlur,
      required: field.isRequired(),
    }
  }

  onChange = e => {
    const newField = this.field().setValue(e.target.value).touch()
    this.context.onFieldChange(newField)
  }

  onBlur = e => {
    const newField = this.field().blur()
    this.context.onFieldChange(newField)
  }

  errorMessage() {
    const msg = this.field().errorMessage
    if (typeof msg === 'function') {
      return msg(this.field.value)
    } else {
      return msg
    }
  }

  render() {
    const wrapperClasses = (this.props.className || '')
      .split(' ')
      .concat([this.field().isValid() ? null : 'has-error'])
      .filter(x => x)
      .join(' ')

    return (
      <div className={wrapperClasses}>
        {this.props.render(this.propsForRender())}
        {this.field().isValid() === false &&
          <span className="input-error">
            {this.errorMessage()}
          </span>}
      </div>
    )
  }
}
