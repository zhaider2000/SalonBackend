const reviewModel=require('../../Models/reviews')
const salonModel=require('../../Models/salon')

module.exports=class ReviewService{

    static async createReview(body){

            try {

                console.log("here at review service");

                const{rating,text,salons,name}=body

                console.log(rating,text,salons,name);

                let reviewExist=await reviewModel.findOne({salons:salons})

                console.log(reviewExist);

                if(reviewExist){

                    console.log("exist")

                    let updateCount=reviewExist.count+1

                    let updateTotal=reviewExist.total + rating

                    let updatedRating=(updateTotal/updateCount).toFixed(1)

                    let updateReview=await reviewModel.findOneAndUpdate({salons:salons},
                        {
                            count:updateCount,
                            total:updateTotal,
                            $push:{texts:text,individualRatings:rating,name:name}
                        }

                        )
                    let updateSalon=await salonModel.findByIdAndUpdate(salons,{rating:updatedRating})        

                    return true
                
                }
                if(!reviewExist){

                    console.log("dosent exist")


                    let arrayOfRating=[rating]

                    let arrayOfText=[text]

                    let arrayOfName=[name]
                    
                    let newReview=new reviewModel({salons,count:1,total:rating,texts:arrayOfText,individualRatings:arrayOfRating,name:arrayOfName})

                    await newReview.save()

                    let updateSalon=await salonModel.findByIdAndUpdate(salons,{rating:rating})

                    return true

                }

                
            } catch (error) {
                
                return false
                
            }

    }

    static async getReviews(id){
        try {
            
            let reviews=await reviewModel.findOne({salons:id})

            if(reviews.total){
                return reviews
            }
            else{
                return false
            }

        } catch (error) {
                return false
        }
    }
}