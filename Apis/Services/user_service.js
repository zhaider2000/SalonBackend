const user=require('../../Models/user')



module.exports=class UserService{

    static async createUser(body){

        try {

            const {name,email,phone,id}=body
            console.log(name,email,phone,id)
            let newUser=new user({_id:id,name,email,phone})
            await newUser.save()
            return true
            
        } catch (error) {
                return false
        }
    }

    static async getUser(id){

        try {

            let User=await user.findById(id)

            return User


        } catch (error) {
                return false
        }
    }

}