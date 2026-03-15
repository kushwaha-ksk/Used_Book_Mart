import React, { useContext, useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
// import required modules
import { Autoplay } from 'swiper/modules';
import bg from '../assets/bg.png'
import bgHero from '../assets/bg-hero.png'
import {FaArrowRight} from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Item from './Item';
import { ShopContext } from '../context/ShopContext';



const Hero = () => {
    const {books} =useContext(ShopContext)
    const [popularBooks,setPopularBooks] = useState([])

    // Getting poplular books
    useEffect(()=>{
        const data = books.filter((item)=>item.popular)
        setPopularBooks(data.slice(0,6))
    },[books])

  return (
    <section className='max-padd-container flex gap-6 h--[634px] mt-16'>
        <div className='flex flex-[5] bg-cover bg-center bg-no-repeat rounded-2xl' style={{backgroundImage:`url(${bg})`}}>
            {/* left side */}
            <div className='max-padd-container flex flex-col h-full justify-center pt-8'>
                <h3 className='bold-24 text-secondary font-thin'>Explore Bolls you'll love</h3>
                <h1 className='h-1 max-w-[699px] !font-[800] leading-none '>Find you Next Book</h1>
                <h2 className='capitalize h2 tracking-wider'>Up to 40% off this Week</h2>
                <p className='max-w-xl pt-5'>Discover the joy of reading with our carefully curated collection of books. Whether you're searching for the latest bestsellers, timelss classics or </p>
                {/* Button */}
                <div className='flex mt-4'>
                   <Link to={"/shop"} className='bg-white text-xs font-medium  pl-6 rounded-full flexCenter gap-x-6 group'>Check our latest collection
                     <FaArrowRight className='bg-secondary text-white rounded-full h-11 w-11 p-3 m-[3px] border border-white group-hover:bg-primary group-hover::text-black transition-all duration-500 ' />
                   </Link>
                </div>
            </div>
        </div>
        {/* Right side */}
        <div className='hidden lg:block flex-[2] bg-primary rounded-2xl bg-center bg-cover bg-no-repeat' style={{backgroundImage:`url(${bgHero})`}}>
            <div className='max-w-sm pt-28'>
                {/* container */}
                <div>
                    {
                     <Swiper 
                     autoplay={{
                        delay:4000,
                        disableOnInteraction:false,
                        }}
                        breakpoints={{
                            355:{
                                slidesPerView:1,
                                spaceBetween:10,
                            },
                     }}
                     modules={[Autoplay]}
                     className='min-h-[399px] max-w-64'
                     >
                     {
                      popularBooks.map((book)=>(
                        <SwiperSlide key={book._id}>
                            <Item book={book} fromHero={true}/>
                        </SwiperSlide>
                      ))
                     }
                     </Swiper>
                    }
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero