import config from "../config";
import TokenService from "./token-service";

const BookApiService = {
	getStripe() {
		return fetch(`${config.STRIPE_ENDPOINT}`, {
			method: "GET",
		}).then((res) => console.log(res.code));
	},
	getSession(book) {
		const body = JSON.stringify(book);
		console.log(body);
		return fetch(`${config.API_ENDPOINT}/stripe/secret`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: body,
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	getLibrary() {
		return fetch(`${config.API_ENDPOINT}/books`).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	getOwnedLibrary() {
		return fetch(
			`${config.API_ENDPOINT}/books/owned/${
				TokenService.readJwtToken().user_id
			}`,
			{
				method: "GET",
				headers: {
					authorization: `Bearer ${TokenService.getAuthToken()}`,
				},
			}
		).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	getCreatedLibrary() {
		return fetch(
			`${config.API_ENDPOINT}/books/created/${
				TokenService.readJwtToken().user_id
			}`
		).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	postBook(book) {
		return fetch(`${config.API_ENDPOINT}/books`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(book),
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	updateBook(book) {
		return fetch(`${config.API_ENDPOINT}/books/${book.id}`, {
			method: "PATCH",
			headers: {
				authorization: `Bearer ${TokenService.getAuthToken()}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(book),
		});
	},
	removeBook(bookId) {
		return fetch(`${config.API_ENDPOINT}/books/${bookId}`, {
			method: "DELETE",
			headers: {
				authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
		});
	},
};

export default BookApiService;
