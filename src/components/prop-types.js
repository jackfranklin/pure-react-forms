import PropTypes from 'prop-types'

export const inputTypes = {
  propTypes: {
    fieldName: PropTypes.string.isRequired,
    className: PropTypes.string,
    type: PropTypes.string,
  },
  defaultProps: {
    className: '',
    type: 'text',
  },
}
