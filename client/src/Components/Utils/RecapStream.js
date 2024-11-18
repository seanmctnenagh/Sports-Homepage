export const espnRecap = (match) => {
    if (match.competition !== "BLANK") {
        let url = `https://www.google.com/search?q=${match.homeTeam} ${match.awayTeam} espn recap`;
        window.open(url, "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=720, height=720, top=30")
    }
}

export const streamCheck = (match) => {
    if (liveCheck(match, 10) && (["NHL", "NBA", "NFL", "NCAA"].includes(match.competition) || match.sport === "Soccer")) {
        return true;
    }
    return false;
}

export const stream = (match) => {
    let team = match.homeTeam;

    let teamNameAlts = {
        "FSV Mainz 05" 	    : "Mainz",
        "FC St. Pauli"      : "St Pauli",
        "Wolves"            : "Wolverhampton Wanderers",
        "West Ham"          : "West Ham United",
        "Brighton"          : "Brighton Hove Albion",
        "Rep. Of Ireland"   : "Republic of Ireland"
    }

    if (teamNameAlts.hasOwnProperty(team)) {team = teamNameAlts[team]};


    team = team.replaceAll(" ", "-")

    let type = "";
    if ( match.sport === "Soccer" ) {
        type = "soccer";
    } else if ( match.competition === "NCAA" ) {
        type = "ncaaf";
    }
    else { type = match.competition.toLowerCase() }

    let query = `https://720pstream.nu/${type}/live-${team}`;
    
    window.open(query.toLowerCase(), "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=720, height=720, top=30");
}

export const liveCheck = (match, offset = 0) => {
    let start = new Date(match.date);
    let now = new Date(Date.now());
    let end = new Date(match.endDate * 1000);
    
    if (now > end) {
        return false;
    }

    now.setMinutes(now.getMinutes() + offset);

    if (now < start) {
        return false;
    }

    if (match.completed) {
        return false;
    }

    return true;
}