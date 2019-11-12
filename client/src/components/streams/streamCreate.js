import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './streamForm';

class StreamCreate extends React.Component {

	// ** old version
	// renderInput(formPorps) {
	// 	 return(
	// 		<input onChnage={formPorps.input.onChange}
	// 					 value={formPorps.input.value} />
	// 	)
	// }
	// ** shorter version
	// renderInput(formPorps) {
	// 	 return <input {...formPorps.input} />
	// }

	// ** more shorter version
	// renderInput({input}) {
	// 	 return <input {...input} />
	// }
	// renderInput = ({ input, label, meta }) => {
	// 	console.log('meta',input, label, meta)
	// 	const showError = `field ${meta.error && meta.touched ? 'error' : '' }`
	// 	return (
	// 		<div className={showError}>
	// 			<label>{label}</label>
	// 			<input {...input} />
	// 			{this.renderError(meta)}
	// 		</div>
	// 	)
	// }

	onSubmit = formValues => {
		// console.log(formValues);
		this.props.createStream(formValues);
	}

	render() {
		return (
			<div>
				<h3>Create a Stream</h3>
				<StreamForm onSubmit={this.onSubmit} />
			</div>
		);
	}
}

export default connect(
	null,
	{ createStream }
)(StreamCreate);

