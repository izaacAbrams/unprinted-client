import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Account.css";

class Account extends Component {
	render() {
		return (
			<div className="Account">
				<Link to="/my-books">My books</Link>
				<Link to="/new">Create a new book</Link>
				<a href="https://dashboard.stripe.com/express/oauth/authorize?response_type=code&client_id=ca_HX1TTV36qY6VU77XZhSVltq7KUpI88UZ&scope=read_write">
					Connect with Stripe
				</a>
			</div>
		);
	}
}

export default Account;
