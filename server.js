const express= require('express')
const indexRouter=require('./routes/index')
const categoryRouter=require('./routes/category')
const productRouter=require('./routes/product')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
require('dotenv').config()
const mongoose=require('mongoose')

const app=express()

const connectFunc = async()=>{
    try{
        await mongoose.connect(process.env.STR_CONNECT,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        console.log("thành công")
    }catch(e){
        console.log("thất bại")
    }
}
connectFunc()
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.set('layout','layouts/layout')
app.use(express.static('public'))
app.use('/',indexRouter)
app.use('/category',categoryRouter)
app.use('/product',productRouter)


app.listen(process.env.PORT || 3000)