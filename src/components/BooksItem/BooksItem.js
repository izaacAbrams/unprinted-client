import React, {Component} from 'react' 
import { Link } from 'react-router-dom'
import './BooksItem.css'

class BooksItem extends Component {
    render() {
        return (
        <div className="BooksItem">
            <Link to={`/book/${this.props.book.id}`}>
            <img src={this.props.book.cover_img} alt="Cover Art" className="BooksItem__cover" />
            <h1>{this.props.book.title}</h1>
            </Link>
        </div>
        )
    }
}

export default BooksItem