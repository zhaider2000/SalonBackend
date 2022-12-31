"use strict";
const salonModel = require("../Services/salon_service");
const sendEmail = require("../../email_verification");
const sendReqEmail = require("../../email_request");
const http = require("http");
module.exports = class Account {
  static async createSalon(req, res, next) {
    try {
      console.log(req.body);

      const newSalon = await salonModel.createSalon(req.body);

      if (newSalon == "salon with this email exist") {
        res.json({ message: "salon with this email exist" }); // check with email exist
      }

      if (newSalon == true) {
        res.json({ message: "success" });
        await sendEmail(req.body.email, req.body.password);
        //if true salon is created succesfully
      }

      if (newSalon == false) {
        res.json({ message: "fail" }); //if false then any error occured therefore salon is not created
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllSalon(req, res, next) {
    try {
      let allSaloons = await salonModel.getAllSalon();

      res.json(allSaloons);
    } catch (error) {
      console.log(error);
    }
  }

  static async updateSalon(req, res, next) {
    try {
      let updateSalon = await salonModel.updateSalon(req.body);

      console.log(updateSalon);

      if (updateSalon == true) {
        res.json({ message: "succes" });
        http.get("http://localhost:3000/SendNotification");
      } else {
        res.json({ message: "fail" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async loginSalon(req, res, next) {
    try {
      let loginSalon = await salonModel.loginSalon(req.body);

      if (loginSalon == false) {
        res.json({ message: "email/pass incorrect!!" });
      } else {
        res.json(loginSalon);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getSalonNames(req, res, next) {
    try {
      const names = await salonModel.getSalonNames();

      res.json(names);
    } catch (error) {
      console.log(error);
    }
  }

  static async requestSalon(req, res, next) {
    try {
      await sendReqEmail(req.body);
      res.json({
        message:
          "your application has been send to our dept . please wait till it is verified",
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getSalonByCity(req, res, next) {
    try {
      const city = req.query.city;
      const citySalons = await salonModel.getSalonByCity(city);
      if (citySalons.length != 0) {
        res.json(citySalons);
      } else {
        res.json({ message: "No salon exist at this city" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getSalonByGender(req, res, next) {
    try {
      const gender = req.query.gender;
      const city = req.query.city;
      const genderSalons = await salonModel.getSalonByGender(gender,city);
      if (genderSalons.length != 0) {
        res.json(genderSalons);
      } else {
        res.json({ message: "No salon exist for this gender" });
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async getSalonByCategory(req, res, next) {
    try {
      const category = req.query.category;
      console.log(category);
      const categorySalons = await salonModel.getSalonByCategory(category);
      if (categorySalons.length != 0) {
        res.json(categorySalons);
      } else {
        res.json({ message: "No salon exist for this category" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getSalonById(req, res, next) {
    try {
      const salon = req.query.id;
      console.log(salon, "salon id");
      console.log(salon);
      const salonInfo = await salonModel.getSalonById(salon);
      if (salonInfo) {
        res.json(salonInfo);
      } else {
        res.json({ message: "No salon exist" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteSalon(req, res, next) {
    try {
      console.log("mubashir delete:");
      console.log(req.body);

      const updateAccounts = await salonModel.deleteSalon(req.body);
      res.json({ message: "account deleted" });
    } catch (error) {
      res.send("there is error");
    }
  }
  httpGet() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "localhost:3000/SendNotification", false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
  }
};
