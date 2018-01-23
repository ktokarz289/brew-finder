var config = require("../config");
var Client = require("node-rest-client").Client;
var client = new Client();

var brewery = {};

function getBrewery (breweryName, app) {
    answer = "I couldn't find that brewery";
    console.log("The api key is: " + config.breweryApiKey);
    client.get(config.breweryBaseUrl + "search?key=" + config.breweryApiKey + "&type=brewery&q=" + breweryName,
    function(data, response) {
        client.get(config.breweryBaseUrl + "brewery/" + data.data[0].id + "/beers?key=" + config.breweryApiKey, function(beers, response) {
          if (beers) {
            var randomStartingIndex = beers.data.length > 5 ? Math.floor(Math.random() * (beers.data.length - 5)) : 0;
            var beerList = [];
            for(i = randomStartingIndex; i < randomStartingIndex + 5; i++) {
              beerList[i - randomStartingIndex] = beers.data[i].name;
            }

            answers = "Here are a few beers made by " + breweryName + ". " + beerList.join();
            app.tell(answers);
          }
        });
    });
}

function getBreweryNearLocation(cityName, stateName, app) {
  var url = config.breweryBaseUrl + "locations?locality=" + cityName;

  if (stateName) {
    url += "&region=" + stateName;
  }

  url += "&key=" + config.breweryApiKey;

  client.get(url, function(breweries, response) {
    if (breweries) {
      let answer = "I couldn't find any breweries in that area";
      var randomStartingIndex = breweries.data.length > 5 ? Math.floor(Math.random() * (breweries.data.length - 5)) : 0;
      var breweryList = [];

      for (i = randomStartingIndex; i < randomStartingIndex + 5; i++) {
        breweryList[i - randomStartingIndex] = breweries.data[i].name;
      }

      answer = "A few breweries in that location are " + breweryList.join();
      app.tell(answer);
    }
  });
}

function getBeerAvailability(beerName, app) {
  var beerUrl = config.breweryBaseUrl + "beers?key=" + config.breweryApiKey + "&name=" + beerName;

  client.get(beerUrl, function(beer, response) {
    if (beer) {
      let answer = beerName + " is listed as " + beer.data[0].available.description;
      app.tell(answer);
    }
  });
}

exports.getBrewery = getBrewery;
exports.getBreweryNearLocation = getBreweryNearLocation;
exports.getBeerAvailability = getBeerAvailability;
