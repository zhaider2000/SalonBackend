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

            let salonServices=await servicesService.getServices(req.query.id)

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

    static async getActiveServices(req,res,next){
        try {
            console.log(req.query)
            let activeServices=await servicesService.getActiveServices(req.query.id)
            if(activeServices==false){
                res.json({message:"no services available right now"})
            }
            else{
                console.log("active Services",activeServices)
                res.json(activeServices)
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async getDropServices(req,res,next){
        try {
            console.log(req.query)
            let dropServices=await servicesService.getDropServices(req.query.id)
            if(dropServices==false){
                res.json({message:"no services available right now"})
            }
            else{
                console.log("active Services",dropServices)
                res.json(dropServices)
            }
        } catch (error) {
            console.log(error)
        }
    }


    static async dropActiveService(req,res,next){
        try {

            const update=await servicesService.dropService(req.body.id)
            if(update){
                res.json({message:"service dropped"});

            }
            else{
                res.json({message:"fail"})
            }
        } catch (error) {
            console.log(error)
        }
    }


    static async activeDropService(req,res,next){
        try {

            const update=await servicesService.activeService(req.body.id)
            if(update){
                res.json({message:"service active"});

            }
            else{
                res.json({message:"fail"})
            }
        } catch (error) {
            console.log(error)
        }
    }
}