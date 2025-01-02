import React, { useEffect, useState } from "react";
import BookCard from "../books/BookCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const categories = [
  "Choose a genre",
  "ইতিহাস ও ঐতিহ্য",
  "উপন্যাস",
  "গণিত, বিজ্ঞান ও প্রযুক্তি",
  "ছড়া, কবিতা ও আবৃত্তি",
  "থ্রিলার",
  "ধর্মীয়",
  "প্রবন্ধ",
];

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

  const { data: books = [] } = useFetchAllBooksQuery();

  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter(
          (book) => book.category === selectedCategory.toLowerCase()
        );

  return (
    <div className="pt-3 pb-6" style={{ paddingTop: "70px"}}>
      <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>
      {/* category filtering */}
      <div className="mb-8 flex items-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="
                        border 
                        border-gray-300 
                        rounded-full 
                        px-6 
                        py-3 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-blue-500 
                        text-gray-700 
                        text-lg 
                        font-medium 
                        shadow-md 
                        transition-all 
                        duration-300 
                        hover:shadow-lg 
                        bg-gradient-to-r 
                        from-gray-100 
                        to-gray-200 
                        focus:bg-gradient-to-r 
                        focus:from-[#1d3557] 
                        focus:to-[#457b9d] 
                        focus:text-white"
        >
          {categories.map((category, index) => (
            <option key={index} value={category} className="text-gray-600">
              {category}
            </option>
          ))}
        </select>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {filteredBooks.length > 0 &&
          filteredBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default TopSellers;
