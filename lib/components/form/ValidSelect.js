import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import { defaultPalette } from '../../propTypes/palette'

export default class ValidSelect extends Base {
  template (css) {
    const { label, name, className, options, showError, error, value, helpText, showHelpText, onChange } = this.props
    const errorClass = (error && showError) ? 'has-error' : ''

    return (
      <div className={`validFormField form-group ${errorClass} ${className}`}>
        <select id={name} name={name} className={`form-control ${css('border')}`} value={value} onChange={(e) => { onChange(name, e.target.value, e) }}>
          <option value='' />
          {options.map((opt, i) => {
            const value = typeof opt === 'string' ? opt : opt.value
            const text = typeof opt === 'string' ? opt : opt.text
            return (<option key={i} value={value}>{text}</option>)
          }
          )}
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

ValidSelect.propTypes = {
  // if provided it'll create a label element to accompany the field
  label: PropTypes.string,
  // required name for the field
  name: PropTypes.string.isRequired,
  // className will set on the containing div
  className: PropTypes.string,
  // array of option strings
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])).isRequired,
  // weather or not to actually display any passed-in errors
  showError: PropTypes.bool,
  // value to display in the field
  value: PropTypes.string,
  // short message to help the user
  helpText: PropTypes.string,
  // weather to show help text or not
  showHelpText: PropTypes.bool,
  // change handler func. will be called with (name, value, event)
  onChange: PropTypes.func.isRequired
}

ValidSelect.defaultProps = {
  name: undefined,
  showError: true,
  error: undefined,
  helpText: '',
  showHelpText: false
}
