const express = require("express");
require("./db_integration");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();
const PORT = process.env.PORT || 3000;
const multer = require("multer");
const path = require("path");
const productModel = require("./Models/prodcut");
const portfolioModel = require("./Models/portfolio");
const salonModel = require("./Models/salon");

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },

  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

var upload = multer({ storage: storage });

app.use(require("./Apis/Routes/salon_route"));
app.use(require("./Apis/Routes/user_route"));
app.use(require("./Apis/Routes/salon_service_route"));
app.use(require("./Apis/Routes/availed_service_route"));
app.use(require("./Apis/Routes/reviews_route"));
app.use(require("./Apis/Routes/product_route"));
app.use(require("./Apis/Routes/product_sell_route"));
app.use(require("./Apis/Routes/notification_route"));

app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/upload", upload.single("myFile"), async (req, res, next) => {
  const file = req.file;
  console.log("at file");
  const { name, price, id, quantity } = req.body;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next("hey error");
  }

  const imagepost = new productModel({
    salon: id,
    price: parseInt(price),
    quantity: parseInt(quantity),
    name: name,
    image: file.path,
  });

  const savedimage = await imagepost.save();
  res.json(savedimage);
});

app.post("/salon", upload.single("myFile"), async (req, res, next) => {
  const file = req.myFile;
  // console.log(file.filename);
  console.log("at file");
  const {
    name,
    city,
    address,
    password,
    email,
    category,
    maps,
    gender,
    myFile,
  } = req.body;
  console.log(req.myFile);
  let emailExist = await salonModel.find({ email: email });
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next("hey error");
  }
  if (emailExist.length != 0) {
    return "salon with this email exist";
  } else {
    let passwordHash = await bcrypt.hash(password, 10); //hash the password

    const newSalon = new salonModel({
      name: name,
      city: city,
      address: address,
      password: passwordHash,
      email: email,
      category: category,
      maps: maps,
      gender: gender,
      image: file.path,
    });
    const savedsalon = await newSalon.save();
    res.json(savedsalon);
    res.json({ message: "success" });
  }
});

app.post("/updateProduct", upload.single("myFile"), async (req, res, next) => {
  try {
    const file = req.file;
    console.log("at file");
    console.log(req.body);
    let { name, price, id, quantity } = req.body;
    console.log("data:", name, price, id, quantity);
    price = parseInt(price);
    quantity = parseInt(quantity);
    let savedImage = "";
    if (!file) {
      console.log("no image found");
      savedImage = await productModel.findByIdAndUpdate(
        { _id: id },
        {
          name: name,
          price: price,
          quantity: quantity,
        }
      );
    } else {
      console.log("image found");
      savedImage = await productModel.findByIdAndUpdate(
        { _id: id },
        {
          name: name,
          price: price,
          quantity: quantity,
          image: file.path,
        }
      );
    }
    res.json(savedImage);
  } catch (error) {
    console.log(error);
    res.json({ message: "fail" });
  }
});

app.post(
  "/updatePortfolio",
  upload.single("myFile"),
  async (req, res, next) => {
    try {
      const file = req.file;
      console.log("at file");
      console.log(req.body);
      let { name, id, description } = req.body;
      console.log("data:", name, id, description);
      let savedImage = "";
      if (!file) {
        console.log("no image found");
        savedImage = await portfolioModel.findByIdAndUpdate(
          { _id: id },
          {
            name: name,
            description: description,
          }
        );
      } else {
        console.log("image found");
        savedImage = await portfolioModel.findByIdAndUpdate(
          { _id: id },
          {
            name: name,
            description: description,
            image: file.path,
          }
        );
      }
      res.json(savedImage);
    } catch (error) {
      console.log(error);
      res.json({ message: "fail" });
    }
  }
);

app.post("/Portfolio", upload.single("myFile"), async (req, res, next) => {
  const file = req.file;
  console.log("at file");
  const { name, id, description } = req.body;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next("hey error");
  }

  const imagepost = new portfolioModel({
    salon: id,
    description: description,
    name: name,
    image: file.path,
  });

  const savedimage = await imagepost.save();
  res.json(savedimage);
});

app.get("/Portfolio", async (req, res, next) => {
  try {
    console.log("here at portfolio");

    let id = req.query.id;

    let portfolio = await portfolioModel.find({ salon: id });

    console.log(portfolio);

    if (portfolio.length != 0) {
      res.json(portfolio);
    } else {
      res.json({ message: "fail" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "fail" });
  }
});

app.get("/image", async (req, res) => {
  const image = await model.find();
  res.json(image);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
// app.listen(process.env.port || 5000);
const server = http.createServer(app).listen(PORT, () => {
  console.log("Server is running at", { PORT });
});
