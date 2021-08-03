const express=require('express')
const categoryModel = require('../models/category.model')
const productModel = require('../models/product.model')
const router=express.Router()

router.get('/',async(req,res)=>{
    
    const products= await productModel.find().populate('category',['name'])
    res.render('products/list',{products:products})
})
router.post('/',async(req,res)=>{
    try{
        const productNew = new productModel({
            name:req.body.name,
            price:req.body.price,
            quantity:req.body.quantity,
            info:req.body.info,
            category:req.body.category,
        })
        await productNew.save()
        res.redirect('/product')
    }catch(e){
        console.log(e.message)
        res.redirect('/')
    }
})

router.get('/add',async(req,res)=>{
    const product= new productModel()
    const categories= await categoryModel.find()
    res.render('products/add',{product:product, categories:categories})
})
router.delete('/delete/:id',async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.params.id)
        res.redirect('/product')

    }catch(e){
        console.log(e.message)
        res.redirect('/')
    }
})
// router.get('/edit',(req,res)=>{
//     res.render('products/edit')
// })
router.get('/edit/:id',async(req,res)=>{
    try{
        const categories= await categoryModel.find()
        const product=await productModel.findById(req.params.id)
        res.render('products/edit',{product:product, categories:categories})
    }catch(e){
        console.log(e.message)
        res.redirect('/')
    }
    
})
router.put('/edit/:id',async(req,res)=>{
    try{
        const product= await productModel.findById(req.params.id)
        product.name=req.body.name
        product.price=req.body.price
        product.quantity=req.body.quantity
        product.info=req.body.info
        product.category=req.body.category
        await product.save()
        res.redirect('/product')
    }catch(e){
        console.log(e)
        res.redirect("/")
    }

})
module.exports=router