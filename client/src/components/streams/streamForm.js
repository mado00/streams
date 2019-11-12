import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			)
		}
	}
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
	renderInput = ({ input, label, meta }) => {
		console.log('meta',input, label, meta)
		const showError = `field ${meta.error && meta.touched ? 'error' : '' }`
		return (
			<div className={showError}>
				<label>{label}</label>
				<input {...input} />
				{this.renderError(meta)}
			</div>
		)
	}

	onSubmit = formValues => {
		// console.log(formValues);
		this.props.onSubmit(formValues);
	}

	render() {
		return (
			<form
				onSubmit={this.props.handleSubmit(this.onSubmit)}
				className="ui form error">
				<Field
					name="title" component={this.renderInput}
					label="Enter Title" />
				<Field
					name="description" component={this.renderInput}
					label="Enter description" />
				<button className="ui button primary">Submit</button>
			</form>
		)
	}
}

const validate = formValue => {
	const errors = {}
	if (!formValue.title) {
		errors.title = "You must enter a title";
	}

	if (!formValue.description) {
			errors.description = "You must enter a description";
	}
	return errors;
}

export default reduxForm({
	form: 'streamForm',
	validate
})(StreamForm)


