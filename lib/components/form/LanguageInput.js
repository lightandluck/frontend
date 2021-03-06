import React from 'react'
import PropTypes from 'prop-types'

import { defaultPalette } from '../../propTypes/palette'
import Base from '../Base'

class LanguageInput extends Base {
  constructor (props) {
    super(props)
    this.state = {};
    [
      'handleOnChange'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleOnChange (e) {
    const languages = Array.from(e.target.options).filter(option => { return option.selected && option.value }).map(option => { return option.value })
    this.props.onChange(this.props.name, languages, e)
  }

  template (css) {
    const { label, name, value, error, showError, helpText, showHelpText, className } = this.props
    return (
      <div className={(error && showError) ? `validFormField form-group has-error ${className}` : `validFormField form-group ${className}`}>
        <select id={name} name={name} className={`form-control ${css('border')}`} style={{overflow: 'auto'}} value={value} multiple onChange={(e) => this.handleOnChange(e)}>
          <option value='arabic'>arabic</option>
          <option value='bengali'>bengali</option>
          <option value='chinese'>chinese</option>
          <option value='english'>english</option>
          <option value='french'>french</option>
          <option value='german'>german</option>
          <option value='hindi'>hindi</option>
          <option value='japanese'>japanese</option>
          <option value='javanese'>javanese</option>
          <option value='korean'>korean</option>
          <option value='lahanda'>lahanda</option>
          <option value='portuguese'>portuguese</option>
          <option value='russian'>russian</option>
          <option value='spanish'>spanish</option>
        </select>
        {label && <div><label className={css('label')} htmlFor={name}>{label}</label></div>}
        {(error !== '' && showError) ? <div className='control-label'>{error}</div> : undefined}
        {(helpText && showHelpText) && <div><i className='help_hint'>{helpText}</i></div>}
      </div>
    )
  }

  styles () {
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

LanguageInput.propTypes = {
  // if provided it'll create a label element to accompany the field
  label: PropTypes.string,
  // required name for the field
  name: PropTypes.string.isRequired,
  // value to display in the field
  value: PropTypes.arrayOf(PropTypes.string),
  // an error message to displacy
  error: PropTypes.string,
  // weather or not to actually display any passed-in errors
  showError: PropTypes.bool,
  // short message to help the user
  helpText: PropTypes.string,
  // weather to show help text or not
  showHelpText: PropTypes.bool,
  // change handler func. will be called with (name, value, event)
  onChange: PropTypes.func.isRequired
}

LanguageInput.defaultProps = {
  name: undefined,
  error: undefined,
  showError: true,
  helpText: '',
  showHelpText: false
}

export default LanguageInput
