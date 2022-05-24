"use strict"

const express=require('express')
const router=express.Router()

router.post('/buy/prodcuct',availedService.createAvailedService)
router.get('/user/buy/product',availedService.getUserAvailedServices)
router.get('/salon/buy/product',availedService.getSalonAvailedServices)

module.exports=router