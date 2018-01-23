'use strict';
const functions = require("firebase-functions");
const DialogflowApp  = require('actions-on-google').DialogflowApp;

exports.brewFinder = functions.https.onRequest((req, res) => {
  const app = new DialogflowApp({request: req, response: res});
  var brewery = require("./controllers/brewery");
  var instructions = require("./controllers/instructions");

  const WELCOME_INTENT = 'input.welcome';
  const GET_BEER = "input.get_beer";
  const GET_LOCATION = "input.get_breweries";
  const GET_AVAILABILITY = "input.get_availability";
  const QUESTIONS = "input.questions_I_can_answer";
  
  function welcomeIntent(app) {
    app.ask('Welcome to Brew Find! Say a brewery or beer.');
  }

  function getBreweryBeer(app) {
    let userBrewery = app.getArgument("brewery");
    console.log("The user brewery is: " + userBrewery);
    brewery.getBrewery(userBrewery, app);
  }

  function getBreweryNearLocation(app) {
    let locality = app.getArgument("city");
    let region = app.getArgument("state");

    brewery.getBreweryNearLocation(locality, region, app);
  }

  function getBeerAvailability(app) {
    let beerName = app.getArgument("beer");

    brewery.getBeerAvailability(beerName, app);
  }

  function questionsICanAsk(app) {
    instructions.questionsICanAnswer(app);
  }

  let actionMap = new Map();
  actionMap.set(WELCOME_INTENT, welcomeIntent);
  actionMap.set(GET_BEER, getBreweryBeer);
  actionMap.set(GET_AVAILABILITY, getBeerAvailability);
  actionMap.set(GET_LOCATION, getBreweryNearLocation)
  actionMap.set(QUESTIONS, questionsICanAsk);

  app.handleRequest(actionMap);
});