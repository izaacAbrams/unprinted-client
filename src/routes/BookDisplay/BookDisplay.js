import React, { Component } from "react";
import { Link } from "react-router-dom";
import UnprintedContext from "../../context/UnprintedContext";
import "./BookDisplay.css";

class BookDisplay extends Component {
	static contextType = UnprintedContext;

	render() {
		const current = this.context.getCurrentBook(
			this.props.match.params.book_id
		);
		const current_book = this.context.getCurrentBook(
			this.props.match.params.book_id
		) ? (
			<div className="BookDisplay__book">
				<img
					src={current.cover_img}
					className="BookDisplay__img"
					alt={`Cover for ${current.title}`}
				/>
				<h1>{current.title}</h1>
				<h2>{current.author}</h2>
				<p>{current.summary}</p>
				{/* price for when backend is made to facilitate payments */}
				{/* <p>${current.price}</p> */}
				<Link to={`/read/${current.id}`}>Read</Link>
			</div>
		) : (
			<></>
		);
		return <div className="BookDisplay">{current_book}</div>;
	}
}

export default BookDisplay;
