const AdminModel = require("../../Models/admin.js");
const bcrypt = require("bcrypt");

module.exports = class AdminService {
  static async createAdmin(data) {
    try {
      console.log(data);
      const userexist = await AdminModel.findOne({ email: data.email });
      if (userexist) {
        console.log("here at email exist");
        return { message: "Email Already Exist" };
      } else {
        let passwordHash = await bcrypt.hash(data.password, 10);
        let confirmhash = await bcrypt.hash(data.confirm, 10);

        const newAdmin = {
          name: data.name,
          email: data.email,
          password: passwordHash,
          confirm: confirmhash,
          phone: data.phone,
          work: data.work,
        };

        const response = await new AdminModel(newAdmin).save();
        return { message: "Registered Sucessfully" };
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async loginAdmin(Email, Password) {
    try {
      // const response = await AdminModel.findOne({ email: Email });

      let adminObject = await AdminModel.findOne({ email: Email });

      if (adminObject) {
        const match = await bcrypt.compare(Password, adminObject.password);

        if (match) {
          console.log(adminObject);
          return adminObject;
        }
        if (!match) {
          console.log(adminObject);
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log(`user not found. ${error}`);
    }
  }
};
