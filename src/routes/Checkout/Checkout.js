import React, { Component } from "react";
import { loadStripe } from "@stripe/stripe-js";
import BookApiService from "../../services/book-api-services";
import UnprintedContext from "../../context/UnprintedContext";
import TokenService from "../../services/token-service";
import config from "../../config";
import "./Checkout.css";

const stripePromise = loadStripe(config.STRIPE_PROMISE);

class Checkout extends Component {
	static contextType = UnprintedContext;

	state = {
		error: null,
	};

	handleClick = async (event) => {
		event.preventDefault();
		const currentBook = this.context.library.filter(
			(book) => book.id === parseInt(this.props.current)
		)[0];
		const request = {
			title: currentBook.title,
			user_id: currentBook.created_by,
			id: currentBook.id,
		};
		const sessionId = await BookApiService.getSession(request);

		const stripe = await stripePromise;
		await stripe
			.redirectToCheckout({
				sessionId,
			})
			.then((err) => {
				if (err) {
					this.setState({
						error: err,
					});
				}
			});
	};
	render() {
		const error = this.state.error ? (
			<p className="error">{this.state.error}</p>
		) : (
			<></>
		);
		const loginMessage = !TokenService.hasAuthToken() ? (
			<p>Please sign up or log in to purchase</p>
		) : (
			<></>
		);
		return (
			<form className="Checkout" onSubmit={this.handleSubmit}>
				{error}
				<button
					role="link"
					disabled={!TokenService.hasAuthToken()}
					onClick={this.handleClick}
				>
					${this.props.price}
				</button>
				{loginMessage}
			</form>
		);
	}
}

export default Checkout;
