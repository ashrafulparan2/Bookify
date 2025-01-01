import React, { useState } from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useParams } from "react-router-dom"
import { useDispatch } from 'react-redux'

import { getImgUrl } from '../../utils/getImgUrl'
import { showAddToCartPopup } from '../../redux/features/cart/cartSlice'

// IMPORT your queries
import {
  useFetchBookByIdQuery,
  useFetchAllBooksQuery
} from '../../redux/features/books/booksApi'

// Import your BookCard component
import BookCard from './BookCard'

const SingleBook = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const [isHoveredCart, setIsHoveredCart] = useState(false)

  // ---- RTK Query for this single book ----
  const {
    data: book,
    isLoading,
    isError
  } = useFetchBookByIdQuery(id)

  // ---- RTK Query for all books (to find related) ----
  const {
    data: allBooks,
    isLoading: isAllLoading,
    isError: isAllError
  } = useFetchAllBooksQuery()

  const handleAddToCart = (product) => {
    dispatch(showAddToCartPopup(product))
  }

  // Loading and error states for single book
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error happened while loading book info</div>
  if (!book) return <div>No book found!</div>

  // Filter out up to 5 related books in the same category (exclude this book)
  let relatedBooks = []
  if (allBooks && !isAllLoading && !isAllError) {
    relatedBooks = allBooks
      .filter((b) => b.category === book.category && b._id !== book._id)
      .slice(0, 5)
  }

  return (
    <div
      className="
        max-w-6xl mx-auto
        shadow-xl rounded-2xl p-10
        bg-white
        flex flex-col lg:flex-row items-start
        gap-8
      "
    >
      {/* LEFT: Single Book Details */}
      <div className="w-full lg:w-3/4 flex flex-col lg:flex-row gap-8">
        
        {/* Book Cover + Add to Cart */}
        <div className="flex flex-col items-center lg:w-1/3">
          <img
            src={getImgUrl(book.coverImage)}
            alt={book.title}
            className="w-full h-[400px] lg:h-[500px] object-cover rounded-lg shadow-lg mb-4"
          />
          <button
            onClick={() => handleAddToCart(book)}
            className="flex items-center justify-center bg-primary lg:min-w-32 sm:px-2 sm:py-1 md:px-4 md:py-2 lg:px-12 lg:py-4"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              minWidth: '200px',
              width: 'auto',
              height: '40px',
              color: '#000',
              backgroundImage: 'linear-gradient(45deg, #fbd84b, #f0a30a)',
              fontSize: '18px',
              borderRadius: isHoveredCart ? '30px' : '30px 0px 30px 30px',
              transition: 'all 0.3s ease-in-out',
              border: 'none',
              cursor: 'pointer',
              transform: isHoveredCart ? 'scale(1.1)' : 'scale(1)',
            }}
            onMouseEnter={() => setIsHoveredCart(true)}
            onMouseLeave={() => setIsHoveredCart(false)}
          >
            <FiShoppingCart
              style={{
                color: '#000',
                fontSize: '20px',
                marginRight: '8px',
              }}
            />
            <span>Add to Cart</span>
          </button>
        </div>

        {/* Book Info + Description */}
        <div className="lg:w-2/3 flex flex-col justify-center text-left space-y-4">
          {/* Title */}
          <h1 className="text-3xl font-bold">{book.title}</h1>

          {/* Trending Badge */}
          {book.trending && (
            <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm">
              Trending
            </span>
          )}

          {/* Author & Publish Date */}
          <p className="text-gray-700">
            <strong>Author:</strong> {book.author || 'admin'}
          </p>
          <p className="text-gray-700">
            <strong>Published:</strong>{' '}
            {new Date(book?.createdAt).toLocaleDateString()}
          </p>

          {/* Category */}
          <p className="text-gray-700 capitalize">
            <strong>Category:</strong> {book?.category}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2">
            {book.oldPrice && (
              <span className="text-gray-500 line-through">
                ৳ {book.oldPrice}
              </span>
            )}
            {book.newPrice && (
              <span className="text-xl font-bold text-green-600">
                ৳ {book.newPrice}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 text-justify">
            <strong>Description:</strong> {book.description}
          </p>
        </div>
      </div>

      {/* RIGHT: Related Books */}
      <div className="w-full lg:w-1/4">
        <h2 className="text-2xl font-bold mb-4">Related Books</h2>

        {/* If the "all books" query is still loading or errored */}
        {isAllLoading && <p>Loading related books...</p>}
        {isAllError && <p>Error loading related books!</p>}

        {/* Render the related books with some vertical spacing */}
        <div className="space-y-4">
          {relatedBooks.length > 0 ? (
            relatedBooks.map((relatedBook) => (
              <BookCard key={relatedBook._id} book={relatedBook} />
            ))
          ) : (
            <p className="text-gray-500">No related books found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default SingleBook
