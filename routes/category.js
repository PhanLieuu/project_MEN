const express=require('express')
const categoryModel = require('../models/category.model')
const router=express.Router()

router.get('/',async(req,res)=>{
    const categories= await categoryModel.find()
    res.render('categories/list',{categories:categories})
})
router.post('/',async(req,res)=>{
    try{
        const categoryNew = new categoryModel({
            name:req.body.name
        })
        await categoryNew.save()
        res.redirect('/category')
    }catch(e){
        console.log(e.message)
        res.redirect('/')
    }
})

router.get('/add',(req,res)=>{
    const category = new categoryModel()
    res.render('categories/add',{category:category})
})
router.delete('/delete/:id',async(req,res)=>{
    try{
        await categoryModel.findByIdAndDelete(req.params.id)
        res.redirect('/category')

    }catch(e){
        console.log(e.message)
        res.redirect('/')
    }
})

router.get('/edit/:id',async(req,res)=>{
        const category=await categoryModel.findById(req.params.id)
        res.render('categories/edit',{category:category})
    
})

router.put('/edit/:id',async(req,res)=>{
        try{
            const category= await categoryModel.findById(req.params.id)
            category.name=req.body.name
            await category.save()
            res.redirect('/category')
        }catch(e){
            console.log(e)
            res.redirect("/")
        }
    
    })
module.exports=router