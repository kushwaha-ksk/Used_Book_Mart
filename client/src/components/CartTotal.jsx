// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import toast from 'react-hot-toast';

// const CartTotal = () => {
//   const { navigate, books, currency, cartItems, setCartItems, method, setMethod, getCartAmount, getCartCount, delivery_charges, user, axios } = useContext(ShopContext)
//   const [showAddress, setShowAddress] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(null)
//   const[addresses,setAddresses] = useState([]);

//    const getAddress = async ()=>{
//     try{
//       const {data} = await axios.get("/api/address/get")
//       if(data.success){
//         setAddresses(data.addresses)
//         if(data.addresses.length > 0){
//           setSelectedAddress(data.addresses[0])
//         }else{
//           toast.error(data.message)
//         }
//       }
//     }catch(error){
//       toast.error(data.message)
//     }
//    }

//    useEffect(()=>{
//     if(user){
//       getAddress()
//     }
//    })

//   return (
//     <div>
//       <h3 className='bold-22'>Order Details
//         <span className='bold-14 text-secondary'>({getCartCount()})Items</span>
//       </h3>
//       <hr className='boder-gray-300 my-5' />
//       {/* PAYMENT  */}                                                                                                                            
//       <div className='mb-5'>
//         <div className='my-5'>
//           <h4 className='h4 mb-5'>Where to ship your order?</h4>
//           <div className='relative flex justify-between items-start mt-2'>
//             <p>{selectedAddress ? `${selectedAddress.street},${selectedAddress.city},${selectedAddress.state},${selectedAddress.country}` : "No address found"}</p>
//             <button onClick={() => setShowAddress(!showAddress)} className='text-secondary medium-14 hover:underline cursor-pointer'>change</button>
//             {
//               showAddress && (
//                 <div className='absolute top-full py-1 bg-white ring-1 ring-slate-900/10 text-sm w-full'>
//                   {addresses.map((address, index) => (
//                     <p key={index} onClick={() => {
//                       setSelectedAddress(address);
//                       setShowAddress(false)
//                     }
//                     } className='p-2 cursor-pointer hover:bg-gray-100 medium-14'>
//                       {address.street},{address.city},
//                       {address.state},{""}
//                       {address.country}
//                     </p>
//                   ))}
//                   <p onClick={() => navigate("/address-form")} className='p-2 top-full cursor-pointer hover:bg-gray-100 medium-14 hover:bg-yellow-300 w-full'>Add Address</p>
//                 </div>
//               )
//             }
//           </div>
//         </div>
//         <hr className='border-gray-300 my-5' />
//         <div className='my-6'>
//           <h4 className='h4 mb-5'>Payment Method</h4>
//           <div className='flex gap-3'>
//             <div onClick={() => setMethod("COD")} className={`${method === "COD" ? "btn-secondary" : "btn-white"} !py-1 text-xs cursor-pointer`}>Cash On Delivery</div>
//             <div onClick={() => setMethod("stripe")} className={`${method === "stripe" ? "btn-secondary" : "btn-white"} !py-1 text-xs cursor-pointer`}>Stripe</div>
//           </div>
//         </div>
//         <hr className='border-gray-300 my-5' />
//       </div>
//       <div className='mt-4 space-y-2'>
//         <div className='flex justify-between'>
//           <h5 className='h5'>Price</h5>
//           <p className='font-bold'>
//             {currency} {getCartCount()}
//           </p>
//         </div>
//         <div className='flex justify-between'>
//           <h5 className='h5'>Shipping Fee</h5>
//           <p className='font-bold'>
//             {currency} {getCartCount() === 0 ? "0.00" : `${currency} ${delivery_charges}.00`}
//           </p>
//         </div>
//         <div className='flex justify-between'>
//           <h5 className='h5'>Tax (2%)</h5>
//           <p className='font-bold'>
//             {currency} {(getCartCount() * 2) / 100}
//           </p>
//         </div>
//         <div className='flex justify-between'>
//           <h5 className='h5'>Total Amount</h5>
//           <p className='font-bold'>
//             {currency} {getCartCount() === 0 ? "0.00" : getCartCount() + delivery_charges + (getCartCount() * 2) / 100}
//           </p>
//         </div>
//       </div>
//       <button className='btn-dark w-full mt-8 !rounded'>
//         Proceed to order
//       </button>
//     </div>
//   )
// }

