import React from 'react'
import PropTypes from 'prop-types'

import { defaultPalette } from '../../propTypes/palette'
import Base from '../Base'

export default class TagInput extends Base {
  constructor (props) {
    super(props)
    this.state = { tagString: '' };
    [
      'handleOnChange'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (this.props.value) {
      this.setState({ tagString: this.props.value.join(', ') })
    }
  }

  handleOnChange (e) {
    this.setState({ tagString: e.target.value })
    let tags = e.target.value.trim().split(',').map(i => { return i.trim() }).filter(i => i)
    this.props.onChange(this.props.name, tags, e)
  }

  template (css) {
    const { label, name, showError, error, helpText, placeholder, showHelpText, className } = this.props
    return (
      <div className={(error && showError) ? `validFormField form-group has-error ${className}` : `validFormField form-group ${className}`}>
        <input
          id={name}
          name={name}
          type='text'
          className={`form-control ${css('border')}`}
          value={this.state.tagString}
          placeholder={placeholder || name}
          onChange={(e) => this.handleOnChange(e)}
        />
        {label && <div><label className={css('label')} htmlFor={name}>{label}</label></div>}
        {(error !== '' && showError) ? <div className='control-label'>{error}</div> : undefined}
        {(helpText && showHelpText) && <div><i className='help_hint'>{helpText}</i></div>}
      </div>
    )
  }
  styles (props) {
    const palette = defaultPalette
    return {
      border: {
        borderColor: palette.neutral,
        ':focus': {
          borderColor: palette.a
        }
      },
      label: {
        color: palette.neutral
      }
    }
  }
}

TagInput.propTypes = {
  // if provided it'll create a label element to accompany the field
  label: PropTypes.string,
  // required name for the field
  name: PropTypes.string.isRequired,
  // weather or not to actually display any passed-in errors
  showError: PropTypes.bool,
  // an error message to displacy
  error: PropTypes.string,
  // value to display in the field
  value: PropTypes.arrayOf(PropTypes.string),
  // placeholder text for an empty field. default: ""
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // change handler func. will be called with (name, value, event)
  onChange: PropTypes.func.isRequired,
  // short message to help the user
  helpText: PropTypes.string,
  // weather to show help text or not
  showHelpText: PropTypes.bool
}

TagInput.defaultProps = {
  name: undefined,
  error: undefined,
  showError: true,
  placeholder: ''
}
