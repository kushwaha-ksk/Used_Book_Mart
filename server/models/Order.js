import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userId: { type: String, required: true , ref:'user' },
    items:[{
       product: {type:String, required:true, ref:'product'},
       quantity: {type:Number, required:true, ref:'product'}
    }],

    amout:{type:Number, required:true},
    address:{type:String, required:true, ref:'address'},
    status:{type:String, default:"Order placed"},
    paymentMethod:{type:String, required:true},
    isPaid:{type:Boolean, reqired:String, default:false},
},{timestamp:true})


 const  Order= mongoose.models.order || mongoose.model("order", orderSchema)

 export default Order

