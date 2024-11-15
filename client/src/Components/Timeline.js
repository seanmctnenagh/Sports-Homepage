import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import Table from "react-bootstrap/Table";
import { checkDates, ip, checkBreakouts } from "./Utils/Timeline";
import TableRow from "./TableRow";

const NextWeek = () => {
    const [listOfMatches, setListOfMatches] = useState([]);
    const [listOfShowScores, setListOfShowScores] = useState([]);
    const [hockeyRedirect, setHockeyRedirect] = useState(() => false);
	const [nbaRedirect, setNbaRedirect] = useState(() => false);
	const [nationsLeagueRedirect, setNationsLeagueRedirect] = useState(() => false);
    const isBreakoutPage = false;

    useEffect(() => { getData(); setInterval(getData, 30000); }, []); // Condition for GET request

    function getData() { axios.get(`http://${ip}:3001/matches`).then((response) => { setListOfMatches(response.data.sort((a, b) => a.dateUnix - b.dateUnix)); }); }

	function redirect(page) {
		switch (page) {
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

                        if (!checkDates(match, "future")) { return null }

                        let isBreakoutTitle = false;
                        [match, dates, isBreakoutTitle] = checkBreakouts(match, dates, isBreakoutPage);

                        if ( match == null ) { return null; }

                        match.redirect = (page) => {redirect(page)};

                        return ( <TableRow match={match} index={index} listOfShowScores={listOfShowScores} setListOfShowScores={setListOfShowScores} isBreakoutPage={isBreakoutPage} isBreakoutTitle={isBreakoutTitle} /> );
                    })}
                </tbody>
            </Table>
            { hockeyRedirect ? (<Redirect push to="/NhlFuture"/>) : null }
            { nbaRedirect ? (<Redirect push to="/nbaFuture"/>) : null }
            { nationsLeagueRedirect ? (<Redirect push to="/nationsLeagueFuture"/>) : null }
        </div>
    );
};

export default NextWeek;
