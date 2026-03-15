import express from "express"
import authAdmin from "../middlewares/authAdmin.js"
import { allOrders, placeOrderCOD, updateStatus, userOrders } from "../controllers/orderController.js"
import authUser from "../middlewares/authUser.js"

const orderRouter = express.Router()
// for admin
orderRouter.post('/list',authAdmin,allOrders)
orderRouter.post('/status',authAdmin,updateStatus)

// for payment
orderRouter.post ('/cod',authUser,placeOrderCOD)

// for User 
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter