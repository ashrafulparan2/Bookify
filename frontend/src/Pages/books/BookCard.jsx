import React, { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showAddToCartPopup } from "../../redux/features/cart/cartSlice";
import { useAuth } from "../../context/AuthContext";

const API_BASE_URL = "http://localhost:5000"; // Replace with your back-end server URL

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // Initial state for the heart
  const { currentUser } = useAuth(); // Get current user from context

  // Fetch wishlist when the component mounts
  useEffect(() => {
    const fetchWishlist = async () => {
      if (currentUser) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/api/wishlist/${currentUser.email}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch wishlist");
          }
          const wishlist = await response.json();

          // Check if the book is in the wishlist
          const isBookInWishlist = wishlist.productIds.includes(book._id);
          setIsLiked(isBookInWishlist); // Set the heart based on wishlist
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      }
    };

    fetchWishlist();
  }, [currentUser, book._id]); // Fetch wishlist when user or book changes

  const handleAddToCart = (product) => {
    dispatch(showAddToCartPopup(product));
  };

  const toggleWishlist = async () => {
    if (!currentUser) {
      console.log("User not logged in");
      return;
    }

    setIsLiked(!isLiked); // Optimistic update

    try {
      const endpoint = isLiked
        ? `${API_BASE_URL}/api/wishlist/remove`
        : `${API_BASE_URL}/api/wishlist/add`;

      const payload = isLiked
        ? { email: currentUser.email, productId: book._id }
        : { email: currentUser.email, productIds: [book._id] };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isLiked ? "remove" : "add"} to wishlist`);
      }

      const data = await response.json();
      console.log("Wishlist updated:", data);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      setIsLiked(!isLiked); // Revert optimistic update on error
    }
  };

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4"
      style={{
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#fff",
        transition: "box-shadow 0.3s ease-in-out",
        margin: "16px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="sm:h-72 sm:w-48 flex-shrink-0 border rounded-md overflow-hidden"
        style={{ width: "150px", height: "225px" }}
      >
        <Link to={`/books/${book._id}`}>
          <img
            src={`${getImgUrl(book?.coverImage)}`}
            alt="Book Cover"
            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-all duration-200"
          />
        </Link>
      </div>
      <div className="flex flex-col justify-between flex-grow relative">
        <Link to={`/books/${book._id}`}>
          <h3
            className="text-xl font-semibold hover:text-blue-600 mb-2"
            style={{ minHeight: "60px" }}
          >
            {book?.title}
          </h3>
        </Link>

        {/* Heart Button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2"
          style={{
            fontSize: "24px",
            color: isLiked ? "red" : "gray",
            background: "none",
            border: "none",
            cursor: "pointer",
            transition: "color 0.3s ease",
          }}
        >
          {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>

        <p
          className="text-gray-600 mb-5 line-clamp-3"
          style={{
            lineHeight: "1.5",
            maxHeight: "4.5rem",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: "3",
          }}
        >
          {book?.description}
        </p>

        <p className="font-medium mb-5">
          TK. {book?.newPrice}{" "}
          <span className="line-through font-normal ml-2">
            TK. {book?.oldPrice}
          </span>
        </p>

        <button
          onClick={() => handleAddToCart(book)}
          className="flex items-center justify-center gap-2"
          style={{
            minWidth: "150px",
            color: "#fff",
            backgroundImage: "linear-gradient(45deg, #fbd84b, #f0a30a)",
            borderRadius: "30px",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <FiShoppingCart style={{ color: "#000" }} />
          <span style={{ color: "#000", fontWeight: "600" }}>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default BookCard;
