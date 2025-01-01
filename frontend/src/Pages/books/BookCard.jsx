import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"; // Importing heart icons
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showAddToCartPopup } from "../../redux/features/cart/cartSlice";

const BookCard = ({ book }) => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false); // State to manage heart button

    const handleAddToCart = (product) => {
        // Call the popup function and pass the product
        dispatch(showAddToCartPopup(product));
    };

    const toggleHeart = () => {
        setIsLiked(!isLiked); // Toggle heart button state
    };

    return (
        <div
            className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4"
            style={{
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Uniform shadow
                backgroundColor: "#fff", // White background for contrast
                transition: "box-shadow 0.3s ease-in-out", // Smooth transition on hover
                margin: "16px", // Add spacing around the card
            }}
            onMouseEnter={() => setIsHovered(true)} // Enhance shadow on hover
            onMouseLeave={() => setIsHovered(false)} // Reset shadow on leave
        >
            <div
                className="sm:h-72 sm:w-48 flex-shrink-0 border rounded-md overflow-hidden"
                style={{ width: "150px", height: "225px" }} // Fixed size for the container
            >
                <Link to={`/books/${book._id}`}>
                    <img
                        src={`${getImgUrl(book?.coverImage)}`}
                        alt=""
                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-all duration-200"
                    />
                </Link>
            </div>
            <div className="flex flex-col justify-between flex-grow relative">
                <Link to={`/books/${book._id}`}>
                    <h3
                        className="text-xl font-semibold hover:text-blue-600 mb-2"
                        style={{ minHeight: "60px" }} // Fixed height for title
                    >
                        {book?.title}
                    </h3>
                </Link>

                {/* Heart Button */}
                <button
                    onClick={toggleHeart}
                    className="absolute top-2 right-2"
                    style={{
                        fontSize: "24px",
                        color: isLiked ? "red" : "gray", // Red for liked, gray otherwise
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
                        lineHeight: "1.5", // Consistent line height
                        maxHeight: "4.5rem", // Limit to 3 lines (line height × 3)
                        overflow: "hidden", // Hide overflow
                        display: "-webkit-box", // Support for WebKit browsers
                        WebkitBoxOrient: "vertical", // Vertical text orientation
                        WebkitLineClamp: "3", // Limit to 3 lines
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
    );
};

export default BookCard;
