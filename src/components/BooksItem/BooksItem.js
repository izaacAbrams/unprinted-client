import React, { Component } from "react";
import "./BooksItem.css";

class BooksItem extends Component {
	render() {
		const bookTitle =
			this.props.book.title.length > 24 ? (
				<p>{this.props.book.title.split("").slice(0, 22).join("")}...</p>
			) : (
				<p>{this.props.book.title}</p>
			);
		console.log(this.props.book.title.split("").slice(0, 24).join(""));
		return (
			<div className="BooksItem">
				<img
					src={this.props.book.cover_img}
					alt="Cover Art"
					className="BooksItem__cover"
				/>
				{bookTitle}
			</div>
		);
	}
}

export default BooksItem;
