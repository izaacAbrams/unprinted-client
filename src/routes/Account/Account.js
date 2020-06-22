import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Account.css";

class Account extends Component {
	render() {
		return (
			<div className="Account">
				<Link to="/my-books">My books</Link>
				<Link to="/new">Create a new book</Link>
			</div>
		);
	}
}

export default Account;
