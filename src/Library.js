import React , { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'

class Library extends Component {
  
  	state = {
      books: []
    }

	componentDidMount() {
      this.loadBooks()
    }

	// load all books in my library
	loadBooks = () => {
      BooksAPI.getAll().then( (books) => this.setState({ books })) 
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                <div>
                    <Bookshelf title="Currently Reading" category="currentlyReading" books={this.state.books} onMoveBook={this.loadBooks} />
                    <Bookshelf title="Want to Read" category="wantToRead" books={this.state.books} onMoveBook={this.loadBooks}/>
                    <Bookshelf title="Read" category="read" books={this.state.books} onMoveBook={this.loadBooks}/>
                </div>
                </div>
                <div className="open-search">
                <Link to="/search" >Add a book</Link>
                </div>
            </div>
        )
    }
}

export default Library