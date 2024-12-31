import React, { useState } from 'react';
import bannerImg from "../../assets/banner1.jpg";
import { Link } from 'react-router-dom';

const Banner = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
         <div className='md:w-1/2 w-full flex items-center md:justify-end'>
            <img src={bannerImg} alt="" />
        </div>
        
        <div className='md:w-1/2 w-full'>
        <h2 className="md:text-3xl text-2xl font-medium mb-7 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
    পাঠে নতুন দিগন্ত, বইয়ের সাথে বন্ধুত্ব
</h2>
<p className="mb-10">
    আপনার প্রিয় বই এখন এক ক্লিকে – সহজে বই কিনুন, নতুন বইয়ের কালেকশন আবিষ্কার করুন এবং সেরা অফারে আপনার বুকশেলফ সাজান আমাদের বুকস্টোর থেকে!
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
          <Link to={`/allbooks`}>
          কিনুন
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Banner;
