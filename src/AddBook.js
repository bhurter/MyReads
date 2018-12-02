/******************************************************************************
 *  The AddBook component manages the search functionality and allows the
 *  user to add new books to their bookcase using the ShelfPicker component.
 *
 *  Props:
 *    none
 *
 *  State:
 *    newBooks        the array of book objects returned from the search
 *    searchQuery     contains the user-input search criteria
 *
 *  Output:
 *    properly rendered html
 *
 *****************************************************************************/
import React, {Component} from 'react';
import {search, update} from './BooksAPI';
import { Link } from 'react-router-dom';
import Book from './Book';
import sortBy from 'sort-by';

class AddBook extends Component {

  state = {
    newBooks: [],
    searchQuery: '',
  }

  updateQuery = (searchQuery) => {

    this.setState({searchQuery});

    searchQuery ?
      search(searchQuery).then((newBooks) =>
      {
        newBooks.sort(sortBy('title', 'authors'));
        newBooks.length ? this.setState({newBooks}) : this.setState({newBooks: []});
      }) :
      this.setState({ newBooks: []
      });

  }

  updateBook = (id, shelf) => {

    let books = this.state.newBooks;
    let bookIndex = books.findIndex(book => book.id === id);
    books[bookIndex].shelf = shelf;
    update(books[bookIndex], shelf);
    this.setState({
      books
    });
  }

  render() {
    return (
      <div className = "search-books" >
        <div className = "search-books-bar" >
          <Link className = "close-search" to = "/" > Close < /Link>
          <div className = "search-books-input-wrapper" >
            {
            /*  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.*/
            }
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
            <ol className = "books-grid" > {
              this.state.newBooks
                .map(book => ( <Book key = {book.id}
                  book = {book}
                  updateBook = {this.updateBook}/>))
            }
            </ol>
          </div>
        )}
      </div>
    );
  }
}

export default AddBook;
