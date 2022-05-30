const mongoose=require('mongoose')

const service=new mongoose.Schema({

    salon:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"salons"
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    Status:{
        type:String,
        default:"Active"
    }

})

const serviceModel=mongoose.model('service',service)
module.exports=serviceModel