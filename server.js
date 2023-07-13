var express = require("express");
var path = require("path");
var multer = require("multer");
// var db = require('./database')
const bcrypt = require("bcrypt");
const PORT = 8080;
const { MongoClient, ServerApiVersion } = require("mongodb");
var uri =
  "mongodb+srv://kahn12345678:bgq1SWVHF5PCM3Cs@learnzalominiapp.8lblt3y.mongodb.net/?retryWrites=true&w=majority";

var app = express();
app.listen(process.env.PORT || PORT, function () {
  console.log(`started listen port ${PORT}`);
});
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var cors = require("cors");
const { log } = require("console");
app.use(cors());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/api/get-request-content", async (req, res) => {
  try {
    await client.connect();
    client
      .db("ZaloMiniApp")
      .collection("MaKhachHang")
      .find()
      .toArray((err, result) => {
        if (err) throw err;
        res.send({ result });
      });
  } catch {
    res.send("Failed");
  }
});

app.post("/api/post-request-content", async (req, res) => {
  try {
    await client.connect();
    client
      .db("ZaloMiniApp")
      .collection("YeuCau")
      .insertOne(req.body, (err) => {
        if (err) throw err;
        res.send({ status: "success", message: "Gửi yêu cầu thành công!" });
      });
  } catch {
    res.send({ status: "fail", message: "Gửi yêu cầu thất bại!" });
  }
});

app.post("/api/rpa-uipath", async (req, res) => {
  try {
    await client.connect();
    client
      .db("ZaloMiniApp")
      .collection("UIPath")
      .insertOne(req.body, (err) => {
        if (err) throw err;
        res.send({ status: "success", message: "Gửi yêu cầu thành công!" });
        console.log(req.body);
      });
    // console.log(req.body.autoReponse);
    // console.log(req.body.body);
    // console.log(req.body.subject);
    // console.log(req.body);
    // res.send({ status: "success", message: "Successfully" });
  } catch (err) {
    // res.send({ status: "success", message: "Failure" });
    res.send({ status: "fail", message: "Gửi yêu cầu thất bại!" });
    console.log(err);
  }
});

app.get("/api/rpa-uipath/get", async (req, res) => {
  try {
    await client.connect();
    client
      .db("ZaloMiniApp")
      .collection("UIPath")
      .find()
      .toArray((err, result) => {
        if (err) throw err;
        res.send({ result });
        console.log("Get UIPath Email List Successfully!");
      });
  } catch (err) {
    res.send({ status: "fail", message: "Gửi yêu cầu thất bại!" });
    console.log(err);
  }
});

var storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const maxSize = 10 * 1000 * 1000;

var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      "Error: File upload only supports the " +
        "following filetypes - " +
        filetypes
    );
  },
}).single("image");

app.post("/api/file-upload/post", async (req, res) => {
  try {
    upload(req, res, function (err) {
      if (err) {
        console.log(err);
        res.send({ status: "error", content: "Lỗi khi đăng hình ảnh" });
      } else {
        console.log(req.file);
        res.send({ status: "valid", content: req.file.filename });
      }
    });
    // console.log(req);
    // res.send({ status: "success", message: "Gửi yêu cầu thành công!" });
  } catch (err) {
    res.send({ status: "fail", message: "Gửi yêu cầu thất bại!" });
    console.log(err);
  }
});
