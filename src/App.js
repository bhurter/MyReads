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
import { Route, Link } from 'react-router-dom';
import BookCase from './BookCase';
import AddBook from './AddBook';
import {getAll, update} from './BooksAPI';
import sortBy from 'sort-by';
import './App.css';


class App extends React.Component {

  /*  Set the state for the shelves.  You can add new shelves or change the existing ones here*/

  state = {
    shelves: [
      {id: 1, name: 'Books I am currently reading', tag: 'currentlyReading', pickerText: 'Currently Reading'},
      {id: 2, name: 'Books I want to read', tag: 'wantToRead', pickerText: 'Want to Read'},
      {id: 3, name: 'Books I have finished reading', tag: 'read', pickerText: 'Read'}
    ],
    myBooks: []
  };


  componentDidMount() {

    // retrieve all of my books using getAll from BooksAPI, then set the state for the books
    getAll().then((myBooks) => {
      if (myBooks.length >= 0) {
        myBooks.sort(sortBy('title', 'authors'));
        this.setState({myBooks});
      } else {
        this.setState({myBooks: []});
      }
    });
  }

  /*===========================================================================
   *
   * updateBookShelf changes the shelf of a book in the bookcase.  It updates the
   * book in the database using update from BooksAPI, and also updates the
   * shelf in the books object array
   *
   * Inputs:
   *    id - the book id that is being moved
   *    shelf - the shelf the book is being moved to
   *
   * Steps:
   *  1. Find the index of the book that was moved
   *  2. Update the shelf locally
   *  3. Update the books database using update from BooksAPI
   *  4. Update the state
   *
   *=========================================================================*/

  updateBookShelf = (changedBook, newShelf, books) => {

    /* Locate the current book index in the books object array */

    let bookIndex = books.findIndex (book => book.id === changedBook.id);

    /*  If the book is already in the Book Case, then update the book.  Else,
        add the book to the Book Case*/
    changedBook.shelf = newShelf;
    bookIndex >= 0 ?
      (books[bookIndex] = changedBook) :
      (books.push(changedBook));

    /* Update the books database using the update function from BooksAPI */
    update (changedBook, newShelf);

    /* Call setState to update books */

    this.setState({ myBooks: books.sort(sortBy('title', 'authors')) });
  }

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
                myBooks = {this.state.myBooks}
                updateBookShelf = {this.updateBookShelf}
              />
              <Link className = "open-search"to="/search">Add a book</Link>
            </div>
          )}/>
          { /*Set up the route for the search page:  AddBook */}

          <Route path="/search" render={() => (
            <div className="list-books'title">
              <h1>Add To My Book List</h1>
              <div>
                <AddBook
                  shelves={this.state.shelves}
                  myBooks = {this.state.myBooks}
                  updateBookShelf = {this.updateBookShelf}
                />
              </div>
            </div>
          )}/>
        </div>
      </div>
    );
  }
}

export default App;
