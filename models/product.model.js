const mongoose=require('mongoose')
const productSchema= new mongoose.Schema({
    name:{type:String,required:true,default:"bánh"},
    price:{type:Number,default:20000},
    quantity:{type:String,default:10},
    info:{type:String,default:"Hàng chất lượng"},
    category:{type:mongoose.Schema.Types.ObjectId,ref:"category"}
    
})
module.exports=mongoose.model('product',productSchema)