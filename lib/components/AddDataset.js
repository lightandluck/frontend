/* global alert */
import React from 'react'
import PropTypes from 'prop-types'

import { debounce } from 'lodash'

import Base from './Base'
import ReadOnly from './ReadOnly'
import DropFile from './form/DropFile'
import ValidInput from './form/ValidInput'
import UrlInput from './form/UrlInput'
import Button from './Button'

import { DATASET_INIT_SUCCESS } from '../constants/dataset'

export default class AddDataset extends Base {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      disabled: true,
      message: '',
      urlError: '',
      dataset: {
        name: '',
        url: '',
        files: undefined,
        file_input: undefined
      }
    };

    [
      'onDatasetAddResponse',
      'onDatasetAddSuccess',
      'onDatasetAddFailure',
      'handleChange',
      'handleSubmit',
      'handleUrlChange',
      'handleValidateUrl',
      'handleButtonToggle'
    ].forEach((m) => { this[m] = this[m].bind(this) })

    this.debounceValidateUrl = debounce((url) => {
      this.handleValidateUrl(url)
    }
      , 0)
  }

  handleChange (name, value, e) {
    let fileInput = this.state.dataset.file_input
    if (e.target.type === 'file') {
      fileInput = e.target
    }
    if (name === 'name' && value.slice(-1) === ' ') {
      return
    }
    this.setState(Object.assign({}, this.state, {
      dataset: Object.assign({}, this.state.dataset, { [name]: value, file_input: fileInput })
    }))
  }

  // shouldComponentUpdate () {
  //   return true
  // }

  componentDidUpdate () {
    this.handleButtonToggle()
  }

  onDatasetAddSuccess () {
    this.setState({ loading: false })
    this.props.loadDatasets(this.props.id).then(() => {
      this.props.goBack()
      alert(`${this.state.dataset.name} added to datasets!`)
    })
  }

  onDatasetAddFailure (error) {
    console.log(`DATASET_INIT_FAILURE: ${error}`)
    this.setState({ loading: false, message: `Error: ${error}` })
  }

  onDatasetAddResponse (action) {
    if (action.type === DATASET_INIT_SUCCESS) {
      this.onDatasetAddSuccess()
    } else {
      this.onDatasetAddFailure(action.error)
    }
  }

  handleSubmit (e) {
    const { dataset } = this.state
    e.preventDefault()
    this.setState({ loading: true, message: '' })
    this.props.initDataset(dataset.name, dataset.files, dataset.url).then(action => this.onDatasetAddResponse(action))
  }

  handleValidateUrl (url) {
    if (url.startsWith('http://') || url.startsWith('https://') || !url) {
      this.setState({urlError: ''})
    } else {
      this.setState({urlError: 'Error: url must begin with "http://" or "https://"'})
    }
  }

  handleUrlChange (name, value, e) {
    this.debounceValidateUrl(value)
    this.handleChange(name, value, e)
  }

  handleButtonToggle () {
    const { dataset, urlError } = this.state
    let enable = !!dataset.name && ((dataset.url.length > 7 && !urlError) || dataset.files)
    this.setState({disabled: !enable})
  }

  template (css) {
    if (!this.props.id) {
      return (<ReadOnly />)
    }

    const { loading, dataset, message, disabled } = this.state
    return (
      <div className={css('wrap')}>
        <h1>Add a Dataset</h1>
        <hr />
        <div>
          <div className={css('name')}>
            <ValidInput type='text' name='name' label='Dataset Name' value={dataset.name} onChange={this.handleChange} />
          </div>
          <UrlInput type='text' name='url' label='Add Dataset From URL' value={dataset.url} onChange={this.handleUrlChange} error={this.state.urlError} disabled={this.state.dataset.files} />
          <div>OR</div>
          <DropFile name='files' onChange={this.handleChange} label='Add Dataset From Upload' disabled={this.state.dataset.url} csv json />
          <div className={css('buttonWrap')}>
            <Button loading={loading} disabled={disabled} onClick={this.handleSubmit} text='Add Dataset' name='add-dataset' />
            <div className={css('message')}>{loading ? undefined : message }</div>
          </div>
        </div>
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        marginTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        width: 600
      },
      button: {
        marginTop: 10
      },
      buttonWrap: {
        height: 60,
        width: '100%',
        display: 'flex'
      },
      message: {
        display: 'inline-block',
        width: 250,
        margin: 'auto'
      },
      name: {
        marginBottom: 60
      },
      spinnerOffset: {
        marginLeft: 50
      }
    }
  }
}

AddDataset.propTypes = {
  initDataset: PropTypes.func
}

AddDataset.defaultProps = {
  permissions: {
    edit: false,
    migrate: false,
    change: false
  }
}
