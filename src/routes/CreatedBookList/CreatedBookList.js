import React, { Component } from "react";
import { Link } from "react-router-dom";
import UnprintedContext from "../../context/UnprintedContext";
import BooksItem from "../../components/BooksItem/BooksItem";
import "./CreatedBookList.css";

class CreatedBookList extends Component {
	static contextType = UnprintedContext;

	render() {
		return (
			<div className="CreatedBookList">
				<h1>Your Books</h1>
				{this.context.library.map((book) => (
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
					</div>
				))}
			</div>
		);
	}
}

export default CreatedBookList;
