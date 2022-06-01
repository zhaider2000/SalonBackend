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

    static async updateUser(req,res,next){

        try {

            console.log(req.query.id)
            const {email,name,phone}=req.body
            let user=await userService.updateUser(req.query.id,name,email,phone)
            if(user==true){
                res.json({message:"User updated Succesfully"})
            }else{
                res.json({message:"fail"})
            }


        } catch (error) {
            
            console.log(error)

        }

    }

}