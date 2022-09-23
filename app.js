const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();

const port = process.env.port || 3000;

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://greetings-mwan.web.app/"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(
  cors({
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

app.use("/uploads", express.static("uploads")); // accesing image from this folder

/** import route */
const adminRoutes = require("./src/routes/admin.route");
const productRoutes = require("./src/routes/product.route");
const uploadFileRoutes = require("./src/routes/uploadFile.route");

/** admin crud */
app.use("/api/v1/admin", adminRoutes);
/** product crud */
app.use("/api/v1/product", productRoutes);
/** upload file */
app.use("/api/v1/upload", uploadFileRoutes);

app.get("/", (req, res) => {
  res.send("hello..!");
});
app.listen(port, () => {
  console.log(`Express is running in port ${port}`);
});
