
const express = require("express");

const app = express();

const https = require("https");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile( __dirname + "/index.html");
});

app.post("/", function(req,res){
  const query= req.body.CityName;
  const apiKey = "74d8f5d5ff1597054e36a85a632c9911";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData= JSON.parse(data);
      const temp= weatherData.main.temp;
      const description= weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently "+ description + "</p>");
      res.write("<h1>The temerature in " + query + " is"+ temp + " degreecelsius</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });

  });

});







app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
