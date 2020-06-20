import React, { Component } from "react";
import UnprintedContext from "../../context/UnprintedContext";

class BookDisplay extends Component {
	static contextType = UnprintedContext;

	getCurrentBook() {
		return this.context.library.find(
			(book) => book.id === parseInt(this.props.match.params.book_id)
		);
	}
	render() {
		console.log(this.getCurrentBook());
		return (
			<div className="BookDisplay">
				<img
					src={this.getCurrentBook().cover_img}
					alt={`Cover for ${this.getCurrentBook().title}`}
				/>
			</div>
		);
	}
}

export default BookDisplay;
