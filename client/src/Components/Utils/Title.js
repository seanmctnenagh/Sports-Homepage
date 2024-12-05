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
    let url = "";
    if (isBreakoutTitle) {
        return;
    }
    else if (match.competition === "NCAA"){
        url = `https://www.google.com/search?q=${match.homeTeam} ${match.awayTeam} cfb`
    }
    else if (match.competition !== "BLANK") {
        url = `https://www.google.com/search?q=${match.homeTeam} ${match.awayTeam}`
    }
    
    url = url.replace("&", " and ");
    window.open(url, "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=720, height=720, top=30")
}

/**
 * @param {String} team 
 * @returns {String} rank
 */
export const ncaaRanks = (team) => {
    let ranks = {
        "Oregon" : "1",
        "Texas": "2",
        "Penn State": "3",
        "Notre Dame": "4",
        "Georgia": "5",
        "Tennessee": "6",
        "Ohio State": "7",
        "SMU": "8",
        "Indiana": "9",
        "Boise State": "10",
        "Alabama": "11",
        "Arizona State": "12",
        "South Carolina": "13",
        "Miami": "14",
        "Ole Miss": "15",
        "Iowa State": "16",
        "BYU": "17",
        "Clemson": "18",
        "UNLV": "19",
        "Colorado": "20",
        "Illinois": "21",
        "Missouri": "22",
        "Syracuse": "23",
        "Army": "24",
        "Memphis": "25",
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


/**
     * @param {match} match 
     * @returns bubble if match is live
     */
export const liveBubble = ( match ) => {
    if ( liveCheck(match) ) { return ( <i className="bi bi-record-fill live"></i> )}
}