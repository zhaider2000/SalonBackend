const salon=require('../../Models/salon')
const bcrypt=require('bcrypt')
const dotenv=require("dotenv")


dotenv.config({ path:'./secrets.env'})


module.exports=class SalonModel{

    static async createSalon(body){

            try {
          
                const{name,city,address,password,email,category,maps,gender}=body

                let emailExist=await salon.find({email:email})

    
                if(emailExist.length!=0){
                    return "salon with this email exist"
                }
                else
                {
                let passwordHash=await bcrypt.hash(password,10) //hash the password

                let newSalon=new salon({name,city,address,password:passwordHash,email,category,maps,gender}) 
                await newSalon.save() //save the new salon to DB
    

                return true
                }

            } catch (error) {
                    console.log(error)
                    return false
            }

    }

    static async getAllSalon(){
        try {

            let allSaloons=await salon.find({},{email:1,name:1,address:1,city:1,maps:1,gender:1,rating:1}) //DONT SHOW PASSWORD TO THE HTTP REQS

            return allSaloons
            
        } catch (error) {
            return false
        }
    }


    static async updateSalon(body){

        try {

            const {id,name,city,address}=body

            let updateSalon=await salon.findByIdAndUpdate({_id:id},{
                name:name,
                city:city,
                address:address,
            })

        
            return true
            
        } catch (error) {
                return false
        }

    }

    static async loginSalon(body){

        try {
            
            const{email,password}=body

            let salonObject=await salon.findOne({email:email})

            if(salonObject){
                
                const match = await bcrypt.compare(password, salonObject.password);

                if(match){

                    console.log(salonObject)
                    return salonObject

                }
                if(!match){
                    console.log(salonObject)
                    return false
                }
            }
            else{

                return false
            }
            
        } catch (error) {

            return false
        }
    }

}