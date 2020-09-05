const path = require("path");
const hbs = require("hbs");
const express = require("express");
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express();

// define paths for express config
const pathViews = path.join(__dirname, "../templates/views");
const publicDirectoryPath = path.join(__dirname, "../public");
const partialPath = path.join(__dirname, "../templates/partials");

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

//set up handle bars engine and views location
app.set("view engine", "hbs");
app.set("views", pathViews);
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Shubham",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Shubham",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Weather help",
    name: "Shubham",
    subject: "Get the weather related help here",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You need to provide the address search term",
    });
  }

  geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({error});
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error});
      }
      res.send({
        Location: location,
        Forecast: forecastData,
        Address: req.query.address,
      });
   
    });
  });

 
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404 help",
    name: "Shubh",
    error: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Shubham",
    error: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is starting on port 3000");
});

// app.com
// app.com/app
// app.com/about
// app.com/weather
