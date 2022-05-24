"use strict"

const express=require('express')
const router=express.Router()
const productController=require('../Controllers/product_controller')


router.post('/product',productController.createProduct)
router.get('/product',productController.getProducts)
router.put('/product',productController.updateProduct)



module.exports=router   