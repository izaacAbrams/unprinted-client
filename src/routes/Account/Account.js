import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookApiService from "../../services/book-api-services";
import TokenService from "../../services/token-service";
import config from "../../config";
import UnprintedContext from "../../context/UnprintedContext";
import "./Account.css";

class Account extends Component {
	static contextType = UnprintedContext;

	componentDidMount() {
		//if user is already set up with stripe account then they can create a new book
		BookApiService.hasStripeConnection(
			TokenService.readJwtToken().user_id
		).then((res) => this.context.updateStripeConnected(res.connected));
	}
	render() {
		return (
			<div className="Account">
				<Link to="/my-books" className="Account__link">
					My books
				</Link>

				{this.context.stripeConnected ? (
					<>
						<a href={config.STRIPE_ENDPOINT} className="Account__link">
							Manage Stripe
						</a>
						<Link to="/new" className="Account__link">
							Create a new book
						</Link>
					</>
				) : (
					<>
						<a href={config.STRIPE_ENDPOINT} className="Account__link">
							Connect with Stripe
						</a>
						<p className="Account__link disabled">
							Connect with Stripe to create a new book.
						</p>
					</>
				)}
			</div>
		);
	}
}

export default Account;
