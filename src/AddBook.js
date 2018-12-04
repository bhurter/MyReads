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
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import Book from './Book';
import {search} from './BooksAPI';

class AddBook extends Component {

  state = {
    newBooks: [],
    searchQuery: '',
  }

  static propTypes = {
    shelves: PropTypes.array.isRequired,
    myBooks: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired
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
   = onShelf checks to see if a book is already on a shelf in the bookcase and
   = sets the shelf appropriately
   ==========================================================================*/
  onShelf = (book) => {
    let myBooks = this.props.myBooks;

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
                      shelves = {this.props.shelves}
                      book = {this.onShelf(book)}
                      myBooks = {this.props.myBooks}
                      updateBookShelf = {this.props.updateBookShelf}
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
