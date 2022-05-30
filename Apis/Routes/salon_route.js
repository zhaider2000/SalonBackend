"use strict"

const express=require('express')
const router=express.Router()
const salonController=require('../Controllers/salon_controller')


router.post("/salon",salonController.createSalon)
router.post("/RequestSalon",salonController.requestSalon)
router.put("/salon",salonController.updateSalon)
router.post("/LoginSalon",salonController.loginSalon)
router.get('/AllSalon',salonController.getAllSalon)
router.get('/SalonNames',salonController.getSalonNames)
router.get('/SalonCity',salonController.getSalonByCity)
router.get('/SalonGender',salonController.getSalonByGender)
router.get('/SalonCategory',salonController.getSalonByCategory)
router.get('/SalonInfo',salonController.getSalonById)


module.exports=router