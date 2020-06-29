import React, { Component } from "react";
import { Link } from "react-router-dom";

class Success extends Component {
	render() {
		return (
			<div className="Success">
				<h1>Thank you for purchasing!</h1>
				<p>
					Return to the <Link to="/book-list">library</Link> to read your new
					book!
				</p>
			</div>
		);
	}
}

export default Success;
