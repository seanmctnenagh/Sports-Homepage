import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { checkDates, checkBreakouts, competitionCheck, redirectJSX, ip, redirect } from "./Utils/Timeline";
import TableRow from "./TableRow";

const Last3Days = ({ settings }) => {
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
        axios.get(`http://${ip}:3001/matches`).then((response) => {
            setListOfMatches(response.data.sort((a, b) => b.dateUnix - a.dateUnix));
        });

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

                        match.redirect = (page) => {redirect(page, setHockeyRedirect, setNbaRedirect, setNationsLeagueRedirect)};

						return ( <TableRow match={match} index={index} listOfShowScores={listOfShowScores} setListOfShowScores={setListOfShowScores} isBreakoutPage={settings["isBreakoutPage"]} isBreakoutTitle={isBreakoutTitle} includeBlanks={settings["includeBlanks"]} settings={settings} /> );
					})}
				</tbody>
			</Table>
            {redirectJSX(settings, hockeyRedirect, nbaRedirect, nationsLeagueRedirect)}
		</div>
	);
};

export default Last3Days;
