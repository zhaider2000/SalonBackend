const reviewModel = require("../../Models/reviews");
const salonModel = require("../../Models/salon");

module.exports = class ReviewService {
  static async createReview(body) {
    try {
      conosle.log("REVIEWS");

      const { rating, text, salons } = body;
      console.log(rating);
      console.log(text);
      console.log(salons);

      let reviewExist = await reviewModel.findOne({ salons: salons });

                console.log("here at review service");

                const{rating,text,salons,name}=body

                console.log(rating,text,salons,name);

                let reviewExist=await reviewModel.findOne({salons:salons})

                console.log(reviewExist);

                if(reviewExist){

                    console.log("exist")

                    let updateCount=reviewExist.count+1

        return true;
      }
      if (!reviewExist) {
        let arrayOfRating = [rating];

        let arrayOfText = [text];

                    let updateReview=await reviewModel.findOneAndUpdate({salons:salons},
                        {
                            count:updateCount,
                            total:updateTotal,
                            $push:{texts:text,individualRatings:rating,name:name}
                        }

        await newReview.save();

        let updateSalon = await salonModel.findByIdAndUpdate(salons, {
          rating: rating,
        });

                    console.log("dosent exist")


                    let arrayOfRating=[rating]

                    let arrayOfText=[text]

                    let arrayOfName=[name]
                    
                    let newReview=new reviewModel({salons,count:1,total:rating,texts:arrayOfText,individualRatings:arrayOfRating,name:arrayOfName})

      if (reviews.total) {
        return reviews;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};
