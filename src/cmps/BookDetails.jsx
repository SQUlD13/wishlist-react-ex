import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class BookDetails extends Component {
  getCheckboxClass = (book) => {
    var classStr = 'custom-checkbox'
    classStr += (book.wishlisted) ? ' active' : ''
    return classStr
  }
  onToggleWishlist = (ev, book) => {
    this.props.toggleWished(book)
    // ev.target.checked = !ev.target.checked
  }
  render() {
    const { book } = this.props
    return (
      book && <section className="book-details-wrapper">
        <Link className='link-prev fa fas' to={book.prev}>&#xf048; prev</Link>
        <section className="book-details">
          <header>
            <h1>{book.title}</h1>
            <label className={this.getCheckboxClass(book)}>
              <span className='fas check' >&#xf00c;</span>
              <input type="checkbox" checked={book.wishlisted} onChange={(ev) => { this.onToggleWishlist(ev, book) }} />
            </label>
          </header>
          <small>Written by <span>{book.author}</span></small>
          <main>
            <p>{book.description}</p>
            <p className='price'>Price <span>{book.price}$</span></p>
          </main>
        </section>
        <Link className='link-next fa fas' to={book.next}>&#xf051; next</Link>
      </section>
    )
  }
}