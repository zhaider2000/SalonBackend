"use strict"
const express=require('express')
const router=express.Router()
const userController=require('../Controllers/user_controller')


router.post('/user',userController.createUser)
router.get('/user',userController.getUser)
router.put('/user',userController.updateUser)
module.exports=router