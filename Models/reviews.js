const mongoose=require('mongoose')

const reviews=new mongoose.Schema({

    salons:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"salons"
    },

    count:{
        type:Number,
    },

    total:{
        type:Number,
    },
    texts:[
        {
        type:String
        }
    ],
    individualRatings:[
        {
            type:Number
        }
    ]


})

const reviewModel=mongoose.model('reviews',reviews)
module.exports=reviewModel