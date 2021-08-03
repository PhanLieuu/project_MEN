const mongoose=require('mongoose')
const categorySchema= new mongoose.Schema({
    name:{type:String,required:true,default:"bánh"},
    
})
module.exports=mongoose.model('category',categorySchema)