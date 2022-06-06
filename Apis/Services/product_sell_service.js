"use strict";

const sellProdcutModel = require("../../Models/product_sell");
const prodcuctModel = require("../../Models/prodcut");
const userService = require("../Services/user_service");
const salonModel = require("../Services/salon_service");
const sendProductEmail = require("../../email_verification");

module.exports = class sellProdctServices {
  static async getProdcutQuantity(id) {
    try {
      const product = await prodcuctModel.findById(id);

      console.log(product);

      return product.quantity;
    } catch (error) {
      console.log(error);
    }
  }

  static async getProdcutPrice(id) {
    try {
      const product = await prodcuctModel.findById(id);

      console.log(product);

      return [product.price, product.name];
    } catch (error) {
      console.log(error);
    }
  }

  static async soldProduct(body) {
    try {
      console.log("here at sell product service");

      const { salon, user, products, quantities } = body;

      console.log(salon, user, products, quantities);

      let prodcuctQuantityPairs = [];
      let productsNames = [];
      let total = 0;

      for (let i = 0; i < products.length; i++) {
        let newObj = { productId: products[i], productQuantity: quantities[i] };
        prodcuctQuantityPairs.push(newObj);
      }

      console.log(prodcuctQuantityPairs);

      for (let productQuantityPair of prodcuctQuantityPairs) {
        const prodcuctQuantity = await this.getProdcutQuantity(
          productQuantityPair.productId
        );

        if (prodcuctQuantity >= productQuantityPair.productQuantity) {
          const [prodcuctPrice, productName] = await this.getProdcutPrice(
            productQuantityPair.productId
          );
          productsNames.push(productName);
          total = total + prodcuctPrice * productQuantityPair.productQuantity;
        }
      }

      let date = new Date();

      console.log("products name", productsNames);
      let newSellProduct = new sellProdcutModel({
        salon,
        user,
        product: products,
        date,
        quantity: quantities,
        total,
      });

      await newSellProduct.save();

      return true;
    } catch (error) {
      return false;
    }
  }

  static async getUserAvailedServices(uid) {
    try {
      console.log("here at availed");

      let getServices = await availed.find({ users: uid }).populate([
        {
          path: "users",
          select: ["name", "phone"],
        },
        {
          path: "salons",
          select: ["name"],
        },
        {
          path: "services",
        },
      ]);

      console.log(getServices);

      if (getServices.length == 0) {
        return false;
      }

      if (getServices.length != 0) {
        return getServices;
      }
    } catch (error) {
      return false;
    }
  }

  static async getSalonAvailedServices(id) {
    try {
      console.log("here at availed");

      let getServices = await availed.find({ salons: id }).populate([
        {
          path: "users",
          select: ["name", "phone"],
        },
        {
          path: "salons",
          select: ["name"],
        },
        {
          path: "services",
        },
      ]);

      console.log(getServices);

      if (getServices.length == 0) {
        return false;
      }

      if (getServices.length != 0) {
        return getServices;
      }
    } catch (error) {
      return false;
    }
  }
  static async getProductEmailDetail(body) {
    try {
      console.log("here at sell product service");

      const { salon, user, products, quantities } = body;

      console.log(salon, user, products, quantities);

      let prodcuctQuantityPairs = [];
      let productsNames = [];
      let productQunat = [];
      let outOfQuant = [];
      let total = 0;

      for (let i = 0; i < products.length; i++) {
        let newObj = { productId: products[i], productQuantity: quantities[i] };
        prodcuctQuantityPairs.push(newObj);
      }

      console.log(prodcuctQuantityPairs);

      for (let productQuantityPair of prodcuctQuantityPairs) {
        const prodcuctQuantity = await this.getProdcutQuantity(
          productQuantityPair.productId
        );

        if (prodcuctQuantity >= productQuantityPair.productQuantity) {
          const [prodcuctPrice, productName] = await this.getProdcutPrice(
            productQuantityPair.productId
          );
          let newQuant = prodcuctQuantity - productQuantityPair.productQuantity;
          await prodcuctModel.findByIdAndUpdate(
            { _id: productQuantityPair.productId },
            { quantity: newQuant }
          );
          productsNames.push(productName);
          productQunat.push(productQuantityPair.productQuantity);
          total = total + prodcuctPrice * productQuantityPair.productQuantity;
        } else {
          const [prodcuctPrice, productName] = await this.getProdcutPrice(
            productQuantityPair.productId
          );
          outOfQuant.push(productName);
        }
      }

      let date = new Date();

      console.log("products name", productsNames);
      let newSellProduct = new sellProdcutModel({
        salon,
        user,
        product: products,
        date,
        quantity: quantities,
        total,
      });

      await newSellProduct.save();

      let sum = 0;

      for (i = 0; i < productQunat.length; i++) {
        sum += productQunat[i];
      }
      const salonInfo = await salonModel.getSalonById(salon);
      let salonEmail = salonInfo.email;
      let salonname = salonInfo.name;
      let userr = await userService.getUser(user);
      let userEmailuserr = userr.email;

      await sendProductEmail(
        userEmailuserr,
        salonname,
        productsNames,
        sum,
        total
      );

      await sendProductEmail(salonEmail, salonname, productsNames, sum, total);

      if (outOfQuant != 0) {
        await sendoutofProductEmail(userEmailuserr, salonname, outOfQuant);
        await sendoutofProductEmail(salonEmail, salonname, outOfQuant);
      }

      return true;
    } catch (error) {
      return false;
    }
  }
};
