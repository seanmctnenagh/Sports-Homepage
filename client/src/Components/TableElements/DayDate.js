import { tv } from "../Utils/DateTime";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

function DayDate({ match, timeframe, isBreakoutTitle, isBlank }) {
    let date = new Date(match.date);

    if ( isBlank ){
        return (<td className={match.competition}></td>);
    }
    
    if ( isBreakoutTitle ) {
        let to = `/${match.competition}${timeframe}`.replace(" ","")
        return (
            <td className={match.competition}>
                <Nav.Link as={Link} to={to}>
                {new Intl.DateTimeFormat("en-US", { weekday: "short", }).format(date)}{" "}{date.getDate()}
                </Nav.Link>
            </td> 
        )
    }

    if ( timeframe === "Past" ) {
        return (
            <td className={match.competition}>
                {new Intl.DateTimeFormat("en-US", { weekday: "short", }).format(date)}{" "}{date.getDate()}
            </td> 
        )
    }

    return (
        <td className={match.competition} onClick={() => tv(match)}>
            {new Intl.DateTimeFormat("en-US", { weekday: "short", }).format(date)}{" "}{date.getDate()}
        </td> 
    )
}

export default DayDate;