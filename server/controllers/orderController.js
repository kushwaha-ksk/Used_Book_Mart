import Order from "../models/Order.js"
import Product from "../models/Product.js"
import User from "../models/User.js"


//global variable for payment
const currency = "pkr"
const deliveryCharges = 10
const taxtPercentage = 0.2


// PLACE ORDER USING COD
export const placeOrderCOD = async (req, res) => {
    try {
        const { items, address } = req.body
        const userId = req.userId
        if (items.lenght === 0) {
            return res.json({ success: false, message: "plaease add product first" })
        }

        // collect amount using items
        let subtotal = await items.reduce(async (acc, items) => {
            const product = await Product.findById(items.product)
            return (await acc) + product.offerPrice * items.quantity
        }, 0)
        // calculate total
        const taxAmount = subtotal * taxtPercentage
        const totalAmount = subtotal + taxAmount + deliveryCharges
        await Order.create({
            userId,
            items,
            amount: totalAmount,
            address,
            paymentMethod: "COD"
        })

        // clear user cart
        await User.findByIdAndUpdate(userId, { cartData: {} })
        return res.json({ success: true, message: "Order Placed" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// ALL ORDER DATA FOR FRONTED BY USERID

export const userOrders = async (req, res) => {
    try {
        const userId = req.userId
        const orders = (await Order.find({ userId, $or: [{ paymentMethod: "COD" }, { isPaid: true }] }).populate("items.product address")).sort({ createdAt: -1 })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// ALLORDERS DATA FOR ADMIN PANEL

export const allOrders = async (req, res) => {
    try {
        const orders = (await Order.find({ $or: [{ paymentMethod: "COD" }, { isPaid: true }] }).populate("items.product address")).sort({ createdAt: -1 })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


// UPDATING ORDER STATUS FROM ADMIN PANEL

export const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await Order.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "order status updated" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}