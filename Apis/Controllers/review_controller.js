"use strict";
const ReviewService = require("../Services/reviews_service");

module.exports = class ReviewController {
  static async createReview(req, res, next) {
    try {
      console.log("here at review");

      let newReview = await ReviewService.createReview(req.body);

      if (newReview == true) {
        res.json({ message: "success" });
      }
      if (newReview == false) {
        res.json({ message: "fail!" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getReviews(req, res, next) {
    try {
      let reviews = await ReviewService.getReviews(req.query.id);

      if (reviews) {
        res.json(reviews);
      }
      if (reviews == false) {
        res.json({ message: "no review exist / error" });
      }
    } catch (error) {
      console.log(error);
    }
  }
};
