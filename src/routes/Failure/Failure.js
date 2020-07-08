import React, { Component } from "react";
import "./Failure.css";

class Failure extends Component {
	render() {
		return (
			<div className="Failure">
				<h1>Something went wrong!</h1>
				<p>Please try again!</p>
			</div>
		);
	}
}

export default Failure;
