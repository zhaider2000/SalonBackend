"use strict";
const sellProductService = require("../Services/product_sell_service");
const salonModel = require("../Services/salon_service");
const userService = require("../Services/user_service");

module.exports = class AvailedServic {
  static async sellProdcut(req, res, next) {
    try {
      console.log("here at sell product");
      const { salon, user, products, quantities } = req.body;

      let newSoldProdcut = await sellProductService.soldProduct(req.body);

      if (newSoldProdcut == true) {
        console.log(salon, user, products, quantities);
        res.json({ messsage: "sucess" });
        const salonInfo = await salonModel.getSalonById(salon);
        if (salonInfo) {
          console.log(salonInfo);
        } else {
          console.log({ message: "No salon exist" });
        }
        console.log("SalonName", salonInfo.name);
        console.log(salonInfo);
        let userr = await userService.getUser(user);
        console.log("USER", userr);
        console.log("USER", userr.email);
        let data = await sellProductService.getProductEmailDetail(req.body);
        console.log("check", data);
        await sendProductEmail(user.email, "123");
      }

      if (newSoldProdcut == false) {
        res.json({ messsage: "fail" });
        await sendProductEmail(user.email, "123");
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
