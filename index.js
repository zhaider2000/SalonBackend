const express = require("express");
require("./db_integration");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 3000;

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use(require("./Apis/Routes/salon_route"));
app.use(require("./Apis/Routes/user_route"));
app.use(require("./Apis/Routes/salon_service_route"));
app.use(require("./Apis/Routes/availed_service_route"));
app.use(require("./Apis/Routes/reviews_route"));
app.use(require("./Apis/Routes/product_route"));
app.use(require("./Apis/Routes/notification_route"));
app.use(require("./Apis/Routes/admin_route"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
