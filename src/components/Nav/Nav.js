import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";
import "./Nav.css";

class Nav extends Component {
	handleLogoutClick = () => {
		TokenService.clearAuthToken();
		TokenService.clearCallbackBeforeExpiry();
		IdleService.unRegisterIdleResets();
		this.forceUpdate();
	};

	renderLogout() {
		return (
			<div className="Header__logged-in">
				<Link className="Nav__account" to="/account">
					Account
				</Link>
				<Link onClick={this.handleLogoutClick} to="/" className="Nav__logout">
					Logout
				</Link>
			</div>
		);
	}

	renderLogin() {
		return (
			<div className="Header__not-logged-in">
				<div className="Nav__section">
					<Link to="/signup" className="Nav__register">
						Register
					</Link>

					<Link to="/login" className="Nav__login">
						Log in
					</Link>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="Nav">
				<Link to="/">unprinted</Link>
				<Link to="/book-list">Library</Link>
				{TokenService.hasAuthToken() ? this.renderLogout() : this.renderLogin()}
			</div>
		);
	}
}

export default Nav;
