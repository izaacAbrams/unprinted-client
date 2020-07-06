import React, { Component } from "react";
import { Link } from "react-router-dom";
import BooksItem from "../../components/BooksItem/BooksItem";
import UnprintedContext from "../../context/UnprintedContext";
import "./BooksList.css";

class BooksList extends Component {
	static contextType = UnprintedContext;

	state = {
		searched: false,
	};

	handleSearch(e) {
		e.preventDefault();
		if (e.target.value !== "") {
			this.context.searchLibrary(e.target.value);
		} else {
			this.context.searchLibrary();
		}
		this.setState({ searched: true });
	}

	handleOwned(e) {
		e.preventDefault();
		this.context.addOwned();
	}

	handleClear(e) {
		e.preventDefault();
		this.setState({
			searched: false,
		});
		this.context.searchLibrary();
		document.querySelector(".searchbar").value = "";
	}

	render() {
		return (
			<>
				<div className="BooksList__search">
					<input
						type="text"
						placeholder="Search"
						id="BooksList__search"
						className="BooksList__input searchbar"
						onChange={(e) => this.handleSearch(e)}
					/>
					{this.context.ownedLibrary !== null ? (
						<button
							className="BooksList__button"
							onClick={(e) => this.handleOwned(e)}
						>
							My Books
						</button>
					) : (
						<></>
					)}
					<button
						className="BooksList__button"
						onClick={(e) => this.handleClear(e)}
					>
						Clear
					</button>
				</div>
				{this.state.searched && this.context.searchResults.length === 0 ? (
					<p className="BooksList__empty">Sorry, no books found.</p>
				) : (
					<></>
				)}
				<div className="BooksList">
					{this.context.searchResults.length === 0
						? this.context.library.map((book) => {
								return (
									<div key={book.title + book.id}>
										<Link to={`/book/${book.id}`}>
											<BooksItem book={book} />
										</Link>
									</div>
								);
						  })
						: this.context.searchResults.map((book) => {
								return (
									<Link key={book.title + book.id} to={`/book/${book.id}`}>
										<BooksItem book={book} />
									</Link>
								);
						  })}
				</div>
			</>
		);
	}
}

export default BooksList;
