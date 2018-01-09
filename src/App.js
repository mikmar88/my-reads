import React from 'react'
import { Route } from 'react-router-dom'
import Library from './Library'
import SearchBook from './SearchBook'
import './App.css'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <Library />
          )
        } />
        
        <Route path="/search" render={({history}) => (
          <SearchBook
            onMoveBook={() => {
              this.afterMoveBook()
              history.push('/')
            }}  
          />
        )}
        />
        
      </div>
    )
  }
}

export default BooksApp
