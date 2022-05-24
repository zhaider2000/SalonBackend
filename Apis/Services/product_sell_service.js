'use strict'

const sellProdcutModel=require('../../Models/product_sell')
const prodcuctModel=require('../../Models/prodcut')
const { get } = require( '../Routes/product_sell_route' )

module.exports=class sellProdctServices{

    static async getProdcutQuantity(id){
        try {
            const product=await prodcuctModel.findById(id)

            console.log(product)
              
            return product.quantity
            
        } catch (error) {
            console.log(error)
        }
    }

    static getProdcutPrice(id){
        try {
            
            const product=await prodcuctModel.findById(id)

            console.log(product)
              
            return product.price


        } catch (error) {
            console.log(error)
        }
    }



    static async createAvailedService(body){

        try {

            const {salon,user,products,quantities}=body

            let prodcuctQuantityPairs=[]
            let total=0

            for(let i=0;i<products.length-1;i++){
                let newObj={productId:products[i],productQuantity:quantities[i]}
                prodcuctQuantityPairs.push(newObj)
            }

            console.log(prodcuctQuantityPairs)

            for(let productQuantityPair of prodcuctQuantityPairs){
                const prodcuctQuantity=await this.getProdcutQuantity(productQuantityPair.productId)
            
                if(prodcuctQuantity>=productQuantityPair.productQuantity){
                    const prodcuctPrice=await this.getProdcutPrice(productQuantityPair.productId)
                    total=total+(prodcuctPrice*productQuantityPair.productQuantity)
                }

            }

            let date=new Date()

            let newSellProduct=new sellProdcutModel({salon,user,products,date,quantities,total})

            await newSellProduct.save()

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
