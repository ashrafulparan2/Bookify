const express = require('express');
const Book = require('./book.model')
const { postABook,getAllBooks, getSingleBook, UpdateBook, deleteABook } = require('./book.controller')
const router = express.Router()


router.post("/create-book", postABook)

// get all books
router.get("/", getAllBooks)

// get single books
router.get("/:id", getSingleBook)

// get update book
router.put("/edit/:id", UpdateBook)

// delete a book
router.delete("/:id", deleteABook)

module.exports = router;