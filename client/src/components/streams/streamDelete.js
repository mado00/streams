import React from 'react';
import Modal from '../modal';
import history from '../../history';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';
import { connect } from 'react-redux';

class StreamDelete extends React.Component {

	componentDidMount() {
		console.log(this.props)
		this.props.fetchStream(this.props.match.params.id)
	}

	renderActions() {
		const { id } = this.props.match.params
		return (	
			//short version of React.Fragment
			// <>
			<React.Fragment>
				<button onClick={() => this.props.deleteStream(id)}
					className="ui button negative">Delete</button>
				<Link to='/' className="ui button">Cancel</Link>
			</React.Fragment>
			// </>	
		);
	}

	renderContent() {
		console.log('r', this.props.stream)
		if (!this.props.stream) {
			return 'Are you sure you want to delete this streams?'
		}
		return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`
	}
	
	render() {
		return (
			<Modal
				title="Delete Stream"
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={() => history.push('/')}
			/>
		);
	}
}
// use ownProps
//  The reason we want use ownProps is so that we can look at that match prop from componentDidMount there and pull out the id of the stream that we're supposed to be showing on this page. 
const mapStateToProps = (state, ownProps) => {
	console.log('ownprops', ownProps.match.params.id)
	return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(
	mapStateToProps,
	{fetchStream, deleteStream}
)(StreamDelete);