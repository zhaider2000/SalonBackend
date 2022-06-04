"use strict";
const AdminService = require("../Services/admin_service.js");

module.exports = class Admin {
  static async create_admin(req, res, next) {
    try {
      console.log(req.body);
      console.log("body");

      let check = false;
      const { name, email, password, confirm, phone, work } = req.body;

      if (!name || !email || !password || !confirm || !phone || !work) {
        check = true;
        res.json({ message: "Fill The Full Form" });
      }
      if (password !== confirm) {
        check = true;
        res.json({ message: "Confirm Password Dosen't Match" });
      }
      // const Adminexist = await Admin.findOne({ email: email });
      // if (Adminexist) {
      //   check = true;
      //   res.json({ message: "Email Already Exist" });
      // }

      if (check === false) {
        console.log("here at saving");
        const createdAdmin = await AdminService.createAdmin(req.body);
        res.json(createdAdmin);
        // res.json({ message: "Registered Sucessfully" });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async login_admin(req, res, next) {
    try {
      let { email, password } = req.body;

      if (!email || !password) {
        res.json({ message: "Fill The Full Form" });
      } else {
        const match = await AdminService.loginAdmin(email, password);
        if (match) {
          res.json({ message: "loggin succesfully" });
        }
        if (!match) {
          res.json({ message: "Invalid Credentials" });
        }
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
};
