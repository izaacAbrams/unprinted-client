import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";
import logo from "../../images/logo.png";
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
				<Link className="Nav__account Nav__link" to="/account">
					Account
				</Link>
				<Link
					onClick={this.handleLogoutClick}
					to="/"
					className="Nav__logout Nav__link"
				>
					Logout
				</Link>
			</div>
		);
	}

	renderLogin() {
		return (
			<div className="Header__not-logged-in">
				<div className="Nav__section">
					<Link to="/signup" className="Nav__register Nav__link">
						Register
					</Link>

					<Link to="/login" className="Nav__login Nav__link">
						Log in
					</Link>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="Nav">
				<div className="Nav__logo">
					<Link to="/" className="Nav__link Nav__link_logo">
						<img src={logo} className="Nav__logo_img" alt="Unprinted Logo" />
						Unprinted
					</Link>
				</div>
				<Link to="/book-list" className="Nav__link">
					Library
				</Link>
				{TokenService.hasAuthToken() ? this.renderLogout() : this.renderLogin()}
			</div>
		);
	}
}

export default Nav;
