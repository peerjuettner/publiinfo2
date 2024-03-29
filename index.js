const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const Data = require("./Schema");
const path = require("path")
require("dotenv").config()


const API_PORT = process.env.PORT || 5000;
const app = express();
const router = express.Router();


app.use(express.static(path.join(__dirname, "frontend", "build")))

// this is our MongoDB database
const dbRoute = process.env.MONGODB_CONNECTION || "mongodb://10.8.0.1:27017/publibike";

// connects our back end code with the database
mongoose.connect(dbRoute, {
  useNewUrlParser: true
});

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Returns stations
router.get("/stations", (req, res) => {
  Data.m_station.find((err, data) => {
    if (err)
      return res.json({
        error: err
      });
    return res.json(data);
  });
});

// Returns bikes at a given station
// id: id of a given station
router.get("/station/bikes/:id", (req, res) => {
  const id = req.params.id;
  Data.m_bike.find({
    station: id
  }, (err, data) => {
    if (err) return res.json({
      success: false,
      error: err
    });
    return res.json(
      data);
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));