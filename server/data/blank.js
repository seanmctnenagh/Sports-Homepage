const { Matches } = require('../models');

function blank() {

    for(let i = 0; i < 8; i++) {
        let day = new Date(Date.now() + (864e5 * (i+1)));
        day.setHours(5,30,0,0);

        let blank = {};
        blank.sport = "BLANK";
        blank.competition = "BLANK";
        blank.date = day.toISOString(); // 3am
        blank.dateUnix = (day.getTime() / 1000);
        blank.matchId = blank.dateUnix; // unix of 3am
        blank.homeTeam = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(day);
        day.setHours(day.getHours() - 24);
        blank.awayTeam = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(day);
        blank.completed = "1";
        blank.endDate = blank.dateUnix;

        Matches.create(blank)
            .catch(err => {})

        Matches.create(blank)
            .then()
            .catch(err => {
                Matches.update(
                    {
                        competition: blank.competition,
                        homeTeam: blank.homeTeam,
                        awayTeam: blank.awayTeam,
                        date: blank.date,
                        dateUnix: blank.dateUnix,
                        completed: blank.completed,
                        sport: blank.sport,
                        endDate: blank.endDate
                    },
                    {where: {matchId: blank.matchId.toString()}}
                ).then()
                  .catch(err => console.log("Error in blank/organiseData()\n" + err))
            })
    }

}

module.exports = blank;