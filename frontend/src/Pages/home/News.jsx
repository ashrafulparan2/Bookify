import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

import { Link } from "react-router-dom";
import news1 from "../../assets/news/news-1.png";
import news2 from "../../assets/news/news-2.png";
import news3 from "../../assets/news/news-3.png";
import news4 from "../../assets/news/news-4.png";
import news5 from "../../assets/news/news-5.png";

const news = [
  {
    id: 1,
    title: "বাংলাদেশে কি জনপ্রিয় হয়ে উঠছে অডিওবুক?",
    description:
      "বর্তমানে সবার হাতে হাতে মোবাইল ফোন থাকায় মানুষের হাতে ধৈর্য ধরে বই পড়ার সময় খুবই কম। এছাড়া, ডিজিটালাইজেশনের এই যুগে মনোযোগ ধরে রাখাটাও বেশ কঠিন...",
    image: news1,
    lnk: "https://www.bbc.com/bengali/articles/cgr9686j38do",
  },
  {
    id: 2,
    title: "বাংলাদেশে নিষিদ্ধ বা বাজেয়াপ্ত হয়েছিল যেসব আলোচিত বই",
    description:
      "বাংলাদেশে নানা সময় ইতিহাস বিকৃতি, ধর্মীয় অনুভূতিতে আঘাত, রাজনৈতিক বিতর্ক বা অশ্লীলতা - এমনসব কারণ দেখিয়ে কর্তৃপক্ষ কোনও কোনও বইকে নিষিদ্ধ বা মুদ্রণ, প্রকাশনা, বিতরণ ও বিক্রিতে নিষেধাজ্ঞা দিয়েছিল, কোনোটি আবার প্রকাশের পর করা হয়েছিল বাজেয়াপ্ত..",
    image: news2,
    lnk: "https://www.bbc.com/bengali/articles/cv2l3d4p3d1o",
  },
  {
    id: 3,
    title: "মিশরে দ্রব্যমূল্য আকাশছোঁয়া, বই বিক্রি হচ্ছে কিস্তিতে",
    description:
      "কিস্তিতে গাড়ি বা ওয়াশিং মেশিনের মতো দামী জিনিস কিনে অভ্যস্ত মিশরীয়রা এবার কিস্তিতে বই কিনতে পারবেন। আকাশচুম্বী মুদ্রাস্ফীতির কারণে এমন সিদ্ধান্ত নেয়া হয়েছে...",
    image: news3,
    lnk: "https://www.bbc.com/bengali/articles/ce53ekrdlrmo",
  },
  {
    id: 4,
    title: "পাবলিক লাইব্রেরি: বিমুখ পাঠক ফেরাতে কী করছে কর্তৃপক্ষ?",
    description:
      "বাংলাদেশে গত এক দশকে পাবলিক লাইব্রেরিতে পাঠকের সংখ্যা অনেক কমেছে। ঢাকাসহ দেশের ৬৪ জেলাতেই তরুণদের পাঠাভ্যাসে যেমন ঘাটতি দেখা যাচ্ছে, তেমনি অনেক জায়গাতেই পাড়া-মহল্লার পুরনো ছোট লাইব্রেরিগুলো বন্ধ হয়ে গেছে...",
    image: news4,
    lnk: "https://www.bbc.com/bengali/news-60729616",
  },
  {
    id: 5,
    title: "‘মাসুদ রানা’ ও ‘কুয়াশা’ সিরিজের ৩৬৮টি বইয়ের স্বত্বাধিকারী কে?",
    description:
      "বাংলাদেশের জনপ্রিয় পেপারব্যাক সিরিজ 'মাসুদ রানা'র ২৬০টি ও 'কুয়াশা'র ৫০টি বইয়ের লেখক হিসেবে শেখ আবদুল হাকিমের পক্ষে কপিরাইট অফিসের দেয়া সিদ্ধান্তের বিরুদ্ধে সেবা প্রকাশনীর প্রধান কাজী আনোয়ার হোসেনের করা রিট খারিজ করে দিয়েছে হাইকোর্ট...",
    image: news5,
    lnk: "https://www.bbc.com/bengali/news-59637878",
  },
];

const News = () => {
  return (
    <div className="py-2">
      <h2 className="text-3xl font-semibold mb-6">News </h2>

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
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {news.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-12">
              {/* content */}
              <div className="py-4">
                <a href={item.lnk} target="_blank" rel="noopener noreferrer">
                  <h3 className="text-lg font-medium hover:text-blue-500 mb-4">
                    {item.title}
                  </h3>
                </a>
                <div className="w-12 h-[4px] bg-primary mb-5"></div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>

              <div className="flex-shrink-0">
                <img
                  src={item.image}
                  alt=""
                  className="w-[120px] h-[180px] object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default News;
