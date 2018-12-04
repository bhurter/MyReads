/******************************************************************************
 *  The ShelfPicker component manages the action trigger to allow the user to
 *  select which shelf the book belongs to
 *
 *  Props:
 *    book          Object    Represents a single book from the books array
 *    updateBook    Function  The function that manages updating book details
 *
 *  Output:
 *    properly rendered html for the shelf-picker
 *
 *  Future Enhancements:
 *
 *    1.  Update picker to use the app shelves state so that it is easy to add
 *        more shelves (allowing to sort by book genre, for example)
 *****************************************************************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ShelfPicker extends Component {

  static propTypes = {
    shelves: PropTypes.array.isRequired,
    book: PropTypes.object.isRequired,
    myBooks: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  }

  render() {

    return (
      <div className="book-shelf-changer">
        <select
          onChange={
            /* set up the select event */
            (event) => this.props.updateBookShelf (this.props.book, event.target.value, this.props.myBooks)}
          value = {
            /* default to the book shelf property.  If the book does not have
               a shelf, then set to None */

            this.props.book.shelf || 'none'}
        >
          {/* TODO:  Set based on shelves state, not hard coded */}
          <option value="move" disabled>Move to...</option>
          {this.props.shelves
            .map(shelf => (
              <option key = {shelf.id} value={shelf.tag}>{shelf.pickerText}</option>
            ))}
          <option value="none">None</option>
        </select>
      </div>
    );}
}

export default ShelfPicker;
