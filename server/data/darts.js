const { Matches } = require('../models');

getDartsData();

function getDartsData() {
    let url = `https://flashlive-sports.p.rapidapi.com/v1/tournaments/fixtures?page=1&locale=en_INT&tournament_stage_id=r7BigtDj`;
    fetch(url, { 
        method: 'get', 
        headers: new Headers({'x-rapidapi-key': '09f4113fc5msh6db36870ab7f5edp1cd1a7jsn536efd4bba29'})
    }).then(response => response.json())
        .then(data => {
            organiseData(data);
        })
        .catch(error => {
            // Handle the error
            console.log("Error in afl/fetch() - " + url + error);
        });
}


function organiseData(data){
    let data = data.DATA[0].EVENTS;
    let count = data.length;
    for(let i = 0; i < count; i++) {
        thisMatch = data[i];

        let match = {"sport": "AFL"};
        match.dateUnix = thisMatch.timestamp;
        match.date = new Date(thisMatch.timestamp * 1000).toISOString();
        match.date = match.date.slice(0,19) + "Z";
        match.competition = "AFL";
        match.highlights = "";
        match.endDate = thisMatch.timestamp + 7200;

        if(thisMatch.teams.home.name == null){
            match.homeTeam = "TBD";
        }
        else {match.homeTeam = thisMatch.teams.home.name;}

        if(thisMatch.teams.away.name == null){
            match.awayTeam = "TBD";
        }
        else {match.awayTeam = thisMatch.teams.away.name;}

        match.matchId = thisMatch.game.id;

        if (thisMatch.status.short === "FT"){
            match.completed = "1";
        }
        else {
            match.completed = "0";
        }
        match.score = null;
        match.minute = null;

        try{
            Matches.create(match)
                .then()
                .catch(err => {
                    Matches.update(
                        {
                            competition: match.competition,
                            homeTeam: match.homeTeam,
                            awayTeam: match.awayTeam,
                            date: match.date,
                            dateUnix: match.dateUnix,
                            completed: match.completed,
                            score: match.score,
                            minute: match.minute,
                            highlights: match.highlights
                        },
                        {where: {matchId: match.matchId.toString()}}
                    ).then()
                      .catch(err => console.log("Error in afl/organiseData()\n" + err))
                })
        }
        catch (error){
            console.log("Error in darts/organiseData() \n" + error);
        }
        
      }
}

module.exports = getDartsData;