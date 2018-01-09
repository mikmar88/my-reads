import React , { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBook extends Component {

    state = {
        query: '',
        showingBooks: [],
      	shelvedBooks : [] 
    }

	componentDidMount() {
      this.loadShelvedBooks()
    }
	
	// handle the query change and return the books that match with the query value
    updateQuery = (e) => {
        const query = e.target.value.trim()
        
        this.searchBooks(query)
    }

	searchBooks = (query) => {
      if (query.length > 0 ) {
          BooksAPI.search(query).then(res => {
                const showingBooks = this.searchShelf(res)
              	this.setState({ query, showingBooks})    
          })
        }
    }

	// update the shelf value foreach book
	searchShelf = (books) => {
      	if (!books.error) {
          return books.map( (book) => {
            this.state.shelvedBooks.forEach( function(shelvedBook) {
              if (shelvedBook.id === book.id) { 
                book.shelf = shelvedBook.shelf
              }
            })

            return book
          })
        }
      	else
          return []
    }
	
	// load all books in my library
	loadShelvedBooks = () => {
      BooksAPI.getAll().then( (res) => {
        this.setState({ shelvedBooks: res}) 
      })
    }
	
	// refresh all the books in the component
	refresh = () => {
      const query = this.state.query
      this.loadShelvedBooks()
      
      this.searchBooks(query)
    }

    render() {
        return (
                <div className="search-books">
                    <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input type="text" onChange={this.updateQuery} placeholder="Search by title or author"/>

                    </div>
                    </div>
                    <div className="search-books-results">
                    <ol className="books-grid">
                        { 
                             this.state.showingBooks.map( (book) => 
                                <li key={book.id}><Book book={book} onMoveBook={this.refresh}/></li>
                             )
                        }
                    </ol>
                    </div>
                </div>
        )
    }
}

export default SearchBook