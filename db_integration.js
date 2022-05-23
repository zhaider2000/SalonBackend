const moongose=require('mongoose')
const dotenv=require("dotenv")


dotenv.config({ path:'./secrets.env'})
const DB=process.env.MONGODB_URL

moongose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("MongoDb connected sucessfully")
})
.catch((err)=>{
    console.log(err);
})
