# Timespace

[Live Link](https://unprinted-client.vercel.app/)

## API Endpoints:

- ### /books

  - GET all books. Returns all books with no content for displaying in library.
  - POST requires authentication. Posts new book to database.
  - /owned/:user GET requires auth. Returns book with content that user owns.
  - /created/:user GET requires auth. Returns book with content that user has created.
  - /:book_id DELETE, PATCH and POST a book. Requires auth.

- ### /auth

  - /auth/login POST Given correct login creds, will create JWT and return the created token.

- ### /users

  - POST given that the email has not been taken, will create user.

- ### /stripe
- POST creates a stripe session for the checkout.
- /webhook POST listens for events to redirect when checkout is complete.
- /secret POST creates a stripe session for user to create an account.

## Summary

Unprinted is a crowdsourced, early access book library that gives the reader content more frequently than a traditional publisher. By doing this, the author can release only a chapter of the book at a time, and the reader does not have to wait roughly a year between publishings. The reader is able to view each book, and if interested in buying one can purchase and then begin reading it in the app.

## Screenshots

<img src="https://github.com/izaacAbrams/timespaces-app/blob/master/src/images/LandingPage.PNG" alt="Login Page" width="500"/>

The landing page, where you can demo creating a new appointment, or sign up.

<img src="https://github.com/izaacAbrams/timespaces-app/blob/master/src/images/LoginPage.PNG" alt="Login Page" width="500"/>

<img src="https://github.com/izaacAbrams/timespaces-app/blob/master/src/images/Appointments.PNG" alt="Login Page" width="500"/>

An example of a schedule with multiple appointments for the day.

<img src="https://github.com/izaacAbrams/timespaces-app/blob/master/src/images/Schedules.PNG" alt="Login Page" width="500"/>

An example of a users view with multiple schedules.

## Tech Used

React, Redux/Router, Momentjs, JWT, node.js, Express, PostgreSQL, Javascript ES6, HTML, CSS
