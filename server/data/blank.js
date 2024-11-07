const { Matches } = require('../models');

function blank() {

    for(let i = 0; i < 8; i++) {
        let day = new Date(Date.now() + (864e5 * (i+1)));
        day.setHours(5,30,0,0);

        let blank = {};
        blank.sport = "";
        blank.competition = "BLANK";
        blank.date = day.toISOString(); // 3am
        blank.dateUnix = (day.getTime() / 1000);
        blank.matchId = blank.dateUnix; // unix of 3am
        blank.homeTeam = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(day);
        blank.awayTeam = "";
        blank.completed = "1";

        Matches.create(blank)
            .catch(err => {})
    }

}

module.exports = blank;