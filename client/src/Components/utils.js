export const teamOrder = (match) => {
    let team1, team2;       
    let sports = ["NFL", "NCAA", "MLB", "NBA", "NHL"]                 
    if (sports.includes(match.competition)) {
        team1 = match.awayTeam;
        team2 = match.homeTeam;
    } else {
        team1 = match.homeTeam;
        team2 = match.awayTeam;
    }

    return [team1, team2]

}

export const versusSymbol = (match, breakout) => {
    let vs = "";
    if (["NFL", "NCAA"].includes(match.competition) || (breakout && ["NBA", "NHL"].includes(match.competition))) {
        vs = "@ ";
    } else if (["BLANK", "NHL", "NBA"].includes(match.competition)) {
        vs = "";
    } else if (match.competition !== "F1") {
        vs = "vs ";
    }

    return vs;
}

export const titleClick = (match, breakout) => {
    if (["NBA", "NHL"].includes(match.competition) && breakout === false) {
        return true;
    }
    else if (match.competition === "NCAA"){
        window.open(`https://www.google.com/search?q=${match.homeTeam} ${match.awayTeam} cfb`, "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=720, height=720, top=30")
    }
    else if (match.competition !== "BLANK") {
        window.open(`https://www.google.com/search?q=${match.homeTeam} ${match.awayTeam}`, "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=720, height=720, top=30")
    }

    return false;
}

export const ncaaRanks = (team) => {
    let ranks = {
        "Oregon" : "1",
        "Georgia": "2",
        "Ohio State": "3",
        "Miami": "4",
        "Texas": "5",
        "Penn State": "6",
        "Tennessee": "7",
        "Indiana": "8",
        "BYU": "9",
        "Notre Dame": "10",
        "Alabama": "11",
        "Boise State": "12",
        "SMU": "13",
        "LSU": "14",
        "Texas A&M": "15",
        "Ole Miss": "16",
        "Iowa State": "17",
        "Army": "18",
        "Clemson": "19",
        "Washington State": "20",
        "Colorado": "21",
        "Kansas State": "22",
        "Pittsburgh": "23",
        "Vanderbilt": "24",
        "Louisville": "25",
    }

    if (ranks.hasOwnProperty(team)){
        return ` (${ranks[team]})`;
    }
    return "";
}

export const compClick = (match) => {
    if (match.competition !== "BLANK") {
        let query = "";
        if (match.competition === "League Cup") { query = `${match.competition} draw` }
        else if (match.competition === "LOI") { query = "Irish Premier Division standings"}
        else { query = `${match.competition} standings` }


        window.open(`https://www.google.com/search?q=${query}`, "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=720, height=720, top=30");
    }
}

export const highlights = (match) => {
    window.open(match.highlights, "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=720, height=720, top=30");
}

export const tv = (match) =>{
    if (match.competition === "NHL") {
        return true;
    } 
    else if (match.competition !== "BLANK") {
        let url = `https://www.google.com/search?q=${match.homeTeam} ${match.awayTeam} tv channel`;
        url = url.replace("&", " and ");
        window.open(url, "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=720, height=720, top=30")
    }
    return false;
}

export const liveCheck = (match) => {
    let start = new Date(match.date);
    let now = new Date(Date.now());
    let end = new Date(match.endDate * 1000);

    if (now < start) {
        return false;
    }
    
    if (now > end) {
        return false;
    }

    if (match.completed) {
        return false;
    }

    return true;
}

export const espnRecap = (match) => {
    if (match.competition !== "BLANK") {
        let url = `https://www.google.com/search?q=${match.homeTeam} ${match.awayTeam} espn recap`;
        window.open(url, "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=720, height=720, top=30")
    }
}

export const sportCheck = (match, sport, blanks) => {
    if (match.sport === sport) {
        return true;
    }
    if (match.competition === "BLANK" && blanks) {
        return true;
    }
    return false;
}

export const checkDates = (match, timeframe) => {

    if (timeframe === "future"){
        let date = new Date(match.date);
        let today = new Date(Date.now());
        today.setHours(0, 0, 0, 0);

        if (date - today < 0) {
            // 1 hour = 3600s = 3600000ms // 3 hours = 10800s = 10800000ms
            return false;
        }

        let days = 8;
        if (date - today > days * 86400000 + 10800000) {
            return false;
        }

        return true;
    }
    else if (timeframe === "past"){
        let date = new Date(match.date);
        let today = new Date(Date.now());
        today.setHours(4, 0, 0, 0);

        if (date > today) { // Future/Past Check
            return false;
        }

        let days = 3;
        if (date - today < -(days * 86400000 + 10800000)) { // >'days' days ago check
            return false;
        }

        return true;
    }
    
}

export const firstNbaOTD = (match, nbaDates) => {

    let date = new Date(match.dateUnix * 1000);
    date.setHours(date.getHours() - 5);


    if (nbaDates.includes(date.toISOString().split("T")[0])) {
        return [null, nbaDates];
    }
    else {
        nbaDates.push(date.toISOString().split("T")[0]);
    }
    return [match, nbaDates];
}
	
export const firstNhlOTD = (match, nhlDates) => {

    let date = new Date(match.dateUnix * 1000);
    date.setHours(date.getHours() - 5);


    if (nhlDates.includes(date.toISOString().split("T")[0])) {
        return [null, nhlDates];
    }
    else {
        nhlDates.push(date.toISOString().split("T")[0]);
    }

    return [match, nhlDates];
}

export const checkBreakouts = (match, date, nbaDates, nhlDates) => {
    if (match.competition === "NHL") {
        [match, nhlDates] = firstNhlOTD(match, nhlDates);
        if (!match) { return [null, nbaDates, nhlDates, false] }

        match.homeTeam = match.sport;
        match.awayTeam = new Intl.DateTimeFormat("en-US", { weekday: "long", }).format(date.setHours(date.getHours() - 4));
        date.setHours(date.getHours() + 4);
        match.score = null;
        match.highlights = null;
    } else if (match.competition === "NBA") {
        [match, nbaDates] = firstNbaOTD(match, nbaDates);
        if (!match) { return [null, nbaDates, nhlDates, false] }

        match.homeTeam = match.sport;
        match.awayTeam = new Intl.DateTimeFormat("en-US", { weekday: "long", }).format(date.setHours(date.getHours() - 4));
        date.setHours(date.getHours() + 4);
        match.score = null;
        match.highlights = null;
    } else if (match.competition === "BLANK"){
        return [match , nbaDates, nhlDates, true];
    }

    return [match, nbaDates, nhlDates, false];

}

export const showScore = (index, listOfShowScores) => {
    const newItems = [...listOfShowScores];

    newItems[index] = 1;

    return newItems;

    // setListOfShowScores(newItems);
}