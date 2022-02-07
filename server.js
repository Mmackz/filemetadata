// required modules
const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const app = express();

// setup enviroment variables
require("dotenv").config();

// app configuration
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));
const upload = multer(); 

// routes
app.get("/", function (req, res) {
   res.sendFile(path.join(__dirname, "views/index.html"));
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res, next) => {
   const { originalname: name, mimetype: type, size } = req.file;
   res.json({ name, type, size });
});

// server activation
const port = process.env.PORT || 3000;
app.listen(port, function () {
   console.log("Your app is listening on port " + port);
});
