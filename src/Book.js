import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired
    }

    render() {

        return (
            
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url("'+this.props.book.imageLinks.thumbnail+'")' }}></div>
                <div className="book-shelf-changer">
                    <select onChange={this.handleSelect} value={this.props.book.shelf ? this.props.book.shelf : 'none'} >
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.authors}</div>
            </div>
        )
    }

    // handle the shelf change
    handleSelect = (e) => {
        this.move(e.target.value)
    }

	// update the book with the new shelf value
    move = (shelf) => {

        const operationAfterMove = this.props.onMoveBook

        BooksAPI.update(this.props.book, shelf)
        .then( () => {
            if (operationAfterMove)
              operationAfterMove()
                
        })
    }
}

export default Book