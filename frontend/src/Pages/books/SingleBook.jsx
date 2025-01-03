import React, { useState } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import ReactStars from 'react-stars'; // Import react-stars

import { showAddToCartPopup } from '../../redux/features/cart/cartSlice';
import { getImgUrl } from '../../utils/getImgUrl';

// Import queries and components
import {
    useFetchAllBooksQuery,
    useFetchBookByIdQuery
} from '../../redux/features/books/booksApi';
import BookCard from './BookCard';

const SingleBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [isHoveredCart, setIsHoveredCart] = useState(false);

  // RTK Query for single book
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);

  // RTK Query for all books to find related books
  const { data: allBooks, isLoading: isAllLoading, isError: isAllError } = useFetchAllBooksQuery();

  // Review state
  const [reviews, setReviews] = useState([]); // Store reviews
  const [reviewText, setReviewText] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [starRating, setStarRating] = useState(0);

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    dispatch(showAddToCartPopup(product));
  };

  // Handle Submit Review
  const handleSubmitReview = () => {
    if (reviewText.trim() && starRating > 0 && customerName.trim()) {
      setReviews([
        ...reviews,
        { name: customerName, text: reviewText, rating: starRating },
      ]);
      setReviewText('');
      setCustomerName('');
      setStarRating(0);
    } else {
      alert('Please provide a name, a comment, and a star rating.');
    }
  };

  // Loading and error states for single book
  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div className="text-center text-red-500">Error occurred while loading book info</div>;
  if (!book) return <div className="text-center text-gray-500">No book found!</div>;

  // Filter related books based on category and exclude the current book
  let relatedBooks = [];
  if (allBooks && !isAllLoading && !isAllError) {
    relatedBooks = allBooks
      .filter((b) => b.category === book.category && b._id !== book._id)
      .slice(0, 6);
  }

  // Calculate Average Rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((total, review) => total + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="max-w-screen-2xl mx-auto p-8 space-y-8 bg-white shadow-xl rounded-2xl">
      
      {/* Single Book Details Section */}
      <div className="lg:flex lg:gap-16 space-y-8 lg:space-y-0">
        {/* Left: Book Cover + Add to Cart */}
        <div className="lg:w-1/3 flex flex-col items-center">
          <img
            src={getImgUrl(book.coverImage)}
            alt={book.title}
            className="w-full h-[400px] lg:h-[500px] object-cover rounded-xl shadow-lg mb-6"
          />
          <button
            onClick={() => handleAddToCart(book)}
            className="flex items-center justify-center bg-primary text-white px-8 py-3 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
            style={{
              backgroundImage: 'linear-gradient(45deg, #fbd84b, #f0a30a)',
              color: "#000",
              fontWeight: "600"
            }}
            onMouseEnter={() => setIsHoveredCart(true)}
            onMouseLeave={() => setIsHoveredCart(false)}
          >
            <FiShoppingCart className="mr-3" style={{ fontSize: '20px' }} />
            <span>Add to Cart</span>
          </button>
        </div>

        {/* Right: Book Information and Description */}
        <div className="lg:w-2/3 flex flex-col justify-center space-y-6 text-left">
          <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>

          {/* Trending Badge */}
          {book.trending && (
            <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm">
              Trending
            </span>
          )}

          {/* Author & Publish Date */}
          <p className="text-gray-700"><strong>Author:</strong> {book.author || 'admin'}</p>
          <p className="text-gray-700"><strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}</p>

          {/* Category */}
          <p className="text-gray-700 capitalize"><strong>Category:</strong> {book?.category}</p>

          {/* Price */}
          <div className="flex items-center gap-2">
            {book.oldPrice && <span className="text-gray-500 line-through">৳ {book.oldPrice}</span>}
            {book.newPrice && <span className="text-xl font-bold text-green-600">৳ {book.newPrice}</span>}
          </div>

          {/* Description */}
          <p className="text-gray-700 text-justify"><strong>Description:</strong> {book.description}</p>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-8 w-full">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

        {/* Average Rating */}
        {reviews.length > 0 && (
          <div className="mb-6">
            <p className="text-lg font-semibold">
              Average Rating:{" "}
              <span className="text-yellow-500">{averageRating} / 5</span>
            </p>
            <ReactStars
              count={5}
              value={parseFloat(averageRating)}
              edit={false}
              size={24}
              color2={"#ffd700"}
            />
          </div>
        )}

        {/* Display Existing Reviews */}
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={index}
              className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm"
            >
              <p className="text-gray-800 font-semibold">
                {review.name}{" "}
                <span className="text-sm text-gray-500">(Rated: {review.rating}/5)</span>
              </p>
              <ReactStars
                count={5}
                value={review.rating}
                edit={false}
                size={20}
                color2={"#ffd700"}
              />
              <p className="mt-2 text-gray-800">{review.text}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        )}

        {/* Add Review Form */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Add Your Review</h3>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
            placeholder="Your Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <ReactStars
            count={5}
            value={starRating}
            onChange={(rating) => setStarRating(rating)}
            size={30}
            color2={"#ffd700"}
          />
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 mt-4"
            rows="4"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          <button
            onClick={handleSubmitReview}
            className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-lg hover:bg-blue-600"
          >
            Submit Review
          </button>
        </div>
      </div>

      {/* Related Books Section */}
      <div className="mt-8" style={{ paddingTop: "2rem" }}>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Books</h2>

        {/* Loading or Error States for Related Books */}
        {isAllLoading && <p className="text-center text-gray-500">Loading related books...</p>}
        {isAllError && <p className="text-center text-red-500">Error occurred while loading related books!</p>}

        {/* Related Books List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {relatedBooks.length > 0 ? (
            relatedBooks.map((relatedBook) => (
              <BookCard key={relatedBook._id} book={relatedBook} />
            ))
          ) : (
            <p className="text-center text-gray-500">No related books found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
