import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "../routes/LandingPage/LandingPage";
import Nav from "../components/Nav/Nav";
import BooksList from "../routes/BooksList/BooksList";
import NewBook from "../routes/NewBook/NewBook";
import Account from "../routes/Account/Account";
import BookDisplay from "../routes/BookDisplay/BookDisplay";
import UnprintedContext from "../context/UnprintedContext";
import CreatedBooksList from "../routes/CreatedBookList/CreatedBookList";
import EditBook from "../routes/EditBook/EditBook";
import AddSection from "../routes/AddSection/AddSection";
import bookSeed from "../seeds/book_seeds.json";
import "./App.css";

class App extends Component {
	static contextType = UnprintedContext;

	state = {
		library: [],
		getCurrentBook: (book_id) => {
			return this.state.library.find((book) => book.id === parseInt(book_id));
		},
		addSection: (newSection, book_id) => {
			const current = this.state.getCurrentBook(book_id);
			this.state.library[current.id].content.push(newSection);
		},
		addImageData: (imageData) => {
			this.setState({
				image_data: imageData,
			});
		},
	};

	componentDidMount() {
		this.setState({
			library: bookSeed,
		});
	}
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<Nav />
				</header>
				<UnprintedContext.Provider value={this.state}>
					<Switch>
						<Route exact path={"/"} component={LandingPage} />
						<Route path={"/book-list"} component={BooksList} />
						<Route path={"/new"} component={NewBook} />
						<Route path={"/account"} component={Account} />
						<Route path={"/book/:book_id"} component={BookDisplay} />
						<Route path={"/my-books"} component={CreatedBooksList} />
						<Route path={"/edit/:book_id/:section"} component={EditBook} />
						<Route path={"/:book_id/add-section"} component={AddSection} />
					</Switch>
				</UnprintedContext.Provider>
			</div>
		);
	}
}

export default App;
