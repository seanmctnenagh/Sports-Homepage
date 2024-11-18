/**
 * @param {match} match 
 * @param {int} offset 
 * @returns {bool} if now + offset minutes between match.date and match.endDate
 */
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

/**
 * @param {match} match 
 * @param {bool} isBreakoutTitle 
 */
export const titleClick = (match, isBreakoutTitle) => {
    if (isBreakoutTitle) {
        return;
    }
    else if (match.competition === "NCAA"){
        window.open(`https://www.google.com/search?q=${match.homeTeam} ${match.awayTeam} cfb`, "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=720, height=720, top=30")
    }
    else if (match.competition !== "BLANK") {
        window.open(`https://www.google.com/search?q=${match.homeTeam} ${match.awayTeam}`, "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=720, height=720, top=30")
    }
}

export const ncaaRanks = (team) => {
    let ranks = {
        "Oregon" : "1",
        "Ohio State": "2",
        "Texas": "3",
        "Penn State": "4",
        "Indiana": "5",
        "BYU": "6",
        "Tennessee": "7",
        "Notre Dame": "8",
        "Miami": "9",
        "Alabama": "10",
        "Ole Miss": "11",
        "Georgia": "12",
        "Boise State": "13",
        "SMU": "14",
        "Texas A&M": "15",
        "Kansas State": "16",
        "Colorado": "17",
        "Washington State": "18",
        "Louisville": "19",
        "Clemson": "20",
        "South Carolina": "21",
        "LSU": "22",
        "Missouri": "23",
        "Army": "24",
        "Tulane": "25",
    }

    if (ranks.hasOwnProperty(team)){
        return ` (${ranks[team]})`;
    }
    return "";
}

/**
 * @returns "" if isBreakoutTitle
 * @returns "@ " if American Sports
 * @returns "" if Formula 1
 * @returns "vs " for all other inputs
 */
export const versusSymbol = (match, isBreakoutTitle, isBlank) => {
    let vs = "";

    if ( isBreakoutTitle || isBlank ) {
        vs = "";
    }
    else if ( ["NFL", "NCAA", "NBA", "NHL", "MLB"].includes(match.competition) ){
        vs = "@ ";
    }
    else if (match.competition !== "F1") {
        vs = "vs ";
    }

    // if (["NFL", "NCAA"].includes(match.competition) || ((!isBreakoutTitle) && ["NBA", "NHL"].includes(match.competition))) {
    //     vs = "@ ";
    // } else if ((!isBreakoutTitle) && ["Nations League"].includes(match.competition)) {
    //     vs = "vs "
    // } else if ( ["BLANK", "NHL", "NBA", "Nations League"].includes(match.competition)) {
    //     vs = "";
    // } else if (match.competition !== "F1") {
    //     vs = "vs ";
    // }

    return vs;
}

/**
 * 
 * @param {match} match 
 * @param {bool} isBreakoutTitle 
 * @returns [team1, team2]
 */
export const teamOrder = (match, isBreakoutTitle) => {
    let team1, team2;       
    let sports = ["NFL", "NCAA", "MLB", "NBA", "NHL"]   
    
    if ( isBreakoutTitle ){
        team1 = match.homeTeam;
        team2 = match.awayTeam;
    }
    else if (sports.includes(match.competition)) {
        team1 = match.awayTeam;
        team2 = match.homeTeam;
    } else {
        team1 = match.homeTeam;
        team2 = match.awayTeam;
    }

    return [team1, team2]

}