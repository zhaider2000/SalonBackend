"use strict";
const sellProductService = require("../Services/product_sell_service");
const salonModel = require("../Services/salon_service");
const userService = require("../Services/user_service");
const sendProductEmail = require("../../email_verification");

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
        let salonname = salonInfo.name;
        let userr = await userService.getUser(user);
        let userEmailuserr = userr.email;
        let { total, productsNames, prodcuctQuantityPairs } =
          await sellProductService.getProductEmailDetail(req.body);
        console.log("check1", productsNames);
        console.log("check2", prodcuctQuantityPairs["productQuantity"]);
        await sendProductEmail(
          userEmailuserr,
          salonname,
          productsNames[0],
          prodcuctQuantityPairs,
          total
        );
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
