import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard"; // Assuming BookCard is in the same folder
import { useAuth } from "../../context/AuthContext"; // Assuming useAuth provides current user

export const Wishlist = () => {
  const { currentUser } = useAuth(); // Get current user from context
  const [books, setBooks] = useState([]); // All available books
  const [wishlistBooks, setWishlistBooks] = useState([]); // Books in the wishlist
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const booksPerPage = 30;

  // Fetch books and wishlist
  useEffect(() => {
    const fetchBooksAndWishlist = async () => {
      try {
        // Fetch all books
        const booksResponse = await axios.get(
          `http://localhost:5000/api/books`
        );
        setBooks(booksResponse.data);

        // Fetch the user's wishlist if the user is logged in
        if (currentUser) {
          const wishlistResponse = await axios.get(
            `http://localhost:5000/api/wishlist/${currentUser.email}`
          );
          const wishlist = wishlistResponse.data.productIds; // Assuming wishlist contains an array of productIds

          // Filter books that are in the user's wishlist
          const wishlistBooks = booksResponse.data.filter((book) =>
            wishlist.includes(book._id)
          );
          setWishlistBooks(wishlistBooks);
          setTotalPages(Math.ceil(wishlistBooks.length / booksPerPage));
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to load books or wishlist.");
        setLoading(false);
      }
    };

    fetchBooksAndWishlist();
  }, [currentUser]); // Re-fetch when user changes

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>{error}</div>;

  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = wishlistBooks.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-1 bg-blue-500 text-white text-sm rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-1 bg-blue-500 text-white text-sm rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
      <div className="text-center mt-2 text-sm">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Wishlist;
