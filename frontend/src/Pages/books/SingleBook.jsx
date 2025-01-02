import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import ReactStars from "react-stars"; // Import react-stars
import { getImgUrl } from "../../utils/getImgUrl";
import { useDispatch } from "react-redux";
import { showAddToCartPopup } from "../../redux/features/cart/cartSlice";
import { useFetchBookByIdQuery } from "../../redux/features/books/booksApi";

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);

  const dispatch = useDispatch();
  const [isHoveredCart, setIsHoveredCart] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [reviews, setReviews] = useState([]); // Store reviews

  // Calculate Average Rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((total, review) => total + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  const handleAddToCart = (product) => {
    dispatch(showAddToCartPopup(product));
  };

  const handleSubmitReview = () => {
    if (reviewText.trim() && starRating > 0 && customerName.trim()) {
      setReviews([
        ...reviews,
        { name: customerName, text: reviewText, rating: starRating },
      ]);
      setReviewText("");
      setCustomerName("");
      setStarRating(0);
    } else {
      alert("Please provide a name, a comment, and a star rating.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error happened while loading book info</div>;

  return (
    <div className="max-w-6xl mx-auto shadow-xl rounded-2xl p-10 flex flex-col lg:flex-row bg-white">
      {/* Left side (Book Cover and Add to Cart Button) */}
      <div className="flex flex-col items-center lg:w-1/3 mb-6 lg:mb-0">
        <img
          src={`${getImgUrl(book.coverImage)}`}
          alt={book.title}
          className="w-full h-[400px] lg:h-[500px] object-cover rounded-lg shadow-lg mb-4"
        />
        <button
          onClick={() => handleAddToCart(book)}
          className="flex items-center justify-center bg-primary lg:min-w-32 sm:px-2 sm:py-1 md:px-4 md:py-2 lg:px-12 lg:py-4"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            minWidth: "200px",
            width: "auto",
            height: "40px",
            color: "#000",
            backgroundImage: "linear-gradient(45deg, #fbd84b, #f0a30a)",
            fontSize: "18px",
            borderRadius: isHoveredCart ? "30px" : "30px 0px 30px 30px",
            transition: "all 0.3s ease-in-out",
            border: "none",
            cursor: "pointer",
            transform: isHoveredCart ? "scale(1.1)" : "scale(1)",
          }}
          onMouseEnter={() => setIsHoveredCart(true)}
          onMouseLeave={() => setIsHoveredCart(false)}
        >
          <FiShoppingCart
            style={{
              color: "#000",
              fontSize: "20px",
              marginRight: "8px",
            }}
          />
          <span>Add to Cart</span>
        </button>
      </div>

      {/* Right side (Book Description) */}
      <div className="lg:w-2/3 lg:pl-8 flex flex-col justify-center items-start text-left">
        <h1 className="text-3xl font-bold mb-6">{book.title}</h1>
        <p className="text-gray-700 mb-2">
          <strong>Author:</strong> {book.author || "admin"}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Published:</strong>{" "}
          {new Date(book?.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-4 capitalize">
          <strong>Category:</strong> {book?.category}
        </p>
        <p className="text-gray-700 mb-4 text-justify">
          <strong>Description:</strong> {book.description}
        </p>

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
      </div>
    </div>
  );
};

export default SingleBook;
