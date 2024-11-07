const { Matches } = require('../models');

function getRugbyData() {
    
    // Ireland
    let year = new Date(Date.now()).getFullYear().toString();
    fetch('https://v1.rugby.api-sports.io/games?team=388&season='+year, { 
        method: 'get', 
        headers: new Headers({'x-rapidapi-key': '90ff826b72e0b865ca8281b84d41c423'})
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        organiseData(data);
    })
    .catch(error => {
        // Handle the error
        console.log("Error" + error);
    });

    fetch('https://v1.rugby.api-sports.io/games?team=408&season='+year, { 
        method: 'get', 
        headers: new Headers({'x-rapidapi-key': '90ff826b72e0b865ca8281b84d41c423'})
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        organiseData(data);
    })
    .catch(error => {
        // Handle the error
        console.log("Error" + error);
    });

    if(new Date(Date.now()).getMonth() == 11){
        year = new Date(Date.now()).getFullYear() + 1;
        year = year.toString();
        fetch('https://v1.rugby.api-sports.io/games?team=388&season='+year.toString(), { 
            method: 'get', 
            headers: new Headers({'x-rapidapi-key': '90ff826b72e0b865ca8281b84d41c423'})
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            organiseData(data);
        })
        .catch(error => {
            // Handle the error
            console.log("Error" + error);
        });

        fetch('https://v1.rugby.api-sports.io/games?team=408&season='+year.toString(), { 
            method: 'get', 
            headers: new Headers({'x-rapidapi-key': '90ff826b72e0b865ca8281b84d41c423'})
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            organiseData(data);
        })
        .catch(error => {
            // Handle the error
            console.log("Error" + error);
        });
    }
}


function organiseData(data){
    let count = data.results;
    
    for(let i = 0; i < count; i++) {
        thisMatch = data.response[i];

        let match = {"sport": "Rugby"};
        match.dateUnix = thisMatch.timestamp;
        match.date = new Date(thisMatch.timestamp * 1000).toISOString();
        match.date = match.date.slice(0,19) + "Z";
        match.competition = thisMatch.league.name;
        match.homeTeam = thisMatch.teams.home.name;
        match.awayTeam = thisMatch.teams.away.name;
        match.matchId = thisMatch.id;
        match.highlights = "";
        
        if (thisMatch.status.short == "NS"){
            match.completed = false;
        }
        else {
            match.completed = true;
        }
        match.score = null;
        match.minute = null;

        if(match.competition == "United Rugby Championship"){
            match.competition = "URC";
        }
        else if (match.competition == "European Rugby Champions Cup") {
            match.competition = "Champions Cup";
        }
        else if (match.competition == "Friendly International") {
            match.competition = "Friendly";
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
            console.log(error.errno);
        }
        
      }
}

module.exports = getRugbyData;