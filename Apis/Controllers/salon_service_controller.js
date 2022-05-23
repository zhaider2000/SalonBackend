"use strict"

const servicesService=require('../Services/salon_services_service')

module.exports=class ServicesController{

    static async createService(req,res,next){
 
        try {

            console.log("here at service")
            
            let newService=await servicesService.createService(req.body)

            if(newService==true){
                res.json({message:"success"}) //if true service is created succesfully
            }
            
            if(newService==false){
                res.json({message:"fail"}) //if false then any error occured therefore service is not created 
            }
            
    
    } catch (error) {
            console.log(error)
        }

    }

    static async getServices(req,res,next){
        try {

            let salonServices=await servicesService.getServices(req.body.id)

            if(salonServices==false){
                res.json({message:"no services available right now"})
            }
            else{
                res.json(salonServices)
            }
            
        } catch (error) {
                console.log(error)
        }
    }

}