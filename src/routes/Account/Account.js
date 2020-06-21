import React, { Component } from "react";
import { Link } from "react-router-dom";

class Account extends Component {
	render() {
		return (
			<div>
				<Link to="/my-books">My books</Link>
				<Link to="/new">Create a new book</Link>
			</div>
		);
	}
}

export default Account;
