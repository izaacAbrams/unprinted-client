import React, { Component } from "react";
import "./BooksItem.css";

class BooksItem extends Component {
	render() {
		const bookTitle =
			this.props.book.title.length > 24 ? (
				<p className="BooksItem__title">
					{this.props.book.title.split("").slice(0, 22).join("")}...
				</p>
			) : (
				<p className="BooksItem__title">{this.props.book.title}</p>
			);
		return (
			<div className="BooksItem">
				<img
					src={this.props.book.cover_img}
					alt="Cover Art"
					className="BooksItem__cover"
				/>
				<div className="BooksItem__title_container">{bookTitle}</div>
			</div>
		);
	}
}

export default BooksItem;
