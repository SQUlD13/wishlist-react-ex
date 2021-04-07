import axios from 'axios'

const BOOKS_KEY = 'books'
var gBooks = require('../data/book.json');

mapBooks(gBooks)
gBooks = gBooks.map((book, idx) => {
    book.wishlisted = false;
    return book
})
gBooks[0].wishlisted = true
gBooks[1].wishlisted = true
gBooks[4].wishlisted = true

export default {
    getBooks,
    getBookByTitle,
}

getBooks()
function getBooks() {
    // var books = JSON.parse(localStorage.getItem(BOOKS_KEY))
    // if (!books) {
    //     // return axios.get(`http://s3.amazonaws.com/sundaysky-mock/books/noListOfBooks.json`)
    //     //     .then(res => {
    //     //         console.log('Service Got Res:', res.data);
    //     //         books = res.data;
    //     //         localStorage.setItem(BOOKS_KEY, JSON.stringify(books))
    //     //     })
    //     //     .catch(err => {
    //     //         console.log('Service got Error:cannot get books', err);
    //     //     })
    //     localStorage.setItem(BOOKS_KEY, JSON.stringify(gBooks))
    //     return Promise.resolve(gBooks)
    // } return Promise.resolve(books)
    return Promise.resolve(gBooks)
}

function getBookByTitle(title) {
    return Promise.resolve(gBooks.find(book => book.title === title))
}

function mapBooks(books) {
    return books.map((book, idx) => {
        book.prev = (idx > 0) ? gBooks[idx - 1].title : gBooks[gBooks.length - 1].title
        book.next = (idx < gBooks.length - 1) ? gBooks[idx + 1].title : gBooks[0].title
        return book
    })
}
