const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName
  const apiKey = "77bfa227fa67a68517e3bb1a97845b52";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const { temp } = weatherData.main;
      const { description } = weatherData.weather[0];
      const { icon } = weatherData.weather[0];
      const imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      res.write(`<h1>The temperatures in ${query}  ${temp} degrees Celcius </h1>`);
      res.write(`<p>The weater is currently ${description}</p>`);
      res.write(`<img src=${imgUrl}>`);
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
