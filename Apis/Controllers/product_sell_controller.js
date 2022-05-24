'use strict'



module.exports=class AvailedServic{

    static async sellProdcut(req,res,next){

        try {

            let newSoldProdcut=await sellprodcutService.SoldProdcut(req.body)

            if(newAvailedService==true){
                res.json({messsage:"sucess"})
            }

            if(availedService==false){

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