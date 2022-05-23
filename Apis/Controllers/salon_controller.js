"use strict"
const salonModel=require('../Services/salon_service')


module.exports=class Account{

    static async createSalon(req,res,next){

        try {
            console.log(req.body)

            const newSalon=await salonModel.createSalon(req.body)
           
            if (newSalon=="salon with this email exist"){

                res.json({message:"salon with this email exist"})// check with email exist
            }

            if(newSalon==true){
                res.json({message:"success"}) //if true salon is created succesfully
            }
            
            if(newSalon==false){
                res.json({message:"fail"}) //if false then any error occured therefore salon is not created 
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    static async getAllSalon(req,res,next){

        try {
            
            let allSaloons=await salonModel.getAllSalon()
            
            res.json(allSaloons)


        } catch (error) {
            
            console.log(error)

        }

    }

    static async updateSalon(req,res,next){

        try {

            let updateSalon=await salonModel.updateSalon(req.body)

            console.log(updateSalon)

            if(updateSalon==true){
                res.json({message:"succes"})
            }
            else{
                res.json({message:"fail"})
            }
            
        } catch (error) {
            console.log(error)
        }
    }


    static async loginSalon(req,res,next){

        try {
            
            let loginSalon=await salonModel.loginSalon(req.body)

            if(loginSalon==false){

                res.json({message:"email/pass incorrect!!"})
            }
            else{

                res.json(loginSalon)
            }


        } catch (error) {

            console.log(error)
            
        }
    }

}
