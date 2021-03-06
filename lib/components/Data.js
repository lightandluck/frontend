import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'
import Json from './Json'
import Spinner from './Spinner'
// import DatasetDataGrid from './DatasetDataGrid'
import DatasetRefProps from '../propTypes/datasetRefProps'
import Button from './Button'

export default class Data extends Base {
  template (css) {
    const { data, error, noData, onClick, loading } = this.props
    // const { data, datasetRef, loading, error, onClick, onSetLoadingData } = this.props

    if (error) {
      return (
        <div className={css('comingSoonWrap')}>
          <p>Error loading data: {error}</p>
          <p>Click button to try to reload:</p>
          <Button onClick={onClick} color='a' text='reload' loading={loading} name='reload' />
        </div>
      )
    }

    // if (datasetRef.dataset && datasetRef.dataset.structure && datasetRef.dataset.structure.format === 'csv') {
    //   return (
    //     <DatasetDataGrid
    //       dataset={datasetRef && datasetRef.dataset}
    //       data={data}
    //       // onLoadMore={onLoadMore}
    //       onSetLoadingData={onSetLoadingData}
    //       onReload={onclick}
    //       loading={loading}
    //       path={datasetRef && datasetRef.path}
    //       error={error}
    //     />
    //   )
    // }
    if (noData) {
      return (<p>This dataset currently has no specified data</p>)
    }

    if (data) {
      return <Json data={data} />
    }

    return <Spinner />
  }

  styles () {
    return {
      fields: {
        margin: 10,
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start'
      }
    }
  }
}

Data.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  datasetRef: DatasetRefProps,
  noData: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  // onLoadMore: PropTypes.func.isRequired,
  onSetLoadingData: PropTypes.func.isRequired
}

Data.defaultProps = {
}
