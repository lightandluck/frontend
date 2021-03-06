import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import StatsLine from '../StatsLine'
import DatasetName from '../DatasetName'
import Hash from '../Hash'
import { defaultPalette } from '../../propTypes/palette'
import Base from '../Base'

export default class DatasetItem extends Base {
  constructor (props) {
    super(props)
    this.state = {
      saveButtonState: 'displayNone'
    };
    [
      'handleOnMouseEnter',
      'handleOnMouseLeave',
      'renderSave',
      'renderOnAdd'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleOnMouseEnter (e) {
    this.setState({ saveButtonState: 'displayInlineBlock' })
  }

  handleOnMouseLeave (e) {
    this.setState({ saveButtonState: 'displayNone' })
  }

  datasetLength (l) {
    var length = {name: '', value: 0}
    if (l > Math.pow(2, 80)) {
      length.name = 'YB'
      length.value = Math.trunc(l / Math.pow(2, 80))
    } else if (l > Math.pow(2, 70)) {
      length.name = 'ZB'
      length.value = Math.trunc(l / Math.pow(2, 70))
    } else if (l > Math.pow(2, 60)) {
      length.name = 'EB'
      length.value = Math.trunc(l / Math.pow(2, 60))
    } else if (l > Math.pow(2, 50)) {
      length.name = 'PB'
      length.value = Math.trunc(l / Math.pow(2, 50))
    } else if (l > Math.pow(2, 40)) {
      length.name = 'TB'
      length.value = Math.trunc(l / Math.pow(2, 40))
    } else if (l > Math.pow(2, 30)) {
      length.name = 'GB'
      length.value = Math.trunc(l / Math.pow(2, 30))
    } else if (l > Math.pow(2, 20)) {
      length.name = 'MB'
      length.value = Math.trunc(l / Math.pow(2, 20))
    } else if (l > Math.pow(2, 10)) {
      length.name = 'KB'
      length.value = Math.trunc(l / Math.pow(2, 10))
    } else if (l > 0) {
      length.name = 'byte'
      length.value = l
    }
    if (l !== 1) {
      length.name += 's'
    }
    return length
  }

  titleString () {
    const {data = {}, small} = this.props
    const name = data.name
    const {dataset = {}} = data
    const { meta } = dataset
    if (small && meta && meta.title && meta.title.length > 30) {
      return `${meta.title.slice(0, 30)}...`
    }
    return (meta && meta.title) || name
  }

  stats (datasetRef) {
    const { dataset } = datasetRef
    const length = dataset.structure.length
    const entries = dataset.structure.entries || 0
    const errors = dataset.structure.errCount || 0

    return [
      {
        name: (errors === 1) ? 'error' : 'errors',
        value: errors
      },
      {
        name: (entries === 1) ? 'entry' : 'entries',
        value: entries
      },
      this.datasetLength(length)
    ]
  }

  renderOnAdd (e) {
    this.props.onAdd(this.props.data)
  }

  renderSave (css) {
    const { saveButtonState } = this.state
    return (
      <div className={`${css('save')} ${css(saveButtonState)}`} onClick={this.renderOnAdd} >
        <DatasetName save name='Save' />
      </div>
    )
  }

  template (css) {
    const { data, link, small, isLatestDataset, rename } = this.props
    const title = this.titleString()
    // const path = data && data.path && data.path.slice(6, -13)
    const path = `/${data.peername}/${data.name}/at${data.path}`
    if (link) {
      return (
        <div className={css('wrap', small && 'small')} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave} >
          <div className='displayInlineBlock'>
            <Link to={{pathname: path}} >
              <span className={css('name')}>{`${data.peername}/${data.name}` || <i>unnamed dataset</i>}</span>
              <h3 className={css('title')}>{title || <i>untitled dataset</i>}</h3>
            </Link>
            { data.peer ? this.renderSave(css) : undefined}
            <StatsLine muted stats={this.stats(data)} />
          </div>
        </div>
      )
    } else {
      return (
        <div className={css('wrap', small && 'small')} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave} >
          {!isLatestDataset ? <div className={css('previousCommit')}>You are viewing a previous version of this dataset</div> : undefined}
          <div className='displayInlineBlock'>
            <DatasetName rename={rename} peername={data.peername} name={data.name || 'unnamed dataset'} large style={{display: 'inline-block', marginTop: 15}} />
            { data.peer ? this.renderSave(css) : undefined}
            <h2>{title || 'untitled dataset'}</h2>
            <Hash hash={data.path} style={{marginBottom: 15}} />
            <StatsLine stats={this.stats(data)} extraSpace large style={{marginTop: 30}} />
          </div>
        </div>
      )
    }
  }

  styles () {
    const palette = defaultPalette
    return {
      wrap: {
        margin: '20px 20px 20px 0'
      },
      small: {
        maxWidth: 300
      },
      name: {
        color: palette.d,
        fontFamily: '"source code pro", "courier", "monospace"'
      },
      path: {
        color: palette.neutral
      },
      title: {
        color: palette.text,
        marginBottom: 0
      },
      muted: {
        marginTop: 4,
        color: palette.neutralBold
      },
      save: {
        marginLeft: 30,
        cursor: 'pointer'
      },
      displayNone: {
        display: 'none'
      },
      displayInlineBlock: {
        display: 'inline-block'
      },
      previousCommit: {
        color: palette.error,
        position: 'absolute',
        marginTop: -15
      }
    }
  }
}

DatasetItem.propTypes = {
  small: PropTypes.bool,
  link: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  peer: PropTypes.bool,
  rename: PropTypes.func,
  isLatestDataset: PropTypes.bool
}

DatasetItem.defaultProps = {
  small: false
}
