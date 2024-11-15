import { liveCheck, ncaaRanks, titleClick, versusSymbol, teamOrder } from "../Utils/Title";

import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

import Nav from "react-bootstrap/Nav";

function Title({ match, settings, isBreakoutTitle, isBlank }) {
    let redirect = (page) => {match.redirect(page)};
    let vs = versusSymbol(match, isBreakoutTitle, isBlank);
    let [team1, team2] = teamOrder(match, isBreakoutTitle);


    /**
     * 
     */
    function titleOnClick() {
        titleClick(match, isBreakoutTitle);
        if ( isBreakoutTitle ) { redirect(match.competition) }
    }


    /**
     * 
     * @param {match} match 
     * @returns bubble if match is live
     */
    function liveBubble( match ) {
        if ( liveCheck(match) ) { return ( <i className="bi bi-record-fill live"></i> )}
    }

    if ( isBreakoutTitle ) {
        let to = `/${match.competition}${settings["timeframe"]}`.replace(" ","")
        return (
            // <Nav.Link as={Link} to={to}>
                <td onClick={() => titleOnClick()} className={match.competition} >
                    {liveBubble(match)}
                    {team1}{(match.competition === "NCAA") ? ncaaRanks(team1) : null} {vs} {team2}{(match.competition === "NCAA") ? ncaaRanks(team2) : null}
                </td> 
            // </Nav.Link>
        )
    }

    return (
        <td className={match.competition} onClick={() => titleOnClick()} >
            {liveBubble(match)}
            {team1}{(match.competition === "NCAA") ? ncaaRanks(team1) : null} {vs} {team2}{(match.competition === "NCAA") ? ncaaRanks(team2) : null}
        </td>    
        
    )
}

export default Title;