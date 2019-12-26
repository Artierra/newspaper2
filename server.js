var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
// var db = require("./models");

var PORT = process.env.PORT || 8050;

// Initialize Express
var app = express();
//set -up express router
//require our routes file pass our router object
var router = express.Router();
require("./config/routes")(router);

// Make public a static folder
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");


// Parse request body as JSON
app.use(bodyParser.urlencoded({
    extended: false
}));
// app.use(express.json());
//

app.use(router);

//(node: 9960) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version.To use the new parser, pass option {
////   useNewUrlParser: true} to MongoClient.connect.

//If depoyed use the deployed databse- otherwise use the local mongoHeadlines databse
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// Connect to the Mongo DB
mongoose.connect(db, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("Mongo is connected, something went right");
    }
});


// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});