import React, { Component } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./LoginPage.css";

class LoginPage extends Component {
	static defaultProps = {
		location: {},
		history: {
			push: () => {},
		},
	};

	handleLoginSuccess = () => {
		const { location, history } = this.props;
		const destination = (location.state || {}).from || "/";
		history.push(destination);
	};

	render() {
		return (
			<div className="LoginPage">
				<h2 className="LoginForm__title">Login</h2>
				<LoginForm onLoginSuccess={this.handleLoginSuccess} />
			</div>
		);
	}
}

export default LoginPage;
