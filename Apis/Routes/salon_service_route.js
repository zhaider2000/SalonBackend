"use strict"

const express=require('express')
const router=express.Router()
const ServicesController=require('../Controllers/salon_service_controller')

router.post('/service',ServicesController.createService)
router.get('/service',ServicesController.getServices)

module.exports=router