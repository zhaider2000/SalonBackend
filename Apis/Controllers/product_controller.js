"use strict"
const productService=require('../Services/product_service')

module.exports=class ProductController{

    static async createProduct(req,res,next){
 
        try {

            let newProduct=await productService.createProduct(req.body)

            if(newProduct==true){
                res.json({message:"success"}) //if true product is created succesfully
            }
            
            if(newProduct==false){
                res.json({message:"fail"}) //if false then any error occured therefore product is not created 
            }
            
    
    } catch (error) {
            console.log(error)
        }

    }

    static async getProducts(req,res,next){
        try {

            let salonProducts=await productService.getProducts(req.body.id)

            if(salonProducts==false){
                res.json({message:"no services available right now"})
            }
            else{
                res.json(salonProducts)
            }
            
        } catch (error) {
                console.log(error)
        }
    }
    
    static async updateProduct(req,res,next){
        try {
            
            let updateProdct=await productService.updateProduct(req.body)

            if(updateProdct){
                res.json({message:"product updated successfully"})
            }
            else{
                res.json({message:"product is not updated"})
            }

        } catch (error) {
            console.log(error)
        }
    }
}