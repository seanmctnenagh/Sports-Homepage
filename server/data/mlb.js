const { Matches } = require('../models');

function getMLBData() {

    let today = new Date();
    let day = ("0" + today.getDate()).slice(-2)
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let year = today.getFullYear();

    let date = year + '-' + month + '-' + day;

    for(let i = 0; i < 7; i++) {
        fetch(`https://v1.baseball.api-sports.io/games?date=${date}`, { 
            method: 'get', 
            headers: new Headers({'x-rapidapi-key': '90ff826b72e0b865ca8281b84d41c423'})
        })
            .then(response => response.json())
            .then(data => {
                // Do something with the data
                // "errorCode": 429 == Too many requests
                organiseData(data);
            })
            .catch(error => {
                // Handle the error
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

        if (thisMatch.league.id != 1) {
            continue;
        }

        // let teamIds = [
        //     12, // Detroit Tigers
        //     15, // Houston Astros
        //     16, // KC Royals
        //     4,  // Baltimore Orioles
        //     20,//  Milwaukee Brewers
        //     30, // San Diego Padres
        //     27, // Philadelphia Phillies
        //     9,  // Cleveland Indians
        //     25, // NY Yankees
        //     18, // LA Dodgers
        //     24, // NY Mets
        //     3,  // Atlanta Braves
        //     2,  // Arizona Diamondbacks
        // ]

        // if (!(teamIds.includes(thisMatch.teams.home.id)) && !(teamIds.includes(thisMatch.teams.away.id))){
        //     continue;
        // }

        let match = {"sport": "Baseball"};
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
            console.log(`Error in MLB - organiseData(): ${error.errno}`);
        }
        
      }
}

module.exports = getMLBData;