// export default CartTotal

// import React, { useContext, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { dummyAddress } from '../assets/data'

// const CartTotal = () => {
//   const {
//     navigate,
//     currency,
//     method,
//     setMethod,
//     getCartAmount,
//     getCartCount,
//     delivery_charges,
//   } = useContext(ShopContext)

//   const [showAddress, setShowAddress] = useState(false)
//   const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0])

//   const addresses = dummyAddress

//   const cartAmount = getCartAmount()
//   const tax = (cartAmount * 2) / 100
//   const shipping = cartAmount === 0 ? 0 : delivery_charges
//   const total = cartAmount + tax + shipping

//   return (
//     <div>
//       <h3 className='bold-22'>
//         Order Details
//         <span className='bold-14 text-secondary'> ({getCartCount()} Items)</span>
//       </h3>

//       <hr className='border-gray-300 my-5' />

//       {/* Address Section */}
//       <div className='mb-5'>
//         <h4 className='h4 mb-5'>Where to ship your order?</h4>

//         <div className='relative flex justify-between items-start mt-2'>
//           <p>
//             {selectedAddress
//               ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
//               : 'No address found'}
//           </p>

//           <button
//             onClick={() => setShowAddress(!showAddress)}
//             className='text-secondary medium-14 hover:underline cursor-pointer'
//           >
//             change
//           </button>

//           {showAddress && (
//             <div className='absolute top-10 bg-white ring-1 ring-slate-900/10 text-sm w-full z-10'>
//               {addresses.map((address, index) => (
//                 <p
//                   key={index}
//                   onClick={() => {
//                     setSelectedAddress(address)
//                     setShowAddress(false)
//                   }}
//                   className='p-2 cursor-pointer hover:bg-gray-100 medium-14'
//                 >
//                   {address.street}, {address.city}, {address.state}, {address.country}
//                 </p>
//               ))}
//               <p
//                 onClick={() => navigate('/address-form')}
//                 className='p-2 cursor-pointer hover:bg-gray-100 medium-14'
//               >
//                 Add Address
//               </p>
//             </div>
//           )}
//         </div>

//         <hr className='border-gray-300 my-5' />

//         {/* Payment Method */}
//         <div className='my-6'>
//           <h4 className='h4 mb-5'>Payment Method</h4>
//           <div className='flex gap-3'>
//             <div
//               onClick={() => setMethod('COD')}
//               className={`${method === 'COD' ? 'btn-secondary' : 'btn-white'} !py-1 text-xs cursor-pointer`}
//             >
//               Cash On Delivery
//             </div>

//             <div
//               onClick={() => setMethod('stripe')}
//               className={`${method === 'stripe' ? 'btn-secondary' : 'btn-white'} !py-1 text-xs cursor-pointer`}
//             >
//               Stripe
//             </div>
//           </div>
//         </div>

//         <hr className='border-gray-300 my-5' />
//       </div>

//       {/* Price Summary */}
//       <div className='mt-4 space-y-2'>
//         <div className='flex justify-between'>
//           <h5 className='h5'>Price</h5>
//           <p className='font-bold'>
//             {currency} {cartAmount.toFixed(2)}
//           </p>
//         </div>

//         <div className='flex justify-between'>
//           <h5 className='h5'>Shipping Fee</h5>
//           <p className='font-bold'>
//             {currency} {shipping.toFixed(2)}
//           </p>
//         </div>

//         <div className='flex justify-between'>
//           <h5 className='h5'>Tax (2%)</h5>
//           <p className='font-bold'>
//             {currency} {tax.toFixed(2)}
//           </p>
//         </div>

//         <div className='flex justify-between'>
//           <h5 className='h5'>Total Amount</h5>
//           <p className='font-bold'>
//             {currency} {total.toFixed(2)}
//           </p>
//         </div>
//       </div>

//       <button className='btn-dark w-full mt-8 !rounded'>
//         Proceed to order
//       </button>
//     </div>
//   )
// }

