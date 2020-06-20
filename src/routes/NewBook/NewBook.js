import React, { Component } from 'react'
import './NewBook.css'

class NewBook extends Component {

    handleSubmit(e) {
        e.preventDefault()
        console.log(document.getElementById('NewBook__cover_art').value)
    }
    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)} className="NewBook">
                <label htmlFor='NewBook__title'>Title:</label>
                <input type='text' id='NewBook__title' />
                <label htmlFor='NewBook__author'>Author:</label>
                <input type='text' id='NewBook__author' />
                <label htmlFor='NewBook__cover_art'>Cover Art:</label>
                <input type='file' id='NewBook__cover_art' />
                <button type='submit'>Submit</button>
            </form>
        )
    }
}

export default NewBook;