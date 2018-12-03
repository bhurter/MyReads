/******************************************************************************
 *  The AddBook component manages the search functionality and allows the
 *  user to add new books to their bookcase using the ShelfPicker component.
 *
 *  Props:
 *    none
 *
 *  State:
 *    myBooks         array of book objects currently in My Reads bookcase
 *    newBooks        array of book objects returned from the search
 *    searchQuery     contains the user-input search criteria
 *
 *  Output:
 *    properly rendered html
 *
 *****************************************************************************/
import React, {Component} from 'react';
import {search, update, getAll} from './BooksAPI';
import { Link } from 'react-router-dom';
import Book from './Book';
import sortBy from 'sort-by';

class AddBook extends Component {

  state = {
    myBooks: [],
    newBooks: [],
    searchQuery: '',
  }

  componentDidMount() {

    // retrieve all of my books using getAll from BooksAPI, then set the state for the books
    // will use this to set shelf if search returns books that are already in the bookcase
    getAll().then((myBooks) => {
      this.setState({ myBooks });
    });
  }

  /*===========================================================================
    = UpdateQuery processes the user input and manages the search
    ==========================================================================*/

  updateQuery = (searchQuery) => {

    this.setState({searchQuery});

    /*
      If search query is not empty, search for books.
      If search returns data, then update state of newBooks.
      If search does not return any data OR if query is empty, then set newBooks to empty array
    */

    searchQuery ?
      search(searchQuery).then((newBooks) =>
      {
        if (newBooks.length >= 0) {
          newBooks.sort(sortBy('title', 'authors'));
          this.setState({newBooks});
        } else {
          this.setState({newBooks: []});
        }
      }) :  this.setState({ newBooks: []
      });

  }

  /*===========================================================================
   = updateBookShelf processes the user selection of the bookshelf and updates
   = the books database to persist the shelf
   ==========================================================================*/

  updateBookShelf = (id, shelf) => {

    let books = this.state.newBooks;

    // find the index of the book whose shelf changed

    let bookIndex = books.findIndex(book => book.id === id);

    // update the Shelf in the object and set the state

    books[bookIndex].shelf = shelf;
    update(books[bookIndex], shelf);
    this.setState({
      books
    });
  }

  /*===========================================================================
   = onShelf checks to see if a book is already on a shelf in the bookcase and
   = sets the shelf appropriately
   ==========================================================================*/
  onShelf = (book) => {
    let myBooks = this.state.myBooks;

    // check to see if this book is already in the BookCase

    let bookIndex = myBooks.findIndex (myBook => myBook.id === book.id);

    // if it is on the bookcase, get the shelf.  Else, set shelf to 'none'

    bookIndex >= 0 ? book.shelf = myBooks[bookIndex].shelf : book.shelf = 'none';

    return book;
  }
  render() {
    return (
      <div className = "search-books" >
        <div className = "search-books-bar" >
          <Link className = "close-search" to = "/" > Close < /Link>
          <div className = "search-books-input-wrapper" >
            < input
              type = "text"
              placeholder = "Search by title or author"
              value = {this.state.searchQuery}
              onChange = {(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>

        { /* only display if there are results */ }
        { this.state.newBooks.length !== 0 && (
          <div className = "search-books-results" >
            <ol className = "books-grid">
              {
                this.state.newBooks
                  .map(book => (
                    <Book key = {book.id}
                      book = {this.onShelf(book)}
                      updateBook = {this.updateBookShelf}
                    />))
              }
            </ol>
          </div>
        )}
      </div>
    );
  }
}

export default AddBook;
