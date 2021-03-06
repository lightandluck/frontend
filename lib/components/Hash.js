import React from 'react'
import PropTypes from 'prop-types'

import { defaultPalette } from '../propTypes/palette'

import Base from './Base'

export default class Hash extends Base {
  template (css) {
    const { hash, datasetRef, short, noPrefix, style } = this.props
    let displayHash = hash || datasetRef.path
    if (displayHash.length < 52) {
      displayHash = 'invalid hash'
    } else {
      displayHash = displayHash.slice('/ipfs/'.length)
      displayHash = short ? displayHash.slice(0, 2) + '...' + displayHash.slice(-6) : displayHash
    }
    return (
      <div className={`stats ${css('hash')}`} style={style} >
        {!noPrefix && <span className={css('prefix')}>/ipfs/</span>}
        {displayHash}
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      prefix: {
        color: palette.neutralBold
      },
      hash: {
        color: palette.neutralMuted
      }
    }
  }
}

Hash.propTypes = {
  short: PropTypes.bool,
  noPrefix: PropTypes.bool,
  style: PropTypes.object
}

Hash.defaultProps = {
  style: {},
  short: false,
  noPrefix: false,
  datasetRef: {}
}
