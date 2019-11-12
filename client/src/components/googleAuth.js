import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions'

class GoogleAuth extends React.Component {

	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client.init({
				clientId: '456249029352-lc3usifionm0p0sbis57u1e2dgf58edc.apps.googleusercontent.com',
				scope: 'email'

			}).then(() => {
				// these functions are from gapi
				this.auth = window.gapi.auth2.getAuthInstance();
				this.onAuthChange(this.auth.isSignedIn.get())
				this.auth.isSignedIn.listen(this.onAuthChange)
			});
		});
	}

	onAuthChange = (isSignedIn) => {
		console.log('isSignedIn', isSignedIn)
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	}

	onSignInClick = () => {
		this.auth.signIn();
	}

	onSignOutClick = () => {
		this.auth.signOut();
	}

	renderAuthButton() {
		console.log('button', this.props.isSignedIn)
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<button
					onClick={this.onSignOutClick}
					className="ui pink google button">
					<i className="google icon" />
					Sign out
				</button>
			)
		} else {
			return (
				<button
					onClick={this.onSignInClick}
					className="ui pink google button">
					<i className="google icon" />
					Sign In with Googole
				</button>
			)
		}
	}

	render() {
		return(
			<div>
				{this.renderAuthButton()}
			</div>
		)
	}
}

const mapStateToProps = state => {
	console.log('state', state.auth.isSignedIn)
	return { isSignedIn: state.auth.isSignedIn };
}

export default connect(
	mapStateToProps,
	{ signIn, signOut }
) (GoogleAuth);
