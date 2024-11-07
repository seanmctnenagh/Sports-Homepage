const { Matches } = require('../models');

// function getAFLData() {

//     fetch('https://api.squiggle.com.au/?q=games;complete=!100', { 
//     // fetch('https://api.squiggle.com.au/?q=games;game=35907', { 
    
//         method: 'get', 
//         // headers: new Headers({'x-rapidapi-key': '90ff826b72e0b865ca8281b84d41c423'})
//     }).then(response => response.json())
//         .then(data => {
//             organiseData(data);
//         })
//         .catch(error => {
//             // Handle the error
//             console.log("Error" + error);
//         });
// }

function getAFLData() {

    let today = new Date();
    let day = ("0" + today.getDate()).slice(-2)
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let year = today.getFullYear();

    today = year + '-' + month + '-' + day;

    let date = today;


    for(let i = 0; i < 7; i++) {
        let url = `https://v1.afl.api-sports.io/games?date=${date}&league=1&season=${year}`;
        fetch(url, { 
            method: 'get', 
            headers: new Headers({'x-rapidapi-key': '90ff826b72e0b865ca8281b84d41c423'})
        }).then(response => response.json())
            .then(data => {
                organiseData(data);
            })
            .catch(error => {
                // Handle the error
                console.log("Error in afl/fetch() - " + url + error);
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
            console.log("Error in afl/organiseData() \n" + error);
        }
        
      }
}

module.exports = getAFLData;