import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/Used-Book-Mart`)
        console.log("✓ Database connected")
    }catch(error){
        console.log("✕ Database connection failed:",console.error.message)
    }
}

export default connectDB;