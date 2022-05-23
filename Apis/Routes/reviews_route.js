'use strict'

const express=require('express')
const router=express.Router()
const ReviewController=require('../Controllers/review_controller')

router.post('/review',ReviewController.createReview)
router.get('/review',ReviewController.getReviews)


module.exports=router
