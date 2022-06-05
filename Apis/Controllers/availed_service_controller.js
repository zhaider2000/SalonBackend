"use strict";

const availedService = require("../Services/availed_service_service");
const https = require("https");
module.exports = class AvailedServic {
  static async createAvailedService(req, res, next) {
    try {
      let newAvailedService = await availedService.createAvailedService(
        req.body
      );

      if (newAvailedService == true) {
        res.json({ messsage: "sucess" });
        https.get(
          "https://shielded-fortress-42931.herokuapp.com/SendNotification"
        );
      }

      if (newAvailedService == false) {
        res.json({ messsage: "fail" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserAvailedServices(req, res, nex) {
    try {
      console.log("userr", req.query.id);

      let userServices = await availedService.getUserAvailedServices(
        req.query.id,
        req.query.filter
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
      console.log("salon", req.query.id);
      console.log(req.query.id, req.query.filter);
      let salonServices = await availedService.getSalonAvailedServices(
        req.query.id,
        req.query.filter
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

  static async endActiveService(req, res, nex) {
    try {
      console.log(req.body.id);
      let salonServices = await availedService.finishTheActiveService(
        req.body.id
      );

      if (salonServices == true) {
        res.json({ messsage: "service is finished" });
      } else {
        res.json({ messsage: "fail" });
      }
    } catch (error) {
      console.log(error);
    }
  }
};
