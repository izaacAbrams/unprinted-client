import React, { Component } from "react";
import { Link } from "react-router-dom";
import Checkout from "../Checkout/Checkout";
import UnprintedContext from "../../context/UnprintedContext";
import "./BookDisplay.css";

class BookDisplay extends Component {
	static contextType = UnprintedContext;

	render() {
		const current = this.context.getCurrentBook(
			this.props.match.params.book_id
		);
		const isOwned =
			!!this.context.ownedLibrary && !!current
				? !!this.context.ownedLibrary.find((book) => book.id === current.id)
				: false;
		const isCreated =
			!!this.context.createdLibrary && !!current
				? !!this.context.createdLibrary.find((book) => book.id === current.id)
				: false;
		const current_book = this.context.getCurrentBook(
			this.props.match.params.book_id
		) ? (
			<div className="BookDisplay__book">
				<img
					src={current.cover_img}
					className="BookDisplay__img"
					alt={`Cover for ${current.title}`}
				/>
				<div className="BookDisplay__info">
					<h1>{current.title}</h1>
					<h2>{current.author}</h2>
					<p>{current.summary}</p>
					{isCreated || isOwned ? (
						<Link to={`/read/${current.id}`}>Read</Link>
					) : (
						<Checkout
							current={this.props.match.params.book_id}
							price={current.price}
						/>
					)}
				</div>
			</div>
		) : (
			<></>
		);

		return <div className="BookDisplay">{current_book}</div>;
	}
}

export default BookDisplay;
