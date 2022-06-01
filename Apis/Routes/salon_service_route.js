"use strict"

const express=require('express')
const router=express.Router()
const ServicesController=require('../Controllers/salon_service_controller')

router.post('/service',ServicesController.createService)
router.get('/service',ServicesController.getServices)
router.get('/ActiveService',ServicesController.getActiveServices)
router.get('/DropService',ServicesController.getDropServices)
router.post('/dropActiveService',ServicesController.dropActiveService)
router.post('/activeDropService',ServicesController.activeDropService)
router.put('/service',ServicesController.updateService)
 

module.exports=router