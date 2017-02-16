import React, { PropTypes } from 'react';

export default class QBang extends React.Component {
	render() {
		return (
			<svg class="qBang" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 200">
				<path class="q" fill={this.props.fill} d="M40.93,113.44H39.15a11.79,11.79,0,0,1-8.59-3.73,11.39,11.39,0,0,1-3.08-8.63c1-15.38,11.74-25.47,21.17-34.38C56.88,58.91,64,52.19,64,43.52,64,31.95,56,25,42.51,25a36.17,36.17,0,0,0-22.76,8.23A11.69,11.69,0,0,1,5.23,14.93,61.22,61.22,0,0,1,43.67,1.37c28.12,0,47,16.1,47,40.07,0,16.43-11.11,26.92-20.92,36.17-8.28,7.81-16.1,15.19-17.19,25.25A11.91,11.91,0,0,1,40.93,113.44Z"/>
				<path class="bang" fill={this.props.fill} d="M33.73,198.72a7.45,7.45,0,0,1-2.82-.56l-4.07-1.66a7.43,7.43,0,0,1-4.22-9.3l4.6-13.33L15,171.32a7.42,7.42,0,0,1-5.87-8l.39-4.17a7.46,7.46,0,0,1,7.58-6.73l12.24.31-1.8-13.37a7.47,7.47,0,0,1,5.79-8.25l4.26-.93a7.47,7.47,0,0,1,8.68,5.1l3.91,12.91,11-5.36a7.45,7.45,0,0,1,9.69,3L73,149.5a7.42,7.42,0,0,1-2,9.68l-10.06,7.4,9.72,10.22a7.43,7.43,0,0,1,0,10.21l-3,3.19a7.4,7.4,0,0,1-10,.77l-10.92-8.46-6.43,12.23A7.4,7.4,0,0,1,33.73,198.72Z"/>
			</svg>
		);
	}
}

QBang.propTypes = {
	// fill color
	fill : PropTypes.string
}

QBang.defaultProps = {
	fill : "#FA009B"
}