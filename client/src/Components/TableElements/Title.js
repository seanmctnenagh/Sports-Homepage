import { liveBubble, ncaaRanks, titleClick, versusSymbol, teamOrder } from "../Utils/Title";

import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

import Nav from "react-bootstrap/Nav";

function setBlankTitle(match, timeframe) {
    let title = "";

    if ( timeframe === "Future" ) {
        title = match.homeTeam;
    }
    else {
        title = match.awayTeam;
    }

    return [title, ""];
}

function Title({ match, timeframe, isBreakoutTitle, isBlank }) {
    let vs = versusSymbol(match, isBreakoutTitle, isBlank);
    let [team1, team2] = teamOrder(match, isBreakoutTitle);


    if ( isBlank ) {
        let date = new Date(match.date);
        if ( timeframe === "Past" ) { date.setHours(date.getHours() - 24)}
        var options = { month: 'short', day: 'numeric' };
        let dateString = new Intl.DateTimeFormat('en-US', options).format(date);
        [team1, team2] = setBlankTitle(match, timeframe)

        return (
            <td className={match.sport.replaceAll(" ", "")} style={{ textAlign: "center" }} colSpan={6}>
                {team1}{team2} {dateString}
            </td> 
        )
    }

    if ( isBreakoutTitle ) {
        let to = `/${match.competition}${timeframe}`.replace(" ","")
        return (
            <td className={match.sport.replaceAll(" ", "")}>
                <Nav.Link as={Link} to={to}>
                    <span>{liveBubble(match)}
                    {team1}{(match.competition === "NCAA") ? ncaaRanks(team1) : null} {vs}</span> <span> {team2}{(match.competition === "NCAA") ? ncaaRanks(team2) : null}</span>
                </Nav.Link>
            </td> 
            
        )
    }

    return (
        <td className={match.sport.replaceAll(" ", "")} onClick={() => {if(!isBlank){titleClick(match, isBreakoutTitle)}}} style={{ paddingRight: 0}}>
            <span>{() => {liveBubble(match)}}
            {team1}{(match.competition === "NCAA") ? ncaaRanks(team1) : null} </span>{(isBlank)? null : <br/>} <span> {team2}{(match.competition === "NCAA") ? ncaaRanks(team2) : null}</span>
        </td>    
        
    )
}

export default Title;