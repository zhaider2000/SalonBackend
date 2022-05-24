const mongoose=require('mongoose')

const products=new mongoose.Schema({

    salon:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"salons"
    },

    quantity:{
        type:Number,
    },

    price:{
        type:Number,
    },
    name: {
        type:String
    },

})

const prodcuctModel=mongoose.model('products',products)
module.exports=prodcuctModel