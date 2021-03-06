import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'
import BarChart from './BarChart'
import LineChart from './LineChart'
import ChartOptionsPicker from './ChartOptionsPicker'
import { schemaProps } from '../propTypes/datasetRefProps'

// function transformResults (schema = [], results = [], xIndex, yIndex) {
//   console.log(results)
//   return [{
//     name: 'results',
//     values: results.map(row => ({
//       x: row[xIndex] || 0,
//       y: row[yIndex] || 0
//     }))
//   }]
// }

function chartDimensions (size) {
  let width = 300
  let height = 400
  switch (size) {
    case 'xs':
      width = 300
      break
    case 'sm':
      width = 450
      break
    case 'md':
      width = 600
      break
    case 'lg':
      width = 900
      height = 400
      break
    case 'xl':
      width = 1100
      height = 500
      break
    default:
      width = 300
      height = 300
      break
  }

  return { width, height }
}

export default class ResultsChart extends Base {
  constructor (props) {
    super(props);

    [
      'renderChart'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  renderChart () {
    const { data, chartOptions } = this.props
    const { title, xTitle, type } = chartOptions
    const { width, height } = chartDimensions('sm')

    switch (type) {
      case 'line':
        return (
          <LineChart
            data={data}
            title={title}
            width={width}
            height={height}
            xTitle={xTitle}
          />
        )
      case 'bar':
      default:
        return (
          <BarChart
            data={data}
            title={title}
            width={width}
            height={height}
            xTitle={xTitle}
          />
        )
    }
  }

  template (css) {
    const { schema, data, chartOptions, onOptionsChange } = this.props
    const { xIndex, yIndex, type } = chartOptions
    if (!data) {
      return (
        <div className='panel'>
          <label>Run a query to view a chart</label>
        </div>
      )
    }
    return (
      <div className='resultsChart'>
        <ChartOptionsPicker schema={schema} options={chartOptions} onChange={onOptionsChange} />
        { (xIndex !== undefined && yIndex !== undefined && type) ? <div className={css('chartWrapper')} >{this.renderChart()}</div> : undefined }
      </div>
    )
  }

  styles () {
    return {
      chartWrapper: {

      }
    }
  }
}

ResultsChart.propTypes = {
  schema: schemaProps,
  data: PropTypes.arrayOf(PropTypes.object),
  // margins: PropTypes.objectOf(PropTypes.number),
  chartOptions: PropTypes.shape({
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    xIndex: PropTypes.number,
    yIndex: PropTypes.number,
    path: PropTypes.string.isRequired
  }).isRequired,
  onOptionsChange: PropTypes.func.isRequired
}

ResultsChart.defaultProps = {
}
