const serviceModel=require('../../Models/salon_services')

module.exports=class ServicesService{

    static async createService(body){

        try {

            const {salon,name,description,duration,amount}=body

            console.log(salon,name,description,duration,amount)

            let newService=new serviceModel({salon,name,description,duration,amount})

            await newService.save()

            return true
            
        } catch (error) {
            
            return false
        }
    }

    static async getServices(id){

        try {

            console.log(id)
            console.log("here at services")
            let services=await serviceModel.find({salon:id}).populate("salon",{name:1,city:1,address:1})
            console.log("services:=",services)
            if(services.length!=0){
                return services
            }
            else{
                return false
            }
            
            
        } catch (error) {
            return false
        }
    }

    static async getActiveServices(id){

        try {

            console.log(id)

            let services=await serviceModel.find({$and :[{salon:id},{Status:'Active'}]})
            
            if(services.length!=0){
                return services
            }
            else{
                return false
            }
            
            
        } catch (error) {
            return false
        }
    }

    static async getDropServices(id){

        try {

            console.log(id)

            let services=await serviceModel.find({$and :[{salon:id},{Status:'Drop'}]})
            
            if(services.length!=0){
                return services
            }
            else{
                return false
            }
            
            
        } catch (error) {
            return false
        }
    }

    
    static async dropService(id){

        try {

            console.log(id)

            let services=await serviceModel.findOneAndUpdate({_id:id},{Status:'Drop'})
            
            if(services){
                return services
            }
            else{
                return false
            }
            
            
        } catch (error) {
            return false
        }
    }

    static async activeService(id){

        try {

            console.log(id)

            let services=await serviceModel.findOneAndUpdate({_id:id},{Status:'Active'})
            console.log(services)
            if(services){
                return services
            }
            else{
                return false
            }
            
            
        } catch (error) {
            return false
        }
    }

}