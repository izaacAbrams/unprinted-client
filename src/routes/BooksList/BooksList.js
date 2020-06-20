import React, {Component} from 'react'
import bookSeed from '../../seeds/book_seeds.json'
import BooksItem from '../../components/BooksItem/BooksItem'
import './BooksList.css'

class BooksList extends Component {
    render() {
        return (
            <div className="BooksList">
                {bookSeed.map(book => {
                    return <BooksItem key={book.title + book.author} book={book} />
                })}
            </div>
        )
    }
}

export default BooksList