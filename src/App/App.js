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
import Checkout from "../routes/Checkout/Checkout";
import SignUpForm from "../routes/SignUpForm/SignUpForm";
import BookApiService from "../services/book-api-services";
import PrivateRoute from "../services/PrivateRoute";
import "./App.css";

class App extends Component {
	static contextType = UnprintedContext;

	state = {
		library: [],
		createdLibrary: [],
		ownedLibrary: [],
		updateSignedIn: (status) => {
			this.setState({ isSignedIn: status });
		},
		addCreatedLibrary: (books) => {
			this.setState({ createdLibrary: books });
		},
		addOwnedLibrary: (books) => {
			this.setState({ ownedLibrary: books });
		},
		getCurrentBook: (book_id) => {
			return this.state.library.find((book) => book.id.toString() === book_id);
		},
		getCreatedBook: (book_id) => {
			return this.state.createdLibrary.find(
				(book) => book.id.toString() === book_id
			);
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
			const current = this.state.getCreatedBook(book_id);
			const currentIndex = this.state.createdLibrary.indexOf(current);
			const chapterIndex = this.state.createdLibrary[
				currentIndex
			].content.findIndex((content) => content.section === parseInt(chapter));
			this.state.createdLibrary[currentIndex].content.splice(chapterIndex, 1);
			this.state.createdLibrary[currentIndex].content.push(newChapter);
			BookApiService.updateBook(current);
		},
		removeBook: (id) => {
			BookApiService.removeBook(id);
			this.setState({
				createdLibrary: this.state.createdLibrary.filter(
					(book) => book.id !== id
				),
			});
		},
	};

	componentDidMount() {
		BookApiService.getLibrary().then((books) =>
			this.setState({ library: books })
		);
		BookApiService.getOwnedLibrary().then((books) =>
			this.state.addOwnedLibrary(books)
		);
	}
	render() {
		const renderLibrary =
			this.state.library.length > 0 ? <></> : <p>Loading</p>;
		return (
			<div className="App">
				<header className="App-header">
					<Nav />
				</header>
				{renderLibrary}
				<UnprintedContext.Provider value={this.state}>
					<Switch>
						<Route exact path={"/"} component={LandingPage} />
						<Route path={"/login"} component={LoginPage} />
						<Route path={"/signup"} component={SignUpForm} />
						<PrivateRoute path={"/new"} component={NewBook} />
						<PrivateRoute path={"/account"} component={Account} />
						<Route path={"/book-list"} component={BooksList} />
						<Route path={"/book/:book_id"} component={BookDisplay} />
						<Route path={"/checkout/:book_id"} component={Checkout} />
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
