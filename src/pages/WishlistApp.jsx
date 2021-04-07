import { Component } from 'react'

import bookService from '../services/book.service.js'

import Wishlist from '../cmps/Wishlist.jsx'
import BookDetails from '../cmps/BookDetails.jsx'

export default class WishlistApp extends Component {

  state = {
    books: null,
    book: null
  }

  wishlisted = () => {
    return this.state.books?.filter((book) => book.wishlisted)
  }
  async componentDidMount() {
    const books = await this.loadBooks()
    const book = await bookService.getBookByTitle(books[0].title)
    this.setState({ book })
    this.props.history.push('/' + books[0].title)
  }
  async componentDidUpdate(prevProps, prevState) {
    const currTitle = this.props.match.params.title
    if (prevProps.match.params.title !== currTitle) {
      const book = await bookService.getBookByTitle(currTitle)
      this.setState({ book })
    }
  }

  loadBooks = async () => {
    const books = await bookService.getBooks()
    this.setState({ books })
    return books
  }
  selectBook = (book) => {
    this.props.history.push('/' + book.title)
    this.setState({ book })
  }
  toggleWished = (book) => {
    book.wishlisted = !book.wishlisted

    //Updates books in state
    var books = this.state.books.slice()
    var idx = books.findIndex(savedBook => savedBook.title === book.title)
    if (idx >= 0) {
      if (!book.wishlisted) {
        books.splice(idx, 1)
        this.setState({ books })
      }
    } else {
      console.log('couldn\'t find book', book, 'in books', books)
      books.unshift(book)
      this.setState({ books })
    }

    if (this.state.book.title === book.title) this.setState({ book })
  }
  render() {
    const { books, book } = this.state
    const wishlisted = this.wishlisted()
    return (
      books &&
      <section className="wishlist-app">
        <BookDetails book={book} toggleWished={this.toggleWished}></BookDetails>
        <section className="wishlist">
          <h1>Wishlist :</h1>
          <Wishlist selectItem={this.selectBook} deleteItem={this.toggleWished} className='book-preview' selected={book}>{wishlisted}</Wishlist>
        </section>
      </section>
    )
  }
}