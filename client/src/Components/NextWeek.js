import axios from "axios";
import { useEffect, useState } from "react";

import { Redirect } from 'react-router-dom';

import "bootstrap-icons/font/bootstrap-icons.css";

import Table from "react-bootstrap/Table";

import { teamOrder, versusSymbol, checkBreakouts, checkDates, ip } from "./utils";

import Competition from "./TableElements/Competition";
import Title from "./TableElements/Title";
import DayDate from "./TableElements/DayDate";
import Time from "./TableElements/Time";
import Score from "./TableElements/Score";
import Highlights from "./TableElements/Highlights";
import RecapStream from "./TableElements/RecapStream";

const NextWeek = () => {
    const [listOfMatches, setListOfMatches] = useState([]);
    const [listOfShowScores, setListOfShowScores] = useState([]);
    const [hockeyRedirect, setHockeyRedirect] = useState(() => false);
	const [nbaRedirect, setNbaRedirect] = useState(() => false);

    useEffect(() => {
        getData();
        setInterval(getData, 30000);
    }, []); // Condition for GET request

    

    function getData() {
        axios.get(`http://${ip}:3001/matches`).then((response) => {
            setListOfMatches(response.data.sort((a, b) => a.dateUnix - b.dateUnix));
        });

    }

	function redirect(sport) {
		switch (sport) {
			case "Hockey":
				setHockeyRedirect(true);
                break;
			case "Basketball":
				setNbaRedirect(true);
				break;
			default:
				break;
		}
	}

    let nhlDates = [];
    let nbaDates = [];

    return (
        <div className="NextWeek">
            <Table responsive style={{ width: "100%" }}>
                <tbody>
                    {listOfMatches.map((match, index) => {

                        if (!checkDates(match, "future")) { return null }

                        let date = new Date(match.date);

                        let vs = versusSymbol(match, false);

						[match, nbaDates, nhlDates] = checkBreakouts(match, date, nbaDates, nhlDates);

                        if ( match == null ) { return null; }
                        
                        let [team1, team2] = teamOrder(match);



                        return (
                            <tr key={match.matchId}>
                                {/*        Competition        */}
                                <Competition match={match} />

                                
                                {/*        Team vs Team        */}
                                <Title match={match} team1={team1} team2={team2} vs={vs} redirect={redirect} />


                                {/*        Date & Day        */}
                                <DayDate match={match} date={date} redirect={redirect} />


                                {/*        Time        */}
                                <Time match={match} date={date} redirect={redirect} />


                                {/*        Score        */}
                                <Score match={match} index={index} listOfShowScores={listOfShowScores} setListOfShowScores={setListOfShowScores} />


                                {/*        Highlights        */}
                                <Highlights match={match} />


                                {/*        ESPN Recap / Stream        */}
                                <RecapStream match={match} />
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            { hockeyRedirect ? (<Redirect push to="/hockeyFuture"/>) : null }
            { nbaRedirect ? (<Redirect push to="/nbaFuture"/>) : null }
        </div>
    );
};

export default NextWeek;
