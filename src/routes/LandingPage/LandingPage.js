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
					<br /> To demo the login, use the email leela@gmail.com and the
					password leelapassword. To demo purchasing a book, use the card number
					4242 4242 4242 4242 with any name/CVC/zip code.
				</p>
				<Link to="/book-list">Check out the library</Link>
			</div>
		);
	}
}

export default LandingPage;
