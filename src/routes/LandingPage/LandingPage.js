import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

class LandingPage extends Component {
	render() {
		return (
			<div className="LandingPage">
				<h1 className="LandingPage__title">Unprinted</h1>
				<p className="LandingPage__p">
					The crowdsourced ebook library. If you are looking for something to
					read, check out the library! Without signing up/logging in you are
					able to view general information about the book, such as the cover
					image, summary, and price. In order to purchase a book and read it,
					you must first log in and then you will have the option to puchase the
					book.
					<br />
					<br />
					If you are an author, create an account to start on a new book. Once
					the initial book information has been made, you can go to the
					'my-books' page in your account to add new chapters.
				</p>
				<Link className="LandingPage__link" to="/book-list">
					Check out the library
				</Link>
			</div>
		);
	}
}

export default LandingPage;
