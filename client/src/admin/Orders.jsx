import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { dummyOrders } from '../assets/data'

const Orders = () => {
  const { currency } = useContext(ShopContext)
  const [orders, setOrders] = useState([])

  const fetchAllOrder = () => {
    setOrders(dummyOrders)
  }

  useEffect(() => {
    fetchAllOrder()
    console.log(orders)
  }, [])
  return (
    <div className='px-2 sm:px-6 py-12 m-2 h-[97vh] overflow-scroll lg:w-4/5 rounded-xl'>
      {dummyOrders.map((order) => (
        <div key={order._id} className='bg-primary p-2 mt-4 rounded-lg'>
          {/* book list */}
          <div className='flex flex-col lg:flex-row gap-4'>
            {order.items.map((item, index) => (
              <div key={index} className='flex gap-x-3'>
                <div className='flexCenter rounded-lg overflow-hidden'>
                  <img src={item.book.image[0]} alt="orderImg" className='max-h-20 max-w-32 aspect-square object-contain' />
                </div>
                <div className='w-full block'>
                  <h5 className='h5 capitalize line-clamp-1'>{item.book.name}</h5>
                  <div className='flex flex-wrap gap-3 max-sm:gap-y-1 mt-1'>
                    <div className='flex items-center gap-x-2'>
                      <h5>Price:</h5>
                      <p>{currency}{item.book.price}</p>
                    </div>
                    <div className='flex items-center gap-x-2'>
                      <h5>Quality:</h5>
                      <p>{item.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Order Summary */}
          <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-t border-gray-300 pt-3 p-2 mt-2'>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-x-2'>
                <h5 className='medium-14'>Order Id:</h5>
                <p className='text-gray-400 text-xs break-all'>{order._id}</p>
              </div>
              <div className='flex gap-4'>
                <div className='flex items-center gap-x-2'>
                  <h5 className='medium-14'>Customber :</h5>
                  <p className='text-xs'>{order.address.firstName}{" "}{order.address.lastName}</p>
                </div>
                <div className='flex items-center gap-x-2'>
                  <h5 className='medium-14'>Phone :</h5>
                  <p className='text-xs'>{order.address.phone}</p>
                </div>
              </div>
              <div className='flex items-center gap-x-2'>
                <h5 className='medium-14'>Address:</h5>
                <p className='text-xs'>
                {" "}
                {order.address.street},{order.address.city},{" "}
                {order.address.state},{order.address.country},{""}
                {order.address.zipcode}
                </p>
              </div>
              <div className='flex gap-4'>
                <div className='flex items-center gap-x-2'>
                  <h5 className='medium-14'>Payment status :</h5>
                  <p className='text-gray-400 text-sm'>{order.isPaid ? "Done" : "Pending"}</p>
                  <div className='flex items-center gap-x-2'>
                    <h5 className='medium-14'>Method :</h5>
                    <p className='text-gray-400 text-sm'>{order.paymentMethod}</p>
                  </div>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='flex items-center gap-x-2'>
                  <h5 className='medium-14'>Date :</h5>
                  <p className='text-gray-400 text-sm'>{new Date(order.createdAt).toDateString()}</p>
                  <div className='flex items-center gap-x-2'>
                    <h5 className='medium-14'>Amount:</h5>
                    <p className='text-gray-400 text-sm'>{currency}{order.amount}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <h5 className='medium-14'>Status:</h5>
              <select value={order.status} className='text-xs font-semibold p-1 ring-1 ring-slate-900/s rounded max-w-36 bg-primary'>
                 <option value="Order placed">Order Placed</option>
                 <option value="packing">Packing</option>
                 <option value="Shipped">Shipped</option>
                 <option value="Out for delivery">Out for delivery</option>
                 <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

        </div>
      ))}
    </div>
  )
}

export default Orders