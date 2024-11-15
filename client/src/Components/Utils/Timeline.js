import axios from "axios";
import { Redirect } from 'react-router-dom';


// export const sportCheck = (match, blanks, sport) => {
//     if (match.sport === sport) {
//         return true;
//     }
//     if (match.competition === "BLANK" && blanks) {
//         return true;
//     }
//     return false;
// }

export const checkDates = (match, timeframe) => {

    if (timeframe === "Future"){
        let date = new Date(match.endDate * 1000);
        let today = new Date(Date.now());
        // today.setHours(0, 0, 0, 0);

        if (date - today < 0) {
            return false;
        }

        let days = 8;
        if (date - today > days * 86400000 + 10800000) {
            return false;
        }

        return true;
    }
    else if (timeframe === "Past"){
        let date = new Date(match.dateUnix * 1000);
        let today = new Date(Date.now());
        // today.setHours(4, 0, 0, 0);

        if (date > today) { 
            return false;
        }

        let days = 7;
        if (date - today < -(days * 86400000)) { // >'days' days ago check
            return false;
        }

        return true;
    }
    
}

export const checkDatesOverall = (match) => {
    
    let date = new Date(match.dateUnix * 1000);
    let today = new Date(Date.now());


    let days = 8;
    if (date - today > days * 86400000 + 10800000) {
        return false;
    }

    days = 3;
    if (date - today < -(days * 86400000)) { // >'days' days ago check
        return false;
    }

    return true;

}

// export const firstNbaOTD = (match, nbaDates) => {

//     let date = new Date(match.dateUnix * 1000);
//     date.setHours(date.getHours() - 5);


//     if (nbaDates.includes(date.toISOString().split("T")[0])) {
//         return [null, nbaDates];
//     }
//     else {
//         nbaDates.push(date.toISOString().split("T")[0]);
//     }
//     return [match, nbaDates];
// }
	
// export const firstNhlOTD = (match, nhlDates) => {

//     let date = new Date(match.dateUnix * 1000);
//     date.setHours(date.getHours() - 5);


//     if (nhlDates.includes(date.toISOString().split("T")[0])) {
//         return [null, nhlDates];
//     }
//     else {
//         nhlDates.push(date.toISOString().split("T")[0]);
//     }

//     return [match, nhlDates];
// }
	
// export const firstNationsLeagueOTD = (match, nationsLeagueDates) => {

//     let date = new Date(match.dateUnix * 1000);
//     date.setHours(date.getHours() - 5);


//     if (nationsLeagueDates.includes(date.toISOString().split("T")[0])) {
//         return [null, nationsLeagueDates];
//     }
//     else {
//         nationsLeagueDates.push(date.toISOString().split("T")[0]);
//     }

//     return [match, nationsLeagueDates];
// }

// export const checkBreakouts = (match, date, nbaDates, nhlDates, nationsLeagueDates) => {
//     if (match.competition === "NHL") {
//         [match, nhlDates] = firstNhlOTD(match, nhlDates);
//         if (!match) { return [null, nbaDates, nhlDates, nationsLeagueDates, false, false] }

//         match.homeTeam = match.competition;
//         match.awayTeam = new Intl.DateTimeFormat("en-US", { weekday: "long", }).format(date.setHours(date.getHours() - 4));
//         date.setHours(date.getHours() + 4);
//         match.score = null;
//         match.highlights = null;
//     } 
//     else if (match.competition === "NBA") {
//         [match, nbaDates] = firstNbaOTD(match, nbaDates);
//         if (!match) { return [null, nbaDates, nhlDates, nationsLeagueDates, false, false] }

//         match.homeTeam = match.competition;
//         match.awayTeam = new Intl.DateTimeFormat("en-US", { weekday: "long", }).format(date.setHours(date.getHours() - 4));
//         date.setHours(date.getHours() + 4);
//         match.score = null;
//         match.highlights = null;
//     } 
//     else if (match.competition === "Nations League") {
//         [match, nbaDates] = firstNationsLeagueOTD(match, nationsLeagueDates);
//         if (!match) { return [null, nbaDates, nhlDates, nationsLeagueDates, false, false] }

//         match.homeTeam = new Intl.DateTimeFormat("en-US", { weekday: "long", }).format(date.setHours(date.getHours() - 4));
//         match.awayTeam = match.competition;
//         date.setHours(date.getHours() + 4);
//         match.score = null;
//         match.highlights = null;
//     } else if (match.competition === "BLANK"){
//         return [match , nbaDates, nhlDates, nationsLeagueDates, true, false];
//     }

//     return [match, nbaDates, nhlDates, nationsLeagueDates, false, true];

// }

export const ip = "192.168.1.15";

/**
 * @param {match} match 
 * @param {bool} blanks Include blanks in timeline
 * @param {string} competition
 * @returns {bool} True if match.competition === competition
 * @returns {bool} True if competition = BLANK and blanks = true
 * @returns {bool} False Otherwise
 */
export const competitionCheck = (match, competition, blanks) => {
    if (match.competition === competition) {
        return true;
    }
    if (match.competition === "BLANK" && blanks) {
        return true;
    }
    return false;
}

