import React, { Component } from "react";
import { Link } from "react-router-dom";

class LandingPage extends Component {
	render() {
		return (
			<div>
				<h1>Unprinted</h1>
				<p>
					The crowdsourced ebook library. If you are looking for something to
					read, check out the library! If you are an author, create an account
					to start on a new book. Once the initial book information has been
					made, you can go to the 'my-books' page in your account to add new
					chapters. <br />
					<br /> As of now, there is no validation so to login enter any
					combination of email and password!
				</p>
				<Link to="/book-list">Check out the library</Link>
			</div>
		);
	}
}

export default LandingPage;
