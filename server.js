var express = require('express');
var path = require('path');
var multer = require('multer');
// var db = require('./database')
const bcrypt = require('bcrypt');
const PORT = 8080;
const { MongoClient, ServerApiVersion } = require('mongodb');
var uri = "mongodb+srv://kahn12345678:bgq1SWVHF5PCM3Cs@learnzalominiapp.8lblt3y.mongodb.net/?retryWrites=true&w=majority";

var app = express();
app.listen(process.env.PORT || PORT, function() {
	console.log(`started listen port ${PORT}`);
});
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var cors = require("cors")
app.use(cors());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/api/get-request-content',async (req,res) => {
  try{
    await client.connect();
    client.db("ZaloMiniApp").collection("MaKhachHang").find().toArray((err,result)=>{
      if(err) throw err
      res.send({result})
    })
  }
  catch{
    res.send("Failed")
  }
})

app.post('/api/post-request-content',async (req,res) => {
  try{
    await client.connect();
    client.db("ZaloMiniApp").collection("YeuCau").insertOne(req.body,(err)=>{
      if(err) throw err
      res.send({status:"success",message: "Gửi yêu cầu thành công!"})
    })
  }
  catch{
    res.send({status:"fail",message: "Gửi yêu cầu thất bại!"})
  }
})

// async function run() {
//   try {
//     await client.connect();
//     await client.db("ZaloMiniApp").collection("MaKhachHang").insertMany([
//       {"MaKH" : "TES","CongTy": "TES"},
//       {"MaKH" : "Test","CongTy": "Công ty cổ phần VnPAY"},
//       {"MaKH" : "TKI","CongTy": "Công ty cổ phần Tiki"},
//       {"MaKH" : "TKL","CongTy": "Công ty cổ phần Intellife"},
//       {"MaKH" : "TNC","CongTy": "T&C Logistics"},
//       {"MaKH" : "TTT","CongTy": "TTT"},
//       {"MaKH" : "TUT","CongTy": "Test Client"},
//       {"MaKH" : "UBL","CongTy": "Công ty cổ phần Umbala Vietnam"},
//       {"MaKH" : "UNC","CongTy": "Công ty TNHH đầu tư thương mại"},
//       {"MaKH" : "UNI","CongTy": "Công ty TNHH quốc tế Unilever Việt Nam"},
//       {"MaKH" : "VCC","CongTy": "Công ty Cổ phần Cacao Việt Nam"},
//     ])
//   } finally {
//     await client.close();
//   }
// }
// run();