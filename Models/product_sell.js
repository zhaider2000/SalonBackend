const mongoose=require('mongoose')

const sellProducts=new mongoose.Schema({
    salons:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"salons"
    },

    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"prodcuts"
    }],

    users:{
        type:String,
        ref:"user"
    },

    date:{
        type:String,
        required:true
    },
    
    quantity:[{
        type:Number,
        required:true
    }],

    total:{
        type:Number,
        required:true
    }

})

const sellProdcutModel=mongoose.model('sellProdcuts',sellProducts)
module.exports=sellProdcutModel