import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  // Keyframe animations
  const keyframes = `
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes glow {
      0%, 100% { filter: brightness(1); }
      50% { filter: brightness(1.5); }
    }
  `;

  return (
    <footer
      className="relative bg-gradient-to-tr from-gray-900 via-gray-800 to-black text-white py-16"
      style={{
        boxShadow: "0px -10px 20px rgba(0, 0, 0, 0.3)",
        overflow: "hidden",
      }}
    >
      {/* Inject animations */}
      <style>{keyframes}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-72 h-72 bg-purple-700 opacity-30 blur-2xl rounded-full -top-10 -left-10 animate-[glow_5s_infinite]"></div>
        <div className="absolute w-96 h-96 bg-pink-500 opacity-30 blur-3xl rounded-full -bottom-16 right-10 animate-[glow_5s_infinite]"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-8 lg:px-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section */}
          <div>
            <h1
              className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent inline-block"
              style={{
                animation: "float 3s ease-in-out infinite",
                letterSpacing: "2px",
              }}
            >
              Bookify
            </h1>
            <p className="text-gray-400 mt-4 mb-6 leading-relaxed">
              Your gateway to discovering books you'll love. Read, explore, and
              stay inspired with <strong>Bookify</strong>.
            </p>
            <ul className="flex flex-col lg:flex-row gap-4">
              <li>
                <a
                  href="#home"
                  className="text-gray-300 hover:text-pink-400 transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#explore"
                  className="text-gray-300 hover:text-pink-400 transition duration-300"
                >
                  Explore
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-pink-400 transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-pink-400 transition duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section: Newsletter */}
          <div className="text-center lg:text-right">
            <h3 className="text-xl font-semibold text-pink-400 mb-4">
              Subscribe to Bookify
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Stay updated with the latest book reviews, recommendations, and
              offers.
            </p>
            <div className="relative inline-flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-6 py-3 rounded-l-full bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button className="px-6 py-3 bg-pink-500 text-black rounded-r-full hover:bg-pink-600 transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-gray-700"></div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Privacy and Terms Links */}
          <ul className="flex gap-6">
            <li>
              <a
                href="#privacy"
                className="text-gray-400 hover:text-pink-400 transition duration-300"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#terms"
                className="text-gray-400 hover:text-pink-400 transition duration-300"
              >
                Terms of Service
              </a>
            </li>
          </ul>

          {/* Social Media Icons */}
          <div className="flex gap-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <FaFacebook
                size={28}
                className="text-gray-400 group-hover:text-pink-400 transition duration-300"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <FaTwitter
                size={28}
                className="text-gray-400 group-hover:text-pink-400 transition duration-300"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <FaInstagram
                size={28}
                className="text-gray-400 group-hover:text-pink-400 transition duration-300"
              />
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} <strong>Bookify</strong>. All rights
          reserved. 📚
        </p>
      </div>
    </footer>
  );
};

export default Footer;
