import React, { Component } from "react";
import { Link } from "react-router-dom";
import BooksItem from "../../components/BooksItem/BooksItem";
import UnprintedContext from "../../context/UnprintedContext";
import "./BooksList.css";

class BooksList extends Component {
	static contextType = UnprintedContext;

	render() {
		return (
			<div className="BooksList">
				{this.context.library.map((book) => {
					return (
						<Link key={book.title + book.id} to={`/book/${book.id}`}>
							<BooksItem book={book} />
						</Link>
					);
				})}
			</div>
		);
	}
}

export default BooksList;
