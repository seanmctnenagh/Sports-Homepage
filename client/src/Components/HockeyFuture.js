import axios from "axios";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

import Table from "react-bootstrap/Table";

import { teamOrder, versusSymbol, titleClick, compClick, highlights, tv, liveCheck, sportCheck, checkDates, espnRecap, showScore } from "./utils";

const HockeyFuture = () => {
    const [listOfMatches, setListOfMatches] = useState([]);
    const [listOfShowScores, setListOfShowScores] = useState([]);
    // const initializeArrayWithValues = (n, val = 0) => Array(n).fill(val);

    useEffect(() => {
        getData();
        setInterval(getData, 30000);
    }, []); // Condition for GET request

    // 
    // 

    function getData() {
        // axios.get("//localhost:3001/matches").then((response) => {
        axios.get("http://192.168.1.15:3001/matches").then((response) => {
            setListOfMatches(response.data.sort((a, b) => a.dateUnix - b.dateUnix));
            // setListOfShowScores(initializeArrayWithValues(0, response.length));
        });

    }

    // function showScore(index) {
    //     const newItems = [...listOfShowScores];

    //     newItems[index] = 1;

    //     setListOfShowScores(newItems);
    // }

    return (
        <div className="NextWeek">
            <Table responsive style={{ width: "100%" }}>
                <tbody>
                    {listOfMatches.map((match, index) => {

                        if (!checkDates(match, "future")) { return null; }

                        if ( !sportCheck(match, "Hockey", true) ) { return null; }

                        let vs = versusSymbol(match, true)                      
                        
                        let [team1, team2] = teamOrder(match);

                        let date = new Date(match.date);

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
                                        )}</td>

                                
                                {/*        Team vs Team        */}
                                <td className={match.competition} onClick={() => titleClick(match, true)}>
                                    {(liveCheck(match)) ? <i className="bi bi-record-fill live"></i> : null}   
                                    {team1} {vs} {team2}
                                </td>


                                {/*        Date & Day        */}
                                <td className={match.competition} onClick={() => tv(match)}>
                                    {(match.competition === "BLANK") ?
                                        (<>

                                        </>) : (
                                            <>
                                                {new Intl.DateTimeFormat("en-US", { weekday: "short", }).format(date)}{" "}{date.getDate()}
                                            </>
                                        )}
                                </td>

                                {/*        Time        */}
                                <td className={match.competition} onClick={() => tv(match)}>
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
                                    { (match.score != null) ? <i onClick={() => { espnRecap(match) }} class="bi bi-newspaper" style={{ fontSize: "1.5rem" }}></i> : null}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default HockeyFuture;
