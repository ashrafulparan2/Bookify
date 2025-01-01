import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { FaSearch, FaHeart, FaUser, FaShoppingCart } from "react-icons/fa";
import avatarImg from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const navigation = [
  { name: "Dashboard", href: "/user-dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [isHoveredHeart, setIsHoveredHeart] = useState(false);
  const [isHoveredCart, setIsHoveredCart] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // Separate state for profile dropdown
  const [isSuggestionsDropdownOpen, setIsSuggestionsDropdownOpen] = useState(false); // Separate state for suggestions dropdown
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const { currentUser, logout } = useAuth();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const profileButtonRef = useRef(null);

  // Fetch all books once
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books");
        setAllBooks(response.data);
      } catch (error) {
        console.error("Error fetching all books", error);
      }
    };

    fetchAllBooks();
  }, []);

  // Filter books based on search query and limit to top 5 results
  const fetchSuggestions = (query) => {
    if (!query) {
      setSuggestions([]);
      setIsSuggestionsDropdownOpen(false);
      return;
    }

    const filteredSuggestions = allBooks
      .filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5);

    setSuggestions(filteredSuggestions);
    setIsSuggestionsDropdownOpen(filteredSuggestions.length > 0);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSuggestions(query);
  };

  const handleSuggestionClick = (bookId) => {
    navigate(`/books/${bookId}`);
    setIsSuggestionsDropdownOpen(false);
    setSearchQuery("");
  };

  const handleClickOutsideDropdown = (e) => {
    // Close the profile dropdown if the click is outside the profile button or dropdown
    if (
      dropdownRef.current && !dropdownRef.current.contains(e.target) &&
      profileButtonRef.current && !profileButtonRef.current.contains(e.target)
    ) {
      setIsProfileDropdownOpen(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsSuggestionsDropdownOpen(false);
    }
  };

  const handleLogOut = () => {
    logout();
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("click", handleClickOutsideDropdown);
    };
  }, []);

  const handleProfileDropdownToggle = () => {
    setIsProfileDropdownOpen((prevState) => !prevState);
    setIsSuggestionsDropdownOpen(false); // Close suggestions dropdown if profile is opened
  };

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-1">
          <Link to="/">
            <HiMiniBars3CenterLeft className="text-2xl" />
          </Link>

          {/* Search Bar */}
          <div
            className="relative flex-grow max-w-full sm:max-w-xs md:max-w-md"
            style={{
              minWidth: "110px",
            }}
          >
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search here"
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-[#EAEAEA] w-full py-1 px-8 rounded-md focus:outline-none text-sm sm:text-base"
            />

            {/* Dropdown Suggestions */}
            {isSuggestionsDropdownOpen && suggestions.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-md z-50"
              >
                <ul className="max-h-60 overflow-y-auto">
                  {suggestions.map((book) => (
                    <li
                      key={book._id}
                      onClick={() => handleSuggestionClick(book._id)} // Passing book ID
                      className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                    >
                      {book.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* ---- New Books Link ---- */}
        <div>
            <Link
              to="/allbooks"
              className="text-gray-700 font-semibold hover:text-gray-500 transition-colors"
            >
              Books
            </Link>
        </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-6 relative">
          {/* Cart Button */}
            <Link
              to="/cart"
            className="flex items-center justify-center bg-primary lg:min-w-32 sm:px-2 sm:py-1 md:px-4 md:py-2 lg:px-12 lg:py-4"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              minWidth: "85px",
              width: "auto",
              height: "40px",
              color: "#fff",
              backgroundImage: "linear-gradient(45deg, #fbd84b, #f0a30a)",
              fontSize: "14px",
              borderRadius: isHoveredCart ? "30px" : "30px 0px 30px 30px",
              transition: "all 0.3s ease-in-out",
              border: "none",
              cursor: "pointer",
              transform: isHoveredCart ? "scale(1.1)" : "scale(1)",
            }}
            onMouseEnter={() => setIsHoveredCart(true)}
            onMouseLeave={() => setIsHoveredCart(false)}
          >
            <FaShoppingCart
              style={{
                color: "#000",
                fontSize: "20px",
                marginRight: "8px",
              }}
            />
            <span
              style={{
                color: "#000",
                fontWeight: "600",
                fontSize: "20px",
              }}
            >
              {cartItems.length > 0 ? cartItems.length : 0}
            </span>
          </Link>

          {/* Heart Icon */}
          <Link
            to="/wishlist">
            <button
              onMouseEnter={() => setIsHoveredHeart(true)}
              onMouseLeave={() => setIsHoveredHeart(false)}
              className="p-2"
              style={{
                transition: "transform 0.3s ease-in-out",
                transform: isHoveredHeart ? "scale(1.2)" : "scale(1)",
              }}
            >
              <FaHeart className="text-xl text-gray-800" />
            </button>
          </Link>
          {/* User Profile Icon */}
          <div className="relative" style={{ minWidth: "40px" }}>
            {currentUser ? (
              <>
                <button
                  ref={profileButtonRef} // Add this reference to the button
                  onClick={handleProfileDropdownToggle}
                >
                  <img
                    src={avatarImg}
                    alt="User"
                    className="w-8 h-8 rounded-full ring-2 ring-blue-500"
                  />
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div
                    ref={dropdownRef} // Ensure this references the dropdown
                    className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-xl z-50"
                  >
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={handleLogOut}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <FaUser className="text-2xl" />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
