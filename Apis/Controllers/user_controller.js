'use strict'
const admin=require('../../firebase_integration')
const userService=require('../Services/user_service')


module.exports=class User{

    static async createUser(req,res,next){

        try {

            console.log(req.body)

            let newUser=await userService.createUser(req.body)

            if(newUser==true){

                res.json({message:"user created succesfully"})
            }
            if(newUser==false){
                res.json({message:"fail"}) //if false then any error occured therefore salon is not created 
            }

        } catch (error) {
                console.log(error)
        }
    }

    static async getUser(req,res,next){

        try {

            console.log(req.query.id)
            let user=await userService.getUser(req.query.id)
            console.log(user)
            res.json(user)


        } catch (error) {
            
            console.log(error)

        }

    }

}