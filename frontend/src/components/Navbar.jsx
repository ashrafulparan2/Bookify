import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { FaSearch, FaHeart, FaUser, FaShoppingCart } from "react-icons/fa";
import avatarImg from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/user-dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [isHoveredHeart, setIsHoveredHeart] = useState(false);
  const [isHoveredCart, setIsHoveredCart] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser, logout } = useAuth();

  const handleLogOut = () => {
    logout();
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
              className="bg-[#EAEAEA] w-full py-1 px-8 rounded-md focus:outline-none text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-6 relative">
          {/* Cart Button */}
          <Link
            to="/cart"
            className="flex items-center justify-center bg-primary lg:min-w-32 sm:px-2 sm:py-1 md:px-4 md:py-2 lg:px-12 lg:py-4" // Added responsive padding here
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              minWidth: "85px", // Minimum width for the button
              width: "auto", // Allow width to adjust based on content
              height: "40px", // Set height for consistency
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
                fontSize: "20px", // Fixed icon size
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

          {/* User Profile Icon */}
          <div className="relative"
          style={{
            minWidth: "40px",
          }}
          >
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt="User"
                    className="w-8 h-8 rounded-full ring-2 ring-blue-500"
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-xl z-50">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
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
