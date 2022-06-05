"use strict"

const express=require('express')
const router=express.Router()
const sellProductController=require('../Controllers/product_sell_controller')

router.post('/SellProduct',sellProductController.sellProdcut)
// router.get('/user/buy/product',availedService.getUserAvailedServices)
// router.get('/salon/buy/product',availedService.getSalonAvailedServices)

module.exports=router