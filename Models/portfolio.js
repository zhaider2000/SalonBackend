const mongoose=require('mongoose')

const Portfolios=new mongoose.Schema({

    salon:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"salons"
    },
    description: {
        type:String
    },
    name: {
        type:String
    },
    image:{
        type:String
    }

})

const portfolioModel=mongoose.model('portfolios',Portfolios)
module.exports=portfolioModel