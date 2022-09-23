const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();

const port = process.env.port || 3000;

app.use(cors());
app.options("*", cors());
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
