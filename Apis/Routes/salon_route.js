"use strict"

const express=require('express')
const router=express.Router()
const salonController=require('../Controllers/salon_controller')


router.post("/salon",salonController.createSalon)
router.put("/salon",salonController.updateSalon)
router.get("/LoginSalon",salonController.loginSalon)
router.get('/AllSalon',salonController.getAllSalon)
router.get('/SalonNames',salonController.getSalonNames)

module.exports=router