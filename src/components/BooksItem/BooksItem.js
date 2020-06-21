import React, { Component } from "react";
import "./BooksItem.css";

class BooksItem extends Component {
	render() {
		return (
			<div className="BooksItem">
				<img
					src={this.props.book.cover_img}
					alt="Cover Art"
					className="BooksItem__cover"
				/>
				<h1>{this.props.book.title}</h1>
			</div>
		);
	}
}

export default BooksItem;
