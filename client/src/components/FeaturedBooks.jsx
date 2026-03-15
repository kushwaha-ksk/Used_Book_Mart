import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { TbShoppingBagPlus } from 'react-icons/tb'
import featuredBooksImg from "../assets/featured-books.png"

const FeaturedBooks = () => {
   const {books,currency,addToCart} = useContext(ShopContext)
   const book = books[21] //Get the 21 index book

  return (
    <section className='max-padd-container max-sm:bg-primary mt-10'>
      {/* CONTAINER */}
      <div className='sm:px-10 flex sm:bg-primary py-16 rounded-2xl'>
        {/* Left side */}
        <div className='flex-1'>
          <Title title1={"Featured"} title2={"Books"} titleStyles={"pb-8"} para={"Browse featured books carefully selected for quality, imaginatin, storytelling, and unique characters"}/>
          {/* BOOK CARD */}
          <div className='flex gap-3 sm:gap-8 sm:bg-white sm:p-4 rounded-2xl'>
             <div className='min-w-[160]'>
                <img src={book?.image} alt={book?.name} className='h-64 w-44 object-cover rounded-2xl shadow-[0px,0px,6px,0px shadow-[0_0_6px_rgba(0,0,0,0.1)]'/>
             </div>
             <div className='flex flex-col justify-between flex-1'>
                    <div className='space-y-1'>
                        <h3 className='text-xl font-semibold line-clamp-1'>{book?.name}</h3>
                        <p className='text-sm'>{book?.category}</p>
                    </div>
                    <div className='flex item-center gap-3 sm:mt-2'>
                        <h4 className='text-lg font-bold text-secondary'>{currency}{book?.price}.00</h4>
                    </div>
                    <div className='grid grid-cols-2 gap-2 sm:gap-4 mt-2 sm:mt-4 text-sm text-gray-600'>
                       <p><span className='font-medium text-gray-700'>Published:</span>2022</p> 
                       <p><span className='font-medium text-gray-700'>Pages:</span>308</p>
                       <p><span className='font-medium text-gray-700'>Language:</span>English</p>
                       <p><span className='font-medium text-gray-700'>Stock:</span>In Stock</p>
                    </div>
                    <p className='mt-1 sm:mt-4 text-sm line-clamp-3'>{book?.description}</p>
                    <button onClick={()=>addToCart(book?._id)} className='btn-secondary max-sm:text-xs mt-1 sm:mt-5 w-fit px-5 py-2 flex items-center gap-2 text-sm font-medium'><TbShoppingBagPlus className='text-lg'/>Add to Cart</button>
             </div>
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className='xl:flex-1 bg-center bg-cover bg-no-repeat' style={{backgroundImage:`url(${featuredBooksImg})`}}>
            <div className=''/>
        </div>
      </div>
    </section>
  )
}

export default FeaturedBooks

