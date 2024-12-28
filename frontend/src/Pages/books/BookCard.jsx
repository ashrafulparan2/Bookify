import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { showAddToCartPopup } from "../../redux/features/cart/cartSlice";

const BookCard = ({ book }) => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);

    const handleAddToCart = (product) => {
        // Call the popup function and pass the product
        dispatch(showAddToCartPopup(product));
    };

    return (
        <div className="rounded-lg transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
                <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
                    <Link to={`/books/${book._id}`}>
                        <img
                            src={`${getImgUrl(book?.coverImage)}`}
                            alt=""
                            className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                        />
                    </Link>
                </div>

                <div className="flex flex-col justify-between">
                    <Link to={`/books/${book._id}`}>
                        <h3
                            className="text-xl font-semibold hover:text-blue-600 mb-2"
                            style={{ minHeight: "60px" }} // Fixed height for title
                        >
                            {book?.title}
                        </h3>
                    </Link>

                    <p
                        className="text-gray-600 mb-5"
                        style={{
                            minHeight: "60px", // Fixed height for description
                            overflow: "hidden", // To truncate overflowing text
                            textOverflow: "ellipsis", // Adds "..." if text overflows
                        }}
                    >
                        {book?.description.length > 80
                            ? `${book.description.slice(0, 80)}...`
                            : book?.description}
                    </p>

                    <p className="font-medium mb-5">
                        ${book?.newPrice}{" "}
                        <span className="line-through font-normal ml-2">
                            ${book?.oldPrice}
                        </span>
                    </p>

                    <button
                        onClick={() => handleAddToCart(book)}
                        className="flex items-center justify-center gap-2"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textDecoration: "none",
                            minWidth: "150px", // Minimum width for the button
                            width: "auto", // Allow width to adjust based on content
                            height: "40px", // Set height for consistency
                            color: "#fff",
                            backgroundImage: "linear-gradient(45deg, #fbd84b, #f0a30a)", // Yellowish gradient
                            fontSize: "18px", // Text size
                            borderRadius: isHovered ? "30px" : "30px 0px 30px 30px", // Conditional border radius
                            transition: "all 0.3s ease-in-out", // Smooth hover transition
                            border: "none", // No borders
                            cursor: "pointer", // Clickable pointer
                            transform: isHovered ? "scale(1.1)" : "scale(1)", // Slight zoom on hover
                        }}
                        onMouseEnter={() => setIsHovered(true)} // Start hover effect
                        onMouseLeave={() => setIsHovered(false)} // End hover effect
                    >
                        <FiShoppingCart
                            style={{
                                color: "#000", // Black icon color
                                fontSize: "20px", // Icon size
                            }}
                        />
                        <span
                            style={{
                                color: "#000", // Black text color
                                fontWeight: "600", // Bold text
                                fontSize: "16px", // Text size
                            }}
                        >
                            Add to Cart
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
