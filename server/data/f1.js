const { Matches } = require('../models');

function getF1Data() {

    fetch('https://v1.formula-1.api-sports.io/races?next=20', { 
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
}


function organiseData(data){
    let count = data.results;

    for(let i = 0; i < count; i++) {
        thisRace = data.response[i];

        let race = {"sport": "F1"};
        race.date = thisRace.date.slice(0,19) + "Z";
        race.dateUnix = Math.floor(new Date(race.date).getTime()/1000);
        race.competition = "F1";
        race.homeTeam = thisRace.competition.name;
        race.awayTeam = thisRace.type;
        race.matchId = thisRace.id;
        race.highlights = "";

        if (thisRace.status == "Scheduled"){
            race.completed = false;
        }
        else {
            race.completed = true;
        }
        race.score = null;
        race.minute = null;

        race.homeTeam = race.homeTeam.replace("Grand Prix", "GP");
        race.awayTeam = race.awayTeam.replace("1st Practice", "FP1");
        race.awayTeam = race.awayTeam.replace("2nd Practice", "FP2");
        race.awayTeam = race.awayTeam.replace("3rd Practice", "FP3");
        race.awayTeam = race.awayTeam.replace("1st Qualifying", "Q1");
        race.awayTeam = race.awayTeam.replace("2nd Qualifying", "Q2");
        race.awayTeam = race.awayTeam.replace("3rd Qualifying", "Q3");
        race.awayTeam = race.awayTeam.replace("1st Sprint Shootout", "Sprint Q1");
        race.awayTeam = race.awayTeam.replace("2nd Sprint Shootout", "Sprint Q2");
        race.awayTeam = race.awayTeam.replace("3rd Sprint Shootout", "Sprint Q3");

        try{
            Matches.create(race)
                .then()
                .catch(err => {
                    Matches.update(
                        {
                            competition: race.competition,
                            homeTeam: race.homeTeam,
                            awayTeam: race.awayTeam,
                            date: race.date,
                            dateUnix: race.dateUnix,
                            completed: race.completed,
                            score: race.score,
                            minute: race.minute,
                            highlights: race.highlights
                        },
                        {where: {matchId: race.matchId.toString()}}
                    ).then()
                      .catch(err => console.log(err))
                })
        }
        catch (error){
            console.log(error.errno);
        }
        
      }
}

module.exports = getF1Data;