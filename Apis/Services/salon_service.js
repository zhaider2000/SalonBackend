const salon = require("../../Models/salon");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const salonModel = require("../../Models/salon");

dotenv.config({ path: "./secrets.env" });

module.exports = class SalonModel {
  static async createSalon(body) {
    try {
      const { name, city, address, password, email, category, maps, gender } =
        body;

      let emailExist = await salon.find({ email: email });

      if (emailExist.length != 0) {
        return "salon with this email exist";
      } else {
        let passwordHash = await bcrypt.hash(password, 10); //hash the password

        let newSalon = new salon({
          name,
          city,
          address,
          password: passwordHash,
          email,
          category,
          maps,
          gender,
        });
        await newSalon.save(); //save the new salon to DB

        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async getAllSalon() {
    try {
      let allSaloons = await salon.find(
        {},
        {
          email: 1,
          name: 1,
          address: 1,
          city: 1,
          maps: 1,
          gender: 1,
          rating: 1,
          category: 1,
        }
      ); //DONT SHOW PASSWORD TO THE HTTP REQS

      return allSaloons;
    } catch (error) {
      return false;
    }
  }

  static async updateSalon(data) {
    try {
      let id = data._id;
      console.log(data.address);
      console.log(id);

      let updateSalon = await salon.findByIdAndUpdate(
        { _id: id },
        {
          name: data.name,
          city: data.city,
          address: data.address,
          email: data.email,
          category: data.category,
          gender: data.gender,
        }
      );
      console.log(updateSalon);

      return true;
    } catch (error) {
      return false;
    }
  }

  static async loginSalon(body) {
    try {
      const { email, password } = body;

      let salonObject = await salon.findOne({ email: email });

      if (salonObject) {
        const match = await bcrypt.compare(password, salonObject.password);

        if (match) {
          console.log(salonObject);
          return salonObject;
        }
        if (!match) {
          console.log(salonObject);
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  static async getSalonNames() {
    try {
      const names = await salonModel.find({}, { name: 1 });
      return names;
    } catch (error) {
      console.log(error);
    }
  }

  static async getSalonByCity(city) {
    try {
      let citySalons = await salon.find(
        { city: city },
        { name: 1, address: 1, rating: 1, city: 1, maps: 1 }
      ); //DONT SHOW PASSWORD TO THE HTTP REQS

      return citySalons;
    } catch (error) {
      console.log(error);
    }
  }
  static async getSalonByCategory(category) {
    try {
      let salons = await salon.find(
        { category: category },
        { name: 1, address: 1, rating: 1 }
      ); //DONT SHOW PASSWORD TO THE HTTP REQS

      return salons;
    } catch (error) {
      console.log(error);
    }
  }
  static async getSalonByGender(gender) {
    try {
      let salons = await salon.find(
        { gender: gender },
        { name: 1, address: 1, rating: 1, gender: 1, maps: 1 }
      ); //DONT SHOW PASSWORD TO THE HTTP REQS

      return salons;
    } catch (error) {
      console.log(error);
    }
  }

  static async getSalonById(id) {
    try {
      let salon = await salonModel.findOne(
        { _id: id },
        { name: 1, address: 1, rating: 1, gender: 1, maps: 1 }
      ); //DONT SHOW PASSWORD TO THE HTTP REQS

      return salon;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteSalon(data) {
    try {
      console.log(data, "deleteee");
      const deleteSalon = await salonModel.deleteMany({ _id: data._id });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
};
