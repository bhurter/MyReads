/******************************************************************************
 *
 * My Reads application
 *
 * Author:  Beth Hurter
 * Date:    December 2, 2018
 * Udacity Front End Developer Nanodegree project
 *
 *  Requirements: Create a bookshelf app that allows the user to:
 *    1. Search for and select books to be added to the BookCase
 *    2. Categorize books as "read, currently reading, or want to read"
 *    3. Place books on appropriate bookshelf
 *    4. Move books between shelves
 *    5. Remove books from the bookcase
 *
 *  Future Enhancements:
 *    1.  Refactor ShelfPicker so that it accepts state rather than being
 *        hard-coded
 *    2.  Add use case for when there are no books in the entire BookCase
 *    3.  Add message on AddBook page when the search returns zero results
 *    4.  Add message on AddBook page to indicate the number of books found
 *    5.  Add spinner while bookcase is loading
 *    6.  Add spinner while search is loading results
 *    7.  Optimize search engine - consider not searching until 2-3 characters
*         have been added to the search query
 *****************************************************************************/
import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import BookCase from './BookCase';
import AddBook from './AddBook';
import './App.css';


class App extends React.Component {

  /*  Set the state for the shelves */

  state = {
    shelves: [
      {id: 1, name: 'Books I am currently reading', tag: 'currentlyReading'},
      {id: 2, name: 'Books I want to read', tag: 'wantToRead'},
      {id: 3, name: 'Books I have finished reading', tag: 'read'},
    ]
  };

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>My Reads</h1>
          </div>

          { /*Set up the route for the main page:  BookCase */ }

          <Route exact path="/"  render={() => (
            <div>
              <BookCase
                shelves={this.state.shelves}
              />
              <Link className = "open-search"to="/search">Add a book</Link>
            </div>
          )}/>
          { /*Set up the route for the search page:  AddBook */}

          <Route path="/search" render={() => (

            <div className="list-books'title">
              <h1>Add To My Book List</h1>
              <div>
                <AddBook/>
              </div>
            </div>
          )}/>
        </div>
      </div>
    );
  }
}

export default App
