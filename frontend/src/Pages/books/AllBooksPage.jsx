import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard"; // Assuming BookCard is in the same folder

export const AllBooksPage = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wishlist, setWishlist] = useState([]);  // State to manage wishlist

    const [filters, setFilters] = useState({
        priceRange: [0, 1000],
        category: "",
        trending: false,
        discount: false,
    });

    const [sortOption, setSortOption] = useState("");

    const booksPerPage = 30;

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books`);
                setBooks(response.data);
                setFilteredBooks(response.data);
                setTotalPages(Math.ceil(response.data.length / booksPerPage));
                setLoading(false);
            } catch (err) {
                setError("Failed to load books.");
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        let updatedBooks = [...books];

        // Filter by price range
        updatedBooks = updatedBooks.filter(
            (book) =>
                book.newPrice >= filters.priceRange[0] &&
                book.newPrice <= filters.priceRange[1]
        );

        // Filter by category
        if (filters.category) {
            updatedBooks = updatedBooks.filter(
                (book) => book.category === filters.category
            );
        }

        // Filter by trending
        if (filters.trending) {
            updatedBooks = updatedBooks.filter((book) => book.trending);
        }

        // Filter by discount
        if (filters.discount) {
            updatedBooks = updatedBooks.filter(
                (book) => book.oldPrice > book.newPrice
            );
        }

        // Sort books
        if (sortOption === "priceAsc") {
            updatedBooks.sort((a, b) => a.newPrice - b.newPrice);
        } else if (sortOption === "priceDesc") {
            updatedBooks.sort((a, b) => b.newPrice - a.newPrice);
        } else if (sortOption === "nameAsc") {
            updatedBooks.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === "nameDesc") {
            updatedBooks.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortOption === "dateAsc") {
            updatedBooks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (sortOption === "dateDesc") {
            updatedBooks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setFilteredBooks(updatedBooks);
        setTotalPages(Math.ceil(updatedBooks.length / booksPerPage));
    }, [filters, sortOption, books]);

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

    // Function to handle adding/removing books from the wishlist
    const toggleWishlist = (bookId) => {
        setWishlist((prevWishlist) => {
            if (prevWishlist.includes(bookId)) {
                return prevWishlist.filter(id => id !== bookId); // Remove from wishlist
            } else {
                return [...prevWishlist, bookId]; // Add to wishlist
            }
        });
    };

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFilters((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFilters((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    if (loading) return <div>Loading books...</div>;
    if (error) return <div>{error}</div>;

    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const currentBooks = filteredBooks.slice(startIndex, endIndex);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* <h1 className="text-2xl font-bold text-center mb-4">All Books</h1> */}

            {/* Condensed Filters */}
            <div className="mb-4 p-2 bg-white rounded-md shadow-sm flex flex-wrap gap-4 items-end">
                {/* Price Range */}
                <div className="flex flex-col min-w-[150px]">
                    <label className="text-sm font-semibold mb-1">Price Range</label>
                    <div className="text-xs flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span>৳{filters.priceRange[0]}</span>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                step="10"
                                value={filters.priceRange[0]}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        priceRange: [
                                            Number(e.target.value),
                                            prev.priceRange[1],
                                        ],
                                    }))
                                }
                                className="w-full"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span>৳{filters.priceRange[1]}</span>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                step="10"
                                value={filters.priceRange[1]}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        priceRange: [
                                            prev.priceRange[0],
                                            Number(e.target.value),
                                        ],
                                    }))
                                }
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Category */}
                <div className="flex flex-col min-w-[120px]">
                    <label className="text-sm font-semibold mb-1" htmlFor="category">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded p-1 text-sm"
                    >
                        <option value="">All</option>
                        <option value="ইতিহাস ও ঐতিহ্য">ইতিহাস ও ঐতিহ্য</option>
                        <option value="উপন্যাস">উপন্যাস</option>
                        <option value="গণিত, বিজ্ঞান ও প্রযুক্তি">গণিত, বিজ্ঞান ও প্রযুক্তি</option>
                        <option value="ছড়া, কবিতা ও আবৃত্তি">ছড়া, কবিতা ও আবৃত্তি</option>
                        <option value="থ্রিলার">থ্রিলার</option>
                        <option value="ধর্মীয়">ধর্মীয়</option>
                        <option value="প্রবন্ধ">প্রবন্ধ</option>
                    </select>
                </div>

                {/* Trending & Discount Checkboxes */}
                <div className="flex items-center gap-4">
                    <label className="flex items-center text-sm">
                        <input
                            type="checkbox"
                            name="trending"
                            onChange={handleFilterChange}
                            className="mr-1"
                        />
                        Trending
                    </label>
                    <label className="flex items-center text-sm">
                        <input
                            type="checkbox"
                            name="discount"
                            onChange={handleFilterChange}
                            className="mr-1"
                        />
                        Discount
                    </label>
                </div>

                {/* Sort By */}
                <div className="flex flex-col min-w-[110px]">
                    <label className="text-sm font-semibold mb-1" htmlFor="sortOption">
                        Sort By
                    </label>
                    <select
                        id="sortOption"
                        name="sortOption"
                        value={sortOption}
                        onChange={handleSortChange}
                        className="border border-gray-300 rounded p-1 text-sm"
                    >
                        <option value="">Select</option>
                        <option value="priceAsc">Price (Low to High)</option>
                        <option value="priceDesc">Price (High to Low)</option>
                        <option value="nameAsc">Name (A-Z)</option>
                        <option value="nameDesc">Name (Z-A)</option>
                        <option value="dateAsc">Date (Old to New)</option>
                        <option value="dateDesc">Date (New to Old)</option>
                    </select>
                </div>
            </div>

            {/* Books Grid */}
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

export default AllBooksPage;
