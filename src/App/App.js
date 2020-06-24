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
import AddChapter from "../routes/AddChapter/AddChapter";
import BookReader from "../routes/BookReader/BookReader";
import LoginPage from "../routes/LoginPage/LoginPage";
import PrivateRoute from "../services/PrivateRoute";
import bookSeed from "../seeds/book_seeds.json";
import "./App.css";

class App extends Component {
	static contextType = UnprintedContext;

	state = {
		library: [],
		updateSignedIn: (status) => {
			this.setState({ isSignedIn: status });
		},
		getCurrentBook: (book_id) => {
			return this.state.library.find((book) => book.id.toString() === book_id);
		},
		addBook: (book) => {
			this.state.library.push(book);
		},
		addSection: (newSection, book_id) => {
			const current = this.state.getCurrentBook(book_id);
			const currentIndex = this.state.library.indexOf(current);
			this.state.library[currentIndex].content.push(newSection);
		},
		addImageData: (imageData) => {
			this.setState({
				image_data: imageData,
			});
		},
		editChapter: (book_id, chapter, newChapter) => {
			const current = this.state.getCurrentBook(book_id);
			const currentIndex = this.state.library.indexOf(current);
			const chapterIndex = this.state.library[currentIndex].content.findIndex(
				(content) => content.section === parseInt(chapter)
			);
			this.state.library[currentIndex].content.splice(chapterIndex, 1);
			this.state.library[currentIndex].content.push(newChapter);
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
						<Route path={"/login"} component={LoginPage} />
						<Route path={"/book-list"} component={BooksList} />
						<PrivateRoute path={"/new"} component={NewBook} />
						<PrivateRoute path={"/account"} component={Account} />
						<Route path={"/book/:book_id"} component={BookDisplay} />
						<PrivateRoute path={"/my-books"} component={CreatedBooksList} />
						<PrivateRoute
							path={"/edit/:book_id/:section"}
							component={EditBook}
						/>
						<PrivateRoute
							path={"/:book_id/add-chapter"}
							component={AddChapter}
						/>
						<PrivateRoute path={"/read/:book_id"} component={BookReader} />
					</Switch>
				</UnprintedContext.Provider>
			</div>
		);
	}
}

export default App;
