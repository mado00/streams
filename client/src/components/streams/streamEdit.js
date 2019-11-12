import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './streamForm';

class StreamEdit extends React.Component {

	componentDidMount() {
		//fetch one stream
		this.props.fetchStream(this.props.match.params.id);
	}

	onSubmit = (formValues) => {
		// console.log(formValues)
		this.props.editStream(this.props.match.params.id, formValues)
	}

	render() {
		console.log('p', this.props)
		if (!this.props.stream) {
			return <div>Loading...</div>
		}
		return (		
	// console.log('props', props.match.params.id)
			<div>
				<h3>Edit Stream</h3>
				<StreamForm
					initialValues={_.pick(this.props.stream, 'title', 'description')}
					onSubmit={this.onSubmit}
				/>
			</div > 
		)
	}
	
}

const mapStateToProps = (state, ownProps) => {
	console.log('state', state.streams)
	// console.log('ownProps', ownProps)
	return {stream: state.streams[ownProps.match.params.id]}
};

export default connect(
	mapStateToProps,
	{fetchStream, editStream}
)(StreamEdit);