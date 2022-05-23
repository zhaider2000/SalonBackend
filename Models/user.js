const mongoose=require('mongoose')

const user=new mongoose.Schema({
    _id:{
        type:String
    },
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    }
})

const useerModel=mongoose.model('user',user)
module.exports=useerModel