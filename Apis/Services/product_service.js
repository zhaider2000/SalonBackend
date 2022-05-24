const productModel=require('../../Models/prodcut')



module.exports=class ProductService{

    static async createProduct(body){

        try {

            const {salon,name,quantity,price}=body

            console.log(salon,name,quantity,price)

            let newProduct=new productModel({salon,name,quantity,price})

            await newProduct.save()

            return true
            
        } catch (error) {
            
            return false
        }
    }

    static async getProducts(id){

        try {

            console.log(id)

            let prodcuts=await productModel.find({salon:id}).populate("salon",{name:1,city:1,address:1})
            
            if(prodcuts.length!=0){
                return prodcuts
            }
            else{
                return false
            }
            
            
        } catch (error) {
            return false
        }
    }

    static async updateProduct(body){
        try {
            
            const {_id,name,quantity,price}=body

            console.log(_id,name,quantity,price)
            const updateProdct=await productModel.findOneAndUpdate({_id:_id},{name:name,quantity:quantity,price:price})

            console.log(updateProdct)

            return true

        } catch (error) {
            return false
        }
    }

}