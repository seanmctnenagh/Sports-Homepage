const { Matches } = require('../models');

function manual(){
    let match = {
        "sport" : "Soccer",
        "competition" : "PL",
        "matchId" : "120858",
        "date" : "2024-09-15T16:00:00Z",
        "dateUnix" : "1726498800",
        "homeTeam" : "Spurs",
        "awayTeam" : "Arsenal",
        "completed" : 1,
        "score" : "0-1",
        "minute" : null,
        "highlights" : null,
        "flashscore" : null,
        "endDate" : "1726509600000"
    }

    Matches.create(match)
}



module.exports = manual;