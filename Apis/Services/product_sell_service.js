"use strict";

const sellProdcutModel = require("../../Models/product_sell");
const prodcuctModel = require("../../Models/prodcut");

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
      let total = 0;
      let Quantity = 0;

      for (let i = 0; i < products.length; i++) {
        let newObj = { productId: products[i], productQuantity: quantities[i] };
        prodcuctQuantityPairs.push(newObj);
      }
      for (let i = 0; i < quantities.length; i++) {
        Quantity = Quantity + quantities[i];
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
      // let newSellProduct=new sellProdcutModel({salon,user,product:products,date,quantity:quantities,total})

      // await newSellProduct.save()

      return { total, productsNames, Quantity };
    } catch (error) {
      return false;
    }
  }
};
