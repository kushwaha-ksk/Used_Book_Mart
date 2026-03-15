import User from "../models/User.js";

// ADDING TO CART

export const addToCart = async (req,res)=>{
    try{
        const {itemId} = req.body
        const userId = req.userId
        const userData = await User.findById(userId)
        const cartData = userData.cartData || {}

        if(cartData[itemId]){
            cartData[itemId] += 1
        }else{
            cartData[itemId] = 1
        }
        await User.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Added to cart"})
    }catch(error){
         console.log(error.message)
    res.json({success:false, message:error.message})
    }
}

// update the cart 

export const updateCart = async (req,res)=>{
    try{
        const {itemId,quantity} = req.body
        const userId = req.userId

        const userData = await User.findById(userId)
        const cartData = userData.cartData

        cartData[itemId] = quantity

        await User.findByIdAndUpdate(userId,{cartData})
        res.json({success:true, message:"cart updated"})

    }catch(error){

         console.log(error.message)
    res.json({success:false, message:error.message})
    }
}