function questionsICanAnswer(app) {
    let answer = "I can answer a few questions about beer." + 
        "You can try saying things like list beers from Atwater Brewery," + 
        + "Name breweries in Detroit, Michigan, or when is Vanilla Java Porter available."
    app.ask(answer);
}

exports.questionsICanAnswer = questionsICanAnswer;