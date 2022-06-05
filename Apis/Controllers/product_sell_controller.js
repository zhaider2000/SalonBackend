"use strict";
const sellProductService = require("../Services/product_sell_service");

module.exports = class AvailedServic {
  static async sellProdcut(req, res, next) {
    try {
      console.log("here at sell product");
      const { salon, user, products, quantities } = req.body;
      const email = req.body.email;
      console.log(email);

      let newSoldProdcut = await sellProductService.soldProduct(req.body);

      if (newSoldProdcut == true) {
        console.log(salon, user, products, quantities);
        res.json({ messsage: "sucess" });
        await sendProductEmail(req.body.email);
      }

      if (newSoldProdcut == false) {
        res.json({ messsage: "fail" });
        await sendProductEmail(email, "123");
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserAvailedServices(req, res, nex) {
    try {
      let userServices = await availedService.getUserAvailedServices(
        req.body.id
      );

      if (userServices == false) {
        res.json({ messsage: "no availed services / error" });
      }

      if (userServices) {
        res.json(userServices);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getSalonAvailedServices(req, res, nex) {
    try {
      let salonServices = await availedService.getSalonAvailedServices(
        req.body.id
      );

      if (salonServices == false) {
        res.json({ messsage: "no availed services / error" });
      }

      if (salonServices) {
        res.json(salonServices);
      }
    } catch (error) {
      console.log(error);
    }
  }
};
