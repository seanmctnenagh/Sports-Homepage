import axios from "axios";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';


import { Redirect } from 'react-router-dom';

import "bootstrap-icons/font/bootstrap-icons.css";

import Table from "react-bootstrap/Table";

import { teamOrder, versusSymbol, titleClick, ncaaRanks, compClick, highlights, tv, liveCheck, checkBreakouts, checkDates, espnRecap, showScore, ip } from "./utils";

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
            // setListOfShowScores(initializeArrayWithValues(0, response.length));
        });

    }

	function redirect(sport) {
		switch (sport) {
			case "Hockey":
				setHockeyRedirect(true);
                break;
                // return redirect("/hockeyFuture");
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
                                <td className={match.competition} onClick={() => compClick(match)}>
                                    {(match.competition === "BLANK") ?
                                        (<>

                                        </>) : (
                                            <>
                                                <i className="bi bi-card-list" style={{ fontSize: "1rem" }}>  </i>{match.competition}
                                            </>
                                        )}
                                </td>

                                
                                {/*        Team vs Team        */}
                                <td className={match.competition} onClick={() => { if(titleClick(match, false)){redirect(match.sport);}}}>
                                    {(liveCheck(match)) ? <i className="bi bi-record-fill live"></i> : null}
                                    {team1}{ncaaRanks(team1)} {vs} {team2}{ncaaRanks(team2)}
                                </td>


                                {/*        Date & Day        */}
                                <td className={match.competition} onClick={() => { if(tv(match)){setHockeyRedirect(true);}}}>
                                    {(match.competition === "BLANK") ?
                                        (<>

                                        </>) : (
                                            <>
                                                {new Intl.DateTimeFormat("en-US", { weekday: "short", }).format(date)}{" "}{date.getDate()}
                                            </>
                                        )}
                                </td>


                                {/*        Time        */}
                                <td className={match.competition} onClick={() => { if(tv(match)){setHockeyRedirect(true);}}}>
                                    {(match.competition === "BLANK") ?
                                        null : (
                                            <>
                                                {("0" + date.getHours()).slice(-2)}:{("0" + date.getMinutes()).slice(-2)}
                                            </>
                                        )}
                                </td>


                                {/*        Score        */}
                                <td className={match.competition}>
                                    {
                                        (match.score != null) && listOfShowScores[index]
                                            ?
                                            (<><p>{match.score} {match.minute}</p></>)
                                            :
                                            (match.competition === "BLANK" ? null : (match.score == null ? null : <><Button onClick={() => { setListOfShowScores(showScore(index, listOfShowScores)); }}>Score</Button></>))
                                    }
                                </td>


                                {/*        Highlights        */}
                                <td className={match.competition}>
                                    {
                                        (match.highlights)
                                            ?
                                            <Button variant="warning" onClick={() => { highlights(match) }}>Highlights</Button>
                                            :
                                            null
                                    }
                                </td>


                                {/*        ESPN Recap        */}
                                <td className={match.competition}>
                                    { (match.score != null) ? <i onClick={() => { espnRecap(match) }} className="bi bi-newspaper" style={{ fontSize: "1.5rem" }}></i> : null}
                                </td>
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
