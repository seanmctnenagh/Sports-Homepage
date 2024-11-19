const { Matches } = require('../models');

function getNHLData() {

    let today = new Date();
    let day = ("0" + today.getDate()).slice(-2)
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let year = today.getFullYear();

    let date = year + '-' + month + '-' + day;

    for(let i = 0; i < 7; i++) {
        fetch(`https://v1.hockey.api-sports.io/games?date=${date}&league=57&season=2024`, { 
            method: 'get', 
            headers: new Headers({'x-rapidapi-key': '90ff826b72e0b865ca8281b84d41c423'})
        })
            .then(response => response.json())
            .then(data => {
                organiseData(data);
            })
            .catch(error => {
                console.log("Error" + error);
            });

        let nextDay = new Date(Date.now() + (864e5 * (i+1))); //864e5
        
        day = ("0" + nextDay.getDate()).slice(-2);
        month = ("0" + (nextDay.getMonth() + 1)).slice(-2);
        year = nextDay.getFullYear();
    
        nextDay = year + '-' + month + '-' + day;
    
        date = nextDay;
    }
}


function organiseData(data){
    let count = data.results;

    for(let i = 0; i < count; i++) {
        thisMatch = data.response[i];

        let match = {"sport": "Hockey"};
        match.dateUnix = thisMatch.timestamp;
        match.date = thisMatch.date.split("+")[0] + "Z";
        match.competition = thisMatch.league.name;
        match.homeTeam = thisMatch.teams.home.name;
        match.awayTeam = thisMatch.teams.away.name;
        match.matchId = thisMatch.id;
        match.endDate = match.dateUnix + 10800;
        
        if (thisMatch.status.short == "FT"){
            match.completed = true;
        }
        else {
            match.completed = false;
        }

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
                      .catch(err => console.log(err))
                })
        }
        catch (error){
            console.log(`Error in NHL - organiseData(): ${error.errno}`);
        }
        
      }
}

module.exports = getNHLData;