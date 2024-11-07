import axios from "axios";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

import Table from "react-bootstrap/Table";

import { teamOrder, versusSymbol, titleClick, compClick, highlights, espnRecap, sportCheck, checkDates, showScore } from "./utils";

const NBAPast = () => {
    const [listOfMatches, setListOfMatches] = useState([]);
    const [listOfShowScores, setListOfShowScores] = useState([]);

    useEffect(() => {
        getData();
        setInterval(getData, 30000);
    }, []); // Condition for GET request

    function getData() {
        axios.get("http://192.168.1.15:3001/matches").then((response) => {
            setListOfMatches(response.data.sort((a, b) => b.dateUnix - a.dateUnix));
        });

    }

    return (
        <div className="NextWeek">
            <Table responsive style={{ width: "100%" }}>
                <tbody>
                    {listOfMatches.map((match, index) => {

                        if (!checkDates(match, "past")) { return null }

                        if ( !sportCheck(match, "Basketball") ){return null;}

                        let date = new Date(match.date);

                        let vs = versusSymbol(match, true);

                        let [team1, team2] = teamOrder(match);



                        return (
                            <tr key={match.matchId}>
                                {/*        Competition        */}
                                <td className={match.competition} onClick={() => compClick(match)}>
                                    {(match.competition === "BLANK") ?
                                        (<>

                                        </>) : (
                                            <>
                                                {match.competition}
                                            </>
                                        )}
                                </td>


                                {/*        Team vs Team        */}
                                <td className={match.competition} onClick={() => titleClick(match, true)}>
                                    {team1} {vs} {team2}
                                </td>


                                {/*        Date & Day        */}
                                <td className={match.competition}>
                                    {(match.competition === "BLANK") ?
                                        (<>

                                        </>) : (
                                            <>
                                                {new Intl.DateTimeFormat("en-US", { weekday: "short", }).format(date)}{" "}{date.getDate()}
                                            </>
                                        )}
                                </td>


                                {/*        Time        */}
                                <td className={match.competition}>
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
        </div>
    );
};

export default NBAPast;
