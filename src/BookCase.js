/*****************************************************************************
*
* BookCase manages the MyReads Bookcase.
*
* Props:
*   Shelves     the shelves to display in the bookcase.
*
* State:
*   books       the array of book objects that are placed on the Shelves
*
* Output:
*   Properly rendered html for the bookcase / main page
*****************************************************************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import {getAll} from './BooksAPI';
import Book from './Book';

class BookCase extends Component {

  // shelves identifies the bookshelves to display

  static propTypes = {
    shelves: PropTypes.array.isRequired,
    myBooks: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  }

  componentDidMount() {

    // retrieve all of my books using getAll from BooksAPI, then set the state for the books
    getAll().then((myBooks) => {
      if (myBooks.length >= 0) {
        myBooks.sort(sortBy('title', 'authors'));
        this.setState({myBooks: myBooks});
      } else {
        this.setState({myBooks: []});
      }
    });
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
              {this.props.myBooks

              /* filter the books for the current bookshelf */

                .filter ((book) => {return book.shelf === shelf.tag;})

              /* now map the books and add them to the shelf */

                .map(book => (
                  <Book key={book.id}
                    shelves={this.props.shelves}
                    book={book}
                    myBooks={this.props.myBooks}
                    updateBookShelf = {this.props.updateBookShelf}
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
