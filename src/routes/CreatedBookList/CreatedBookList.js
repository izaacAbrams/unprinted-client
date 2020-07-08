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
			<>
				<h1 className="CreatedBookList__header">Your Books</h1>
				<div className="CreatedBookList">
					{this.context.createdLibrary.map((book) => (
						<div key={book.title + book.id} className="CreatedBookList__book">
							<BooksItem book={book} />
							<div className="CreatedBookList__chapters">
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
								<Link
									to={`/${book.id}/add-chapter`}
									className="CreatedBookList__links"
								>
									Add Chapter
								</Link>
								<button
									className="CreatedBookList__delete"
									onClick={(e) => this.handleDelete(e, book.id)}
								>
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			</>
		) : (
			<>
				<h1 className="CreatedBookList__header">Nothing here!</h1>
				<p className="CreatedBookList__p">
					Create a new book to find content here.
				</p>
			</>
		);
		return bookList;
	}
}

export default CreatedBookList;
