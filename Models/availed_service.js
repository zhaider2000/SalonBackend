const mongoose=require('mongoose')

const AvailedService=new mongoose.Schema({

    salons:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"salons"
    },

    services:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"service"
    },

    users:{
        type:String,
        ref:"user"
    },

    date:{
        type:String,
        required:true
    },
    
    slot:{
        type:String,
        required:true
    },

    status:{
        type:String,
        required:true,
        default:'Active'
    }

})

const availedModel=mongoose.model('availed',AvailedService)
module.exports=availedModel