/******************************************************************************
 *  The Book component manages the individual book on the shelf
 *
 *  Input:
 *    book          Object    Represents a single book from the books array
 *    updateBook    Function  The function that manages updating book details
 *
 *  Output:
 *    properly rendered html
 *
 *  Future Enhancements:
 *
 *****************************************************************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShelfPicker from './ShelfPicker';


class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired,
  }

  /****************************************************************************
   *  setAuthors transforms the authors array from the book object into a
   *  comma-delimited string so that all authors are displayed on the bookshelf
   ***************************************************************************/

  setAuthors () {

    let authorList = '';
    let book = this.props.book;
    if (book.hasOwnProperty('authors')) {
      book.authors.forEach (author => {
        authorList += author += ', ';
      });}
    return authorList.slice(0, -2);
  }

  render() {

    let bookAuthors = this.setAuthors ();
    return (
      <li key={this.props.book.id}>
        <div className="book">
          <div className="book-top">

            { /* Use class default for books that don't have a cover.
                 Else, use the supplied book cover image */

              this.props.book.hasOwnProperty('imageLinks')?
                (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.smallThumbnail})`}}> </div>) :
                (<div className="book-cover" style={{ width: 128, height: 193}}></div>)
            }

            { /* Render the shelf picker for this book */}

            <ShelfPicker
              book = {this.props.book}
              updateBook = {this.props.updateBook} />
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{bookAuthors}</div>
        </div>
      </li>
    );}
}

export default Book;
