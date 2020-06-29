import React, { Component } from "react";
import { Link } from "react-router-dom";
import UnprintedContext from "../../context/UnprintedContext";
import BooksItem from "../../components/BooksItem/BooksItem";
import "./CreatedBookList.css";

class CreatedBookList extends Component {
	static contextType = UnprintedContext;
	state = {
		library: [],
	};

	handleDelete(e, id) {
		e.preventDefault();
		this.context.removeBook(id);
	}

	render() {
		const bookList = this.context.createdLibrary ? (
			<div className="CreatedBookList">
				<h1>Your Books</h1>
				{this.context.createdLibrary.map((book) => (
					<div key={book.title + book.id} className="CreatedBookList__book">
						<BooksItem book={book} />
						{book.content ? (
							book.content
								.sort((a, b) => parseInt(a.section) - parseInt(b.section))
								.map((content) => (
									<Link
										key={book.id + content.section}
										to={`/edit/${book.id}/${content.section}`}
										className="CreatedBookList__links"
									>
										Chapter {content.section}
									</Link>
								))
						) : (
							<></>
						)}
						<Link to={`/${book.id}/add-chapter`}>Add Chapter</Link>
						<button onClick={(e) => this.handleDelete(e, book.id)}>
							Delete
						</button>
					</div>
				))}
			</div>
		) : (
			<></>
		);
		return bookList;
	}
}

export default CreatedBookList;
