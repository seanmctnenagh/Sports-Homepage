import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { checkDates, checkBreakouts, competitionCheck, redirectJSX, ip} from "./Utils/Timeline";
import TableRow from "./TableRow";
import axios from "axios";

const NextWeek = ({ settings }) => {
    const [listOfMatches, setListOfMatches] = useState([]);
    const [listOfShowScores, setListOfShowScores] = useState([]);
    const [hockeyRedirect, setHockeyRedirect] = useState(() => false);
	const [nbaRedirect, setNbaRedirect] = useState(() => false);
	const [nationsLeagueRedirect, setNationsLeagueRedirect] = useState(() => false);

    useEffect(() => {
        getData();
        setInterval(getData, 30000);
    }, []); // Condition for GET request

    function getData() {
        console.log(ip);
        axios.get(`http://${ip}:3001/matches`).then((response) => {
            setListOfMatches(response.data.sort((a, b) => a.dateUnix - b.dateUnix));
        });

    }

	function redirect(sport) {
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

    let dates = {
        "NHL"               : [],
        "NBA"               : [],
        "Nations League"    : []
    }

    return (
        <div>
            <Table responsive style={{ width: "100%" }}>
                <tbody>
                    {listOfMatches.map((match, index) => {

                        if (!checkDates(match, settings["timeframe"])) { return null; }

                        if ( settings["singleComp"]) { if ( !competitionCheck(match, settings["comp"], true) ){return null;} }

                        let isBreakoutTitle = false;
                        if ( !settings["isBreakoutPage"] ){
                            [match, dates, isBreakoutTitle] = checkBreakouts(match, dates);
                            if ( match == null ) { 
                                return null; 
                            }
                        }
                        
                        match.redirect = (page) => {redirect(page)};

                        return ( <TableRow match={match} index={index} listOfShowScores={listOfShowScores} setListOfShowScores={setListOfShowScores} isBreakoutPage={settings["isBreakoutPage"]} isBreakoutTitle={isBreakoutTitle} includeBlanks={settings["includeBlanks"]} settings={settings} /> );
                    })}
                </tbody>
            </Table>
            {redirectJSX(settings, hockeyRedirect, nbaRedirect, nationsLeagueRedirect)}
        </div>
    );
};

export default NextWeek;
