import React, { useState } from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useParams } from "react-router-dom"

import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { showAddToCartPopup } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';

const SingleBook = () => {
    const {id} = useParams();
    const {data: book, isLoading, isError} = useFetchBookByIdQuery(id);

    const dispatch =  useDispatch();
    const [isHoveredCart, setIsHoveredCart] = useState(false);

    const handleAddToCart = (product) => {
        dispatch(showAddToCartPopup(product))
    }

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error happened while loading book info</div>

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
                    minWidth: "200px", // Minimum width for the button
                    width: "auto", // Allow width to adjust based on content
                    height: "40px", // Set height for consistency
                    color: "#000", // Changed font color to black
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
                        color: "#000", // Keep icon color black
                        fontSize: "20px", // Fixed icon size
                        marginRight: "8px",
                    }}
                />
                <span>Add to Cart</span>
            </button>
        </div>

        {/* Right side (Book Description) */}
        <div className="lg:w-2/3 lg:pl-8 flex flex-col justify-center items-start text-left">
            <h1 className="text-3xl font-bold mb-6">{book.title}</h1>
            <p className="text-gray-700 mb-2"><strong>Author:</strong> {book.author || 'admin'}</p>
            <p className="text-gray-700 mb-4">
                <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-4 capitalize">
                <strong>Category:</strong> {book?.category}
            </p>
            <p className="text-gray-700 mb-4 text-justify">
                <strong>Description:</strong> {book.description}
            </p>
        </div>
    </div>
  )
}

export default SingleBook;
