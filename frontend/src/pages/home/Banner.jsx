import React, { useState } from 'react';
import bannerImg from "../../assets/banner1.jpg";

const Banner = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
      {/* Image Section */}
      <div className='md:w-1/2 w-full flex items-center md:justify-end'>
        <img src={bannerImg} alt="Banner" />
      </div>

      {/* Text and Button Section */}
      <div className='md:w-1/2 w-full'>
        <h1 className='md:text-5xl text-2xl font-medium mb-7'>New Releases This Week</h1>
        <p className='mb-10'>
          It's time to update your reading list with some of the latest and greatest releases in
          the literary world. From heart-pumping thrillers to captivating memoirs, this week's new
          releases offer something for everyone.
        </p>

        {/* Button with hover and transition effects */}
        <button
          style={{
            display: "inline-block",
            textDecoration: "none",
            padding: "14px 56px", // Adjusted padding
            color: "#fff", // White text color
            backgroundImage: "linear-gradient(45deg, #1d3557, #457b9d)", // Navy blueish gradient
            fontSize: "19px", // Font size
            borderRadius: isHovered ? "30px" : "30px 0px 30px 30px", // Conditional border radius
            transition: "all 0.3s ease-in-out", // Smooth transition for hover effects
            border: "none", // No borders
            cursor: "pointer", // Pointer cursor on hover
            transform: isHovered ? "scale(1.1)" : "scale(1)", // Slight zoom on hover
          }}
          onMouseEnter={() => setIsHovered(true)} // Hover starts
          onMouseLeave={() => setIsHovered(false)} // Hover ends
        >
          Buy now
        </button>
      </div>
    </div>
  );
};

export default Banner;