export const versusSymbol = (match, breakout) => {
    let vs = "";

    // if ( match.competition === "BLANK" || breakoutTitle) {
    //     vs = "";
    // }
    // else if ( ["NFL", "NCAA", "NBA", "NHL", "MLB"].includes(match.competition) ) {
    //     vs = "@ ";
    // }
    // else {
    //     vs = "vs ";
    // }

    if (["NFL", "NCAA"].includes(match.competition) || (breakout && ["NBA", "NHL"].includes(match.competition))) {
        vs = "@ ";
    } else if (["BLANK", "NHL", "NBA"].includes(match.competition)) {
        vs = "";
    } else if (match.competition !== "F1") {
        vs = "vs ";
    }

    return vs;
}

/** True if breakout exists */
export const checkIfBreakoutComp = (match) => { 
    if ( ["Nations League", "NBA", "NHL"].includes(match.competition) ) { return true; }
    return false;
}

/** True if override team exists */
export const checkBreakoutOverride = (match) => {
    let overrideTeams = ["Rep. Of Ireland"];
    if ( overrideTeams.includes(match.homeTeam) ||  overrideTeams.includes(match.awayTeam) ) { return true; }
    return false;
}

/** True if first of date */
export const checkBreakoutDates = ( match, dates ) => {
    if ( match.competition === "NHL" ) { return firstNhlOTD2(match, dates) }
    if ( match.competition === "NBA" ) { return firstNbaOTD2(match, dates) }
    if ( match.competition === "Nations League" ) { return firstNationsLeagueOTD2(match, dates) }
}

export const firstNbaOTD2 = ( match, dates ) => {
    let nbaDates = dates["NBA"];
    let date = new Date(match.dateUnix * 1000);
    date.setHours(date.getHours() - 5);


    if (nbaDates.includes(date.toISOString().split("T")[0])) {
        return [false, dates];
    }
    else {
        nbaDates.push(date.toISOString().split("T")[0]);
    }

    dates["NBA"] = nbaDates;
    return [true, dates];
}

export const firstNationsLeagueOTD2 = ( match, dates ) => {
    let nationsLeagueDates = dates["Nations League"];
    let date = new Date(match.dateUnix * 1000);
    date.setHours(date.getHours() - 5);


    if (nationsLeagueDates.includes(date.toISOString().split("T")[0])) {
        return [false, dates];
    }
    else {
        nationsLeagueDates.push(date.toISOString().split("T")[0]);
    }

    dates["Nations League"] = nationsLeagueDates;
    return [true, dates];
}

export const firstNhlOTD2 = ( match, dates ) => {
    let nhlDates = dates["NHL"];
    let date = new Date(match.dateUnix * 1000);
    date.setHours(date.getHours() - 5);


    if (nhlDates.includes(date.toISOString().split("T")[0])) {
        return [false, dates];
    }
    else {
        nhlDates.push(date.toISOString().split("T")[0]);
    }

    dates["NHL"] = nhlDates;
    return [true, dates];
}

export const breakoutTitleTransform = ( match ) => {
    let date = new Date(match.date);
    
    match.homeTeam = match.competition;
    match.awayTeam = new Intl.DateTimeFormat("en-US", { weekday: "long", }).format(date.setHours(date.getHours() - 4));;
    match.score = null;
    match.highlights = null;
    return match;
}

/**
     * @param {match} match 
     * @param {dates} dates 
     * @param {bool} isBreakoutPage 
     * @returns [match, dates, isBreakoutTitle]
     */
export const checkBreakouts = (match, dates) => {
    let firstOtd = false;
    let isBreakoutTitle = false;
    if (checkIfBreakoutComp(match)) {
        if (!checkBreakoutOverride(match)) {
            [firstOtd, dates] = checkBreakoutDates(match, dates)
            if (firstOtd) {
                match = breakoutTitleTransform(match);
                isBreakoutTitle = true;
            }
            else { match = null }
        }
    }
    return [match, dates, isBreakoutTitle];
}



export const redirectJSX = (timeframe, isBreakoutPage, hockeyRedirect, nbaRedirect, nationsLeagueRedirect) => {
    if (isBreakoutPage) { return null;}
    let hockey = `/nhl${timeframe}`
    let nba = `/nba${timeframe}`
    let nationsLeague = `/nationsLeague${timeframe}`
    return (
        <>
            { hockeyRedirect ? (<Redirect push to={hockey}/>) : null }
            { nbaRedirect ? (<Redirect push to={nba}/>) : null }
            { nationsLeagueRedirect ? (<Redirect push to={nationsLeague}/>) : null }
        </>
    )
}

export const redirect = (sport, setHockeyRedirect, setNbaRedirect, setNationsLeagueRedirect) => {
    switch (sport) {
        case "NHL":
            setHockeyRedirect(true);
            break;
        case "NBA":
            setNbaRedirect(true);
            break;
        case "Nations League":
            setNationsLeagueRedirect(true);
            break;
        default:
            break;
    }
}

export const getData = ( timeframe, setListOfMatches) => {
    axios.get(`http://${ip}:3001/matches`).then((response) => {
        if ( timeframe === "Past" ){
            setListOfMatches(response.data.sort((a, b) => b.dateUnix - a.dateUnix));
        }
        else {
            setListOfMatches(response.data.sort((a, b) => a.dateUnix - b.dateUnix)); 
        }
        
    });
}