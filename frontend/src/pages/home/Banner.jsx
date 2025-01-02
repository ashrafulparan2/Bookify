import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import bannerImg1 from "../../assets/banner1.jpg";
import bannerImg2 from "../../assets/banner2.png";
import bannerImg3 from "../../assets/banner3.png";
import { Link } from "react-router-dom";

const Banner = () => {
  const [isHovered, setIsHovered] = useState(false);

  const imageStyle = {
    width: "100%", // Ensures the image takes the full container width
    maxWidth: "600px", // Sets a maximum width
    height: "400px", // Ensures consistent height
    objectFit: "cover", // Maintains aspect ratio while filling the space
    margin: "0 auto", // Centers the image
  };
  const animationStyle = {
    animation: "fadeIn 2s ease-in-out",
  };

  return (
    <div className="flex flex-col md:flex-row-reverse py-3 justify-between items-center gap-12">
      {/* Carousel */}
      <div className="md:w-1/2 w-full flex items-center md:justify-end">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          infiniteLoop
          interval={2000}
          stopOnHover
          showStatus={false}
        >
          <div>
            <img style={imageStyle} src={bannerImg1} alt="Banner 1" />
          </div>
          <div>
            <img style={imageStyle} src={bannerImg2} alt="Banner 2" />
          </div>
          <div>
            <img style={imageStyle} src={bannerImg3} alt="Banner 3" />
          </div>
        </Carousel>
      </div>

      {/* Text Section */}
      <div className="md:w-1/2 w-full">
        <h2
          style={animationStyle}
          className="md:text-3xl text-2xl font-medium mb-7 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
        >
          পাঠে নতুন দিগন্ত, বইয়ের সাথে বন্ধুত্ব
        </h2>
        <p style={animationStyle} className="mb-10">
          আপনার প্রিয় বই এখন এক ক্লিকে – সহজে বই কিনুন, নতুন বইয়ের কালেকশন
          আবিষ্কার করুন এবং সেরা অফারে আপনার বুকশেলফ সাজান আমাদের বুকস্টোর থেকে!
        </p>

        {/* Button with hover and transition effects */}
        <Link to={`/allbooks`}>
        <button
          style={{
            display: "inline-block",
            textDecoration: "none",
            padding: "14px 56px",
            color: "#fff",
            backgroundImage: "linear-gradient(45deg, #1d3557, #457b9d)",
            fontSize: "19px",
            borderRadius: isHovered ? "30px" : "30px 0px 30px 30px",
            transition: "all 0.3s ease-in-out",
            border: "none",
            cursor: "pointer",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          কিনুন
        </button>
        </Link>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Banner;