// export default CartTotal



import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import toast from 'react-hot-toast';

const CartTotal = () => {

  const {
    navigate,
    currency,
    cartItems,
    method,
    setMethod,
    getCartAmount,
    getCartCount,
    delivery_charges,
    user,
    axios
  } = useContext(ShopContext)

  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [addresses, setAddresses] = useState([]);


  const getAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get")

      if (data.success) {
        setAddresses(data.addresses)

        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0])
        }
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const placeOrder = async ()=>{
    try{
      if(!setSelectedAddress){
        return toast.error("Please select an address")
      }
      let orderItems = []
      for(const itemId in cartItems){
        const book = books.find((item)=>item._id === itemId)
        book.quanity = cartItems = cartItems[itemId]
        orderItems.push(book)
      }
    }catch(error){

    }
  }


  useEffect(() => {
    if (user) {
      getAddress()
    }
  }, [user])


  return (
    <div>

      <h3 className='bold-22'>
        Order Details
        <span className='bold-14 text-secondary'> ({getCartCount()}) Items</span>
      </h3>

      <hr className='border-gray-300 my-5' />


      {/* ADDRESS */}

      <div className='mb-5'>
        <div className='my-5'>

          <h4 className='h4 mb-5'>Where to ship your order?</h4>

          <div className='relative flex justify-between items-start mt-2'>

            <p>
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address found"}
            </p>

            <button
              onClick={() => setShowAddress(!showAddress)}
              className='text-secondary medium-14 hover:underline cursor-pointer'
            >
              change
            </button>


            {showAddress && (
              <div className='absolute top-full py-1 bg-white ring-1 ring-slate-900/10 text-sm w-full'>

                {addresses.map((address, index) => (

                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(address)
                      setShowAddress(false)
                    }}

                    className='p-2 cursor-pointer hover:bg-gray-100 medium-14'
                  >
                    {address.street}, {address.city}, {address.state}, {address.country}
                  </p>

                ))}

                <p
                  onClick={() => navigate("/address-form")}
                  className='p-2 cursor-pointer hover:bg-yellow-300 medium-14 w-full'
                >
                  Add Address
                </p>

              </div>
            )}

          </div>

        </div>

        <hr className='border-gray-300 my-5' />


        {/* PAYMENT METHOD */}

        <div className='my-6'>

          <h4 className='h4 mb-5'>Payment Method</h4>

          <div className='flex gap-3'>

            <div
              onClick={() => setMethod("COD")}
              className={`${method === "COD" ? "btn-secondary" : "btn-white"} !py-1 text-xs cursor-pointer`}
            >
              Cash On Delivery
            </div>

            <div
              onClick={() => setMethod("stripe")}
              className={`${method === "stripe" ? "btn-secondary" : "btn-white"} !py-1 text-xs cursor-pointer`}
            >
              Stripe
            </div>

          </div>

        </div>

        <hr className='border-gray-300 my-5' />

      </div>


      {/* PRICE DETAILS */}

      <div className='mt-4 space-y-2'>

        <div className='flex justify-between'>
          <h5 className='h5'>Price</h5>
          <p className='font-bold'>
            {currency} {getCartAmount()}
          </p>
        </div>


        <div className='flex justify-between'>
          <h5 className='h5'>Shipping Fee</h5>
          <p className='font-bold'>
            {currency} {getCartCount() === 0 ? "0.00" : delivery_charges}
          </p>
        </div>


        <div className='flex justify-between'>
          <h5 className='h5'>Tax (2%)</h5>
          <p className='font-bold'>
            {currency} {(getCartAmount() * 2) / 100}
          </p>
        </div>


        <div className='flex justify-between'>
          <h5 className='h5'>Total Amount</h5>
          <p className='font-bold'>
            {currency}
            {getCartCount() === 0
              ? " 0.00"
              : getCartAmount() + delivery_charges + (getCartAmount() * 2) / 100}
          </p>
        </div>

      </div>


      <button className='btn-dark w-full mt-8 !rounded'>
        Proceed to order
      </button>

    </div>
  )
}

export default CartTotal
