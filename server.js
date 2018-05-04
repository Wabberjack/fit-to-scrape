
// Dependencies
var express = require("express");
var bodyParser = require("body-parser")
var exphbs = require("express-handlebars")
var axios = require('axios')
var cheerio = require('cheerio');
// var mongojs = require("mongojs");

// Initialize Express
var app = express();

var PORT = process.env.PORT || 8080;
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.static("public"));
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}))
app.set("view engine", "handlebars")
// 1. At the root path, send a simple hello world message to the browser
app.get("/", function(req, res) {
  res.render("home");
});
app.get("/about", function(req, res) {
  res.render("about");
});
app.get("/scrape", function(req, res) {


axios.get("http://www.spacex.com").then(function(html) {
  var myarticledata = []
   // console.log('my raw html of SpaceX!!', html );
   var $=cheerio.load(html.data)
   $('.feature-hd').each(function(i,element){
    console.log("this is the element", $(this)['0'].children[1].children[0].children[0].data)
    var href= 'http://www.spacex.com'+ $(this)['0'].children[1].children[0].attribs.href
    console.log('this is href', href)
var myarticleobj = {
  title: $(this)['0'].children[1].children[0].children[0].data,
  href: href
}
 myarticledata.push(myarticleobj)
    // this is the element
   })
   res.json(myarticledata)
})


});


// 2. At the "/all" path, display every entry in the animals collection

// Set the app to listen on port 3000
app.listen(3001, function() {
  console.log("App running on port 3000!");
});
