import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import { Palette, defaultPalette } from '../../propTypes/palette'

function dataTypeColor (type, palette = defaultPalette) {
  switch (type) {
    case 'string':
      return palette.text
    case 'integer':
      return palette.a
    case 'float':
      return palette.b
    case 'boolean':
      return palette.c
    case 'date':
      return palette.d
    default:
      return palette.text
  }
}

export default class FieldItem extends Base {
  template (css) {
    const { data, onSelect, palette, index } = this.props

    return (
      <div className={css('wrap')}>
        <p className={css('datatype')} style={{ color: dataTypeColor(data.type, palette) }}><b className={css('index')}>{index + 1}</b> {data.type}</p>
        <h5 className={css('title')} onClick={onSelect}>{data.name}</h5>

        {data.missingValue && <p className='code muted'>default value: {data.missingValue}</p>}
        {data.description && <p className={css('description')}>{data.description}</p>}
      </div>
    )
  }

  styles (props) {
    const { palette } = props
    return {
      wrap: {
        margin: 2,
        padding: 5,
        flex: '1 1 230px',
        minHeight: 120,
        borderRadius: 3,
        background: palette.background
      },
      datatype: {
        margin: 0
      },
      index: {
        color: palette.muted
      },
      title: {
        cursor: 'pointer',
        color: palette.text,
        margin: 0
      },
      description: {
        marginTop: 4,
        color: palette.muted
      },
      save: {
        marginLeft: 30,
        marginTop: 20,
        float: 'right'
      }
    }
  }
}

FieldItem.propTypes = {
  data: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  palette: Palette
}

FieldItem.defaultProps = {
  palette: defaultPalette
}