import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "../routes/LandingPage/LandingPage";
import Nav from "../components/Nav/Nav";
import BooksList from "../routes/BooksList/BooksList";
import NewBook from "../routes/NewBook/NewBook";
import Account from "../routes/Account/Account";
import BookDisplay from "../routes/BookDisplay/BookDisplay";
import UnprintedContext from "../context/UnprintedContext";
import seedBooks from "../seeds/book_seeds.json";
import "./App.css";

class App extends Component {
	static contextType = UnprintedContext;

	state = {
		library: [],
	};

	componentDidMount() {
		this.setState({
			library: seedBooks,
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
					</Switch>
				</UnprintedContext.Provider>
			</div>
		);
	}
}

export default App;
