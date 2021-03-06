import React from 'react'
import PropTypes from 'prop-types'
import Base from './Base'

import { defaultPalette } from '../propTypes/palette'
import Search from './Search'

export default class TabPanel extends Base {
  constructor (props) {
    super(props)

    this.state = {
      index: 0,
      searchString: ''
    };

    [
      'handleSetPanel',
      'setSearch',
      'renderSearch'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleSetPanel (i, onSelectPanel, e) {
    if (typeof onSelectPanel === 'function') {
      onSelectPanel(i)
    } else {
      this.setState({ index: i })
    }
  }

  setSearch (searchString) {
    this.setState({searchString})
  }

  renderSearch (css) {
    return (
      <div className={css('search')}>
        <Search searchString={this.state.searchString} onChange={this.setSearch} placeholder='search data' />
      </div>
    )
  }

  template (css) {
    const { index, expanded, labels = [], components, onSelectPanel, onToggleExpand, search, clearBackground } = this.props
    const panel = (index !== undefined) ? index : this.state.index
    const component = components[panel]
    const cssWrap = clearBackground ? css('wrap') : css('wrap', 'background')
    return (
      <div className={cssWrap} >
        <div className={`${css('header')}`}>
          { onToggleExpand && <a className={`icon ${css('expand')}`} onClick={onToggleExpand}>{expanded ? 'contract' : 'expand'}</a> }
          {labels.map((label, i) => {
            return (
              <a
                key={i}
                className={css('tab', i === panel && 'currentTab')}
                onClick={this.handleSetPanel.bind(this, i, onSelectPanel)}><h4>{label}</h4></a>
            )
          }
          )}
        </div>

        {search ? this.renderSearch(css) : undefined}
        <div className={css('content')}>
          {component}
        </div>
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      background: {
        background: palette.sink
      },
      wrap: {
        height: '100%',
        overflow: 'hidden',
        borderRadius: 3,
        display: 'flex',
        flexFlow: 'column nowrap',
        padding: 15
      },
      search: {
        height: 45,
        paddingLeft: 12
      },
      tab: {
        display: 'inline-block',
        color: palette.neutral,
        transition: 'all 0.25s',
        marginRight: 40
      },
      expand: {
        float: 'right',
        cursor: 'pointer',
        maxHeight: '100%',
        color: palette.neutral,
        marginRight: 5,
        marginTop: 3
      },
      currentTab: {
        color: palette.a
      },
      header: {
        fontWeight: 'bold'
      },
      content: {
        flex: '2 1 90%',
        display: 'flex'
      }
    }
  }
}

TabPanel.propTypes = {
  labels: PropTypes.array.isRequired,
  components: PropTypes.array.isRequired,
  index: PropTypes.number,
  onSelectPanel: PropTypes.func,
  expanded: PropTypes.bool,
  onToggleExpand: PropTypes.func,
  clearBackground: PropTypes.bool
}

TabPanel.defaultProps = {
}
