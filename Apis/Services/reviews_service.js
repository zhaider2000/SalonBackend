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

      if (reviewExist) {
        let updateCount = reviewExist.count + 1;

        let updateTotal = reviewExist.total + rating;

        let updatedRating = (updateTotal / updateCount).toFixed(1);

        let updateReview = await reviewModel.findOneAndUpdate(
          { salons: salons },
          {
            count: updateCount,
            total: updateTotal,
            $push: { texts: text, individualRatings: rating },
          }
        );
        let updateSalon = await salonModel.findByIdAndUpdate(salons, {
          rating: updatedRating,
        });

        return true;
      }
      if (!reviewExist) {
        let arrayOfRating = [rating];

        let arrayOfText = [text];

        let newReview = new reviewModel({
          salons,
          count: 1,
          total: rating,
          texts: arrayOfText,
          individualRatings: arrayOfRating,
        });

        await newReview.save();

        let updateSalon = await salonModel.findByIdAndUpdate(salons, {
          rating: rating,
        });

        return true;
      }
    } catch (error) {
      return false;
    }
  }

  static async getReviews(id) {
    try {
      let reviews = await reviewModel.findOne({ salons: id });

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
