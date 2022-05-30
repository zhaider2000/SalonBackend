'use strict'

const availed=require('../../Models/availed_service')

module.exports=class AvailedServices{

    static async createAvailedService(body){

        try {

            const {salons,users,services,date,slot}=body

            let newAvailedService=new availed({salons,users,services,date,slot})

            await newAvailedService.save()

            return true
            
        } catch (error) {
            return false
        }
    }


    static async getUserAvailedServices(uid,filter){

        try {
            
            console.log("here at availed")
            console.log(uid,filter)
            let getServices=await availed.find({$and:[{status:filter},{users:uid}]}).populate([
                {
                  path: "users",
                  select: ["name","phone"]
                },
                {
                  path: "salons",
                  select: ["name"]
                },
                {
                    path:"services",
                }
              ])
              
            
            console.log("here")
            console.log(getServices)

            if (getServices.length==0){
                return false
            }

            if(getServices.length!=0){

                return getServices
            }
            

        } catch (error) {
            return false
        }
    }

    
    static async getSalonAvailedServices(id,filter){

        try {
            
            console.log("here at availed")

            let getServices=await availed.find({salons:id,status:filter}).populate([
                    {
                      path: "users",
                      select: ["name","phone"]
                    },
                    {
                      path: "salons",
                      select: ["name"]
                    },
                    {
                        path:"services",
                    }
                  ])
              
            

            console.log(getServices)

            if (getServices.length==0){
                return false
            }

            if(getServices.length!=0){

                return getServices
            }
            

        } catch (error) {
            return false
        }
    }


    static async finishTheActiveService(id){
        try {
            
            const updateService=await availed.findOneAndUpdate({_id:id},{status:'Finished'})
            return true

        } catch (error) {
            return false
        }
    }

}
