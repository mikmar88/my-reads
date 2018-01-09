import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired
    }

    render() {

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    { this.props.books && (
                        <ol className="books-grid">
                        { this.props.books
                            .filter((book) => book.shelf === this.props.category)
                            .map( (book) =>
                                <li key={book.id}>
                                    <Book book={book} onMoveBook={this.props.onMoveBook} />
                                </li>
                                ) 
                        }
                        </ol>
                    )}
                
                </div>
            </div>
        )
    }
}

export default Bookshelf