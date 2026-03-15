import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import userRouter from "./routes/userRoute.js"
import adminRouter from "./routes/adminRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRoute from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express()  //initialize express application
const port = process.env.PORT || 4000  // define server port
  

await connectDB() // Establish connection tot he database
await connectCloudinary()  // setup cladudinary for image storage

// Allow multiple origins
const allowedOrigins = ['http://localhost:5173']

// Middleware setup
app.use(express.json());    // Enable JSON REQUEST BODY PARSING
app.use(cookieParser());   //  cookie parser middlware to parse HTTP request cookies

app.use(cors({
    origin:allowedOrigins,     // Whitelist of allowed domains
    credentials:true   // require for cookies/authorization headers
}))


// Define API routes
app.use('/api/user', userRouter)  // Route for user-realted operations
app.use('/api/admin', adminRouter) // Route for admin realted opertions
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address',addressRoute)
app.use('/api/order',orderRouter)

    //  Root Endpoint to check API STATUS
    app.get('/', (req, res) => {
        res.send("API connected sucessfully")
    })




// stat the server 
app.listen(port, () => console.log(`server is running at http://localhost:${port}`))