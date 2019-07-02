const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://18.8.0.1:27017/publibike", { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => console.log("MongoDB database connection established successfully"));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
