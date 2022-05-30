"use strict"

const express=require('express')
const router=express.Router()
const availedService=require('../Controllers/availed_service_controller')

router.post('/availed',availedService.createAvailedService)
router.get('/UserAvailed',availedService.getUserAvailedServices)
router.get('/SalonAvailed',availedService.getSalonAvailedServices)
router.post('/EndAvailedService',availedService.endActiveService)

module.exports=router