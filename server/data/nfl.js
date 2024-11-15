const { Matches } = require('../models');

function getNFLData() {

    let today = new Date();
    let day = ("0" + today.getDate()).slice(-2)
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let year = today.getFullYear();

    today = year + '-' + month + '-' + day;

    let date = today;


    for(let i = 0; i < 10; i++) {
        fetch(`https://v1.american-football.api-sports.io/games?date=${date}`, { 
            method: 'get', 
            headers: new Headers({'x-rapidapi-key': '90ff826b72e0b865ca8281b84d41c423'})
        }).then(response => response.json())
            .then(data => {
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
        
        let teamIds = [
            // 42,     // Nebraska
            // 47,	    // Illinois
            60,     // Vanderbilt
            // 63,     // Pittsburgh
            69,	    // Tennessee
            78,	    // Penn State
            // 83,	    // Missouri
            103,    // Indiana
            104,    // Colorado
            106,	// Alabama
            107,	// Ohio State
            108,	// Notre Dame
            109,	// Georgia
            110,	// Oregon
            111,    // Texas A&M
            // 114,	// Utah
            // 115,	// Michigan
            // 122,	// USC
            123,	// Miami
            131,	// Ole Miss
            136,    // BYU
            // 145,    // Navy
            // 151,	// Iowa State
            174,    // Kansas State
            177,    // Army
            180,    // Tulane
            188,    // South Carolina
            190,    // SMU
            195,	// Texas
            198,	// Louisville
            201,    // Washington State
            204,    // Boise State
            207,	// LSU
            209,	// Clemson

        ]

        if (!(thisMatch.league.id === 1)){
            if (!(teamIds.includes(thisMatch.teams.home.id)) && !(teamIds.includes(thisMatch.teams.away.id))){
                continue;
            }
        }

        let match = {"sport": "NFL"};
        match.dateUnix = thisMatch.game.date.timestamp
        match.date = thisMatch.game.date.date + "T" + thisMatch.game.date.time + ":00Z";
        if (thisMatch.league.id === 1){
            match.competition = "NFL";
        }
        else {
            match.competition = "NCAA";
        }
        
        match.homeTeam = thisMatch.teams.home.name;
        match.awayTeam = thisMatch.teams.away.name;
        match.matchId = thisMatch.game.id;
        match.endDate = thisMatch.game.date.timestamp + 7200;

        match.completed = 0;

        // if (thisMatch.game.status.short === "FT" || thisMatch.game.status.short === "AOT") {
        //     match.completed = true;
        // }
        // else {
        //     match.completed = false;
        // }

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
                            endDate: match.endDate
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

module.exports = getNFLData;