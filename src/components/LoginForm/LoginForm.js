import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-service";
import UnprintedContext from "../../context/UnprintedContext";

class LoginForm extends Component {
	static contextType = UnprintedContext;

	state = {
		email: "",
		password: "",
		error: null,
	};

	handleSubmitJwtAuth = (e) => {
		e.preventDefault();
		this.setState({ error: null });
		const { email, password } = e.target;

		AuthApiService.postLogin({
			email: email.value,
			password: password.value,
		})
			.then((res) => {
				email.value = "";
				password.value = "";

				this.context.updateSignedIn(true);

				this.props.onLoginSuccess();
			})
			.catch((res) => {
				this.setState({ error: res.error.message });
			});
	};
	render() {
		const { error } = this.state;
		return (
			<div className="LoginForm">
				<section className="LoginForm__main_section">
					<form
						id="login"
						className="LoginForm__form"
						onSubmit={this.handleSubmitJwtAuth}
					>
						<div role="alert">{error && <p className="red">{error}</p>}</div>
						<div className="LoginForm__section">
							<label htmlFor="email" className="LoginForm__label">
								Email:
							</label>
							<input
								type="text"
								className="LoginForm__input"
								name="email"
								required
							/>
						</div>
						<div className="LoginForm__section">
							<label htmlFor="password" className="LoginForm__label">
								Password:
							</label>
							<input
								type="password"
								name="password"
								className="LoginForm__input"
								required
							/>
						</div>
						<button className="LoginForm__submit" type="submit">
							Submit
						</button>
					</form>
				</section>
			</div>
		);
	}
}

export default LoginForm;
