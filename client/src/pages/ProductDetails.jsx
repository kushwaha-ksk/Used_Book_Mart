

import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link, useParams } from 'react-router-dom'
import {
  TbHeart,
  TbShoppingBagPlus,
  TbStarFilled,
  TbStarHalfFilled,
} from 'react-icons/tb'
import { FaTruckFast } from 'react-icons/fa6'
import ProductDescription from '../components/ProductDescription'
import ProductFeatures from '../components/ProductFeatures'
import RelatedBooks from '../components/RelatedBooks'

const ProductDetails = () => {
  const { books, currency, addToCart } = useContext(ShopContext)
  const { id } = useParams()

  const book = books?.find((b) => b._id === id)
  const [image, setImage] = useState(null)

  useEffect(() => {
    // When book changes, set the main image to the first available image (if any)
    if (book) {
      setImage(book?.image?.[0] ?? null)
    }
  }, [book])

  // If book not found, render nothing (or show a fallback UI if you prefer)
  if (!book) return null

  return (
    <div className="max-padd-container py-16 pt-28">
      <p className="breadcrumb">
        <Link to="/">Home</Link> /{' '}
        <Link to="/shop">Shop</Link> /{' '}
        <Link to={`/shop/${book.category}`}>{book.category}</Link> /{' '}
        <span className="medium-14 text-black">{book.name}</span>
      </p>

      {/* BOOK DATA */}
      <div className="flex gap-10 flex-col xl:flex-row my-6">
        {/* IMAGES */}
        <div className="flex gap-x-2 max-w-[433px] rounded-xl">
          <div className="flex-1 flexCenter flex-col gap-[7px] flex-wrap">
            {book?.image?.map((item, index) => (
              <div key={index} className="thumbnail">
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  alt={`${book.name} thumbnail ${index + 1}`}
                  className="rounded-lg overflow-hidden cursor-pointer"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-[4]">
            <img
              src={image}
              alt={book.name}
              className="rounded-lg overflow-hidden"
            />
          </div>
        </div>

        {/* INFO */}
        <div className="px-5 py-3 w-full bg-primary">
          <h3 className="h3 leading-none">{book.name}</h3>

          <div className="flex items-center gap-x-2 pt-2">
            <div className="flex items-center gap-x-2 pt-2">
              <TbStarFilled />
              <TbStarFilled />
              <TbStarFilled />
              <TbStarFilled />
              <TbStarHalfFilled />
            </div>
            <p className="medium-22">(22)</p>
          </div>

          <div>
            <h3 className="h3 text-secondary">
              {currency}
              {Number(book.price).toFixed(2)}
            </h3>
          </div>

          <p className="max-w-[555px]">{book.description}</p>

          <div className="flex items-center gap-x-4 mt-6">
            <button
              onClick={() => addToCart(book._id)}
              className="btn-dark sm:w-1/2 flexCenter gap-x-2 capitalize !rounded-md"
            >
              Add to Cart
              <TbShoppingBagPlus />
            </button>

            <button className="btn-secondary !rounded-md">
              <TbHeart className="text-xl" />
            </button>
          </div>

          <div className="flex items-center gap-x-2 mt-3">
            <FaTruckFast className="text-lg" />
            <span>Delivery Charges {currency} 60.00</span>
          </div>

          <hr className="my-3 w-2/3" />

          <div className="mt-2 flex flex-col gap-1 text-gray-30 text-[14px]">
            <p>Authenticity you can trust</p>
            <p>Enjoy cash on delivery for your convenience</p>
            <p>Easy returns and exchanges within 7 days</p>
          </div>
        </div>
      </div>

      <ProductDescription />
      <ProductFeatures />
      <RelatedBooks book={book} id={id} />
    </div>
  )
}

export default ProductDetails
