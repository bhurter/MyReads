/*****************************************************************************
*
* BookCase manages the MyReads Bookcase.
*
* Input:  Shelves - the shelves to display in the bookcase.
*****************************************************************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import {getAll, update} from './BooksAPI';
import sortBy from 'sort-by';

class BookCase extends Component {

  // shelves identifies the bookshelves to display

  static propTypes = {
    shelves: PropTypes.array.isRequired,
  }

  state = {
    books: []
  };


  componentDidMount() {

    // retrieve all of my books using getAll from BooksAPI, then set the state for the books
    getAll().then((books) => {
      books.sort(sortBy('title', 'authors'));
      this.setState({ books });
    });
  }


  /*************************************************************************
   * updateBook changes the shelf of a book in the bookcase.  It updates the
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
   *************************************************************************/

  updateBook = (id, shelf) => {

    let books = this.state.books;

    /* Locate the current book index in the books object array */

    let bookIndex = books.findIndex (book => book.id === id);

    /* Update the shelf */

    books[bookIndex].shelf = shelf;

    /* Update the books database useing the update function from BooksAPI */
    update (books[bookIndex], shelf);

    /* Call setState to update books */

    this.setState({ books });
  }

  /*  To set the view, first filter by shelf, then map each book to the
      Book component */

  render() {

    return (

      <div className='bookshelf'>

        {/* map each shelf */}

        {this.props.shelves.map(shelf => (
          <div key={shelf.name}>
            <h2  className="bookshelf-title" > {shelf.name} </h2>
            <ol className="books-grid">
              {this.state.books

              /* filter the books for the current bookshelf */

                .filter ((book) => {return book.shelf === shelf.tag;})

              /* now map the books and add them to the shelf */

                .map(book => (
                  <Book key={book.id}
                    book={book}
                    updateBook={this.updateBook}
                  />
                ))}
            </ol>
          </div>
        ))}
      </div>
    );
  }
}
export default BookCase;
