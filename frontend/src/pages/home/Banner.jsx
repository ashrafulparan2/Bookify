import React from 'react'

import bannerImg from "../../assets/banner1.jpg"

const Banner = () => {
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


            <button 
  style={{
    backgroundColor: "#007bff", 
    color: "white", 
    border: "none", 
    padding: "10px 20px", 
    borderRadius: "5px", 
    cursor: "pointer"
  }}
 >
  Buy now
</button>
        </div>

       
    </div>
  )
}

export default Banner