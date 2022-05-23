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


    static async getUserAvailedServices(uid){

        try {
            
            console.log("here at availed")

            let getServices=await availed.find({users:uid}).populate([
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

    
    static async getSalonAvailedServices(id){

        try {
            
            console.log("here at availed")

            let getServices=await availed.find({salons:id}).populate([
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

}
