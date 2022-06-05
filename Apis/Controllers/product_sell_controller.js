'use strict'
const sellProductService=require('../Services/product_sell_service');




module.exports=class AvailedServic{

    static async sellProdcut(req,res,next){

        try {

            console.log("here at sell product");

            let newSoldProdcut=await sellProductService.soldProduct(req.body)

            if(newSoldProdcut==true){
                res.json({messsage:"sucess"})
            }

            if(newSoldProdcut==false){

                res.json({messsage:"fail"})
            }

            
        } catch (error) {

            console.log(error)
        }

    }


    static async getUserAvailedServices(req,res,nex){

        try {

            let userServices=await availedService.getUserAvailedServices(req.body.id)

            if(userServices==false){
                res.json({messsage:"no availed services / error"})
            }
            
            if(userServices){
                res.json(userServices)
            }
            
        } catch (error) {
                console.log(error)
        }
    }

    static async getSalonAvailedServices(req,res,nex){

        try {

            let salonServices=await availedService.getSalonAvailedServices(req.body.id)

            if(salonServices==false){
                res.json({messsage:"no availed services / error"})
            }
            
            if(salonServices){
                res.json(salonServices)
            }
            
        } catch (error) {
                console.log(error)
        }
    }



}