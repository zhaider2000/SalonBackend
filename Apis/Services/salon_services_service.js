const serviceModel = require("../../Models/salon_services");

module.exports = class ServicesService {
  static async createService(body) {
    try {
      const { salon, name, description, duration, amount } = body;

      console.log(salon, name, description, duration, amount);

      let newService = new serviceModel({
        salon,
        name,
        description,
        duration,
        amount,
      });

      await newService.save();

      return true;
    } catch (error) {
      return false;
    }
  }

  static async getServices(id) {
    try {
      console.log(id);
      console.log("here at services");
      let services = await serviceModel
        .find({
          $and: [{ salon: id }, { Status: "Active" }],
        })
        .populate("salon", { name: 1, city: 1, address: 1 });
      console.log("services:=", services);
      if (services.length != 0) {
        return services;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  static async getActiveServices(id) {
    try {
      console.log(id);

      let services = await serviceModel.find({
        $and: [{ salon: id }, { Status: "Active" }],
      });

      if (services.length != 0) {
        return services;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  static async getDropServices(id) {
    try {
      console.log(id);

      let services = await serviceModel.find({
        $and: [{ salon: id }, { Status: "Drop" }],
      });

      if (services.length != 0) {
        return services;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  static async dropService(id) {
    try {
      console.log(id);

      let services = await serviceModel.findOneAndUpdate(
        { _id: id },
        { Status: "Drop" }
      );

      if (services) {
        return services;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  static async activeService(id) {
    try {
      console.log(id);

      let services = await serviceModel.findOneAndUpdate(
        { _id: id },
        { Status: "Active" }
      );
      console.log(services);
      if (services) {
        return services;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  static async updateService(data) {
    try {
      let id = data._id;
      console.log(data.address);
      console.log(id);

      const serviceUpdate = await serviceModel.findByIdAndUpdate(
        { _id: id },
        {
          name: data.name,
          description: data.description,
          amount: data.amount,
          duration: data.duration,
        }
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  static async deleteService(data) {
    try {
      console.log(data, "deleteee");
      const deleteSalon = await serviceModel.deleteMany({ _id: data._id });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
};
