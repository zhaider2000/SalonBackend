const mongoose=require('mongoose')

const salon=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default:0,
        required:true
    },
    maps:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    }
})

const salonModel=mongoose.model('salons',salon)
module.exports=salonModel