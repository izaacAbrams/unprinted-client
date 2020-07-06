import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
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
import AuthApiService from "../services/auth-api-service";
import BookApiService from "../services/book-api-services";
import TokenService from "../services/token-service";
import IdleService from "../services/idle-service";
import PrivateRoute from "../services/PrivateRoute";
import Success from "../routes/Success/Success";
import Failure from "../routes/Failure/Failure";
import NotFound from "../routes/NotFound/NotFound";
import loading from "../images/4V0b.gif";
import "./App.css";

class App extends Component {
	static contextType = UnprintedContext;

	state = {
		library: [],
		searchResults: [],
		createdLibrary: null,
		ownedLibrary: null,
		signedIn: null,
		stripeConnected: false,
		updateStripeConnected: (status) => {
			this.setState({ stripeConnected: status });
		},
		updateSignedIn: (status) => {
			if (status === true) {
				BookApiService.getOwnedLibrary().then((books) => {
					if (books.length > 0 || !books.message)
						this.setState({ ownedLibrary: books });
				});
				BookApiService.getCreatedLibrary().then((books) => {
					if (books.length > 0 || !books.message) {
						this.setState({ createdLibrary: books });
					}
				});
			}
			this.setState({ signedIn: true });
		},
		searchLibrary: (search) => {
			const searchResults = this.state.library.filter((book) => {
				if (search == null) {
					return book;
				} else if (book.title.toLowerCase().includes(search.toLowerCase())) {
					return book;
				}
				return null;
			});
			this.setState({
				searchResults,
			});
		},
		addOwned: () => {
			this.setState({
				searchResults: this.state.ownedLibrary,
			});
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
		getOwnedBook: (book_id) => {
			return this.state.ownedLibrary.find(
				(book) => book.id.toString() === book_id
			);
		},
		getCreatedBook: (book_id) => {
			return this.state.createdLibrary.find(
				(book) => book.id.toString() === book_id
			);
		},
		addBook: (book) => {
			if (!book.id) {
				book = {
					...book,
					id: uuidv4(),
				};
				this.state.library.push(book);
			} else {
				this.state.library.push(book);
			}
		},
		addSection: (newSection, book_id) => {
			const current = this.state.getCreatedBook(book_id);
			const currentIndex = this.state.createdLibrary.indexOf(current);
			this.state.createdLibrary[currentIndex].content.push(newSection);
			BookApiService.addChapter(current);
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
		IdleService.setIdleCallback(this.logoutFromIdle);
		if (TokenService.hasAuthToken()) {
			IdleService.regiserIdleTimerResets();

			TokenService.queueCallbackBeforeExpiry(() => {
				AuthApiService.postRefreshToken();
			});

			BookApiService.getOwnedLibrary().then((books) => {
				if (books.length > 0 || !books.message)
					this.setState({ ownedLibrary: books });
			});
			BookApiService.getCreatedLibrary().then((books) => {
				if (books.length > 0 || !books.message) {
					this.setState({ createdLibrary: books });
				}
			});
		}

		BookApiService.getLibrary().then((books) =>
			this.setState({ library: books })
		);
	}
	componentWillUnmount() {
		IdleService.unRegisterIdleResets();
		TokenService.clearCallbackBeforeExpiry();
	}

	logoutFromIdle = () => {
		TokenService.clearAuthToken();
		TokenService.clearCallbackBeforeExpiry();
		IdleService.unRegisterIdleResets();
		this.forceUpdate();
	};

	render() {
		const renderLibrary =
			this.state.library.length > 0 ? (
				<></>
			) : (
				<img src={loading} className="App__loading" alt="Loading" />
			);
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
						<Route path={"/failure"} component={Failure} />
						<PrivateRoute path={"/success"} component={Success} />
						<Route component={NotFound} />
					</Switch>
				</UnprintedContext.Provider>
			</div>
		);
	}
}

export default App;
